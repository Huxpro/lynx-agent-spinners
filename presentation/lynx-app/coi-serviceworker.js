/*! coi-serviceworker v0.1.7 — Adapted from gzuidhof/coi-serviceworker (MIT)
 *
 *  Cross-origin isolation shim. Some static hosts (GitHub Pages, etc.) cannot
 *  set the Cross-Origin-Opener-Policy / Cross-Origin-Embedder-Policy headers
 *  that SharedArrayBuffer requires.
 *
 *  This service worker intercepts every fetch and re-adds those headers,
 *  giving Lynx-for-Web's dual-thread runtime the isolated context it needs.
 *
 *  Usage:  include in <head> BEFORE any other script:
 *      <script src="coi-serviceworker.js"></script>
 */
(() => {
  if (typeof window === 'undefined') {
    // Running inside the service worker
    self.addEventListener('install', () => self.skipWaiting());
    self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

    self.addEventListener('fetch', (event) => {
      const req = event.request;
      if (req.cache === 'only-if-cached' && req.mode !== 'same-origin') return;
      event.respondWith(
        fetch(req)
          .then((response) => {
            if (response.status === 0) return response;
            const newHeaders = new Headers(response.headers);
            newHeaders.set('Cross-Origin-Embedder-Policy', 'require-corp');
            newHeaders.set('Cross-Origin-Opener-Policy', 'same-origin');
            newHeaders.set('Cross-Origin-Resource-Policy', 'cross-origin');
            return new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: newHeaders,
            });
          })
          .catch((err) => {
            console.error('[coi-sw] fetch failed', err);
            throw err;
          }),
      );
    });
    return;
  }

  // Running on the page
  if (!window.crossOriginIsolated && 'serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(window.document.currentScript.src, { scope: './' })
      .then((reg) => {
        reg.addEventListener('updatefound', () => location.reload());
        // First load: SW won't intercept the current page; reload once it's active.
        if (reg.active && !navigator.serviceWorker.controller) {
          location.reload();
        }
      })
      .catch((e) => console.error('[coi-sw] register failed', e));
  }
})();
