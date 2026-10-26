import { useParams } from 'react-router-dom'
import SEO from '../../components/shared/SEO'
import { serviceMetadata } from '../../seo/metadata'
import ServiceDetailHero from '../../components/sections/services/ServiceDetailHero'
import ServiceOverview from '../../components/sections/services/ServiceOverview'
import ServiceProcedure from '../../components/sections/services/ServiceProcedure'
import ServiceFAQ from '../../components/sections/services/ServiceFAQ'
import RelatedServices from '../../components/sections/services/RelatedServices'
import AppointmentCTA from '../../components/sections/home/AppointmentCTA'
import Loader from '../../components/ui/Loader'
import { useService } from '../../hooks/useServices'
import NotFound from '../../components/shared/NotFound'
import { canonicalUrl, clinic, breadcrumbSchema } from '../../seo/site'

export default function ServiceDetail() {
  const { slug } = useParams()
  const { service, loading, error } = useService(slug)

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center pt-32">
        <Loader size="lg" text="Loading service..." />
      </div>
    )
  }

  if (error || !service) {
    return <NotFound />
  }

  const metadata = serviceMetadata(service)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': `${canonicalUrl(`/services/${slug}`)}#treatment`,
    url: canonicalUrl(`/services/${slug}`),
    name: service.name,
    description: service.short_description || service.shortDescription,
    about: { '@id': clinic['@id'] },
  }

  return (
    <>
      <SEO
        title={metadata.title}
        description={metadata.description}
        keywords={metadata.keywords}
        breadcrumbs={breadcrumbSchema([['Home', '/'], ['Services', '/services'], [service.name, `/services/${slug}`]])}
        schema={schema}
      />

      <ServiceDetailHero service={service} />
      <ServiceOverview service={service} />
      <ServiceProcedure service={service} />
      <ServiceFAQ service={service} />
      <RelatedServices currentService={service} />
      <AppointmentCTA />
    </>
  )
}