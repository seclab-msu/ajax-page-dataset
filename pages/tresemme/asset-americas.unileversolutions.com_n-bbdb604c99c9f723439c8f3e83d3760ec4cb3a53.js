!function(e){var t=function(s,f){"use strict";var e=function(){var i,l,o,c=f.querySelector(".community-enabled");function u(e,t,r,n){if(s[e]&&s[e][t]&&s[e][t].dataFlag==="true"){var a=s[e];clearInterval(r);if(s.personalisedData&&s.personalisedData.userData&&s.personalisedData.userData.dataFlag==="true")p(s.personalisedData);d(a,t)}else if(h("sign-up-progressive_"+n)){var i=JSON.parse(localStorage.getItem("sign-up-progressive_"+n));v(i)}return""}return{init:function(){$(f).ready(function(){var e=f.body.getAttribute("data-locale"),t=f.querySelector(".en-flexible"),r=t?t.dataset["communityLocale"]:"";o=setInterval(function(){u("weatherStoreData","weather",o,e)},999);l=setInterval(function(){u("locationStoreData","location",l,e)},999);if(m("token")!==""||h("locale")&&h("sign-up-progressive_"+e))i=setInterval(function(){u("personalisedData","userData",i,e)},999);else p("");if(c){var n=r==="true"?"_cmId_"+e:"_cmId";if(m(n)){var a=JSON.parse(localStorage.getItem("communityUserDetails_"+e));g(a)}}return""})}}}(),p=function(t){var e=$('[title*="%"]'),r,n;_.each(e,function(e){r=$(e).attr("title");if(m("token")!==""){n=$($.parseHTML(r)).text().replace("<@=","").replace("@>","");n=n.replace(/%(.*?)%/g,function(e){if(n.split("%")[1].length)return t.userData[n.split("%")[1].trim()]})}else n=r.replace(/(<([^>]+)>)/gi,"");$(e).attr("title",n)})},g=function(n){var a,i=RegExp(/%(\S.*?)%/g),l,o;_.each($(".profile-userDetails"),function(e){l=e.innerHTML.replace("&lt;@=","").replace(" @&gt;","");o=l.match(i);if(o!==null)a=o.map(function(e){return e.replace(/%/g,"")});if(a&&a.length)for(var t=0;t<a.length;t++){var r;r=n[a[t].split(".")[1]];if(typeof r==="string"){l=l.replace(a[t],r).replace(/%/g,"");e.classList.remove("hidden")}}e.innerHTML=l})},d=function(n,a){var i,l=RegExp(/%(\S.*?)%/g),o,c;_.each($(".profile-userDetails"),function(e){o=e.innerHTML.replace("&lt;@=","").replace(" @&gt;","");c=o.match(l);if(c!==null)i=c.map(function(e){return e.replace(/%/g,"")});if(i&&i.length)for(var t=0;t<i.length;t++){var r;r=n[a][i[t]];if(!r)if(Object.keys(n[a]).join(",").indexOf(i[t].split(".")[0])>-1)r="";if(typeof r==="string"){o=o.replace(i[t],r).replace(/%/g,"");e.classList.remove("hidden")}}e.innerHTML=o})},v=function(n){var a,i=RegExp(/%(\S.*?)%/g),l,o;_.each($(".profile-userDetails"),function(e){l=e.innerHTML.replace("&lt;@=","").replace(" @&gt;","");o=l.match(i);if(o!==null)a=o.map(function(e){return e.replace(/%/g,"")});if(a&&a.length)for(var t=0;t<a.length;t++){var r=n[a[t]];if(typeof r==="undefined")r="";l=l.replace(a[t],r)}l=l.replace(/%/g,"");e.innerHTML=l;e.classList.remove("hidden")})},m=function(e){var t,r;if(f.cookie.length>0){t=f.cookie.indexOf(e+"=");if(t!==-1){t=t+e.length+1;r=f.cookie.indexOf(";",t);if(r===-1)r=f.cookie.length;return f.cookie.substring(t,r)}}return""},h=function(e){if(t()&&localStorage.getItem(e))return true;else return false},t=function(){try{if(localStorage.getItem)return true}catch(e){return false}};return e.init(),{getCookie:m,init:e.init}}(e,e.document);e.personalisation=t,"object"==typeof module&&module.exports&&(module.exports=t)}(window);