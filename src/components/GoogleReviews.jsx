import { StarFillIcon, LinkExternalIcon } from '@primer/octicons-react'
import styles from './GoogleReviews.module.css'

import {
  GOOGLE_REVIEWS_LINK,
  MAP_EMBED_SRC,
  RATING,
  REVIEW_COUNT,
} from '../config/site'

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
            <p className={styles.ratingCount}>{REVIEW_COUNT} avaliações no Google</p>
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
