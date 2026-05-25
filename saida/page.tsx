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
    question: 'Qual a capacidade ideal de um bebedouro inox 3 torneiras?',
    answer: 'A maioria dos modelos disponíveis no mercado possui capacidade de 100 litros, suficiente para ambientes com fluxo médio a alto. Para locais com mais de 80 usuários por turno, considere um modelo de maior capacidade ou com 4 torneiras.',
  },
  {
    question: 'Bebedouro inox 3 torneiras precisa de filtro?',
    answer: 'Não é obrigatório, mas é altamente recomendado, especialmente em regiões com água de baixa qualidade ou alto teor de cloro. Muitos fabricantes oferecem versões com filtro externo de fácil instalação e substituição periódica.',
  },
  {
    question: 'Qual tensão elétrica está disponível no bebedouro inox 3 torneiras?',
    answer: 'Os modelos são comercializados em 110V e 220V. Antes de comprar, verifique a tensão da rede elétrica do local de instalação. Usar a tensão errada pode danificar o compressor e anular a garantia do fabricante.',
  },
  {
    question: 'Bebedouro inox 3 torneiras é certificado pelo INMETRO?',
    answer: 'Sim, todos os bebedouros elétricos vendidos legalmente no Brasil devem ter certificação INMETRO conforme a Portaria 371/2009. O selo garante conformidade com normas de segurança elétrica, higiene e eficiência energética.',
  },
  {
    question: 'Com que frequência devo higienizar o bebedouro inox 3 torneiras?',
    answer: 'Recomenda-se limpeza mensal em ambientes de baixo fluxo e quinzenal em locais de alto movimento. A RDC 275 da ANVISA orienta os procedimentos sanitários aplicáveis a equipamentos de água de uso coletivo.',
  },
]

