"""
posts_blog.py — Automação SEO de Posts do Blog para o Portal do Bebedouro.

Fluxo resumido:
  1. Lê a linha atual da aba 'Posts do Blog' na planilha Google Sheets
  2. Busca os 3 primeiros resultados do Google para a keyword
  3. Baixa e extrai conteúdo semântico dos HTMLs dos concorrentes
  4. Busca imagem relevante via API do Pexels (sem baixar ainda)
  5. Faz push dos JSONs ao repo de staging (pasta saida_blog/)
  6. Monitora saida_blog/post.json no staging aguardando o post gerado pelo Claude
  7. Quando encontrado: baixa a imagem do Pexels, copia o JSON para content/posts/
     e faz git push no site (Vercel faz deploy automático)

Uso via terminal:
  python posts_blog.py                             # processa próxima linha
  python posts_blog.py --publicar                  # publica post já gerado
  python posts_blog.py --publicar --slug meu-slug  # publica slug específico

Uso como módulo:
  from posts_blog import processar_linha_blog
  resultado = processar_linha_blog(numero_linha=0)

Dependências:
  pip install requests beautifulsoup4 lxml ddgs winotify
  Variável de ambiente: PEXELS_API_KEY
"""

import sys

if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

import json
import time
import logging
import os
import argparse
import shutil
import csv
import re
import subprocess
from datetime import datetime
from typing import Union
from urllib.parse import urlparse, quote
import io

import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO, format="%(levelname)s | %(message)s")

# ── Configuração ──────────────────────────────────────────────────────────────
SHEETS_URL      = "https://docs.google.com/spreadsheets/d/1Pug3l_jGx9NOBIJ-qpjL9Klu9NwvZXZ1LI9Ny8Ba-G4/edit?usp=sharing"
SHEETS_ABA      = "Posts do Blog"
SHEETS_GID      = "1337030143"
REPO_SITE       = r"C:\Users\Lenovo\Desktop\portal-do-bebedouro\portal-do-bebedouro"
DOMINIO_SITE    = "portaldobebedouro.com.br"
PASTA_SAIDA     = r"C:\Users\Lenovo\seo_automation\temp_saida_blog"
SAIDA_SUBDIR    = "saida_blog"   # pasta dentro do repo de staging
PEXELS_API_KEY  = os.getenv("PEXELS_API_KEY", "")
# ─────────────────────────────────────────────────────────────────────────────

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}
REQUEST_TIMEOUT = 20
DELAY_REQUESTS  = 2
NUM_RESULTS     = 3
LINHA_INICIAL   = 0
HEADER_ROWS     = 3
ESTADO_PATH        = os.path.join(os.path.dirname(os.path.abspath(__file__)), "estado_blog.json")
SAIDA_REPO_PATH    = os.path.join(os.path.dirname(os.path.abspath(__file__)), SAIDA_SUBDIR, "linha_dados.json")
PEXELS_USADOS_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "pexels_usados.json")
POLL_INTERVALO  = 60    # segundos entre cada verificação
POLL_TIMEOUT    = 90    # minutos até desistir


# ── Leitura da planilha ───────────────────────────────────────────────────────

def _ler_google_sheets(numero_linha: int) -> dict:
    sheet_id = re.search(r"/spreadsheets/d/([a-zA-Z0-9_-]+)", SHEETS_URL).group(1)
    export_url = (
        f"https://docs.google.com/spreadsheets/d/{sheet_id}"
        f"/export?format=csv&gid={SHEETS_GID}"
    )
    logging.info(f"Baixando planilha: {export_url}")
    resp = requests.get(export_url, timeout=REQUEST_TIMEOUT)
    resp.raise_for_status()
    resp.encoding = "utf-8"

    conteudo = resp.text.splitlines(keepends=True)
    restante = "".join(conteudo[HEADER_ROWS:])
    reader = csv.DictReader(io.StringIO(restante))
    for i, row in enumerate(reader):
        if i == numero_linha:
            return dict(row)
    raise IndexError(f"Linha {numero_linha} não encontrada na aba '{SHEETS_ABA}'")


def _ler_linha_atual() -> int:
    if os.path.exists(ESTADO_PATH):
        with open(ESTADO_PATH, "r", encoding="utf-8") as f:
            return json.load(f).get("linha_atual", LINHA_INICIAL)
    return LINHA_INICIAL


