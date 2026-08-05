import { StarFillIcon, LinkExternalIcon } from '@primer/octicons-react'
import styles from './GoogleReviews.module.css'

const BUSINESS_NAME = 'Barbearia Arrumadinho'
const ADDRESS = 'R. Huxley, 317 - Guarani, Colombo - PR, 83408-180'
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`
const GOOGLE_REVIEWS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${BUSINESS_NAME} ${ADDRESS}`)}`

// Fonte: perfil oficial do Google Business (confirmar periodicamente, pode mudar)
const RATING = 5.0
const REVIEW_COUNT_LABEL = '394 avaliações'

function Stars() {
  return (
    <div className={styles.stars} aria-label={`${RATING} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarFillIcon key={i} size={20} />
      ))}
    </div>
  )
}

export default function GoogleReviews() {
  return (
    <section id="avaliacoes" className={`section-light ${styles.section}`}>
      <div className={styles.pattern} />
      <div className={styles.container}>
        <h2 className={styles.title}>Onde Estamos & O Que Dizem de Nós</h2>

        <div className={styles.grid}>
          <div className={styles.mapWrapper}>
            <iframe
              src={MAP_EMBED_SRC}
              title="Localização da barbearia no Google Maps"
              className={styles.map}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className={styles.ratingSummary}>
            <Stars />
            <p className={styles.ratingNumber}>{RATING}</p>
            <p className={styles.ratingCount}>{REVIEW_COUNT_LABEL} no Google</p>
            <a
              href={GOOGLE_REVIEWS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ratingButton}
            >
              Ver avaliações no Google
              <LinkExternalIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
