import SEO from './SEO'
export default function NotFound() {
  return <><SEO title="Page Not Found" noindex />
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-xl px-6">
        <h1 className="font-heading text-display-sm text-secondary mb-3">404 Not Found</h1>
        <p className="text-textSecondary">Page not found</p>
      </div>
    </div></>
}
