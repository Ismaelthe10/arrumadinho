import Header from '../components/Header.jsx'
import Hero from '../components/Hero.jsx'
import Products from '../components/Products.jsx'
import Services from '../components/Services.jsx'
import Space from '../components/Space.jsx'
import GoogleReviews from '../components/GoogleReviews.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <>  
        <Hero   />
        <Services />
        <Products />
        <Space />
        <GoogleReviews />
    </>
  )
}

