#!/usr/bin/env bash
# Serve the hackathon deck. Usage: ./serve.sh [port]
set -e
cd "$(dirname "$0")"

PORT="${1:-8090}"

# Regenerate spinners.json if missing or out of date
if [ ! -f spinners.json ] || [ ../src/data/index.ts -nt spinners.json ]; then
  echo "→ Extracting spinner data from ../src/data/..."
  node extract-spinners.mjs
fi

# Free the port if something is squatting on it
if lsof -ti:"$PORT" >/dev/null 2>&1; then
  echo "→ Port $PORT in use, killing the squatter"
  lsof -ti:"$PORT" | xargs kill -9 2>/dev/null || true
  sleep 0.5
fi

URL="http://localhost:$PORT/index.html"
echo "→ Serving deck at $URL"
echo "  (Ctrl+C to stop)"

# Open the browser shortly after the server is up
( sleep 0.8 && open "$URL" ) &

# Foreground server with COOP/COEP headers (needed by Lynx for Web's SharedArrayBuffer)
exec python3 ./serve.py "$PORT"
