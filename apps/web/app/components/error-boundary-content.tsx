import { literal } from '@/lib/i18n'
import { Trans, useLingui } from '@lingui/react/macro'
import { NavLink, isRouteErrorResponse } from 'react-router'
import CarbonCloudOffline from '~icons/carbon/cloud-offline'
import CarbonError from '~icons/carbon/error'
import CarbonLocked from '~icons/carbon/locked'
import CarbonMisuse from '~icons/carbon/misuse'
import CarbonSearch from '~icons/carbon/search'
import CarbonWarningAltFilled from '~icons/carbon/warning-alt-filled'
import CarbonWarningOther from '~icons/carbon/warning-other'

const APPLE_EASE_DELAY = (delay: number) => ({
  animationDelay: literal(`${delay}s`),
})

interface StatusConfig {
  icon: React.ComponentType<{ className?: string }>
  title: React.ReactNode
  message: React.ReactNode
}

// Curated copy + iconography for each status code the app can emit.
const STATUS_CONFIG: Record<number, StatusConfig> = {
  400: {
    icon: CarbonWarningAltFilled,
    title: <Trans>Bad Request</Trans>,
    message: (
      <Trans>The request could not be processed due to invalid syntax.</Trans>
    ),
  },
  401: {
    icon: CarbonLocked,
    title: <Trans>Unauthorized</Trans>,
    message: <Trans>Please sign in to access this page.</Trans>,
  },
  403: {
    icon: CarbonMisuse,
    title: <Trans>Access Denied</Trans>,
    message: <Trans>You do not have permission to view this page.</Trans>,
  },
  404: {
    icon: CarbonSearch,
    title: <Trans>Page Not Found</Trans>,
    message: (
      <Trans>
        The page you are looking for does not exist or has been moved.
      </Trans>
    ),
  },
  500: {
    icon: CarbonCloudOffline,
    title: <Trans>Server Error</Trans>,
    message: (
      <Trans>Something went wrong on our end. Please try again shortly.</Trans>
    ),
  },
}

function configForStatus(status: number): StatusConfig {
  if (STATUS_CONFIG[status]) return STATUS_CONFIG[status]
  if (status >= 500) {
    return {
      icon: CarbonCloudOffline,
      title: <Trans>Server Error</Trans>,
      message: (
        <Trans>The server encountered an error. Please try again later.</Trans>
      ),
    }
  }
  return {
    icon: CarbonWarningAltFilled,
    title: <Trans>Page Error</Trans>,
    message: <Trans>An error occurred while loading this page.</Trans>,
  }
}

interface ErrorViewProps {
  status?: string | number
  icon: React.ComponentType<{ className?: string }>
  title: React.ReactNode
  message: React.ReactNode
  actions: React.ReactNode
  details?: React.ReactNode
}

/**
 * The single, shared visual template for every error state in the app.
 * Theming follows the app's teal brand palette and supports dark mode.
 */
