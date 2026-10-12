import { NavLink, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Calendar,
  Mail,
  Stethoscope,
  BookOpen,

  ExternalLink,
  LogOut,
  X,
} from 'lucide-react'
import { cn } from '../../../utils/cn'
import { SITE_INFO } from '../../../utils/constants'
import { useAuth } from '../../../context/AuthContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
  { name: 'Appointments', path: '/admin/appointments', icon: Calendar },
  { name: 'Contacts', path: '/admin/contacts', icon: Mail },
  { name: 'Services', path: '/admin/services', icon: Stethoscope },
  { name: 'Blogs', path: '/admin/blogs', icon: BookOpen },
 
]

export default function AdminSidebar({ isOpen, onClose }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      navigate('/admin/login')
    } catch (error) {
      toast.error('Failed to logout')
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className={cn(
          'fixed lg:static top-0 left-0 bottom-0 z-50 w-72 bg-secondary flex flex-col',
          'lg:translate-x-0 lg:!transform-none'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-white/10 shrink-0">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="font-heading text-white text-lg font-bold">K</span>
            </div>
            <div className="leading-tight">
              <p className="font-heading font-bold text-white text-sm">
                Kiran Admin
              </p>
              <p className="text-[10px] text-white/50 font-medium tracking-widest uppercase">
                Dashboard
              </p>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 text-white/70 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.exact}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-primary text-white shadow-glow'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    )
                  }
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="my-4 h-px bg-white/10" />

          {/* External Link */}
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-all"
          >
            <ExternalLink className="w-5 h-5 shrink-0" />
            <span>View Website</span>
          </Link>
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3.5 py-3 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  )
}
