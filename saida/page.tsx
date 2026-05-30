import { buildMetadata } from '@/lib/metadata'
import { faqSchema, breadcrumbSchema } from '@/lib/schema'
import Topbar from '@/components/layout/Topbar'
import Header from '@/components/layout/Header'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import PilarLayout from '@/components/pilar/PilarLayout'

export const metadata = buildMetadata({
  title: 'Bebedouro Elétrico Industrial: Guia Completo 2025',
  description: 'Bebedouro Elétrico Industrial: tipos, características, normas e onde comprar. Guia completo para sua aplicação específica.',
  slug: 'bebedouro-eletrico-industrial',
})

const faqs = [
  {
    question: 'Qual a diferença entre bebedouro elétrico industrial e doméstico?',
    answer: 'O bebedouro elétrico industrial possui estrutura em aço inox AISI 304, capacidade de reservatório de 25 a 200 litros, compressor de alta performance e certificações INMETRO e NBR 13713. Os modelos domésticos são menores, usam materiais mais simples e não suportam uso contínuo em ambientes de alta demanda como fábricas e galpões.',
  },
  {
    question: 'Qual a capacidade mínima recomendada para uso industrial?',
    answer: 'Para ambientes industriais com mais de 30 colaboradores, recomenda-se no mínimo um modelo de 50 litros com 2 torneiras. Para mais de 100 pessoas por turno, opte por modelos de 100 a 200 litros com 3 ou 4 torneiras. A NR-24 exige que a empresa garanta água potável em quantidade suficiente para todos os trabalhadores.',
  },
  {
    question: 'O bebedouro elétrico industrial precisa de certificação INMETRO?',
    answer: 'Sim. O INMETRO certifica bebedouros elétricos industriais por meio do Programa de Avaliação da Conformidade (PAC). A certificação garante conformidade com segurança elétrica, consumo de energia e fabricação em materiais adequados conforme a NBR 13713. Exija sempre o número de certificação INMETRO do fornecedor antes da compra.',
  },
  {
    question: 'Qual a diferença entre modelos 127V e 220V para uso industrial?',
    answer: 'Modelos 127V são indicados para escritórios e refeitórios industriais com rede elétrica convencional. Modelos 220V são recomendados para galpões e linhas de produção com rede elétrica industrial. Alguns fabricantes oferecem versões bivolt que se adaptam automaticamente. Consulte sempre o eletricista responsável antes de escolher a tensão.',
  },
  {
    question: 'Com que frequência devo fazer manutenção no bebedouro elétrico industrial?',
    answer: 'A manutenção preventiva deve ser realizada a cada 6 meses, incluindo limpeza do reservatório, troca de filtros e verificação do sistema de refrigeração. Em ambientes com água de qualidade inferior, o intervalo pode ser reduzido para 3 meses. A RDC 275 da ANVISA estabelece protocolos de higienização obrigatórios para bebedouros em ambientes coletivos.',
  },
]

