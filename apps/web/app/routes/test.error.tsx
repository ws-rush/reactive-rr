import { literal } from '@/lib/i18n'
import { Trans } from '@lingui/react/macro'
import { useState } from 'react'
import { NavLink } from 'react-router'
import CarbonCode from '~icons/carbon/code'
import CarbonDocument from '~icons/carbon/document'
import CarbonWifiOff from '~icons/carbon/wifi-off'
import CarbonWarningAlt from '~icons/carbon/warning-alt'
import CarbonWarningAltFilled from '~icons/carbon/warning-alt-filled'
import { TestCard, TestShell } from '@/components/test-shell'

const CODE_BLOCK = literal(
  'block text-xs sm:text-sm bg-neutral-100 dark:bg-white/5 p-3 rounded-lg overflow-x-auto font-mono text-gray-700 dark:text-gray-300 whitespace-pre',
)

const TRIGGER_BTN = literal(
  'inline-block px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors disabled:opacity-50',
)

export default function TestErrorRoute() {
  const [shouldError, setShouldError] = useState(false)
  const [shouldNetworkError, setShouldNetworkError] = useState(false)

  if (shouldError) {
    throw new Error(
      literal(
        'This is a test error to demonstrate the ErrorBoundary component',
      ),
    )
  }

  if (shouldNetworkError) {
    throw new TypeError(literal('Failed to fetch: Network error simulation'))
  }

  const triggerReactRouterError = () => {
    // Navigate to a route that will trigger a loader error
    window.location.href = literal('/test/loader-error')
  }

  return (
    <TestShell
      title={<Trans>ErrorBoundary Test Page</Trans>}
      intro={
        <Trans>
          Test different types of errors to see how the ErrorBoundary component
          handles them
        </Trans>
      }
    >
      <div className="divide-y divide-neutral-200 dark:divide-white/10 rounded-2xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 shadow-sm overflow-hidden">
        {/* Application Error */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="size-8 rounded-lg bg-teal-100 dark:bg-teal-400/10 text-teal-700 dark:text-teal-300 flex items-center justify-center">
              <CarbonWarningAltFilled className="text-base" />
            </span>
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
              <Trans>Application Error Test</Trans>
            </h3>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Trans>
              This will throw a JavaScript error to test the ErrorBoundary
              component.
            </Trans>
          </p>
          <button
            onClick={() => setShouldError(true)}
            type="button"
            className={TRIGGER_BTN}
          >
            <Trans>Trigger Application Error</Trans>
          </button>
        </div>

        {/* Network Error */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="size-8 rounded-lg bg-teal-100 dark:bg-teal-400/10 text-teal-700 dark:text-teal-300 flex items-center justify-center">
              <CarbonWifiOff className="text-base" />
            </span>
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
              <Trans>Network Error Test</Trans>
            </h3>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Trans>Test handling of network-related errors.</Trans>
          </p>
          <button
            onClick={() => setShouldNetworkError(true)}
            type="button"
            className={TRIGGER_BTN}
          >
            <Trans>Trigger Network Error</Trans>
          </button>
        </div>

        {/* Data Loading Error */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="size-8 rounded-lg bg-teal-100 dark:bg-teal-400/10 text-teal-700 dark:text-teal-300 flex items-center justify-center">
              <CarbonCode className="text-base" />
            </span>
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
              <Trans>Data Loading Error Test (SPA Mode)</Trans>
            </h3>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Trans>
              Navigate to a route that simulates a data loading error in SPA
              mode.
            </Trans>
          </p>
          <button
            onClick={triggerReactRouterError}
            type="button"
            className={TRIGGER_BTN}
          >
            <Trans>Navigate to Data Error Route</Trans>
          </button>
        </div>

        {/* Form Submission Error */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="size-8 rounded-lg bg-teal-100 dark:bg-teal-400/10 text-teal-700 dark:text-teal-300 flex items-center justify-center">
              <CarbonDocument className="text-base" />
            </span>
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
              <Trans>Form Submission Error Test (SPA Mode)</Trans>
            </h3>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Trans>
              Navigate to a route with a form that triggers a submission error.
            </Trans>
          </p>
          <NavLink to="/test/action-error" className={TRIGGER_BTN}>
            <Trans>Go to Form Error Test</Trans>
          </NavLink>
        </div>
      </div>

      {/* Code examples */}
      <TestCard
        icon={<CarbonCode />}
        title={<Trans>Error Code Examples</Trans>}
      >
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              <Trans>SPA Mode - Data Loading Error:</Trans>
            </h4>
            <pre className={CODE_BLOCK}>
              {literal(`useEffect(() => {
  throw new Error('Failed to load data: Record Not Found');
}, []);`)}
            </pre>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              <Trans>SSR Mode - React Router:</Trans>
            </h4>
            <pre className={CODE_BLOCK}>
              {literal(`import { data } from "react-router";

export async function loader({ params }) {
  let record = await fakeDb.getRecord(params.id);
  if (!record) {
    throw data("Record Not Found", { status: 404 });
  }
  return record;
}`)}
            </pre>
          </div>
        </div>
      </TestCard>

      {/* Testing instructions */}
      <TestCard
        icon={<CarbonWarningAlt />}
        title={<Trans>Testing Instructions</Trans>}
      >
        <ol className="space-y-2">
          {[
            <Trans key="1">
              Click any of the buttons above to trigger different types of
              errors
            </Trans>,
            <Trans key="2">
              Each error type will be caught by the ErrorBoundary component
            </Trans>,
            <Trans key="3">Test the action buttons: Go Back, Go to Home</Trans>,
            <Trans key="4">
              Try the &quot;Report this issue&quot; functionality
            </Trans>,
            <Trans key="5">
              In development mode, you can expand the technical details to see
              stack traces
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
    </TestShell>
  )
}
