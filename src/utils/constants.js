export const SITE_INFO = {
  name: 'Kiran Dermatology',
  tagline: 'Healthy skin is a reflection of overall wellness',
  doctorName: 'Dr. (Major) Asmita Singh',
  doctorTitle: 'MBBS, MD (Dermatology)',
  description: 'Expert dermatology care for skin, hair, and laser treatments by Dr. Asmita Singh in Patna.',
  url: 'https://kirandermatology.com',
}

export const CONTACT_INFO = {
  phone: '+91-8595749644',
  phoneRaw: '918595749644',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '918595749644',
  email: 'asmita.hi@gmail.com',
  address: {
    line1: 'Jalalpur Complex',
    line2: 'Bailey Road',
    city: 'Patna',
    state: 'Bihar',
    country: 'India',
    pincode: '800001',
  },
  hours: {
    weekdays: '10:00 AM – 7:00 PM',
    saturday: '10:00 AM – 5:00 PM',
    sunday: 'Closed',
  },
}


export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/kiranskinclinicpatna/',
  instagram: 'https://www.instagram.com/kiranskinclinicpatna?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==',
  twitter: 'https://x.com/kirandermatolog',
  threads: 'https://www.threads.com/@kiranskinclinicpatna',
}

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },

  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
]

export const ADMIN_NAV_LINKS = [
  { name: 'Dashboard', path: '/admin', icon: 'LayoutDashboard' },
  { name: 'Appointments', path: '/admin/appointments', icon: 'Calendar' },
  { name: 'Contacts', path: '/admin/contacts', icon: 'Mail' },
]

export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
}

export const CONTACT_STATUS = {
  NEW: 'new',
  READ: 'read',
  REPLIED: 'replied',
}

export const TIME_SLOTS = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM',
]

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  SERVICE_DETAIL: '/services/:slug',
  BLOG: '/blog',
  BLOG_DETAIL: '/blog/:slug',
  CONTACT: '/contact',
  APPOINTMENT: '/appointment',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_APPOINTMENTS: '/admin/appointments',
  ADMIN_CONTACTS: '/admin/contacts',
}
