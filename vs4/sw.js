/* Lern-App 4. Klasse: immer zuerst online laden (für Updates), offline aus dem Speicher */
const CACHE='vs4-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('vs4-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
  e.respondWith(fetch(r).then(res=>{if(res.ok){const k=res.clone();caches.open(CACHE).then(c=>c.put(r,k));}return res;}).catch(()=>caches.match(r)));});
