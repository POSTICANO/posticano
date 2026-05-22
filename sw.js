const CACHE_NAME = "POSTICANO";

const urlsToCache = [
  "posticano",
  "posticano/icons/icon-192.png",
  "posticano/icons/icon-512.png",
  "posticano/index.html",
  "posticano/starter.html",
  "posticano/business.html",
  "posticano/custom.html",
  "posticano/offer.html",
  "posticano/style.css",
  "posticano/script.js",
  "posticano/logo.svg",
  "posticano/favicon.png"
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
