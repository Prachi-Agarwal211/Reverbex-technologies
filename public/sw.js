// Service Worker for Reverbex Technologies
// Caches static assets for offline support and faster load times

const CACHE_NAME = 'reverbex-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/logo.PNG',
];

// Cache size limit
const CACHE_LIMIT = 50;

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((err) => {
        console.log('[SW] Cache install error:', err);
      })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map((key) => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached response and update cache in background
          event.waitUntil(updateCache(request));
          return cachedResponse;
        }

        // Not in cache - fetch from network
        return fetchAndCache(request);
      })
      .catch(() => {
        // Offline fallback for navigation requests
        if (request.mode === 'navigate') {
          return caches.match('/');
        }
      })
  );
});

// Fetch from network and cache the response
async function fetchAndCache(request) {
  try {
    const response = await fetch(request);
    
    // Only cache successful responses
    if (response.ok) {
      await cacheResponse(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.log('[SW] Fetch error:', error);
    throw error;
  }
}

// Update cache with fresh content
async function updateCache(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      await cacheResponse(request, response.clone());
    }
  } catch (error) {
    // Network error - keep old cached version
  }
}

// Cache response with size limit
async function cacheResponse(request, response) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    await cache.put(request, response);
    
    // Enforce cache size limit
    const keys = await cache.keys();
    if (keys.length > CACHE_LIMIT) {
      await cache.delete(keys[0]);
    }
  } catch (error) {
    console.log('[SW] Cache error:', error);
  }
}

// Message event - manual cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((keys) => {
        return Promise.all(
          keys.map((key) => caches.delete(key))
        );
      })
    );
  }
});
