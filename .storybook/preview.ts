import type { Preview } from '@storybook/sveltekit'
import '../src/routes/layout.css'
import '@fontsource/vt323'
import '@fontsource-variable/handjet'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: '#1E2939' },
        light: { name: 'Light', value: '#F9FAFB' },
      },
    },
    initialGlobals: {
      backgrounds: { value: 'light' },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
}

export default preview
