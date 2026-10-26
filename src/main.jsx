import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'

import App from './App.jsx'
import { SnapshotContext } from './seo/SnapshotContext'
import { AuthProvider } from './context/AuthContext.jsx'
import { UIProvider } from './context/UIContext.jsx'

import './index.css'
import './styles/fonts.css'
import './styles/animations.css'

const snapshot = window.__SEO_SNAPSHOT__ || null
const root = document.getElementById('root')
const application = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <UIProvider>
            <SnapshotContext.Provider value={snapshot}>
              <App prerendered={root.hasAttribute('data-prerendered')} />
            </SnapshotContext.Provider>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#FFFFFF',
                  color: '#0F2C4C',
                  borderRadius: '12px',
                  padding: '14px 20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  boxShadow: '0 8px 30px rgba(15, 44, 76, 0.12)',
                  border: '1px solid #E2E8F0',
                },
                success: { iconTheme: { primary: '#0EA5A5', secondary: '#FFFFFF' } },
                error: { iconTheme: { primary: '#EF4444', secondary: '#FFFFFF' } },
              }}
            />
          </UIProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)
if (root.hasAttribute('data-prerendered')) ReactDOM.hydrateRoot(root, application)
else ReactDOM.createRoot(root).render(application)