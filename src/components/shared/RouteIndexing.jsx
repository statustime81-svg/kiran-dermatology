import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
export default function RouteIndexing() {
  const { pathname } = useLocation()
  return /^\/admin(?:\/|$)/.test(pathname) || ['/terms', '/privacy-policy'].includes(pathname)
    ? <Helmet><meta name="robots" content="noindex, follow" /></Helmet> : null
}
