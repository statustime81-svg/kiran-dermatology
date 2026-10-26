import { Link } from 'react-router-dom'
import SEO from '../../components/shared/SEO'
import { PAGE_METADATA } from '../../seo/metadata'
import { useServices } from '../../hooks/useServices'
import { useBlogs } from '../../hooks/useBlogs'

const names = {
  '/': 'Home', '/about': 'About the Doctor', '/services': 'All Services',
  '/blog': 'All Articles', '/contact': 'Contact & Location',
  '/appointment': 'Book an Appointment', '/privacy-policy': 'Privacy Policy',
  '/terms': 'Terms & Conditions', '/sitemap': 'Sitemap',
}
const linkClass = 'text-primary hover:underline focus-visible:underline break-words'

function PageList({ items, loading, error, retry, emptyText }) {
  if (loading && !items.length) return <p role="status" className="text-textMuted">Loading links...</p>
  if (error && !items.length) return <div className="text-textSecondary">
    <p>These links could not be loaded. Please try again.</p>
    <button type="button" onClick={retry} className={`${linkClass} mt-2`}>Retry</button>
  </div>
  if (!items.length) return <p className="text-textMuted">{emptyText}</p>
  return <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 list-disc pl-5">
    {items.map(({ path, label }) => <li key={path}><Link className={linkClass} to={path}>{label}</Link></li>)}
  </ul>
}

export default function SitemapPage() {
  const { services, loading: servicesLoading, error: servicesError, refetch: retryServices } = useServices()
  const { blogs, loading: blogsLoading, error: blogsError, refetch: retryBlogs } = useBlogs(true)
  const mainPages = Object.keys(PAGE_METADATA).map(path => ({ path, label: names[path] || PAGE_METADATA[path].title.split(' | ')[0] }))
  const servicePages = services.filter(item => item.slug).map(item => ({ path: `/services/${item.slug}`, label: item.name }))
  const articlePages = blogs.filter(item => item.published && item.slug).map(item => ({ path: `/blog/${item.slug}`, label: item.title }))
  return <>
    <SEO />
    <section className="pt-36 pb-20 bg-background">
      <div className="container-custom">
        <nav aria-label="Breadcrumb" className="text-sm text-textMuted mb-6">
          <Link to="/" className={linkClass}>Home</Link><span className="mx-2">/</span><span>Sitemap</span>
        </nav>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">Sitemap</h1>
        <p className="text-textSecondary max-w-2xl mb-10">Find clinic information, explore our services and browse published skin and hair care articles.</p>
        <div className="space-y-8">
          <section aria-labelledby="sitemap-main" className="rounded-2xl border border-borderLight bg-white p-6 md:p-8">
            <h2 id="sitemap-main" className="font-heading text-2xl font-semibold text-secondary mb-5">Website Pages</h2>
            <PageList items={mainPages} />
          </section>
          <section aria-labelledby="sitemap-services" className="rounded-2xl border border-borderLight bg-white p-6 md:p-8">
            <h2 id="sitemap-services" className="font-heading text-2xl font-semibold text-secondary mb-5">Our Services</h2>
            <PageList items={servicePages} loading={servicesLoading} error={servicesError} retry={retryServices} emptyText="No service pages are currently available." />
          </section>
          <section aria-labelledby="sitemap-articles" className="rounded-2xl border border-borderLight bg-white p-6 md:p-8">
            <h2 id="sitemap-articles" className="font-heading text-2xl font-semibold text-secondary mb-5">Published Articles</h2>
            <PageList items={articlePages} loading={blogsLoading} error={blogsError} retry={retryBlogs} emptyText="No articles have been published yet." />
          </section>
          <section aria-labelledby="sitemap-resources" className="rounded-2xl border border-borderLight bg-white p-6 md:p-8">
            <h2 id="sitemap-resources" className="font-heading text-2xl font-semibold text-secondary mb-5">Sitemap &amp; Text Resources</h2>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              <li><a className={linkClass} href="/sitemap.xml">XML Sitemap</a></li>
              <li><a className={linkClass} href="/llms.txt">LLM Page Index (llms.txt)</a></li>
              <li><a className={linkClass} href="/llms-full.txt">Public Text Snapshot (llms-full.txt)</a></li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  </>
}
