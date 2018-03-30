var cacheName = 'weatherPWA-step-6-2';
var filesToCache = [
  'https://preview.c9users.io/akhan227/it202spr2018/projects/p4/your-first-pwapp-master/work/',
  'https://preview.c9users.io/akhan227/it202spr2018/projects/p4/your-first-pwapp-master/work/index.html',
  'https://preview.c9users.io/akhan227/it202spr2018/projects/p4/your-first-pwapp-master/work/scripts/app.js',
  'https://preview.c9users.io/akhan227/it202spr2018/projects/p4/your-first-pwapp-master/work/styles/inline.css',
  'https://preview.c9users.io/akhan227/it202spr2018/projects/p4/your-first-pwapp-master/work/images/clear.png',
  'https://preview.c9users.io/akhan227/it202spr2018/projects/p4/your-first-pwapp-master/work/images/cloudy-scattered-showers.png',
  'https://preview.c9users.io/akhan227/it202spr2018/projects/p4/your-first-pwapp-master/work/images/cloudy.png',
  'https://preview.c9users.io/akhan227/it202spr2018/projects/p4/your-first-pwapp-master/work/images/fog.png',
  'https://preview.c9users.io/akhan227/it202spr2018/projects/p4/your-first-pwapp-master/work/images/ic_add_white_24px.svg',
  'https://preview.c9users.io/akhan227/it202spr2018/projects/p4/your-first-pwapp-master/work/images/ic_refresh_white_24px.svg',
  'https://preview.c9users.io/akhan227/it202spr2018/projects/p4/your-first-pwapp-master/work/images/partly-cloudy.png',
  'https://preview.c9users.io/akhan227/it202spr2018/projects/p4/your-first-pwapp-master/work/images/rain.png',
  'https://preview.c9users.io/akhan227/it202spr2018/projects/p4/your-first-pwapp-master/work/images/scattered-showers.png',
  'https://preview.c9users.io/akhan227/it202spr2018/projects/p4/your-first-pwapp-master/work/images/sleet.png',
  'https://preview.c9users.io/akhan227/it202spr2018/projects/p4/your-first-pwapp-master/work/images/snow.png',
  'https://preview.c9users.io/akhan227/it202spr2018/projects/p4/your-first-pwapp-master/work/images/thunderstorm.png',
  'https://preview.c9users.io/akhan227/it202spr2018/projects/p4/your-first-pwapp-master/work/images/wind.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});