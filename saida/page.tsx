import { buildMetadata } from '@/lib/metadata'
import { faqSchema, breadcrumbSchema } from '@/lib/schema'
import Topbar from '@/components/layout/Topbar'
import Header from '@/components/layout/Header'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import PilarLayout from '@/components/pilar/PilarLayout'

export const metadata = buildMetadata({
  title: 'Bebedouro Inox 3 Torneiras: Modelos e Especificações',
  description: 'Bebedouro Inox 3 Torneiras: ideal para ambientes com fluxo alto de usuários. Veja capacidades e dimensões.',
  slug: 'bebedouro-inox-3-torneiras',
})

const faqs = [
  {
    question: 'Qual é a capacidade de armazenamento de um bebedouro inox 3 torneiras?',
    answer: 'A maioria dos modelos possui reservatório de 100 litros, com capacidade de resfriamento entre 5 e 12 litros por hora. Isso é suficiente para atender grupos de 50 a 100 pessoas durante um turno de trabalho de 8 horas.',
  },
  {
    question: 'O bebedouro inox 3 torneiras precisa de instalação hidráulica?',
    answer: 'Sim. O equipamento se conecta diretamente à rede hidráulica, sem necessidade de galão. É necessária uma entrada de água fria com pressão entre 10 e 40 mca, tomada elétrica de 110 V ou 220 V e ralo para drenagem do excesso.',
  },
  {
    question: 'Qual a diferença entre o bebedouro inox 2 torneiras e o de 3 torneiras?',
    answer: 'O modelo de 3 torneiras permite atendimento simultâneo de até três pessoas, reduzindo filas em locais de alto fluxo. O de 2 torneiras é mais indicado para locais com menor circulação, sendo mais compacto e de menor consumo energético.',
  },
  {
    question: 'O bebedouro inox 3 torneiras é certificado pelo INMETRO?',
    answer: 'Sim. Todos os modelos com sistema elétrico de refrigeração devem ter certificação INMETRO obrigatória no Brasil. A certificação garante conformidade com as normas de segurança elétrica, eficiência energética e com a NBR 13713.',
  },
  {
    question: 'Quais ambientes são mais indicados para o bebedouro inox 3 torneiras?',
    answer: 'O modelo é ideal para indústrias, fábricas, galpões logísticos, academias, escolas, igrejas, restaurantes, padarias, supermercados e postos de gasolina — qualquer local com alta circulação de pessoas que exige atendimento simultâneo de múltiplos usuários.',
  },
]

