import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import styles from './DashboardLayout.module.css'

export default function DashboardLayout() {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebarArea}>
        <Sidebar />
      </aside>

      <main className={styles.content}>
        <Suspense fallback={<p>Carregando...</p>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}