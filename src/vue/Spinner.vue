<script setup lang="ts">
import { useSpinnerFrame } from './useSpinnerFrame';
import type { SpinnerDefinition } from '../data/types';

const props = withDefaults(
  defineProps<{
    definition: SpinnerDefinition;
    size?: number;
    color?: string;
  }>(),
  {
    size: 24,
    color: '#fff',
  },
);

const frame = useSpinnerFrame(props.definition.frames, props.definition.interval);
</script>

<template>
  <view :style="{ alignItems: 'center', justifyContent: 'center' }">
    <text
      :style="{
        fontSize: `${size}px`,
        color,
        textAlign: 'center',
        lineHeight: `${size * 1.3}px`,
        whiteSpace: 'nowrap',
        fontFamily:
          '\'IBM Plex Mono\', \'JetBrains Mono\', \'SF Mono\', ui-monospace, Menlo, Consolas, monospace',
      }"
      >{{ frame }}</text
    >
  </view>
</template>
