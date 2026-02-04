// sw.js - Basic Service Worker for MoltWatch PWA
const CACHE_NAME = 'moltwatch-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.webmanifest',
    './icons/icon-192x192.png',
    './icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Simple cache-first strategy for assets
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
