import { SEO_NAME } from './site.js'

// Complete title strings: the SEO component must not append the brand again.
export const PAGE_METADATA = {
  '/': {
    keywords: 'dermatologist in Patna, skin specialist in Patna, Kiran Skin Clinic, Dr Asmita Singh, skin clinic Bailey Road',
    title: 'Dermatologist & Skin Clinic in Patna | Kiran Skin Clinic',
    description: 'Consult Dr. (Major) Asmita Singh at Kiran Skin Clinic, Bailey Road, Patna, for skin, hair and laser concerns. Explore treatments and book a consultation.',
  },
  '/about': {
    keywords: 'Dr Asmita Singh, Dr Major Asmita Singh, dermatologist Patna, Kiran Skin Clinic doctor',
    title: 'Dr. Asmita Singh, Dermatologist in Patna | Kiran Skin Clinic',
    description: 'Meet Dr. (Major) Asmita Singh, dermatologist at Kiran Skin Clinic, Patna. Read about her qualifications, experience and approach to skin and hair care.',
  },
  '/services': {
    keywords: 'skin treatment Patna, hair treatment Patna, laser treatment Patna, acne treatment Patna, dermatology services',
    title: 'Skin, Hair & Laser Treatment in Patna | Kiran Skin Clinic',
    description: 'Explore skin, hair and laser treatments at Kiran Skin Clinic, Patna, including acne, pigmentation and hair loss care. Consult Dr. (Major) Asmita Singh.',
  },
  '/blog': {
    keywords: 'skin care blog, hair care articles, dermatology blog, acne care information',
    title: 'Skin & Hair Care Blog | Kiran Skin Clinic, Patna',
    description: 'Read articles on skin care, hair loss, acne, pigmentation and dermatology from Kiran Skin Clinic, Patna. Explore practical information before your visit.',
  },
  '/contact': {
    keywords: 'Kiran Skin Clinic contact, skin clinic Bailey Road Patna, Dr Asmita Singh clinic location',
    title: 'Contact & Location in Patna | Kiran Skin Clinic',
    description: 'Find Kiran Skin Clinic on Bailey Road, Patna. View contact details, clinic location and visiting information, or send an enquiry about your consultation.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Kiran Skin Clinic, Patna',
    description: 'Learn how Kiran Skin Clinic uses information from website enquiries and appointment requests, manages analytics choices and handles privacy requests.',
    keywords: 'Kiran Skin Clinic privacy policy, Kiran Dermatology privacy, website data privacy',
  },
  '/terms': {
    title: 'Terms & Conditions | Kiran Skin Clinic, Patna',
    description: 'Read the terms for using the Kiran Skin Clinic website, requesting appointments and accessing information about consultations and treatment services.',
    keywords: 'Kiran Skin Clinic terms and conditions, appointment terms, website terms',
  },
  '/appointment': {
    keywords: 'dermatologist appointment Patna, skin consultation Patna, Kiran Skin Clinic booking',
    title: 'Book a Dermatologist Appointment | Kiran Skin Clinic, Patna',
    description: 'Request an appointment with Dr. (Major) Asmita Singh at Kiran Skin Clinic, Patna. Select a preferred date and time; the clinic will confirm availability.',
  },
}

// Optional manual per-slug metadata. These never change visible service/blog copy.
export const SERVICE_META_OVERRIDES = {}
export const BLOG_META_OVERRIDES = {}

export function plainText(value = '') {
  return String(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<').replace(/&gt;/gi, '>')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#*_`~]+/g, '')
    .replace(/\s+/g, ' ').trim()
}

// A readability guideline only; Google has no fixed description character limit.
export function conciseDescription(value, max = 175) {
  const text = plainText(value)
  if (text.length <= max) return text
  const sample = text.slice(0, max - 3)
  const boundary = sample.lastIndexOf(' ')
  return sample.slice(0, boundary > 0 ? boundary : sample.length).replace(/[,:;.!?-]+$/, '') + '...'
}

export function serviceMetadata(service) {
  const override = SERVICE_META_OVERRIDES[service.slug] || {}
  const name = plainText(service.name) || 'Dermatology Consultation'
  const localName = /\bPatna\b/i.test(name) ? name : `${name} in Patna`
  const title = override.title || `${localName} | ${SEO_NAME}`
  const summary = plainText(service.short_description || service.shortDescription || '')
  const description = override.description || (summary ? `${localName} at ${SEO_NAME}. ${summary}` : `${localName} at ${SEO_NAME}. Consult Dr. (Major) Asmita Singh for an assessment and suitable care options. Request an appointment.`)
  return { title: plainText(title), description: conciseDescription(description), keywords: `${name}, ${localName}, Kiran Skin Clinic, Dr Asmita Singh` }
}

export function blogMetadata(blog) {
  const override = BLOG_META_OVERRIDES[blog.slug] || {}
  const topic = plainText(blog.title) || 'Skin & Hair Care'
  const excerpt = plainText(blog.excerpt)
  const content = plainText(blog.content)
  const source = excerpt || content || `Read about ${topic} on the ${SEO_NAME} blog, with information on skin and hair care.`
  const branded = `${source} Read more from ${SEO_NAME}, Patna.`
  return {
    title: plainText(override.title || `${topic} | ${SEO_NAME}`),
    keywords: [...new Set([topic, ...(Array.isArray(blog.tags) ? blog.tags.map(plainText) : []), SEO_NAME])].join(', '),
    description: conciseDescription(override.description || (branded.length <= 175 ? branded : source)),
  }
}
