// self.addEventListener('install', function(event) {
//   console.log("install", event);
// });
self.addEventListener('activate', function(event) {
  console.log("activate", event);
});

self.addEventListener('install', function(e) {
  console.log('Install',e);
  e.waitUntil(
    caches.open("cache-simple").then(function(cache) {
      console.log('[ServiceWorker] Caching index.html');
      return cache.add("index.html");
    })
  );
});

