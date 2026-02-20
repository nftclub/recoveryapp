/* ============================================
   SERVICE WORKER - PWA OFFLINE SUPPORT
   Cache-first strategy for app resources
   ============================================ */

const CACHE_NAME = 'recovery-journey-v3';
const RUNTIME_CACHE = 'recovery-journey-runtime';

// Core files to cache immediately
const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json'
];

// Google Fonts to cache (optional - will work offline)
const FONT_ASSETS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2'
];

/* ============================================
   INSTALL EVENT
   Cache core assets on installation
   ============================================ */

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching core assets');
        // Cache core files
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => {
        // Try to cache fonts, but don't fail if it doesn't work
        return caches.open(RUNTIME_CACHE)
          .then((cache) => {
            return Promise.allSettled(
              FONT_ASSETS.map(url => 
                cache.add(url).catch(err => console.log('[Service Worker] Font cache failed:', err))
              )
            );
          });
      })
      .then(() => {
        console.log('[Service Worker] Installation complete');
        // Force waiting service worker to become active
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[Service Worker] Installation failed:', error);
      })
  );
});

/* ============================================
   ACTIVATE EVENT
   Clean up old caches
   ============================================ */

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete old caches
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activation complete');
        // Take control of all pages immediately
        return self.clients.claim();
      })
  );
});

/* ============================================
   FETCH EVENT
   Cache-first strategy with network fallback
   ============================================ */

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('[Service Worker] Serving from cache:', request.url);
          return cachedResponse;
        }
        
        // Otherwise fetch from network
        console.log('[Service Worker] Fetching from network:', request.url);
        return fetch(request)
          .then((networkResponse) => {
            // Don't cache if not a valid response
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'error') {
              return networkResponse;
            }
            
            // Clone the response
            const responseToCache = networkResponse.clone();
            
            // Cache for future use (runtime cache)
            caches.open(RUNTIME_CACHE)
              .then((cache) => {
                cache.put(request, responseToCache);
              });
            
            return networkResponse;
          })
          .catch((error) => {
            console.error('[Service Worker] Fetch failed:', error);
            
            // Return offline page if we have one cached
            // For now, just let it fail gracefully
            return new Response(
              'Offline - Please check your internet connection',
              {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({
                  'Content-Type': 'text/plain'
                })
              }
            );
          });
      })
  );
});

/* ============================================
   MESSAGE EVENT
   Handle messages from clients
   ============================================ */

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  // Handle cache clear request
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});

/* ============================================
   PUSH NOTIFICATION (Optional - Future)
   Ready for push notifications if needed
   ============================================ */

self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'Stay strong on your journey!',
      icon: './icons/icon-192.png',
      badge: './icons/icon-192.png',
      vibrate: [200, 100, 200],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'Recovery Journey', options)
    );
  }
});

/* ============================================
   NOTIFICATION CLICK (Optional - Future)
   ============================================ */

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('./')
  );
});

/* ============================================
   END OF SERVICE WORKER
   ============================================ */