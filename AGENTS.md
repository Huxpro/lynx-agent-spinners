# Agent Instructions for expo-agent-spinners

## Project Overview

A cross-platform library of 54 terminal-style text spinners (braille, ASCII, arrows, emoji).
Originally built for React Native/Expo, now being ported to support LynxJS (ReactLynx) as well.

## Key Documents

- `docs/LYNX_PORT.md` — Architecture: shared layers, platform boundaries, decision log
- `tasks/prd-lynx-port.md` — PRD: 10 sequential user stories (US-001 → US-010) for the Lynx port

## General Rules

- Follow the engineering principles in the user's global `~/.claude/CLAUDE.md`.
- Do not change code without a concrete, reproducible reason.
- Verify changes end-to-end (build the demo, visually confirm), not just compile.

## Ralph Loop Protocol

When running as a ralph-loop iteration:

1. **Read** `tasks/prd-lynx-port.md` to understand the full plan.
2. **Scan** the repo to determine which stories are already completed:
   - Check if `src/data/` exists and has files → US-002 may be done
   - Check if `src/hooks/useSpinnerFrame.ts` exists → US-003 may be done
   - Check if `src/lynx/Spinner.tsx` exists → US-004 may be done
   - Check if `apps/lynx/src/App.tsx` has the full demo layout → US-005 may be done
   - Count named exports in `src/lynx/index.ts` to determine US-006 through US-009 progress
3. **Pick** the first incomplete story. Do NOT skip ahead.
4. **Execute** that single story completely, following its acceptance criteria exactly.
5. **Verify** by running `pnpm build` in `apps/lynx/`. If it fails, fix before moving on.
6. **Commit** with message: `lynx-port: US-XXX <story title>`
7. **If all 10 stories are complete**, output `<promise>LYNX PORT COMPLETE</promise>`.

### Rules for each iteration

- **One story per iteration.** Do not attempt multiple stories in one pass.
- **Do not modify existing RN code** in `src/components/spinners/` or `App.tsx`. The RN side is read-only reference.
- **Frame data must be byte-identical** to the originals. Copy, do not retype.
- **When in doubt, read `docs/LYNX_PORT.md`** for architectural decisions.
