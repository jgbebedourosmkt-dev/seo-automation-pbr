import { buildMetadata } from '@/lib/metadata'
import { faqSchema, breadcrumbSchema } from '@/lib/schema'
import Topbar from '@/components/layout/Topbar'
import Header from '@/components/layout/Header'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import PilarLayout from '@/components/pilar/PilarLayout'

export const metadata = buildMetadata({
  title: 'Bebedouro para Empresa: Guia Completo',
  description: 'Bebedouro para Empresa: tudo o que você precisa saber para escolher o modelo ideal para sua aplicação.',
  slug: 'bebedouro-para-empresa',
})

const faqs = [
  {
    question: 'Qual bebedouro é obrigatório por lei em empresas?',
    answer: 'A NR-24 do Ministério do Trabalho exige que todo empregador forneça água potável, fresca e em quantidade suficiente aos trabalhadores. Para isso, bebedouros coletivos com laudo de potabilidade e higienização periódica são a forma mais adequada de atender a norma. A NBR 13713 define os requisitos técnicos mínimos para esses equipamentos.',
  },
  {
    question: 'Quantos bebedouros são necessários para um escritório?',
    answer: 'A recomendação é de 1 bebedouro para cada 25 a 50 funcionários, dependendo da jornada e do tipo de atividade. Ambientes com trabalho físico intenso demandam mais pontos de abastecimento. O ideal é calcular pelo número de andares ou setores, garantindo no máximo 50 metros de distância entre o trabalhador e o bebedouro mais próximo.',
  },
  {
    question: 'Qual a diferença entre bebedouro industrial e bebedouro para escritório?',
    answer: 'O bebedouro industrial é construído em aço inox com reservatório de maior capacidade (50 L a 100 L), suportando alto fluxo de usuários em ambientes como fábricas e obras. Já o bebedouro para escritório tende a ser mais compacto, com design discreto e menor reservatório. Ambos devem possuir certificação INMETRO e atender à NBR 13713.',
  },
  {
    question: 'Bebedouro para empresa precisa de certificação INMETRO?',
    answer: 'Sim. O INMETRO certifica bebedouros coletivos de pressão conforme a NBR 13713, garantindo que o equipamento atende aos requisitos de segurança elétrica, qualidade dos materiais em contato com a água e desempenho do sistema de refrigeração. Empresas devem exigir o selo INMETRO no momento da compra para evitar autuações sanitárias.',
  },
  {
    question: 'Com que frequência deve ser feita a higienização do bebedouro empresarial?',
    answer: 'A RDC 275 da ANVISA e as boas práticas do setor recomendam higienização completa a cada 6 meses, incluindo limpeza do reservatório, troca de filtros e desinfecção com produtos adequados. Em locais com maior circulação de pessoas, como refeitórios e academias corporativas, a frequência pode ser trimestral. É obrigatório manter registro das manutenções realizadas.',
  },
]

