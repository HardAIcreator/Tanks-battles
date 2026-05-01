const CACHE_NAME = 'tanks-v1';

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        './',
        'index.html',
        'manifest.json',
        'icon.png'
      ]).catch(err => console.log('Кэширование не удалось:', err));
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
