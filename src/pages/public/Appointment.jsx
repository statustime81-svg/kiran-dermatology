import SEO from '../../components/shared/SEO'
import AppointmentHero from '../../components/sections/appointment/AppointmentHero'
import AppointmentForm from '../../components/sections/appointment/AppointmentForm'
import AppointmentInfo from '../../components/sections/appointment/AppointmentInfo'
import WhatsAppCTA from '../../components/sections/appointment/WhatsAppCTA'

export default function Appointment() {
  return (
    <>
      <SEO />

      <AppointmentHero />
      <AppointmentForm />
      <AppointmentInfo />
      <WhatsAppCTA />
    </>
  )
}