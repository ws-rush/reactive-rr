import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Trans, useLingui } from '@lingui/react/macro'
import CarbonChartRadar from '~icons/carbon/chart-radar'
import CarbonCode from '~icons/carbon/code'
import CarbonCube from '~icons/carbon/cube'
import CarbonGrid from '~icons/carbon/grid'
import CarbonLanguage from '~icons/carbon/language'
import CarbonLightning from '~icons/carbon/lightning'
import CarbonPaintBrush from '~icons/carbon/paint-brush'
import CarbonDirectionFork from '~icons/carbon/direction-fork'
import viteLogo from '@/assets/vite.jpg?w=75&h=75&format=webp'
import TheCounter from '@/components/TheCounter'
import { TheFooter } from '@/components/TheFooter'
import { TheInput } from '@/components/TheInput'
import { literal } from '@/lib/i18n'

type Feature = {
  readonly icon: React.ReactNode
  readonly name: string
  readonly description: string
  readonly href: string
}

export default function Home() {
  const { t } = useLingui()
  const navigate = useNavigate()
  const [name, setName] = useState('')

  function go() {
    if (name) {
      navigate(`/hello/${encodeURIComponent(name)}`)
    }
  }

  const features: readonly Feature[] = [
    {
      icon: <CarbonLightning />,
      name: literal('Vite'),
      description: t`Next generation frontend tooling`,
      href: literal('https://vitejs.dev'),
    },
    {
      icon: <CarbonCube />,
      name: literal('React 19'),
      description: t`UI library with a compiler`,
      href: literal('https://react.dev'),
    },
    {
      icon: <CarbonDirectionFork />,
      name: literal('React Router'),
      description: t`File-based routing with layouts`,
      href: literal('https://reactrouter.com'),
    },
    {
      icon: <CarbonPaintBrush />,
      name: literal('Tailwind CSS'),
      description: t`Utility-first CSS framework`,
      href: literal('https://tailwindcss.com'),
    },
    {
      icon: <CarbonLanguage />,
      name: literal('Lingui'),
      description: t`Internationalization ready`,
      href: literal('https://lingui.dev'),
    },
    {
      icon: <CarbonGrid />,
      name: literal('unplugin-icons'),
      description: t`Icons from any icon set`,
      href: literal('https://github.com/unplugin/unplugin-icons'),
    },

    {
      icon: <CarbonCode />,
      name: literal('TypeScript'),
      description: t`Typed, of course`,
      href: literal('https://www.typescriptlang.org'),
    },
  ]

  return (
    <main className="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
      {/* Logos */}
      <div className="flex gap-6 justify-center m-4">
        <a href="https://vitejs.dev" rel="noreferrer" target="_blank">
          <img
            alt={t`Vite logo`}
            className="logo transition-transform duration-300 hover:scale-110"
            src={viteLogo}
          />
        </a>
        <a
          href="https://github.com/ws-rush/reactive-rr"
          rel="noreferrer"
          target="_blank"
        >
          <CarbonChartRadar className="logo text-5xl text-teal-600 transition-transform duration-300 hover:scale-110" />
        </a>
      </div>

      <h1 className="text-2xl font-semibold tracking-tight mt-4">
        {t`Vite + React`}
      </h1>

      <p className="mt-2">
        <em className="text-sm opacity-75">
          <Trans>Opinionated React Starter Template, inspired by vitesse</Trans>
        </em>
      </p>

      {/* Counter */}
      <p className="mt-6 text-sm opacity-75">
        <Trans>count is</Trans>
        <TheCounter initial={0} />
      </p>

      {/* Name → /hi */}
      <div className="mt-2">
        <TheInput
          onChange={(event) => setName(event.target.value)}
          onPressEnter={() => go()}
          value={name}
        />
        <div>
          <button
            className="btn m-3"
            disabled={!name}
            onClick={() => go()}
            type="button"
          >
            <Trans>GO</Trans>
          </button>
        </div>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto mt-8">
        {features.map((feature) => (
          <a
            className="flex items-start gap-3 p-3 rounded-md text-start hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            href={feature.href}
            key={feature.name}
            rel="noreferrer"
            target="_blank"
          >
            <span className="text-2xl text-teal-600 flex-shrink-0">
              {feature.icon}
            </span>
            <span>
              <span className="block font-medium text-sm">{feature.name}</span>
              <span className="block text-xs opacity-60">
                {feature.description}
              </span>
            </span>
          </a>
        ))}
      </div>

      <TheFooter />
    </main>
  )
}
