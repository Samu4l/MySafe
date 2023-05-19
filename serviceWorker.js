self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('mysafe-cache').then(function(cache) {
            return cache.addAll([
                'index.html',
                // Ajoutez ici tous les fichiers que vous souhaitez mettre en cache
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
