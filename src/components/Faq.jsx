import styles from './Faq.module.css'

/**
 * Perguntas frequentes.
 *
 * Usa <details>/<summary> de propósito: as respostas ficam no DOM mesmo
 * fechadas, então são indexáveis e acessíveis sem depender de JavaScript.
 */
export default function Faq({ title = 'Perguntas Frequentes', items }) {
  return (
    <section id="faq" className="section-dark">
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>

        {items.map(({ question, answer }) => (
          <details key={question} className={styles.item}>
            <summary className={styles.question}>{question}</summary>
            <p className={styles.answer}>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
