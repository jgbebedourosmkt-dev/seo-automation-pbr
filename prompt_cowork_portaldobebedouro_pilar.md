# Tarefa Diária — Produção de Página Pilar (Portal do Bebedouro)

Você é responsável por produzir 1 página pilar de SEO por execução para o site portaldobebedouro.com.br. Execute os passos abaixo na ordem. Se qualquer passo falhar, **PARE** e reporte o erro — não pule etapas nem invente dados.

**IMPORTANTE:** Não execute nenhum git no repo `portal-do-bebedouro`. O Python cuida de toda a publicação no site automaticamente — seu trabalho termina no PASSO 4.

---

## CONFIGURAÇÃO FIXA

- **Repo de staging (JSONs + page.tsx):** `https://github.com/jgbebedourosmkt-dev/seo-automation-pbr.git`
- **Branch alvo:** `main`
- **JSON da linha:** `saida/linha_dados.json`
- **JSON da SERP (URLs):** `saida/serp_urls.json`
- **JSON da SERP (conteúdo):** `saida/serp_content.json`
- **Destino do page.tsx gerado:** `saida/page.tsx` (mesmo repo de staging)
- **Componente de layout:** `PilarLayout` (importado de `@/components/pilar/PilarLayout`)

---

## PASSO 1 — Clonar o repo de staging e ler os JSONs

1. Clone o repo de staging:
   ```
   git clone https://github.com/jgbebedourosmkt-dev/seo-automation-pbr.git /tmp/seo-pbr
   ```

2. Leia os três arquivos dentro de `/tmp/seo-pbr/saida/`:
   - `linha_dados.json`
   - `serp_urls.json`
   - `serp_content.json`

3. Confirme que os três arquivos existem e têm conteúdo não vazio. Se qualquer um estiver ausente ou vazio, **PARE** e reporte: "PASSO 1 — FALHOU: `<nome>.json` não encontrado ou vazio no repo seo-automation-pbr."

4. Guarde o valor de `meta.keyword` — ele identifica a execução em todos os logs.

---

## PASSO 2 — Extrair variáveis dos JSONs

### 2A — Dados da planilha (`linha_dados.json → meta`)

| Variável | Campo |
|---|---|
| `keyword` | `keyword` |
| `titulo_h1` | `titulo_h1` |
| `meta_title` | `meta_title` |
| `meta_description` | `meta_description` |
| `slug` | `slug` (sem barra inicial) |
| `variacoes_semanticas` | `variacoes_semanticas` |
| `links_internos_raw` | `links_internos` (texto com bullets "• Âncora: …") |
| `imagens` | `imagens` (array com `raw_url` e `alt_text`) |

**Converter `links_internos_raw` para lista estruturada:**
Cada bullet: `• Âncora: "<texto>" → portaldobebedouro.com.br/<slug-alvo> (<contexto>)`
- `label` = texto entre aspas
- `href` = `/<slug-alvo>` (só o path, sem o domínio)

### 2B — Dados da SERP (`serp_content.json`)

- `minimo_palavras` = `minimo_palavras_recomendado`
- Para cada item em `concorrentes`: anote `titulo_pagina`, `num_palavras`, `intro`, `headings[]`

### 2C — URLs da SERP (`serp_urls.json`)

- Para cada item em `resultados`: anote `posicao`, `url`, `titulo_serp`, `descricao_serp`

### 2D — Análise SERP (antes de escrever)

**A) Intenção:** Que formato domina o top 3? (guia informacional, comparativo, lista, híbrido?)

**B) Tópicos obrigatórios:** headings que aparecem em 2+ concorrentes — cada um precisa de pelo menos 1 seção.

**C) Diferenciação:** tópico que nenhum concorrente cobre bem — pelo menos 1 seção exclusiva.

**D) Tamanho alvo:** o corpo do artigo deve atingir `minimo_palavras`.

**E) Variações semânticas:** distribuir `variacoes_semanticas` naturalmente ao longo do texto.

Se algum campo estiver vazio (ex.: `concorrentes` vazio), registre "não presente" e siga.

---

## PASSO 3 — Escrever o `page.tsx`

Crie o arquivo `/tmp/seo-pbr/saida/page.tsx` seguindo **exatamente** esta estrutura:

```tsx
import { buildMetadata } from '@/lib/metadata'
import { faqSchema, breadcrumbSchema } from '@/lib/schema'
import Topbar from '@/components/layout/Topbar'
import Header from '@/components/layout/Header'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import PilarLayout from '@/components/pilar/PilarLayout'

export const metadata = buildMetadata({
  title: '{meta_title}',            // literal da planilha — não altere
  description: '{meta_description}', // literal da planilha — não altere
  slug: '{slug}',
})

const faqs = [
  // mínimo 4 perguntas reais derivadas dos headings dos concorrentes
  // { question: '...?', answer: '...' } — respostas de 2-4 frases com dados concretos
]

export default function {PascalCase(slug)}Page() {
  return (
    <>
      <Topbar />
      <Header />
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: 'Home', slug: '' },
            { name: '{titulo_h1}' },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <PilarLayout
        badge="Guia Completo"
        title="{titulo_h1}"
        excerpt="{keyword nos primeiros 100 chars — 2 frases}"
        breadcrumbLabel="{titulo_h1}"
        breadcrumbSlug="{slug}"
        ctaHref="https://jgbedouros.com.br?utm_source=portalbebedouro&utm_medium=pilar&utm_campaign={slug}"
        ctaLabel="Solicitar orçamento"
        sidebarCtaHref="https://jgbebedouros.com.br?utm_source=portalbebedouro&utm_medium=sidebar&utm_campaign={slug}"
        finalCtaTitle="Precisa de {keyword}?"
        finalCtaDesc="A JG Bebedouros oferece venda e manutenção com atendimento em todo o Brasil."
        tocItems={[
          // { href: '#id-da-secao', label: 'Título do H2' } — um por seção
        ]}
        stats={[
          // 3-4 dados numéricos reais: L/h, prazo, norma, preço médio
        ]}
        faqs={faqs}
        internalLinks={[
          // TODOS os links de links_internos_raw → { href: '/slug', label: 'âncora' }
        ]}
      >
        {/* Seções do artigo — mínimo minimo_palavras palavras no total */}
      </PilarLayout>
      <Footer />
    </>
  )
}
```

