import { ref, computed, onUnmounted, type ComputedRef } from 'vue-lynx';

/**
 * Vue composable mirror of the React `useSpinnerFrame` hook.
 *
 * Steps through `frames` on a fixed `interval` and exposes the current frame
 * as a reactive value. The timer is cleared automatically on unmount.
 *
 * Why this forks from `src/hooks/useSpinnerFrame.ts`: that hook is shared
 * between React Native and ReactLynx via a build-time `react` alias. Vue's
 * reactivity model (`ref`/`computed`/lifecycle) has no equivalent alias, so
 * the Vue platform gets its own composable. The animation contract — frames,
 * interval, source-of-truth data in `src/data/` — is identical.
 */
export function useSpinnerFrame(
  frames: readonly string[],
  interval: number,
): ComputedRef<string> {
  const index = ref(0);
  const id = setInterval(() => {
    index.value = (index.value + 1) % frames.length;
  }, interval);
  onUnmounted(() => clearInterval(id));
  return computed(() => frames[index.value]);
}
