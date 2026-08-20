import Hero from '../components/Hero.jsx'
import Intro from '../components/Intro.jsx'
import Products from '../components/Products.jsx'
import Services from '../components/Services.jsx'
import Space from '../components/Space.jsx'
import GoogleReviews from '../components/GoogleReviews.jsx'
import Faq from '../components/Faq.jsx'
import Seo from '../components/Seo'
import { ROUTE_META } from '../config/routeMeta'
import { HOME_FAQ, buildFaqJsonLd } from '../content/faq'

const faqJsonLd = buildFaqJsonLd(HOME_FAQ)

export default function Home() {
  return (
    <>
        <Seo {...ROUTE_META.home} jsonLd={faqJsonLd} />
        <Hero />
        <Services />
        <Products />
        <Space />
        <Intro />
        <GoogleReviews />
        <Faq items={HOME_FAQ} />
    </>
  )
}
