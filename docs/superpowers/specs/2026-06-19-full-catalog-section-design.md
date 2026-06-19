# Full-catalog Lynx app section — design

Date: 2026-06-19
Owner: huxpro

## Why

The "Full catalog Lynx app" — the standalone `<lynx-view>` page that mounts the entire 55-spinner ReactLynx app in a single browser page — is currently exposed as a buried link in the landing-page footer (`presentation/index.html` colophon). The page itself (`presentation/lynx-app/index.html`) is a bare full-screen embed with a single "back to deck" ribbon.

We want to:

1. **Promote it to a first-class section on the landing page**, directly below the catalogue grid, so a visitor sees the whole-app demo right after browsing the per-spinner cells.
2. **Ship the native `main.lynx.bundle` as a static asset** next to the existing `main.web.bundle`, and surface it through a **QR code** so Lynx Explorer on a phone can load the same app at native frame rates.
3. **Polish the standalone `/lynx-app/` page** into a phone-frame + info-panel + QR-card layout (the pattern from `~/github/lynx-flappy-bird/website`), so "open in a new tab" yields a real landing page rather than a fullscreen embed.

## Pieces

### A. Static assets — `presentation/sync-lynx-app.sh`

Add one copy step: `apps/lynx/dist/main.lynx.bundle` → `presentation/lynx-app/main.lynx.bundle`. The Rspeedy config already emits both environments (`lynx: {}, web: {}` in `apps/lynx/lynx.config.ts`), so the file exists at build time — no app-side changes.

### B. Landing-page section — `presentation/index.html`

Insert `<section id="full-app">` between `#catalogue` (the first screen) and `#screens`.

- **Section header**: numbered `02 / The full app` (existing `#screens` renumbers from `02` to `03`).
- **Layout**: two-column, mirroring the existing `.screen` rhythm:
  - Left column (or right, alternating): `.device` frame containing `<lynx-view url="./lynx-app/main.web.bundle">`. Reuses the existing `.device` styling (the rounded chassis already used in the `.screens` section).
  - Other column: title (Fraunces) + lede + QR card + CTA cluster ("Open standalone ↗", "Copy bundle URL").
- **QR card**: editorial card with a 140px QR canvas, a short label ("Play natively on mobile · Lynx Explorer") and a "Copy URL" link.
- **Visual language**: existing landing-page tokens (Fraunces serif, IBM Plex sans/mono, warm paper bg, ember accent). Not arcade — flappy-bird's "Press Start 2P + neon green" is the wrong register for this site.
- **i18n**: add EN + ZH strings for the section's title, lede, QR label, CTAs.

### C. Standalone page — `presentation/lynx-app/index.html`

Replace the bare fullscreen embed with a flappy-bird-style page tuned to this site's aesthetic:

- **Desktop**: phone-frame on one side + info panel on the other (title, description, QR card with "scan with Lynx Explorer" + "Copy URL", source link).
- **Mobile / narrow** (`@media (max-width: 768px)`): collapse to fullscreen phone embed + floating info button that opens a bottom-sheet drawer with the QR + description (matches flappy-bird's mobile pattern, and importantly keeps the deck's slide-3 iframe rendering as a fullscreen embed).
- **Styling**: same tokens as the landing page (Fraunces / IBM Plex / paper / ember).
- The deck still iframes this page at 390×720, so the narrow-width fullscreen fallback is load-bearing — it keeps slide 3 of the deck visually unchanged.

### D. QR generation

Static HTML, no bundler. Pull `qr-creator` UMD from a CDN as a `<script>` tag (`https://cdn.jsdelivr.net/npm/qr-creator/dist/qr-creator.min.js`), then call `QrCreator.render(...)` into a `<div>`.

QR URL is computed origin-aware from `window.location`:

```js
const bundleUrl = new URL('./lynx-app/main.lynx.bundle?fullscreen=true', location.href).toString();
```

This works on GitHub Pages (`huxpro.github.io/lynx-agent-spinners/`), Vercel previews, and localhost. The `?fullscreen=true` query matches the schema the `pluginQRCode` plugin already uses in `apps/lynx/lynx.config.ts`, so Lynx Explorer opens the app fullscreen.

On the standalone page (`/lynx-app/index.html`), the URL collapses to `./main.lynx.bundle?fullscreen=true`.

### E. Colors / dark mode

Both surfaces respect `localStorage['las-theme']` (already wired on the landing page). The standalone page reads the same storage key at load time and applies `data-theme`, so a visitor who switched to dark mode on the landing page sees a dark standalone page too.

## Out of scope

- Changing the `apps/lynx` app itself (its bundle is the demo source of truth — we just ship it).
- Replacing the existing `#screens` section. It stays — the three signature in-context demos are a different argument from "here's the whole app."
- Bundling/transpiling the standalone page. It stays vanilla static HTML to match the rest of `presentation/`.

## Verification

After implementing:

1. `pnpm preso:build` — confirm `presentation/lynx-app/main.lynx.bundle` lands and is ~100 KB.
2. `pnpm preso` (or `presentation/serve.sh`) — open landing page:
   - Section "02 / The full app" renders directly below the catalogue grid.
   - The `<lynx-view>` in the device frame mounts the catalog and animates.
   - QR card renders, "Copy URL" copies the absolute bundle URL.
   - "Open standalone ↗" opens `/lynx-app/` in a new tab.
3. Open `/lynx-app/` — desktop layout shows phone-frame + info-panel + QR; narrow viewport collapses to fullscreen + drawer.
4. Open the deck (`/deck/`) slide 3 — the lynx-app iframe still shows the catalog (now with the new fullscreen mobile layout, but visually equivalent at 390 px wide).
5. Scan the QR with Lynx Explorer on a phone against a deployed URL (not localhost) — the native app loads.

## Risks

- **Localhost QR is unreachable from a phone.** Acceptable: the QR is for production. The "Copy URL" affordance is the dev path.
- **CDN dependency for `qr-creator`.** Pin the version (`@1.x`) and document why this site doesn't use a bundler.
- **Bundle size doubles.** Adding `main.lynx.bundle` (~100 KB) on top of `main.web.bundle` (~100 KB) is ~200 KB extra in the published site. Acceptable for a demo site.
