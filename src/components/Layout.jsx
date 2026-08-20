import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
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

      {/* Ambos ficam no Layout público, e não na raiz do app, porque /admin é
          uma rota irmã. Assim as sessões do próprio dono editando o site não
          entram na contagem de audiência, nem misturam as métricas de um painel
          autenticado com as das páginas que o Google avalia. Nenhum dos dois usa
          cookie ou identifica visitante — por isso não exigem banner. */}
      <Analytics />
      <SpeedInsights />
    </>
  )
}