def _avancar_linha():
    atual = _ler_linha_atual()
    with open(ESTADO_PATH, "w", encoding="utf-8") as f:
        json.dump({"linha_atual": atual + 1}, f)
    logging.info(f"Linha avançada: {atual} → {atual + 1}")


# ── Parsing dos campos da planilha ───────────────────────────────────────────

def _parsear_meta(campo: str) -> tuple:
    """Extrai meta_title, meta_description e cta do campo combinado da planilha."""
    meta_title = ""
    meta_description = ""
    cta = ""
    for linha in campo.splitlines():
        linha = linha.strip()
        if "Title:" in linha:
            meta_title = linha.split("Title:", 1)[1].strip()
        elif "Desc:" in linha:
            meta_description = linha.split("Desc:", 1)[1].strip()
        elif "CTA:" in linha:
            cta = linha.split("CTA:", 1)[1].strip()
    return meta_title, meta_description, cta


def _extrair_slug(url_proposta: str) -> str:
    """Extrai o slug de /blog/meu-slug → meu-slug."""
    url = url_proposta.strip().lstrip("/")
    if url.startswith("blog/"):
        url = url[5:]
    return url


def _extrair_tags(kws_secundarias: str) -> list:
    """Converte 'kw1; kw2; kw3' em lista de tags."""
    return [t.strip() for t in re.split(r"[;,]", kws_secundarias) if t.strip()]


def _estimar_read_time(tamanho_sugerido: str) -> int:
    """Estima tempo de leitura em minutos a partir de '1.800-2.200 palavras'."""
    numeros = re.findall(r"[\d.]+", tamanho_sugerido.replace(".", ""))
    if numeros:
        media = sum(int(n) for n in numeros) / len(numeros)
        return max(1, round(media / 200))
    return 8


# ── Controle de IDs Pexels já usados ─────────────────────────────────────────

def _carregar_ids_usados() -> set:
    if os.path.exists(PEXELS_USADOS_PATH):
        with open(PEXELS_USADOS_PATH, "r", encoding="utf-8") as f:
            return set(json.load(f))
    return set()


def _registrar_id_usado(pexels_id: int):
    ids = _carregar_ids_usados()
    ids.add(pexels_id)
    with open(PEXELS_USADOS_PATH, "w", encoding="utf-8") as f:
        json.dump(sorted(ids), f)
    logging.info(f"Pexels ID #{pexels_id} registrado como usado ({len(ids)} total)")


# ── Busca Pexels ──────────────────────────────────────────────────────────────

def _buscar_imagem_pexels(keyword_pexels: str) -> dict | None:
    if not PEXELS_API_KEY:
        logging.warning("PEXELS_API_KEY não configurada — imagem ignorada")
        return None

    ids_usados = _carregar_ids_usados()
    headers = {"Authorization": PEXELS_API_KEY}

    def _buscar_pagina(query: str, pagina: int) -> list:
        params = {"query": query, "per_page": 15, "page": pagina}
        try:
            resp = requests.get(
                "https://api.pexels.com/v1/search",
                headers=headers,
                params=params,
                timeout=REQUEST_TIMEOUT,
            )
            resp.raise_for_status()
            return resp.json().get("photos", [])
        except Exception as e:
            logging.warning(f"Pexels página {pagina} falhou: {e}")
            return []

    def _primeira_nao_usada(fotos: list) -> dict | None:
        for foto in fotos:
            if foto["id"] not in ids_usados:
                return foto
        return None

    try:
        # tenta até 2 páginas para garantir foto inédita
        for pagina in (1, 2):
            fotos = _buscar_pagina(keyword_pexels, pagina)
            foto = _primeira_nao_usada(fotos)
            if foto:
                resultado = {
                    "pexels_id": foto["id"],
                    "keyword_pexels": keyword_pexels,
                    "url_large": foto["src"]["large2x"],
                    "url_original": foto["src"]["original"],
                    "photographer": foto.get("photographer", ""),
                    "photographer_url": foto.get("photographer_url", ""),
                    "alt": foto.get("alt", keyword_pexels),
                    "width": foto.get("width"),
                    "height": foto.get("height"),
                }
                logging.info(
                    f"Pexels: foto #{foto['id']} (pág {pagina}) "
                    f"de {foto.get('photographer', '?')} — query: '{keyword_pexels}'"
                )
                return resultado
            if fotos:
                logging.info(f"Pexels pág {pagina}: todas as {len(fotos)} fotos já usadas, tentando próxima")

        logging.warning(f"Pexels: nenhuma foto inédita encontrada para '{keyword_pexels}'")
        return None

    except Exception as e:
        logging.warning(f"Falha ao buscar imagem no Pexels: {e}")
        return None


