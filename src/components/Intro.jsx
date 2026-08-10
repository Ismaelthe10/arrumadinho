import styles from './Intro.module.css'
import { ADDRESS, REVIEW_COUNT } from '../config/site'

/**
 * Bloco institucional da home.
 *
 * Existe por SEO: até então a home tinha ~45 palavras de texto estático, sem
 * nenhuma ocorrência de "barbearia" + cidade fora das meta tags. É o texto que
 * dá ao Google contexto de o que o negócio faz e onde fica.
 */
export default function Intro() {
  return (
    <section className={`section-light ${styles.section}`}>
      <div className={styles.pattern} />
      <div className={styles.container}>
        <h2 className={styles.title}>
          Barbearia no bairro Guarani, em Colombo — PR
        </h2>

        <p className={styles.text}>
          A Barbearia Arrumadinho atende em Colombo, no Paraná, desde agosto de
          2017. Ficamos na {ADDRESS.street}, no bairro {ADDRESS.neighborhood}, a
          poucos minutos da divisa com Curitiba — o que coloca a barbearia ao
          alcance de quem mora ou trabalha na região metropolitana.
        </p>

        <p className={styles.text}>
          O nome não veio por acaso. Desde o começo a barbearia se destacou pela
          organização e pelo cuidado com cada detalhe, e é isso que continua
          guiando o atendimento até hoje — são mais de {REVIEW_COUNT} avaliações
          no Google, com nota máxima.
        </p>

        <p className={styles.text}>
          No dia a dia trabalhamos com corte de cabelo masculino, barba feita na
          navalha e colorimetria, além de serviços como sobrancelha, pezinho,
          hidratação, selagem e luzes. E também formamos novos profissionais:
          nossos cursos de barbeiro vão do iniciante ao aperfeiçoamento de quem
          já está no mercado.
        </p>
      </div>
    </section>
  )
}
