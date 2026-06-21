// Service Worker for Reverbex Technologies
// Only caches in production. Self-destructs in dev.

const CACHE_NAME = 'reverbex-v4';
const STATIC_CACHE = 'static-v4';
const DYNAMIC_CACHE = 'dynamic-v4';

const STATIC_ASSETS = [
  '/',
  '/logo.PNG',
  '/site.webmanifest',
  '/favicon.svg',
];

const CACHE_LIMIT = 60;

// Detect dev environment via port or hostname
const IS_DEV = self.location.port === '3000' || self.location.hostname === 'localhost';

self.addEventListener('install', (event) => {
  if (IS_DEV) {
    event.waitUntil(
      caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
    );
    self.skipWaiting();
    return;
  }

  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  if (IS_DEV) {
    event.waitUntil(
      caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
    );
    self.registration.unregister();
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => client.navigate(client.url));
    });
    return;
  }

  const allowedCaches = [STATIC_CACHE, DYNAMIC_CACHE];
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => !allowedCaches.includes(key)).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (IS_DEV) return;

  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;
  if (url.pathname.startsWith('/_next/static/')) return;

  // Cache images aggressively
  if (request.destination === 'image' || url.pathname.match(/\.(png|jpg|jpeg|webp|svg|gif)$/)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetchAndCache(request);
      }).catch(() => new Response('', { status: 404 }))
    );
    return;
  }

  // Cache fonts
  if (request.destination === 'font' || url.pathname.match(/\.(woff2?|ttf|otf)$/)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetchAndCache(request);
      }).catch(() => new Response('', { status: 404 }))
    );
    return;
  }

  // Network-first for HTML pages
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/')))
    );
    return;
  }

  // Stale-while-revalidate for other requests
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          event.waitUntil(updateCache(request));
          return cachedResponse;
        }
        return fetchAndCache(request);
      })
      .catch(() => {
        if (request.mode === 'navigate') {
          return caches.match('/');
        }
      })
  );
});

async function fetchAndCache(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      await cacheResponse(request, response.clone());
    }
    return response;
  } catch (error) {
    throw error;
  }
}

async function updateCache(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      await cacheResponse(request, response.clone());
    }
  } catch {
    // Network error - keep old cached version
  }
}

async function cacheResponse(request, response) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    await cache.put(request, response);
    const keys = await cache.keys();
    if (keys.length > CACHE_LIMIT) {
      await cache.delete(keys[0]);
    }
  } catch {
    // Cache write failed
  }
}

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data?.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
    );
  }
});
