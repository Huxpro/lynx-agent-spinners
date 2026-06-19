# Lynx Port · Architecture & Constraints

## Goal

Port expo-agent-spinners to LynxJS (ReactLynx) while maximizing code reuse with the existing React Native implementation. The shared-core approach is verified feasible (see analysis below).

## Guiding Principles

1. **Share by default, fork only at the rendering boundary.**
   Spinner data, animation logic, and types are shared. Only the thin rendering layer (JSX elements + style format) is platform-specific.

2. **Single source of truth for spinner content.**
   All 54 spinner definitions (frame arrays, intervals, categories) live in `src/data/`. Both platforms consume from here. Never duplicate frame data.

3. **Intentional forking only.**
   Before creating a platform-specific file, ask: "Can this be shared via build-time aliasing or abstraction?" If yes, share it. If not, document WHY it must fork.

4. **Mirror structure across platforms.**
   The `react-native/` and `lynx/` directories should have the same file names and export shapes. This makes it easy to diff, review, and copy patterns between them.

5. **Verify end-to-end, not just compile.**
   Every change must be visually confirmed in the demo app. Unicode rendering (braille, emoji) and animation timing can behave differently across platforms; build and run, don't just typecheck.

---

## Architecture: Three Layers

```
src/
├── data/                        # LAYER 1 · Shared (100%)
│   ├── types.ts                 # SpinnerDefinition type
│   ├── dots.ts                  # { frames: [...], interval: 80, category: 'braille' }
│   ├── moon.ts                  # { frames: [...], interval: 80, category: 'emoji' }
│   ├── ... (54 spinner defs)
│   └── index.ts                 # barrel export + SPINNER_REGISTRY
│
├── hooks/                       # LAYER 2 · Shared (via build alias)
│   └── useSpinnerFrame.ts       # useState/useEffect/setInterval hook
│                                # imports from 'react'; aliased to '@lynx-js/react' in Lynx build
│
├── react-native/                # LAYER 3a · Platform: React Native
│   ├── Spinner.tsx              # Generic <View><Text> renderer (~20 lines)
│   └── index.ts                 # Named exports: DotsSpinner, MoonSpinner, etc.
│
└── lynx/                        # LAYER 3b · Platform: Lynx
    ├── Spinner.tsx              # Generic <view><text> renderer (~20 lines)
    └── index.ts                 # Named exports: DotsSpinner, MoonSpinner, etc.

apps/
├── expo/                        # Demo app (Expo/RN); uses src/react-native/
└── lynx/                        # Demo app (ReactLynx); uses src/lynx/
```

### Layer 1: Spinner Data (`src/data/`) · FULLY SHARED

Pure TypeScript constants. No React, no platform imports.

```ts
// src/data/types.ts
export interface SpinnerDefinition {
  readonly name: string;
  readonly frames: readonly string[];
  readonly interval: number;
  readonly category: 'braille' | 'ascii' | 'arrows' | 'emoji';
}

// src/data/dots.ts
import type { SpinnerDefinition } from './types';
export const dots: SpinnerDefinition = {
  name: 'dots',
  frames: ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"],
  interval: 80,
  category: 'braille',
};
```

The barrel export (`src/data/index.ts`) re-exports all 54 definitions and also provides a `SPINNER_REGISTRY` array for iteration (used by demo apps for rendering grids/tabs).

### Layer 2: Animation Hook (`src/hooks/`) · SHARED VIA ALIAS

```ts
// src/hooks/useSpinnerFrame.ts
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

**How sharing works:** This file imports from `'react'`. In the Lynx build (Rspeedy/Rspack), we alias `'react'` → `'@lynx-js/react'`:

```js
// lynx.config.js
import { defineConfig } from '@lynx-js/rspeedy';
export default defineConfig({
  source: {
    alias: { 'react': '@lynx-js/react' },
  },
});
```

ReactLynx has the same `useState`/`useEffect` API as React, so the hook works identically in both environments.

### Layer 3: Platform Rendering · INTENTIONAL FORK

This is the ONLY layer that is forked. Each platform has one generic Spinner component and one index file.

**Why this must fork (cannot be aliased):**

| Aspect             | React Native                     | ReactLynx                           |
| ------------------ | -------------------------------- | ------------------------------------ |
| Element names      | `<View>`, `<Text>` (components)  | `<view>`, `<text>` (intrinsic)       |
| Style values       | `fontSize: 24` (unitless number) | `fontSize: '24px'` (CSS string)      |
| Style composition  | `style={[obj1, obj2]}` (arrays)  | `className` or flat `style` object   |
| lineHeight         | `lineHeight: 31.2` (number)      | `lineHeight: '31.2px'` (CSS string)  |

These are not bridgeable via aliasing; they require different JSX and different style value formats.

**React Native renderer:**

```tsx
// src/react-native/Spinner.tsx
import { Text, View, type ViewStyle, type StyleProp } from 'react-native';
import { useSpinnerFrame } from '../hooks/useSpinnerFrame';
import type { SpinnerDefinition } from '../data/types';

