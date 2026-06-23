# AGENTS.md

You are an expert in JavaScript, Vue 3, Rspeedy, and Lynx application development.
You write maintainable, performant, and accessible code.

## Read in Advance

Read the docs below to understand the libraries and frameworks this project
depends on.

- Vue Lynx: <https://vue.lynxjs.org> — Develop Lynx with Vue 3 (Composition API,
  Single-File Components, reactivity). **REQUIRED** for any Vue Lynx task.
- Lynx: [llms.txt](https://lynxjs.org/next/llms.txt) — entry point to all Lynx
  docs (elements, styling, dual-thread model).

## How this app relates to the shared core

This app renders the shared spinner catalogue with Vue instead of React.

- Spinner data (`src/data/`) is reused as-is — it is the single source of truth.
- The Vue rendering layer lives in `src/vue/` (`Spinner.vue` + `useSpinnerFrame`
  composable), mirroring `src/lynx/` (ReactLynx) and `src/react-native/`.
- Only the rendering/animation layer forks per platform; never duplicate frame
  data.

## Commands

- `pnpm dev` - Start the dev server

- `pnpm build` - Build the app for production

- `pnpm preview` - Preview the production build locally

- `pnpm exec rspeedy inspect` - Inspect the Rspeedy and Rspack config.

## Related Docs

- Rsbuild: <https://rsbuild.rs/llms.txt>

- Rspack: <https://rspack.rs/llms.txt>
