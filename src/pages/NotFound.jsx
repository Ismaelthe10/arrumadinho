import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <section className={`section-light ${styles.section}`}>
      <Seo
        title="Página não encontrada | Barbearia Arrumadinho"
        description="A página que você procura não existe ou foi movida."
        noindex

      />

      <div className={styles.container}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Página não encontrada</h1>
        <p className={styles.text}>
          O endereço que você tentou acessar não existe ou foi movido.
        </p>
        <Link to="/" className={styles.button}>
          Voltar para a página inicial
        </Link>
      </div>
    </section>
  )
}
