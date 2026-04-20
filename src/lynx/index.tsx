import { Spinner, type SpinnerProps } from './Spinner';
import * as data from '../data';

type NamedSpinnerProps = Omit<SpinnerProps, 'definition'>;

export { Spinner, type SpinnerProps, type NamedSpinnerProps };

// Braille (32)
export function DotsSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.dots} {...props} />; }
export function Dots2Spinner(props: NamedSpinnerProps) { return <Spinner definition={data.dots2} {...props} />; }
export function Dots3Spinner(props: NamedSpinnerProps) { return <Spinner definition={data.dots3} {...props} />; }
export function Dots4Spinner(props: NamedSpinnerProps) { return <Spinner definition={data.dots4} {...props} />; }
export function Dots5Spinner(props: NamedSpinnerProps) { return <Spinner definition={data.dots5} {...props} />; }
export function Dots6Spinner(props: NamedSpinnerProps) { return <Spinner definition={data.dots6} {...props} />; }
export function Dots7Spinner(props: NamedSpinnerProps) { return <Spinner definition={data.dots7} {...props} />; }
export function Dots8Spinner(props: NamedSpinnerProps) { return <Spinner definition={data.dots8} {...props} />; }
export function Dots9Spinner(props: NamedSpinnerProps) { return <Spinner definition={data.dots9} {...props} />; }
export function Dots10Spinner(props: NamedSpinnerProps) { return <Spinner definition={data.dots10} {...props} />; }
export function Dots11Spinner(props: NamedSpinnerProps) { return <Spinner definition={data.dots11} {...props} />; }
export function Dots12Spinner(props: NamedSpinnerProps) { return <Spinner definition={data.dots12} {...props} />; }
export function Dots13Spinner(props: NamedSpinnerProps) { return <Spinner definition={data.dots13} {...props} />; }
export function Dots14Spinner(props: NamedSpinnerProps) { return <Spinner definition={data.dots14} {...props} />; }
export function SandSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.sand} {...props} />; }
export function BounceSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.bounce} {...props} />; }
export function DotsCircleSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.dotsCircle} {...props} />; }
export function WaveSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.wave} {...props} />; }
export function ScanSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.scan} {...props} />; }
export function RainSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.rain} {...props} />; }
export function PulseSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.pulse} {...props} />; }
export function SnakeSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.snake} {...props} />; }
export function SparkleSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.sparkle} {...props} />; }
export function CascadeSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.cascade} {...props} />; }
export function ColumnsSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.columns} {...props} />; }
export function OrbitSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.orbit} {...props} />; }
export function BreatheSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.breathe} {...props} />; }
export function WaveRowsSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.waverows} {...props} />; }
export function CheckerboardSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.checkerboard} {...props} />; }
export function HelixSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.helix} {...props} />; }
export function FillSweepSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.fillsweep} {...props} />; }
export function DiagSwipeSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.diagswipe} {...props} />; }

// ASCII (15)
export function DqpbSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.dqpb} {...props} />; }
export function RollingLineSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.rollingLine} {...props} />; }
export function SimpleDotsSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.simpleDots} {...props} />; }
export function SimpleDotsScrollingSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.simpleDotsScrolling} {...props} />; }
export function ArcSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.arc} {...props} />; }
export function BalloonSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.balloon} {...props} />; }
export function CircleHalvesSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.circleHalves} {...props} />; }
export function CircleQuartersSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.circleQuarters} {...props} />; }
export function PointSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.point} {...props} />; }
export function SquareCornersSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.squareCorners} {...props} />; }
export function ToggleSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.toggle} {...props} />; }
export function TriangleSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.triangle} {...props} />; }
export function GrowHorizontalSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.growHorizontal} {...props} />; }
export function GrowVerticalSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.growVertical} {...props} />; }
export function NoiseSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.noise} {...props} />; }

// Arrows (2)
export function ArrowSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.arrow} {...props} />; }
export function DoubleArrowSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.doubleArrow} {...props} />; }

// Emoji (6)
export function HeartsSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.hearts} {...props} />; }
export function ClockSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.clock} {...props} />; }
export function EarthSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.earth} {...props} />; }
export function MoonSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.moon} {...props} />; }
export function SpeakerSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.speaker} {...props} />; }
export function WeatherSpinner(props: NamedSpinnerProps) { return <Spinner definition={data.weather} {...props} />; }