export default function BebedouroEletricoIndustrialPage() {
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
              { name: 'Bebedouro Elétrico Industrial: Guia Completo 2025' },
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
        title="Bebedouro Elétrico Industrial: Guia Completo 2025"
        excerpt="O Bebedouro Elétrico Industrial é a solução de hidratação mais indicada para fábricas, galpões, refeitórios e qualquer ambiente de trabalho de alta demanda contínua."
        breadcrumbLabel="Bebedouro Elétrico Industrial: Guia Completo 2025"
        breadcrumbSlug="bebedouro-eletrico-industrial"
        ctaHref="https://jgbebedouros.com.br?utm_source=portalbebedouro&utm_medium=pilar&utm_campaign=bebedouro-eletrico-industrial"
        ctaLabel="Solicitar orçamento"
        sidebarCtaHref="https://jgbebedouros.com.br?utm_source=portalbebedouro&utm_medium=sidebar&utm_campaign=bebedouro-eletrico-industrial"
        finalCtaTitle="Precisa de Bebedouro Elétrico Industrial?"
        finalCtaDesc="A JG Bebedouros oferece venda e manutenção em todo o Brasil."
        tocItems={[
          { href: '#o-que-e', label: 'O que é um Bebedouro Elétrico Industrial' },
          { href: '#como-funciona', label: 'Como Funciona a Refrigeração Elétrica' },
          { href: '#capacidades', label: 'Capacidades: de 25 a 200 Litros' },
          { href: '#numero-de-torneiras', label: 'Quantas Torneiras Escolher' },
          { href: '#materiais', label: 'Materiais e Acabamentos Inox' },
          { href: '#normas', label: 'Normas e Certificações' },
          { href: '#voltagem', label: 'Voltagem: 127V ou 220V' },
          { href: '#como-escolher', label: 'Como Escolher o Modelo Ideal' },
          { href: '#modelos-relacionados', label: 'Modelos Relacionados' },
          { href: '#atendimento', label: 'Atendimento em São Paulo' },
        ]}
        stats={[
          { valor: '25 a 200L', label: 'faixa de capacidade disponível' },
          { valor: '2 a 4', label: 'opções de torneiras por modelo' },
          { valor: '127V/220V', label: 'tensões disponíveis' },
          { valor: 'NBR 13713', label: 'norma técnica obrigatória' },
        ]}
        faqs={faqs}
        internalLinks={[
          { href: '/bebedouro-industrial', label: 'bebedouro industrial' },
          { href: '/tipos-de-bebedouro', label: 'tipos de bebedouro' },
          { href: '/bebedouro-com-motor', label: 'bebedouro com motor' },
          { href: '/bebedouro-com-filtro', label: 'bebedouro com filtro' },
          { href: '/blog/como-escolher-bebedouro-industrial', label: 'leia o guia completo' },
          { href: '/local/bebedouro-industrial-sao-paulo', label: 'atendimento em São Paulo' },
        ]}
      >
        <section id="o-que-e" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>O que é um Bebedouro Elétrico Industrial</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O bebedouro elétrico industrial é um equipamento de refrigeração de água projetado para uso em ambientes de alta demanda, como fábricas, galpões, refeitórios e hospitais. Diferente de um simples <a href="/bebedouro-industrial" className="text-az hover:underline">bebedouro industrial</a> de galão, o modelo elétrico resfria a água por compressor ou sistema termoelétrico, garantindo hidratação contínua em longas jornadas de trabalho.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Esses equipamentos possuem estrutura em aço inox AISI 304, capacidade de reservatório de 25 a 200 litros e são certificados pelo INMETRO conforme a NBR 13713. São a solução mais indicada para empresas que precisam garantir hidratação segura, contínua e em conformidade com a legislação trabalhista brasileira.</p>
        </section>

        <section id="como-funciona" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Como Funciona a Refrigeração Elétrica</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Nos bebedouros elétricos industriais, a refrigeração pode ser feita por dois sistemas principais: compressor ou termoelétrico (Peltier). Cada tecnologia tem vantagens distintas dependendo do ambiente de instalação e da demanda diária de consumo do local.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O sistema de compressor funciona como um ar-condicionado em miniatura: o compressor pressiona um gás refrigerante que percorre um ciclo de expansão e resfria o reservatório de água. É a tecnologia mais eficiente para grandes volumes e ambientes quentes, mantendo a temperatura da água entre 5°C e 12°C mesmo nos dias mais quentes do ano.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Já o sistema termoelétrico (módulo Peltier) usa corrente elétrica para criar uma diferença de temperatura entre duas faces do módulo: uma face esfria a água enquanto a outra dissipa calor. É mais silencioso e compacto, porém menos eficiente em ambientes com temperatura acima de 30°C ou para demandas muito elevadas.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Para ambientes industriais pesados — como linhas de produção com mais de 50 operadores — o sistema de compressor é sempre a escolha recomendada. Ele garante que a água permaneça fria por horas seguidas, reduzindo o tempo de espera dos colaboradores durante os intervalos coletivos.</p>
        </section>

        <section id="capacidades" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Capacidades Disponíveis: de 25 a 200 Litros</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O bebedouro elétrico industrial está disponível em uma ampla faixa de capacidades, que vai de 25 litros até 200 litros por reservatório. A escolha do volume correto depende do número de colaboradores atendidos e da frequência de uso durante o expediente de trabalho.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            <img
              src="https://raw.githubusercontent.com/jgbebedourosmkt-dev/portal-do-bebedouro-imagens/main/bebedouro%2025%20e%2030%20litros%20inox%202%20torneiras%20industrial.png"
              alt="bebedouro 25 e 30 litros inox 2 torneiras industrial"
              className="rounded-lg object-cover w-2/5"
              style={{ float: 'left', marginRight: '15px', marginBottom: '8px' }}
              loading="lazy"
            />
            O modelo de 25 litros é ideal para escritórios industriais ou salas de descanso com até 30 colaboradores. Ele ocupa pouco espaço e pode ser reabastecido facilmente, sendo uma opção econômica para áreas administrativas dentro de plantas industriais.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Os modelos de 50 litros atendem galpões médios com 50 a 100 operadores, garantindo reserva suficiente para turnos de 4 a 6 horas sem necessidade de reabastecimento frequente. São os mais vendidos para linhas de produção de porte médio no Brasil.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Para refeitórios industriais, hospitais e grandes fábricas, os modelos de 100 a 200 litros são indispensáveis. Com essa capacidade, é possível atender centenas de colaboradores sem interrupção no fornecimento de água gelada. Nesses casos, modelos de 200 litros com 4 torneiras garantem fluxo simultâneo para múltiplas filas de atendimento.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Como referência, a NR-24 exige que todo ambiente de trabalho disponha de água potável em quantidade suficiente para todos os trabalhadores. Um bebedouro de 50 litros com 2 torneiras atende aproximadamente 50 pessoas por turno de 8 horas em condições normais de temperatura ambiente.</p>
          <div style={{ clear: 'both' }} />
        </section>

        <section id="numero-de-torneiras" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Quantas Torneiras Escolher: 2, 3 ou 4</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O número de torneiras define a agilidade no atendimento coletivo e é um dos critérios mais importantes na escolha do bebedouro elétrico industrial. Modelos com 2 torneiras são indicados para até 50 usuários simultâneos, enquanto versões com 3 ou 4 torneiras atendem ambientes de maior demanda e fluxo.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Nos modelos com 2 torneiras, uma pode ser configurada para água gelada e outra para água em temperatura natural. Esse arranjo é ideal para escritórios industriais e refeitórios de porte médio, onde nem todos os colaboradores preferem água gelada durante o expediente.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Bebedouros com 3 torneiras oferecem opções de água gelada, natural e quente — a saída de água quente é especialmente útil para cozinhas industriais, ambulatórios e cantinas. Essa versatilidade reduz a necessidade de outros equipamentos na área de descanso dos colaboradores.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O modelo de 4 torneiras é indicado para grandes galpões, hospitais e plantas industriais com alto fluxo de pessoas. Com quatro saídas simultâneas, o tempo de espera cai significativamente durante os intervalos coletivos, evitando filas e aumentando a produtividade geral do ambiente de trabalho.</p>
        </section>

        <section id="materiais" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Materiais e Acabamentos: Aço Inox</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O aço inox é o material padrão para bebedouros elétricos industriais e sua adoção não é opcional: a RDC 275 da ANVISA exige que equipamentos em contato com água potável em ambientes coletivos sejam fabricados em material de grau alimentar, resistente à corrosão e de fácil higienização.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O aço inox AISI 304 (ou 18/8) é o mais utilizado nos reservatórios e nas torneiras. Ele resiste à oxidação, à umidade industrial e a produtos de limpeza sem contaminar a água. Modelos de qualidade inferior que usam plástico ou galvanizado podem comprometer a potabilidade e têm vida útil significativamente menor.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Além do reservatório, as torneiras e o gabinete externo de modelos industriais também são fabricados em inox, garantindo maior resistência a impactos e à exposição a produtos químicos comuns em ambientes de fabricação. O acabamento escovado facilita a inspeção visual e a manutenção periódica do equipamento.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Verifique sempre se o modelo possui o lacre de higienização do INMETRO e se o fabricante fornece ficha técnica com a especificação do aço utilizado. Esse dado é fundamental em licitações públicas e auditorias de conformidade sanitária realizadas pela Vigilância Sanitária municipal.</p>
        </section>

        <section id="normas" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Normas e Certificações: INMETRO, NBR 13713 e NR-24</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Bebedouros elétricos industriais estão sujeitos a um conjunto de normas técnicas e regulatórias que visam garantir a segurança elétrica, a potabilidade da água e as condições adequadas de trabalho. O não cumprimento dessas normas pode resultar em autuações da Vigilância Sanitária ou do Ministério do Trabalho e Emprego.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A NBR 13713 da ABNT estabelece os requisitos mínimos para bebedouros de pressão e colunar, incluindo temperatura da água fornecida, vedação das torneiras, materiais em contato com a água e identificação do produto. Todo bebedouro vendido no Brasil deve ser fabricado em conformidade com essa norma técnica.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O INMETRO certifica os bebedouros por meio do Programa de Avaliação da Conformidade (PAC). A certificação garante que o equipamento foi testado e aprovado quanto à segurança elétrica, consumo de energia e compatibilidade eletromagnética. Exija o número de certificação INMETRO do fornecedor antes de fechar qualquer compra.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A NR-24 do Ministério do Trabalho e Emprego regulamenta as condições sanitárias nos locais de trabalho e determina que toda empresa deve fornecer água potável, fresca e em quantidade suficiente. O bebedouro elétrico industrial é a forma mais prática de cumprir essa obrigação legal. A RDC 275 da ANVISA complementa com exigências de materiais e protocolos de manutenção preventiva.</p>
        </section>

        <section id="voltagem" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Voltagem e Consumo de Energia: 127V ou 220V</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Bebedouros elétricos industriais estão disponíveis nas tensões 127V e 220V. A escolha da voltagem correta é essencial para evitar falhas no sistema elétrico da empresa, especialmente em instalações industriais onde a rede monofásica ou trifásica pode variar por setor da planta produtiva.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Modelos 127V são mais comuns em escritórios industriais e refeitórios conectados à rede convencional. Já os modelos 220V são recomendados para galpões e linhas de produção onde a rede elétrica industrial já opera nessa tensão. Alguns fabricantes oferecem modelos bivolt que se adaptam automaticamente à tensão disponível.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O consumo médio de energia de um bebedouro industrial de 50 litros fica entre 150W e 400W, dependendo do sistema de refrigeração e da temperatura ambiente. Em operação normal, o compressor não funciona continuamente: ele ativa apenas quando a água aquece acima do ponto de ajuste, mantendo o consumo médio relativamente baixo.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Para dimensionar corretamente, consulte a ficha técnica do equipamento e verifique com o eletricista responsável se o circuito disponível suporta a corrente nominal. Disjuntores subdimensionados são a causa mais comum de queima de compressor em ambiente industrial, gerando custos desnecessários de manutenção corretiva.</p>
        </section>

        <section id="como-escolher" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Como Escolher o Modelo Ideal para Sua Empresa</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Escolher o bebedouro elétrico industrial certo exige avaliar simultaneamente a demanda de consumo, o espaço físico disponível, a voltagem da rede elétrica e o orçamento. Um equipamento subdimensionado compromete a hidratação dos colaboradores; um superdimensionado representa custo desnecessário de aquisição e energia.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            <img
              src="https://raw.githubusercontent.com/jgbebedourosmkt-dev/portal-do-bebedouro-imagens/main/bebedouro%20industrial%20inox%202%20torneiras%20robust%2050%20litros.png"
              alt="bebedouro industrial inox 2 torneiras robust 50 litros"
              className="rounded-lg object-cover w-2/5"
              style={{ float: 'left', marginRight: '15px', marginBottom: '8px' }}
              loading="lazy"
            />
            O primeiro passo é estimar o consumo diário: uma pessoa consome em média de 2 a 3 litros de água por turno em ambientes normais — esse valor pode dobrar em locais quentes ou com esforço físico intenso. Multiplique pelo número de colaboradores e pelo número de horas do turno para chegar ao volume mínimo necessário.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O segundo critério é o ambiente de instalação. Em galpões expostos ao calor, prefira modelos com sistema de compressor e maior capacidade de reservatório. Em áreas fechadas com ar-condicionado, modelos termoelétricos de menor capacidade podem ser suficientes para equipes administrativas.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O acabamento em inox é obrigatório para ambientes sujeitos a umidade, produtos químicos ou exigências sanitárias da ANVISA. Modelos com gabinete de aço inox AISI 304 resistem melhor ao ambiente industrial e têm vida útil superior a 10 anos com manutenção adequada e programada.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Por último, verifique a assistência técnica autorizada disponível na sua cidade. Bebedouros industriais de marcas com rede de assistência nacional têm tempo de reparo médio menor e peças de reposição mais acessíveis. Para conhecer todos os <a href="/tipos-de-bebedouro" className="text-az hover:underline">tipos de bebedouro</a> disponíveis no mercado, acesse nosso guia comparativo.</p>
          <div style={{ clear: 'both' }} />
        </section>

        <section id="modelos-relacionados" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Modelos Relacionados</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Dependendo da sua aplicação específica, outros modelos podem complementar ou substituir o bebedouro elétrico industrial. Conheça as opções relacionadas para fazer a melhor escolha para o seu ambiente de trabalho e perfil de consumo.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O <a href="/bebedouro-com-motor" className="text-az hover:underline">bebedouro com motor</a> é indicado para ambientes onde a pressão da rede hídrica é baixa ou instável. O motor eleva a pressão interna garantindo fluxo constante mesmo em instalações com tubulação antiga ou abastecidas por poços artesianos com variação de pressão.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O <a href="/bebedouro-com-filtro" className="text-az hover:underline">bebedouro com filtro</a> adiciona uma etapa de purificação à cadeia de fornecimento de água. Para ambientes onde a qualidade da água da rede é questionável, o filtro integrado remove cloro, sedimentos e bactérias, elevando o padrão de qualidade entregue ao colaborador sem necessidade de equipamentos adicionais.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Para aprofundar o tema e entender qual modelo é o mais adequado para o seu caso, <a href="/blog/como-escolher-bebedouro-industrial" className="text-az hover:underline">leia o guia completo</a> sobre como escolher bebedouros industriais, com comparativos técnicos detalhados e recomendações por setor de atividade.</p>
        </section>

        <section id="atendimento" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Atendimento em São Paulo e em Todo o Brasil</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A JG Bebedouros realiza venda, instalação e manutenção de bebedouros elétricos industriais em todo o Brasil, com foco em São Paulo e região metropolitana. Nossa equipe técnica atende empresas de todos os portes, desde pequenas oficinas até grandes complexos industriais com múltiplos pontos de hidratação.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Oferecemos contratos de manutenção preventiva com visitas programadas, limpeza do sistema hidráulico, troca de filtros e verificação do sistema de refrigeração. Esse serviço garante conformidade permanente com a NR-24 e com as exigências da Vigilância Sanitária, evitando autuações e interrupções na operação da empresa.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Para empresas localizadas na capital paulista, nosso <a href="/local/bebedouro-industrial-sao-paulo" className="text-az hover:underline">atendimento em São Paulo</a> cobre todas as regiões da capital e da grande São Paulo, com tempo de resposta de até 24 horas para chamados urgentes. Solicite um orçamento sem compromisso e garanta a conformidade legal da sua empresa.</p>
        </section>
      </PilarLayout>
      <Footer />
    </>
  )
}
