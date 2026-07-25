import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Cursos from './pages/Cursos.jsx'
import PoliticaPrivacidade from './pages/PoliticaPrivacidade.jsx'
import TermosDeUso from './pages/TermosDeUso.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cursos" element={<Cursos />} />
      <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
      <Route path="/termos-de-uso" element={<TermosDeUso />} />
    </Routes>
  )
}
