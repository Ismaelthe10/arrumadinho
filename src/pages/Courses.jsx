import { CheckCircleFillIcon, ZapIcon, PeopleIcon, MortarBoardIcon, CreditCardIcon } from '@primer/octicons-react'

import styles from './Cursos.module.css'

const WHATSAPP_NUMBER = '554198496829'

function buildWhatsAppLink(courseTitle) {
  const message = `Olá! Tenho interesse no curso "${courseTitle}"`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

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

const courses = [
  {
    title: 'Curso de Aperfeiçoamento Prático',
    meta: 'Duração: 1 Dia • 8 Horas',
    description:
      'Indicado para barbeiros que desejam aprimorar técnicas e atualizar seus conhecimentos com foco total na prática profissional.',
    listTitle: 'O que você aprenderá',
    items: [
      'Duração: 1 dia (8 horas)',
      'Técnicas de tesoura e degradê',
      'Barba e colorimetria',
    ],
  },
  {
    title: 'Curso Extensivo para Barbeiros',
    meta: 'Duração: 17 Dias • 40 Horas',
    description:
      'Formação completa para profissionais já atuantes que buscam elevar o nível técnico, produtividade e padrão de atendimento.',
    listTitle: 'Informações do curso',
    items: [
      'Duração aproximada: 17 dias (40 horas)',
      'Segunda a quinta-feira',
      'Horário: 8h30 às 22h30',
    ],
  },
  {
    title: 'Curso para Iniciantes',
    meta: 'Modalidade: Completo',
    description:
      'Ideal para quem deseja ingressar na profissão e aprender do zero, com acompanhamento prático e metodologia estruturada.',
    listTitle: 'Informações do curso',
    items: [
      'Do iniciante ao nível profissional',
      'Segunda a quinta-feira',
      'Horário: 8h30 às 22h30',
    ],
  },
]

export default function Courses() {
  return (
    <>
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
              <div key={course.title} className={styles.courseCardGlass}>
                <div className={styles.courseBody}>
                  <h3 className={styles.courseTitleDark}>{course.title}</h3>
                  <span className={styles.courseMeta}>{course.meta}</span>
                  <p className={styles.courseDescriptionDark}>{course.description}</p>

                  <div className={styles.courseListBlock}>
                    <span className={styles.courseListTitleDark}>{course.listTitle}</span>
                    <ul className={styles.courseList}>
                      {course.items.map((item) => (
                        <li key={item} className={styles.courseListItemDark}>
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