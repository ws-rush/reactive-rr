import './styles/main.css'
import {
  createLinguiRootLoader,
  createLinguiClientMiddleware,
  createLinguiShouldRevalidate,
  LinguiRouterProvider,
} from 'lingui-rr'
import {
  Links,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteLoaderData,
} from 'react-router'
import { mode } from '@/lib/mode.client'
import { useState, useEffect } from 'react'
import type { Route } from './+types/root'
import { GlobalBusHandler } from './lib/bus'
import { ErrorBoundaryContent } from './components/error-boundary-content'
import { defaultLocale, i18n, literal } from '@/lib/i18n'
import { Meta } from '@/components/meta'

export const clientMiddleware = [createLinguiClientMiddleware(i18n)]
export const clientLoader = createLinguiRootLoader(i18n)

export const links = () => [
  {
    href:
      typeof window !== 'undefined' && mode.isPreferdDark
        ? literal('/favicon-dark.svg?v=2')
        : literal('/favicon.svg?v=2'),
    rel: literal('icon'),
    type: literal('image/svg+xml'),
  },
]

export function Layout({ children }: { readonly children: React.ReactNode }) {
  const lingui = useRouteLoaderData<typeof clientLoader>(literal('root'))
  const defaultLocaleMeta =
    i18n.locales.find((item) => item.code === defaultLocale) ?? i18n.locales[0]
  const defaultHtmlAttrs = {
    lang: defaultLocaleMeta.code,
    dir: defaultLocaleMeta.dir,
  }

  return (
    <html {...(lingui?.htmlAttrs ?? defaultHtmlAttrs)} suppressHydrationWarning>
      <head>
        <Meta
          data={[
            { charSet: literal('utf-8') },
            {
              content: literal('width=device-width, initial-scale=1'),
              name: literal('viewport'),
            },
            {
              content:
                typeof window !== 'undefined' && mode.isDark
                  ? literal('#00aba9')
                  : literal('#ffffff'),
              name: literal('theme-color'),
            },
          ]}
        />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const lingui = useLoaderData<typeof clientLoader>()
  const [showSplash, setShowSplash] = useState(true)
  const [isClosing, setIsClosing] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsClient(true), 0)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = literal('hidden')
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showSplash])

  const handleAnimationComplete = () => {
    setIsClosing(true)
    setTimeout(() => {
      setShowSplash(false)
    }, 100) // matches the transition-opacity duration
  }

  return (
    <LinguiRouterProvider state={lingui}>
      {showSplash && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-100 text-neutral-900 transition-opacity duration-100 dark:bg-neutral-950 dark:text-neutral-100 ${
            isClosing ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          {isClient && (
            <svg
              viewBox="0 0 32 32"
              role="img"
              aria-label="Reactive RR"
              fill="currentColor"
              onAnimationEnd={handleAnimationComplete}
              className="w-50 md:w-75 animate-logo-splash"
            >
              <path d="M16 2L2 13l6 17h16l6-17Zm2.582 19.265l-5.986 1.33l-1.423-7.824l4.91-4.21l5.442 4.082Zm.198 2.005L21.326 28H10.674l1.79-3.327Zm-9.19-9.776l-3.85-.889L15 5.329v3.528ZM17 8.75V5.33l9.26 7.275l-3.15.727ZM4.614 14.398l4.654 1.074l1.484 8.164l-1.738 3.228Zm18.372 12.466l-2.577-4.785l3.007-6.765l3.97-.916Z" />
            </svg>
          )}
        </div>
      )}
      <Outlet />
      <GlobalBusHandler />
    </LinguiRouterProvider>
  )
}

export const shouldRevalidate = createLinguiShouldRevalidate(i18n)

export function HydrateFallback() {
  return <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950" />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const lingui = useRouteLoaderData<typeof clientLoader>(literal('root'))

  if (!lingui)
    return <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950" />

  return (
    <LinguiRouterProvider state={lingui}>
      <ErrorBoundaryContent error={error} />
    </LinguiRouterProvider>
  )
}
