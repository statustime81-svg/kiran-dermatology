import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Phone, Star, Sparkles, ShieldCheck, Award } from 'lucide-react'
import Button from '../../ui/Button'
import { SITE_INFO, CONTACT_INFO } from '../../../utils/constants'
import doctor from '../../../data/doctor'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-gradient-to-b from-primary-50/40 via-background to-background">
      {/* Decorative blobs — soft green glow */}
      <div className="absolute top-20 -left-32 w-[500px] h-[500px] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute top-40 -right-32 w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — Content */}
          <div>
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-soft border border-borderLight mb-7"
            >
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-accent text-accent"
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-secondary">
                Trusted by 10,000+ patients
              </span>
            </motion.div>

            {/* Heading — word by word reveal */}
            <h1 className="font-heading font-bold text-display-sm md:text-display-md lg:text-[4.25rem] leading-[1.05] text-secondary mb-6">
              {['Healthy', 'skin', 'is', 'a', 'reflection', 'of'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + i * 0.08,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="inline-block mr-2"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: 0.75, ease: [0.4, 0, 0.2, 1] }}
                className="inline-block text-gradient"
                style={{ transformStyle: 'preserve-3d' }}
              >
                overall wellness
              </motion.span>
            </h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-lg text-textSecondary leading-relaxed mb-8 max-w-xl"
            >
              Expert dermatology care by{' '}
              <span className="font-semibold text-secondary">
                {doctor.name}
              </span>{' '}
              — advanced treatments for skin, hair & laser concerns in Patna.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.05 }}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <Link to="/appointment">
                <Button size="lg" leftIcon={Calendar}>
                  Book Appointment
                </Button>
              </Link>
              <a href={`tel:${CONTACT_INFO.phoneRaw}`}>
                <Button variant="outline" size="lg" leftIcon={Phone}>
                  Call Now
                </Button>
              </a>
            </motion.div>

            {/* Trust points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
            >
              {[
                { icon: ShieldCheck, text: 'US-FDA Approved' },
                { icon: Award, text: '14+ Years Experience' },
                { icon: Sparkles, text: '10000+ Happy Patients' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium text-secondary">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            {/* Main image container */}
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:max-w-none rounded-3xl overflow-hidden shadow-large">
              {/* Gradient bg fallback */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-primary-50 to-primary-100" />

              {/* Doctor image */}
              <img
                src={doctor.image}
                  fetchPriority="high"
                  decoding="async"
                alt={doctor.name}
                className="relative w-full h-full object-cover object-top"
                onError={(e) => (e.target.style.opacity = 0)}
              />

              {/* Bottom gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-secondary/70 via-secondary/20 to-transparent" />

              {/* Name plate */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="glass rounded-2xl px-5 py-3.5 shadow-medium">
                  <p className="font-heading font-semibold text-secondary text-base md:text-lg leading-tight">
                    {doctor.name}
                  </p>
                  <p className="text-xs text-textSecondary mt-0.5">
                    {doctor.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Floating card 1 — Rating */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="absolute top-8 -left-4 md:-left-8 bg-white rounded-2xl p-4 shadow-large border border-borderLight anim-float-slow"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-accent-50 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 fill-accent text-accent" />
                </div>
                <div>
                  <p className="font-heading font-bold text-secondary text-lg leading-none">
                    4.9
                  </p>
                  <p className="text-[10px] text-textMuted font-medium uppercase tracking-wider mt-1">
                    Patient Rating
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating card 2 — Experience */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 1.3 }}
              className="absolute -bottom-6 -right-4 md:-right-8 bg-white rounded-2xl p-4 shadow-large border border-borderLight anim-float-medium"
              style={{ animationDelay: '1s' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-heading font-bold text-secondary text-lg leading-none">
                    14+
                  </p>
                  <p className="text-[10px] text-textMuted font-medium uppercase tracking-wider mt-1">
                    Years Experience
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Decorative circle */}
            <div className="absolute -z-10 -top-6 -right-6 w-32 h-32 rounded-full border-2 border-dashed border-primary/30 anim-rotate-slow" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-textMuted font-medium uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  )
}