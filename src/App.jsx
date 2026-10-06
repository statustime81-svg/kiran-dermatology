import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Layouts
import PublicLayout from './components/layout/public/PublicLayout'
import AdminLayout from './components/layout/admin/AdminLayout'

// Shared
import Preloader from './components/shared/Preloader'
import ScrollToTop from './components/shared/ScrollToTop'
import ScrollProgress from './components/animations/ScrollProgress'
import WhatsAppFloat from './components/shared/WhatsAppFloat'
import ScrollToTopButton from './components/shared/ScrollToTopButton'
import ErrorBoundary from './components/shared/ErrorBoundary'

// Routes
import ProtectedRoute from './routes/ProtectedRoute'

// Public Pages
import Home from './pages/public/Home'
import About from './pages/public/About'
import Services from './pages/public/Services'
import ServiceDetail from './pages/public/ServiceDetail'
import Gallery from './pages/public/Gallery'
import Blog from './pages/public/Blog'
import BlogDetail from './pages/public/BlogDetail'
import Contact from './pages/public/Contact'
import Appointment from './pages/public/Appointment'

// Admin Pages
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminAppointments from './pages/admin/Appointments'
import AdminContacts from './pages/admin/Contacts'
import ServicesList from './pages/admin/Services/ServicesList'
import ServiceForm from './pages/admin/Services/ServiceForm'
import TestimonialsList from './pages/admin/Testimonials/TestimonialsList'
import TestimonialForm from './pages/admin/Testimonials/TestimonialForm'
import BlogsList from './pages/admin/Blogs/BlogsList'
import BlogForm from './pages/admin/Blogs/BlogForm'
import GalleryList from './pages/admin/Gallery/GalleryList'
import GalleryForm from './pages/admin/Gallery/GalleryForm'

function TempPlaceholder({ title }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-heading text-2xl text-slate-700 mb-2">{title}</h1>
        <p className="text-slate-500 text-sm">🚧 Coming soon</p>
      </div>
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  // ✅ Check karo admin route pe hai ya nahi
  const isAdminRoute = location.pathname.startsWith('/admin')

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
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {!loading && (
        <>
          {/* ✅ Public site globals — sirf public pages pe */}
          {!isAdminRoute && (
            <>
              <ScrollProgress />
              <ScrollToTop />
              <WhatsAppFloat />
              <ScrollToTopButton />
            </>
          )}

          <Routes>
            {/* ================= PUBLIC ROUTES ================= */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route
                path="/privacy-policy"
                element={<TempPlaceholder title="Privacy Policy" />}
              />
              <Route
                path="/terms"
                element={<TempPlaceholder title="Terms & Conditions" />}
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

                {/* Testimonials */}
                <Route
                  path="/admin/testimonials"
                  element={<TestimonialsList />}
                />
                <Route
                  path="/admin/testimonials/new"
                  element={<TestimonialForm />}
                />
                <Route
                  path="/admin/testimonials/edit/:id"
                  element={<TestimonialForm />}
                />

                {/* Blogs */}
                <Route path="/admin/blogs" element={<BlogsList />} />
                <Route path="/admin/blogs/new" element={<BlogForm />} />
                <Route path="/admin/blogs/edit/:id" element={<BlogForm />} />

                {/* Gallery */}
                <Route path="/admin/gallery" element={<GalleryList />} />
                <Route path="/admin/gallery/new" element={<GalleryForm />} />
                <Route path="/admin/gallery/edit/:id" element={<GalleryForm />} />
              </Route>
            </Route>

            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center bg-background">
                  <div className="text-center max-w-xl px-6">
                    <h1 className="font-heading text-display-sm text-secondary mb-3">
                      404 Not Found
                    </h1>
                    <p className="text-textSecondary">Page not found</p>
                  </div>
                </div>
              }
            />
          </Routes>
        </>
      )}
    </ErrorBoundary>
  )
}