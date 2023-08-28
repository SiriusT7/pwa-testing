// https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js

/* importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js')

workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst()
) */


/* if( 'undefined' === typeof window){
    importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js')
    addEventListener('message', onMessage)
 
    function onMessage(e) { 
        workbox.routing.registerRoute(
            ({request}) => request.destination === 'image',
            new workbox.strategies.CacheFirst()
        )
    }    
 } */


const cacheName = 'BibooKira';

// Cache all the files to make a PWA
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            // Our application only has two files here index.html and manifest.json
            // but you can add more such as style.css as your app grows
            return cache.addAll([
                './',
                './index.html',
                './manifest.json'
            ]);
        })
    );
});

// Our service worker will intercept all fetch requests
// and check if we have cached the file
// if so it will serve the cached file
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(cacheName)
            .then(cache => cache.match(event.request, { ignoreSearch: true }))
            .then(response => {
                return response || fetch(event.request);
            })
    );
});