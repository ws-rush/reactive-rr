import { literal } from '@/lib/i18n'
import { Trans } from '@lingui/react/macro'
import CarbonWarningAlt from '~icons/carbon/warning-alt'
import { NavLink } from 'react-router'

/**
 * Shared layout for the error-testing demo routes. Gives every /test/* page a
 * single, consistent visual template — teal header, neutral cards, dark mode —
 * so the demos feel like part of the same app as the real error pages.
 */

interface TestShellProps {
  title: React.ReactNode
  intro: React.ReactNode
  children: React.ReactNode
}

export function TestShell({ title, intro, children }: TestShellProps) {
  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-neutral-100 dark:bg-neutral-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="w-full max-w-3xl space-y-6">
        <header className="bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-400/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="size-9 rounded-lg bg-teal-600 text-white flex items-center justify-center">
              <CarbonWarningAlt className="text-lg" />
            </span>
            <h1 className="text-2xl font-bold text-teal-900 dark:text-teal-100">
              {title}
            </h1>
          </div>
          <p className="text-sm text-teal-800/80 dark:text-teal-200/70">
            {intro}
          </p>
        </header>

        {children}

        <div className="flex justify-center pt-2">
          <NavLink
            to="/test/error"
            className={({ isPending }) =>
              literal(
                `inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-xl text-sm font-medium hover:bg-neutral-50 dark:hover:bg-white/10 transition-colors ${
                  isPending ? 'opacity-60' : ''
                }`,
              )
            }
          >
            <Trans>← Back to Error Tests</Trans>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

interface TestCardProps {
  icon: React.ReactNode
  title: React.ReactNode
  children: React.ReactNode
}

export function TestCard({ icon, title, children }: TestCardProps) {
  return (
    <section className="bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <span className="size-8 rounded-lg bg-teal-100 dark:bg-teal-400/10 text-teal-700 dark:text-teal-300 flex items-center justify-center">
          {icon}
        </span>
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}
