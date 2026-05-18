#!/usr/bin/env python3
"""
Uso: python main.py SHEET_ID GID

Lê sempre a linha 5 da planilha (primeira linha de dados, pulando 3 linhas de cabeçalho).
Gera dois arquivos JSON:
  data/serp/<keyword>.json      — resultado completo do SERPAPI
  data/rows/<keyword>_row.json  — dados da linha da planilha
"""

import sys
import os
import json
import re
import csv
import requests
from pathlib import Path
from dotenv import load_dotenv

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
load_dotenv()

SERP_API_KEY = os.getenv("SERP_API_KEY")
HEADER_ROWS = 3  # linhas de título/legenda antes do cabeçalho real

SERP_DIR = Path("data") / "serp"
ROWS_DIR = Path("data") / "rows"
SERP_DIR.mkdir(parents=True, exist_ok=True)
ROWS_DIR.mkdir(parents=True, exist_ok=True)
(Path("data") / "articles").mkdir(parents=True, exist_ok=True)


def slug(text: str) -> str:
    return re.sub(r"[^\w\s-]", "", text).strip().replace(" ", "_").lower()


def read_first_row(sheet_id: str, gid: str = None) -> dict:
    url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv"
    if gid:
        url += f"&gid={gid}"
    response = requests.get(url, timeout=15)
    response.raise_for_status()

    lines = response.content.decode("utf-8").splitlines()
    lines = lines[HEADER_ROWS:]  # remove título/legenda
    reader = csv.DictReader(lines)
    return next(reader)  # retorna apenas a primeira linha de dados


def fetch_serp(keyword: str) -> dict:
    params = {
        "q": keyword,
        "api_key": SERP_API_KEY,
        "gl": "br",
        "hl": "pt",
        "num": 10,
    }
    response = requests.get(
        "https://serpapi.com/search.json", params=params, timeout=30
    )
    response.raise_for_status()
    data = response.json()

    organic = data.get("organic_results", [])
    paa = data.get("people_also_ask", [])
    related = data.get("related_searches", [])
    answer_box = data.get("answer_box", {})

    return {
        "keyword": keyword,
        "total_results": data.get("search_information", {}).get("total_results"),
        "top_results": [
            {
                "position": r.get("position"),
                "title": r.get("title"),
                "link": r.get("link"),
                "displayed_link": r.get("displayed_link"),
                "snippet": r.get("snippet"),
            }
            for r in organic[:10]
        ],
        "people_also_ask": [
            {
                "question": p.get("question"),
                "snippet": p.get("snippet"),
                "link": p.get("link"),
            }
            for p in paa
        ],
        "related_searches": [r.get("query") for r in related],
        "featured_snippet": answer_box if answer_box else None,
        "has_shopping": bool(data.get("shopping_results")),
        "has_images": bool(data.get("inline_images")),
        "has_videos": bool(data.get("inline_videos")),
    }


def main():
    if len(sys.argv) < 2:
        print("Uso: python main.py SHEET_ID [GID]")
        sys.exit(1)

    sheet_id = sys.argv[1]
    gid = sys.argv[2] if len(sys.argv) >= 3 else None

    row = read_first_row(sheet_id, gid)
    keyword = row.get("Palavra-chave Principal", "").strip()

    if not keyword:
        print("Erro: keyword vazia na linha 5.")
        sys.exit(1)

    name = slug(keyword)
    print(f"Keyword: {keyword}")

    row_file = ROWS_DIR / f"{name}_row.json"
    with open(row_file, "w", encoding="utf-8") as f:
        json.dump(row, f, ensure_ascii=False, indent=2)
    print(f"Linha salva: {row_file}")

    serp_data = fetch_serp(keyword)
    serp_file = SERP_DIR / f"{name}.json"
    with open(serp_file, "w", encoding="utf-8") as f:
        json.dump(serp_data, f, ensure_ascii=False, indent=2)
    print(f"SERP salva:  {serp_file}")


if __name__ == "__main__":
    main()
