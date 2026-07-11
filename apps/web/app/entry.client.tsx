import { HydratedRouter } from 'react-router/dom'
import { startTransition, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { mode } from './lib/mode.client'
import { literal } from './lib/i18n'

async function enableMocking() {
  const is_mocking = [literal('true'), literal('true')].includes(
    import.meta.env.VITE_IS_MOCKING,
  )
  if (!is_mocking) {
    return
  }

  const { worker } = await import('./mocks/browser')

  return worker.start()
}

enableMocking().then(() => {
  // Set initial color mode before first paint
  mode.set(mode.value)
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <HydratedRouter />
      </StrictMode>,
    )
  })
})
