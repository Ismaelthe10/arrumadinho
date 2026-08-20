import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        {/* Header e Footer continuam pintados enquanto o chunk da rota chega. */}
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
