import { useEffect, useState } from 'react'
import { useCachedContent } from '../hooks/useCachedContent'
import { fetchHeroImages } from '../infra/publicContent'
import styles from './Hero.module.css'
import { optimizeCloudinaryUrl, cloudinarySrcSet } from '../utils/cloudinaryUrl'
import { SCHEDULING_LINK } from '../config/site'

const ROTATION_MS = 4000

// A foto seguinte entra no DOM 1,5 s antes da troca: tempo de sobra para baixar
// e decodificar, sem disputar banda com o LCP no instante do carregamento.
const PRELOAD_LEAD_MS = ROTATION_MS - 1500

// Coluna direita do grid: metade de 1200 - 48 de padding - 40 de gap no desktop,
// largura total menos o padding no mobile.
const HERO_SIZES = '(min-width: 768px) 556px, calc(100vw - 48px)'

export default function Hero() {
  const heroImages = useCachedContent('hero', fetchHeroImages, [])
  const [current, setCurrent] = useState(0)

  // O placeholder segue montado sempre: ele faz o cross-fade de 1 s com a
  // primeira foto e, em visitas repetidas, vem do cache de disco do navegador.
  const [renderedIndices, setRenderedIndices] = useState(new Set([0]))

  useEffect(() => {
    if (heroImages.length <= 1) return
    const timeout = setTimeout(() => {
      setRenderedIndices((prev) => new Set(prev).add(1 % heroImages.length))
    }, PRELOAD_LEAD_MS)
    return () => clearTimeout(timeout)
  }, [heroImages])

  useEffect(() => {
    if (heroImages.length <= 1) return
    const interval = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % heroImages.length
        const upcoming = (next + 1) % heroImages.length
        setRenderedIndices((r) => new Set(r).add(upcoming))
        return next
      })
    }, ROTATION_MS)
    return () => clearInterval(interval)
  }, [heroImages])

  return (
    <section id="inicio" className="section-light">
      <div className={styles.container}>
        <div className={styles.textBlock}>
          <img
            src="/logo-dark.svg"
            alt=""
            aria-hidden="true"
            className={styles.watermark}
          />

          <h1 className={styles.title}>
            Barbearia em Colombo — estilo e tradição em cada corte
          </h1>
          <p className={styles.subtitle}>
            Corte com quem entende do assunto. Profissionais experientes,
            ambiente acolhedor e resultados que falam por si.
          </p>
          <a href={SCHEDULING_LINK} target="_blank" rel="noopener noreferrer" className={styles.cta}>
            Agendar horário
          </a>
        </div>

        <div className={styles.imageBlock}>
          <img
            src="/hero/foto-15.webp"
            alt=""
            aria-hidden="true"
            className={styles.image}
            style={{ opacity: heroImages.length === 0 ? 1 : 0 }}
            fetchPriority="high"
            loading="eager"
          />

          {heroImages.map((image, index) => (
            renderedIndices.has(index) && (
              <img
                key={image.src}
                src={optimizeCloudinaryUrl(image.src, 1200)}
                srcSet={cloudinarySrcSet(image.src)}
                sizes={HERO_SIZES}
                alt={image.alt}
                className={styles.image}
                style={{ opacity: index === current ? 1 : 0 }}
                fetchPriority={index === 0 ? 'high' : 'low'}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            )
          ))}
        </div>
      </div>
    </section>
  )
}
