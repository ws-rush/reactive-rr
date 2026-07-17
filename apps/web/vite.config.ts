/// <reference types="vite/client" />

import { lingui } from '@lingui/vite-plugin'
import { defineConfig } from 'vite'
import Icons from 'unplugin-icons/vite'
import { imagetools } from 'vite-imagetools'
import { reactRouter } from '@react-router/dev/vite'
import macrosPlugin from 'vite-plugin-babel-macros'
import { ValidateEnv } from '@julr/vite-plugin-validate-env'
import tailwindcss from '@tailwindcss/vite'
import babel from 'vite-plugin-babel'
import Unfonts from 'unplugin-fonts/vite'

const ReactCompilerConfig = {/* ... */}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: { alias: { '@': '/app' } },

  plugins: [
    // valiadte .env variables, see https://github.com/Julien-R44/vite-plugin-validate-env
    ValidateEnv({}),
    tailwindcss(),
    reactRouter(),
    macrosPlugin(),
    lingui(),
    Icons({
      autoInstall: true,
      compiler: 'jsx',
      jsx: 'react',
      defaultStyle: 'vertical-align: middle;',
      defaultClass: 'inline-block',
    }),
    babel({
      filter: /^(?:.*\/app\/.*|~icons\/.*)\.[jt]sx?$/,
      babelConfig: {
        presets: [
          '@babel/preset-typescript',
          ['@babel/preset-react', { runtime: 'automatic' }],
        ],
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
    // add `declare module "@/assets/*"` to vite-env.d.ts to use with typescript
    imagetools(),
    Unfonts({
      custom: {
        families: [
          {
            name: 'Expo Arabic',
            local: 'Expo Arabic',
            src: './app/assets/fonts/*.woff2',
          },
        ],
        display: 'swap',
        preload: true,
      },
    }),
  ].filter(Boolean),
})
