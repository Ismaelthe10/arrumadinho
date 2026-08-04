import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../infra/firebase'
import styles from './Hero.module.css'
import { optimizeCloudinaryUrl } from '../utils/cloudinaryUrl'

const WHATSAPP_LINK = 'https://wa.me/554198496829?text=Olá,%20gostaria%20de%20agendar%20um%20horário!'

export default function Hero() {
  const [heroImages, setHeroImages] = useState([])
  const [current, setCurrent] = useState(0)

  const [renderedIndices, setRenderedIndices] = useState(new Set([0]))

  useEffect(() => {
    let mounted = true

    async function loadImages() {
      try {
        const ref = doc(db, 'hero', 'carousel')
        const snap = await getDoc(ref)

        if (!mounted) return

        const data = snap.exists() ? snap.data() : null
        setHeroImages(Array.isArray(data?.images) ? data.images : [])
      } catch (err) {
        console.error('Erro ao carregar imagens do Hero:', err)
      }
    }

    loadImages()

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (heroImages.length <= 1) return
    setRenderedIndices((prev) => new Set(prev).add(1 % heroImages.length))
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
    }, 4000)
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

          <h1 className={styles.title}>Estilo e tradição em cada corte!</h1>
          <p className={styles.subtitle}>
            Com quem entende do assunto. Profissionais experientes, ambiente
            acolhedor e resultados que falam por si.
          </p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={styles.cta}>
            Agendar horário
          </a>
        </div>

        <div className={styles.imageBlock}>
          {heroImages.map((image, index) => (
            renderedIndices.has(index) && (
              <img
                key={image.src}
                src={optimizeCloudinaryUrl(image.src, 1200)}
                alt={image.alt}
                className={styles.image}
                style={{ opacity: index === current ? 1 : 0 }}
                fetchpriority={index === 0 ? 'high' : 'low'}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            )
          ))}
        </div>
      </div>
    </section>
  )
}
