const CACHE='lernapp-v2';
const KERN=['./','index.html','config.js','ki.js','manifest.webmanifest','cities.json','world.json','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(KERN)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  const u=new URL(r.url);
  if(/\/vs4\//.test(u.pathname)) return; // eigene App der 4. Klasse hat ihren eigenen Speicher
  // App-Seite: zuerst online (für Updates), sonst aus dem Speicher
  if(r.mode==='navigate'||/\/(index\.html|config\.js|ki\.js)$/.test(u.pathname)){ e.respondWith(fetch(r).then(res=>{ const k=res.clone(); caches.open(CACHE).then(c=>c.put(r.mode==='navigate'?'index.html':r,k)); return res; }).catch(()=>caches.match(r.mode==='navigate'?'index.html':r))); return; }
  // Alles andere: aus dem Speicher, sonst laden und merken
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{ if(res.ok||res.type==='opaque'){ const k=res.clone(); caches.open(CACHE).then(c=>c.put(r,k)); } return res; })));
});
