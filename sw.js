const CACHE_NAME = "fuel-finder-v1";

const urlsToCache = [
  "/fuel-app/",
  "/fuel-app/index.html",
  "/fuel-app/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
