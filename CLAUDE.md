# Project Instructions

Read `AGENTS.md` for project overview, general rules, and ralph-loop protocol.
Read `docs/LYNX_PORT.md` for the Lynx port architecture, constraints, and implementation order.
Read `tasks/prd-lynx-port.md` for the step-by-step PRD (10 user stories, US-001 → US-010).

## Key Constraints

- Spinner data (frames, intervals) is the single source of truth in `src/data/`. Never duplicate it.
- The animation hook in `src/hooks/` is shared between platforms via build-time alias. Import from `'react'`, not `'@lynx-js/react'`.
- Only `src/react-native/` and `src/lynx/` contain platform-specific rendering code. If you're about to create a platform-specific file elsewhere, reconsider.
- Verify visually in the demo app after every change. `pnpm build` passing is not sufficient.
