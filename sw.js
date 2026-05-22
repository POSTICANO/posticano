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

/* =========================
   INSTALL EVENT
========================= */
self.addEventListener("install", event => {
  self.skipWaiting(); // activate immediately

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

/* =========================
   ACTIVATE EVENT
========================= */
self.addEventListener("activate", event => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(), // take control immediately
      caches.keys().then(keys => {
        return Promise.all(
          keys.map(key => {
            if (key !== CACHE_NAME) {
              return caches.delete(key); // remove old cache versions
            }
          })
        );
      })
    ])
  );
});

/* =========================
   FETCH EVENT (offline support)
========================= */
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
