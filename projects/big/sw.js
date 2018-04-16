var CACHE_NAME = 'myTransitApp-cache-v1';
var urlsToCache = [
  '/',
  '/imgs/halsted.jpg',
];


self.addEventListener('install', function(event){
	// Perform install steps
	event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});