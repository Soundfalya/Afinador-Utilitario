// Service worker del afinador: guarda la app en el dispositivo para que abra sin conexión.
// IMPORTANTE: subir VERSION cada vez que cambie cualquier archivo de ASSETS.
// Así los celulares con la app instalada descargan la copia nueva y ven el aviso de actualizar.
const VERSION = 'v1';
const CACHE = 'afinador-' + VERSION;
const ASSETS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'fonts/barlow-500.woff2',
  'fonts/barlow-600.woff2',
  'fonts/barlow-condensed-500.woff2',
  'fonts/barlow-condensed-600.woff2',
  'fonts/barlow-condensed-700.woff2',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/maskable-512.png',
  'icons/apple-touch-icon.png',
];
const NETWORK_TIMEOUT_MS = 3000;

self.addEventListener('install', e => {
  // cache:'reload' salta la caché HTTP del navegador para no guardar archivos viejos.
  // Si falla un archivo, la instalación se cancela y sigue la versión anterior completa.
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache:'reload' })))));
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('afinador-') && k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

// La página lo envía cuando el usuario toca "Actualizar"
self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') e.respondWith(networkFirst(req));
  else e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});

// La página: con red se ve lo último publicado; sin red o con red lenta, la copia guardada
async function networkFirst(req){
  const fromCache = async () =>
    (await caches.match(req, { ignoreSearch:true })) || (await caches.match('./', { cacheName:CACHE }));
  try {
    const res = await Promise.race([
      fetch(req),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), NETWORK_TIMEOUT_MS)),
    ]);
    if (res.ok) return res;
    return (await fromCache()) || res;
  } catch(err){
    const hit = await fromCache();
    if (hit) return hit;
    throw err;
  }
}