export default function BebedouroInox3TorneirasPage() {
  return (
    <>
      <Topbar />
      <Header />
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', slug: '' },
              { name: 'Bebedouro Inox 3 Torneiras: Modelos e Especificações' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <PilarLayout
        badge="Guia Completo"
        title="Bebedouro Inox 3 Torneiras: Modelos e Especificações"
        excerpt="O bebedouro inox 3 torneiras é a solução industrial para ambientes com alto fluxo de pessoas, com reservatório de 100 litros, três saídas simultâneas e certificação INMETRO."
        breadcrumbLabel="Bebedouro Inox 3 Torneiras: Modelos e Especificações"
        breadcrumbSlug="bebedouro-inox-3-torneiras"
        ctaHref="https://jgbebedouros.com.br?utm_source=portalbebedouro&utm_medium=pilar&utm_campaign=bebedouro-inox-3-torneiras"
        ctaLabel="Solicitar orçamento"
        sidebarCtaHref="https://jgbebedouros.com.br?utm_source=portalbebedouro&utm_medium=sidebar&utm_campaign=bebedouro-inox-3-torneiras"
        finalCtaTitle="Precisa de bebedouro inox 3 torneiras?"
        finalCtaDesc="A JG Bebedouros oferece venda e manutenção em todo o Brasil."
        tocItems={[
          { href: '#o-que-e-bebedouro-inox-3-torneiras', label: 'O Que É um Bebedouro Inox 3 Torneiras' },
          { href: '#modelos-e-especificacoes-tecnicas', label: 'Modelos e Especificações Técnicas' },
          { href: '#capacidade-e-refrigeracao', label: 'Capacidade e Refrigeração' },
          { href: '#ambientes-ideais', label: 'Ambientes Ideais' },
          { href: '#instalacao-e-manutencao', label: 'Instalação e Manutenção' },
          { href: '#normas-e-certificacoes', label: 'Normas e Certificações' },
          { href: '#modelos-relacionados', label: 'Modelos Relacionados' },
          { href: '#como-comprar', label: 'Como Comprar ou Solicitar Orçamento' },
        ]}
        stats={[
          { valor: '100 L', label: 'Capacidade do reservatório' },
          { valor: '3', label: 'Saídas de água simultâneas' },
          { valor: '110/220 V', label: 'Tensão disponível' },
          { valor: 'INMETRO', label: 'Certificação obrigatória' },
        ]}
        faqs={faqs}
        internalLinks={[
          { href: '/bebedouro-inox', label: 'bebedouro inox' },
          { href: '/bebedouro-inox-2-torneiras', label: 'bebedouro inox 2 torneiras' },
          { href: '/bebedouro-inox-4-torneiras', label: 'bebedouro inox 4 torneiras' },
          { href: '/bebedouro-inox-25-litros', label: 'bebedouro inox 25 litros' },
          { href: '/bebedouro-para-empresa', label: 'bebedouro para empresa' },
          { href: '/blog/bebedouro-industrial-preco-2025', label: 'veja a faixa de preço' },
          { href: '/local/bebedouro-industrial-sao-paulo', label: 'em São Paulo' },
        ]}
      >
        <section id="o-que-e-bebedouro-inox-3-torneiras" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>O Que É um Bebedouro Inox 3 Torneiras</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            O <a href="/bebedouro-inox" className="text-az hover:underline">bebedouro inox</a> 3 torneiras é um equipamento industrial fabricado em aço inoxidável com três saídas de água independentes, permitindo o atendimento simultâneo de três usuários. Projetado para ambientes de alta circulação, conta com reservatório de até 100 litros, sistema de refrigeração por compressor hermético e certificação INMETRO obrigatória no Brasil.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            O corpo em aço inox garante resistência à corrosão, facilidade de limpeza e longa vida útil mesmo em ambientes agressivos, como fábricas e galpões. A estrutura robusta suporta uso intensivo diário, tornando este modelo o mais indicado entre os bebedouros industriais para alto fluxo de pessoas.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            Diferente dos modelos domésticos, o bebedouro inox 3 torneiras conecta-se diretamente à rede hidráulica, eliminando a necessidade de reposição manual de água. Isso garante abastecimento contínuo durante toda a jornada de trabalho, sem interrupções ou preocupações logísticas com galões.
          </p>
        </section>

        <section id="modelos-e-especificacoes-tecnicas" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Modelos e Especificações Técnicas</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            Para escolher o modelo mais adequado, é fundamental conhecer as especificações dos bebedouros inox 3 torneiras disponíveis no mercado. Os modelos mais populares possuem reservatório de 100 litros, corpo em aço inox escovado 430 ou 304, torneiras em inox ou plástico de alto impacto, e sistema de filtragem integrado ou externo.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            <img
              src="https://raw.githubusercontent.com/jgbebedourosmkt-dev/portal-do-bebedouro-imagens/main/bebedouro%20industrial%20inox%203%20torneiras%20robust%20100%20litros.png"
              alt="bebedouro industrial inox 3 torneiras robust 100 litros"
              className="rounded-lg object-cover w-2/5"
              style={{ float: 'left', marginRight: '15px', marginBottom: '8px' }}
              loading="lazy"
            />
            Entre os modelos mais procurados estão o Acqua Gelata 100L 3 Torneiras, o ROBUST 100 Litros Inox e o LIDER 100L Escovado. Todos apresentam torneiras independentes — em geral duas saídas de água gelada e uma de água natural —, com fluxo contínuo e encaixe direto na rede hidráulica sem necessidade de adaptadores especiais.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            As dimensões variam conforme o fabricante, mas o padrão mais comum é: altura entre 100 e 120 cm, largura entre 55 e 65 cm e profundidade de 40 a 50 cm. O peso aproximado situa-se entre 35 e 55 kg, dependendo do modelo e dos componentes opcionais incluídos na configuração de fábrica.
          </p>
          <div style={{ clear: 'both' }} />
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            A tensão elétrica disponível costuma ser 110 V ou 220 V, com consumo médio de 200 a 350 W em operação normal. Vários fabricantes oferecem versão bivolt, o que facilita a instalação em diferentes ambientes industriais e comerciais sem a necessidade de transformadores adicionais.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            A torneira de água natural, presente na maioria dos modelos de 3 saídas, é especialmente valorizada em ambientes que exigem conformidade com a NR-24 — norma que regulamenta as condições de higiene e conforto nos locais de trabalho. Esse recurso garante que os trabalhadores tenham acesso tanto à água gelada quanto à temperatura ambiente, atendendo a diferentes necessidades fisiológicas ao longo do turno.
          </p>
        </section>

        <section id="capacidade-e-refrigeracao" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Capacidade e Sistema de Refrigeração</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            O sistema de refrigeração do bebedouro inox 3 torneiras utiliza compressor hermético de alta eficiência, capaz de resfriar a água a temperaturas entre 5°C e 12°C conforme a regulagem do termostato. O reservatório de 100 litros garante abastecimento contínuo mesmo durante os picos de consumo, como intervalos de turno em fábricas e horários de recreio em escolas.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            A capacidade de resfriamento varia de 5 a 8 litros por hora nos modelos convencionais, podendo chegar a 12 litros/hora nos modelos de alto desempenho. Esse desempenho é suficiente para atender grupos de 50 a 100 pessoas durante um turno de trabalho de 8 horas com abastecimento contínuo e temperatura estável.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            O circuito de refrigeração é selado e utiliza gás refrigerante compatível com as normas ambientais vigentes no Brasil. A eficiência do compressor é preservada por um condensador de alumínio posicionado na parte traseira do equipamento, que facilita a dissipação de calor e protege os componentes internos da superaquecimento.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            Para ambientes com temperatura ambiente elevada — como galpões sem climatização —, é recomendável optar por modelos com maior capacidade de resfriamento e garantir ventilação adequada ao redor do equipamento. Manter pelo menos 15 cm de distância das paredes laterais e traseira é fundamental para o desempenho correto do condensador.
          </p>
        </section>

        <section id="ambientes-ideais" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Ambientes Ideais para Instalação</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            O bebedouro inox 3 torneiras foi desenvolvido para atender ambientes com alta concentração de pessoas e fluxo intenso ao longo do dia. Os principais locais de uso incluem indústrias, fábricas, galpões logísticos, academias, escolas, igrejas, restaurantes, padarias, supermercados e postos de gasolina — qualquer ponto com mais de 50 usuários por turno se beneficia diretamente deste modelo.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            Em indústrias e fábricas, a escolha pelo inox é especialmente estratégica: o aço inoxidável resiste aos agentes químicos e à umidade comuns nesses ambientes, reduzindo custos com reposição precoce do equipamento. Além disso, a conformidade com a NR-24 torna o bebedouro industrial obrigatório em muitos setores produtivos, especialmente onde há mais de 20 trabalhadores alocados no mesmo turno.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            Para uso corporativo, um <a href="/bebedouro-para-empresa" className="text-az hover:underline">bebedouro para empresa</a> com 3 torneiras reduz filas e otimiza o tempo dos colaboradores durante os intervalos. Em escolas e centros esportivos, o equipamento é indicado como solução segura para o abastecimento coletivo de água potável em conformidade com as normas sanitárias vigentes.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            Em locais com alta circulação sazonal — como igrejas, auditórios e centros de eventos —, a capacidade de 100 litros e as três saídas simultâneas evitam filas e garantem abastecimento contínuo mesmo nos momentos de maior demanda, sem necessidade de intervenção do operador para reposição de água.
          </p>
        </section>

        <section id="instalacao-e-manutencao" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Instalação e Manutenção</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            <img
              src="https://raw.githubusercontent.com/jgbebedourosmkt-dev/portal-do-bebedouro-imagens/main/bebedouro%20100%20litros%20inox%203%20torneiras%20robust%20angulo%20fontal.png"
              alt="bebedouro 100 litros inox 3 torneiras robust angulo fontal"
              className="rounded-lg object-cover w-2/5"
              style={{ float: 'left', marginRight: '15px', marginBottom: '8px' }}
              loading="lazy"
            />
            A instalação do bebedouro inox 3 torneiras é direta na rede hidráulica, sem necessidade de galão ou reservatório externo. São necessários: uma entrada de água fria com pressão entre 10 e 40 mca, uma tomada elétrica de 110 V ou 220 V próxima ao local, e um ralo para drenagem da água de descarte do aparador frontal.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            O processo de instalação leva em média 30 a 60 minutos e pode ser realizado por um técnico em hidráulica ou elétrica básica. O bebedouro deve ser posicionado em local plano, ventilado e distante de fontes de calor para garantir o desempenho ideal do sistema de refrigeração e evitar sobrecarga no compressor.
          </p>
          <div style={{ clear: 'both' }} />
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            A manutenção preventiva deve ser realizada a cada 6 meses, incluindo a troca do filtro de água, limpeza interna do reservatório com solução clorada conforme a RDC 275, verificação do compressor, inspeção das torneiras e checagem das conexões hidráulicas. Uma manutenção correta prolonga a vida útil do equipamento por 10 a 15 anos.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            Para estabelecimentos sujeitos à vigilância sanitária — como restaurantes, escolas e hospitais —, é obrigatório manter o registro de manutenções realizadas e garantir a conformidade permanente com a RDC 275 da ANVISA. Esse controle protege os usuários e evita autuações durante vistorias sanitárias periódicas.
          </p>
        </section>

        <section id="normas-e-certificacoes" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Normas e Certificações</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            Todo bebedouro inox 3 torneiras comercializado no Brasil deve atender à NBR 13713 da ABNT, que especifica os requisitos de segurança, desempenho e materiais para bebedouros elétricos de pressão. A norma determina critérios de filtragem, resistência dos materiais, temperatura mínima da água gelada e conformidade de todos os componentes elétricos com as normas técnicas nacionais.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            A certificação INMETRO é obrigatória para todos os modelos com sistema elétrico de refrigeração no Brasil. Ela garante que o equipamento foi submetido a testes de segurança elétrica, eficiência energética e conformidade técnica antes de ser comercializado, protegendo o comprador contra equipamentos irregulares ou de baixa qualidade.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            Em ambientes de trabalho, a NR-24 do Ministério do Trabalho estabelece que bebedouros devem ser instalados em quantidade proporcional ao número de trabalhadores, fornecendo água potável de boa qualidade. Para estabelecimentos de alimentos e bebidas, a RDC 275 da ANVISA complementa esses requisitos com exigências específicas de higiene, rastreabilidade e periodicidade das manutenções registradas.
          </p>
        </section>

        <section id="modelos-relacionados" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Modelos Relacionados</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            Quem pesquisa o bebedouro inox 3 torneiras frequentemente compara com modelos de capacidade diferente ou número de saídas distinto. Conhecer todas as opções disponíveis ajuda a fazer a escolha mais adequada para o volume de usuários e o espaço físico disponível no ambiente.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            O <a href="/bebedouro-inox-2-torneiras" className="text-az hover:underline">bebedouro inox 2 torneiras</a> é indicado para locais com fluxo moderado, como escritórios com até 30 pessoas, sendo mais compacto e de menor consumo energético. Já o <a href="/bebedouro-inox-4-torneiras" className="text-az hover:underline">bebedouro inox 4 torneiras</a> é a escolha para ambientes com demanda ainda maior, como grandes fábricas, escolas com centenas de alunos ou refeitórios industriais.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            Para espaços com restrição de altura ou necessidade de mobilidade, o <a href="/bebedouro-inox-25-litros" className="text-az hover:underline">bebedouro inox 25 litros</a> oferece uma alternativa mais compacta e prática, ideal para salas de reunião, recepções ou pequenos comércios que não comportam um modelo de chão de grande porte. Comparar as opções disponíveis permite uma decisão mais assertiva e econômica.
          </p>
        </section>

        <section id="como-comprar" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Como Comprar ou Solicitar Orçamento</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            A aquisição de um bebedouro inox 3 torneiras pode ser feita diretamente com fabricantes especializados, distribuidoras autorizadas ou por meio de lojas físicas e online. Antes de fechar a compra, verifique se o modelo possui certificação INMETRO válida e se o fornecedor oferece assistência técnica credenciada na sua região.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            Para conhecer os valores atualizados dos modelos disponíveis no mercado, <a href="/blog/bebedouro-industrial-preco-2025" className="text-az hover:underline">veja a faixa de preço</a> na nossa seção de referências. Os preços variam conforme o fabricante, o tipo de compressor, o acabamento inox (430 ou 304) e os acessórios inclusos, como filtro, aparador de inox e sistema de dreno.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            Se você está <a href="/local/bebedouro-industrial-sao-paulo" className="text-az hover:underline">em São Paulo</a> ou região, a JG Bebedouros oferece entrega rápida, instalação técnica e contrato de manutenção preventiva com periodicidade semestral. Solicite um orçamento pelo site e receba atendimento personalizado de um especialista em até 24 horas úteis.
          </p>
        </section>
      </PilarLayout>
      <Footer />
    </>
  )
}
