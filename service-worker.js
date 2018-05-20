var cacheName = 'simposium2018-1';
var filesToCache = [
   '/app.html',
   '/css/styles.css',
   '/css/sights.css',
   '/css/framework7.md.css',
   '/js/script.js',
   '/js/framework7.min.js',
   '/leaflet/leaflet.css',
   '/leaflet/leaflet.js',
   '/leaflet/images/layers.png',
   '/leaflet/images/layers-2x.png',
   '/leaflet/images/marker-icon-blue-10w.svg',
   '/leaflet/images/marker-icon-grey-10w.svg',
   '/leaflet/images/marker-icon-red-10w.svg',
   '/leaflet/images/marker-shadow.png',
   "/pages/Auerbach's Keller.html",
   '/pages/Cortex.html',
   '/pages/EU-security-rules.html',
   '/pages/Leipzig Zoo.html',
   '/pages/Madlerpassage.html',
   '/pages/Market Square.html',
   '/pages/Monument to the Battle of the Nations.html',
   '/pages/Motel One.html',
   '/pages/Museums.html',
   '/pages/Nikolaikirche.html',
   '/pages/Panometer Leipzig.html',
   '/pages/Panorama Tower.html',
   '/pages/Presents.html',
   '/pages/Thomaskirche.html',
   '/pages/Tourist-Information.html',
   '/pages/Zum Arabischen Coffe Baum.html',
   '/images/icons/ic_access_time.svg',
   '/images/icons/ic_bookmark.svg',
   '/images/icons/ic_chat.svg',
   '/images/icons/ic_directions_bike.svg',
   '/images/icons/ic_directions_bus.svg',
   '/images/icons/ic_directions_railway_DB.svg',
   '/images/icons/ic_directions_railway_UZ.svg',
   '/images/icons/ic_directions_run.svg',
   '/images/icons/ic_euro_symbol.svg',
   '/images/icons/ic_flight_UIA.svg',
   '/images/icons/ic_group.svg',
   '/images/icons/ic_local_cafe.svg',
   '/images/icons/ic_looks_one.svg',
   '/images/icons/ic_map.svg',
   '/images/icons/ic_near_me.svg',
   '/images/icons/ic_restaurant.svg',
   '/images/icons/ic_shopping_cart.svg',
   '/images/icons/location-mark.svg',
   '/images/itinerary/baggage.png',
   '/images/itinerary/baggage-sample.png',
   '/images/itinerary/dangerous_goods.png',
   '/images/itinerary/DB-logo.svg',
   '/images/itinerary/EU-flag.PNG',
   '/images/itinerary/liquid-bag.PNG',
   '/images/itinerary/UIA-text-logo.png',
   '/images/itinerary/UZ-logo.png',
   "/images/sights/Auerbach's Keller.jpg",
   '/images/sights/City center map.jpg',
   '/images/sights/Cortex.jpg',
   '/images/sights/Leipzig Zoo.jpg',
   '/images/sights/Madlerpassage.jpg',
   '/images/sights/Map.svg',
   '/images/sights/Market Square.jpg',
   '/images/sights/Monument to the Battle of the Nations.jpg',
   '/images/sights/Motel One.jpg',
   '/images/sights/Museums.jpg',
   '/images/sights/Nikolaikirche.jpg',
   '/images/sights/Panometer Leipzig.jpg',
   '/images/sights/Panorama Tower.jpg',
   '/images/sights/Presents.jpg',
   '/images/sights/Thomaskirche.jpg',
   '/images/sights/Tourist-Information.jpg',
   '/images/sights/Zum Arabischen Coffe Baum.jpg',   
   "/images/sights/small/Auerbach's Keller.png",
   '/images/sights/small/Cortex.png',
   '/images/sights/small/Leipzig Zoo.png',
   '/images/sights/small/Madlerpassage.png',
   '/images/sights/small/Market Square.png',
   '/images/sights/small/Monument to the Battle of the Nations.png',
   '/images/sights/small/Motel One.png',
   '/images/sights/small/Museums.png',
   '/images/sights/small/Nikolaikirche.png',
   '/images/sights/small/Panometer Leipzig.png',
   '/images/sights/small/Panorama Tower.png',
   '/images/sights/small/Presents.png',
   '/images/sights/small/Thomaskirche.png',
   '/images/sights/small/Tourist-Information.png',
   '/images/sights/small/Zum Arabischen Coffe Baum.png',
   '/images/speakers/A Gu_O.png',
   '/images/speakers/All_O.png',
   '/images/speakers/Andrey Ugarov_O.png',
   '/images/speakers/Dmitry Stepanenko_O.png',
   '/images/speakers/Juergen Koellner_O.png',
   '/images/speakers/Sergey Starkov_O.png',
   '/images/speakers/Steffen Thiele_O.png',
   '/images/speakers/Uwe Seifert_O.png',
   '/images/speakers/Vladislav Shkljar_O.png',
   '/images/speakers/Volodymyr Kulish_O.png',
   '/images/weather/weather-hero.png'
];

self.addEventListener('install', function(e) {
   console.log('[Service Worker] Install');
   e.waitUntil(
      caches.open(cacheName).then(function(cache) {
         console.log('[Service Worker] Caching app shell');
         return cache.addAll(filesToCache);
      })
   );
});

self.addEventListener('fetch', function(e) {
   console.log('[Service Worker] Fetch', e.request.url);

   e.respondWith(
      caches.match(e.request).then(function(response) {
         return response || fetch(e.request);
      })
   );
});
