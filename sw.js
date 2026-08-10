/* Abracadabra — service worker для установленной PWA-версии.
   Кэширует оболочку приложения, чтобы всё работало без сети.
   Никакой аналитики и никаких внешних запросов — только свои файлы. */
'use strict';

const CACHE = 'abra-cache-v4.1.0';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* стратегия: отдаём из кэша мгновенно, в фоне обновляем копию из сети */
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith((async () => {
    const cached = await caches.match(e.request, { ignoreSearch: true });
    const network = fetch(e.request).then(res => {
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => null);
    if (cached) return cached;
    const fresh = await network;
    if (fresh) return fresh;
    if (e.request.mode === 'navigate') {
      const shell = await caches.match('./');
      if (shell) return shell;
    }
    return Response.error();
  })());
});
