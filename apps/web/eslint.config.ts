import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import pluginLingui from 'eslint-plugin-lingui'
import { defineConfig } from 'eslint/config'
import gitIgnore from 'eslint-config-flat-gitignore'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  gitIgnore(),
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  reactHooks.configs.flat['recommended-latest'],
  pluginLingui.configs['flat/recommended'],
  {
    // Scope to app source — this matches the catalog `include` in
    // lingui.config.ts, so config/test/build files aren't flagged.
    files: ['app/**/*.{ts,tsx}'],
    rules: {
      // Not in `flat/recommended` because it needs per-project tuning.
      // Surfaced as a warning so existing raw strings are visible without
      // failing the build. Tune with `ignore`/`ignoreNames` as needed, then
      // promote to 'error'. Native DOM attrs are already allow-listed.
      'lingui/no-unlocalized-strings': [
        'warn',
        {
          // CSS class names and inline styles are never translatable. The
          // rule already allow-lists attributes on native DOM tags (e.g.
          // <button className=...>), but custom components such as
          // <CarbonSun className=.../> aren't covered, so ignore the
          // attribute names explicitly everywhere.
          ignoreNames: ['className', 'style', 'method', 'action', 'to'],
          // `literal()` marks strings that are intentionally not
          // translatable (e.g. locale codes, BCP-47 tags, enum-like
          // constants). Any string passed as an argument to it is skipped
          // by the rule. See app/lib/i18n.ts.
          ignoreFunctions: ['literal', 'navigate'],
        },
      ],
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
])
