// Service Worker for Reservasi Aula BPS PWA
// Version 3.0.0 - Client-Side Pagination + Lock Service

const CACHE_NAME = "reservasi-aula-bps-v3.0.0";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./logo.png",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js",
];

// Install event - cache resources
self.addEventListener("install", (event) => {
  console.log("Service Worker: Install event v3.0.0");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching files v3.0.0");
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log("Service Worker: All files cached v3.0.0");
        return self.skipWaiting();
      })
      .catch((err) => {
        console.error("Service Worker: Cache failed:", err);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activate event v3.0.0");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("Service Worker: Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("Service Worker: Cache cleanup complete v3.0.0");
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener("fetch", (event) => {
  // Skip Google Apps Script requests - always go to network for API calls
  if (event.request.url.includes("script.google.com")) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // If Google Apps Script is unreachable, return a custom offline response
        return new Response(
          JSON.stringify({
            success: false,
            message: "Sedang offline. Silakan coba lagi saat koneksi tersedia.",
            offline: true,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      })
    );
    return;
  }

  // For other requests, use cache-first strategy
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          console.log("Service Worker: Serving from cache:", event.request.url);
          return response;
        }

        console.log(
          "Service Worker: Fetching from network:",
          event.request.url
        );
        return fetch(event.request).then((response) => {
          // Don't cache if not a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache the fetched response
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
      .catch(() => {
        // Fallback for offline scenarios
        if (event.request.destination === "document") {
          return caches.match("./index.html");
        }
      })
  );
});

// Background sync (if supported)
self.addEventListener("sync", (event) => {
  console.log("Service Worker: Background sync:", event.tag);

  if (event.tag === "background-sync-reservasi") {
    event.waitUntil(
      // Handle background sync for booking submissions
      handleBackgroundSync()
    );
  }
});

async function handleBackgroundSync() {
  // This could be expanded to handle offline booking submissions
  console.log(
    "Service Worker: Performing background sync for reservations v3.0.0"
  );

  // Example: Retry failed API requests stored in IndexedDB
  // Implementation would depend on specific offline requirements
}

// Handle push notifications (if needed in future)
self.addEventListener("push", (event) => {
  const options = {
    body: event.data
      ? event.data.text()
      : "Notifikasi baru dari Reservasi Aula BPS",
    icon: "./logo.png",
    badge: "./logo.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "Lihat Detail",
        icon: "./logo.png",
      },
      {
        action: "close",
        title: "Tutup",
        icon: "./logo.png",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification("Reservasi Aula BPS", options)
  );
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "explore") {
    // Open the app
    event.waitUntil(clients.openWindow("./"));
  } else if (event.action === "close") {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(clients.openWindow("./"));
  }
});

// Handle messages from main thread
self.addEventListener("message", (event) => {
  console.log("Service Worker: Received message:", event.data);

  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "CACHE_UPDATE") {
    // Force update cache
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(urlsToCache);
      })
    );
  }
});

// Error handling
self.addEventListener("error", (event) => {
  console.error("Service Worker: Error occurred:", event.error);
});

self.addEventListener("unhandledrejection", (event) => {
  console.error("Service Worker: Unhandled promise rejection:", event.reason);
});

console.log("Service Worker: Script loaded successfully v3.0.0");
