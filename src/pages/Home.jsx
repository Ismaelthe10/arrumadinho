import Header from '../components/Header.jsx'
import Hero from '../components/Hero.jsx'
import Products from '../components/Products.jsx'
import Services from '../components/Services.jsx'
import Space from '../components/Space.jsx'
import GoogleReviews from '../components/GoogleReviews.jsx'
import Footer from '../components/Footer.jsx'
import Seo from '../components/Seo'
export default function Home() {
  return (
    <>  
        <Seo
          title="Barbearia Arrumadinho | Barbearia em Colombo - PR"
          description="Cortes, barba e colorimetria com profissionais experientes em Colombo/PR. Agende pelo WhatsApp."
        />
        <Hero   />
        <Services />
        <Products />
        <Space />
        <GoogleReviews />
    </>
  )
}

