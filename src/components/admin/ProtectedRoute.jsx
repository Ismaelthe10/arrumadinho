import { Navigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../infra/firebase.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { AUTHORIZED_UIDS } from '../../config/authorizedUsers.js'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <section className="section-dark" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'white' }}>Carregando...</p>
      </section>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  const isAuthorized = AUTHORIZED_UIDS.includes(user.uid)

  if (!isAuthorized) {
    return (
      <section className="section-dark" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', padding: '24px', textAlign: 'center' }}>
        <p style={{ color: 'white' }}>
          Este email ({user.email}) não tem permissão para acessar esta área.
        </p>
        <button
          onClick={() => signOut(auth)}
          style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.4)', color: 'white', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
        >
          Sair
        </button>
      </section>
    )
  }

  return children
}
