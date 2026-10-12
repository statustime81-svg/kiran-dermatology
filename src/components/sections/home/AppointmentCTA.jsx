import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Phone, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'
import Button from '../../ui/Button'
import { CONTACT_INFO, SITE_INFO } from '../../../utils/constants'

export default function AppointmentCTA() {
  const benefits = [
    'Personalized skin consultation',
    'No waiting — book your slot',
    'Advanced US-FDA treatments',
    'Transparent pricing',
  ]

  return (
    <section className="section relative overflow-hidden bg-gradient-to-b from-primary-50/40 via-white to-primary-50/30">
      {/* Soft blobs */}
      <div className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-32 w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="relative bg-white rounded-3xl shadow-large border border-primary/10 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0 items-stretch">
            {/* LEFT — Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="relative min-h-[280px] lg:min-h-full bg-gradient-to-br from-primary to-primary-600"
            >
              <img
                src="/cta.png"
                alt="Kiran Dermatology Clinic"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => (e.target.style.opacity = 0)}
              />

              <div className="absolute inset-0 bg-gradient-to-br from-primary-700/80 via-primary-600/60 to-primary-500/40" />

              <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 w-fit mb-6"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-xs font-semibold text-white tracking-wider uppercase">
                    4.9★ · 10,000+ Patients
                  </span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="font-heading text-2xl md:text-3xl font-bold text-white leading-tight mb-2"
                >
                  Healthy skin is a reflection of
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="font-heading text-2xl md:text-3xl font-bold text-white/80 italic"
                >
                  overall wellness.
                </motion.p>
              </div>
            </motion.div>

            {/* RIGHT — Content Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="p-8 md:p-10 lg:p-12 flex flex-col justify-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-xs font-semibold text-primary-700 tracking-widest uppercase mb-5 w-fit">
                Book Your Visit
              </span>

              <h2 className="font-heading font-bold text-display-sm md:text-3xl lg:text-4xl text-secondary leading-tight mb-4 text-balance">
                Ready to Transform Your{' '}
                <span className="text-primary">Skin & Hair</span>?
              </h2>

              <p className="text-textSecondary leading-relaxed mb-7 text-base md:text-lg">
                Book a consultation with {SITE_INFO.doctorName} and take the first
                step towards healthy, confident skin.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {benefits.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-textSecondary font-medium">
                      {benefit}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-3 mb-5">
                <Link to="/appointment">
                  <Button size="lg" leftIcon={Calendar} rightIcon={ArrowRight}>
                    Book Appointment
                  </Button>
                </Link>
                <a href={`tel:${CONTACT_INFO.phoneRaw}`}>
                  <Button variant="outline" size="lg" leftIcon={Phone}>
                    Call Now
                  </Button>
                </a>
              </div>

              <p className="text-xs text-textMuted">
                Walk-ins welcome · 11:00 AM – 7:00 PM (Tuesday Closed)
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
