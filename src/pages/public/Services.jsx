import SEO from '../../components/shared/SEO'
import ServicesHero from '../../components/sections/services/ServicesHero'
import ServicesGrid from '../../components/sections/services/ServicesGrid'
import AppointmentCTA from '../../components/sections/home/AppointmentCTA'

export default function Services() {
  return (
    <>
      <SEO />

      <ServicesHero />
      <ServicesGrid />
      <AppointmentCTA />
    </>
  )
}