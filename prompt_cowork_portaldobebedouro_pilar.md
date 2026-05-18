# Tarefa Diária — Produção de Página Pilar (Portal do Bebedouro)

Você é responsável por produzir 1 página pilar de SEO por execução para o site portaldobebedouro.com.br. Execute os passos abaixo na ordem. Se qualquer passo falhar, **PARE** e reporte o erro — não pule etapas nem invente dados.

---

## CONFIGURAÇÃO FIXA

- **Script Python:** `C:\Users\Lenovo\seo_automation\main.py`
- **Comando:** `python main.py 1Pug3l_jGx9NOBIJ-qpjL9Klu9NwvZXZ1LI9Ny8Ba-G4 1294902472`
- **JSON da linha (planilha):** `C:\Users\Lenovo\seo_automation\data\rows\<keyword>_row.json`
- **JSON da SERP:** `C:\Users\Lenovo\seo_automation\data\serp\<keyword>.json`
- **Pasta de artigos:** `C:\Users\Lenovo\seo_automation\data\articles\<slug>.md`
- **Repositório local do site:** `C:\Users\Lenovo\portaldobebedouro`
- **Pasta de destino dentro do repo:** `C:\Users\Lenovo\portaldobebedouro\pages\<slug>.md`
- **Branch alvo:** `main`

---

## PASSO 1 — Rodar o script Python

1. No terminal, execute:
   ```
   python C:\Users\Lenovo\seo_automation\main.py 1Pug3l_jGx9NOBIJ-qpjL9Klu9NwvZXZ1LI9Ny8Ba-G4 1294902472
   ```

2. Aguarde o script terminar. Confirme exit code 0.

3. O script imprime três linhas no terminal:
   ```
   Keyword: <keyword>
   Linha salva: data\rows\<keyword>_row.json
   SERP salva:  data\serp\<keyword>.json
   ```
   Guarde o valor de `<keyword>` exibido — ele define os nomes dos arquivos gerados.

4. Se o script retornar erro, PARE e reporte a mensagem exata.

---

## PASSO 2 — Ler os dois JSONs e extrair variáveis

Leia os dois arquivos gerados pelo script.

### 2A — Dados da planilha (`data/rows/<keyword>_row.json`)

Extraia e guarde estas variáveis (use exatamente esses nomes ao longo da execução):

- `keyword` — campo `Palavra-chave Principal`
- `meta_title` — campo `Meta Title`
- `meta_description` — campo `Meta Description`
- `links_internos` — campo `Links Internos Sugeridos` (lista completa: âncora + URL + contexto de inserção)

Derive o `slug` a partir da `keyword`: minúsculas, sem acentos, espaços viram hífen.
Ex.: "Bebedouro Industrial 4 Torneiras" → `bebedouro-industrial-4-torneiras`

### 2B — Dados da SERP (`data/serp/<keyword>.json`)

Analise os seguintes blocos. O objetivo é entender o que o Google premia para essa keyword e construir um artigo que cubra tudo + adicione algo que ninguém tem.

**A) Intenção de busca (deduzir a partir da SERP):**
- Que tipo de resultado domina o top 10? Guias informacionais, páginas de produto, comparativos, listas, artigos de blog? Isso define o **formato** que o artigo precisa ter.
- Se a SERP mistura formatos, o artigo precisa ser híbrido (ex.: guia que termina com comparativo + CTA comercial).

**B) Top 10 orgânico — análise concorrencial (`top_results`):**
Para cada resultado, registre:
- Posição, título exato, URL, snippet
- Padrões nos títulos: usam números? ano (2025/2026)? palavras como "guia", "completo", "melhor", "como"?
- Domínios que aparecem (concorrentes diretos vs. portais grandes)

**C) Tópicos e subtópicos que TODO concorrente cobre:**
- Liste os temas que aparecem em pelo menos 5 dos 10 resultados (analise títulos + snippets). Esses são **obrigatórios** no artigo.
- Liste os temas que aparecem em poucos resultados (1-3) — esses são **diferenciação**: cobrir o que os outros ignoraram.

