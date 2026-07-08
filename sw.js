// Service worker for the connection spike.
// The whole point: cache the app shell so the page opens with NO internet.
// Visit once while online, the assets below are cached, then the page (and the
// installed home-screen app) load from cache in aeroplane mode.
const CACHE = 'hearthland-spike-v2';
const ASSETS = [
  './',
  './index.html',
  './qrcode.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(Promise.all([
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))),
    self.clients.claim(),
  ]));
});

// Cache first: offline is the normal case here, not the exception.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) =>
      hit || fetch(e.request).catch(() => caches.match('./index.html'))
    )
  );
});
