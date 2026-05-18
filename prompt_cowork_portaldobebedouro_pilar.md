# Tarefa Diária — Produção de Página Pilar (Portal do Bebedouro)

Você é responsável por produzir 1 página pilar de SEO por execução para o site portaldobebedouro.com.br. Execute os passos abaixo na ordem. Se qualquer passo falhar, **PARE** e reporte o erro — não pule etapas nem invente dados.

---

## CONFIGURAÇÃO FIXA

- **Repo de insumos (JSONs):** `https://github.com/jgbebedourosmkt-dev/seo-automation-pbr.git`
- **Repo do site:** `https://github.com/jgbebedourosmkt-dev/portal-do-bebedouro.git`
- **Branch alvo:** `main` (nos dois repos)
- **JSON da linha:** `saida/linha_dados.json`
- **JSON da SERP (URLs):** `saida/serp_urls.json`
- **JSON da SERP (conteúdo):** `saida/serp_content.json`
- **Destino da página:** `app/<slug>/page.tsx`
- **Componente de layout:** `PilarLayout` (importado de `@/components/pilar/PilarLayout`)

---

## PASSO 1 — Clonar o repo de insumos e ler os JSONs

1. Clone o repo de insumos em um diretório temporário:
   ```
   git clone https://github.com/jgbebedourosmkt-dev/seo-automation-pbr.git /tmp/seo-pbr
   ```

2. Leia os três arquivos dentro de `/tmp/seo-pbr/saida/`:
   - `linha_dados.json`
   - `serp_urls.json`
   - `serp_content.json`

3. Confirme que os três arquivos existem e têm conteúdo não vazio. Se qualquer um estiver ausente ou vazio, **PARE** e reporte: "PASSO 1 — FALHOU: `<nome>.json` não encontrado ou vazio no repo seo-automation-pbr, branch main."

4. Guarde o valor de `meta.keyword` de `linha_dados.json` — ele identifica a execução em todos os logs.

---

## PASSO 2 — Extrair variáveis dos JSONs

### 2A — Dados da planilha (`linha_dados.json`)

Extraia e guarde estas variáveis (use exatamente esses nomes ao longo da execução):

| Variável | Caminho no JSON |
|---|---|
| `keyword` | `meta.keyword` |
| `titulo_h1` | `meta.titulo_h1` |
| `meta_title` | `meta.meta_title` |
| `meta_description` | `meta.meta_description` |
| `slug` | `meta.slug` |
| `intencao` | `meta.intencao` |
| `variacoes_semanticas` | `meta.variacoes_semanticas` |
| `links_internos_raw` | `meta.links_internos` (texto com bullets "• Âncora: …") |
| `imagens` | `meta.imagens` (array com `nome`, `raw_url`, `alt_text`) |

**Converter `links_internos_raw` para lista estruturada:**
Cada bullet segue o padrão `• Âncora: "<texto>" → <domínio>/<slug-alvo> (<contexto>)`.
Extraia de cada bullet:
- `label` = o texto entre aspas
- `href` = `/<slug-alvo>` (só o path, sem o domínio)

### 2B — Dados da SERP (`serp_content.json`)

- `minimo_palavras` = `minimo_palavras_recomendado` (mínimo de palavras para o artigo)
- `media_palavras_top3` = `media_palavras_top3`
- Para cada item em `concorrentes`: anote `titulo_pagina`, `num_palavras`, `intro`, `headings`

### 2C — URLs da SERP (`serp_urls.json`)

- Para cada item em `resultados`: anote `posicao`, `url`, `titulo_serp`, `descricao_serp`

### 2D — Análise SERP (antes de escrever)

Com os dados de 2B e 2C, responda mentalmente:

**A) Intenção de busca:** Que formato domina o top 3? (guia informacional, comparativo, lista, híbrido?)

**B) Tópicos obrigatórios:** Temas que aparecem nos títulos/headings de pelo menos 2 concorrentes — precisam estar no artigo.

**C) Diferenciação:** Temas em apenas 1 concorrente ou ausentes — ângulo único do artigo.

**D) Tamanho alvo:** `minimo_palavras` já está calculado. O corpo do artigo (dentro do PilarLayout) deve atingi-lo.

**E) Variações semânticas:** Inclua as de `variacoes_semanticas` naturalmente ao longo do texto.

Consolide tudo isso antes de escrever. Se algum campo estiver vazio (ex.: `concorrentes` vazio), registre "não presente" e siga.

---

## PASSO 3 — Escrever o `page.tsx`

Clone o repo do site:
```
git clone https://github.com/jgbebedourosmkt-dev/portal-do-bebedouro.git /tmp/site-pbr
```

Crie o arquivo `/tmp/site-pbr/app/<slug>/page.tsx` seguindo **exatamente** esta estrutura:

```tsx
import { buildMetadata } from '@/lib/metadata'
import { faqSchema, breadcrumbSchema } from '@/lib/schema'
import Topbar from '@/components/layout/Topbar'
import Header from '@/components/layout/Header'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import PilarLayout from '@/components/pilar/PilarLayout'

export const metadata = buildMetadata({
  title: '<meta_title>',
  description: '<meta_description>',
  slug: '<slug>',
})

const faqs = [
  // 4 a 6 perguntas derivadas dos headings dos concorrentes e das buscas relacionadas
  // Formato: { question: '...?', answer: '...' }
  // Resposta direta de 2-4 linhas, orientada a featured snippet
]

export default function <NomeDaFuncao>Page() {
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
            { name: '<titulo_h1>' },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />

      <PilarLayout
        badge="<badge>"
        title="<titulo_h1>"
        excerpt="<resumo de 1 frase para o excerpt>"
        breadcrumbLabel="<titulo_h1>"
        breadcrumbSlug="<slug>"
        ctaHref="https://jgbebedouros.com.br?utm_source=portalbebedouro&utm_medium=pilar&utm_campaign=<slug>"
        ctaLabel="Solicitar orçamento"
        sidebarCtaHref="https://jgbebedouros.com.br?utm_source=portalbebedouro&utm_medium=sidebar&utm_campaign=<slug>"
        finalCtaTitle="<CTA final — pergunta/convite direto sobre a keyword>"
        finalCtaDesc="<1 frase de apoio ao CTA>"
        tocItems={[
          // 4 a 6 itens de sumário, href="#id-da-secao" derivado dos H2s que você vai escrever
        ]}
        stats={[
          // 3 a 4 stats relevantes: { valor: '...', label: '...' }
          // Use dados reais do artigo (capacidade, normas, prazos, etc.)
        ]}
        faqs={faqs}
        internalLinks={[
          // Use TODOS os links de links_internos_raw convertidos para { href: '/slug', label: 'texto' }
        ]}
      >
        {/* Seções do artigo — mínimo: minimo_palavras palavras no total */}
        {/* Cada seção: <section id="id-da-secao" className="mb-12 scroll-mt-20"> */}
        {/* H2: className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }} */}
        {/* Parágrafos: className="text-[17px] text-txt2 leading-relaxed mb-4" */}

        {/* REGRAS DO CONTEÚDO: */}
        {/* 1. keyword no primeiro parágrafo (primeiros 100 chars) */}
        {/* 2. variacoes_semanticas distribuídas naturalmente */}
        {/* 3. Tópicos obrigatórios da análise 2D-B cobertos com pelo menos 1 seção cada */}
        {/* 4. Tópicos de diferenciação 2D-C com pelo menos 1 seção */}
        {/* 5. Imagens: use as de meta.imagens — <img src={raw_url} alt={alt_text} ... /> */}
        {/* 6. Especificações técnicas concretas (litros, voltagem, normas, prazos) */}
        {/* 7. FAQ no final via props faqs= (já passado acima) */}
      </PilarLayout>

      <Footer />
    </>
  )
}
```

**Regras de nomenclatura:**
- `<NomeDaFuncao>` = slug em PascalCase sem hífens. Ex.: `bebedouro-industrial` → `BebedouroIndustrial`
- `<badge>` = rótulo curto do tipo de conteúdo. Ex.: "Guia Completo", "Comparativo", "Lista"
- IDs de seção: kebab-case, sem acentos. Ex.: `id="o-que-e"`, `id="tipos"`, `id="capacidade"`

**Checklist antes de salvar:**
- [ ] `metadata` usa `meta_title` e `meta_description` da planilha?
- [ ] `title` do PilarLayout é o `titulo_h1`?
- [ ] Primeiro parágrafo tem a `keyword` nos primeiros 100 chars?
- [ ] Todos os `links_internos_raw` convertidos e passados em `internalLinks`?
- [ ] Imagens de `meta.imagens` usadas no corpo?
- [ ] FAQs preenchidas com 4 a 6 perguntas relevantes?
- [ ] `tocItems` bate com os IDs das seções escritas?
- [ ] Contagem de palavras no corpo ≥ `minimo_palavras`?

---

## PASSO 4 — Publicar no repositório do site (Git)

Dentro de `/tmp/site-pbr`:

```
git config user.email "jgbebedourosmkt@gmail.com"
git config user.name "SEO Automation"
git pull origin main
git add app/<slug>/
git commit -m "feat(content): adiciona página pilar <keyword>"
git push origin main
```

Confira cada comando antes de avançar. Se `git pull` trouxer conflito, **PARE** e reporte. Se o push retornar `main -> main`, a Vercel vai deployar automaticamente.

---

## PASSO 5 — Rotacionar a linha na planilha

Esta etapa garante que na próxima execução a "primeira linha" seja a próxima da fila. Faça **exatamente nesta ordem**.

1. Abra a planilha: https://docs.google.com/spreadsheets/d/1Pug3l_jGx9NOBIJ-qpjL9Klu9NwvZXZ1LI9Ny8Ba-G4/edit, aba **Páginas Pilar**.

2. **Identifique a última linha preenchida** (a última que tem qualquer dado, não conte linhas vazias).

3. **Copie a linha 1 de dados** (a que você acabou de processar — primeira linha após o cabeçalho) e **cole logo após a última linha preenchida**, mantendo todos os campos originais idênticos.

4. **Confirme** que a linha colada apareceu no final e que os dados batem com o processado (mesma `keyword`, mesmo `slug`).

5. Só depois de confirmar, **delete a linha 1 de dados** original. Use "Excluir linha" — não use "Limpar conteúdo".

6. Verifique que a nova primeira linha de dados é uma keyword **diferente**. Se for a mesma, algo deu errado — **PARE** e reporte.

---

## PASSO 6 — Relatório final

Ao final, responda no chat com este resumo:

```
Página pilar publicada

Keyword: <keyword>
Slug: /<slug>
Arquivo: app/<slug>/page.tsx
Commit: <hash>
Palavras (corpo): <contagem>
Links internos inseridos: <X/Y>
Imagens inseridas: <X/Y>
Próxima keyword na fila: <keyword da nova primeira linha ou "fila vazia">
```

---

## TRATAMENTO DE ERROS

Se qualquer passo falhar, **PARE** imediatamente, **não desfaça nada** e reporte:
- Em qual passo falhou
- Mensagem de erro exata
- O que NÃO foi feito (para retomar manualmente)

Nunca: invente dados da SERP, edite arquivos fora dos caminhos definidos, force push, faça commit em outra branch, ou pule o passo de rotacionar a linha.
