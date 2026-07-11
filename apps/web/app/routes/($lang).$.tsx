// Splat catch-all under the optional locale prefix. Any path that doesn't match
// a real route lands here; we throw a 404 so the root ErrorBoundary renders the

import { literal } from '@/lib/i18n'

// existing not-found UI.
export function clientLoader() {
  throw new Response(null, { status: 404, statusText: literal('Not Found') })
}

export default function SplatRoute() {
  return null
}
