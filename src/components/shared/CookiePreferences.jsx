import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
const KEY = 'kd-analytics-consent-v1'
const GA_ID = 'G-R4PWH7Z4S8'
function savedChoice() { try { return localStorage.getItem(KEY) } catch { return null } }
function clearAnalyticsCookies() {
  for (const part of document.cookie.split(';')) {
    const name = part.trim().split('=')[0]
    if (!/^_(ga|gid|gat)(_|$)/.test(name)) continue
    for (const domain of ['', location.hostname, '.kirandermatology.com']) {
      document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ''}`
    }
  }
}
export default function CookiePreferences() {
  const { pathname } = useLocation()
  const [choice, setChoice] = useState(null)
  const [visible, setVisible] = useState(false)
  const [ready, setReady] = useState(false)
  const lastPage = useRef(null)
  useEffect(() => {
    const saved = savedChoice()
    setChoice(saved); setVisible(!['accepted', 'declined'].includes(saved))
    const open = () => setVisible(true)
    window.addEventListener('kd-open-cookie-preferences', open)
    return () => window.removeEventListener('kd-open-cookie-preferences', open)
  }, [])
  useEffect(() => {
    if (choice !== 'accepted') return
    window[`ga-disable-${GA_ID}`] = false
    window.dataLayer = window.dataLayer || []
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments) }
    if (window.__kdAnalyticsLoaded) { setReady(true); return }
    window.gtag('js', new Date())
    window.gtag('config', GA_ID, { send_page_view: false, page_location: `${window.location.origin}${window.location.pathname}`, allow_google_signals: false, allow_ad_personalization_signals: false })
    // Only explicit React route events are emitted. Disable automatic history-based
    // pageviews in the GA4 stream dashboard to prevent duplicate SPA pageviews.
    let script = document.getElementById('kd-google-analytics')
    const loaded = () => { window.__kdAnalyticsLoaded = true; setReady(true) }
    if (!script) {
      script = document.createElement('script');script.id = 'kd-google-analytics'
      script.async = true;script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
      script.addEventListener('load', loaded);document.head.appendChild(script)
    } else script.addEventListener('load', loaded)
    return () => script?.removeEventListener('load', loaded)
  }, [choice])
  useEffect(() => {
    if (!ready || choice !== 'accepted' || lastPage.current === pathname) return
    // Never send form fields, messages or query parameters as analytics payloads.
    window.gtag('event', 'page_view', { page_location: `${window.location.origin}${pathname}`, page_title: document.title })
    lastPage.current = pathname
  }, [pathname, ready, choice])
  function choose(value) {
    const previouslyAccepted = choice === 'accepted'
    try { localStorage.setItem(KEY, value) } catch { /* Keep the current-session choice. */ }
    setChoice(value);setVisible(false)
    if (value === 'declined') {
      window[`ga-disable-${GA_ID}`] = true
      clearAnalyticsCookies()
      if (previouslyAccepted) window.location.reload()
    }
  }
  if (!visible) return null
  return <aside aria-label="Cookie preferences" className="fixed bottom-24 left-4 right-4 sm:right-auto sm:max-w-md z-[9999] rounded-2xl border border-borderLight bg-white p-5 shadow-large">
    <h2 className="font-heading text-lg font-semibold text-secondary mb-2">Your privacy choices</h2>
    <p className="text-sm text-textSecondary leading-relaxed">Essential storage supports website functions. With your permission, Google Analytics helps us understand website usage. <Link className="text-primary underline" to="/privacy-policy">Privacy Policy</Link></p>
    <div className="flex flex-wrap gap-3 mt-4">
      <button type="button" className="btn-outline text-sm" onClick={() => choose('declined')}>Essential only</button>
      <button type="button" className="btn-primary text-sm" onClick={() => choose('accepted')}>Accept analytics</button>
    </div>
  </aside>
}
