import { useNavigate, Navigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../../infra/firebaseAuth.js'
import { useAuth } from '../context/useAuth.js'
import styles from './AdminLogin.module.css'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()

  // Se já está logado e cair aqui (ex: digitou a URL direto), manda pro dashboard
  if (!loading && user) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      navigate('/admin/dashboard')
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
