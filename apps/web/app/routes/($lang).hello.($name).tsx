import { Trans, useLingui } from '@lingui/react/macro'
import { NavLink, redirect, useNavigate } from 'react-router'
import CarbonPedestrian from '~icons/carbon/pedestrian'
import { TheFooter } from '@/components/TheFooter'
import type { Route } from './+types/($lang).hello.($name)'

// A bare `/hello` (no name) has nothing to greet — send the visitor to the
// home page where they can enter a name. Preserves the locale prefix.
export function clientLoader({ params }: Route.ClientLoaderArgs) {
  if (!params.name) {
    throw redirect('/')
  }
  return null
}

export default function Hi({ params }: Route.ComponentProps) {
  const { t } = useLingui()
  const navigate = useNavigate()
  const name = params.name ?? ''

  return (
    <main className="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
      <CarbonPedestrian className="text-5xl mx-auto text-teal-600" />

      <p className="text-xl mt-4">
        <Trans>Hi, {name}!</Trans>
      </p>

      <p className="text-sm opacity-75 mt-2">
        <em>
          <Trans>Demo of dynamic route</Trans>
        </em>
      </p>

      <div>
        <button
          className="btn m-3 mt-6"
          onClick={() => navigate(-1)}
          type="button"
        >
          <Trans>Back</Trans>
        </button>
        <NavLink className="btn" to="/">
          {t`Home`}
        </NavLink>
      </div>

      <TheFooter />
    </main>
  )
}
