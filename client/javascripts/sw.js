const CACHE_NAME = "my-site-cache-v1";
const urlsToCache = [
  "/",
  "index.html",
  "accueilClient.html",
  "login.html",
  "kanban.html",
  "styles/kanban.css",
  "styles/accueilClient.css",
  "styles/login.css",
  "serviceHttp.js",
  "kanban.js",
  "images/logoSprintBoard.png",
];
console.log("Contexte du script :", self.constructor.name);
console.log("navigator.connection :", navigator?.connection);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  // Open the cache
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      // Go to the network first
      return fetch(event.request.url)
        .then((fetchedResponse) => {
          cache.put(event.request, fetchedResponse.clone());
          return fetchedResponse;
        })
        .catch(() => {
          // If the network is unavailable, get

          return cache.match(event.request.url);
        });
    })
  );
});

navigator.connection.onchange = (e) => {
  if (navigator.onLine) {
    fetch("/A30/squelette/heure.php")
      .then((response) => response.text())
      .then((responseData) => {
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            console.log("Envoie de la réponse");

            client.postMessage({
              type: "refeshHeure",
              data: responseData,
            });
          });
        });
      });
  } else {
    console.log("Déconnexion...");
  }
};
