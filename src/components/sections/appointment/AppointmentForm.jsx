import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
  Stethoscope,
  Clock,
} from 'lucide-react'
import Input from '../../ui/Input'
import Textarea from '../../ui/Textarea'
import Select from '../../ui/Select'
import DatePicker from '../../ui/DatePicker'
import Button from '../../ui/Button'
import { appointmentSchema } from '../../../lib/schemas'
import { serviceOptions } from '../../../data/services'
import { TIME_SLOTS } from '../../../utils/constants'
import { toInputDate } from '../../../utils/formatDate'
 import { createAppointment } from '../../../services/appointmentService'

const timeSlotOptions = TIME_SLOTS.map((t) => ({ label: t, value: t }))

export default function AppointmentForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      service: '',
      preferred_date: '',
      preferred_time: '',
      message: '',
    },
  })

    const today = toInputDate(new Date())

const onSubmit = async (data) => {
  setSubmitting(true)
  try {
    await createAppointment({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      service: data.service,
      preferred_date: data.preferred_date,
      preferred_time: data.preferred_time,
      message: data.message || null,
    })

    toast.success("Appointment requested! We'll confirm shortly.")
    setSubmitted(true)
    reset()
    setTimeout(() => setSubmitted(false), 6000)
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
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-borderLight shadow-large">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-6">
                  <Send className="w-11 h-11 text-green-500" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-secondary mb-3">
                  Appointment Requested!
                </h3>
                <p className="text-textSecondary max-w-md mx-auto">
                  Thank you! Your appointment request has been received. Our team
                  will contact you on WhatsApp or phone within a few hours to confirm
                  your slot.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Section: Personal Info */}
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-secondary text-lg">
                      Your Information
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <Input
                      label="Full Name"
                      placeholder="Enter your name"
                      leftIcon={User}
                      required
                      error={errors.name?.message}
                      {...register('name')}
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="9876543210"
                      leftIcon={Phone}
                      required
                      error={errors.phone?.message}
                      {...register('phone')}
                    />
                  </div>

                  <div className="mt-5">
                    <Input
                      label="Email (Optional)"
                      type="email"
                      placeholder="you@example.com"
                      leftIcon={Mail}
                      error={errors.email?.message}
                      {...register('email')}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-borderLight" />

                {/* Section: Appointment Details */}
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                      <Stethoscope className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-secondary text-lg">
                      Appointment Details
                    </h3>
                  </div>

                  <div>
                    <Select
                      label="Select Service"
                      placeholder="Choose a treatment"
                      options={serviceOptions}
                      required
                      error={errors.service?.message}
                      {...register('service')}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 mt-5">
                    <DatePicker
                      label="Preferred Date"
                      min={today}
                      required
                      error={errors.preferred_date?.message}
                      {...register('preferred_date')}
                    />
                    <Select
                      label="Preferred Time"
                      placeholder="Choose a slot"
                      options={timeSlotOptions}
                      required
                      error={errors.preferred_time?.message}
                      {...register('preferred_time')}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-borderLight" />

                {/* Section: Message */}
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-secondary text-lg">
                      Additional Notes (Optional)
                    </h3>
                  </div>

                  <Textarea
                    placeholder="Briefly describe your concern or any specific requirement..."
                    rows={4}
                    error={errors.message?.message}
                    {...register('message')}
                  />
                </div>

                {/* Note */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-primary-50/50 border border-primary/10">
                  <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs text-textSecondary leading-relaxed">
                    We'll confirm your appointment within a few hours. For urgent
                    consultation, feel free to call us directly.
                  </p>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    loading={submitting}
                    rightIcon={!submitting ? Send : undefined}
                  >
                    {submitting ? 'Booking...' : 'Request Appointment'}
                  </Button>
                </div>
              <p className="text-xs text-textMuted leading-relaxed">We use these details to respond to your request. Please read our <a href="/privacy-policy" className="text-primary underline">Privacy Policy</a> and <a href="/terms" className="text-primary underline">Terms &amp; Conditions</a>. Do not include sensitive medical records in this form.</p>
                </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}