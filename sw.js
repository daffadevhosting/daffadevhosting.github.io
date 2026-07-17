const CACHE_NAME = "blog-cache-v1";

const FILES = [
  "/",
  "/manifest.json",
  "/assets/css/style.css"
];

self.addEventListener("install",(event)=>{

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache=>cache.addAll(FILES))

        .then(()=>self.skipWaiting())

    );

});

self.addEventListener("activate",(event)=>{

    event.waitUntil(

        caches.keys().then(keys=>{

            return Promise.all(

                keys.map(key=>{

                    if(key!==CACHE_NAME){

                        return caches.delete(key);

                    }

                })

            );

        }).then(()=>self.clients.claim())

    );

});

self.addEventListener("fetch",(event)=>{

    if(event.request.method!=="GET") return;

    event.respondWith(

        caches.match(event.request)

        .then(cache=>{

            return cache ||

            fetch(event.request)

            .then(res=>{

                const copy=res.clone();

                caches.open(CACHE_NAME)

                .then(c=>c.put(event.request,copy));

                return res;

            })

            .catch(()=>cache);

        })

    );

});