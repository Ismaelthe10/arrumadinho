import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Cursos from './pages/Cursos.jsx'
import About from './pages/About.jsx'
import PoliticaPrivacidade from './pages/PoliticaPrivacidade.jsx'
import TermosDeUso from './pages/TermosDeUso.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
        <Route path="/termos-de-uso" element={<TermosDeUso />} />
      </Route>
    </Routes>
  )
}
