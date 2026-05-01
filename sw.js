self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('tanks-store').then((cache) => cache.addAll([
      '/Tanks-battles/',
      '/Tanks-battles/index.html',
      '/Tanks-battles/manifest.json',
      '/Tanks-battles/icon.png'
    ]))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
