self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('tanks-v1').then((cache) => {
            return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './icon.png'
      ]).catch(err => console.log('Ошибка кэширования'));
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
