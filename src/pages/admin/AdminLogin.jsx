import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../../infra/firebase.js'
import styles from './AdminLogin.module.css'


export default function AdminLogin() {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      alert('Não foi possível fazer login. Tente novamente.')
    }
  }

  return (
    <section className="section-dark">
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Painel Administrativo</h1>
          <p className={styles.subtitle}>Faça login para continuar</p>

          <button onClick={handleLogin} className={styles.googleButton}>
            Entrar com o Google
          </button>
        </div>
      </div>
    </section>
  )
}