def _baixar_imagem_pexels(info: dict, slug: str) -> str | None:
    """Baixa a imagem do Pexels e salva em public/images/{slug}.jpg.
    Retorna o caminho público /images/{slug}.jpg ou None em caso de falha."""
    destino_dir = os.path.join(REPO_SITE, "public", "images")
    os.makedirs(destino_dir, exist_ok=True)
    destino = os.path.join(destino_dir, f"{slug}.jpg")

    try:
        resp = requests.get(info["url_large"], timeout=30, stream=True)
        resp.raise_for_status()
        with open(destino, "wb") as f:
            for chunk in resp.iter_content(chunk_size=8192):
                f.write(chunk)
        tamanho = os.path.getsize(destino) / 1024
        logging.info(f"Imagem salva: {destino} ({tamanho:.0f} KB)")
        _registrar_id_usado(info["pexels_id"])
        return f"/images/{slug}.jpg"
    except Exception as e:
        logging.warning(f"Falha ao baixar imagem Pexels: {e}")
        return None


# ── Busca SERP ────────────────────────────────────────────────────────────────

def _buscar_google(keyword: str, num: int) -> list:
    resultados = _buscar_duckduckgo(keyword, num)
    if resultados:
        return resultados
    logging.warning("DuckDuckGo sem resultados — tentando Google scraping")
    return _buscar_google_scraping(keyword, num)


def _buscar_duckduckgo(keyword: str, num: int) -> list:
    try:
        from ddgs import DDGS
        with DDGS() as ddgs:
            hits = list(ddgs.text(keyword, region="br-pt", max_results=num))
        return [
            {
                "url": h.get("href", ""),
                "titulo_serp": h.get("title", ""),
                "descricao_serp": h.get("body", ""),
            }
            for h in hits
        ]
    except Exception as e:
        logging.warning(f"DuckDuckGo falhou: {e}")
        return []


def _buscar_google_scraping(keyword: str, num: int) -> list:
    url = f"https://www.google.com.br/search?q={keyword.replace(' ', '+')}&hl=pt-BR&num={num + 4}"
    try:
        resp = requests.get(url, headers=HEADERS, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "lxml")
        resultados = []
        for div in soup.select("div.g"):
            a = div.find("a", href=True)
            if not a:
                continue
            href = a["href"]
            if not href.startswith("http") or "google.com" in href:
                continue
            h3 = div.find("h3")
            titulo = h3.get_text(strip=True) if h3 else ""
            desc_tag = div.select_one("div[data-sncf]") or div.select_one(".VwiC3b")
            descricao = desc_tag.get_text(strip=True) if desc_tag else ""
            resultados.append({"url": href, "titulo_serp": titulo, "descricao_serp": descricao})
            if len(resultados) >= num:
                break
        return resultados
    except Exception as e:
        logging.error(f"Google scraping falhou: {e}")
        return []


# ── Download e extração de HTML ───────────────────────────────────────────────

