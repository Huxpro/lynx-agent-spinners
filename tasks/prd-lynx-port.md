# PRD: Port expo-agent-spinners to LynxJS

## Introduction

Port the existing 54-spinner React Native/Expo library to LynxJS (ReactLynx) using a shared-core architecture. The core spinner data and animation hook are shared between platforms; only the thin rendering layer is forked. The full architecture is documented in `docs/LYNX_PORT.md`.

## Goals

- All 54 spinners render correctly in LynxExplorer, visually matching the Expo version
- Demo app is an exact clone of the Expo demo (dark theme, 5-column grid, category tabs, all 54 spinners)
- Spinner data definitions (`src/data/`) are the single source of truth — no duplication
- Animation hook (`src/hooks/useSpinnerFrame.ts`) is shared via build-time alias
- Platform-specific rendering is isolated to `src/lynx/` (one `Spinner.tsx` + one `index.ts`)

## Success Metrics

- Screenshot comparison: each of the 54 spinners visually matches its Expo counterpart (character, color, size, animation speed)
- Demo app layout matches: header, tab bar, 5-column grid, dark background
- `pnpm build` produces a valid `.lynx.bundle`
- Shared code (`src/data/`, `src/hooks/`) has zero Lynx-specific or RN-specific imports

---

## User Stories

Stories are ordered as a dependency chain. Each story MUST be fully completed and verified before starting the next. An agent loop should execute one story per iteration.

---

### US-001: Project Scaffolding

**Description:** As a developer, I need the Lynx project structure and build tooling in place so I can start building components.

**What to do:**

1. Run `npm create rspeedy@latest` to scaffold a new ReactLynx project inside `apps/lynx/`
2. Create the shared directories: `src/data/`, `src/hooks/`
3. Create the platform directory: `src/lynx/`
4. Configure `apps/lynx/lynx.config.js`:
   - Add `pluginReactLynx`
   - Add `source.alias: { 'react': '@lynx-js/react' }` so shared hooks work
   - Set `engineVersion` to latest stable (3.7)
5. Ensure the scaffolded hello-world app builds and runs

**Acceptance Criteria:**
- [ ] Directory structure exists: `src/data/`, `src/hooks/`, `src/lynx/`, `apps/lynx/`
- [ ] `apps/lynx/lynx.config.js` has `react` → `@lynx-js/react` alias configured
- [ ] `cd apps/lynx && pnpm install && pnpm build` succeeds with no errors
- [ ] Default hello-world page renders in LynxExplorer (screenshot for baseline)

---

### US-002: Shared Data Layer — Extract All 54 Spinner Definitions

**Description:** As a developer, I need all spinner frame data extracted into a shared, platform-agnostic data layer so both RN and Lynx can consume from a single source of truth.

**What to do:**

1. Create `src/data/types.ts` with the `SpinnerDefinition` interface:
   ```ts
   export interface SpinnerDefinition {
     readonly name: string;
     readonly frames: readonly string[];
     readonly interval: number;
     readonly category: 'braille' | 'ascii' | 'arrows' | 'emoji';
   }
   ```
2. For each of the 54 existing spinner files in `src/components/spinners/*.tsx`, extract the `FRAMES` array, `INTERVAL` value, and category into a corresponding file in `src/data/`. The file name and export name should match the original (e.g., `src/data/dots.ts` exports `dots`).
3. Create `src/data/index.ts` that:
   - Re-exports all 54 definitions by name
   - Exports categorized arrays: `BRAILLE_SPINNERS`, `ASCII_SPINNERS`, `ARROWS_SPINNERS`, `EMOJI_SPINNERS`
   - Exports `ALL_SPINNERS` (flat array of all 54)
   - Exports `CATEGORIES` array matching the structure in the current `App.tsx` (lines 141-146)

**Category assignments (reference the current App.tsx lines 74-139):**

- **braille** (28): dots, dots2, dots3, dots4, dots5, dots6, dots7, dots8, dots9, dots10, dots11, dots12, dots13, dots14, sand, bounce, dotsCircle, wave, scan, rain, pulse, snake, sparkle, cascade, columns, orbit, breathe, waverows, checkerboard, helix, fillsweep, diagswipe
- **ascii** (15): dqpb, rollingLine, simpleDots, simpleDotsScrolling, arc, balloon, circleHalves, circleQuarters, point, squareCorners, toggle, triangle, growHorizontal, growVertical, noise
- **arrows** (2): arrow, doubleArrow
- **emoji** (6): hearts, clock, earth, moon, speaker, weather

