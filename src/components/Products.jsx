import styles from './Products.module.css'

const WHATSAPP_NUMBER = '554198496829' // mesmo número usado no Header/Hero — trocar pelo real

const products = [
  {
    title: 'Minoxidil',
    image: '/products/product-1.png',
    description: 'Estimula o crescimento capilar e fortalece os fios. Ideal para tratamento contra queda.',
  },
  {
    title: 'Shampoo e Condicionador',
    image: '/products/product-2.png',
    description: 'Restaura e protege o cabelo após procedimentos químicos, como relaxamento, progressiva ou coloração.',
  },
  {
    title: 'Shampoo Masculino',
    image: '/products/product-3.png',
    description: 'Limpa profundamente, remove oleosidade e mantém o couro cabeludo saudável.',
  },
  {
    title: 'Pomadas Premium',
    image: '/products/product-4.png',
    description: 'Alta fixação com acabamento matte ou brilho. Ideal para penteados profissionais.',
  },
  {
    title: 'Pomada Modeladora em Pó',
    image: '/products/product-5.png',
    description: 'Ideal para topete e cortes modernos. Fios mais encorpados e com movimento. Visual natural, sem aspecto oleoso.',
  },
  {
    title: 'Óleo para Barba',
    image: '/products/product-6.png',
    description: 'Hidrata a barba e a pele. Evita ressecamento, coceira e descamação. Dá maciez e brilho, deixando a barba mais bonita, saudável e bem cuidada.',
  },
  {
    title: 'Protetor Térmico',
    image: '/products/product-7.png',
    description: 'Protege o cabelo do calor e trata os fios ao mesmo tempo, especialmente antes do uso de secador, prancha ou modeladores.',
  },
  {
    title: 'Matize',
    image: '/products/product-8.png',
    description: 'Matiza e trata ao mesmo tempo, com ação mais intensa que o shampoo.',
  },
  {
    title: 'Pomadas',
    image: '/products/product-9.png',
    description: 'Opções brilho, teia, caramelo e seca. Versáteis para qualquer penteado.',
  },
  {
    title: 'Balm para Barba',
    image: '/products/product-10.png',
    description: 'Hidrata a barba e a pele, ideal para usar após a navalha, ajudando a reduzir vermelhidão e irritação.',
  },
  {
    title: 'Leave-in',
    image: '/products/product-11.png',
    description: 'Ajuda a manter a umidade natural do fio e protege contra sol, vento, poluição e calor.',
  },
]

function buildWhatsAppLink(productTitle) {
  const message = `Olá! Tenho interesse no produto "${productTitle}"`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export default function Products() {
  return (
    <section id="produtos" className={`section-light ${styles.section}`}>
      <div className={styles.pattern} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Nossos Produtos</h2>
          <p className={styles.subtitle}>
            Selecionados para cuidar do seu visual com qualidade profissional
          </p>
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
  <div key={product.title} className={styles.card}>
    <img src={product.image} alt={product.title} className={styles.image} />

    <div className={styles.hoverOverlay}>
      <p className={styles.overlayDescription}>{product.description}</p>
    </div>

    <div className={styles.bottomBar}>
      <h3 className={styles.cardTitle}>{product.title}</h3>
      <p className={styles.mobileDescription}>{product.description}</p>
      <a
        href={buildWhatsAppLink(product.title)}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cardButton}
      >
        Tenho interesse
      </a>
    </div>
  </div>
))}
        </div>
      </div>
     
    </section>
  )
}

