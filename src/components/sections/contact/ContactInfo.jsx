import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  ArrowUpRight,
  Sparkles,
  MessageCircle,
} from 'lucide-react'
import { CONTACT_INFO, SOCIAL_LINKS } from '../../../utils/constants'

/* ============================================
   Custom SVG Icons — Twitter (X) & Threads
   ============================================ */

const TwitterIcon = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const ThreadsIcon = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" />
  </svg>
)

/* ============================================
   Social Icons Mapping
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
  twitter: 'Twitter / X',
  threads: 'Threads',
}

const socialBrandColors = {
  facebook: 'hover:bg-[#1877F2] hover:border-[#1877F2]',
  instagram:
    'hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCAF45] hover:border-transparent',
  twitter: 'hover:bg-black hover:border-black',
  threads: 'hover:bg-black hover:border-black',
}

/* ============================================
   Contact Cards Data
   ============================================ */

const contactCards = [
  {
    icon: Phone,
    label: 'Phone',
    value: CONTACT_INFO.phone,
    link: `tel:${CONTACT_INFO.phoneRaw}`,
    hint: 'Open all days except Tuesday',
    color: 'primary',
  },
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT_INFO.email,
    link: `mailto:${CONTACT_INFO.email}`,
    hint: 'We reply within 24 hours',
    color: 'amber',
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    value: `${CONTACT_INFO.address.line1}, ${CONTACT_INFO.address.line2}, ${CONTACT_INFO.address.city}`,
    link: `https://maps.google.com/?q=${encodeURIComponent(
      `${CONTACT_INFO.address.line1}, ${CONTACT_INFO.address.line2}, ${CONTACT_INFO.address.city}`
    )}`,
    hint: 'Get directions on Google Maps',
    color: 'blue',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: '11:00 AM – 7:00 PM',
    hint: 'Tuesday Closed · Open all other days',
    noLink: true,
    color: 'emerald',
  },
]

const colorMap = {
  primary: {
    icon: 'bg-primary-50 text-primary',
    iconHover: 'group-hover:bg-primary group-hover:text-white',
    accent: 'bg-primary/10',
  },
  amber: {
    icon: 'bg-amber-50 text-amber-600',
    iconHover: 'group-hover:bg-amber-500 group-hover:text-white',
    accent: 'bg-amber-500/10',
  },
  blue: {
    icon: 'bg-blue-50 text-blue-600',
    iconHover: 'group-hover:bg-blue-500 group-hover:text-white',
    accent: 'bg-blue-500/10',
  },
  emerald: {
    icon: 'bg-emerald-50 text-emerald-600',
    iconHover: 'group-hover:bg-emerald-500 group-hover:text-white',
    accent: 'bg-emerald-500/10',
  },
}

/* ============================================
   Component
   ============================================ */

export default function ContactInfo() {
  return (
    <section className="section bg-gradient-to-b from-white via-primary-50/20 to-white relative overflow-hidden">
      {/* Soft blobs */}
      <div className="absolute top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-xs font-semibold text-primary-700 tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Reach Out
          </span>
          <h2 className="font-heading font-bold text-display-sm md:text-display-md text-secondary mb-4 text-balance">
            Get In Touch With Us
          </h2>
          <p className="text-textSecondary text-lg">
            Multiple ways to reach us — choose whatever works best for you.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16 max-w-5xl mx-auto">
          {contactCards.map((card, i) => {
            const CardWrapper = card.noLink ? 'div' : 'a'
            const wrapperProps = card.noLink
              ? {}
              : {
                  href: card.link,
                  target: card.link?.startsWith('http') ? '_blank' : undefined,
                  rel: card.link?.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined,
                }
            const colors = colorMap[card.color]

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <CardWrapper
                  {...wrapperProps}
                  className="group relative flex items-start gap-5 bg-white rounded-2xl p-6 border border-borderLight hover:border-primary/30 hover:shadow-large transition-all duration-500 hover:-translate-y-1.5 cursor-pointer h-full overflow-hidden"
                >
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 rounded-full -mr-8 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${colors.accent}`}
                  />

                  <div
                    className={`relative w-14 h-14 rounded-2xl ${colors.icon} ${colors.iconHover} flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
                  >
                    <card.icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1 min-w-0 relative z-10">
                    <p className="text-[10px] font-bold text-textMuted uppercase tracking-widest mb-2">
                      {card.label}
                    </p>
                    <p className="text-secondary font-semibold leading-snug mb-2 break-words text-base">
                      {card.value}
                    </p>
                    <p className="text-xs text-textMuted leading-relaxed">
                      {card.hint}
                    </p>
                  </div>

                  {!card.noLink && (
                    <ArrowUpRight className="relative z-10 w-5 h-5 text-textMuted group-hover:text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0 mt-1" />
                  )}
                </CardWrapper>
              </motion.div>
            )
          })}
        </div>

        {/* ============================================
            Social Links
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 rounded-3xl p-8 md:p-10 border border-primary/15 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-primary/20 shadow-soft mb-5">
                <MessageCircle className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-bold text-primary-700 uppercase tracking-widest">
                  Connect With Us
                </span>
              </div>

              <h3 className="font-heading font-bold text-2xl md:text-3xl text-secondary mb-3">
                Follow Us On Social Media
              </h3>
              <p className="text-sm text-textSecondary leading-relaxed mb-8 max-w-md mx-auto">
                Stay updated with skin care tips, patient stories, and clinic
                news.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto">
                {['facebook', 'instagram', 'twitter', 'threads'].map((key) => {
                  const Icon = socialIcons[key]
                  const url = SOCIAL_LINKS[key]

                  if (!Icon || !url) return null

                  return (
                    <motion.a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.06, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group flex flex-col items-center justify-center gap-2 px-4 py-5 rounded-2xl bg-white border-2 border-borderLight text-secondary font-medium transition-all duration-300 hover:text-white hover:shadow-large ${socialBrandColors[key]}`}
                      aria-label={socialLabels[key]}
                      title={socialLabels[key]}
                    >
                      <Icon className="w-7 h-7" />
                      <span className="text-xs font-semibold">
                        {socialLabels[key]}
                      </span>
                    </motion.a>
                  )
                })}
              </div>

              <p className="text-xs text-textMuted mt-6 flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Active on all platforms · Respond within hours
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
