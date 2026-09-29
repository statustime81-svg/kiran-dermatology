import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'
import {
  SITE_INFO,
  CONTACT_INFO,
  SOCIAL_LINKS,
  NAV_LINKS,
} from '../../../utils/constants'

/* ============================================
   Custom SVG Icons — Twitter (X) & Threads
   ============================================ */

const TwitterIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const ThreadsIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" />
  </svg>
)

/* ============================================
   Social icons mapping
   ============================================ */

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: TwitterIcon,
  threads: ThreadsIcon,
}

const socialLabels = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  twitter: 'Twitter',
  threads: 'Threads',
}

const socialBrandColors = {
  facebook: 'hover:bg-[#1877F2] hover:border-[#1877F2]',
  instagram:
    'hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCAF45] hover:border-transparent',
  twitter: 'hover:bg-black hover:border-black',
  threads: 'hover:bg-black hover:border-black',
}

const services = [
  'Acne & Scar Treatment',
  'Hair Fall & Hair Transplant',
  'Laser Treatments',
  'Pigmentation & Melasma',
  'Skin Allergy & Eczema',
  'Nail & Hair Disorders',
]

export default function Footer() {
  const [logoError, setLogoError] = useState(false)
  const [devLogoError, setDevLogoError] = useState(false)
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-footer text-white/80 pt-16 md:pt-20 pb-8 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/15 blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* ============================================
              Column 1 — Brand + Logo + Social
              ============================================ */}
          <div>
            <Link to="/" className="inline-block mb-5 group">
              {!logoError ? (
                <img
                  src="/logopng.png"
                  alt={SITE_INFO.name}
                  className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="font-heading text-white text-2xl font-bold">
                      K
                    </span>
                  </div>
                  <div className="leading-tight">
                    <p className="font-heading font-bold text-white text-xl">
                      Kiran
                    </p>
                    <p className="text-[10px] text-white/60 font-medium tracking-[0.2em] uppercase">
                      Dermatology
                    </p>
                  </div>
                </div>
              )}
            </Link>

            <p className="text-sm leading-relaxed mb-6 text-white/70">
              {SITE_INFO.description}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              {['facebook', 'instagram', 'twitter', 'threads'].map((key) => {
                const Icon = socialIcons[key]
                const url = SOCIAL_LINKS[key]
                if (!Icon || !url) return null

                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-large ${socialBrandColors[key]}`}
                    aria-label={socialLabels[key]}
                    title={socialLabels[key]}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* ============================================
              Column 2 — Quick Links
              ============================================ */}
          <div>
            <h3 className="font-heading text-white text-lg font-semibold mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-2 text-sm text-white/70 hover:text-primary transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/appointment"
                  className="group inline-flex items-center gap-2 text-sm text-accent hover:text-accent-400 font-medium transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* ============================================
              Column 3 — Services
              ============================================ */}
          <div>
            <h3 className="font-heading text-white text-lg font-semibold mb-5">
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-sm text-white/70 hover:text-primary transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ============================================
              Column 4 — Contact
              ============================================ */}
          <div>
            <h3 className="font-heading text-white text-lg font-semibold mb-5">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phoneRaw}`}
                  className="flex items-start gap-3 text-sm text-white/70 hover:text-primary transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-primary flex items-center justify-center shrink-0 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">
                      Phone
                    </p>
                    <span className="font-medium text-white">
                      {CONTACT_INFO.phone}
                    </span>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-start gap-3 text-sm text-white/70 hover:text-primary transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-primary flex items-center justify-center shrink-0 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">
                      Email
                    </p>
                    <span className="font-medium text-white break-all">
                      {CONTACT_INFO.email}
                    </span>
                  </div>
                </a>
              </li>

              <li>
                <div className="flex items-start gap-3 text-sm text-white/70">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">
                      Address
                    </p>
                    <span className="text-white/90 leading-relaxed">
                      {CONTACT_INFO.address.line1}, {CONTACT_INFO.address.line2},{' '}
                      {CONTACT_INFO.address.city}, {CONTACT_INFO.address.state}
                    </span>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex items-start gap-3 text-sm text-white/70">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">
                      Hours
                    </p>
                    <span className="text-white/90">
                      Mon–Fri: {CONTACT_INFO.hours.weekdays}
                    </span>
                    <br />
                    <span className="text-white/90">
                      Sat: {CONTACT_INFO.hours.saturday}
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ============================================
            Bottom Bar
            ============================================ */}
        <div className="pt-6 border-t border-white/10 flex flex-col items-center gap-5">
          {/* Copyright + Links row */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p className="text-center md:text-left">
              © {currentYear} {SITE_INFO.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link
                to="/privacy-policy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* ============================================
              Design & Developed By — Centered Badge
              ============================================ */}
          <a
            href="https://www.nexovax.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 md:gap-4 pl-1.5 md:pl-2 pr-4 md:pr-5 py-1.5 md:py-2 bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 hover:border-primary/40 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-large"
            aria-label="Design and Developed by Nexova X"
          >
            {/* Logo */}
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-soft">
              {!devLogoError ? (
                <img
                  src="/nexova.png"
                  alt="Nexova X"
                  className="w-full h-full object-contain p-0.5"
                  onError={() => setDevLogoError(true)}
                />
              ) : (
                /* Fallback — letter N */
                <span className="font-heading font-bold text-primary text-lg">
                  N
                </span>
              )}
            </div>

            {/* Text */}
            <div className="flex flex-col leading-tight">
              <span className="text-[9px] md:text-[10px] font-medium tracking-[0.18em] uppercase text-white/50">
                Design & Developed By
              </span>
              <span className="font-heading font-bold text-white group-hover:text-primary text-sm md:text-base leading-tight transition-colors">
                Nexova X
              </span>
            </div>

            {/* External link arrow */}
            <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-primary transition-colors ml-1" />
          </a>
        </div>
      </div>
    </footer>
  )
}
