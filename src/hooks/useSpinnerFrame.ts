import { useState, useEffect } from 'react';

export function useSpinnerFrame(frames: readonly string[], interval: number): string {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setFrame((i: number) => (i + 1) % frames.length), interval);
    return () => clearInterval(id);
  }, []);
  return frames[frame];
}
