/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/bower_components/polymer/lib/elements/array-selector.html","3c6b2faa0fc3fb3213d38d2c99d5e23f"],["/bower_components/polymer/lib/elements/custom-style.html","5f3b28865d7f8a469ee745438f6eb8d9"],["/bower_components/polymer/lib/elements/dom-bind.html","d869a21659b19a1460563cf75583b2a0"],["/bower_components/polymer/lib/elements/dom-if.html","847fb578e0b1f7c3947dba2736029da8"],["/bower_components/polymer/lib/elements/dom-module.html","7c5f90016ba36ee95561a57d405b6b96"],["/bower_components/polymer/lib/elements/dom-repeat.html","c2c4905e244f79585bd3a6a4f2e6a4eb"],["/bower_components/polymer/lib/legacy/class.html","8cb28f1797bc1783adcbb6d371c68217"],["/bower_components/polymer/lib/legacy/legacy-element-mixin.html","e916e594f1569b2bd460d56f6b554cbf"],["/bower_components/polymer/lib/legacy/mutable-data-behavior.html","bb4f75ba9c1cdc662c30ac2dcab6866f"],["/bower_components/polymer/lib/legacy/polymer-fn.html","69a632ca8a1d22137d8cdd19c0841b02"],["/bower_components/polymer/lib/legacy/polymer.dom.html","e3f165bcf2d187874fe0d66c61b51b4c"],["/bower_components/polymer/lib/legacy/templatizer-behavior.html","4b05abec9b19213ac3f19e7dc95086f4"],["/bower_components/polymer/lib/mixins/element-mixin.html","e3b1e56a719d19b1e92844d534b68236"],["/bower_components/polymer/lib/mixins/gesture-event-listeners.html","e969366e367a734ef6695125d6782c38"],["/bower_components/polymer/lib/mixins/mutable-data.html","3654cbe785028abee5e7129f051547a9"],["/bower_components/polymer/lib/mixins/property-accessors.html","374ab4f015f0617987a283338db9e04c"],["/bower_components/polymer/lib/mixins/property-effects.html","fec70f4b90d82e4a9812b4e2bea0d82c"],["/bower_components/polymer/lib/mixins/template-stamp.html","805832c65866e3d2c6c0bb811cf4f4c8"],["/bower_components/polymer/lib/utils/array-splice.html","7a80bca520c3f5a054c1c4577f51182c"],["/bower_components/polymer/lib/utils/async.html","63f34f2f19f465262ed75f98b5b008c3"],["/bower_components/polymer/lib/utils/boot.html","514f334a8b77eb9fb9ff20ce80a1167e"],["/bower_components/polymer/lib/utils/case-map.html","397d495f3eb392b59a65dfee0421b305"],["/bower_components/polymer/lib/utils/debounce.html","421059f73790524bb47ef4a35a7147f4"],["/bower_components/polymer/lib/utils/flattened-nodes-observer.html","64b37ed9fae48a40dd86c27f89bbe400"],["/bower_components/polymer/lib/utils/flush.html","5e9e55d5e5d7d88bfe3073f4536331ea"],["/bower_components/polymer/lib/utils/gestures.html","e7c1a9401cea61fcd839c1dadd6185aa"],["/bower_components/polymer/lib/utils/import-href.html","de2edb660b88a3f2f8b6927ee403fd6a"],["/bower_components/polymer/lib/utils/mixin.html","13a7fd82d2102098fe9f9c8d5edead7f"],["/bower_components/polymer/lib/utils/path.html","f09edb0bf2e7333a3d7ba33fe0984d6b"],["/bower_components/polymer/lib/utils/render-status.html","7e3320f4f773416af315bf7a59cc0ddb"],["/bower_components/polymer/lib/utils/resolve-url.html","15810a3ba447c460502e9cf7f04b64b5"],["/bower_components/polymer/lib/utils/style-gather.html","595515fcdf8cf59afba1d67d94a9deba"],["/bower_components/polymer/lib/utils/templatize.html","4aa89511eebcf937e3e2bf22a5b77c32"],["/bower_components/polymer/lib/utils/unresolved.html","bea349c4a71e9f4327da774afd73f8ae"],["/bower_components/polymer/polymer-element.html","54c861005cf028b03abab90e8de6221f"],["/bower_components/polymer/polymer.html","edc45d69a352ab2bcb32048524c02573"],["/bower_components/shadycss/apply-shim.html","a7855a6be7cd2ceab940f13c1afba1f3"],["/bower_components/shadycss/apply-shim.min.js","277361ab73f8e79c49943ef7f715ae20"],["/bower_components/shadycss/custom-style-interface.html","7784f566f143bec28bf67b864bedf658"],["/bower_components/shadycss/custom-style-interface.min.js","4432df93106e09f01f7c81360fe406bf"],["/bower_components/webcomponentsjs/webcomponents-loader.js","af79808d80256b0eaa28fae403df6104"],["/fonts/fonts.css","903d801d0c6885c3ae77eace6575ab65"],["/index.html","b7b2c7f28e95ef4781a222f056bbc46a"],["/infojack.css","2b04e246c9839019cad1d66a0c15183d"],["/src/controller/sound.js","4ca373e5aa661e2002c6a06ab93843bf"],["/src/infojack-app/infojack-app.html","bf5ba2c96564d3ee0e9a94d957f9291f"],["/src/infojack-app/infojack-controller.html","19a7d8d5674766e53c8a9864da9cccd4"],["/src/infojack-app/infojack-mainmenu.html","2204e51a2ba0b726c2f7329807280d4f"],["/src/infojack-app/infojack-radio.html","33b5eb7c3c4c6161dabc5377a21bf928"],["/src/infojack-app/infojack-style.html","38f9b23f1178f6289c9c9e41781fb6af"],["/src/infojack-app/infojack-topmenu.html","e93b7163f677e439685316bcbdf6defa"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







