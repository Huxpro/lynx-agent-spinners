import { fileURLToPath } from 'node:url'

import { defineConfig } from '@lynx-js/rspeedy'

import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin'
import { pluginVueLynx } from 'vue-lynx/plugin'

// The shared rendering layer (../../src/vue/) lives at the repo root, outside
// this app's node_modules, so bare `vue` / `vue-lynx` imports from there can't
// be resolved by walking up the tree. Add this app's node_modules to the
// resolver's search paths so shared code resolves the same packages the app does.
const appNodeModules = fileURLToPath(new URL('./node_modules', import.meta.url))

export default defineConfig({
  tools: {
    rspack: {
      resolve: {
        modules: [appNodeModules, 'node_modules'],
      },
    },
  },
  plugins: [
    pluginQRCode({
      schema(url) {
        // We use `?fullscreen=true` to open the page in LynxExplorer in full screen mode
        return `${url}?fullscreen=true`
      },
    }),
    pluginVueLynx({
      optionsApi: false,
      enableCSSInlineVariables: true,
      enableCSSInheritance: true,
    }),
  ],
  // Emit both bundles: main.lynx.bundle (native runtimes via LynxExplorer)
  // and main.web.bundle (renderable in a browser via @lynx-js/web-core).
  environments: {
    lynx: {},
    web: {},
  },
})
