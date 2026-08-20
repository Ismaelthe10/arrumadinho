import { useCachedContent } from '../hooks/useCachedContent'
import { fetchSpacePhotos } from '../infra/publicContent'
import styles from './Space.module.css'
import { optimizeCloudinaryUrl, cloudinarySrcSet } from '../utils/cloudinaryUrl'

// 3 colunas no desktop, 2 no tablet, 1 no celular.
const SPACE_SIZES = '(min-width: 1024px) 373px, (min-width: 640px) 45vw, calc(100vw - 48px)'

export default function Space() {
  const spacePhotos = useCachedContent('space', fetchSpacePhotos, [])

  return (
    <section id="espaco" className="section-dark">
      <div className={styles.container}>
        <h2 className={styles.title}>Nosso Espaço</h2>

        <div className={styles.grid}>
          {spacePhotos.map((photo, index) => (
            <div key={`${photo}-${index}`} className={styles.photoWrapper}>
              <img
                src={optimizeCloudinaryUrl(photo, 600)}
                srcSet={cloudinarySrcSet(photo)}
                sizes={SPACE_SIZES}
                alt={`Ambiente da Barbearia Arrumadinho em Colombo - PR (foto ${index + 1})`}
                className={styles.photo}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
