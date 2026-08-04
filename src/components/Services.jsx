import { useEffect, useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react'
import { collection, getDocs, query, orderBy, doc, getDoc } from 'firebase/firestore'
import { db } from '../infra/firebase'
import styles from './Services.module.css'
import { optimizeCloudinaryUrl } from '../utils/cloudinaryUrl'

export default function Servicos() {
  const [services, setServices] = useState([])
  const [extraServices, setExtraServices] = useState([])
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    let mounted = true

    async function loadData() {
      try {
        const servicesQuery = query(collection(db, 'mainServices'), orderBy('order'))
        const servicesSnap = await getDocs(servicesQuery)

        const extraRef = doc(db, 'services', 'extra')
        const extraSnap = await getDoc(extraRef)

        if (!mounted) return

        setServices(servicesSnap.docs.map((d) => ({ id: d.id, ...d.data() })))

        const extraData = extraSnap.exists() ? extraSnap.data() : null
        setExtraServices(Array.isArray(extraData?.extraServices) ? extraData.extraServices : [])
      } catch (err) {
        console.error('Erro ao carregar serviços:', err)
      }
    }

    loadData()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <section id="servicos" className="section-dark">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Nossos Serviços</h2>
          <p className={styles.subtitle}>
            Qualidade e precisão em cada detalhe do seu visual
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service) => (
            <div key={service.id} className={styles.card}>
              <img src={optimizeCloudinaryUrl(service.image, 500)} alt={service.title} className={styles.image} />

              <div className={styles.hoverOverlay}>
                <p className={styles.overlayDescription}>{service.description}</p>
              </div>

              <div className={styles.bottomBar}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.mobileDescription}>{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.moreWrapper}>
          <button
            className={styles.moreButton}
            onClick={() => setShowMore((v) => !v)}
            aria-expanded={showMore}
          >
            {showMore ? 'Ver menos' : 'Mais serviços'}
            {showMore ? <ChevronUpIcon size={18} /> : <ChevronDownIcon size={18} />}
          </button>

          <div className={`${styles.extraList} ${showMore ? styles.extraListOpen : ''}`}>
            <ul className={styles.extraGrid}>
              {extraServices.map((item, index) => (
                <li key={`${item}-${index}`} className={styles.extraItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
