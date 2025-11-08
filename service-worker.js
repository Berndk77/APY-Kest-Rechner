self.addEventListener('install', (e)=>{
  e.waitUntil(
    caches.open('apy-cache-v2').then(cache => cache.addAll([
      './index.html',
      './manifest.webmanifest'
    ]))
  );
});
self.addEventListener('activate', (e)=>{
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k=>k!=='apy-cache-v2').map(k=>caches.delete(k))))
  );
});
self.addEventListener('fetch', (e)=>{
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});