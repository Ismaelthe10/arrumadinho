import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../infra/firebaseAuth'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigationGuard } from '../context/useUnsavedChanges'
import styles from './AdminHeader.module.css'

export default function AdminHeader() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const guard = useNavigationGuard()

  if (!user) return null

  async function handleLogout() {
    if (!guard()) return

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
        onClick={() => guard() && navigate('/')}
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
