import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { useSnapshot } from '../../seo/SnapshotContext'
import { PAGE_METADATA, plainText, conciseDescription } from '../../seo/metadata'
import { SEO_NAME, absoluteUrl, canonicalUrl, pageGraph } from '../../seo/site'

export default function SEO({ title, description, keywords, image = '/hero-image.png',
  url, type = 'website', noindex = false, schema = null, breadcrumbs = null }) {
  const snapshot = useSnapshot()
  const preventIndexing = noindex || snapshot?.previewOnly
  const { pathname } = useLocation()
  const configured = PAGE_METADATA[pathname.replace(/\/+$/, '') || '/']
  const fullTitle = configured?.title || (title ? (title.includes(SEO_NAME) ? plainText(title) : `${plainText(title)} | ${SEO_NAME}`) : PAGE_METADATA['/'].title)
  const metaDescription = conciseDescription(configured?.description || description || PAGE_METADATA['/'].description)
  const metaKeywords = configured?.keywords || keywords
  const metaUrl = canonicalUrl(url || pathname)
  const metaImage = absoluteUrl(image || '/hero-image.png')
  const schemas = [pageGraph(metaUrl, fullTitle), ...(schema ? [schema] : []), ...(breadcrumbs ? [breadcrumbs] : [])]
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      <meta name="robots" content={preventIndexing ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
      <link rel="canonical" href={metaUrl} />
      <link rel="describedby" type="text/plain" href="/llms.txt" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:alt" content={title || SEO_NAME} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:site_name" content={SEO_NAME} />
      <meta property="og:locale" content="en_IN" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      {schemas.map((value, index) => (
        <script key={index} type="application/ld+json">{JSON.stringify(value).replace(/</g, '\\u003c')}</script>
      ))}
    </Helmet>
  )
}