**Note:** The `name` field in each definition must match the display name used in the Expo demo's `SpinnerEntry` (e.g., `"dots"`, `"dots2"`, `"dots_circle"`, `"rolling_line"`). Cross-reference `App.tsx` lines 74-139 for exact names.

**Acceptance Criteria:**
- [ ] `src/data/types.ts` exists with `SpinnerDefinition` interface
- [ ] 54 individual data files exist in `src/data/` (one per spinner)
- [ ] `src/data/index.ts` exports all 54 definitions + category arrays + ALL_SPINNERS
- [ ] Each data file has zero React or platform imports — pure TypeScript only
- [ ] Frame arrays are byte-for-byte identical to the originals in `src/components/spinners/*.tsx`
- [ ] TypeScript compiles with no errors: `npx tsc --noEmit` on the data files

**Verification:** For each of the 54 spinners, diff the FRAMES array in `src/data/<name>.ts` against the original in `src/components/spinners/<name>.tsx`. They must be identical.

---

### US-003: Shared Animation Hook

**Description:** As a developer, I need the `useSpinnerFrame` hook shared between platforms so animation logic is not duplicated.

**What to do:**

1. Create `src/hooks/useSpinnerFrame.ts`:
   ```ts
   import { useState, useEffect } from 'react';

   export function useSpinnerFrame(frames: readonly string[], interval: number): string {
     const [frame, setFrame] = useState(0);
     useEffect(() => {
       const id = setInterval(() => setFrame((i) => (i + 1) % frames.length), interval);
       return () => clearInterval(id);
     }, []);
     return frames[frame];
   }
   ```
2. Create `src/hooks/index.ts` that re-exports the hook.

**Key constraint:** This file imports from `'react'`, NOT from `'@lynx-js/react'`. The Lynx build resolves this via the alias configured in US-001. Do NOT add conditional imports or platform detection.

**Acceptance Criteria:**
- [ ] `src/hooks/useSpinnerFrame.ts` exists, imports from `'react'`
- [ ] `src/hooks/index.ts` re-exports the hook
- [ ] No `@lynx-js/react` import anywhere in `src/hooks/`
- [ ] TypeScript compiles with no errors

---

### US-004: Lynx Renderer + Pilot Spinner (DotsSpinner)

**Description:** As a developer, I need the Lynx rendering component and one working spinner to validate the entire pipeline end-to-end before porting all 54.

**What to do:**

1. Create `src/lynx/Spinner.tsx` — the generic Lynx renderer:
   ```tsx
   import { useSpinnerFrame } from '../hooks/useSpinnerFrame';
   import type { SpinnerDefinition } from '../data/types';

   export interface SpinnerProps {
     definition: SpinnerDefinition;
     size?: number;
     color?: string;
     className?: string;
   }

   export function Spinner({ definition, size = 24, color = '#fff', className }: SpinnerProps) {
     const frame = useSpinnerFrame(definition.frames, definition.interval);
     return (
       <view className={className} style={{ alignItems: 'center', justifyContent: 'center' }}>
         <text style={{ fontSize: `${size}px`, color, textAlign: 'center', lineHeight: `${size * 1.3}px` }}>
           {frame}
         </text>
       </view>
     );
   }
   ```
2. Create `src/lynx/index.ts` with just the DotsSpinner for now:
   ```tsx
   import { Spinner, type SpinnerProps } from './Spinner';
   import { dots } from '../data';

   type NamedSpinnerProps = Omit<SpinnerProps, 'definition'>;
   export function DotsSpinner(props: NamedSpinnerProps) {
     return <Spinner definition={dots} {...props} />;
   }
   ```
3. Update `apps/lynx/src/App.tsx` to render just the DotsSpinner:
   ```tsx
   import { DotsSpinner } from '../../../src/lynx';

   export function App() {
     return (
       <page>
         <view style={{ backgroundColor: '#0a0a0a', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
           <DotsSpinner size={32} color="#D3D3D3" />
         </view>
       </page>
     );
   }
   ```
