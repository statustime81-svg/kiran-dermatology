import SEO from '../../components/shared/SEO'
import ContactHero from '../../components/sections/contact/ContactHero'
import ContactInfo from '../../components/sections/contact/ContactInfo'
import ContactForm from '../../components/sections/contact/ContactForm'
import MapEmbed from '../../components/sections/contact/MapEmbed'

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Our Skin Clinic in Patna"
        description="Get in touch with Kiran Dermatology — call, email, or visit us on Bailey Road, Patna. Book your consultation with Dr. Asmita Singh today."
        keywords="contact dermatologist patna, book skin consultation, kiran dermatology contact, bailey road skin clinic"
      />

      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <MapEmbed />
    </>
  )
}