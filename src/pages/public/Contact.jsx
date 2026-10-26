import SEO from '../../components/shared/SEO'
import ContactHero from '../../components/sections/contact/ContactHero'
import ContactInfo from '../../components/sections/contact/ContactInfo'
import ContactForm from '../../components/sections/contact/ContactForm'
import MapEmbed from '../../components/sections/contact/MapEmbed'

export default function Contact() {
  return (
    <>
      <SEO />

      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <MapEmbed />
    </>
  )
}