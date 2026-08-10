import { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../infra/firebase'
import styles from './Products.module.css'
import { optimizeCloudinaryUrl } from '../utils/cloudinaryUrl'
import { buildInterestLink } from '../config/site'

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
              <img
                src={optimizeCloudinaryUrl(product.image, 500)}
                alt={`${product.title} — produto à venda na Barbearia Arrumadinho`}
                className={styles.image}
                loading="lazy"
              />

              <div className={styles.hoverOverlay}>
                <p className={styles.overlayDescription}>{product.description}</p>
              </div>

              <div className={styles.bottomBar}>
                <h3 className={styles.cardTitle}>{product.title}</h3>
                <p className={styles.mobileDescription}>{product.description}</p>
                <a
                  href={buildInterestLink('produto', product.title)}
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
