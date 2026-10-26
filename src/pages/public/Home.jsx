import SEO from '../../components/shared/SEO'
import Hero from '../../components/sections/home/Hero'
import AboutPreview from '../../components/sections/home/AboutPreview'
import ServicesPreview from '../../components/sections/home/ServicesPreview'
import StatsCounter from '../../components/sections/home/StatsCounter'
import WhyChooseUs from '../../components/sections/home/WhyChooseUs'
import BlogPreview from '../../components/sections/home/BlogPreview'
import AppointmentCTA from '../../components/sections/home/AppointmentCTA'

export default function Home() {

  return (
    <>
      <SEO />

      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <StatsCounter />
      <WhyChooseUs />
      <BlogPreview />
      <AppointmentCTA />
    </>
  )
}
