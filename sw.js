self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('supabase.co') ||
      event.request.url.includes('fonts.googleapis.com')) return;
  event.respondWith(
    caches.open('planner-v1').then(cache =>
      cache.match(event.request).then(resp =>
        resp || fetch(event.request).then(r => { cache.put(event.request, r.clone()); return r; })
      )
    )
  );
});
