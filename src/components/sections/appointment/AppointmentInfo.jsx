import { motion } from 'framer-motion'
import { Clock, MapPin, Phone, Info } from 'lucide-react'
import { CONTACT_INFO } from '../../../utils/constants'

const infoCards = [
  {
    icon: Clock,
    title: 'Working Hours',
    lines: [
      'Mon, Wed–Sun: 11:00 AM – 7:00 PM',
      'Tuesday: Closed',
      'All other days open',
    ],
  },
  {
    icon: MapPin,
    title: 'Location',
    lines: [
      CONTACT_INFO.address.line1,
      CONTACT_INFO.address.line2,
      `${CONTACT_INFO.address.city}, ${CONTACT_INFO.address.state}`,
    ],
  },
  {
    icon: Phone,
    title: 'Direct Contact',
    lines: [CONTACT_INFO.phone, CONTACT_INFO.email],
  },
]

export default function AppointmentInfo() {
  return (
    <section className="section bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-xs font-semibold text-primary-700 tracking-widest uppercase mb-4">
            <Info className="w-3.5 h-3.5" />
            Before You Visit
          </span>
          <h2 className="font-heading font-bold text-display-sm text-secondary mb-4 text-balance">
            Important Information
          </h2>
        </motion.div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {infoCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white rounded-2xl p-6 border border-borderLight hover:border-primary/30 hover:shadow-large transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center mb-5 group-hover:from-primary group-hover:to-primary-600 transition-all duration-500">
                <card.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-500" />
              </div>

              <h3 className="font-heading font-semibold text-secondary text-lg mb-3">
                {card.title}
              </h3>

              <div className="space-y-1">
                {card.lines.map((line, j) => (
                  <p key={j} className="text-sm text-textSecondary leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Checklist before visit */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-br from-primary-50/60 to-accent-50/40 rounded-3xl p-6 md:p-8 border border-primary/10">
            <h3 className="font-heading font-semibold text-secondary text-xl mb-5 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Tips for Your Visit
            </h3>

            <ul className="grid md:grid-cols-2 gap-x-6 gap-y-3">
              {[
                'Carry any previous prescriptions or reports',
                'Avoid applying makeup before consultation',
                'List your current medications',
                'Come with a list of your concerns',
                'Note down any allergies',
                'Bring insurance card if applicable',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-textSecondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
