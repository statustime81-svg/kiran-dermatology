import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Send, User, Mail, Phone, MessageSquare, Tag } from 'lucide-react'
import Input from '../../ui/Input'
import Textarea from '../../ui/Textarea'
import Button from '../../ui/Button'
import { contactSchema } from '../../../lib/schemas'
import { createContact } from '../../../services/contactService'

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)





  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  })

 const onSubmit = async (data) => {
  setSubmitting(true)
  try {
    await createContact({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    })

    toast.success("Message sent! We'll get back to you soon.")
    setSubmitted(true)
    reset()
    setTimeout(() => setSubmitted(false), 5000)
  } catch (error) {
    console.error(error)
    toast.error('Something went wrong. Please try again.')
  } finally {
    setSubmitting(false)
  }
}

  return (
    <section className="section bg-gradient-to-b from-primary-50/30 to-background relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* LEFT — Heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-xs font-semibold text-primary-700 tracking-widest uppercase mb-5">
              Send Message
            </span>

            <h2 className="font-heading font-bold text-display-sm md:text-display-md text-secondary mb-5 text-balance">
              Have a Question? Write to Us
            </h2>

            <p className="text-textSecondary leading-relaxed text-lg mb-8">
              Whether it's a query about a treatment, an appointment request, or
              general feedback — we read every message and respond personally.
            </p>

            {/* Checklist */}
            <ul className="space-y-4">
              {[
                'Response within 24 hours',
                'Your information stays private',
                'Direct reply from our team',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-textSecondary">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-borderLight shadow-large">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-5">
                    <Send className="w-9 h-9 text-green-500" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-secondary mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-textSecondary">
                    Thank you for reaching out. We'll respond within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Name + Email row */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <Input
                      label="Full Name"
                      placeholder="Enter your full name"
                      leftIcon={User}
                      required
                      error={errors.name?.message}
                      {...register('name')}
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="you@example.com"
                      leftIcon={Mail}
                      required
                      error={errors.email?.message}
                      {...register('email')}
                    />
                  </div>

                  {/* Phone + Subject row */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <Input
                      label="Phone"
                      type="tel"
                      placeholder="9876543210"
                      leftIcon={Phone}
                      required
                      error={errors.phone?.message}
                      {...register('phone')}
                    />
                    <Input
                      label="Subject"
                      placeholder="What is this about?"
                      leftIcon={Tag}
                      required
                      error={errors.subject?.message}
                      {...register('subject')}
                    />
                  </div>

                  {/* Message */}
                  <Textarea
                    label="Message"
                    placeholder="Type your message here..."
                    rows={6}
                    required
                    error={errors.message?.message}
                    {...register('message')}
                  />

                  {/* Submit */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      fullWidth
                      loading={submitting}
                      rightIcon={!submitting ? Send : undefined}
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                <p className="text-xs text-textMuted leading-relaxed">We use these details to respond to your request. Please read our <a href="/privacy-policy" className="text-primary underline">Privacy Policy</a> and <a href="/terms" className="text-primary underline">Terms &amp; Conditions</a>. Do not include sensitive medical records in this form.</p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}