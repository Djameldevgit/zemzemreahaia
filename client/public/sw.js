// 🔧 CONFIGURACIÓN AGENCE VOYAGE
const APP_VERSION = 'v2.1.0';
const CACHE_NAMES = {
  STATIC: `agence-voyage-static-${APP_VERSION}`,
  API: `agence-voyage-api-${APP_VERSION}`,
  IMAGES: `agence-voyage-images-${APP_VERSION}`,
  ROUTES: `agence-voyage-routes-${APP_VERSION}`
};

// 🗂️ RECURSOS CRÍTICOS - Todas las rutas que deben funcionar offline
const CRITICAL_ASSETS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/icon-web-01.png',
  '/favicon.ico'
];

// 🗺️ RUTAS DE LA APLICACIÓN - Cachear para modo offline
const APP_ROUTES = [
  '/',
  '/index',
  '/profile',
  '/message', 
  '/search',
  '/notify',
  '/createpost',
  '/voyage-organise',
  '/location-vacances',
  '/hadj-omra',
  '/login',
  '/register'
];

// 🎯 ESTRATEGIAS
const CACHE_STRATEGIES = {
  STATIC: 'cache-first',
  API: 'network-first',
  IMAGES: 'cache-first',
  ROUTES: 'network-first'
};

// 📦 INSTALACIÓN - Cachear recursos críticos y rutas
self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker Agence Voyage instalando...', APP_VERSION);
  
  event.waitUntil(
    Promise.all([
      cacheCriticalAssets(),
      cacheAppRoutes()
    ]).then(() => {
      console.log('✅ Instalación completada - Agence Voyage lista');
      return self.skipWaiting();
    }).catch(error => {
      console.error('❌ Error en instalación:', error);
    })
  );
});

// 🎯 ACTIVACIÓN - Limpiar caches antiguos
self.addEventListener('activate', (event) => {
  console.log('🔋 Service Worker Agence Voyage activado');
  
  event.waitUntil(
    Promise.all([
      cleanupOldCaches(),
      enableNavigationPreload()
    ]).then(() => {
      console.log('🔄 Service Worker listo para controlar clientes');
      return self.clients.claim();
    })
  );
});

// 🌐 INTERCEPTAR PETICIONES
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo manejar peticiones HTTP/HTTPS y del mismo origen
  if (!url.protocol.startsWith('http') || url.origin !== self.location.origin) {
    return;
  }

  // Estrategias según el tipo de recurso
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
  }
  else if (isAppRoute(url)) {
    event.respondWith(handleAppRouteRequest(request));
  }
  else if (isStaticAsset(url)) {
    event.respondWith(handleStaticRequest(request));
  }
  else if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
  }
  else {
    event.respondWith(handleDefaultRequest(request));
  }
});

// 📱 MANEJO DE SINCRONIZACIÓN EN SEGUNDO PLANO
self.addEventListener('sync', (event) => {
  console.log('🔄 Sincronización en background:', event.tag);
  
  switch (event.tag) {
    case 'background-sync-posts':
      event.waitUntil(backgroundSyncPosts());
      break;
    case 'background-sync-messages':
      event.waitUntil(backgroundSyncMessages());
      break;
    default:
      console.log('Sincronización no manejada:', event.tag);
  }
});

// 🔔 MANEJO DE NOTIFICACIONES PUSH
self.addEventListener('push', (event) => {
  console.log('📲 Notificación push recibida');
  
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body || 'Nouvelle notification Agence Voyage',
    icon: '/icon-web-01.png',
    badge: '/icon-web-01.png',
    image: data.image,
    data: data.url,
    actions: [
      {
        action: 'open',
        title: 'Ouvrir'
      },
      {
        action: 'close',
        title: 'Fermer'
      }
    ],
    tag: data.tag || 'agence-voyage',
    requireInteraction: true
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Agence Voyage', options)
  );
});

// 👆 MANEJO DE CLICKS EN NOTIFICACIONES
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 Notificación clickeada:', event.notification.tag);
  event.notification.close();

  if (event.action === 'open' || event.action === '') {
    const urlToOpen = event.notification.data || '/';
    
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then((clientList) => {
          // Buscar si ya hay una ventana abierta
          for (const client of clientList) {
            if (client.url === urlToOpen && 'focus' in client) {
              return client.focus();
            }
          }
          
          // Abrir nueva ventana si no existe
          if (clients.openWindow) {
            return clients.openWindow(urlToOpen);
          }
        })
    );
  }
});

// 🛠️ FUNCIONES DE CACHE

async function cacheCriticalAssets() {
  const cache = await caches.open(CACHE_NAMES.STATIC);
  return cache.addAll(CRITICAL_ASSETS);
}

async function cacheAppRoutes() {
  const cache = await caches.open(CACHE_NAMES.ROUTES);
  const cachePromises = APP_ROUTES.map(route => {
    return cache.add(route).catch(err => {
      console.warn(`No se pudo cachear ruta ${route}:`, err);
    });
  });
  return Promise.all(cachePromises);
}

async function cleanupOldCaches() {
  const cacheKeys = await caches.keys();
  const deletePromises = cacheKeys.map(key => {
    if (!Object.values(CACHE_NAMES).includes(key)) {
      console.log('🗑️ Eliminando cache antiguo:', key);
      return caches.delete(key);
    }
  });
  return Promise.all(deletePromises);
}

async function enableNavigationPreload() {
  if (self.registration.navigationPreload) {
    await self.registration.navigationPreload.enable();
  }
}

// 🎯 ESTRATEGIAS DE CACHE

