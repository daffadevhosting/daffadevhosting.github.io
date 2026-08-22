---
permalink: /sw.js
---

const CACHE_NAME = "daffadev-v2";
const ASSETS_TO_CACHE = [
  "/",
  "/manifest.json",
  "/assets/css/style.css",
  "/assets/js/app.js",
  "/assets/favicon/android-chrome-192x192.png",
  "/assets/favicon/android-chrome-512x512.png",
  "/assets/favicon/apple-touch-icon.png",
  "/assets/favicon/favicon-32x32.png",
  "/assets/favicon/favicon-16x16.png",
  "/assets/favicon/favicon.ico",
  "https://cdn.jsdelivr.net/npm/@ionic/core@8/css/ionic.bundle.css",
  "https://cdn.jsdelivr.net/npm/@ionic/core@8/dist/ionic/ionic.esm.js",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
  "https://cdn.jsdelivr.net/npm/marked/marked.min.js",
  "https://cdn.jsdelivr.net/npm/dompurify@3.0.6/dist/purify.min.js"
];

// Install service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate service worker and clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch assets with cache-first strategy
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        
        // Clone the request for the cache
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }
          
          // Clone the response for the cache
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        }).catch((error) => {
          // Fallback to offline page for navigation requests
          if (event.request.destination === "document") {
            return caches.match("/offline.html") || 
                   caches.match("/404.html") ||
                   new Response("<h1>Offline</h1><p>You are currently offline.</p>", {
                     headers: { "Content-Type": "text/html" }
                   });
          }
          
          // For other requests, return nothing (let browser handle it)
          return new Response(null, { status: 408 });
        });
      })
  );
});

// Listen for messages from clients (e.g., skip waiting)
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
