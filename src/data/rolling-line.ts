import type { SpinnerDefinition } from './types';

export const rollingLine: SpinnerDefinition = {
  name: 'rolling_line',
  frames: ["/","-","\\","|","\\","-"],
  interval: 80,
  category: 'ascii',
};