**D) People Also Ask (`people_also_ask`):**
- Capture TODAS as perguntas. Cada uma vira um H3 dentro do FAQ, com resposta direta de 2-4 linhas no início (formato featured-snippet-ready).
- Se houver mais de 6 perguntas, escolha as 6 mais alinhadas à keyword principal.

**E) Featured snippet (`featured_snippet`):**
- Se presente, registre: o que está lá (parágrafo, lista, tabela?), qual site é dono, o texto exato.
- Estruture pelo menos UMA seção do artigo no mesmo formato para disputar essa posição.
- Se `featured_snippet` for `null`, identifique uma pergunta-chave do PAA e crie um bloco respondendo no formato de snippet.

**F) Related searches (`related_searches`):**
- Use pelo menos 3 como H2 ou H3 no artigo. Excelente para semântica e para capturar long tails relacionados.

**G) Elementos visuais e enriquecimentos da SERP:**
- `has_images: true` → incluir imagens otimizadas (alt text com keyword, nome de arquivo descritivo)
- `has_videos: true` → considerar embed de vídeo relevante
- `has_shopping: true` → confirma intenção transacional — fortalecer CTAs comerciais

**H) Lacunas (gap analysis):**
Após mapear A–G, registre internamente:
- O que TODOS cobrem e você precisa cobrir igual ou melhor (paridade obrigatória)
- O que NINGUÉM cobre bem e você vai cobrir em profundidade (ângulo único)
- Qual o tamanho médio em palavras dos top 5 — seu artigo deve ter pelo menos 20% a mais

**I) Sinais E-E-A-T a reforçar:**
- Especificações técnicas concretas (capacidade em litros, voltagem, materiais)
- Fontes confiáveis quando fizer afirmações de norma/segurança (NR-24, INMETRO, ABNT)
- Dados e números específicos (preços médios, prazos, dimensões) em vez de generalizações

Consolide tudo isso em uma nota mental estruturada antes de começar a escrever. Se algum bloco não estiver presente no JSON (ex.: `people_also_ask` vazio), registre "não presente" e siga — não invente.

---

## PASSO 3 — Escrever o artigo

Crie o arquivo `C:\Users\Lenovo\seo_automation\data\articles\<slug>.md`.

**Princípio guia:** quem dita o artigo é a SERP. A análise do Passo 2 (A–I) já disse qual formato vence, quais tópicos são obrigatórios, qual é o tamanho médio dos top 5, quais perguntas precisam ser respondidas, onde está a lacuna. Escreva o artigo que materializa essa análise — não force um molde pré-definido.

**O que a planilha define (fixo):**
- O **H1 do artigo é o `meta_title`** — use ele literalmente.
- O frontmatter usa `meta_title`, `meta_description` e `slug` da planilha.
- A `keyword` precisa aparecer no H1 (já vem no meta_title), no primeiro parágrafo (primeiros 100 caracteres) e em pelo menos um H2. Densidade natural — nunca stuffing.
- **TODOS os `links_internos`** da planilha precisam aparecer no corpo, com as âncoras e contextos indicados. Formato: `[âncora](URL)`.

**O que a SERP define (variável):**
- Tamanho do artigo: pelo menos 20% acima da média de palavras dos top 5 (calculado no item H).
- Formato (guia, comparativo, lista, híbrido) — segue o que domina o top 10.
- Estrutura de H2s/H3s — derivada dos tópicos obrigatórios (C) + diferenciação (C) + buscas relacionadas (F).
- Bloco no formato featured-snippet posicionado onde fizer sentido para disputar a posição zero (E).
- FAQ ao final com as PAAs como H3 (D), cada uma com resposta direta de 2-4 linhas.

**Diretrizes que valem sempre:**
- Especificações técnicas concretas (capacidade em litros, voltagem, materiais)
- Citar fontes confiáveis quando fizer afirmações de norma/segurança (NR-24, INMETRO, ABNT)
- Dados e números específicos (preços médios, prazos, dimensões) em vez de generalizações

