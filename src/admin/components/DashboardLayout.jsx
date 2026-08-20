import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import SectionErrorBoundary from './SectionErrorBoundary.jsx'
import styles from './DashboardLayout.module.css'

export default function DashboardLayout() {
  const { pathname } = useLocation()

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebarArea}>
        <Sidebar />
      </aside>

      <main className={styles.content}>
        {/* key por rota: trocar de seção remonta a barreira e zera o erro. */}
        <SectionErrorBoundary key={pathname}>
          <Suspense fallback={<p>Carregando...</p>}>
            <Outlet />
          </Suspense>
        </SectionErrorBoundary>
      </main>
    </div>
  )
}