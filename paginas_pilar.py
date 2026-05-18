"""
paginas_pilar.py — Automação SEO local para o Portal do Bebedouro.

Fluxo resumido:
  1. Lê a linha atual de uma planilha Google Sheets (ou XLSX/CSV)
  2. Busca os 3 primeiros resultados do Google para a keyword da linha
  3. Baixa e salva os HTMLs dos resultados
  4. Faz push dos JSONs e HTMLs ao GitHub (branch main do repo do script)
  5. Monitora branches claude/ no repo do site aguardando o artigo gerado
  6. Quando encontrado, publica o artigo no repo do site e atualiza o sitemap

Uso via terminal:
  python paginas_pilar.py                             # processa próxima linha
  python paginas_pilar.py --publicar                  # publica artigo já gerado
  python paginas_pilar.py --publicar --slug meu-slug  # publica slug específico

Uso como módulo:
  from paginas_pilar import processar_linha
  resultado = processar_linha(numero_linha=4)

Dependências:
  pip install requests beautifulsoup4 lxml openpyxl ddgs winotify
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

import requests
from bs4 import BeautifulSoup

logging.basicConfig(level=logging.INFO, format="%(levelname)s | %(message)s")

# ── Configuração — edite aqui antes de usar ──────────────────────────────────
SHEETS_URL         = "https://docs.google.com/spreadsheets/d/1Pug3l_jGx9NOBIJ-qpjL9Klu9NwvZXZ1LI9Ny8Ba-G4/edit?usp=sharing"
SHEETS_ABA         = "Páginas Pilar"
SHEETS_GID         = "1294902472"   # GID da aba Páginas Pilar
REPO_SITE          = r"C:\Users\Lenovo\Desktop\portal-do-bebedouro\portal-do-bebedouro"
DOMINIO_SITE       = "portaldobebedouro.com.br"
PASTA_SAIDA_PADRAO = r"C:\Users\Lenovo\seo_automation\temp_saida"
IMAGENS_OWNER      = "jgbebedourosmkt-dev"
IMAGENS_REPO       = "portal-do-bebedouro-imagens"
IMAGENS_MAX        = 2   # máximo de imagens por artigo
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
ESTADO_PATH     = os.path.join(os.path.dirname(os.path.abspath(__file__)), "estado.json")
SAIDA_REPO_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "saida", "linha_dados.json")
POLL_INTERVALO  = 60    # segundos entre cada verificação
POLL_TIMEOUT    = 90    # minutos até desistir


# ── Leitura da planilha ───────────────────────────────────────────────────────

def _ler_linha(arquivo: str, numero_linha: int, nome_aba: str) -> dict:
    if "docs.google.com/spreadsheets" in arquivo:
        return _ler_google_sheets(arquivo, numero_linha, nome_aba)
    ext = os.path.splitext(arquivo)[1].lower()
    if ext in (".xlsx", ".xls", ".xlsm"):
        return _ler_excel(arquivo, numero_linha)
    if ext == ".csv":
        return _ler_csv(arquivo, numero_linha)
    raise ValueError(f"Formato de arquivo não suportado: {arquivo}")


def _ler_google_sheets(url: str, numero_linha: int, nome_aba: str) -> dict:
    import io
    match = re.search(r"/spreadsheets/d/([a-zA-Z0-9_-]+)", url)
    if not match:
        raise ValueError("URL do Google Sheets inválida")
    sheet_id = match.group(1)
    # Usa GID quando disponível (mais confiável que nome de aba)
    if SHEETS_GID:
        export_url = (
            f"https://docs.google.com/spreadsheets/d/{sheet_id}"
            f"/export?format=csv&gid={SHEETS_GID}"
        )
    else:
        export_url = (
            f"https://docs.google.com/spreadsheets/d/{sheet_id}"
            f"/export?format=csv&sheet={quote(nome_aba)}"
        )
    logging.info(f"Baixando planilha: {export_url}")
    resp = requests.get(export_url, timeout=REQUEST_TIMEOUT)
    resp.raise_for_status()
    resp.encoding = "utf-8"
    # Pula 3 linhas de título/legenda; lê o restante como stream para preservar
    # campos multi-linha (células com quebra de linha dentro de aspas)
    conteudo = resp.text.splitlines(keepends=True)
    restante = "".join(conteudo[3:])
    reader = csv.DictReader(io.StringIO(restante))
    for i, row in enumerate(reader):
        if i == numero_linha:
            return dict(row)
    raise IndexError(f"Linha {numero_linha} não encontrada na aba '{nome_aba}'")


def _ler_linha_atual() -> int:
    if os.path.exists(ESTADO_PATH):
        with open(ESTADO_PATH, "r", encoding="utf-8") as f:
            estado = json.load(f)
        return estado.get("linha_atual", LINHA_INICIAL)
    return LINHA_INICIAL


def _avancar_linha():
    atual = _ler_linha_atual()
    with open(ESTADO_PATH, "w", encoding="utf-8") as f:
        json.dump({"linha_atual": atual + 1}, f)
    logging.info(f"Linha avançada: {atual} → {atual + 1}")


def _ler_excel(arquivo: str, numero_linha: int) -> dict:
    import openpyxl
    wb = openpyxl.load_workbook(arquivo, read_only=True, data_only=True)
    ws = wb.active
    rows = list(ws.iter_rows(values_only=True))
    cabecalho = [str(c) if c is not None else "" for c in rows[0]]
    dado = rows[numero_linha]
    return dict(zip(cabecalho, [str(v) if v is not None else "" for v in dado]))


def _ler_csv(arquivo: str, numero_linha: int) -> dict:
    with open(arquivo, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader):
            if i == numero_linha:
                return dict(row)
    raise IndexError(f"Linha {numero_linha} não encontrada em {arquivo}")


def _extrair_keyword(dados_linha: dict, coluna_keyword: Union[int, str]):
    if isinstance(coluna_keyword, int):
        chaves = list(dados_linha.keys())
        nome_coluna = chaves[coluna_keyword]
        valor = dados_linha[nome_coluna]
    else:
        nome_coluna = coluna_keyword
        valor = dados_linha.get(coluna_keyword, "")
    valor = str(valor).strip()
    if not valor:
        raise ValueError(f"Keyword vazia na coluna '{nome_coluna}'")
    return valor, nome_coluna


# ── Banco de imagens ──────────────────────────────────────────────────────────

_STOP_PT = {
    "e", "de", "do", "da", "dos", "das", "a", "o", "os", "as",
    "para", "em", "com", "no", "na", "ao", "um", "uma",
}

_cache_imagens: list | None = None


def _listar_imagens() -> list:
    """Busca catálogo de imagens do GitHub API (com cache por execução)."""
    global _cache_imagens
    if _cache_imagens is not None:
        return _cache_imagens

    api_url = f"https://api.github.com/repos/{IMAGENS_OWNER}/{IMAGENS_REPO}/contents/"
    try:
        resp = requests.get(api_url, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        arquivos = resp.json()
        _cache_imagens = [
            {
                "nome": f["name"],
                "raw_url": f["download_url"],
            }
            for f in arquivos
            if f["type"] == "file" and f["name"].lower().endswith((".jpg", ".jpeg", ".png", ".webp"))
        ]
        logging.info(f"Banco de imagens: {len(_cache_imagens)} imagens encontradas")
    except Exception as e:
        logging.warning(f"Falha ao listar banco de imagens: {e}")
        _cache_imagens = []
    return _cache_imagens


def _normalizar(texto: str) -> set:
    """Tokeniza texto em palavras minúsculas sem stop words e sem acentos simples."""
    import unicodedata
    normalizado = unicodedata.normalize("NFD", texto.lower())
    sem_acento = "".join(c for c in normalizado if unicodedata.category(c) != "Mn")
    palavras = re.findall(r"[a-z0-9]+", sem_acento)
    return {p for p in palavras if p not in _STOP_PT and len(p) > 1}


def _buscar_imagens(keyword: str, max_results: int = IMAGENS_MAX) -> list:
    """Retorna as imagens mais relevantes para a keyword, com score e URL."""
    imagens = _listar_imagens()
    if not imagens:
        return []

    tokens_kw = _normalizar(keyword)
    resultados = []
    for img in imagens:
        nome_sem_ext = os.path.splitext(img["nome"])[0]
        tokens_img = _normalizar(nome_sem_ext)
        intersecao = tokens_kw & tokens_img
        if not intersecao:
            continue
        score = len(intersecao) / max(len(tokens_kw), 1)
        resultados.append({
            "nome": img["nome"],
            "raw_url": img["raw_url"],
            "alt_text": nome_sem_ext,
            "score": round(score, 2),
            "palavras_comuns": sorted(intersecao),
        })

    resultados.sort(key=lambda x: x["score"], reverse=True)
    selecionadas = resultados[:max_results]
    logging.info(
        f"Imagens encontradas para '{keyword}': {len(selecionadas)} "
        f"(scores: {[i['score'] for i in selecionadas]})"
    )
    return selecionadas


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
    """Extrai estrutura semântica do HTML: headings, intro, contagem de palavras."""
    try:
        soup = BeautifulSoup(html, "lxml")

        # remove blocos de navegação, rodapé, scripts e anúncios
        for tag in soup(["nav", "header", "footer", "script", "style", "aside",
                         "form", "noscript", "iframe", "svg"]):
            tag.decompose()

        titulo = soup.find("h1")
        titulo_texto = titulo.get_text(strip=True) if titulo else ""

        # headings estruturais H2 e H3
        headings = []
        for tag in soup.find_all(["h2", "h3"]):
            texto = tag.get_text(strip=True)
            if texto and len(texto) > 3:
                headings.append({"nivel": tag.name, "texto": texto})

        # primeiro parágrafo longo (introdução)
        intro = ""
        for p in soup.find_all("p"):
            texto = p.get_text(strip=True)
            if len(texto) > 80:
                intro = texto[:500]
                break

        # texto limpo para contagem de palavras
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
    saida_repo = os.path.join(repo_dir, "saida")
    os.makedirs(saida_repo, exist_ok=True)

    arquivos = [
        "linha_dados.json",
        "serp_urls.json",
        "serp_content.json",
    ]
    copiados = []
    for nome in arquivos:
        origem = os.path.join(pasta_saida, nome)
        if os.path.exists(origem):
            shutil.copy2(origem, os.path.join(saida_repo, nome))
            copiados.append(nome)

    def _git(cmd: list) -> str:
        result = subprocess.run(
            ["git", "-C", repo_dir] + cmd,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
        if result.returncode != 0:
            raise RuntimeError(f"git {' '.join(cmd)} falhou:\n{result.stderr.strip()}")
        return result.stdout.strip()

    _git(["add", "saida/", "estado.json"])
    _git(["commit", "-m", f"linha {numero_linha}: {keyword}"])
    _git(["push", "origin", "main"])
    logging.info("Push ao GitHub concluído")

    for nome in copiados:
        origem = os.path.join(pasta_saida, nome)
        if os.path.exists(origem):
            os.remove(origem)


# ── Publicação ────────────────────────────────────────────────────────────────

def _aguardar_e_publicar(slug: str, titulo: str):
    """Faz git pull no repo de staging a cada POLL_INTERVALO segundos.
    Quando saida/page.tsx aparecer, copia para o site e aciona publicação."""
    repo_dir = os.path.dirname(os.path.abspath(__file__))
    staging_tsx = os.path.join(repo_dir, "saida", "page.tsx")
    deadline = time.time() + POLL_TIMEOUT * 60
    logging.info(f"Aguardando saida/page.tsx via git pull por até {POLL_TIMEOUT} min...")

    def _git_staging(cmd: list):
        subprocess.run(
            ["git", "-C", repo_dir] + cmd,
            capture_output=True, text=True, encoding="utf-8", errors="replace",
        )

    while time.time() < deadline:
        time.sleep(POLL_INTERVALO)
        _git_staging(["pull", "origin", "main"])
        if os.path.exists(staging_tsx):
            logging.info("saida/page.tsx detectado — copiando para o site...")
            destino_dir = os.path.join(REPO_SITE, "app", slug)
            os.makedirs(destino_dir, exist_ok=True)
            destino_tsx = os.path.join(destino_dir, "page.tsx")
            shutil.copy2(staging_tsx, destino_tsx)
            _limpar_staging_tsx(repo_dir, staging_tsx)
            _publicar_pagina(slug, titulo, destino_tsx)
            return
        restante = int((deadline - time.time()) / 60)
        logging.info(f"saida/page.tsx não encontrado. Tempo restante: ~{restante} min")

    logging.warning(f"Timeout de {POLL_TIMEOUT} min — page.tsx não chegou no staging")


def _limpar_staging_tsx(repo_dir: str, staging_tsx: str):
    """Remove saida/page.tsx do repo de staging após copiar para o site."""
    try:
        os.remove(staging_tsx)
        subprocess.run(
            ["git", "-C", repo_dir, "add", "saida/page.tsx"],
            capture_output=True, text=True,
        )
        subprocess.run(
            ["git", "-C", repo_dir, "commit", "-m", "cleanup: remove page.tsx do staging"],
            capture_output=True, text=True,
        )
        subprocess.run(
            ["git", "-C", repo_dir, "push", "origin", "main"],
            capture_output=True, text=True,
        )
    except Exception as e:
        logging.warning(f"Limpeza do staging falhou (não crítico): {e}")


def _publicar_pagina(slug: str, titulo: str, arquivo_tsx: str):
    """Faz git add + commit + push do page.tsx no repo do site."""
    def _git(cmd: list) -> str:
        result = subprocess.run(
            ["git", "-C", REPO_SITE] + cmd,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
        if result.returncode != 0:
            raise RuntimeError(f"git {' '.join(cmd)} falhou:\n{result.stderr.strip()}")
        return result.stdout.strip()

    _git(["add", f"app/{slug}/"])
    _git(["commit", "-m", f"feat: página pilar /{slug}"])
    _git(["push", "origin", "main"])
    logging.info(f"/{slug} publicado — Vercel deploy iniciado")

    _atualizar_sitemap(slug)
    _notificar_conclusao(titulo, slug)


def _publicar_artigo(slug_override: str = ""):
    """Atalho CLI para publicar manualmente um slug já gerado."""
    if not slug_override:
        with open(SAIDA_REPO_PATH, "r", encoding="utf-8") as f:
            dados = json.load(f)
        slug_override = dados.get("meta", {}).get("slug", "")
        titulo = dados.get("meta", {}).get("titulo_h1", slug_override)
    else:
        titulo = slug_override

    arquivo_tsx = os.path.join(REPO_SITE, "app", slug_override, "page.tsx")
    if not os.path.exists(arquivo_tsx):
        raise FileNotFoundError(f"page.tsx não encontrado: {arquivo_tsx}")
    _publicar_pagina(slug_override, titulo, arquivo_tsx)


def _atualizar_sitemap(slug: str):
    sitemap_path = os.path.join(REPO_SITE, "sitemap.xml")
    if not os.path.exists(sitemap_path):
        logging.warning("sitemap.xml não encontrado — pulando atualização")
        return

    url_artigo = f"https://{DOMINIO_SITE}/{slug}"
    with open(sitemap_path, "r", encoding="utf-8") as f:
        conteudo = f.read()

    if url_artigo in conteudo:
        logging.info(f"URL já presente no sitemap: {url_artigo}")
        return

    hoje = datetime.now().strftime("%Y-%m-%d")
    entrada = (
        f"\n  <url>\n"
        f"    <loc>{url_artigo}</loc>\n"
        f"    <lastmod>{hoje}</lastmod>\n"
        f"    <changefreq>monthly</changefreq>\n"
        f"    <priority>0.8</priority>\n"
        f"  </url>"
    )
    conteudo = conteudo.replace("</urlset>", entrada + "\n</urlset>")
    with open(sitemap_path, "w", encoding="utf-8") as f:
        f.write(conteudo)

    subprocess.run(["git", "-C", REPO_SITE, "add", "sitemap.xml"], capture_output=True)
    subprocess.run(
        ["git", "-C", REPO_SITE, "commit", "-m", f"sitemap: {slug}"],
        capture_output=True,
    )
    subprocess.run(["git", "-C", REPO_SITE, "push", "origin", "main"], capture_output=True)
    logging.info(f"Sitemap atualizado com {url_artigo}")


def _notificar_conclusao(titulo: str, slug: str):
    try:
        from winotify import Notification
        url = f"https://{DOMINIO_SITE}/{slug}"
        toast = Notification(
            app_id="SEO Local — Portal do Bebedouro",
            title="Artigo publicado!",
            msg=f"{titulo}\n{url}",
            duration="long",
            launch=url,
        )
        toast.show()
    except Exception as e:
        logging.warning(f"Notificação falhou: {e}")


# ── Função principal ──────────────────────────────────────────────────────────

def processar_linha(
    numero_linha: int,
    coluna_keyword: Union[int, str] = "Palavra-chave Principal",
    pasta_saida: str = PASTA_SAIDA_PADRAO,
    arquivo: str = SHEETS_URL,
    nome_aba: str = SHEETS_ABA,
) -> dict:
    logging.info(
        f"arquivo={arquivo} | aba={nome_aba} | linha={numero_linha} | pasta={pasta_saida}"
    )

    dados_linha = _ler_linha(arquivo, numero_linha, nome_aba)
    keyword, nome_coluna = _extrair_keyword(dados_linha, coluna_keyword)
    logging.info(f"Keyword: {keyword} (coluna: {nome_coluna})")

    links_internos = dados_linha.get("Links Internos", dados_linha.get("links internos", ""))
    os.makedirs(pasta_saida, exist_ok=True)

    imagens = _buscar_imagens(keyword)

    linha_dados = {
        "meta": {
            "arquivo": arquivo,
            "linha": numero_linha,
            "coluna_keyword": coluna_keyword if isinstance(coluna_keyword, str) else nome_coluna,
            "keyword": keyword,
            "titulo_h1": dados_linha.get("h1", ""),
            "meta_title": dados_linha.get("h1", ""),   # sem coluna Meta Title separada
            "meta_description": dados_linha.get("Meta Description", ""),
            "slug": dados_linha.get("URL / Slug", "").lstrip("/"),
            "cluster": dados_linha.get("Cluster", ""),
            "tipo_pilar": dados_linha.get("Tipo de Pilar", ""),
            "intencao": dados_linha.get("Intenção", ""),
            "variacoes_semanticas": dados_linha.get("Variações Semânticas", ""),
            "links_internos": links_internos,
            "imagens": imagens,
            "gerado_em": datetime.now().isoformat(),
        },
        "dados_linha": dados_linha,
    }
    _salvar_json(linha_dados, os.path.join(pasta_saida, "linha_dados.json"))

    urls = _buscar_google(keyword, NUM_RESULTS)
    if not urls:
        logging.warning("Nenhum resultado SERP encontrado")
        return {"linha_dados": linha_dados, "serp_urls": None, "htmls": []}

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
                "arquivo_html": f"resultado_{i + 1}.html",
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
            logging.info(f"Conteúdo extraído: posição {i+1} — {conteudo['num_palavras']} palavras, {len(conteudo['headings'])} headings")
        else:
            logging.warning(f"HTML não baixado para: {r['url']}")
        if i < len(urls) - 1:
            time.sleep(DELAY_REQUESTS)

    serp_content = {
        "keyword": keyword,
        "gerado_em": datetime.now().isoformat(),
        "media_palavras_top3": int(sum(c["num_palavras"] for c in conteudos_serp) / max(len(conteudos_serp), 1)),
        "minimo_palavras_recomendado": int(max((c["num_palavras"] for c in conteudos_serp), default=0) * 1.2),
        "concorrentes": conteudos_serp,
    }
    _salvar_json(serp_content, os.path.join(pasta_saida, "serp_content.json"))

    _avancar_linha()
    _push_github(pasta_saida, keyword, numero_linha)

    logging.info(f"Arquivos gerados: linha_dados.json, serp_urls.json, serp_content.json")
    return {
        "linha_dados": linha_dados,
        "serp_urls": serp_data,
        "serp_content": serp_content,
        "links_internos": links_internos,
        "imagens": imagens,
    }


# ── CLI ───────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Automação SEO — Portal do Bebedouro")
    parser.add_argument("--publicar", action="store_true", help="Publica artigo já gerado")
    parser.add_argument("--slug", default="", help="Slug manual para --publicar")
    parser.add_argument("--coluna", default="Palavra-chave Principal", help="Coluna da keyword")
    parser.add_argument("--pasta", default=PASTA_SAIDA_PADRAO, help="Pasta de saída temporária")
    parser.add_argument("--aba", default=SHEETS_ABA, help="Aba da planilha")
    parser.add_argument("--url", default=SHEETS_URL, help="URL ou caminho da planilha")
    args = parser.parse_args()

    if args.publicar:
        _publicar_artigo(slug_override=args.slug)
    else:
        linha_atual = _ler_linha_atual()
        try:
            coluna = int(args.coluna)
        except ValueError:
            coluna = args.coluna

        resultado = processar_linha(
            numero_linha=linha_atual,
            coluna_keyword=coluna,
            pasta_saida=args.pasta,
            arquivo=args.url,
            nome_aba=args.aba,
        )

        print("\nArquivos gerados:")
        for item in resultado.get("htmls", []):
            print(f"  {item}")

        slug = ""
        titulo = ""
        if os.path.exists(SAIDA_REPO_PATH):
            with open(SAIDA_REPO_PATH, "r", encoding="utf-8") as f:
                dados_saida = json.load(f)
            slug = dados_saida.get("meta", {}).get("slug", "")
            titulo = dados_saida.get("meta", {}).get("titulo_h1", slug)
        else:
            slug = resultado["linha_dados"].get("meta", {}).get("slug", "")
            titulo = resultado["linha_dados"].get("meta", {}).get("titulo_h1", slug)

        if slug:
            _aguardar_e_publicar(slug, titulo)
        else:
            logging.warning("Slug não encontrado — publicação automática ignorada")