**Frontmatter obrigatório:**

```markdown
---
title: "<meta_title>"
description: "<meta_description>"
slug: "<slug>"
keyword: "<keyword>"
date: "<YYYY-MM-DD de hoje>"
---

# <meta_title>

<resto do artigo, estrutura definida pela análise SERP>
```

**Antes de salvar, checklist mental:**
- [ ] H1 é o `meta_title` da planilha?
- [ ] Primeiro parágrafo tem a `keyword` nos primeiros 100 chars?
- [ ] Estrutura segue o que a SERP indicou (formato + tópicos obrigatórios + diferenciação)?
- [ ] Tamanho ≥ 20% acima da média dos top 5?
- [ ] FAQ com as PAAs respondidas?
- [ ] Bloco no formato featured-snippet posicionado?
- [ ] TODOS os links internos da planilha foram inseridos?
- [ ] Frontmatter completo?

Salve o arquivo em `C:\Users\Lenovo\seo_automation\data\articles\<slug>.md`.

---

## PASSO 4 — Publicar no repositório (Git)

1. Copie o arquivo para o repo:
   ```
   copy "C:\Users\Lenovo\seo_automation\data\articles\<slug>.md" "C:\Users\Lenovo\portaldobebedouro\pages\<slug>.md"
   ```

2. Execute os comandos abaixo **um por vez**, conferindo o resultado de cada:
   ```
   cd C:\Users\Lenovo\portaldobebedouro
   git status
   git pull origin main
   git add pages/<slug>.md
   git commit -m "feat(content): adiciona página pilar <keyword>"
   git push origin main
   ```

3. Se `git pull` trouxer conflitos, PARE e reporte — não tente resolver sozinho.

4. Confirme no output do `git push` que o push foi bem-sucedido (procure por `main -> main`). A Vercel vai deployar automaticamente.

**Regra do slug:** keyword em letras minúsculas, espaços substituídos por hífens, sem acentos.
Ex.: "Bebedouro Industrial 4 Torneiras" → `bebedouro-industrial-4-torneiras`

---

## PASSO 5 — Rotacionar a linha na planilha

Esta etapa garante que na próxima execução a "primeira linha" seja a próxima da fila. Faça **exatamente nesta ordem** — se inverter, você apaga a linha errada.

1. Abra a planilha: https://docs.google.com/spreadsheets/d/1Pug3l_jGx9NOBIJ-qpjL9Klu9NwvZXZ1LI9Ny8Ba-G4/edit, aba **Páginas Pilar**.

2. **Identifique a última linha preenchida** (a última que tem qualquer dado, não conte linhas vazias).

3. **Copie a linha 1 de dados** (a que você acabou de processar — primeira linha após o cabeçalho) e **cole logo após a última linha preenchida**, mantendo todos os campos originais idênticos.

4. **Confirme** que a linha colada apareceu no final e que os dados batem com o que foi processado (mesma keyword, mesmo slug).

5. Só depois de confirmar, **delete a linha 1 de dados** original. Use "Excluir linha" para que as linhas de baixo subam — não use apenas "Limpar conteúdo".

6. Verifique que agora a nova "primeira linha de dados" é uma keyword diferente. Se for a mesma, algo deu errado — PARE e reporte.

---

## PASSO 6 — Relatório final

Ao final, responda no chat com este resumo:

```
✅ Página pilar publicada

Keyword: <keyword>
Slug: /<slug>
Arquivo: pages/<slug>.md
Commit: <hash>
Palavras: <contagem>
Links internos inseridos: <X/Y>
Próxima keyword na fila: <keyword da nova primeira linha ou "fila vazia">
```

---

## TRATAMENTO DE ERROS

Se qualquer passo falhar, PARE imediatamente, **não desfaça nada** e reporte:
- Em qual passo falhou
- Mensagem de erro exata
- O que NÃO foi feito (para retomar manualmente)

Nunca: invente dados da SERP, edite arquivos fora dos caminhos definidos, force push, faça commit em outra branch, ou pule o passo de rotacionar a linha.
