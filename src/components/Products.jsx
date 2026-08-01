import { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../infra/firebase'
import styles from './Products.module.css'

const WHATSAPP_NUMBER = '554198496829'

function buildWhatsAppLink(productTitle) {
  const message = `Olá! Tenho interesse no produto "${productTitle}"`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export default function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    let mounted = true

    async function loadProducts() {
      try {
        const q = query(collection(db, 'products'), orderBy('order'))
        const snap = await getDocs(q)

        if (!mounted) return

        setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      } catch (err) {
        console.error('Erro ao carregar produtos:', err)
      }
    }

    loadProducts()

    return () => {
      mounted = false
    }
  }, [])

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
            <div key={product.id} className={styles.card}>
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