4. Build and run in LynxExplorer.

**Acceptance Criteria:**
- [ ] `src/lynx/Spinner.tsx` exists with the generic renderer
- [ ] `src/lynx/index.ts` exports `DotsSpinner`
- [ ] `apps/lynx/` builds successfully: `pnpm build` produces `.lynx.bundle`
- [ ] DotsSpinner renders in LynxExplorer: braille character (⠋⠙⠹...) animates at ~80ms
- [ ] **Screenshot comparison:** DotsSpinner in LynxExplorer visually matches DotsSpinner in the Expo app (same character set, similar animation speed, light gray color on dark background)

---

### US-005: Lynx Demo App — Exact Clone of Expo Demo

**Description:** As a developer, I need the Lynx demo app to be a pixel-faithful clone of the Expo demo so we can visually compare all spinners side-by-side.

**What to do:**

Port `App.tsx` (340 lines) to `apps/lynx/src/App.tsx` using ReactLynx equivalents. The demo has these structural components:

1. **Root:** `SafeAreaProvider` → `<page>` element
2. **Header:** Title text "Agent Spinners - 54 spinners" (same as Expo)
3. **Tab bar:** Horizontal scrollable tabs: All, Braille, ASCII, Arrows, Emoji
   - `<ScrollView horizontal>` → `<scroll-view scroll-direction="horizontal">`
   - `<Pressable onPress={...}>` → `<view bindtap={...}>`
   - Active tab styling: white text + brighter background
4. **Content grid:** Vertical scrollable area with spinner cells
   - `<ScrollView>` → `<scroll-view>`
   - 5-column flex-wrap grid with gap
   - Each cell: spinner name (text, small, gray) + spinner component
5. **Styling:** Extract all `StyleSheet.create()` styles to `apps/lynx/src/App.css` (or `.scss`)

**Style mappings (reference original `App.tsx` lines 244-339):**

| RN Style | Lynx CSS |
|---|---|
| `backgroundColor: "#0a0a0a"` | `background-color: #0a0a0a` |
| `fontSize: 28, fontWeight: "700"` | `font-size: 28px; font-weight: 700` |
| `borderBottomWidth: StyleSheet.hairlineWidth` | `border-bottom: 0.5px solid rgba(255,255,255,0.08)` |
| `borderRadius: 20` | `border-radius: 20px` |
| `width: "20%", flexGrow: 1` | `width: 20%; flex-grow: 1` |
| `gap: 8` | `gap: 8px` |
| `flexDirection: "row", flexWrap: "wrap"` | `flex-direction: row; flex-wrap: wrap` |

**Important:** For this story, wire up ALL 54 spinners (even though only DotsSpinner was created in US-004). The demo app should import from `src/lynx/index.ts`, which will be populated with all spinners in US-006 through US-009. For now, stub the remaining 53 exports as the DotsSpinner so the demo builds and the grid layout is correct. Mark the stubs clearly with a `// TODO: replace with actual spinner data` comment.

**Acceptance Criteria:**
- [ ] `apps/lynx/src/App.tsx` implements the full demo layout (header + tabs + grid)
- [ ] `apps/lynx/src/App.css` (or `.scss`) contains all styles ported from the RN `StyleSheet`
- [ ] Tab filtering works: tapping "Braille" shows only braille spinners, "All" shows all
- [ ] Grid renders 5 columns with correct spacing
- [ ] `pnpm build` succeeds
- [ ] **Screenshot comparison:** Demo app layout in LynxExplorer matches Expo app (header position, tab bar, grid spacing, dark background, cell shape). Spinner content may differ for stubs — that's expected.

---

### US-006: Clone Braille Spinners (28 spinners)

**Description:** As a developer, I need all 28 braille spinner definitions wired into the Lynx renderer so they render correctly.

**What to do:**

1. Verify the 28 braille data files exist in `src/data/` (created in US-002):
   `dots, dots2, dots3, dots4, dots5, dots6, dots7, dots8, dots9, dots10, dots11, dots12, dots13, dots14, sand, bounce, dotsCircle, wave, scan, rain, pulse, snake, sparkle, cascade, columns, orbit, breathe, waverows, checkerboard, helix, fillsweep, diagswipe`

