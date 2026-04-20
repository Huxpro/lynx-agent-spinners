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