// Para APIs - Network First con fallback elegante
async function handleApiRequest(request) {
  const cache = await caches.open(CACHE_NAMES.API);
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('🌐 Fallando a cache para API:', request.url);
    
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Respuesta elegante para offline
    return new Response(
      JSON.stringify({ 
        success: false,
        error: 'offline',
        message: 'Agence Voyage - Mode hors ligne activé. Vos données seront synchronisées dès que la connexion sera rétablie.',
        timestamp: new Date().toISOString()
      }),
      { 
        status: 503,
        headers: { 
          'Content-Type': 'application/json',
          'X-Offline': 'true'
        }
      }
    );
  }
}

// Para rutas de la aplicación - Network First con fallback a cache
async function handleAppRouteRequest(request) {
  try {
    // Intentar primero con network
    const networkResponse = await fetch(request);
    
    // Cachear respuesta exitosa
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAMES.ROUTES);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('📱 Ruta offline, sirviendo desde cache:', request.url);
    
    // Buscar en cache de rutas
    const cache = await caches.open(CACHE_NAMES.ROUTES);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback a la página principal
    const fallbackResponse = await cache.match('/');
    if (fallbackResponse) {
      return fallbackResponse;
    }
    
    // Último recurso - servir página offline básica
    return createOfflinePage();
  }
}

// Para assets estáticos - Cache First
async function handleStaticRequest(request) {
  const cache = await caches.open(CACHE_NAMES.STATIC);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Fallback elegante para HTML
    if (request.destination === 'document') {
      return createOfflinePage();
    }
    throw error;
  }
}

// Para imágenes - Cache First con actualización en background
async function handleImageRequest(request) {
  const cache = await caches.open(CACHE_NAMES.IMAGES);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Actualizar en background
    fetch(request).then(networkResponse => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse);
      }
    }).catch(() => {}); // Silenciar errores de actualización
    
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Imagen placeholder para offline
    return new Response(
      `<svg width="200" height="150" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f0f0f0"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#666" font-family="Arial">
          Agence Voyage
        </text>
      </svg>`,
      { 
        headers: { 'Content-Type': 'image/svg+xml' }
      }
    );
  }
}

// Estrategia por defecto
async function handleDefaultRequest(request) {
  const cache = await caches.open(CACHE_NAMES.STATIC);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  return fetch(request);
}

// 🔧 FUNCIONES AUXILIARES

function isAppRoute(url) {
  return APP_ROUTES.some(route => 
    url.pathname === route || 
    url.pathname.startsWith(route + '/')
  );
}

function isStaticAsset(url) {
  return url.pathname.startsWith('/static/') ||
         /\.(js|css|json|woff|woff2|ttf|eot)$/.test(url.pathname);
}

function isImageRequest(request) {
  return request.destination === 'image' || 
         /\.(jpg|jpeg|png|gif|webp|svg)$/.test(new URL(request.url).pathname);
}

function createOfflinePage() {
  const offlineHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Agence Voyage - Mode Hors Ligne</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: linear-gradient(135deg, #2c5aa0 0%, #1e3a8a 100%);
            color: white;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
          .offline-container { max-width: 400px; }
          .icon { font-size: 4em; margin-bottom: 20px; }
          h1 { margin-bottom: 10px; }
          p { margin-bottom: 20px; opacity: 0.9; }
          button { 
            background: white; 
            color: #2c5aa0; 
            border: none; 
            padding: 10px 20px; 
            border-radius: 5px; 
            cursor: pointer;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="offline-container">
          <div class="icon">📡</div>
          <h1>Mode Hors Ligne</h1>
          <p>Agence Voyage fonctionne en mode dégradé. Certaines fonctionnalités nécessitent une connexion Internet.</p>
          <p>Vous pouvez toujours consulter vos voyages sauvegardés et créer de nouvelles annonces.</p>
          <button onclick="window.location.reload()">Réessayer</button>
        </div>
      </body>
    </html>
  `;
  
  return new Response(offlineHTML, {
    headers: { 'Content-Type': 'text/html' }
  });
}

// 🔄 FUNCIONES DE SINCRONIZACIÓN

async function backgroundSyncPosts() {
  console.log('🔄 Sincronizando posts en background...');
  // Aquí iría la lógica para sincronizar posts pendientes
}

async function backgroundSyncMessages() {
  console.log('🔄 Sincronizando mensajes en background...');
  // Aquí iría la lógica para sincronizar mensajes pendientes
}

// 📲 MANEJO DE MENSAJES DESDE LA APP
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'CACHE_ROUTE':
      if (payload && payload.url) {
        cacheRoute(payload.url);
      }
      break;
      
    case 'GET_CACHE_INFO':
      getCacheInfo().then(info => {
        event.ports[0].postMessage(info);
      });
      break;
      
    default:
      console.log('Mensaje no manejado:', type);
  }
});

async function cacheRoute(url) {
  try {
    const cache = await caches.open(CACHE_NAMES.ROUTES);
    await cache.add(url);
    console.log('✅ Ruta cacheadada:', url);
  } catch (error) {
    console.error('❌ Error cacheando ruta:', url, error);
  }
}

async function getCacheInfo() {
  const cacheKeys = await caches.keys();
  const cacheInfo = {};
  
  for (const cacheName of cacheKeys) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    cacheInfo[cacheName] = requests.length;
  }
  
  return {
    version: APP_VERSION,
    caches: cacheInfo,
    timestamp: new Date().toISOString()
  };
}

console.log('🎯 Service Worker Agence Voyage cargado - Versión:', APP_VERSION);