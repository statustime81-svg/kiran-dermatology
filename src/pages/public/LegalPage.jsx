import { Link } from 'react-router-dom'
import SEO from '../../components/shared/SEO'
import { LEGAL_UPDATED, PRIVACY_SECTIONS, TERMS_SECTIONS } from '../../seo/legal'

export default function LegalPage({ kind }) {
  const privacy = kind === 'privacy'
  const title = privacy ? 'Privacy Policy' : 'Terms & Conditions'
  const sections = privacy ? PRIVACY_SECTIONS : TERMS_SECTIONS
  return <>
    <SEO />
    <section className="pt-36 pb-20 bg-background">
      <div className="container-custom max-w-4xl">
        <nav aria-label="Breadcrumb" className="text-sm text-textMuted mb-6">
          <Link to="/" className="text-primary hover:underline">Home</Link><span className="mx-2">/</span><span>{title}</span>
        </nav>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">{title}</h1>
        <p className="text-textMuted mb-10">Last updated: <time dateTime="2026-10-26">{LEGAL_UPDATED}</time></p>
        <article className="space-y-8 text-textSecondary leading-relaxed">
          {sections.map(([heading, ...paragraphs], index) => <section key={heading} aria-labelledby={`legal-${index}`}>
            <h2 id={`legal-${index}`} className="font-heading text-xl md:text-2xl font-semibold text-secondary mb-3">{index + 1}. {heading}</h2>
            {paragraphs.map(text => <p key={text} className="mb-3">{text}</p>)}
          </section>)}
          <address className="not-italic rounded-2xl border border-borderLight bg-white p-6">
            <strong className="text-secondary">Kiran Skin Clinic</strong><br />
            Jalalpur Complex, Bailey Road, Patna, Bihar, India<br />
            Email: <a className="text-primary underline" href="mailto:asmita.hi@gmail.com">asmita.hi@gmail.com</a><br />
            Phone: <a className="text-primary underline" href="tel:+918595749644">+91 8595749644</a>
          </address>
          <p>Related policy: <Link className="text-primary underline" to={privacy ? '/terms' : '/privacy-policy'}>{privacy ? 'Terms & Conditions' : 'Privacy Policy'}</Link>.</p>
        </article>
      </div>
    </section>
  </>
}
