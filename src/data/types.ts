export interface SpinnerDefinition {
  readonly name: string;
  readonly frames: readonly string[];
  readonly interval: number;
  readonly category: 'braille' | 'ascii' | 'arrows' | 'emoji';
}
