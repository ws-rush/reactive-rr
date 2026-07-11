import { useLingui } from '@lingui/react/macro'
import { useLinguiRouter } from 'lingui-rr'
import { Form, NavLink, useLocation } from 'react-router'
import CarbonChartRadar from '~icons/carbon/chart-radar'
import CarbonDicomOverlay from '~icons/carbon/dicom-overlay'
import CarbonLanguage from '~icons/carbon/language'
import CarbonLogoGithub from '~icons/carbon/logo-github'
import CarbonMoon from '~icons/carbon/moon'
import CarbonSun from '~icons/carbon/sun'
import { mode } from '@/lib/mode.client'

export function TheFooter() {
  const { t } = useLingui()
  const { locale, locales } = useLinguiRouter()
  const location = useLocation()
  const nextLocale = locales.find((item) => item.code !== locale) ?? locales[0]

  return (
    <nav className="flex gap-4 mt-6 justify-center items-center text-xl">
      <NavLink title={t`Home`} to="/">
        <CarbonChartRadar className="icon-btn" />
      </NavLink>

      <button
        className="icon-btn"
        onClick={() => mode.toggleColorMode()}
        title={t`Toggle dark mode`}
        type="button"
      >
        <CarbonSun className="dark:hidden" />
        <CarbonMoon className="hidden dark:inline-block" />
      </button>

      <Form method="post" action="/change-locale">
        <input
          type="hidden"
          name="redirectTo"
          value={`${location.pathname}${location.search}${location.hash}`}
        />
        <button
          className="icon-btn flex items-center gap-1"
          name="locale"
          title={t`Change language`}
          type="submit"
          value={nextLocale.code}
        >
          <CarbonLanguage />
        </button>
      </Form>

      <NavLink title={t`About`} to="/about">
        <CarbonDicomOverlay className="icon-btn" />
      </NavLink>

      <a
        className="icon-btn"
        href="https://github.com/ws-rush/reactive-rr"
        rel="noreferrer"
        target="_blank"
        title="GitHub"
      >
        <CarbonLogoGithub />
      </a>
    </nav>
  )
}
