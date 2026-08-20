import { useMemo } from 'react'
import { CheckCircleFillIcon, ZapIcon, PeopleIcon, MortarBoardIcon, CreditCardIcon } from '@primer/octicons-react'
import { useCachedContent } from '../hooks/useCachedContent'
import { fetchCourses } from '../infra/publicContent'
import Seo from '../components/Seo'
import { ROUTE_META } from '../config/routeMeta'
import Faq from '../components/Faq.jsx'
import { COURSES_FAQ, buildFaqJsonLd } from '../content/faq'
import styles from './Courses.module.css'
import {
  BUSINESS_ID,
  BUSINESS_NAME,
  SITE_URL,
  buildInterestLink,
  buildWhatsAppLink,
} from '../config/site'

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
  const courses = useCachedContent('courses', fetchCourses, [])

  // O rich result de lista de cursos do Google exige no mínimo 3 cursos, e cada
  // um precisa de name e description não vazios — abaixo disso a marcação é
  // ignorada, então não vale a pena emiti-la.
  const coursesJsonLd = useMemo(() => {
    const eligibleCourses = courses.filter((c) => c.title && c.description)
    if (eligibleCourses.length < 3) return null

    return {
      '@type': 'ItemList',
      itemListElement: eligibleCourses.map((course, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Course',
          name: course.title,
          description: course.description,
          url: `${SITE_URL}/cursos`,
          provider: {
            '@type': 'Organization',
            '@id': BUSINESS_ID,
            name: BUSINESS_NAME,
          },
        },
      })),
    }
  }, [courses])

  const pageJsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        ...(coursesJsonLd ? [coursesJsonLd] : []),
        buildFaqJsonLd(COURSES_FAQ),
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Cursos', item: `${SITE_URL}/cursos` },
          ],
        },
      ],
    }),
    [coursesJsonLd],
  )

  return (
    <>
      <Seo {...ROUTE_META.courses} jsonLd={pageJsonLd} />
      {/* Hero com curso-2 de fundo */}
      <section className={styles.hero}>
        <img
          src="/courses/curso-02.jpg"
          alt=""
          aria-hidden="true"
          className={styles.heroImage}
          fetchPriority="high"
          loading="eager"
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Curso de Barbeiro em Colombo e Curitiba
          </h1>
          <p className={styles.heroSubtitle}>
            Formação prática e atualizada para quem deseja evoluir ou iniciar na
            profissão com excelência. Aulas na nossa barbearia em Colombo, a
            poucos minutos de Curitiba.
          </p>
        </div>
      </section>
      {/* Por que escolher — título primeiro, ilustração atrás dos cards */}
      <section className="section-light">
        <div className={styles.whyContainer}>
          <img
            src="/courses/curso-5.png"
            alt=""
            aria-hidden="true"
            className={styles.whyIllustration}
            loading="lazy"
          />

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

      {/* Texto institucional — dá ao Google contexto sobre o que é o curso,
          para quem é e o que ele cobre. Antes a página só tinha os cards. */}
      <section className="section-light">
        <div className={styles.proseContainer}>
          <h2 className={styles.sectionTitle}>Para quem são os cursos</h2>
          <p className={styles.prose}>
            Nossas formações atendem três momentos diferentes da carreira. Quem
            nunca pegou numa máquina começa pelo <strong>curso para
            iniciantes</strong>, que leva do zero ao nível profissional com
            acompanhamento próximo e uma metodologia estruturada — é o caminho
            de quem quer mudar de profissão ou ter a barbearia como primeira
            fonte de renda.
          </p>
          <p className={styles.prose}>
            Quem já atende clientes e quer subir de patamar encontra no{' '}
            <strong>curso extensivo para barbeiros</strong>, de 40 horas, um
            trabalho voltado a nível técnico, produtividade e padrão de
            atendimento. E o <strong>curso de aperfeiçoamento prático</strong>,
            de 8 horas em um único dia, é para o profissional que quer atualizar
            e afiar técnicas específicas sem parar a agenda por semanas.
          </p>

          <h2 className={styles.sectionTitle}>O que você vai aprender</h2>
          <p className={styles.prose}>
            O conteúdo é construído em cima do que realmente aparece na cadeira
            todo dia: técnicas de tesoura e degradê, acabamento com navalha,
            desenho e alinhamento de barba, e colorimetria — incluindo luzes e
            platinado, que são os serviços de maior valor agregado e onde a
            maioria dos barbeiros trava.
          </p>
          <p className={styles.prose}>
            Mas técnica sozinha não sustenta uma cadeira cheia. Ao longo do
            curso também se trabalha a parte que costuma ficar de fora das
            formações: como conduzir o atendimento, manter padrão entre um
            cliente e outro e organizar o próprio ritmo de trabalho para render
            mais sem perder qualidade.
          </p>

          <h2 className={styles.sectionTitle}>Onde as aulas acontecem</h2>
          <p className={styles.prose}>
            As aulas são realizadas na própria Barbearia Arrumadinho, em
            Colombo, no Paraná — a poucos minutos da divisa com Curitiba, o que
            torna o deslocamento viável para alunos de toda a região
            metropolitana. Aprender dentro de uma barbearia em funcionamento, e
            não numa sala de aula montada só para o curso, é o que permite que a
            prática aconteça com modelos reais e no ritmo do dia a dia.
          </p>
        </div>
      </section>

      {/* Nossos Cursos */}
      <section className={styles.coursesSection}>
        <img
          src="/courses/curso-6.jpg"
          alt=""
          aria-hidden="true"
          className={styles.coursesSectionImage}
          loading="lazy"
        />
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
                    href={buildInterestLink('curso', course.title)}
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
              href={buildWhatsAppLink('Olá! Gostaria de mais informações sobre os cursos de barbeiro.')}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.finalButton}
            >
              Falar Conosco
            </a>
          </div>
        </div>
      </section>

      <Faq title="Perguntas frequentes sobre os cursos" items={COURSES_FAQ} />
    </>
  )
}
