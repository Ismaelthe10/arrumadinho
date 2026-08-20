import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react'
import { useCachedContent } from '../hooks/useCachedContent'
import { fetchMainServices, fetchExtraServices } from '../infra/publicContent'
import styles from './Services.module.css'
import { optimizeCloudinaryUrl, cloudinarySrcSet } from '../utils/cloudinaryUrl'
import { buildInterestLink } from '../config/site'

// 3 colunas de 1200 - 48 de padding, com 24 de gap, no desktop.
const SERVICE_SIZES = '(min-width: 768px) 368px, calc(100vw - 48px)'

export default function Servicos() {
  const services = useCachedContent('mainServices', fetchMainServices, [])
  const extraServices = useCachedContent('extraServices', fetchExtraServices, [])
  const [showMore, setShowMore] = useState(false)

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
              <img
                src={optimizeCloudinaryUrl(service.image, 500)}
                srcSet={cloudinarySrcSet(service.image)}
                sizes={SERVICE_SIZES}
                alt={`${service.title} na Barbearia Arrumadinho, em Colombo - PR`}
                className={styles.image}
                loading="lazy"
              />

              <div className={styles.hoverOverlay}>
                <p className={styles.overlayDescription}>{service.description}</p>
              </div>

              <div className={styles.bottomBar}>
                <h3 className={styles.cardTitle}>
                  <a
                    href={buildInterestLink('serviço', service.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardButton}
                    aria-label={`Tenho interesse no serviço ${service.title}`}
                  >
                    {service.title}
                  </a>
                </h3>
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
                  <a
                    href={buildInterestLink('serviço', item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.extraLink}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
