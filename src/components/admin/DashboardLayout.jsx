import { Suspense, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ThreeBarsIcon, XIcon } from '@primer/octicons-react'
import Sidebar from './Sidebar.jsx'
import styles from './DashboardLayout.module.css'

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.mobileToggle}
        onClick={() => setMobileOpen((open) => !open)}
        aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        {mobileOpen ? <XIcon size={20} /> : <ThreeBarsIcon size={20} />}
      </button>

      <aside className={`${styles.sidebarArea} ${mobileOpen ? styles.sidebarOpen : ''}`}>
        <Sidebar onNavigate={() => setMobileOpen(false)} />
      </aside>

      {mobileOpen && (
        <div className={styles.overlay} onClick={() => setMobileOpen(false)} />
      )}

      <main className={styles.content}>
        <Suspense fallback={<p>Carregando...</p>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}