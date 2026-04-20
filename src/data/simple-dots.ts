import type { SpinnerDefinition } from './types';

export const simpleDots: SpinnerDefinition = {
  name: 'simple_dots',
  frames: [".  ",".. ","...","   "],
  interval: 400,
  category: 'ascii',
};
