
const mysafeCache = "cache-v1";
const assets = [
  "/",
  "index.html"
];

self.addEventListener('install', function(event) {
  console.log("wrk ok installer");
  event.waitUntil(
    caches.open(mysafeCache).then(function(cache) {
      return cache.addAll(assets);
    })
  );
});
/*
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }

      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(function(response) {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        var responseToCache = response.clone();

        caches.open(mysafeCache).then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(function() {
        // Afficher une pop-up pour informer l'utilisateur qu'il n'est pas connecté à Internet
        self.clients.matchAll({ type: 'window' }).then(function(clients) {
          clients.forEach(function(client) {
            client.postMessage({ type: 'offline' });
          });
        });
      });
    })
  );
});

*/
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(mysafeCache).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        if (response) {
          return response; // Renvoyer la réponse depuis le cache
        }

        // Si la réponse n'est pas trouvée dans le cache, la récupérer depuis le réseau
        return fetch(event.request).then(function(networkResponse) {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse; // Renvoyer la réponse depuis le réseau
          }

          // Si la réponse est valide, la cloner et l'ajouter au cache
          var responseToCache = networkResponse.clone();
          cache.put(event.request, responseToCache);

          return networkResponse; // Renvoyer la réponse depuis le réseau
        }).catch(function() {
          // Afficher une pop-up pour informer l'utilisateur qu'il n'est pas connecté à Internet
          self.clients.matchAll().then(function(clients) {
            clients.forEach(function(client) {
              client.postMessage({ type: 'offline' });
            });
          });
        });
      });
    })
  );
});


self.addEventListener('activate', function(event) {
  var cacheWhitelist = [mysafeCache]; // Modification : Utilisation d'un tableau pour cacheWhitelist
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
            console.log(cacheWhitelist);
          if (cacheWhitelist.indexOf(cacheName) === -1) { // Modification : Vérification du cacheName dans le tableau cacheWhitelist
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});



