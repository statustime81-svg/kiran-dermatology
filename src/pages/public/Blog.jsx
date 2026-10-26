import SEO from '../../components/shared/SEO'
import BlogHero from '../../components/sections/blog/BlogHero'
import BlogGrid from '../../components/sections/blog/BlogGrid'
import AppointmentCTA from '../../components/sections/home/AppointmentCTA'

export default function Blog() {
  return (
    <>
      <SEO
        title="Skin & Hair Care Articles"
        description="Dermatologist-written articles on skincare, hair care, acne, pigmentation, and laser treatments. Evidence-based advice from Dr. Asmita Singh."
        keywords="skin care blog, dermatologist blog, hair care tips, acne treatment guide, melasma, laser hair removal"
      />

      <BlogHero />
      <BlogGrid />
      <AppointmentCTA />
    </>
  )
}