import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../infra/firebase'
import { useAuth } from '../../context/AuthContext.jsx'
import styles from './AdminHeader.module.css'

export default function AdminHeader() {
  const navigate = useNavigate()
  const { user } = useAuth()

  if (!user) return null

  async function handleLogout() {
    try {
      await signOut(auth)
      navigate('/admin/login')
    } catch (err) {
      console.error('Erro ao sair:', err)
    }
  }

  return (
    <header className={styles.header}>
      <button
        type="button"
        onClick={() => navigate('/')}
        className={styles.navButton}
      >
        Voltar ao site
      </button>

      <button
        type="button"
        onClick={handleLogout}
        className={styles.logoutButton}
      >
        Sair
      </button>
    </header>
  )
}
