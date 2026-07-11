import { literal } from '@/lib/i18n'
import { Trans } from '@lingui/react/macro'
import { useEffect } from 'react'
import CarbonCheckmarkOutline from '~icons/carbon/checkmark-outline'
import CarbonCode from '~icons/carbon/code'
import CarbonWarningAlt from '~icons/carbon/warning-alt'
import { TestCard, TestShell } from '@/components/test-shell'

const CODE_BLOCK = literal(
  'block text-xs bg-neutral-100 dark:bg-white/5 p-3 rounded-lg overflow-x-auto font-mono text-gray-700 dark:text-gray-300 whitespace-pre',
)

export default function TestLoaderErrorRoute() {
  useEffect(() => {
    // Simulate a data loading error in SPA mode
    throw new Error(literal('Failed to load data: Record Not Found (404)'))
  }, [])

  return (
    <TestShell
      title={<Trans>Loader Error Test Route</Trans>}
      intro={
        <Trans>
          This route simulates a data loading error that occurs during component
          initialization
        </Trans>
      }
    >
      <TestCard
        icon={<CarbonWarningAlt />}
        title={<Trans>Data Loading Error Simulation</Trans>}
      >
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          <Trans>
            This page demonstrates what happens when an error occurs during data
            loading in SPA mode.
          </Trans>
        </p>

        <div className="space-y-2 text-xs text-gray-700 dark:text-gray-300">
          <div className="flex items-start gap-3">
            <span className="text-teal-600 dark:text-teal-400 font-semibold">
              {literal('!')}
            </span>
            <span>
              <strong>
                <Trans>Error Type</Trans>:
              </strong>{' '}
              <Trans>Data Loading Error (404)</Trans>
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-teal-600 dark:text-teal-400 font-semibold">
              {literal('!')}
            </span>
            <span>
              <strong>
                <Trans>Trigger</Trans>:
              </strong>{' '}
              <Trans>Component useEffect hook</Trans>
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-teal-600 dark:text-teal-400 font-semibold">
              {literal('!')}
            </span>
            <span>
              <strong>
                <Trans>Result</Trans>:
              </strong>{' '}
              <Trans>
                ErrorBoundary catches and displays user-friendly error
              </Trans>
            </span>
          </div>
        </div>
      </TestCard>

      <TestCard
        icon={<CarbonCode />}
        title={<Trans>SPA Mode vs SSR Mode</Trans>}
      >
        <div className="space-y-3">
          <div>
            <h4 className="text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">
              <Trans>SPA Mode (Current Implementation):</Trans>
            </h4>
            <pre className={CODE_BLOCK}>
              {literal(`useEffect(() => {
  // Simulate data loading error
  throw new Error('Failed to load data: Record Not Found (404)');
}, []);`)}
            </pre>
          </div>
          <div>
            <h4 className="text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">
              <Trans>SSR Mode (React Router Loader):</Trans>
            </h4>
            <pre className={CODE_BLOCK}>
              {literal(`export async function loader({ params }) {
  try {
    let record = await fakeDb.getRecord(params.id);
    if (!record) {
      throw new Response('Record Not Found', { status: 404 });
    }
    return record;
  } catch (error) {
    throw new Response('Data loading failed', { status: 500 });
  }
}`)}
            </pre>
          </div>
        </div>
      </TestCard>

      <TestCard
        icon={<CarbonCheckmarkOutline />}
        title={<Trans>Error Handling Best Practices</Trans>}
      >
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-3">
            <CarbonCheckmarkOutline className="text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
            <Trans>
              Always wrap data loading in try-catch blocks to handle errors
              gracefully
            </Trans>
          </li>
          <li className="flex items-start gap-3">
            <CarbonCheckmarkOutline className="text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
            <Trans>
              Provide meaningful error messages to help users understand what
              went wrong
            </Trans>
          </li>
          <li className="flex items-start gap-3">
            <CarbonCheckmarkOutline className="text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
            <Trans>
              Include recovery options like retry buttons or alternative
              navigation
            </Trans>
          </li>
        </ul>
      </TestCard>
    </TestShell>
  )
}
