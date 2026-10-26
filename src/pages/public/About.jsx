import SEO from '../../components/shared/SEO'
import AboutHero from '../../components/sections/about/AboutHero'
import DoctorBio from '../../components/sections/about/DoctorBio'
import Qualifications from '../../components/sections/about/Qualifications'
import Achievements from '../../components/sections/about/Achievements'
import Philosophy from '../../components/sections/about/Philosophy'
import AppointmentCTA from '../../components/sections/home/AppointmentCTA'

export default function About() {

  return (
    <>
      <SEO />

      <AboutHero />
      <DoctorBio />
      <Qualifications />
      <Achievements />
      <Philosophy />
      <AppointmentCTA />
    </>
  )
}