interface SpinnerProps {
  definition: SpinnerDefinition;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export function Spinner({ definition, size = 24, color = '#fff', style }: SpinnerProps) {
  const frame = useSpinnerFrame(definition.frames, definition.interval);
  return (
    <View style={[{ alignItems: 'center', justifyContent: 'center' }, style]}>
      <Text style={{ fontSize: size, color, textAlign: 'center', lineHeight: size * 1.3 }}>
        {frame}
      </Text>
    </View>
  );
}
```

**Lynx renderer:**

```tsx
// src/lynx/Spinner.tsx
import { useSpinnerFrame } from '../hooks/useSpinnerFrame';
import type { SpinnerDefinition } from '../data/types';

interface SpinnerProps {
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

**Named exports** are generated from the data registry in each platform's `index.ts`:

```ts
// src/lynx/index.ts (same pattern for react-native/index.ts)
import { Spinner } from './Spinner';
import * as data from '../data';

export function DotsSpinner(props: Omit<Parameters<typeof Spinner>[0], 'definition'>) {
  return <Spinner definition={data.dots} {...props} />;
}
// ... repeat for all 54, or generate dynamically
```

---

## Demo Apps

Demo apps are fully platform-specific. They share the same conceptual structure (grid of spinners, category tabs) but use different elements, events, and scroll mechanics.

| Concept         | Expo Demo                   | Lynx Demo                           |
| --------------- | --------------------------- | ------------------------------------ |
| Root            | `SafeAreaProvider`          | `<page>`                             |
| Scrolling       | `<ScrollView>`              | `<scroll-view>`                      |
| Tap handling    | `<Pressable onPress={...}>` | `<view bindtap={...}>`               |
| Status bar      | `<StatusBar />`             | Handled by host app                  |
| Styling         | `StyleSheet.create()`       | CSS/SCSS files + `className`         |

---

## Build Configuration

### Expo (existing)
No changes needed. The Expo app imports from `src/react-native/`.

### Lynx (new)
- Use Rspeedy (`@lynx-js/rspeedy`) as build tool
- Configure `resolve.alias` to map `'react'` → `'@lynx-js/react'` so shared hooks work
- Configure `pluginReactLynx` for JSX transform
- Output: `.lynx.bundle` for native, `.web.bundle` for web

---

## Risks & Mitigations

### Unicode rendering
Braille characters (⠋⠙⠹) and emoji (🌑🌒🌓) depend on platform font support. Must test all 54 spinners visually on each target (iOS, Android, HarmonyOS, Web).

**Mitigation:** Build a test matrix in the demo app. If specific characters don't render on a platform, document it and provide fallback categories.

### Multi-line spinners
Some spinners use `\n` in frame strings (checkerboard, waverows, helix, etc.). Lynx's `<text>` element has its own inline formatting context that may handle newlines differently.

**Mitigation:** Test multi-line spinners first. If `\n` doesn't work, try CSS `white-space: pre` or split into multiple `<text>` elements.

### Timer precision across threads
Lynx's dual-thread architecture runs React reconciliation on the background thread. The `setInterval` + `useState` pattern communicates across threads, which may introduce slight timing differences.

**Mitigation:** Visually verify animation smoothness. The intervals (80-150ms) are large enough that minor jitter should be imperceptible.

---

## Implementation Order

When implementing features or porting spinners, follow this order:

1. **Set up project scaffolding.** Create `src/data/`, `src/hooks/`, `src/lynx/`, `apps/lynx/`
2. **Extract shared data.** Move FRAMES/INTERVAL from current spinner files into `src/data/`
3. **Create shared hook.** `src/hooks/useSpinnerFrame.ts`
4. **Build Lynx renderer.** `src/lynx/Spinner.tsx` (one file)
5. **Port a single spinner end-to-end.** DotsSpinner, verify in LynxExplorer
6. **Port remaining spinners.** Wire all 54 data files to Lynx named exports
7. **Build Lynx demo app.** `apps/lynx/` with grid + category tabs
8. **Retrofit RN side.** Update `src/react-native/` to consume shared data (optional, preserves backward compat)

Each step should be a self-contained commit that passes build verification.

---

## Decision Log

| Decision | Rationale |
| --- | --- |
| Shared data layer, not 54 forked files | Spinner definitions are pure JS; no reason to duplicate |
| Build-time alias for hook sharing | ReactLynx has identical hook API; avoids maintaining two copies |
| Intentional fork at rendering layer | Element names and style formats are fundamentally incompatible |
| Single Spinner component per platform | Avoids 54 nearly-identical component files; data-driven instead |
| CSS/SCSS for Lynx styling | Matches Lynx conventions; avoids fighting the platform |
