const CACHE_NAME = 'tanks-v2';

// Упрощаем список до минимума
const assets = [
  'index.html',
  'manifest.json',
  'icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Используем addAll, но если что-то пойдет не так, SW не умрет
      return cache.addAll(assets).catch(err => console.log('Кэш пока не собран'));
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// Активация нового воркера и удаление старого кэша
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});
