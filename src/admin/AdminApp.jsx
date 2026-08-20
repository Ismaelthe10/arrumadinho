import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy } from 'react'

import { AuthProvider } from './context/AuthContext.jsx'
import { UnsavedChangesProvider } from './context/UnsavedChangesProvider.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminLayout from './components/AdminLayout.jsx'
import DashboardLayout from './components/DashboardLayout.jsx'
import AdminLogin from './pages/AdminLogin.jsx'

const HeroAdmin = lazy(() => import('./pages/sections/HeroAdmin.jsx'))
const ServicesAdmin = lazy(() => import('./pages/sections/ServicesAdmin.jsx'))
const ProductsAdmin = lazy(() => import('./pages/sections/ProductsAdmin.jsx'))
const CoursesAdmin = lazy(() => import('./pages/sections/CoursesAdmin.jsx'))
const SpaceAdmin = lazy(() => import('./pages/sections/SpaceAdmin.jsx'))

/**
 * Raiz do painel administrativo, montada apenas em /admin/*.
 *
 * O AuthProvider vive aqui e não em App.jsx de propósito: ele chama
 * onAuthStateChanged na montagem, o que antes inicializava o firebase/auth em
 * toda visita ao site público. As rotas abaixo são relativas a /admin.
 */
export default function AdminApp() {
  return (
    <AuthProvider>
      <UnsavedChangesProvider>
        <Routes>
          <Route element={<AdminLayout />}>
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
              <Route index element={<Navigate to="/admin/dashboard/hero" replace />} />
              <Route path="hero" element={<HeroAdmin />} />
              <Route path="servicos" element={<ServicesAdmin />} />
              <Route path="produtos" element={<ProductsAdmin />} />
              <Route path="cursos" element={<CoursesAdmin />} />
              <Route path="espaco" element={<SpaceAdmin />} />
            </Route>
          </Route>
        </Routes>
      </UnsavedChangesProvider>
    </AuthProvider>
  )
}
