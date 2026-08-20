import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import ScrollManager from './ScrollManager.jsx'

export default function Layout() {
  return (
    <>
      <ScrollManager />
      <Header />
      <main>
        {/* Header e Footer continuam pintados enquanto o chunk da rota chega. */}
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />

      {/* Fica no Layout público, e não na raiz do app, porque /admin é uma rota
          irmã: assim as sessões do próprio dono editando o site não entram na
          contagem. Sem cookie e sem identificar visitante — por isso não exige
          banner de consentimento. */}
      <Analytics />
    </>
  )
}
