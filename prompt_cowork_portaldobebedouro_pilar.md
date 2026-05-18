# Tarefa Diaria - Producao de Pagina Pilar (Portal do Bebedouro)

Voce e responsavel por produzir 1 pagina pilar de SEO por execucao para o site portaldobebedouro.com.br. Execute os passos abaixo na ordem. Se qualquer passo falhar, PARE e reporte o erro - nao pule etapas nem invente dados.

IMPORTANTE: Nao execute nenhum git no repo portal-do-bebedouro. O Python cuida de toda a publicacao no site automaticamente - seu trabalho termina no PASSO 4.

---

## CONFIGURACAO FIXA

- Repo de staging (JSONs + page.tsx): https://github.com/jgbebedourosmkt-dev/seo-automation-pbr.git
- Branch alvo: main
- JSON da linha: saida/linha_dados.json
- JSON da SERP (URLs): saida/serp_urls.json
- JSON da SERP (conteudo): saida/serp_content.json
- Destino do page.tsx gerado: saida/page.tsx (mesmo repo de staging)
- Componente de layout: PilarLayout (importado de @/components/pilar/PilarLayout)

---

## PASSO 1 - Clonar o repo de staging e ler os JSONs

1. Clone o repo de staging:
   git clone https://github.com/jgbebedourosmkt-dev/seo-automation-pbr.git /tmp/seo-pbr

2. Leia os tres arquivos dentro de /tmp/seo-pbr/saida/:
   - linha_dados.json
   - serp_urls.json
   - serp_content.json

3. Confirme que os tres arquivos existem e tem conteudo nao vazio. Se qualquer um estiver ausente, PARE: "PASSO 1 FALHOU: nome.json nao encontrado no repo seo-automation-pbr."

4. Guarde o valor de meta.keyword - ele identifica a execucao em todos os logs.

---

## PASSO 2 - Extrair variaveis dos JSONs

### 2A - Dados da planilha (linha_dados.json -> meta)

| Variavel        | Campo                        |
|-----------------|------------------------------|
| keyword         | keyword                      |
| titulo_h1       | titulo_h1                    |
| meta_title      | meta_title                   |
| meta_description| meta_description             |
| slug            | slug (sem barra inicial)     |
| variacoes_sem.  | variacoes_semanticas         |
| links_int_raw   | links_internos (bullets)     |
| imagens         | imagens (raw_url, alt_text)  |

Converter links_internos_raw: cada bullet "Ancora: texto -> dominio/slug (contexto)"
- label = texto da ancora
- href = /slug-alvo (so o path)

### 2B - Dados da SERP (serp_content.json)
- minimo_palavras = minimo_palavras_recomendado
- Para cada concorrente: titulo_pagina, num_palavras, intro, headings[]

### 2C - URLs da SERP (serp_urls.json)
- Para cada resultado: posicao, url, titulo_serp, descricao_serp

### 2D - Analise SERP
A) Intencao: formato que domina o top 3 (guia, comparativo, lista, hibrido)
B) Topicos obrigatorios: headings em 2+ concorrentes - pelo menos 1 secao cada
C) Diferenciacao: topico que nenhum concorrente cobre - pelo menos 1 secao exclusiva
D) Tamanho: corpo deve atingir minimo_palavras
E) Variacoes semanticas: distribuir naturalmente no texto

---

## PASSO 3 - Escrever o page.tsx

Crie /tmp/seo-pbr/saida/page.tsx com esta estrutura exata:

```tsx
import { buildMetadata } from '@/lib/metadata'
import { faqSchema, breadcrumbSchema } from '@/lib/schema'
import Topbar from '@/components/layout/Topbar'
import Header from '@/components/layout/Header'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import PilarLayout from '@/components/pilar/PilarLayout'

export const metadata = buildMetadata({
  title: '{meta_title}',
  description: '{meta_description}',
  slug: '{slug}',
})

const faqs = [
  { question: '...?', answer: '...' }, // minimo 4, respostas de 2-4 frases
]

export default function {PascalCaseSlug}Page() {
  return (
    <>
      <Topbar />
      <Header />
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema([
          { name: 'Home', slug: '' },
          { name: '{titulo_h1}' },
        ])),
      }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema(faqs)),
      }} />
      <PilarLayout
        badge="Guia Completo"
        title="{titulo_h1}"
        excerpt="{keyword nos primeiros 100 chars - 2 frases}"
        breadcrumbLabel="{titulo_h1}"
        breadcrumbSlug="{slug}"
        ctaHref="https://jgbebedouros.com.br?utm_source=portalbebedouro&utm_medium=pilar&utm_campaign={slug}"
        ctaLabel="Solicitar orcamento"
        sidebarCtaHref="https://jgbebedouros.com.br?utm_source=portalbebedouro&utm_medium=sidebar&utm_campaign={slug}"
        finalCtaTitle="Precisa de {keyword}?"
        finalCtaDesc="A JG Bebedouros oferece venda e manutencao com atendimento em todo o Brasil."
        tocItems={[ /* { href: '#id', label: 'H2' } por secao */ ]}
        stats={[ /* 3-4 dados numericos reais */ ]}
        faqs={faqs}
        internalLinks={[ /* links_internos_raw -> { href, label } TODOS */ ]}
      >
        {/* secoes aqui - minimo minimo_palavras palavras */}
      </PilarLayout>
      <Footer />
    </>
  )
}
```

