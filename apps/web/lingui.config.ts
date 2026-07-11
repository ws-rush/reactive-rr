import { type LinguiConfig } from '@lingui/conf'
import { formatter } from '@lingui/format-po'

const config: LinguiConfig = {
  catalogs: [
    {
      exclude: ['**/app/locales', '**/app/*-env.d.ts'],
      include: ['app'],
      path: 'app/locales/{locale}',
    },
  ],
  fallbackLocales: {
    default: 'en',
  },
  format: formatter(),
  locales: ['en', 'ar'],
  sourceLocale: 'en',
}

export default config
