import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './admin/context/AuthContext.jsx'
import { Suspense, lazy } from 'react'
import ProtectedRoute from './admin/components/ProtectedRoute.jsx'

import AdminLogin from './admin/pages/AdminLogin.jsx'
import AdminLayout from './admin/components/AdminLayout.jsx'

import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Courses from './pages/Courses.jsx'
import About from './pages/About.jsx'
import PoliticaPrivacidade from './pages/PoliticaPrivacidade.jsx'
import TermosDeUso from './pages/TermosDeUso.jsx'
import NotFound from './pages/NotFound.jsx'
import DashboardLayout from './admin/components/DashboardLayout.jsx'

const HeroAdmin = lazy(() => import('./admin/pages/sections/HeroAdmin.jsx'))
const ServicesAdmin = lazy(() => import('./admin/pages/sections/ServicesAdmin.jsx'))
const ProductsAdmin = lazy(() => import('./admin/pages/sections/ProductsAdmin.jsx'))
const CoursesAdmin = lazy(() => import('./admin/pages/sections/CoursesAdmin.jsx'))
const SpaceAdmin = lazy(() => import('./admin/pages/sections/SpaceAdmin.jsx'))

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<Courses />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/termos-de-uso" element={<TermosDeUso />} />
          <Route path="*" element={<NotFound />} />
        </Route> 

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="login" element={<AdminLogin />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="hero" replace />} />
            <Route path="hero" element={<HeroAdmin />} />
            <Route path="servicos" element={<ServicesAdmin />} />
            <Route path="produtos" element={<ProductsAdmin />} />
            <Route path="cursos" element={<CoursesAdmin />} />
            <Route path="espaco" element={<SpaceAdmin />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}
