import { literal } from '@/lib/i18n'
import { Trans, useLingui } from '@lingui/react/macro'
import { useState } from 'react'
import CarbonCode from '~icons/carbon/code'
import CarbonDocument from '~icons/carbon/document'
import CarbonWarningAlt from '~icons/carbon/warning-alt'
import { TestCard, TestShell } from '@/components/test-shell'

const CODE_BLOCK = literal(
  'block text-xs sm:text-sm bg-neutral-100 dark:bg-white/5 p-4 rounded-lg overflow-x-auto font-mono text-gray-700 dark:text-gray-300 whitespace-pre',
)

export default function TestActionErrorRoute() {
  const [shouldError, setShouldError] = useState(false)
  const { t } = useLingui()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShouldError(true)
  }

  if (shouldError) {
    throw new Error(literal('Validation failed: Invalid data submitted (400)'))
  }

  return (
    <TestShell
      title={<Trans>Action Error Test Route</Trans>}
      intro={
        <Trans>
          Test form submission errors that can occur during user actions
        </Trans>
      }
    >
      {/* Form */}
      <TestCard
        icon={<CarbonDocument />}
        title={<Trans>Form Submission Error Test</Trans>}
      >
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          <Trans>
            Submit this form to trigger a validation error and test the
            ErrorBoundary component.
          </Trans>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="test-field"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              <Trans>Test Field</Trans>
            </label>
            <input
              type="text"
              id={literal('test-field')}
              name="test-field"
              className="w-full px-4 py-3 text-sm bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors text-gray-900 dark:text-gray-100"
              placeholder={t`Enter anything to trigger action error`}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              <Trans>
                This form will intentionally throw an error when submitted to
                test error handling.
              </Trans>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="inline-block px-6 py-3 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
            >
              <Trans>Submit Form (Will Trigger Error)</Trans>
            </button>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              <Trans>
                ⚠️ This will cause an error to demonstrate the ErrorBoundary
              </Trans>
            </span>
          </div>
        </form>
      </TestCard>

      {/* What happens */}
      <TestCard
        icon={<CarbonWarningAlt />}
        title={<Trans>What Happens When You Submit?</Trans>}
      >
        <ol className="space-y-3">
          {[
            <Trans key="1">
              The form submission triggers a{' '}
              <code className="bg-teal-50 dark:bg-teal-400/10 text-teal-700 dark:text-teal-300 px-1.5 py-0.5 rounded text-xs">
                Validation failed
              </code>{' '}
              error
            </Trans>,
            <Trans key="2">
              The ErrorBoundary component catches the error and displays a
              user-friendly message
            </Trans>,
            <Trans key="3">
              Users can navigate away, report the issue, or try to recover from
              the error
            </Trans>,
          ].map((step, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300"
            >
              <span className="size-6 rounded-md bg-teal-100 dark:bg-teal-400/10 text-teal-700 dark:text-teal-300 flex items-center justify-center text-xs font-medium flex-shrink-0">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </TestCard>

      {/* Code example */}
      <TestCard icon={<CarbonCode />} title={<Trans>Error Code</Trans>}>
        <pre className={CODE_BLOCK}>
          {literal(`// Error thrown in form submission handler
if (shouldError) {
  throw new Error('Validation failed: Invalid data submitted (400)');
}

// In a real app, this might be:
try {
  await submitForm(formData);
} catch (error) {
  if (error.response?.status === 400) {
    throw new Error('Validation failed: ' + error.message);
  }
  throw error;
}`)}
        </pre>
      </TestCard>
    </TestShell>
  )
}
