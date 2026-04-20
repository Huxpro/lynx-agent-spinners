import type { SpinnerDefinition } from './types';

export const wave: SpinnerDefinition = {
  name: 'wave',
  frames: ["⠁⠂⠄⡀","⠂⠄⡀⢀","⠄⡀⢀⠠","⡀⢀⠠⠐","⢀⠠⠐⠈","⠠⠐⠈⠁","⠐⠈⠁⠂","⠈⠁⠂⠄"],
  interval: 100,
  category: 'braille',
};
