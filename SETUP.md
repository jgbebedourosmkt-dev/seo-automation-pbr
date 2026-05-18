# SERP Fetcher — Setup

## Instalação

```bash
cd seo_automation
pip install -r requirements.txt
cp .env.example .env
# preencha SERP_API_KEY no .env
```

## Como usar (chamado pelo Claude Cowork)

```bash
python main.py "sua keyword aqui"
```

Saída no terminal (JSON que o Claude lê):
```json
{
  "keyword": "sua keyword aqui",
  "saved_to": "data/serp_results/sua_keyword_20240101_120000.json",
  "total_results": "4.230.000",
  "top_results": [
    { "position": 1, "title": "...", "link": "...", "snippet": "..." },
    ...
  ]
}
```

O arquivo JSON completo é salvo em `data/serp_results/`.

## Prompt sugerido para o Claude Cowork

```
1. Acesse a planilha: [cole o link público aqui]
2. Para cada keyword na coluna A, execute: python main.py "<keyword>"
3. Com o JSON retornado, escreva um artigo SEO completo em português (pt-BR),
   mínimo 1200 palavras, com H1/H2/H3, intro e conclusão com CTA.
4. Salve cada artigo em data/articles/<keyword>.md
```
