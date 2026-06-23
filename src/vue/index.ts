// Public surface of the Vue Lynx platform layer.
//
// Unlike the React Native / ReactLynx `index` files — which export 55 named
// wrapper components (DotsSpinner, MoonSpinner, …) because JSX makes thin
// wrappers cheap — the idiomatic Vue surface is data-driven: render the single
// <Spinner> SFC with a `definition` from the shared registry. Consumers pick a
// spinner from `src/data/` (re-exported here) and pass it in. This keeps the
// single-source-of-truth contract without 55 near-identical .vue files.
export { default as Spinner } from './Spinner.vue';
export { useSpinnerFrame } from './useSpinnerFrame';

export * from '../data';
