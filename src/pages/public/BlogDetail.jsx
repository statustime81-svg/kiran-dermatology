import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Home, Calendar, Clock, ArrowLeft } from 'lucide-react'
import SEO from '../../components/shared/SEO'
import BlogDetailContent from '../../components/sections/blog/BlogDetailContent'
import BlogCard from '../../components/cards/BlogCard'
import AppointmentCTA from '../../components/sections/home/AppointmentCTA'
import Loader from '../../components/ui/Loader'
import { useBlog, useBlogs } from '../../hooks/useBlogs'
import { formatDate } from '../../utils/formatDate'
import NotFound from '../../components/shared/NotFound'
import { absoluteUrl, canonicalUrl, clinic, doctor, breadcrumbSchema } from '../../seo/site'

export default function BlogDetail() {
  const { slug } = useParams()
  const { blog, loading, error } = useBlog(slug)
  const { blogs } = useBlogs(true)

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center pt-32">
        <Loader size="lg" text="Loading article..." />
      </div>
    )
  }

  if (error || !blog) {
    return <NotFound />
  }

  // Related blogs
  const related = blogs.filter((b) => b.id !== blog.id).slice(0, 3)

  const coverImage = blog.cover_image || blog.coverImage
  const publishedAt = blog.published_at || blog.publishedAt
  const readTime = blog.read_time || blog.readTime

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: coverImage ? absoluteUrl(coverImage) : undefined,
    mainEntityOfPage: canonicalUrl(`/blog/${slug}`),
    datePublished: publishedAt || undefined,
    dateModified: blog.updated_at || publishedAt || undefined,
    author: {
      '@type': 'Person',
      name: blog.author || doctor.name,
      ...( (!blog.author || blog.author === doctor.name) ? { '@id': doctor['@id'], url: doctor.url } : {} ),
    },
    publisher: {
      '@id': clinic['@id'],
    },
  }

  return (
    <>
      <SEO
        title={blog.title}
        description={blog.excerpt}
        keywords={blog.tags?.join(', ')}
        image={coverImage}
        type="article"
        breadcrumbs={breadcrumbSchema([['Home', '/'], ['Blog', '/blog'], [blog.title, `/blog/${slug}`]])}
        schema={schema}
      />

      {/* Hero */}
      <section className="relative pt-40 pb-16 md:pt-44 md:pb-20 overflow-hidden bg-gradient-to-b from-primary-50/50 via-background to-background">
        <div className="absolute top-20 -left-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-32 w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm mb-8 flex-wrap"
          >
            <Link
              to="/"
              className="flex items-center gap-1.5 text-textMuted hover:text-primary transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-textMuted/60" />
            <Link
              to="/blog"
              className="text-textMuted hover:text-primary transition-colors"
            >
              Blog
            </Link>
            <ChevronRight className="w-4 h-4 text-textMuted/60" />
            <span className="text-primary font-medium line-clamp-1 max-w-[200px]">
              {blog.title}
            </span>
          </motion.nav>

          <div className="max-w-3xl mx-auto text-center">
            {blog.category && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex justify-center mb-6"
              >
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-xs font-semibold text-primary-700 tracking-widest uppercase">
                  {blog.category}
                </span>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-heading font-bold text-display-sm md:text-display-md text-secondary leading-tight mb-6 text-balance"
            >
              {blog.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-textSecondary leading-relaxed mb-6 text-balance"
            >
              {blog.excerpt}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-textMuted"
            >
              {publishedAt && (
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  {formatDate(publishedAt, 'dd MMM yyyy')}
                </span>
              )}
              {readTime && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  {readTime}
                </span>
              )}
            </motion.div>
          </div>

          {/* Cover image */}
          {coverImage && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-4xl mx-auto mt-12"
            >
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-large bg-gradient-to-br from-primary-100 to-accent-100">
                <img
                  src={coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Content */}
      <BlogDetailContent blog={blog} />

      {/* Related */}
      {related.length > 0 && (
        <section className="section bg-gradient-to-b from-primary-50/30 to-background">
          <div className="container-custom">
            <div className="mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-heading font-bold text-display-sm text-secondary mb-3"
              >
                Continue Reading
              </motion.h2>
              <p className="text-textSecondary">
                More articles you might find helpful.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((b, i) => (
                <BlogCard key={b.id} blog={b} index={i} />
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Link to="/blog" className="btn-outline">
                <ArrowLeft className="w-4 h-4" />
                Back to All Articles
              </Link>
            </div>
          </div>
        </section>
      )}

      <AppointmentCTA />
    </>
  )
}