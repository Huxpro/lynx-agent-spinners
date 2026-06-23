# Project Instructions

Read `AGENTS.md` for project overview and general rules.
Read `docs/LYNX_PORT.md` for the Lynx port architecture, constraints, and implementation order.

## Key Constraints

- Spinner data (frames, intervals) is the single source of truth in `src/data/`. Never duplicate it.
- The React animation hook in `src/hooks/` is shared between React Native and ReactLynx via build-time alias. Import from `'react'`, not `'@lynx-js/react'`. The Vue platform forks this as a composable in `src/vue/useSpinnerFrame.ts` (Vue reactivity has no React-equivalent to alias).
- Only `src/react-native/` (React Native), `src/lynx/` (ReactLynx), and `src/vue/` (Vue Lynx) contain platform-specific rendering code. If you're about to create a platform-specific file elsewhere, reconsider.
- Verify visually in the demo app after every change. `pnpm build` passing is not sufficient.
