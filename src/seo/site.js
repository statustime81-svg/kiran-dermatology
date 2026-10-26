export const SEO_ORIGIN = 'https://www.kirandermatology.com'
export const SEO_NAME = 'Kiran Skin Clinic'
export const absoluteUrl = (value = '/') => new URL(value, `${SEO_ORIGIN}/`).href
export const canonicalUrl = (pathname = '/') => {
  const url = new URL(pathname, SEO_ORIGIN)
  const path = url.pathname.replace(/\/+$/, '') || '/'
  return `${SEO_ORIGIN}${path}`
}
export const clinic = {
  '@type': 'MedicalClinic', '@id': `${SEO_ORIGIN}/#clinic`,
  name: SEO_NAME, alternateName: 'Kiran Dermatology', url: `${SEO_ORIGIN}/`,
  medicalSpecialty: 'https://schema.org/Dermatology',
  image: absoluteUrl('/hero-image.png'), logo: absoluteUrl('/logopng.png'),
  telephone: '+91-8595749644', email: 'asmita.hi@gmail.com',
  address: { '@type': 'PostalAddress', streetAddress: 'Jalalpur Complex, Bailey Road',
    addressLocality: 'Patna', addressRegion: 'Bihar', addressCountry: 'IN' },
}
export const doctor = {
  '@type': 'Person', '@id': `${SEO_ORIGIN}/about#doctor`,
  name: 'Dr. (Major) Asmita Singh', url: absoluteUrl('/about'),
  image: absoluteUrl('/hero-image.png'), jobTitle: 'Dermatologist',
  worksFor: { '@id': clinic['@id'] },
}
export function pageGraph(url, title, type = 'WebPage') {
  return { '@context': 'https://schema.org', '@graph': [clinic, doctor, {
    '@type': type, '@id': `${url}#webpage`, url, name: title,
    isPartOf: { '@id': `${SEO_ORIGIN}/#website` },
    about: { '@id': clinic['@id'] },
  }, { '@type': 'WebSite', '@id': `${SEO_ORIGIN}/#website`, name: SEO_NAME, url: `${SEO_ORIGIN}/` }] }
}
export function breadcrumbSchema(items) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1,
      name, item: canonicalUrl(path) })) }
}