export default function BebedouroParaEmpresaPage() {
  return (
    <>
      <Topbar /><Header /><Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Home', slug: '' }, { name: 'Bebedouro para Empresa: Guia Completo' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <PilarLayout
        badge="Guia Completo" title="Bebedouro para Empresa: Guia Completo"
        excerpt="Bebedouro para Empresa: saiba como escolher o modelo ideal, cumprir a NR-24 e garantir hidratação adequada aos colaboradores."
        breadcrumbLabel="Bebedouro para Empresa: Guia Completo" breadcrumbSlug="bebedouro-para-empresa"
        ctaHref="https://jgbebedouros.com.br?utm_source=portalbebedouro&utm_medium=pilar&utm_campaign=bebedouro-para-empresa"
        ctaLabel="Solicitar orcamento"
        sidebarCtaHref="https://jgbebedouros.com.br?utm_source=portalbebedouro&utm_medium=sidebar&utm_campaign=bebedouro-para-empresa"
        finalCtaTitle="Precisa de Bebedouro para Empresa?"
        finalCtaDesc="A JG Bebedouros oferece venda e manutencao em todo o Brasil."
        tocItems={[
          { href: '#o-que-e-bebedouro-para-empresa', label: 'O que é Bebedouro para Empresa?' },
          { href: '#por-que-ter-bebedouro-na-empresa', label: 'Por Que Ter Bebedouro na Empresa?' },
          { href: '#tipos-de-bebedouro-para-empresa', label: 'Tipos de Bebedouro para Empresa' },
          { href: '#como-escolher-o-bebedouro-ideal', label: 'Como Escolher o Bebedouro Ideal' },
          { href: '#capacidade-por-numero-de-funcionarios', label: 'Capacidade por Número de Funcionários' },
          { href: '#normas-tecnicas', label: 'Normas Técnicas e Exigências Legais' },
          { href: '#manutencao-do-bebedouro', label: 'Manutenção do Bebedouro Empresarial' },
          { href: '#custo-e-retorno', label: 'Custo e Retorno do Investimento' },
        ]}
        stats={[
          { valor: '1.900', label: 'buscas mensais por bebedouro para empresa' },
          { valor: '50 L', label: 'capacidade ideal para até 50 funcionários' },
          { valor: 'NR-24', label: 'norma que torna o bebedouro obrigatório no trabalho' },
          { valor: '6 meses', label: 'frequência recomendada de higienização pela RDC 275' },
        ]}
        faqs={faqs}
        internalLinks={[
          { href: '/bebedouro-industrial', label: 'Bebedouro Industrial' },
          { href: '/bebedouro-inox', label: 'Bebedouro Inox' },
          { href: '/bebedouro', label: 'Bebedouro' },
          { href: '/filtro-industrial', label: 'Filtro Industrial' },
          { href: '/bebedouro-com-motor', label: 'bebedouro com motor' },
          { href: '/bebedouro-de-coluna', label: 'bebedouro de coluna' },
          { href: '/bebedouro-de-agua', label: 'bebedouro de água' },
          { href: '/bebedouro-de-obra', label: 'bebedouro de obra' },
        ]}
      >
        <section id="o-que-e-bebedouro-para-empresa" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>O que é Bebedouro para Empresa?</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O <strong>bebedouro para empresa</strong> é um equipamento de abastecimento coletivo de água, projetado para ambientes corporativos com alto fluxo de usuários. Diferente dos modelos domésticos, ele suporta uso contínuo, possui maior reservatório e atende às normas NR-24 e NBR 13713, que regulamentam higiene e segurança nos locais de trabalho.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">No contexto brasileiro, o bebedouro empresarial pode ser chamado de bebedouro corporativo ou <a href="/bebedouro" className="text-az hover:underline">bebedouro</a> coletivo. Independentemente do nome, sua função é garantir acesso à água potável, fresca e segura para todos os colaboradores durante a jornada de trabalho.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Empresas de todos os portes — de pequenos escritórios a grandes indústrias — precisam de soluções adequadas ao seu volume de usuários, ao tipo de atividade exercida e às exigências sanitárias vigentes. Este guia reúne tudo que você precisa saber para tomar a decisão certa.</p>
        </section>

        <section id="por-que-ter-bebedouro-na-empresa" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Por Que Ter Bebedouro na Empresa é Obrigatório?</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A presença de bebedouros em empresas não é apenas uma questão de conforto — é uma obrigação legal. A <strong>NR-24</strong> (Norma Regulamentadora nº 24 do Ministério do Trabalho) estabelece que todo empregador deve fornecer água potável, fresca e em quantidade suficiente aos trabalhadores, por meio de instalações coletivas.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O descumprimento da NR-24 pode gerar autuações, multas e até interdições do estabelecimento pela fiscalização do trabalho. Além do aspecto legal, empresas que investem no bem-estar dos funcionários colhem benefícios diretos: menor índice de absenteísmo, maior produtividade e melhor clima organizacional.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Do ponto de vista da saúde, a hidratação adequada é fundamental para a performance cognitiva e física. Estudos mostram que uma redução de apenas 2% na hidratação corporal já compromete o desempenho mental. Em ambientes com ar-condicionado, como escritórios, a perda de água pelo corpo é ainda maior, tornando o acesso facilitado ao <a href="/bebedouro-de-agua" className="text-az hover:underline">bebedouro de água</a> indispensável.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Empresas que adotam bebedouros de qualidade também reforçam sua imagem institucional perante clientes, auditores e órgãos reguladores. A presença de equipamentos certificados pelo INMETRO demonstra compromisso com a conformidade sanitária e com a segurança alimentar conforme a <strong>RDC 275</strong> da ANVISA.</p>
        </section>

        <section id="tipos-de-bebedouro-para-empresa" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Tipos de Bebedouro para Empresa</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O mercado oferece diversos modelos de bebedouro empresarial, cada um adequado a um perfil de uso. Conhecer as diferenças entre eles é o primeiro passo para fazer a escolha certa.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            <img src="https://raw.githubusercontent.com/jgbebedourosmkt-dev/portal-do-bebedouro-imagens/main/bebedouro%20100%20e%2050%20litros%20inox%203%20e%202%20torneiras%20lado%20a%20lado.png" alt="bebedouro 100 e 50 litros inox 3 e 2 torneiras lado a lado" className="rounded-lg object-cover w-2/5" style={{ float: 'left', marginRight: '15px', marginBottom: '8px' }} loading="lazy" />
            O <strong>bebedouro industrial</strong> é o modelo mais robusto, feito em aço inox com reservatório de 50 L a 100 L e 2 ou 3 torneiras. É o tipo indicado para fábricas, obras, galpões e qualquer local com grande número de trabalhadores. Saiba mais sobre o <a href="/bebedouro-industrial" className="text-az hover:underline">Bebedouro Industrial</a> e suas aplicações específicas.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O <strong>bebedouro de coluna</strong> é versátil e adequado para escritórios, corredores e áreas de convivência. Sua estrutura vertical facilita o uso em pé sem necessidade de se curvar, atendendo às normas de ergonomia. Conheça as opções de <a href="/bebedouro-de-coluna" className="text-az hover:underline">bebedouro de coluna</a> para ambientes corporativos.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O <strong>bebedouro pressurizado</strong>, também chamado de <a href="/bebedouro-com-motor" className="text-az hover:underline">bebedouro com motor</a>, conecta-se diretamente à rede hidráulica. Ele elimina a necessidade de reabastecimento manual de garrafões, sendo ideal para locais com abastecimento de água encanada confiável. É a solução com menor custo operacional no longo prazo.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O modelo em <strong>aço inox</strong> é a escolha preferida para ambientes que exigem alta durabilidade e fácil higienização, como hospitais, clínicas, laboratórios e indústrias alimentícias. O <a href="/bebedouro-inox" className="text-az hover:underline">Bebedouro Inox</a> resiste à corrosão, não retém odores e facilita a limpeza conforme exigido pela vigilância sanitária.</p>
          <div style={{ clear: 'both' }} />
        </section>

        <section id="como-escolher-o-bebedouro-ideal" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Como Escolher o Bebedouro Ideal para Sua Empresa</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            <img src="https://raw.githubusercontent.com/jgbebedourosmkt-dev/portal-do-bebedouro-imagens/main/bebedouro%2025%20e%2030%20litros%20inox%202%20torneiras%20industrial.png" alt="bebedouro 25 e 30 litros inox 2 torneiras industrial" className="rounded-lg object-cover w-2/5" style={{ float: 'left', marginRight: '15px', marginBottom: '8px' }} loading="lazy" />
            Escolher o bebedouro corporativo certo envolve avaliar cinco critérios principais: número de usuários, tipo de ambiente, fonte de abastecimento, necessidade de filtragem e orçamento disponível. Negligenciar qualquer um desses fatores pode resultar em equipamento subdimensionado, insatisfação dos funcionários ou problemas com a fiscalização.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O <strong>número de usuários</strong> determina diretamente a capacidade do reservatório e o número de torneiras necessárias. Um bebedouro com reservatório de 25 L atende bem a até 20 pessoas. Para grupos maiores, modelos de 50 L ou 100 L são mais adequados. Em ambientes com mais de 100 funcionários por turno, recomenda-se múltiplos pontos de abastecimento.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O <strong>tipo de ambiente</strong> influencia o material e o design do equipamento. Locais com poeira, umidade ou produtos químicos pedem bebedouros em aço inox com proteção adequada. Escritórios climatizados podem optar por modelos mais compactos e esteticamente discretos, como o <a href="/bebedouro" className="text-az hover:underline">Bebedouro</a> de mesa ou de coluna.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A <strong>fonte de abastecimento</strong> define se o equipamento será pressurizado (ligado à rede) ou abastecido por garrafão. A ligação direta à rede hidráulica oferece maior praticidade e menor custo operacional, mas requer instalação por profissional habilitado. Garrafões são mais flexíveis para locais sem ponto d'água próximo, como obras e canteiros de serviço.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A <strong>filtragem da água</strong> é um critério cada vez mais valorizado nas empresas. O uso de <a href="/filtro-industrial" className="text-az hover:underline">Filtro Industrial</a> acoplado ao bebedouro remove cloro, sedimentos e micro-organismos, melhorando sabor, odor e segurança microbiológica da água fornecida. Isso é especialmente importante em municípios com qualidade de abastecimento irregular.</p>
          <div style={{ clear: 'both' }} />
        </section>

        <section id="capacidade-por-numero-de-funcionarios" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Capacidade por Número de Funcionários: Como Calcular</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O dimensionamento correto do bebedouro empresarial evita filas, desperdício de tempo e insatisfação dos colaboradores. A recomendação mais utilizada no mercado é a proporção de 1 bebedouro para cada 25 a 50 funcionários no mesmo turno, conforme orientação da NR-24 e das boas práticas de saúde ocupacional.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Para escritórios com atividades predominantemente sedentárias, o consumo médio de água por pessoa é de 2 a 2,5 litros por dia. Já em ambientes com atividade física moderada ou intensa, esse valor pode chegar a 3,5 litros ou mais. Isso significa que um bebedouro de 50 L com abastecimento contínuo atende confortavelmente até 50 pessoas em jornadas de 8 horas.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Para obras, canteiros e ambientes externos, o <a href="/bebedouro-de-obra" className="text-az hover:underline">bebedouro de obra</a> com capacidade de 100 L é a solução mais adequada, pois os trabalhadores necessitam de maior hidratação e o acesso à rede hidráulica é limitado. Nesses casos, é fundamental garantir a higienização diária do reservatório e a troca frequente da água.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Uma dica prática: ao calcular o número de bebedouros, leve em conta a distribuição física dos colaboradores pelo espaço. A distância máxima recomendada entre o trabalhador e o bebedouro mais próximo é de 50 metros. Em empresas com múltiplos andares ou pavilhões, cada unidade deve ter ao menos um ponto de abastecimento de água potável.</p>
        </section>

        <section id="normas-tecnicas" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Normas Técnicas e Exigências Legais para Bebedouros Empresariais</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O uso de bebedouros em empresas no Brasil é regulado por um conjunto de normas técnicas e regulamentações sanitárias que todo gestor deve conhecer. O desconhecimento dessas regras não isenta a empresa de penalidades em caso de autuação.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A <strong>NBR 13713</strong> da ABNT define os requisitos de desempenho para bebedouros de pressão de uso coletivo, abrangendo aspectos como resistência dos materiais em contato com a água, temperatura mínima de resfriamento, isolamento elétrico e durabilidade estrutural. Todo bebedouro comercializado no Brasil deve estar em conformidade com esta norma.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O <strong>INMETRO</strong> certifica bebedouros conforme a NBR 13713 por meio de organismos de certificação acreditados. O selo do INMETRO no produto garante que ele passou por testes de conformidade e atende aos requisitos mínimos de segurança e qualidade. Empresas que adquirem bebedouros sem certificação correm risco de autuação pela vigilância sanitária municipal.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A <strong>NR-24</strong> do Ministério do Trabalho estabelece as condições sanitárias e de conforto nos locais de trabalho, incluindo a obrigatoriedade de fornecimento de água potável. A norma exige que os bebedouros sejam mantidos em perfeito estado de conservação e higiene, com registros de manutenção disponíveis para auditoria a qualquer momento.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A <strong>RDC 275</strong> da ANVISA regulamenta as boas práticas para serviços de alimentação, mas seus princípios de higienização de equipamentos são amplamente adotados para bebedouros em empresas de todos os segmentos. Ela define procedimentos para limpeza, desinfecção e controle da qualidade da água fornecida, com registros obrigatórios das operações realizadas.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Além dessas normas federais, muitos municípios possuem legislação sanitária própria que pode estabelecer requisitos adicionais para bebedouros em estabelecimentos comerciais e industriais. Recomenda-se consultar a vigilância sanitária local antes de instalar ou substituir equipamentos.</p>
        </section>

        <section id="manutencao-do-bebedouro" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Manutenção do Bebedouro Empresarial: Boas Práticas</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A manutenção adequada do bebedouro para empresa é fundamental tanto para a conformidade legal quanto para a saúde dos colaboradores. Equipamentos sem manutenção regular acumulam biofilme, depósitos minerais e contaminações microbiológicas que comprometem a qualidade da água.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A <strong>higienização completa</strong> do reservatório deve ser realizada a cada 6 meses, conforme orientação da RDC 275. O processo inclui esvaziamento do reservatório, limpeza mecânica das superfícies internas, desinfecção com solução clorada ou produto específico aprovado pela ANVISA, enxague completo e reabastecimento. Todo o procedimento deve ser registrado em planilha de controle.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A <strong>troca de filtros</strong> varia conforme o modelo e o volume de uso, mas geralmente ocorre a cada 6 a 12 meses. Filtros saturados deixam de reter contaminantes e podem até liberar impurezas acumuladas na água. O fornecedor deve indicar o período máximo de uso de cada elemento filtrante instalado.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Empresas com maior número de bebedouros podem optar por <strong>contratos de manutenção preventiva</strong>, que incluem visitas periódicas de técnicos especializados, fornecimento de peças e elementos filtrantes, higienização completa com laudo técnico e atendimento em caso de falhas. Esse modelo reduz custos de paradas, garante conformidade contínua e libera a equipe interna de responsabilidades técnicas.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Entre as manutenções completas, é recomendável que a empresa realize <strong>limpezas semanais externas</strong>: limpeza das torneiras, da bandeja coletora e das superfícies externas com pano úmido e produto bactericida. Esses cuidados simples reduzem significativamente a contaminação cruzada por contato das mãos e prolongam a vida útil do equipamento.</p>
        </section>

        <section id="custo-e-retorno" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Custo e Retorno do Investimento em Bebedouro para Empresa</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A decisão entre adquirir um bebedouro próprio ou manter o fornecimento de garrafões envolve uma análise financeira que, na maioria dos casos, favorece claramente o bebedouro pressurizado ou com reservatório próprio a médio prazo.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O custo de garrafões de 20 litros varia entre R$ 8 e R$ 20 por unidade dependendo da região e do fornecedor. Uma empresa com 50 funcionários consome em média 4 a 6 garrafões por dia, gerando um custo mensal entre R$ 800 e R$ 2.400 apenas com água. Nesse cenário, o investimento em um bebedouro pressurizado se paga em poucos meses.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O <strong>bebedouro pressurizado</strong> conectado à rede hidráulica elimina quase que completamente o custo com garrafões, substituindo-o pelo custo de energia elétrica (consumo médio de 60 W a 120 W) e pela manutenção semestral. Para empresas que consomem mais de 3 garrafões por dia, o payback do equipamento costuma ser inferior a 12 meses.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Além do custo financeiro direto, é preciso considerar os <strong>custos indiretos</strong> do fornecimento por garrafões: gestão de estoque, logística de troca, risco de contaminação no manuseio e impacto ambiental da embalagem plástica. Empresas com certificações ambientais ou políticas ESG tendem a priorizar bebedouros pressurizados justamente por esses fatores.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Para pequenas empresas ou espaços com restrição de espaço, o <a href="/bebedouro-de-agua" className="text-az hover:underline">bebedouro de água</a> compacto de coluna ou de bancada representa uma alternativa de baixo investimento inicial com bom custo-benefício. O importante é não abrir mão da certificação INMETRO e da manutenção regular, independentemente do modelo escolhido.</p>
        </section>
      </PilarLayout>
      <Footer />
    </>
  )
}
