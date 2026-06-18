#!/usr/bin/env bash
# Sync the freshly-built Lynx bundles + web-core runtime into presentation/
# so the static landing page can render them in any browser.
#
# Layout produced:
#   presentation/static/               ← @lynx-js/web-core client_prod (shared)
#   presentation/lynx-app/main.web.bundle    ← the full 55-spinner catalog
#   presentation/screens/main.web.bundle     ← the 3 signature screens
#
# Run by `pnpm preso:build` after `pnpm lynx:build && pnpm screens:build`.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
LYNX_APP="$ROOT/apps/lynx"
SCREENS="$ROOT/apps/screens"
WEB_CORE="$LYNX_APP/node_modules/@lynx-js/web-core/dist/client_prod"

if [ ! -f "$LYNX_APP/dist/main.web.bundle" ]; then
  echo "✘ apps/lynx/dist/main.web.bundle not found — run \`pnpm lynx:build\` first." >&2
  exit 1
fi
if [ ! -f "$SCREENS/dist/main.web.bundle" ]; then
  echo "✘ apps/screens/dist/main.web.bundle not found — run \`pnpm screens:build\` first." >&2
  exit 1
fi
if [ ! -d "$WEB_CORE" ]; then
  echo "✘ @lynx-js/web-core static assets not found at $WEB_CORE" >&2
  exit 1
fi

# Shared web-core runtime at /static/
rm -rf "$ROOT/presentation/static"
mkdir -p "$ROOT/presentation/static"
cp -R "$WEB_CORE/static/." "$ROOT/presentation/static/"

# Catalog app bundle
mkdir -p "$ROOT/presentation/lynx-app"
cp "$LYNX_APP/dist/main.web.bundle" "$ROOT/presentation/lynx-app/main.web.bundle"

# Signature screens bundle
mkdir -p "$ROOT/presentation/screens"
cp "$SCREENS/dist/main.web.bundle" "$ROOT/presentation/screens/main.web.bundle"

echo "✓ Synced:"
echo "  static runtime:        $(du -sh "$ROOT/presentation/static" | awk '{print $1}')"
echo "  lynx-app bundle:       $(ls -lh "$ROOT/presentation/lynx-app/main.web.bundle" | awk '{print $5}')"
echo "  screens bundle:        $(ls -lh "$ROOT/presentation/screens/main.web.bundle" | awk '{print $5}')"
