import { StrictMode } from 'react'
import { Toaster } from 'react-hot-toast'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { UIProvider } from './context/UIContext'
import { SnapshotContext } from './seo/SnapshotContext'
export function render(path, snapshot) {
  const context = {}
  const body = renderToString(
    <StrictMode><HelmetProvider context={context}>
      <MemoryRouter initialEntries={[path]}><AuthProvider><UIProvider>
        <SnapshotContext.Provider value={snapshot}><App prerendered /></SnapshotContext.Provider>
        <Toaster position="top-right" />
      </UIProvider></AuthProvider></MemoryRouter>
    </HelmetProvider></StrictMode>
  )
  const helmet = context.helmet
  return { body, head: ['title', 'meta', 'link', 'script'].map((key) => helmet[key].toString()).join('\n') }
}
