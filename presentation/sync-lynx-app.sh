#!/usr/bin/env bash
# Sync the freshly-built apps/lynx/dist/main.web.bundle into presentation/lynx-app/
# along with the @lynx-js/web-core static assets needed to render it in a browser.
#
# Run by `pnpm preso:build` after `pnpm lynx:build`.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LYNX_APP="$ROOT/apps/lynx"
EMBED="$ROOT/presentation/lynx-app"
WEB_CORE="$LYNX_APP/node_modules/@lynx-js/web-core/dist/client_prod"

if [ ! -f "$LYNX_APP/dist/main.web.bundle" ]; then
  echo "✘ apps/lynx/dist/main.web.bundle not found — run \`pnpm lynx:build\` first." >&2
  exit 1
fi
if [ ! -d "$WEB_CORE" ]; then
  echo "✘ @lynx-js/web-core static assets not found at $WEB_CORE" >&2
  exit 1
fi

mkdir -p "$EMBED"

# 1) Our app bundle
cp "$LYNX_APP/dist/main.web.bundle" "$EMBED/main.web.bundle"

# 2) Web-core runtime (client.js, async chunks, wasm, css)
rm -rf "$EMBED/static"
mkdir -p "$EMBED/static"
cp -R "$WEB_CORE/static/." "$EMBED/static/"

echo "✓ Synced lynx-app embed:"
echo "  bundle: $(du -h "$EMBED/main.web.bundle" | awk '{print $1}')"
echo "  runtime: $(du -sh "$EMBED/static" | awk '{print $1}')"
