import {
  createLinguiRouter,
  clientDetectors,
  clientPersistence,
} from 'lingui-rr'

/**
 * Identity marker for strings that should NOT be translated.
 * Usage: literal('url-prefix') — returns the value as-is while keeping it
 * out of .po catalogs and making the intent explicit.
 * Preserves the literal type, so `literal('url-prefix')` is typed as 'url-prefix'.
 */
export const literal = <const T extends string>(value: T): T => value

export const localeMetadata = {
  ar: { label: literal('العربية'), dir: literal('rtl') },
  en: { label: literal('English'), dir: literal('ltr') },
} as const

export const defaultLocale = literal('en')

export const i18n = createLinguiRouter({
  server: false,
  mode: literal('url-prefix'),
  locales: localeMetadata,
  prefixDefaultLocale: false,
  defaultLocale,
  detection: [
    clientDetectors.cookie(literal('locale')),
    clientDetectors.navigator(),
  ],
  persistence: [clientPersistence.cookie(literal('locale'))],
  ignorePaths: [
    /^\/assets\//,
    /^\/build\//,
    /^\/favicon\.ico$/,
    /^\/favicon\.svg$/,
    /^\/favicon-dark\.svg$/,
    /^\/robots\.txt$/,
    /^\/sitemap\.xml$/,
    /^\/manifest\.webmanifest$/,
    /^\/api\//,
    /^\/change-locale$/,
  ],
  catalogs: {
    ar: () => import('../locales/ar.po'),
    en: () => import('../locales/en.po'),
  },
})
