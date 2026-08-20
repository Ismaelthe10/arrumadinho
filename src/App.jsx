import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'

// Só a Home entra no bundle inicial. As demais rotas viram chunks separados,
// buscados apenas quando o visitante navega até elas — a maioria das sessões
// entra pela home e nunca baixa Cursos, Sobre ou as páginas legais.
const Courses = lazy(() => import('./pages/Courses.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const PoliticaPrivacidade = lazy(() => import('./pages/PoliticaPrivacidade.jsx'))
const TermosDeUso = lazy(() => import('./pages/TermosDeUso.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

// Todo o painel é carregado sob demanda: o visitante do site público nunca baixa
// o Firebase Auth nem o código do admin.
const AdminApp = lazy(() => import('./admin/AdminApp.jsx'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cursos" element={<Courses />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
        <Route path="/termos-de-uso" element={<TermosDeUso />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route
        path="/admin/*"
        element={
          <Suspense fallback={null}>
            <AdminApp />
          </Suspense>
        }
      />
    </Routes>
  )
}
