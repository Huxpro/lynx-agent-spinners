// Reads src/data/*.ts directly via regex (each file is a tiny export) and emits a single JSON file.
// Demonstrates "data is the single source of truth" — the same files the RN and Lynx renderers consume.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';

const DATA_DIR = new URL('../src/data/', import.meta.url).pathname;

const files = readdirSync(DATA_DIR)
  .filter((f) => f.endsWith('.ts') && f !== 'index.ts' && f !== 'types.ts');

const spinners = [];
for (const file of files) {
  const src = readFileSync(join(DATA_DIR, file), 'utf8');
  // Match: name: 'foo'   frames: [...]   interval: 80   category: 'braille'
  const name = src.match(/name:\s*['"]([^'"]+)['"]/)?.[1];
  const interval = Number(src.match(/interval:\s*(\d+)/)?.[1]);
  const category = src.match(/category:\s*['"]([^'"]+)['"]/)?.[1];
  // frames can be multi-line; capture between '[' and the next ']' that's followed by ','
  const framesRaw = src.match(/frames:\s*(\[[\s\S]*?\])\s*,\s*interval/)?.[1];
  if (!name || !framesRaw || !category) {
    console.error(`Skipping ${file}: parse failed`);
    continue;
  }
  // Convert the JS array literal to JSON by re-evaluating it safely
  // Strings in spinner data use double quotes and escaped sequences — JSON-compatible already.
  const frames = JSON.parse(framesRaw);
  spinners.push({ name, frames, interval, category, file });
}

// Sort to match the registry order roughly: braille → ascii → arrows → emoji
const order = { braille: 0, ascii: 1, arrows: 2, emoji: 3 };
spinners.sort((a, b) => order[a.category] - order[b.category]);

const out = new URL('./spinners.json', import.meta.url).pathname;
writeFileSync(out, JSON.stringify(spinners, null, 2));
console.log(`Wrote ${spinners.length} spinners to ${out}`);
console.log('Counts by category:', spinners.reduce((acc, s) => {
  acc[s.category] = (acc[s.category] || 0) + 1;
  return acc;
}, {}));
