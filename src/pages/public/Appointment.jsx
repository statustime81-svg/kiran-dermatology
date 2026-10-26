import SEO from '../../components/shared/SEO'
import AppointmentHero from '../../components/sections/appointment/AppointmentHero'
import AppointmentForm from '../../components/sections/appointment/AppointmentForm'
import AppointmentInfo from '../../components/sections/appointment/AppointmentInfo'
import WhatsAppCTA from '../../components/sections/appointment/WhatsAppCTA'

export default function Appointment() {
  return (
    <>
      <SEO
        title="Book a Dermatology Appointment in Patna"
        description="Book your dermatology consultation with Dr. Asmita Singh in Patna. Choose your preferred date, time, and treatment — we'll confirm your slot."
        keywords="book dermatologist appointment patna, skin consultation booking, doctor appointment online"
      />

      <AppointmentHero />
      <AppointmentForm />
      <AppointmentInfo />
      <WhatsAppCTA />
    </>
  )
}