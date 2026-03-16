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
  "styles/styles.css",
  "javascripts/serviceHttp.js",
  "javascripts/kanban.js",
  "javascripts/connectivity.js",
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
  const { request } = event;
  const url = request.url;

  // 🛑 Ignorer certaines requêtes sensibles
  if (
    url.includes("check_auth") ||
    url.includes("logout") ||
    request.method === "DELETE" ||
    request.method === "PUT" ||
    request.method === "POST"
  ) {
    return;
  }
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
