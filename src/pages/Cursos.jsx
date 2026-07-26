import { CheckCircleFillIcon, ZapIcon, PeopleIcon, MortarBoardIcon } from '@primer/octicons-react'
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

export default function Cursos() {
  return (
    <>
      {/* Topo — LIGHT */}
      <section className="section-light">
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitleLight}>Cursos Profissionais de Barbeiro</h1>
          <p className={styles.heroSubtitleLight}>
            Formação prática e atualizada para quem deseja evoluir ou iniciar na
            profissão com excelência.
          </p>
        </div>
      </section>

      {/* Por que escolher — DARK */}
      <section className="section-dark">
        <div className={styles.container}>
          <h2 className={styles.sectionTitleDark}>Por que escolher nossos cursos?</h2>
          <p className={styles.sectionSubtitleDark}>
            Oferecemos formação de qualidade com instrutores experientes,
            metodologia prática comprovada e ambiente profissional que prepara
            você para o mercado.
          </p>

          <div className={styles.featuresGrid}>
            {features.map((feature) => (
              <div key={feature.title} className={styles.featureCardDark}>
                <div className={styles.featureIcon}>
                  <feature.icon size={22} />
                </div>
                <h3 className={styles.featureTitleDark}>{feature.title}</h3>
                <p className={styles.featureDescriptionDark}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossos Cursos — LIGHT */}
      <section className="section-light">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Nossos Cursos</h2>

          <div className={styles.coursesGrid}>
            {courses.map((course) => (
              <div key={course.title} className={styles.courseCardLight}>
                <div className={styles.courseBody}>
                  <h3 className={styles.courseTitleLight}>{course.title}</h3>
                  <span className={styles.courseMeta}>{course.meta}</span>
                  <p className={styles.courseDescriptionLight}>{course.description}</p>

                  <div className={styles.courseListBlock}>
                    <span className={styles.courseListTitleLight}>{course.listTitle}</span>
                    <ul className={styles.courseList}>
                      {course.items.map((item) => (
                        <li key={item} className={styles.courseListItemLight}>
                          <CheckCircleFillIcon size={14} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
         </div>
                <div className={styles.courseFooter}>
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

      {/* Informações Finais — DARK */}
      <section className="section-dark">
        <div className={styles.finalContainer}>
          <h2 className={styles.sectionTitleDark}>Informações Finais</h2>
          <p className={styles.finalTextDark}>Parcelamento em até 3x sem juros.</p>
          <p className={styles.finalTextDark}>
            Para mais informações ou garantir sua vaga, fale conosco.
          </p>
          <a
            href={buildWhatsAppLink('Cursos Profissionais de Barbeiro')}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.finalButtonDark}
          >
            Falar Conosco
          </a>
        </div>
      </section>
    </>
  )
}