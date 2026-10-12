import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Calendar,
  Mail,
  Stethoscope,
  BookOpen,

  ArrowUpRight,
  Clock,
  TrendingUp,
} from 'lucide-react'
import { supabase } from '../../lib/supabase'
import Loader from '../../components/ui/Loader'
import { formatDateTime } from '../../utils/formatDate'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    appointments: 0,
    pendingAppointments: 0,
    contacts: 0,
    newContacts: 0,
    services: 0,
    blogs: 0,
    testimonials: 0,
    gallery: 0,
  })
  const [recentAppointments, setRecentAppointments] = useState([])
  const [recentContacts, setRecentContacts] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch counts
      const [
        appointmentsRes,
        pendingRes,
        contactsRes,
        newContactsRes,
        servicesRes,
        blogsRes,
    
        recentApptRes,
        recentContactsRes,
      ] = await Promise.all([
        supabase.from('appointments').select('*', { count: 'exact', head: true }),
        supabase
          .from('appointments')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending'),
        supabase.from('contacts').select('*', { count: 'exact', head: true }),
        supabase
          .from('contacts')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'new'),
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('blogs').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
        supabase.from('gallery').select('*', { count: 'exact', head: true }),
        supabase
          .from('appointments')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('contacts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5),
      ])

      setStats({
        appointments: appointmentsRes.count || 0,
        pendingAppointments: pendingRes.count || 0,
        contacts: contactsRes.count || 0,
        newContacts: newContactsRes.count || 0,
        services: servicesRes.count || 0,
        blogs: blogsRes.count || 0,
  
      })

      setRecentAppointments(recentApptRes.data || [])
      setRecentContacts(recentContactsRes.data || [])
    } catch (error) {
      console.error('Dashboard fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader size="lg" text="Loading dashboard..." />
      </div>
    )
  }

  const statCards = [
    {
      label: 'Total Appointments',
      value: stats.appointments,
      sub: `${stats.pendingAppointments} pending`,
      icon: Calendar,
      color: 'primary',
      link: '/admin/appointments',
    },
    {
      label: 'Contact Messages',
      value: stats.contacts,
      sub: `${stats.newContacts} new`,
      icon: Mail,
      color: 'accent',
      link: '/admin/contacts',
    },
    {
      label: 'Services',
      value: stats.services,
      sub: 'Active services',
      icon: Stethoscope,
      color: 'primary',
      link: '/admin/services',
    },
    {
      label: 'Blog Posts',
      value: stats.blogs,
      sub: 'Published articles',
      icon: BookOpen,
      color: 'accent',
      link: '/admin/blogs',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading font-bold text-2xl md:text-3xl text-slate-800 mb-1">
          Dashboard
        </h1>
        <p className="text-slate-500 text-sm">
          Overview of your clinic's activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Link
              to={card.link}
              className="group block bg-white rounded-2xl p-6 border border-slate-200 hover:border-primary/40 hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    card.color === 'primary'
                      ? 'bg-primary-50 text-primary'
                      : 'bg-accent-50 text-accent-600'
                  }`}
                >
                  <card.icon className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <p className="text-3xl font-heading font-bold text-slate-800 mb-1">
                {card.value}
              </p>
              <p className="text-sm font-medium text-slate-600 mb-0.5">
                {card.label}
              </p>
              <p className="text-xs text-slate-400">{card.sub}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[

        
          { icon: Clock, label: 'Pending', value: stats.pendingAppointments },
          { icon: Mail, label: 'New Messages', value: stats.newContacts },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.32 + i * 0.06 }}
            className="bg-white rounded-xl p-4 border border-slate-200 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
              <item.icon className="w-5 h-5 text-slate-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-heading font-bold text-slate-800">
                {item.value}
              </p>
              <p className="text-xs text-slate-500 truncate">{item.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="font-heading font-semibold text-slate-800">
                Recent Appointments
              </h3>
            </div>
            <Link
              to="/admin/appointments"
              className="text-xs font-medium text-primary hover:text-primary-600 flex items-center gap-1"
            >
              View All
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentAppointments.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-slate-400">No appointments yet</p>
              </div>
            ) : (
              recentAppointments.map((apt) => (
                <div key={apt.id} className="px-6 py-3.5 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {apt.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {apt.service} · {apt.preferred_date} {apt.preferred_time}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                        apt.status === 'pending'
                          ? 'bg-amber-50 text-amber-700'
                          : apt.status === 'confirmed'
                          ? 'bg-green-50 text-green-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Recent Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <Mail className="w-5 h-5 text-accent" />
              <h3 className="font-heading font-semibold text-slate-800">
                Recent Messages
              </h3>
            </div>
            <Link
              to="/admin/contacts"
              className="text-xs font-medium text-primary hover:text-primary-600 flex items-center gap-1"
            >
              View All
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentContacts.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-slate-400">No messages yet</p>
              </div>
            ) : (
              recentContacts.map((contact) => (
                <div key={contact.id} className="px-6 py-3.5 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {contact.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {contact.subject}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                        contact.status === 'new'
                          ? 'bg-blue-50 text-blue-700'
                          : contact.status === 'read'
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-green-50 text-green-700'
                      }`}
                    >
                      {contact.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
