---
permalink: /sw.js
---
const VERSION = 'v2';
const CACHE_NAME = `jekyll-pwa-${VERSION}`;

const BASE_URL = self.registration.scope;

const STATIC_ASSETS = [
  BASE_URL,
  `${BASE_URL}index.html`,
  `${BASE_URL}assets/css/style.css`,
  `${BASE_URL}manifest.json`
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        STATIC_ASSETS.map(url => {
          // Append a cache-busting timestamp to bypass GitHub Pages server cache
          const requestUrl = new URL(url, location.href);
          requestUrl.searchParams.set('v', Date.now());
          
          return fetch(requestUrl).then(response => {
            if (!response.ok) throw new TypeError(`Pipeline failed for: ${url}`);
            return cache.put(url, response);
          });
        })
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
