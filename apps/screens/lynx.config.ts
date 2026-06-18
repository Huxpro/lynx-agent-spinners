import { defineConfig } from '@lynx-js/rspeedy'

import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin'
import { pluginTypeCheck } from '@rsbuild/plugin-type-check'

export default defineConfig({
  plugins: [
    pluginReactLynx(),
    pluginTypeCheck(),
  ],
  resolve: {
    alias: {
      react: '@lynx-js/react',
    },
  },
  environments: {
    web: {},
  },
})
