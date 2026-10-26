import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Layouts
import PublicLayout from './components/layout/public/PublicLayout'
import AdminLayout from './components/layout/admin/AdminLayout'

// Shared
import Preloader from './components/shared/Preloader'
import CookiePreferences from './components/shared/CookiePreferences'
import NotFound from './components/shared/NotFound'
import RouteIndexing from './components/shared/RouteIndexing'
import ScrollToTop from './components/shared/ScrollToTop'
import ScrollProgress from './components/animations/ScrollProgress'
import WhatsAppFloat from './components/shared/WhatsAppFloat'
import ScrollToTopButton from './components/shared/ScrollToTopButton'
import ErrorBoundary from './components/shared/ErrorBoundary'

// Routes
import ProtectedRoute from './routes/ProtectedRoute'

// Public Pages
import Home from './pages/public/Home'
import LegalPage from './pages/public/LegalPage'
import SitemapPage from './pages/public/SitemapPage'
import About from './pages/public/About'
import Services from './pages/public/Services'
import ServiceDetail from './pages/public/ServiceDetail'
import Blog from './pages/public/Blog'
import BlogDetail from './pages/public/BlogDetail'
import Contact from './pages/public/Contact'
import Appointment from './pages/public/Appointment'

// Admin Pages
const AdminLogin = lazy(() => import('./pages/admin/Login'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminAppointments = lazy(() => import('./pages/admin/Appointments'))
const AdminContacts = lazy(() => import('./pages/admin/Contacts'))
const ServicesList = lazy(() => import('./pages/admin/Services/ServicesList'))
const ServiceForm = lazy(() => import('./pages/admin/Services/ServiceForm'))
const BlogsList = lazy(() => import('./pages/admin/Blogs/BlogsList'))
const BlogForm = lazy(() => import('./pages/admin/Blogs/BlogForm'))



export default function App({ prerendered = false }) {
  const [loading, setLoading] = useState(!prerendered)
  const location = useLocation()

  // ✅ Check karo admin route pe hai ya nahi
  const isAdminRoute = location.pathname.startsWith('/admin')

  useEffect(() => {
    if (isAdminRoute) window['ga-disable-G-R4PWH7Z4S8'] = true
  }, [isAdminRoute])

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('kd-visited')
    if (hasVisited) setLoading(false)
  }, [])

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('kd-visited', 'true')
    setLoading(false)
  }

  return (
    <ErrorBoundary>
      <RouteIndexing />
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {!loading && (
        <>
          {/* ✅ Public site globals — sirf public pages pe */}
          {!isAdminRoute && (
            <>
              <CookiePreferences />
              <ScrollProgress />
              <ScrollToTop />
              <WhatsAppFloat />
              <ScrollToTopButton />
            </>
          )}

          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Routes>
            {/* ================= PUBLIC ROUTES ================= */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/sitemap" element={<SitemapPage />} />
              <Route
                path="/privacy-policy"
                element={<LegalPage kind="privacy" />}
              />
              <Route
                path="/terms"
                element={<LegalPage kind="terms" />}
              />
            </Route>

            {/* ================= ADMIN ROUTES ================= */}
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                {/* Dashboard */}
                <Route path="/admin" element={<AdminDashboard />} />

                {/* Appointments & Contacts */}
                <Route path="/admin/appointments" element={<AdminAppointments />} />
                <Route path="/admin/contacts" element={<AdminContacts />} />

                {/* Services */}
                <Route path="/admin/services" element={<ServicesList />} />
                <Route path="/admin/services/new" element={<ServiceForm />} />
                <Route path="/admin/services/edit/:id" element={<ServiceForm />} />

             
                {/* Blogs */}
                <Route path="/admin/blogs" element={<BlogsList />} />
                <Route path="/admin/blogs/new" element={<BlogForm />} />
                <Route path="/admin/blogs/edit/:id" element={<BlogForm />} />

               
            </Route>

            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </>
      )}
    </ErrorBoundary>
  )
}
