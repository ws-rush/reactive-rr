/// <reference types="vite/client" />

declare module '@/assets/*'
declare module '@/content/*'
declare module 'virtual:routes'

declare module '*.po' {
  import { Messages } from '@lingui/core'
  export const messages: Messages
}
