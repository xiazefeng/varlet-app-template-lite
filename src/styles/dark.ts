import { Themes } from '@varlet/ui'

export const darkTheme = Themes.toViewport({
  // varlet
  ...Themes.md3Dark,
  '--hsl-secondary': 'var(--hsl-inverse-surface)',
  '--color-secondary': 'hsla(var(--hsl-secondary), 1)',
  '--hsl-tertiary': 'var(--hsl-on-surface-variant)',
  '--color-tertiary': 'hsla(var(--hsl-tertiary), 1)',
  '--color-muted': '264, 5%, 58%',
  '--hsl-muted': 'hsla(var(--color-muted), 1)'
})
