/* Permet à l'app de s'ouvrir sans connexion une fois installée sur le téléphone.
   On garde une copie de la page ; les appels à Google et à Yahoo passent toujours par le réseau. */

const CACHE = "comptes-v1";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-180.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  // jamais de cache pour les cours et la synchro : il faut du frais, ou rien
  if (url.origin !== self.location.origin) return;
  if (e.request.method !== "GET") return;

  // on sert le réseau en priorité et on met à jour la copie ; hors ligne, on ressort la copie
  e.respondWith(
    fetch(e.request)
      .then(r => {
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return r;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
  );
});
