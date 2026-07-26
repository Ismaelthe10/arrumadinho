import { useEffect, useState } from 'react'
import styles from './Hero.module.css'

const WHATSAPP_LINK = 'https://wa.me/5500000000000' // mesmo link do Header — trocar pelo real


const heroImages = [
  { src: '/hero/foto-1.jpg', alt: 'ambiente barbearia arrumadinho' },
  { src: '/hero/foto-2.jpg', alt: 'ambiente barbearia arrumadinho' },
  { src: '/hero/foto-5.jpg', alt: 'ambiente barbearia arrumadinho' },
  { src: '/hero/foto-6.jpg',alt: 'ambiente barbearia arrumadinho' },
  { src: '/hero/foto-7.jpg', alt: 'ambiente barbearia arrumadinho' },
  { src: '/hero/foto-8.jpg', alt: 'ambiente barbearia arrumadinho' },
  { src: '/hero/foto-9.jpg', alt: 'ambiente barbearia arrumadinho' },
  { src: '/hero/foto-10.jpg', alt: 'ambiente barbearia arrumadinho' },
  { src: '/hero/foto-11.jpg', alt: 'ambiente barbearia arrumadinho' },
  { src: '/hero/foto-12.jpeg', alt: 'ambiente barbearia arrumadinho' },
  { src: '/hero/foto-13.jpg', alt: 'ambiente barbearia arrumadinho' },
  { src: '/hero/foto-14.jpg', alt: 'ambiente barbearia arrumadinho' },
  { src: '/hero/foto-15.webp', alt: 'ambiente barbearia arrumadinho' },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (heroImages.length <= 1) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

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
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              className={styles.image}
              style={{ opacity: index === current ? 1 : 0 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
