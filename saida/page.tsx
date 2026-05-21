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
    question: 'Qual a capacidade mais comum do bebedouro inox 3 torneiras?',
    answer:
      'O modelo mais encontrado no mercado possui reservatório de 100 litros, suficiente para atender até 300 pessoas por turno em ambientes industriais e corporativos. Alguns fabricantes oferecem versões de 75 e 150 litros para diferentes demandas.',
  },
  {
    question: 'Bebedouro inox 3 torneiras precisa de filtro?',
    answer:
      'Sim. A maioria dos modelos já inclui filtro externo de fácil instalação ou filtro embutido. O filtro é essencial para remoção de cloro, sedimentos e impurezas, garantindo água de qualidade conforme a RDC 275 da ANVISA.',
  },
  {
    question: 'O bebedouro inox 3 torneiras é certificado pelo INMETRO?',
    answer:
      'Sim, os bebedouros industriais inox devem ser certificados pelo INMETRO conforme a NBR 13713, que regulamenta requisitos de segurança, higiene e desempenho para bebedouros elétricos. Sempre exija o selo INMETRO ao adquirir o equipamento.',
  },
  {
    question: 'Qual a diferença entre bebedouro 2 torneiras e 3 torneiras?',
    answer:
      'O bebedouro inox 3 torneiras permite o atendimento simultâneo de três usuários — normalmente com duas torneiras de água gelada e uma de água natural — enquanto o modelo de 2 torneiras atende apenas dois usuários por vez. Para fábricas, escolas e refeitórios com mais de 100 colaboradores por turno, o modelo de 3 torneiras é o mais recomendado.',
  },
  {
    question: 'Qual a voltagem disponível para bebedouro inox 3 torneiras?',
    answer:
      'Os modelos são fabricados para 110V (monofásico), 220V (monofásico) ou bivolt, dependendo do fabricante. É fundamental verificar a tensão da instalação antes de adquirir o equipamento para evitar danos ao compressor e garantir segurança elétrica.',
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
        excerpt="O bebedouro inox 3 torneiras é o equipamento industrial ideal para ambientes com alto fluxo de usuários que precisam de abastecimento simultâneo, higiênico e eficiente."
        breadcrumbLabel="Bebedouro Inox 3 Torneiras: Modelos e Especificações"
        breadcrumbSlug="bebedouro-inox-3-torneiras"
        ctaHref="https://jgbebedouros.com.br?utm_source=portalbebedouro&utm_medium=pilar&utm_campaign=bebedouro-inox-3-torneiras"
        ctaLabel="Solicitar orçamento"
        sidebarCtaHref="https://jgbebedouros.com.br?utm_source=portalbebedouro&utm_medium=sidebar&utm_campaign=bebedouro-inox-3-torneiras"
        finalCtaTitle="Precisa de bebedouro inox 3 torneiras?"
        finalCtaDesc="A JG Bebedouros oferece venda e manutenção em todo o Brasil."
        tocItems={[
          { href: '#o-que-e', label: 'O que é' },
          { href: '#capacidade-dimensoes', label: 'Capacidade e Dimensões' },
          { href: '#modelos-disponiveis', label: 'Modelos Disponíveis' },
          { href: '#vantagens-inox', label: 'Vantagens do Inox' },
          { href: '#ambientes-indicados', label: 'Ambientes Indicados' },
          { href: '#instalacao-manutencao', label: 'Instalação e Manutenção' },
          { href: '#modelos-relacionados', label: 'Modelos Relacionados' },
          { href: '#preco-orcamento', label: 'Preço e Orçamento' },
          { href: '#normas-certificacoes', label: 'Normas e Certificações' },
        ]}
        stats={[
          { valor: '100 L', label: 'Capacidade mais comum' },
          { valor: '3', label: 'Torneiras simultâneas' },
          { valor: 'até 300', label: 'Usuários por turno' },
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
        <section id="o-que-e" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>O que é um Bebedouro Inox 3 Torneiras</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O bebedouro inox 3 torneiras é um equipamento industrial de grande porte, com reservatório de até 100 litros, projetado para atender múltiplos usuários simultaneamente. É indicado para ambientes de alto fluxo como fábricas, escolas, academias e refeitórios corporativos.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Fabricado em aço inoxidável AISI 304, o equipamento alia durabilidade, higiene e resistência à corrosão. A estrutura em <a href="/bebedouro-inox" className="text-az hover:underline">bebedouro inox</a> garante conformidade com as exigências da vigilância sanitária e com as normas técnicas brasileiras vigentes.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">As três torneiras — normalmente duas de água gelada e uma de água natural — permitem que três colaboradores se hidratem ao mesmo tempo, reduzindo filas e aumentando a produtividade. Esse design é especialmente valorizado em ambientes com mais de 100 pessoas por turno.</p>
        </section>

        <section id="capacidade-dimensoes" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Capacidade e Dimensões</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O modelo padrão de bebedouro inox com 3 torneiras apresenta reservatório de 100 litros, com dimensões aproximadas de 87 cm (altura) × 75 cm (largura) × 50 cm (profundidade). Esse tamanho o enquadra como bebedouro de piso, com base de apoio estável e dreno frontal em chapa de aço inox.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A capacidade de refrigeração varia de 18 a 25 litros por hora, dependendo do modelo e do fabricante. O compressor hermético, selado e com fluido refrigerante compatível com as normas ambientais vigentes, mantém a temperatura da água entre 4°C e 10°C mesmo em ambientes com temperatura elevada.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Existem também versões compactas de 75 litros, indicadas para escritórios de médio porte com espaço mais restrito. Para instalações em grandes indústrias com mais de 200 colaboradores por turno, recomenda-se avaliar modelos de 150 litros ou a combinação de múltiplas unidades de 100 litros estrategicamente posicionadas.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O consumo energético médio gira em torno de 200 a 350 W, variando conforme o modelo e o regime de uso. Sempre verifique a ficha técnica do fabricante para dimensionar corretamente o ponto de energia e o disjuntor da instalação elétrica.</p>
        </section>

        <section id="modelos-disponiveis" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Modelos Disponíveis no Mercado</h2>
          <img
            src="https://raw.githubusercontent.com/jgbebedourosmkt-dev/portal-do-bebedouro-imagens/main/bebedouro%20industrial%20inox%203%20torneiras%20robust%20100%20litros.png"
            alt="bebedouro industrial inox 3 torneiras robust 100 litros"
            className="rounded-lg object-cover w-2/5"
            style={{ float: 'left', marginRight: '15px', marginBottom: '8px' }}
            loading="lazy"
          />
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Entre os principais modelos de bebedouro inox 3 torneiras disponíveis no Brasil, destacam-se o Robust 100L, o Acqua Gelata 100L e o RESIST 100L da Cânovas. Cada linha possui diferenças nas especificações de compressor, acabamento e sistema de filtração que impactam diretamente no custo de manutenção.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O modelo Robust 100L é fabricado com gabinete em aço inox escovado AISI 304 e torneiras em polipropileno de alto impacto, resistentes ao uso intenso. Inclui filtro externo de polipropileno com capacidade para 3.000 litros e sistema de dreno frontal que facilita a limpeza do aparador de água.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O RESIST 100L da Cânovas se destaca pelo filtro embutido — o único modelo com esse recurso entre os concorrentes analisados — além de acompanhar mangueiras, conectores e tubo de despejo na embalagem, facilitando a instalação sem necessidade de componentes adicionais.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O modelo Acqua Gelata é uma opção para compra imediata em grandes redes varejistas, com disponibilidade em 110V e 220V. Para uso corporativo contínuo, recomenda-se a aquisição junto a distribuidores especializados que oferecem suporte técnico, garantia estendida e assistência no local.</p>
          <div style={{ clear: 'both' }} />
        </section>

        <section id="vantagens-inox" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Vantagens do Aço Inox com 3 Torneiras</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O aço inoxidável AISI 304 utilizado nos bebedouros industriais é resistente à corrosão, não absorve odores e é de fácil higienização. Diferente de gabinetes pintados ou em plástico, o inox mantém sua aparência e integridade estrutural por mais de 15 anos com manutenção adequada.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A presença de 3 torneiras simultâneas é a principal vantagem operacional desse equipamento. Em turnos de fábrica ou intervalos escolares, quando dezenas de pessoas buscam hidratação ao mesmo tempo, a disponibilidade de três saídas reduz o tempo de espera e evita aglomerações ao redor do bebedouro.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O inox é aprovado para contato com alimentos pela ANVISA (RDC 275) e não apresenta migração de metais pesados para a água, ao contrário de alguns materiais plásticos de baixa qualidade. Isso torna o equipamento ideal para empresas que passam por auditorias de qualidade, certificações ISO e fiscalizações da vigilância sanitária.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A vida útil de bebedouros em aço inox de boa qualidade supera 15 anos com manutenção preventiva adequada. Esse dado é relevante para o cálculo do custo total de propriedade, pois o investimento inicial maior se dilui ao longo dos anos e resulta em custo por litro fornecido bem menor do que em equipamentos de plástico.</p>
        </section>

        <section id="ambientes-indicados" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Para quais Ambientes é Indicado</h2>
          <img
            src="https://raw.githubusercontent.com/jgbebedourosmkt-dev/portal-do-bebedouro-imagens/main/bebedouro%20100%20litros%20inox%203%20torneiras%20robust%20angulo%20fontal.png"
            alt="bebedouro 100 litros inox 3 torneiras robust angulo fontal"
            className="rounded-lg object-cover w-2/5"
            style={{ float: 'left', marginRight: '15px', marginBottom: '8px' }}
            loading="lazy"
          />
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O bebedouro inox 3 torneiras é indicado para ambientes com fluxo intenso de pessoas: fábricas, indústrias alimentícias, construção civil, refeitórios corporativos, academias, escolas de grande porte, igrejas e supermercados. A NR-24 do Ministério do Trabalho exige fornecimento de água potável em quantidade suficiente para todos os trabalhadores.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Em indústrias de alimentos e laticínios, o gabinete em inox é exigência da vigilância sanitária, tornando esse modelo a única opção viável para instalação em áreas de produção. O material resiste aos agentes de limpeza e sanitização utilizados nesses ambientes sem apresentar degradação ou contaminação cruzada.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Para uso em <a href="/bebedouro-para-empresa" className="text-az hover:underline">bebedouro para empresa</a> com até 50 colaboradores, o modelo de 2 torneiras pode ser suficiente. Para equipes maiores ou empresas que buscam reduzir o número de unidades instaladas, o modelo de 3 torneiras é mais eficiente em custo-benefício. Consulte um especialista para o dimensionamento correto conforme o seu fluxo de pessoas.</p>
          <div style={{ clear: 'both' }} />
        </section>

        <section id="instalacao-manutencao" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Instalação e Manutenção</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A instalação do bebedouro inox 3 torneiras requer uma entrada de água com rosca de ½ polegada, um ponto de energia com disjuntor dimensionado para a potência do compressor e um ralo próximo para o dreno. Em modelos com filtro externo, o kit de instalação já acompanha o equipamento com mangueiras e conectores.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A manutenção preventiva recomendada inclui: troca do filtro a cada 3.000 litros ou 6 meses (o que ocorrer primeiro), higienização interna do reservatório a cada 6 meses com solução clorada de 100 a 200 ppm conforme a RDC 275 da ANVISA, e verificação do sistema de refrigeração anualmente.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O exterior em aço inox pode ser limpo com pano úmido e detergente neutro. Evite abrasivos, esponja de aço ou produtos à base de cloro concentrado no gabinete externo, pois podem comprometer o acabamento escovado. Com manutenção regular, a vida útil do compressor é de 10 a 15 anos.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Registre todas as manutenções realizadas em um sistema de controle. Esse histórico serve como comprovação de conformidade em fiscalizações sanitárias e trabalhistas, facilita o controle do ciclo de troca dos filtros e ajuda a identificar padrões de falha no compressor antes que se tornem problemas maiores.</p>
        </section>

        <section id="modelos-relacionados" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Modelos Relacionados</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Se o bebedouro inox 3 torneiras não é o tamanho ideal para a sua necessidade, existem variações que se adequam melhor. Para equipes menores ou espaços mais compactos, o <a href="/bebedouro-inox-2-torneiras" className="text-az hover:underline">bebedouro inox 2 torneiras</a> oferece ótimo custo-benefício com menor pegada de instalação.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Para ambientes de altíssimo fluxo, como grandes centros de distribuição ou hospitais, o <a href="/bebedouro-inox-4-torneiras" className="text-az hover:underline">bebedouro inox 4 torneiras</a> amplia ainda mais a capacidade de atendimento simultâneo. Já para locais com espaço limitado mas que precisam de reservatório generoso, o <a href="/bebedouro-inox-25-litros" className="text-az hover:underline">bebedouro inox 25 litros</a> é uma alternativa compacta e eficiente.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A escolha entre os modelos deve considerar o número de usuários por turno, o espaço físico disponível e o orçamento de aquisição e manutenção. Para grandes empresas, é comum instalar múltiplas unidades distribuídas para cumprir a NR-24 sem sobrecarregar um único ponto de abastecimento.</p>
        </section>

        <section id="preco-orcamento" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Preço e Orçamento</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O preço do bebedouro inox 3 torneiras varia conforme o fabricante, a capacidade do reservatório e os recursos adicionais como filtro embutido e voltagem. Para <a href="/blog/bebedouro-industrial-preco-2025" className="text-az hover:underline">veja a faixa de preço</a> atualizada dos principais modelos disponíveis no mercado, incluindo análise de custo-benefício por categoria e fabricante.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Modelos básicos com reservatório de 100 litros partem de valores acessíveis em grandes redes de varejo. Equipamentos com filtro embutido, garantia estendida e suporte técnico especializado costumam ter custo-benefício superior no longo prazo, considerando a durabilidade e os menores custos de manutenção ao longo dos anos.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">Para empresas que precisam adquirir múltiplas unidades, distribuidores especializados oferecem condições de pagamento mais vantajosas e suporte para instalação e treinamento de equipe. Solicite orçamentos comparativos antes de decidir e verifique se o fornecedor oferece assistência técnica <a href="/local/bebedouro-industrial-sao-paulo" className="text-az hover:underline">em São Paulo</a> e nas demais regiões onde a empresa opera.</p>
        </section>

        <section id="normas-certificacoes" className="mb-12 scroll-mt-20">
          <h2 className="text-[30px] font-black text-txt mb-4 pb-2 border-b-2 border-borda" style={{ fontFamily: 'var(--font-barlow-condensed)' }}>Normas e Certificações</h2>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O bebedouro inox 3 torneiras deve atender à NBR 13713, norma da ABNT que estabelece os requisitos de segurança, desempenho e higiene para bebedouros elétricos. Esta norma define critérios de temperatura da água, materiais em contato com a água, proteção elétrica e rotulagem obrigatória do equipamento.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">O selo INMETRO é obrigatório para bebedouros elétricos comercializados no Brasil, atestando que o produto foi testado e está em conformidade com a NBR 13713. Ao adquirir o equipamento, verifique o código de registro INMETRO e consulte o cadastro no portal do órgão para confirmar a autenticidade da certificação antes de finalizar a compra.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A NR-24 do Ministério do Trabalho e Emprego regulamenta as condições sanitárias dos locais de trabalho, incluindo a obrigatoriedade de fornecimento de água potável para todos os trabalhadores. Empresas que instalam bebedouros inox certificados cumprem essa norma e demonstram conformidade em fiscalizações trabalhistas e auditorias de segurança do trabalho.</p>
          <p className="mb-4 text-[16px] text-txt2 leading-relaxed">A RDC 275 da ANVISA complementa essas exigências, regulamentando os padrões de higiene e sanitização dos equipamentos de abastecimento de água potável. Guarde os certificados INMETRO e os registros de manutenção preventiva juntos para apresentação em qualquer fiscalização sanitária ou trabalhista.</p>
        </section>
      </PilarLayout>
      <Footer />
    </>
  )
}
