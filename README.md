# expo-agent-spinners

54 terminal-style agent-like spinners for React Native & Expo. Lightweight, zero native dependencies — just `Text` and `setInterval`. No heavy UI threads
<img width="1152" height="648" alt="expo-agent-spinners" src="https://github.com/user-attachments/assets/bb1ff42b-a3aa-4283-997d-b815b3080233" />

Inspiration from https://github.com/vyfor/rattles

## Preview

Braille, ASCII, arrow, and emoji spinners all in one place, ready to drop into any loading state, AI agent stream, or CLI-style UI.

## Installation

You can copy any spinner you need from the `src/components/spinners` directory for use in your project.

## Usage

Import the component you need:

```tsx
import { DotsSpinner } from "./src/components/spinners/dots";

export default function Loading() {
  return <DotsSpinner size={24} color="#fff" style={{ width: 40, height: 40 }} />;
}
```

### Container sizing

Spinners render Unicode characters whose pixel width depends on font rendering. To prevent layout overflow or shifting, **always wrap spinners in a fixed-size container**:

```tsx
// ✅ Recommended — fixed container keeps layout stable
<View style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }}>
  <DotsSpinner size={24} color="#fff" />
</View>

// ✅ Also works — pass style directly to the spinner
<DotsSpinner
  size={24}
  color="#fff"
  style={{ width: 40, height: 40 }}
/>

// ⚠️ Multi-character spinners (dots12, wave, scan, etc.) are wider —
//    use a wider fixed container to avoid clipping
<View style={{ width: 64, height: 40, alignItems: "center", justifyContent: "center" }}>
  <Dots12Spinner size={20} color="#fff" />
</View>
```

**Suggested container sizes by character count:**

| Spinner type | Characters | Recommended `width` |
|---|---|---|
| Single char (`dots`, `moon`, `arc`…) | 1 | `40` |
| Two chars (`dots12`, `wave`, `scan`…) | 2 | `64` |
| Three+ chars (`point`, `columns`…) | 3–4 | `80–96` |

### Props

All spinners share the same interface:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `24` | Font size of the spinner character |
| `color` | `string` | `"#fff"` | Color of the spinner |
| `style` | `StyleProp<ViewStyle>` | — | Style for the outer container |

## Available Spinners

### Braille (32)

| Name | Import |
|------|--------|
| dots | `DotsSpinner` |
| dots2 | `Dots2Spinner` |
| dots3 | `Dots3Spinner` |
| dots4 | `Dots4Spinner` |
| dots5 | `Dots5Spinner` |
| dots6 | `Dots6Spinner` |
| dots7 | `Dots7Spinner` |
| dots8 | `Dots8Spinner` |
| dots9 | `Dots9Spinner` |
| dots10 | `Dots10Spinner` |
| dots11 | `Dots11Spinner` |
| dots12 | `Dots12Spinner` |
| dots13 | `Dots13Spinner` |
| dots14 | `Dots14Spinner` |
| sand | `SandSpinner` |
| bounce | `BounceSpinner` |
| dots_circle | `DotsCircleSpinner` |
| wave | `WaveSpinner` |
| scan | `ScanSpinner` |
| rain | `RainSpinner` |
| pulse | `PulseSpinner` |
| snake | `SnakeSpinner` |
| sparkle | `SparkleSpinner` |
| cascade | `CascadeSpinner` |
| columns | `ColumnsSpinner` |
| orbit | `OrbitSpinner` |
| breathe | `BreatheSpinner` |
| waverows | `WaveRowsSpinner` |
| checkerboard | `CheckerboardSpinner` |
| helix | `HelixSpinner` |
| fillsweep | `FillSweepSpinner` |
| diagswipe | `DiagSwipeSpinner` |

### ASCII (15)

| Name | Import |
|------|--------|
| dqpb | `DqpbSpinner` |
| rolling_line | `RollingLineSpinner` |
| simple_dots | `SimpleDotsSpinner` |
| simple_dots_scrolling | `SimpleDotsScrollingSpinner` |
| arc | `ArcSpinner` |
| balloon | `BalloonSpinner` |
| circle_halves | `CircleHalvesSpinner` |
| circle_quarters | `CircleQuartersSpinner` |
| point | `PointSpinner` |
| square_corners | `SquareCornersSpinner` |
| toggle | `ToggleSpinner` |
| triangle | `TriangleSpinner` |
| grow_horizontal | `GrowHorizontalSpinner` |
| grow_vertical | `GrowVerticalSpinner` |
| noise | `NoiseSpinner` |

### Arrows (2)

| Name | Import |
|------|--------|
| arrow | `ArrowSpinner` |
| double_arrow | `DoubleArrowSpinner` |

### Emoji (6)

| Name | Import |
|------|--------|
| hearts | `HeartsSpinner` |
| clock | `ClockSpinner` |
| earth | `EarthSpinner` |
| moon | `MoonSpinner` |
| speaker | `SpeakerSpinner` |
| weather | `WeatherSpinner` |

## Examples

```tsx
// Braille — classic terminal feel
<DotsSpinner size={20} color="#6366f1" />

// ASCII — minimal
<RollingLineSpinner size={18} color="#888" />

// Emoji — fun & expressive
<MoonSpinner size={24} />
<WeatherSpinner size={24} />
```

## Demo App & Contributing

Clone the repo and run the Expo demo to see all 54 spinners live.

To contribute, open a pull request with your changes.

## Why text-based?

Terminal-style spinners are perfect for:

- **AI agent streams** — show activity while waiting for LLM responses
- **CLI-style UIs** — give your app a developer aesthetic
- **Lightweight loading states** — no SVG, no Lottie, no heavy assets
- **Monospace layouts** — pair with code editors or terminal screens

## License

MIT © [eronred](https://github.com/eronred)
