import { defineConfig } from '@lynx-js/rspeedy'

import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin'
import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin'
import { pluginTypeCheck } from '@rsbuild/plugin-type-check'

export default defineConfig({
  plugins: [
    pluginQRCode({
      schema(url) {
        // We use `?fullscreen=true` to open the page in LynxExplorer in full screen mode
        return `${url}?fullscreen=true`
      },
    }),
    pluginReactLynx(),
    pluginTypeCheck(),
  ],
  resolve: {
    alias: {
      // Allows shared hooks (src/hooks/) to import from 'react'
      // and have it resolved to '@lynx-js/react' in the Lynx build
      react: '@lynx-js/react',
    },
  },
  // Emit both bundles: main.lynx.bundle (native runtimes via LynxExplorer)
  // and main.web.bundle (renderable in a browser via @lynx-js/web-core).
  environments: {
    lynx: {},
    web: {},
  },
})