function ErrorView({
  status,
  icon: Icon,
  title,
  message,
  actions,
  details,
}: ErrorViewProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-950 p-4 overflow-hidden relative transition-colors duration-200">
      {/* ambient gradient blobs */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-20 dark:opacity-25 blur-3xl pointer-events-none animate-float-1"
        style={{
          background: 'linear-gradient(135deg, #0d9488 0%, #06b6d4 100%)',
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-20 dark:opacity-25 blur-3xl pointer-events-none animate-float-2"
        style={{
          background: 'linear-gradient(135deg, #14b8a6 0%, #0891b2 100%)',
        }}
      />

      <div className="max-w-2xl w-full relative z-10">
        <div className="backdrop-blur-2xl bg-white/60 dark:bg-white/5 rounded-5xl p-8 sm:p-16 border border-white/50 dark:border-white/10 flex flex-col items-center text-center gap-8 animate-card-in">
          <div
            className="size-16 rounded-2xl bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20 flex items-center justify-center text-teal-600 dark:text-teal-400 animate-dot-in"
            style={APPLE_EASE_DELAY(0.2)}
          >
            <Icon className="text-2xl" />
          </div>

          {status && (
            <h1
              className="text-[5rem] sm:text-[7.5rem]/none leading-none font-bold tracking-tighter text-transparent bg-clip-text animate-status-in"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #06b6d4 100%)',
                ...APPLE_EASE_DELAY(0.3),
              }}
            >
              {status}
            </h1>
          )}

          <div className="space-y-4">
            <h2
              className="text-2xl sm:text-4xl font-medium text-neutral-800 dark:text-neutral-100 animate-fade-in-slow"
              style={APPLE_EASE_DELAY(0.4)}
            >
              {title}
            </h2>
            <p
              className="text-neutral-500 dark:text-neutral-400 text-base sm:text-lg font-normal max-w-md mx-auto animate-fade-in-slow"
              style={APPLE_EASE_DELAY(0.5)}
            >
              {message}
            </p>
          </div>

          {actions}

          {details && (
            <div
              className="w-full text-left pt-4 border-t border-slate-200 dark:border-white/10 animate-fade-in-slow"
              style={APPLE_EASE_DELAY(0.7)}
            >
              {details}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ActionButtons({ goBack }: { goBack: () => void }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md mx-auto animate-rise-in"
      style={APPLE_EASE_DELAY(0.6)}
    >
      <NavLink
        to="/"
        className="inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-teal-600 text-white text-lg font-medium hover:bg-teal-500 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-teal-500/25 w-full"
      >
        <Trans>Go to Home</Trans>
      </NavLink>
      <button
        onClick={goBack}
        type="button"
        className="inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-200 text-base font-medium hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm w-full"
      >
        <Trans>Go Back</Trans>
      </button>
      <button
        onClick={() => window.location.reload()}
        type="button"
        className="inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-slate-200/50 dark:bg-white/5 text-neutral-600 dark:text-neutral-300 text-base hover:bg-slate-200 dark:hover:bg-white/10 transition-all font-normal w-full shadow-sm"
      >
        <Trans>Reload</Trans>
      </button>
    </div>
  )
}

export function ErrorBoundaryContent({ error }: { error: unknown }) {
  const { t } = useLingui()

  const reportError = () => {
    const errorDetails = {
      message:
        error instanceof Error ? error.message : literal('Unknown error'),
      stack: error instanceof Error ? error.stack : literal('No stack trace'),
      status: isRouteErrorResponse(error) ? error.status : null,
      statusText: isRouteErrorResponse(error) ? error.statusText : null,
      data: isRouteErrorResponse(error) ? error.data : null,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    }
    console.log(literal('Error reported:'), errorDetails)
    alert(
      t`An error report has been sent to our team. Thank you for your help.`,
    )
  }

  const goBack = () => {
    window.history.back()
  }

  const reportButton = (
    <button
      onClick={reportError}
      type="button"
      className="text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 text-sm transition-colors mt-2"
    >
      <Trans>Report this issue</Trans>
    </button>
  )

  if (isRouteErrorResponse(error)) {
    const config = configForStatus(error.status)
    return (
      <ErrorView
        status={error.status}
        icon={config.icon}
        title={config.title}
        message={error.data || config.message}
        actions={<ActionButtons goBack={goBack} />}
        details={reportButton}
      />
    )
  }

  if (error instanceof Error) {
    return (
      <ErrorView
        status="500"
        icon={CarbonError}
        title={<Trans>Application Error</Trans>}
        message={error.message}
        actions={<ActionButtons goBack={goBack} />}
        details={
          import.meta.env.DEV ? (
            <details className="text-left">
              <summary className="text-xs text-neutral-500 dark:text-neutral-400 cursor-pointer hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors">
                <Trans>Technical details</Trans>
              </summary>
              <pre className="bg-neutral-50 dark:bg-white/5 p-3 rounded mt-2 text-xs font-mono text-neutral-600 dark:text-neutral-300 whitespace-pre-wrap max-h-40 overflow-auto">
                {error.stack}
              </pre>
            </details>
          ) : (
            reportButton
          )
        }
      />
    )
  }

  return (
    <ErrorView
      status="???"
      icon={CarbonWarningOther}
      title={<Trans>Something Went Wrong</Trans>}
      message={<Trans>An unexpected error occurred.</Trans>}
      actions={<ActionButtons goBack={goBack} />}
      details={reportButton}
    />
  )
}