Cada secao:
```tsx
<section id="kebab-sem-acento" className="mb-12 scroll-mt-20">
  <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda"
      style={{ fontFamily: 'var(--font-barlow-condensed)' }}>
    Titulo
  </h2>
</section>
```

Imagens (nao na primeira secao):
```tsx
<img src="{raw_url}" alt="{alt_text}" className="w-full rounded-lg mb-6 object-cover" loading="lazy" />
```

Links internos:
```tsx
<a href="/slug" className="text-az hover:underline">ancora</a>
```

Regras:
- titulo_h1 e meta_description: literais da planilha, nao altere nenhum caractere
- keyword: no excerpt, no 1o paragrafo (primeiros 100 chars) e em 2+ H2s
- 1a secao: 40-60 palavras respondendo diretamente a keyword (featured snippet)
- Dados obrigatorios: L/h, NBR 13713, INMETRO, NR-24, RDC 275, faixas de preco
- Tamanho >= minimo_palavras (conte antes de salvar)
- PascalCase: bebedouro-industrial -> BebedouroIndustrial
- IDs de secao: kebab-case sem acentos

Checklist antes de salvar:
- [ ] metadata usa meta_title e meta_description literais?
- [ ] title do PilarLayout e o titulo_h1?
- [ ] keyword no 1o paragrafo (primeiros 100 chars)?
- [ ] Todos links_internos_raw em internalLinks?
- [ ] Imagens inseridas no corpo?
- [ ] 4+ FAQs com dados concretos?
- [ ] tocItems bate com IDs das secoes?
- [ ] Palavras >= minimo_palavras?

---

## PASSO 4 - Enviar page.tsx para o staging (Git)

cd /tmp/seo-pbr
git config user.email "jgbebedourosmkt@gmail.com"
git config user.name "SEO Automation"
git add saida/page.tsx
git commit -m "page: {slug}"
git push origin main

Confirme main -> main. Se falhar, PARE e reporte o erro exato.
Nao execute git em nenhum outro repositorio. O Python detecta saida/page.tsx via git pull e publica no site automaticamente.

---

## PASSO 5 - Rotacionar a linha na planilha

1. Abra: https://docs.google.com/spreadsheets/d/1Pug3l_jGx9NOBIJ-qpjL9Klu9NwvZXZ1LI9Ny8Ba-G4/edit, aba Paginas Pilar.
2. Identifique a ultima linha preenchida.
3. Copie a linha 1 de dados (primeira apos cabecalho) e cole apos a ultima linha.
4. Confirme que a linha colada bate: mesma keyword, mesmo slug.
5. Delete a linha 1 original (Excluir linha, nao Limpar conteudo).
6. Verifique que a nova linha 1 e uma keyword diferente. Se for igual, PARE e reporte.

---

## PASSO 6 - Relatorio final

page.tsx enviado para staging - Python fara a publicacao

Keyword:  {keyword}
Slug:     /{slug}
Palavras: ~{N} / minimo {minimo_palavras}
Secoes:   {lista dos H2s}
Imagens:  {alt_text inseridos}
Links:    {X/Y inseridos}
Proxima:  {keyword da nova linha 1 ou "fila vazia"}

---

## TRATAMENTO DE ERROS

Se qualquer passo falhar, PARE, nao desfaca nada, e reporte:
- Qual passo falhou
- Mensagem de erro exata
- O que NAO foi feito

Nunca: invente dados, edite fora de /tmp/seo-pbr/saida/, toque no portal-do-bebedouro, force push, pule rotacao.
