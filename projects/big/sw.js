var CACHE_NAME = 'myTransitApp-cache-v1';
var urlsToCache = [
  './',
  './imgs/halsted.jpg'
];

self.addEventListener('install', function(event){
	event.waitUntil(caches.open(CACHE_NAME).then(function(cache){
		console.log('Opened cache');
		return cache.addAll(urlsToCache);
	})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request)
			.then(function(response) {
				// Cache hit - return response
				if (response) {
					return response;
				}
				if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
					return;
				}
				return fetch(event.request);
			})
	);
});

// self.addEventListener('activate', function(event) {
// 	var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];
// 	event.waitUntil(
// 		caches.keys().then(function(cacheNames) {
// 			return Promise.all(
// 				cacheNames.map(function(cacheName) {
// 					if (cacheWhitelist.indexOf(cacheName) === -1) {
// 						return caches.delete(cacheName);
// 					}
// 				})
// 				);
// 		})
// 		);
// });