def _baixar_html(url: str):
    try:
        resp = requests.get(url, headers=HEADERS, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        if resp.encoding is None or resp.encoding.lower() == "iso-8859-1":
            resp.encoding = resp.apparent_encoding
        return resp.text
    except Exception as e:
        logging.warning(f"Falha ao baixar {url}: {e}")
        return None


def _extrair_conteudo_html(html: str, url: str) -> dict:
    try:
        soup = BeautifulSoup(html, "lxml")
        for tag in soup(["nav", "header", "footer", "script", "style", "aside",
                         "form", "noscript", "iframe", "svg"]):
            tag.decompose()

        titulo = soup.find("h1")
        titulo_texto = titulo.get_text(strip=True) if titulo else ""

        headings = []
        for tag in soup.find_all(["h2", "h3"]):
            texto = tag.get_text(strip=True)
            if texto and len(texto) > 3:
                headings.append({"nivel": tag.name, "texto": texto})

        intro = ""
        for p in soup.find_all("p"):
            texto = p.get_text(strip=True)
            if len(texto) > 80:
                intro = texto[:500]
                break

        texto_corpo = soup.get_text(separator=" ", strip=True)
        num_palavras = len(texto_corpo.split())

        return {
            "url": url,
            "titulo_pagina": titulo_texto,
            "num_palavras": num_palavras,
            "intro": intro,
            "headings": headings,
        }
    except Exception as e:
        logging.warning(f"Falha ao extrair conteúdo de {url}: {e}")
        return {"url": url, "titulo_pagina": "", "num_palavras": 0, "intro": "", "headings": []}


# ── Utilitários ───────────────────────────────────────────────────────────────

def _salvar_json(dados: dict, caminho: str):
    with open(caminho, "w", encoding="utf-8") as f:
        json.dump(dados, f, ensure_ascii=False, indent=2)
    tamanho = os.path.getsize(caminho) / 1024
    logging.info(f"JSON salvo: {caminho} ({tamanho:.1f} KB)")


def _push_github(pasta_saida: str, keyword: str, numero_linha: int):
    repo_dir = os.path.dirname(os.path.abspath(__file__))
    saida_repo = os.path.join(repo_dir, SAIDA_SUBDIR)
    os.makedirs(saida_repo, exist_ok=True)

    arquivos = ["linha_dados.json", "serp_urls.json", "serp_content.json"]
    for nome in arquivos:
        origem = os.path.join(pasta_saida, nome)
        if os.path.exists(origem):
            shutil.copy2(origem, os.path.join(saida_repo, nome))

    def _git(cmd: list) -> str:
        result = subprocess.run(
            ["git", "-C", repo_dir] + cmd,
            capture_output=True, text=True, encoding="utf-8", errors="replace",
        )
        if result.returncode != 0:
            raise RuntimeError(f"git {' '.join(cmd)} falhou:\n{result.stderr.strip()}")
        return result.stdout.strip()

    _git(["pull", "--rebase", "origin", "main"])
    _git(["add", f"{SAIDA_SUBDIR}/", "estado_blog.json"])
    _git(["commit", "-m", f"blog linha {numero_linha}: {keyword}"])
    _git(["push", "origin", "main"])
    logging.info("Push ao staging concluído")

    for nome in arquivos:
        origem = os.path.join(pasta_saida, nome)
        if os.path.exists(origem):
            os.remove(origem)


# ── Publicação ────────────────────────────────────────────────────────────────

def _aguardar_e_publicar(slug: str, titulo: str, pexels_info: dict | None):
    """Faz git pull no repo de staging a cada POLL_INTERVALO segundos.
    Quando saida_blog/post.json aparecer, publica no site."""
    repo_dir = os.path.dirname(os.path.abspath(__file__))
    staging_json = os.path.join(repo_dir, SAIDA_SUBDIR, "post.json")
    deadline = time.time() + POLL_TIMEOUT * 60
    logging.info(f"Aguardando {SAIDA_SUBDIR}/post.json via git pull por até {POLL_TIMEOUT} min...")

    def _git_pull():
        subprocess.run(
            ["git", "-C", repo_dir, "pull", "origin", "main"],
            capture_output=True, text=True, encoding="utf-8", errors="replace",
        )

    while time.time() < deadline:
        time.sleep(POLL_INTERVALO)
        _git_pull()
        if os.path.exists(staging_json):
            logging.info(f"{SAIDA_SUBDIR}/post.json detectado — publicando...")
            _publicar_post(slug, titulo, staging_json, pexels_info)
            _limpar_staging_json(repo_dir, staging_json)
            return
        restante = int((deadline - time.time()) / 60)
        logging.info(f"post.json não encontrado. Tempo restante: ~{restante} min")

    logging.warning(f"Timeout de {POLL_TIMEOUT} min — post.json não chegou no staging")


def _limpar_staging_json(repo_dir: str, staging_json: str):
    try:
        os.remove(staging_json)
        subprocess.run(["git", "-C", repo_dir, "add", f"{SAIDA_SUBDIR}/post.json"],
                       capture_output=True, text=True)
        subprocess.run(["git", "-C", repo_dir, "commit", "-m", "cleanup: remove post.json do staging"],
                       capture_output=True, text=True)
        subprocess.run(["git", "-C", repo_dir, "push", "origin", "main"],
                       capture_output=True, text=True)
    except Exception as e:
        logging.warning(f"Limpeza do staging falhou (não crítico): {e}")


def _publicar_post(slug: str, titulo: str, staging_json: str, pexels_info: dict | None):
    """Baixa imagem do Pexels, copia o JSON para content/posts/ e faz push no site."""
    def _git(cmd: list) -> str:
        result = subprocess.run(
            ["git", "-C", REPO_SITE] + cmd,
            capture_output=True, text=True, encoding="utf-8", errors="replace",
        )
        if result.returncode != 0:
            raise RuntimeError(f"git {' '.join(cmd)} falhou:\n{result.stderr.strip()}")
        return result.stdout.strip()

    # baixa imagem do Pexels e injeta ogImage no JSON
    og_image = None
    if pexels_info:
        og_image = _baixar_imagem_pexels(pexels_info, slug)

    with open(staging_json, "r", encoding="utf-8") as f:
        post_data = json.load(f)

    if og_image:
        post_data["ogImage"] = og_image

    # salva JSON em content/posts/
    posts_dir = os.path.join(REPO_SITE, "content", "posts")
    os.makedirs(posts_dir, exist_ok=True)
    destino_json = os.path.join(posts_dir, f"{slug}.json")
    with open(destino_json, "w", encoding="utf-8") as f:
        json.dump(post_data, f, ensure_ascii=False, indent=2)
    logging.info(f"Post salvo: {destino_json}")

    # git add + commit + push
    _git(["add", f"content/posts/{slug}.json"])
    if og_image:
        _git(["add", f"public/images/{slug}.jpg"])
    _git(["commit", "-m", f"feat: post /artigo/{slug}"])
    _git(["push", "origin", "main"])
    logging.info(f"/artigo/{slug} publicado — Vercel deploy iniciado")

    _notificar_conclusao(titulo, slug)


def _publicar_artigo_manual(slug_override: str = ""):
    """Atalho CLI para publicar manualmente um post já gerado no staging."""
    staging_json = os.path.join(
        os.path.dirname(os.path.abspath(__file__)), SAIDA_SUBDIR, "post.json"
    )
    if not os.path.exists(staging_json):
        raise FileNotFoundError(f"post.json não encontrado em {staging_json}")

    with open(staging_json, "r", encoding="utf-8") as f:
        post_data = json.load(f)

    if not slug_override:
        slug_override = post_data.get("slug", "")
    titulo = post_data.get("title", slug_override)

    # tenta carregar pexels_info do linha_dados.json de staging
    linha_path = os.path.join(
        os.path.dirname(os.path.abspath(__file__)), SAIDA_SUBDIR, "linha_dados.json"
    )
    pexels_info = None
    if os.path.exists(linha_path):
        with open(linha_path, "r", encoding="utf-8") as f:
            dados = json.load(f)
        pexels_info = dados.get("meta", {}).get("imagem_pexels")

    _publicar_post(slug_override, titulo, staging_json, pexels_info)


def _notificar_conclusao(titulo: str, slug: str):
    try:
        from winotify import Notification
        url = f"https://{DOMINIO_SITE}/artigo/{slug}"
        toast = Notification(
            app_id="SEO Local — Portal do Bebedouro",
            title="Post publicado!",
            msg=f"{titulo}\n{url}",
            duration="long",
            launch=url,
        )
        toast.show()
    except Exception as e:
        logging.warning(f"Notificação falhou: {e}")


# ── Função principal ──────────────────────────────────────────────────────────

def processar_linha_blog(
    numero_linha: int,
    pasta_saida: str = PASTA_SAIDA,
) -> dict:
    logging.info(f"aba={SHEETS_ABA} | GID={SHEETS_GID} | linha={numero_linha} | pasta={pasta_saida}")

    dados_linha = _ler_google_sheets(numero_linha)

    keyword = dados_linha.get("Palavra-chave Principal", "").strip()
    if not keyword:
        raise ValueError(f"Keyword vazia na linha {numero_linha}")
    logging.info(f"Keyword: {keyword}")

    # coluna "keyword pexels" define a busca de imagem; fallback para keyword principal
    keyword_pexels = dados_linha.get("keyword pexels", "").strip() or keyword
    logging.info(f"Keyword Pexels: {keyword_pexels}")

    meta_campo = dados_linha.get("Meta Title + Meta Description + CTA", "")
    meta_title, meta_description, cta = _parsear_meta(meta_campo)

    slug = _extrair_slug(dados_linha.get("URL Proposta", ""))
    tags = _extrair_tags(dados_linha.get("KWs Secundárias / Variações", ""))
    read_time = _estimar_read_time(dados_linha.get("Tamanho Sugerido", ""))

    os.makedirs(pasta_saida, exist_ok=True)

    imagem_pexels = _buscar_imagem_pexels(keyword_pexels)

    linha_dados = {
        "meta": {
            "aba": SHEETS_ABA,
            "linha": numero_linha,
            "keyword": keyword,
            "keyword_pexels": keyword_pexels,
            "titulo_h1": dados_linha.get("H1", ""),
            "meta_title": meta_title or dados_linha.get("H1", ""),
            "meta_description": meta_description,
            "cta": cta,
            "slug": slug,
            "categoria": dados_linha.get("Categoria", ""),
            "tipo": dados_linha.get("Tipo", ""),
            "angulo_editorial": dados_linha.get("Ângulo Editorial", ""),
            "kws_secundarias": dados_linha.get("KWs Secundárias / Variações", ""),
            "tags": tags,
            "read_time": read_time,
            "h2s_sugeridos": dados_linha.get("H2s Sugeridos", ""),
            "tamanho_sugerido": dados_linha.get("Tamanho Sugerido", ""),
            "pilar_relacionado": dados_linha.get("Pilar Relacionado (linkagem)", ""),
            "links_internos": dados_linha.get("Links Internos Sugeridos", ""),
            "imagem_pexels": imagem_pexels,
            "gerado_em": datetime.now().isoformat(),
        },
        "dados_linha": dados_linha,
    }
    _salvar_json(linha_dados, os.path.join(pasta_saida, "linha_dados.json"))

    urls = _buscar_google(keyword, NUM_RESULTS)
    if not urls:
        logging.warning("Nenhum resultado SERP encontrado")
        return {"linha_dados": linha_dados, "serp_urls": None, "serp_content": None}

    serp_data = {
        "keyword": keyword,
        "gerado_em": datetime.now().isoformat(),
        "resultados": [
            {
                "posicao": i + 1,
                "url": r["url"],
                "dominio": urlparse(r["url"]).netloc,
                "titulo_serp": r.get("titulo_serp", ""),
                "descricao_serp": r.get("descricao_serp", ""),
            }
            for i, r in enumerate(urls)
        ],
    }
    _salvar_json(serp_data, os.path.join(pasta_saida, "serp_urls.json"))

    conteudos_serp = []
    for i, r in enumerate(urls):
        html = _baixar_html(r["url"])
        if html:
            conteudo = _extrair_conteudo_html(html, r["url"])
            conteudo["posicao"] = i + 1
            conteudo["titulo_serp"] = r.get("titulo_serp", "")
            conteudo["descricao_serp"] = r.get("descricao_serp", "")
            conteudos_serp.append(conteudo)
            logging.info(
                f"Conteúdo extraído: posição {i+1} — "
                f"{conteudo['num_palavras']} palavras, {len(conteudo['headings'])} headings"
            )
        else:
            logging.warning(f"HTML não baixado para: {r['url']}")
        if i < len(urls) - 1:
            time.sleep(DELAY_REQUESTS)

    serp_content = {
        "keyword": keyword,
        "gerado_em": datetime.now().isoformat(),
        "media_palavras_top3": int(
            sum(c["num_palavras"] for c in conteudos_serp) / max(len(conteudos_serp), 1)
        ),
        "minimo_palavras_recomendado": int(
            max((c["num_palavras"] for c in conteudos_serp), default=0) * 1.2
        ),
        "concorrentes": conteudos_serp,
    }
    _salvar_json(serp_content, os.path.join(pasta_saida, "serp_content.json"))

    _avancar_linha()
    _push_github(pasta_saida, keyword, numero_linha)

    logging.info("Arquivos gerados: linha_dados.json, serp_urls.json, serp_content.json")
    return {
        "linha_dados": linha_dados,
        "serp_urls": serp_data,
        "serp_content": serp_content,
        "imagem_pexels": imagem_pexels,
    }


# ── CLI ───────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Automação SEO — Posts do Blog")
    parser.add_argument("--publicar", action="store_true", help="Publica post já gerado no staging")
    parser.add_argument("--slug", default="", help="Slug manual para --publicar")
    parser.add_argument("--pasta", default=PASTA_SAIDA, help="Pasta de saída temporária")
    args = parser.parse_args()

    if args.publicar:
        _publicar_artigo_manual(slug_override=args.slug)
    else:
        linha_atual = _ler_linha_atual()
        resultado = processar_linha_blog(numero_linha=linha_atual, pasta_saida=args.pasta)

        slug = resultado["linha_dados"].get("meta", {}).get("slug", "")
        titulo = resultado["linha_dados"].get("meta", {}).get("titulo_h1", slug)
        pexels_info = resultado.get("imagem_pexels")

        if slug:
            _aguardar_e_publicar(slug, titulo, pexels_info)
        else:
            logging.warning("Slug não encontrado — publicação automática ignorada")
