import { useEffect, useState } from 'react'
import { CheckCircleFillIcon, ZapIcon, PeopleIcon, MortarBoardIcon, CreditCardIcon } from '@primer/octicons-react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../infra/firebase'
import Seo from '../components/Seo'
import styles from './Cursos.module.css'

const WHATSAPP_NUMBER = '554198496829'

function buildWhatsAppLink(courseTitle) {
  const message = `Olá! Tenho interesse no curso "${courseTitle}"`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

// Conteúdo estático (institucional) — combinado que fica hardcoded por enquanto
const features = [
  {
    icon: ZapIcon,
    title: 'Prática Intensiva',
    description: 'Aprenda fazendo. Cada aula é focada em técnicas práticas com modelos reais.',
  },
  {
    icon: PeopleIcon,
    title: 'Mentoria Personalizada',
    description: 'Instrutores experientes acompanham seu desenvolvimento de perto.',
  },
  {
    icon: MortarBoardIcon,
    title: 'Certificação Profissional',
    description: 'Receba certificado reconhecido que valida sua formação no mercado.',
  },
]

export default function Courses() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    let mounted = true

    async function loadCourses() {
      try {
        const q = query(collection(db, 'courses'), orderBy('order'))
        const snap = await getDocs(q)

        if (!mounted) return

        setCourses(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      } catch (err) {
        console.error('Erro ao carregar cursos:', err)
      }
    }

    loadCourses()

    return () => {
      mounted = false
    }
  }, [])

  const coursesJsonLd = courses.length > 0 ? {
    '@context': 'https://schema.org',
    '@graph': courses.map((course) => ({
      '@type': 'Course',
      name: course.title,
      description: course.description,
      provider: {
        '@type': 'Organization',
        name: 'Barbearia Arrumadinho',
        sameAs: 'https://www.barbeariaarrumadinho.com.br/',
      },
    })),
  } : null

  return (
    <>
      <Seo
        title="Cursos de Barbeiro | Barbearia Arrumadinho"
        description="Cursos profissionais de barbeiro em Colombo/PR: do iniciante ao avançado, com prática intensiva e certificação."
        jsonLd={coursesJsonLd}
      />
      {/* Hero com curso-2 de fundo */}
      <section className={styles.hero}>
        <img src="/courses/curso-02.jpg" alt="" aria-hidden="true" className={styles.heroImage} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Cursos Profissionais de Barbeiro</h1>
          <p className={styles.heroSubtitle}>
            Formação prática e atualizada para quem deseja evoluir ou iniciar na
            profissão com excelência.
          </p>
        </div>
      </section>
      {/* Por que escolher — título primeiro, ilustração atrás dos cards */}
      <section className="section-light">
        <div className={styles.whyContainer}>
          <img src="/courses/curso-5.png" alt="" aria-hidden="true" className={styles.whyIllustration} />

          <div className={styles.whyText}>
            <h2 className={styles.sectionTitle}>Por que escolher nossos cursos?</h2>
            <p className={styles.sectionSubtitle}>
              Oferecemos formação de qualidade com instrutores experientes,
              metodologia prática comprovada e ambiente profissional que prepara
              você para o mercado.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            {features.map((feature) => (
              <div key={feature.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <feature.icon size={22} />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>      
    
      {/* Nossos Cursos */}
      <section className={styles.coursesSection}>
        <img src="/courses/curso-6.jpg" alt="" aria-hidden="true" className={styles.coursesSectionImage} />
        <div className={styles.coursesSectionOverlay} />

        <div className={styles.container}>
          <h2 className={styles.sectionTitleDark}>Nossos Cursos</h2>

          <div className={styles.coursesGrid}>
            {courses.map((course) => (
              <div key={course.id} className={styles.courseCardGlass}>
                <div className={styles.courseBody}>
                  <h3 className={styles.courseTitleDark}>{course.title}</h3>
                  <span className={styles.courseMeta}>{course.meta}</span>
                  <p className={styles.courseDescriptionDark}>{course.description}</p>

                  <div className={styles.courseListBlock}>
                    <span className={styles.courseListTitleDark}>{course.listTitle}</span>
                    <ul className={styles.courseList}>
                      {course.items?.map((item, itemIndex) => (
                        <li key={itemIndex} className={styles.courseListItemDark}>
                          <CheckCircleFillIcon size={14} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={buildWhatsAppLink(course.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.courseButton}
                  >
                    Tenho interesse
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Informações Finais */}

      <section className={styles.finalSection}>
        <div className={styles.finalPattern} />
        <div className={styles.finalContainer}>
          <div className={styles.finalCard}>
            <div className={styles.finalIcon}>
              <CreditCardIcon size={24} />
            </div>

            <h2 className={styles.sectionTitle}>Informações Finais</h2>

            <span className={styles.finalBadge}>Parcelamento em até 3x sem juros</span>

            <p className={styles.finalText}>
              Para mais informações ou garantir sua vaga, fale conosco.
            </p>

            <a
              href={buildWhatsAppLink('Cursos Profissionais de Barbeiro')}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.finalButton}
            >
              Falar Conosco
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
