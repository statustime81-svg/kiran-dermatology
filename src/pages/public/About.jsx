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
      <SEO
        title="Dr. (Major) Asmita Singh - Dermatologist in Patna"
        description="Meet Dr. (Major) Asmita Singh — MBBS (AFMC Pune), MD Dermatology Gold Medalist (KGMU), Ex-Senior Resident AIIMS Patna. 14+ years of dermatology experience."
        keywords="Dr Asmita Singh, dermatologist Patna, MBBS AFMC, MD KGMU, AIIMS Patna dermatology"
      />

      <AboutHero />
      <DoctorBio />
      <Qualifications />
      <Achievements />
      <Philosophy />
      <AppointmentCTA />
    </>
  )
}