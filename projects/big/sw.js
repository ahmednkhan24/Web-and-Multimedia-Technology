var CACHE_NAME = 'myTransitApp-cache-v1';
var urlsToCache = [
  './',
  './imgs/halsted.jpg'
];

self.addEventListener('install', function(event){
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
	  return;
	}
	event.waitUntil(caches.open(CACHE_NAME).then(function(cache){
		console.log('Opened cache');

		return cache.addAll(urlsToCache);
	})
	);
});

self.addEventListener('fetch', function(event) {
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
	  return;
	}
	event.respondWith(
		caches.match(event.request)
			.then(function(response) {
				// Cache hit - return response
				if (response) {
					return response;
				}
				return fetch(event.request);
			})
	);
});