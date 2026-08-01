import { signOut } from 'firebase/auth'
import { auth } from '../../infra/firebase.js'
import { useAuth } from '../../context/AuthContext.jsx'

import HeroAdmin from './sections/HeroAdmin'
import ServicesAdmin from './sections/ServicesAdmin'
import ProductsAdmin from './sections/ProductsAdmin.jsx'
import SpaceAdmin from './sections/SpaceAdmin.jsx'
import CoursesAdmin from './sections/CoursesAdmin.jsx'

export default function AdminDashboard() {
  const { user } = useAuth()

  return (
    <section >
        <HeroAdmin />
        <ServicesAdmin />
        <ProductsAdmin />
        <SpaceAdmin /> 
        <CoursesAdmin />

    
    </section>
  )
}

