import { literal } from './i18n'

export type Mode = 'system' | 'light' | 'dark'

export const mode = {
  // used for mode event listners
  darkListner({ matches }: { matches: boolean }) {
    document.documentElement.classList.toggle(literal('dark'), matches)
  },

  darkMedia: window.matchMedia(literal('(prefers-color-scheme: dark)')),

  get isDark() {
    return this.value === 'system'
      ? this.darkMedia.matches
      : this.value === 'dark'
  },

  get isPreferdDark() {
    return this.darkMedia.matches
  },

  modes: [literal('system'), literal('light'), literal('dark')] as Mode[],

  set(_mode: Mode) {
    if (_mode === 'system') {
      localStorage.removeItem(literal('mode'))
      this.darkListner({ matches: this.darkMedia.matches })
      this.darkMedia.addEventListener(literal('change'), this.darkListner)
    } else {
      localStorage.mode = _mode
      this.darkListner({ matches: _mode === 'dark' })
      this.darkMedia.removeEventListener(literal('change'), this.darkListner)
    }
  },

  toggleColorMode() {
    const currentMode = mode.value
    if (currentMode === 'system' || currentMode === 'dark')
      mode.set(literal('light'))
    else mode.set(literal('dark'))
  },
  toggleSystemMode() {
    const modes = mode.modes
    const newMode = modes[(modes.indexOf(mode.value) + 1) % modes.length]
    mode.set(newMode)
  },
  get value() {
    return (localStorage.getItem(literal('mode')) || literal('system')) as Mode
  },
}
