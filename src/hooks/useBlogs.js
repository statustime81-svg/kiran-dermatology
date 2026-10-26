import { useSnapshot } from '../seo/SnapshotContext'
import { useState, useEffect, useCallback } from 'react'
import { getBlogs, getBlogBySlug } from '../services/blogService'

export const useBlogs = (publishedOnly = true) => {
  const snapshot = useSnapshot()
  const [blogs, setBlogs] = useState(() => snapshot?.blogs ? snapshot.blogs.filter((row) => !publishedOnly || row.published) : [])
  const [loading, setLoading] = useState(!snapshot?.blogs)
  const [error, setError] = useState(null)

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(!snapshot?.blogs)
      setError(null)
      const data = await getBlogs(publishedOnly)
      setBlogs(data || [])
    } catch (err) {
      console.error('Blogs fetch error:', err)
      setError(err.message)
      if (!snapshot?.blogs) setBlogs([])
    } finally {
      setLoading(false)
    }
  }, [publishedOnly, snapshot])

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  return { blogs, loading, error, refetch: fetchBlogs }
}

export const useBlog = (slug) => {
  const snapshot = useSnapshot()
  const initial = snapshot?.blogs?.find((row) => row.slug === slug)
  const [blog, setBlog] = useState(initial || null)
  const [loading, setLoading] = useState(!initial)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    const fetchBlog = async () => {
      try {
        setLoading(!initial)
        setBlog(initial || null)
        setError(null)
        const data = await getBlogBySlug(slug)
        if (!cancelled) setBlog(data)
      } catch (err) {
        console.error('Blog fetch error:', err)
        if (!cancelled && !initial) setError(err.message)
        if (!cancelled && !initial) setBlog(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchBlog()
    return () => { cancelled = true }
  }, [slug, snapshot, initial])

  return { blog, loading, error }
}