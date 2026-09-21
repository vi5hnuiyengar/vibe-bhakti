/*
  Offline support. Word pictures are not listed below: they are saved the
  first time each one is shown, so the first visit stays small. Always tries the network first so updates show up at once,
  and falls back to the saved copy when there is no connection.
  When you change files, you do not need to touch this. Bumping VERSION only clears old copies.
*/
var VERSION = "vibhakti-v2";
var FILES = [
  "./", "index.html", "css/style.css", "manifest.webmanifest",
  "js/grammar.js", "js/words.js", "js/images.js", "js/audio.js", "js/frames.js", "js/pronouns.js", "js/pronoun-frames.js", "js/lipi.js", "js/stories-l1.js", "js/store.js", "js/questions.js", "js/lipi-questions.js", "js/pron-questions.js",
  "js/app-shell.js", "js/app-drill.js", "js/app-read.js", "js/app-script.js", "js/app-settings.js",
  "fonts/TiroDevanagariSanskrit-Regular.woff2", "fonts/Mukta-Regular.woff2", "fonts/Mukta-SemiBold.woff2",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(function (res) {
      var copy = res.clone();
      caches.open(VERSION).then(function (c) { c.put(e.request, copy); });
      return res;
    }).catch(function () {
      return caches.match(e.request).then(function (hit) { return hit || caches.match("index.html"); });
    })
  );
});
