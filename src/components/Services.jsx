import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@primer/octicons-react'
import styles from './Services.module.css'

const services = [
  {
    title: 'Corte de Cabelo',
    description: 'Corte clássico ou moderno, feito com precisão para valorizar seu estilo.',
    image: '/services/foto-16.webp',
  },
  {
    title: 'Barba',
    description: 'Barba bem alinhada, navalha quente e acabamento profissional.',
    image: '/services/foto-3.jpeg',
  },
  {
    title: 'Colorimetria',
    description: 'Técnicas avançadas de coloração para transformar seu visual com segurança.',
    image: '/services/foto-4.jpeg',
  },
]

const extraServices = [
  'Cabelo + Barba',
  'Meia barba',
  'Cavanhaque',
  'Sobrancelha',
  'Pezinho',
  'Depilação nariz/ouvido',
  'Selagem',
  'Hidratação',
  'Luzes/Platinado',
]

export default function Servicos() {
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
            <div key={service.title} className={styles.card}>
              <img src={service.image} alt={service.title} className={styles.image} />

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
              {extraServices.map((item) => (
                <li key={item} className={styles.extraItem}>
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