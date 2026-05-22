const CACHE_NAME = "POSTICANO";

const urlsToCache = [
  "/",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/index.html",
  "/starter.html",
  "/business.html",
  "/custom.html",
  "/offer.html",
  "/style.css",
  "/script.js",
  "/logo.svg",
  "/favicon.png"
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
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
