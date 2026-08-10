import { Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader.jsx'
import Seo from '../../components/Seo'


export default function AdminLayout() {
  return (
    <>
      <Seo title="Painel Administrativo | Barbearia Arrumadinho" noindex />

      <AdminHeader />
      <main>
        <Outlet />
      </main>

    </>
  )
}
