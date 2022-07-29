window.matchMedia||(window.matchMedia=function(){"use strict";var t,e,r,n=window.styleMedia||window.media;return n||(t=document.createElement("style"),e=document.getElementsByTagName("script")[0],r=null,t.type="text/css",t.id="matchmediajs-test",e.parentNode.insertBefore(t,e),r="getComputedStyle"in window&&window.getComputedStyle(t,null)||t.currentStyle,n={matchMedium:function(e){e="@media "+e+"{ #matchmediajs-test { width: 1px; } }";return t.styleSheet?t.styleSheet.cssText=e:t.textContent=e,"1px"===r.width}}),function(e){return{matches:n.matchMedium(e||"all"),media:e||"all"}}}()),function(a,c,e){"use strict";function t(e){"object"==typeof module&&"object"==typeof module.exports?module.exports=e:"function"==typeof define&&define.amd&&define("picturefill",function(){return e}),"object"==typeof a&&(a.picturefill=e)}var l,u,r,n,i,s;function o(e,t,r){t&&e.setAttribute("width",parseInt(t/r,10))}function d(e){for(var t,r,n,i,s=e||{},o=s.elements||l.getAllElements(),a=0,c=o.length;a<c;a++)if(r=(t=o[a]).parentNode,i=n=void 0,"IMG"===t.nodeName.toUpperCase()&&(t[l.ns]||(t[l.ns]={}),s.reevaluate||!t[l.ns].evaluated)){if(r&&"PICTURE"===r.nodeName.toUpperCase()){if(l.removeVideoShim(r),!1===(n=l.getMatch(t,r)))continue}else n=void 0;(r&&"PICTURE"===r.nodeName.toUpperCase()||!l.sizesSupported&&t.srcset&&u.test(t.srcset))&&l.dodgeSrcset(t),n?(i=l.processSourceSet(n),l.applyBestCandidate(i,t)):(i=l.processSourceSet(t),void 0!==t.srcset&&!t[l.ns].srcset||l.applyBestCandidate(i,t)),t[l.ns].evaluated=!0}}function p(){d({reevaluate:!0})}function m(){clearTimeout(i),i=setTimeout(p,60)}a.HTMLPictureElement?t(function(){}):(c.createElement("picture"),l=a.picturefill||{},u=/\s+\+?\d+(e\d+)?w/,l.ns="picturefill",l.srcsetSupported="srcset"in e,l.sizesSupported="sizes"in e,l.curSrcSupported="currentSrc"in e,l.trim=function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},l.makeUrl=(r=c.createElement("a"),function(e){return r.href=e,r.href}),l.restrictsMixedContent=function(){return"https:"===a.location.protocol},l.matchesMedia=function(e){return a.matchMedia&&a.matchMedia(e).matches},l.getDpr=function(){return a.devicePixelRatio||1},l.getWidthFromLength=function(e){if(!e||-1<e.indexOf("%")!=!1||!(0<parseFloat(e)||-1<e.indexOf("calc(")))return!1;e=e.replace("vw","%"),l.lengthEl||(l.lengthEl=c.createElement("div"),l.lengthEl.style.cssText="border:0;display:block;font-size:1em;left:0;margin:0;padding:0;position:absolute;visibility:hidden",l.lengthEl.className="helper-from-picturefill-js"),l.lengthEl.style.width="0px";try{l.lengthEl.style.width=e}catch(e){}return c.body.appendChild(l.lengthEl),(e=l.lengthEl.offsetWidth)<=0&&(e=!1),c.body.removeChild(l.lengthEl),e},l.detectTypeSupport=function(e,t){var r=new a.Image;return r.onerror=function(){l.types[e]=!1,d()},r.onload=function(){l.types[e]=1===r.width,d()},r.src=t,"pending"},l.types=l.types||{},l.initTypeDetects=function(){l.types["image/jpeg"]=!0,l.types["image/gif"]=!0,l.types["image/png"]=!0,l.types["image/svg+xml"]=c.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),l.types["image/webp"]=l.detectTypeSupport("image/webp","data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=")},l.verifyTypeSupport=function(e){var t,e=e.getAttribute("type");return null===e||""===e||("string"==typeof(t=l.types[e])&&"pending"!==t?(l.types[e]=l.detectTypeSupport(e,t),"pending"):"function"==typeof t?(t(),"pending"):t)},l.parseSize=function(e){e=/(\([^)]+\))?\s*(.+)/g.exec(e);return{media:e&&e[1],length:e&&e[2]}},l.findWidthFromSourceSize=function(e){for(var t,r=l.trim(e).split(/\s*,\s*/),n=0,i=r.length;n<i;n++){var s=r[n],s=l.parseSize(s),o=s.length,s=s.media;if(o&&((!s||l.matchesMedia(s))&&(t=l.getWidthFromLength(o))))break}return t||Math.max(a.innerWidth||0,c.documentElement.clientWidth)},l.parseSrcset=function(e){for(var t=[];""!==e;){var r,n=(e=e.replace(/^\s+/g,"")).search(/\s/g),i=null;-1!==n?(","!==(r=e.slice(0,n)).slice(-1)&&""!==r||(r=r.replace(/,+$/,""),i=""),e=e.slice(n+1),null===i&&(e=-1!==(n=e.indexOf(","))?(i=e.slice(0,n),e.slice(n+1)):(i=e,""))):(r=e,e=""),(r||i)&&t.push({url:r,descriptor:i})}return t},l.parseDescriptor=function(e,t){var t=t||"100vw",e=e&&e.replace(/(^\s+|\s+$)/g,""),r=l.findWidthFromSourceSize(t);if(e)for(var n=e.split(" "),i=n.length-1;0<=i;i--){var s,o=n[i],a=o&&o.slice(o.length-1);"h"!==a&&"w"!==a||l.sizesSupported?"x"===a&&(s=(a=o&&parseFloat(o,10))&&!isNaN(a)?a:1):s=parseFloat(parseInt(o,10)/r)}return s||1},l.getCandidatesFromSourceSet=function(e,t){for(var r=l.parseSrcset(e),n=[],i=0,s=r.length;i<s;i++){var o=r[i];n.push({url:o.url,resolution:l.parseDescriptor(o.descriptor,t)})}return n},l.dodgeSrcset=function(e){e.srcset&&(e[l.ns].srcset=e.srcset,e.srcset="",e.setAttribute("data-pfsrcset",e[l.ns].srcset))},l.processSourceSet=function(e){var t=e.getAttribute("srcset"),r=e.getAttribute("sizes"),n=[];return n=(t="IMG"===e.nodeName.toUpperCase()&&e[l.ns]&&e[l.ns].srcset?e[l.ns].srcset:t)?l.getCandidatesFromSourceSet(t,r):n},l.backfaceVisibilityFix=function(e){var t=e.style||{},r="webkitBackfaceVisibility"in t,n=t.zoom;r&&(t.zoom=".999",e.offsetWidth,t.zoom=n)},l.setIntrinsicSize=(n={},function(e,t){var r;e[l.ns]&&!a.pfStopIntrinsicSize&&(void 0===e[l.ns].dims&&(e[l.ns].dims=e.getAttribute("width")||e.getAttribute("height")),e[l.ns].dims||(t.url in n?o(e,n[t.url],t.resolution):((r=c.createElement("img")).onload=function(){if(n[t.url]=r.width,!n[t.url])try{c.body.appendChild(r),n[t.url]=r.width||r.offsetWidth,c.body.removeChild(r)}catch(e){}e.src===t.url&&o(e,n[t.url],t.resolution),e=null,r.onload=null,r=null},r.src=t.url)))}),l.applyBestCandidate=function(e,t){var r;e.sort(l.ascendingSort);for(var n,i=e[(n=e.length)-1],s=0;s<n;s++)if((r=e[s]).resolution>=l.getDpr()){i=r;break}i&&(i.url=l.makeUrl(i.url),t.src!==i.url&&(l.restrictsMixedContent()&&"http:"===i.url.substr(0,"http:".length).toLowerCase()?void 0!==window.console&&console.warn("Blocked mixed content image "+i.url):(t.src=i.url,l.curSrcSupported||(t.currentSrc=t.src),l.backfaceVisibilityFix(t))),l.setIntrinsicSize(t,i))},l.ascendingSort=function(e,t){return e.resolution-t.resolution},l.removeVideoShim=function(e){var t=e.getElementsByTagName("video");if(t.length){for(var r=t[0],n=r.getElementsByTagName("source");n.length;)e.insertBefore(n[0],r);r.parentNode.removeChild(r)}},l.getAllElements=function(){for(var e=[],t=c.getElementsByTagName("img"),r=0,n=t.length;r<n;r++){var i=t[r];("PICTURE"===i.parentNode.nodeName.toUpperCase()||null!==i.getAttribute("srcset")||i[l.ns]&&null!==i[l.ns].srcset)&&e.push(i)}return e},l.getMatch=function(e,t){for(var r,n=t.childNodes,i=0,s=n.length;i<s;i++){var o=n[i];if(1===o.nodeType){if(o===e)return r;if("SOURCE"===o.nodeName.toUpperCase()){null!==o.getAttribute("src")&&console.warn("The `src` attribute is invalid on `picture` `source` element; instead, use `srcset`.");var a=o.getAttribute("media");if(o.getAttribute("srcset")&&(!a||l.matchesMedia(a))){a=l.verifyTypeSupport(o);if(!0===a){r=o;break}if("pending"===a)return!1}}}}return r},l.initTypeDetects(),d(),s=setInterval(function(){d(),/^loaded|^i|^c/.test(c.readyState)&&clearInterval(s)},250),a.addEventListener?a.addEventListener("resize",m,!1):a.attachEvent&&a.attachEvent("onresize",m),d._=l,t(d))}(window,window.document,new window.Image);