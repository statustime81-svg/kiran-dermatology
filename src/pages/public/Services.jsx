import SEO from '../../components/shared/SEO'
import ServicesHero from '../../components/sections/services/ServicesHero'
import ServicesGrid from '../../components/sections/services/ServicesGrid'
import AppointmentCTA from '../../components/sections/home/AppointmentCTA'

export default function Services() {
  return (
    <>
      <SEO
        title="Skin, Hair & Laser Treatments in Patna"
        description="Explore our comprehensive dermatology services — acne, hair fall, laser treatments, pigmentation, psoriasis, vitiligo, and more. Expert care by Dr. Asmita Singh in Patna."
        keywords="dermatology services patna, acne treatment, hair fall, laser hair removal, pigmentation, melasma, psoriasis, vitiligo"
      />

      <ServicesHero />
      <ServicesGrid />
      <AppointmentCTA />
    </>
  )
}