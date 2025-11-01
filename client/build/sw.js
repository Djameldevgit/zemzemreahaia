// Actualiza APP_ROUTES para incluir las rutas críticas
const APP_ROUTES = [
  '/',
  '/search',
  '/profile', 
  '/notify',
  '/message',
  '/createpost',
  '/login',
  '/register'
];
// En tu service worker, agrega esto al inicio:
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Activar inmediatamente
  event.waitUntil(self.clients.claim()); // Tomar control inmediato
});
// Mejora la función handleAppRouteRequest
async function handleAppRouteRequest(request) {
  const cache = await caches.open(CACHE_NAMES.ROUTES);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    
    // Para rutas SPA, servir index.html
    if (request.destination === 'document') {
      const index = await cache.match('/');
      return index || createOfflinePage();
    }
    
    return createOfflinePage();
  }
}