2. Update `src/lynx/index.ts` to add named exports for all 28 braille spinners:
   ```tsx
   export function SandSpinner(props: NamedSpinnerProps) {
     return <Spinner definition={sand} {...props} />;
   }
   // ... repeat for all 28
   ```

3. Remove the TODO stubs for braille spinners in the demo app.

4. Build and visually verify each spinner in LynxExplorer.

**Acceptance Criteria:**
- [ ] `src/lynx/index.ts` exports all 28 braille spinners by name
- [ ] Demo app shows all 28 braille spinners in the "Braille" tab
- [ ] `pnpm build` succeeds
- [ ] **Screenshot comparison:** Switch to "Braille" tab in both Expo and Lynx. For each of the 28 spinners:
  - Same Unicode character set is displayed
  - Animation cycles at the same apparent speed
  - Characters render without tofu/missing glyph boxes

**Spinners to verify individually (high risk — multi-character frames):**
- `waverows` (4-char wide frames)
- `checkerboard` (3-char wide frames)
- `helix` (4-char wide frames)
- `fillsweep`, `diagswipe` (multi-char)

---

### US-007: Clone ASCII Spinners (15 spinners)

**Description:** As a developer, I need all 15 ASCII spinner definitions wired into the Lynx renderer.

**What to do:**

1. Verify the 15 ASCII data files exist in `src/data/`:
   `dqpb, rollingLine, simpleDots, simpleDotsScrolling, arc, balloon, circleHalves, circleQuarters, point, squareCorners, toggle, triangle, growHorizontal, growVertical, noise`

2. Update `src/lynx/index.ts` to add named exports for all 15 ASCII spinners.

3. Remove the TODO stubs for ASCII spinners in the demo app.

4. Build and visually verify.

**Acceptance Criteria:**
- [ ] `src/lynx/index.ts` exports all 15 ASCII spinners by name
- [ ] Demo app shows all 15 ASCII spinners in the "ASCII" tab
- [ ] `pnpm build` succeeds
- [ ] **Screenshot comparison:** Switch to "ASCII" tab in both Expo and Lynx. All 15 spinners render the same characters and animate at the same speed.

**Spinners to verify individually (high risk — multi-character or block elements):**
- `growHorizontal` (▏▎▍▌▋▊▉ block characters)
- `growVertical` (similar block characters)
- `noise` (▓▒░ shade characters)
- `simpleDots` / `simpleDotsScrolling` (multi-dot frames)

---

### US-008: Clone Arrow Spinners (2 spinners)

**Description:** As a developer, I need both arrow spinners wired into the Lynx renderer.

**What to do:**

1. Verify data files exist: `src/data/arrow.ts`, `src/data/doubleArrow.ts`
2. Update `src/lynx/index.ts` to export `ArrowSpinner` and `DoubleArrowSpinner`
3. Remove TODO stubs in the demo app.
4. Build and visually verify.

**Acceptance Criteria:**
- [ ] `src/lynx/index.ts` exports `ArrowSpinner` and `DoubleArrowSpinner`
- [ ] Demo app shows both in the "Arrows" tab
- [ ] `pnpm build` succeeds
- [ ] **Screenshot comparison:** Arrow characters (←↖↑↗→↘↓↙) render correctly, animation matches Expo

---

### US-009: Clone Emoji Spinners (6 spinners)

**Description:** As a developer, I need all 6 emoji spinners wired into the Lynx renderer. Emoji rendering is platform-dependent, so this story requires extra verification.

**What to do:**

1. Verify data files exist: `src/data/hearts.ts`, `src/data/clock.ts`, `src/data/earth.ts`, `src/data/moon.ts`, `src/data/speaker.ts`, `src/data/weather.ts`
2. Update `src/lynx/index.ts` to export all 6 emoji spinners.
3. Remove TODO stubs in the demo app.
4. Build and visually verify on each available platform.