**Cada seção:**
```tsx
<section id="kebab-do-h2" className="mb-12 scroll-mt-20">
  <h2
    className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda"
    style={{ fontFamily: 'var(--font-barlow-condensed)' }}
  >
    Título
  </h2>
  {/* conteúdo */}
</section>
```

**Imagens** — insira as do array `imagens` em seções relevantes (não na primeira):
```tsx
<img src="{raw_url}" alt="{alt_text}" className="w-full rounded-lg mb-6 object-cover" loading="lazy" />
```

**Links internos** — no corpo, no contexto indicado:
```tsx
<a href="/slug" className="text-az hover:underline">âncora</a>
```

**Regras de conteúdo:**
- `titulo_h1` e `meta_description` são literais — não altere nenhum caractere
- `keyword` no excerpt, no 1º parágrafo (primeiros 100 chars) e em pelo menos 2 H2s
- Primeira seção: parágrafo de 40-60 palavras que responde diretamente à keyword (formato featured snippet)
- Dados obrigatórios: capacidade em L/h, normas (NBR 13713, INMETRO, NR-24, RDC 275), faixas de preço reais
- Tamanho ≥ `minimo_palavras` — conte antes de salvar
- Nunca generalize — números e especificações técnicas em cada seção
- FAQ ao final com mínimo 4 perguntas, respostas diretas de 2-4 frases
- `<NomeDaFuncao>` = slug em PascalCase. Ex.: `bebedouro-industrial` → `BebedouroIndustrial`
- IDs de seção: kebab-case sem acentos. Ex.: `id="o-que-e"`, `id="tipos"`

**Checklist antes de salvar:**
- [ ] `metadata` usa `meta_title` e `meta_description` literais da planilha?
- [ ] `title` do PilarLayout é o `titulo_h1`?
- [ ] Primeiro parágrafo tem a `keyword` nos primeiros 100 chars?
- [ ] Todos os `links_internos_raw` convertidos e em `internalLinks`?
- [ ] Imagens de `meta.imagens` inseridas no corpo?
- [ ] FAQs com 4+ perguntas reais?
- [ ] `tocItems` bate com os IDs das seções?
- [ ] Contagem de palavras ≥ `minimo_palavras`?

---

## PASSO 4 — Enviar `page.tsx` para o staging (Git)

Dentro de `/tmp/seo-pbr`, execute:

```
git config user.email "jgbebedourosmkt@gmail.com"
git config user.name "SEO Automation"
git add saida/page.tsx
git commit -m "page: {slug}"
git push origin main
```

Confirme que o push retornou `main -> main`. Se falhar, **PARE** e reporte a mensagem de erro exata.

**Não execute nenhum git em outro repositório.** O Python detecta o `saida/page.tsx` via `git pull` e cuida de toda a publicação no site e no Vercel automaticamente.

---

## PASSO 5 — Rotacionar a linha na planilha

1. Abra: https://docs.google.com/spreadsheets/d/1Pug3l_jGx9NOBIJ-qpjL9Klu9NwvZXZ1LI9Ny8Ba-G4/edit, aba **Páginas Pilar**.
2. **Identifique a última linha preenchida.**
3. **Copie a linha 1 de dados** (primeira após o cabeçalho) e **cole logo após a última linha preenchida**, mantendo todos os campos idênticos.
4. Confirme que a linha colada bate com o que foi processado (mesma `keyword`, mesmo `slug`).
5. Só então **delete a linha 1 de dados** original ("Excluir linha", não "Limpar conteúdo").
6. Verifique que a nova linha 1 é uma keyword **diferente**. Se for a mesma, **PARE** e reporte.

---

## PASSO 6 — Relatório final

```
page.tsx enviado para staging — Python fará a publicação

Keyword:  {keyword}
Slug:     /{slug}
Palavras: ~{N} / mínimo {minimo_palavras}
Seções:   {lista dos H2s}
Imagens:  {alt_text das imagens inseridas}
Links:    {X/Y inseridos}
Próxima:  {keyword da nova linha 1 ou "fila vazia"}
```

---

## TRATAMENTO DE ERROS

Se qualquer passo falhar, **PARE** imediatamente, **não desfaça nada** e reporte:
- Em qual passo falhou
- Mensagem de erro exata
- O que NÃO foi feito

Nunca: invente dados, edite arquivos fora de `/tmp/seo-pbr/saida/`, toque no repo `portal-do-bebedouro`, force push, ou pule a rotação da linha.
