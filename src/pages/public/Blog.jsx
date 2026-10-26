import SEO from '../../components/shared/SEO'
import BlogHero from '../../components/sections/blog/BlogHero'
import BlogGrid from '../../components/sections/blog/BlogGrid'
import AppointmentCTA from '../../components/sections/home/AppointmentCTA'

export default function Blog() {
  return (
    <>
      <SEO />

      <BlogHero />
      <BlogGrid />
      <AppointmentCTA />
    </>
  )
}