**Acceptance Criteria:**
- [ ] `src/lynx/index.ts` exports all 6 emoji spinners by name
- [ ] Demo app shows all 6 in the "Emoji" tab
- [ ] `pnpm build` succeeds
- [ ] **Screenshot comparison:** Each emoji spinner renders actual emoji glyphs (not tofu boxes) on at least iOS and Android. Verify:
  - `moon`: 🌑🌒🌓🌔🌕🌖🌗🌘 all render as distinct moon phases
  - `hearts`: 🩷🧡💛💚💙🩵💜🤎🖤🩶🤍 all render as distinct colored hearts
  - `weather`: ☀️🌤⛅️🌥☁️🌧🌨⛈ all render as distinct weather icons
  - `clock`, `earth`, `speaker`: emoji cycle correctly

**If emoji do not render on a specific platform:** Document which platform and which emoji fail. This is a known risk (see `docs/LYNX_PORT.md` Risks section). Do NOT block on this — file it as a known issue and move on.

---

### US-010: Final Verification & Cleanup

**Description:** As a developer, I need to do a final pass to ensure everything is wired correctly, no stubs remain, and the demo is complete.

**What to do:**

1. Verify `src/lynx/index.ts` exports exactly 54 named spinners (count them).
2. Verify `src/data/index.ts` exports exactly 54 definitions and the category arrays are correct.
3. Verify the demo app's "All" tab shows all 54 spinners.
4. Remove any remaining TODO stubs or placeholder code.
5. Run a full build: `cd apps/lynx && pnpm build`
6. Do a final side-by-side screenshot comparison of the full "All" tab: Expo vs Lynx.

**Acceptance Criteria:**
- [ ] `src/lynx/index.ts` has exactly 54 named spinner exports — no more, no less
- [ ] `src/data/index.ts` has exactly 54 data exports
- [ ] No TODO comments remain in `src/lynx/` or `apps/lynx/`
- [ ] Demo app "All" tab renders all 54 spinners in the correct order (matching Expo)
- [ ] `pnpm build` succeeds with no warnings
- [ ] **Final screenshot comparison:** Full "All" tab in LynxExplorer matches Expo app — same spinner count, same grid layout, same visual appearance

---

## Functional Requirements

- FR-1: All spinner data lives in `src/data/` — pure TypeScript, no platform imports
- FR-2: The animation hook in `src/hooks/useSpinnerFrame.ts` imports from `'react'` and is shared via build alias
- FR-3: `src/lynx/Spinner.tsx` is the single rendering component for all Lynx spinners
- FR-4: Each of the 54 spinners is exported as a named component (e.g., `DotsSpinner`) from `src/lynx/index.ts`
- FR-5: The Lynx demo app (`apps/lynx/`) replicates the Expo demo: dark theme, header, horizontal tab bar, 5-column grid
- FR-6: Tab filtering works correctly: "All" shows 54, "Braille" shows 28, "ASCII" shows 15, "Arrows" shows 2, "Emoji" shows 6
- FR-7: `apps/lynx/lynx.config.js` uses `source.alias` to map `'react'` → `'@lynx-js/react'`

## Non-Goals

- Retrofitting the existing RN side to use the shared core (separate future PRD)
- Publishing to npm (out of scope for this port)
- Automated testing / unit tests (visual screenshot comparison is the verification method)
- HarmonyOS-specific optimizations
- Performance optimization of timer intervals

## Technical Considerations

- **Build tool:** Rspeedy (`@lynx-js/rspeedy`) with Rspack
- **Import aliasing:** `react` → `@lynx-js/react` in Rspeedy config — this is how shared hooks work
- **CSS units:** Lynx requires explicit units (`'24px'` not `24`). All RN unitless numbers must get `px` suffix.
- **Elements:** `<view>` and `<text>` are intrinsic elements in Lynx (lowercase, not imported)
- **Events:** `bindtap` replaces `onPress`
- **Scrolling:** `<scroll-view>` replaces `<ScrollView>`, with `scroll-direction` attribute for horizontal
- **Safe area:** `<page>` element replaces `SafeAreaProvider`
- **No `document`/`window`:** Lynx has no DOM. Do not use any DOM-dependent code.

## Open Questions

- Will `StyleSheet.hairlineWidth` (0.5px) render correctly on all Lynx platforms?
- Does Lynx `<text>` handle `textTransform: "uppercase"` (used in section titles)? If not, transform in JS.
- What is the precise behavior of `gap` in Lynx's flexbox? (Supported since Lynx 2.14 — should work)
