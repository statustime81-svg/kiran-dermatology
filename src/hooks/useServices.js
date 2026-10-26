import { useSnapshot } from '../seo/SnapshotContext'
import { useState, useEffect, useCallback } from 'react'
import { getServices, getServiceBySlug } from '../services/serviceService'

export const useServices = (featuredOnly = false) => {
  const snapshot = useSnapshot()
  const [services, setServices] = useState(() => snapshot?.services ? snapshot.services.filter((row) => !featuredOnly || row.featured) : [])
  const [loading, setLoading] = useState(!snapshot?.services)
  const [error, setError] = useState(null)

  const fetchServices = useCallback(async () => {
    try {
      setLoading(!snapshot?.services)
      setError(null)
      const data = await getServices(featuredOnly)
      setServices(data || [])
    } catch (err) {
      console.error('Services fetch error:', err)
      setError(err.message)
      if (!snapshot?.services) setServices([])
    } finally {
      setLoading(false)
    }
  }, [featuredOnly, snapshot])

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  return { services, loading, error, refetch: fetchServices }
}

export const useService = (slug) => {
  const snapshot = useSnapshot()
  const initial = snapshot?.services?.find((row) => row.slug === slug)
  const [service, setService] = useState(initial || null)
  const [loading, setLoading] = useState(!initial)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    const fetchService = async () => {
      try {
        setLoading(!initial)
        setService(initial || null)
        setError(null)
        const data = await getServiceBySlug(slug)
        if (!cancelled) setService(data)
      } catch (err) {
        console.error('Service fetch error:', err)
        if (!cancelled && !initial) setError(err.message)
        if (!cancelled && !initial) setService(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchService()
    return () => { cancelled = true }
  }, [slug, snapshot, initial])

  return { service, loading, error }
}