export default function BebedouroInox3TorneirasPage() {
  return (
    <>
      <Topbar /><Header /><Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Home', slug: '' }, { name: 'Bebedouro Inox 3 Torneiras: Modelos e Especificações' }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <PilarLayout
        badge="Guia Completo"
        title="Bebedouro Inox 3 Torneiras: Modelos e Especificações"
        excerpt="O bebedouro inox 3 torneiras é a solução industrial para ambientes com alto fluxo de usuários que precisam de atendimento simultâneo com estrutura em aço inoxidável."
        breadcrumbLabel="Bebedouro Inox 3 Torneiras: Modelos e Especificações"
        breadcrumbSlug="bebedouro-inox-3-torneiras"
        ctaHref="https://jgbebedouros.com.br?utm_source=portalbebedouro&utm_medium=pilar&utm_campaign=bebedouro-inox-3-torneiras"
        ctaLabel="Solicitar orcamento"
        sidebarCtaHref="https://jgbebedouros.com.br?utm_source=portalbebedouro&utm_medium=sidebar&utm_campaign=bebedouro-inox-3-torneiras"
        finalCtaTitle="Precisa de bebedouro inox 3 torneiras?"
        finalCtaDesc="A JG Bebedouros oferece venda e manutencao em todo o Brasil."
        tocItems={[
          { href: '#o-que-e', label: 'O que é' },
          { href: '#especificacoes-tecnicas', label: 'Especificações Técnicas' },
          { href: '#modelos-disponiveis', label: 'Modelos Disponíveis' },
          { href: '#uso-corporativo', label: 'Uso Corporativo' },
          { href: '#vantagens-do-inox', label: 'Vantagens do Inox' },
          { href: '#manutencao-e-higiene', label: 'Manutenção e Higiene' },
          { href: '#modelos-relacionados', label: 'Modelos Relacionados' },
          { href: '#como-escolher', label: 'Como Escolher' },
          { href: '#onde-encontrar', label: 'Onde Encontrar' },
        ]}
        stats={[
          { valor: '3', label: 'Torneiras simultâneas' },
          { valor: '100L', label: 'Capacidade média' },
          { valor: 'INMETRO', label: 'Certificação obrigatória' },
          { valor: 'NBR 13713', label: 'Norma aplicável' },
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

        {/* Seção 1 */}
        <section id="o-que-e" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>O que é Bebedouro Inox 3 Torneiras</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O bebedouro inox 3 torneiras é um equipamento industrial que permite atender três usuários ao mesmo tempo. Com capacidade de 100 litros, estrutura em aço inoxidável e certificação INMETRO, é ideal para empresas, fábricas, escolas e ambientes com alto fluxo de pessoas.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Dentro da família dos <a href="/bebedouro-inox" className="text-az hover:underline">bebedouro inox</a>, o modelo com 3 torneiras representa o equilíbrio mais eficiente entre capacidade de atendimento e custo operacional. É fabricado por marcas como Robust, Acqua Gelata, Lider e Frisbel, com versões disponíveis em 110V ou 220V.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A configuração mais comum prevê duas saídas de água gelada e uma saída de água natural. Esse arranjo reduz o consumo de energia sem comprometer a experiência dos usuários em ambientes com demanda variada ao longo do dia.</p>
        </section>

        {/* Seção 2 */}
        <section id="especificacoes-tecnicas" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Especificações Técnicas</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Os modelos mais comercializados de bebedouro inox 3 torneiras possuem capacidade de 100 litros, dimensões aproximadas de 55 cm de largura por 47 cm de profundidade e 120 cm de altura. O peso varia entre 35 e 50 kg dependendo do fabricante e dos componentes utilizados.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A tensão elétrica disponível é 110V ou 220V, com potência média de 370W a 500W. A temperatura de saída da água gelada fica entre 4°C e 10°C, adequada para ambientes industriais mesmo em dias de calor intenso.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Cada torneira opera de forma independente. Em modelos padrão, duas torneiras fornecem água gelada e uma fornece água natural, sem refrigeração. Algumas configurações permitem personalizar essa divisão conforme a necessidade do local de instalação.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O aparador de água frontal em chapa de aço inox com dreno integrado evita acúmulo de líquido no piso e facilita a limpeza diária. O compressor é hermético, vedado de fábrica, com sistema de refrigeração a gás R134a ou R600a nos modelos mais novos, dentro das normas ambientais vigentes.</p>
        </section>

        {/* Seção 3 - com imagem 1 */}
        <section id="modelos-disponiveis" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Modelos Disponíveis</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            <img src="https://raw.githubusercontent.com/jgbebedourosmkt-dev/portal-do-bebedouro-imagens/main/bebedouro%20industrial%20inox%203%20torneiras%20robust%20100%20litros.png" alt="bebedouro industrial inox 3 torneiras robust 100 litros" className="rounded-lg object-cover w-2/5" style={{ float: 'left', marginRight: '15px', marginBottom: '8px' }} loading="lazy" />
            O mercado brasileiro oferece diversas linhas de bebedouro inox 3 torneiras. A linha Robust é uma das mais vendidas: estrutura em inox escovado 430, tampa em inox 304 e torneiras em plástico de alto impacto. O modelo de 100 litros pesa cerca de 43 kg e suporta uso contínuo em ambientes industriais.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A Acqua Gelata oferece o modelo de 100 litros em 110V com filtro externo de fácil instalação, comercializado em grandes redes como Leroy Merlin. Já o modelo Lider (LE) tem inox escovado e torneiras em aço inoxidável, sendo preferido em ambientes sujeitos a uso intenso ou vandalismo.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A Frisbel disponibiliza bebedouros de 100 litros com filtro integrado na versão 220V, aprovados pela NBR 13713 e certificados pelo INMETRO. Todos os fabricantes devem atender à RDC 275 da ANVISA quanto à higiene dos materiais em contato com a água potável.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Na escolha do modelo, verifique a espessura do inox da carcaça, o tipo de filtro suportado e a procedência do compressor. Compressores de marcas como Embraco e Tecumseh oferecem maior vida útil e menor consumo energético ao longo da vida útil do equipamento.</p>
          <div style={{ clear: 'both' }} />
        </section>

        {/* Seção 4 */}
        <section id="uso-corporativo" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Uso Corporativo</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O bebedouro inox 3 torneiras atende diretamente à NR-24, que determina a obrigatoriedade de fornecimento de água potável para trabalhadores. Em ambientes com 30 a 80 funcionários por turno, esse modelo costuma ser suficiente para garantir acesso sem filas nos intervalos.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Fábricas, galpões logísticos, academias, refeitórios e escolas são os principais compradores desse equipamento. Em lanchonetes e restaurantes, a torneira de água natural facilita o autoatendimento dos funcionários sem consumir energia de refrigeração desnecessária.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Para quem busca um <a href="/bebedouro-para-empresa" className="text-az hover:underline">bebedouro para empresa</a>, é fundamental verificar a capacidade de refrigeração nos horários de pico. O dimensionamento correto considera o número de usuários por turno, a temperatura ambiente do local e o intervalo entre manutenções preventivas programadas.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Conforme a NR-24, o bebedouro deve ser instalado em local de fácil acesso, com espaço adequado ao redor para limpeza e manutenção. O ponto de instalação deve contar com entrada de água fria de ½ polegada e saída de esgoto para o dreno do aparador frontal.</p>
        </section>

        {/* Seção 5 */}
        <section id="vantagens-do-inox" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Vantagens do Inox</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O aço inoxidável utilizado nos bebedouros de 3 torneiras oferece resistência à corrosão, facilidade de limpeza e longa durabilidade. Os tipos AISI 430 e AISI 304 são os mais usados: o 304 é mais resistente a meios ácidos e recomendado para áreas costeiras ou com maior umidade ambiente.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Segundo a NBR 13713, todos os materiais em contato com a água potável devem ser certificados e não podem alterar as propriedades organolépticas da água — cor, odor e sabor. O inox atende plenamente esse requisito, ao contrário de materiais plásticos de baixa qualidade que podem liberar substâncias indesejáveis.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A certificação INMETRO é obrigatória para bebedouros elétricos comercializados no Brasil. Ela garante que o produto passou por testes de segurança elétrica, eficiência energética e conformidade com normas técnicas. Ao adquirir um bebedouro inox 3 torneiras, sempre verifique o selo INMETRO na embalagem ou no equipamento.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Em comparação com modelos de carcaça plástica, o inox suporta impactos mecânicos, resiste a produtos de limpeza industriais e não amarca com uso cotidiano. Isso reduz os custos de substituição ao longo da vida útil, que pode ultrapassar 10 anos com manutenção adequada.</p>
        </section>

        {/* Seção 6 */}
        <section id="manutencao-e-higiene" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Manutenção e Higiene</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A higienização do bebedouro inox 3 torneiras deve ser feita quinzenalmente ou mensalmente, conforme a demanda do local. O processo inclui desligar o equipamento da tomada, drenar a água, limpar o reservatório interno com solução de hipoclorito de sódio a 1% e enxaguar com água corrente antes de religar.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A troca do filtro deve seguir o manual do fabricante — normalmente a cada 3 a 6 meses. Em regiões com água de baixa qualidade ou alto teor de cloro, o intervalo pode ser menor. A RDC 275 da ANVISA regulamenta os procedimentos sanitários aplicáveis a equipamentos de água para consumo coletivo.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O compressor hermético dispensa manutenção interna, mas a limpeza do condensador com jato de ar comprimido deve ser feita semestralmente. Essa prática mantém a eficiência energética e evita superaquecimento, prolongando a vida útil do equipamento de forma significativa.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Equipamentos mal higienizados podem ser autuados pela vigilância sanitária e representam risco à saúde dos usuários. Recomenda-se afixar próximo ao bebedouro uma planilha de controle de higienização com data, responsável e produto utilizado, facilitando auditorias internas e externas.</p>
        </section>

        {/* Seção 7 - com imagem 2 */}
        <section id="modelos-relacionados" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Modelos Relacionados</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">
            <img src="https://raw.githubusercontent.com/jgbebedourosmkt-dev/portal-do-bebedouro-imagens/main/bebedouro%20100%20litros%20inox%203%20torneiras%20robust%20angulo%20fontal.png" alt="bebedouro 100 litros inox 3 torneiras robust angulo fontal" className="rounded-lg object-cover w-2/5" style={{ float: 'left', marginRight: '15px', marginBottom: '8px' }} loading="lazy" />
            Para ambientes com menor fluxo, o <a href="/bebedouro-inox-2-torneiras" className="text-az hover:underline">bebedouro inox 2 torneiras</a> é mais indicado para locais com até 30 usuários por turno, com menor consumo elétrico e preço de aquisição mais acessível. É ideal como ponto de hidratação secundário.
          </p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Para ambientes com fluxo muito intenso, como grandes indústrias e centros comerciais, o <a href="/bebedouro-inox-4-torneiras" className="text-az hover:underline">bebedouro inox 4 torneiras</a> amplia a capacidade simultânea. A diferença de preço entre os modelos de 3 e 4 torneiras costuma ser de 15% a 25%, podendo se justificar em locais com mais de 100 usuários simultâneos.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Para locais com espaço no piso limitado, o <a href="/bebedouro-inox-25-litros" className="text-az hover:underline">bebedouro inox 25 litros</a> de bancada é uma alternativa compacta para halls de atendimento ou cozinhas industriais onde instalar um modelo de chão não é viável estruturalmente.</p>
          <div style={{ clear: 'both' }} />
        </section>

        {/* Seção 8 */}
        <section id="como-escolher" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Como Escolher</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Para escolher o bebedouro inox 3 torneiras ideal, considere o número de usuários simultâneos, a tensão elétrica disponível no local (110V ou 220V) e a necessidade de filtro integrado ou externo. Ambientes com água de baixa qualidade exigem filtragem mais robusta para garantir a saúde dos usuários.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A potência do compressor determina a velocidade de resfriamento. Em climas quentes ou locais sem climatização, prefira modelos com compressor de 450W ou mais. Para referências de custo e marcas disponíveis, <a href="/blog/bebedouro-industrial-preco-2025" className="text-az hover:underline">veja a faixa de preço</a> atualizada com os principais modelos do mercado.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A instalação é simples: basta conectar à rede hidráulica com mangueira de ½ polegada e ligar na tomada adequada. Alguns modelos acompanham kit completo de instalação. Verifique se o local conta com ponto de esgoto próximo para o dreno do aparador frontal.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Avalie também a garantia oferecida: modelos com garantia de 12 meses no compressor e 6 meses nas peças são mais confiáveis. Fabricantes nacionais costumam ter rede de assistência técnica mais ampla, reduzindo o tempo de parada em caso de falha no equipamento.</p>
        </section>

        {/* Seção 9 */}
        <section id="onde-encontrar" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Onde Encontrar</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O bebedouro inox 3 torneiras está disponível em lojas especializadas, grandes redes de materiais de construção e distribuidores regionais. Para empresas que precisam de entrega, instalação técnica e manutenção preventiva incluída, o ideal é contratar diretamente com um fornecedor especializado em bebedouros industriais.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Para quem está localizado <a href="/local/bebedouro-industrial-sao-paulo" className="text-az hover:underline">em São Paulo</a>, a capital concentra os maiores distribuidores de bebedouros industriais do país, com pronta-entrega e assistência técnica autorizada das principais marcas. O prazo médio de entrega para o interior e outras regiões varia entre 3 e 7 dias úteis.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Na hora da compra, solicite nota fiscal com descrição completa do equipamento, número de série e certificado de garantia. Esses documentos são necessários em caso de acionamento da assistência técnica e para comprovação junto à vigilância sanitária durante eventuais inspeções do ambiente de trabalho.</p>
        </section>

      </PilarLayout>
      <Footer />
    </>
  )
}
