try{window.adcm.ext({knownIds:[7462,7457,7452,7450,7449,7446,7443,7442,7435,7434,7433,7415,7414,7393,7356,7344,7309,7292,7237,7120,6679,6637,6628,6624,6524,6505,6504,6463,6432,6414,6412,6405,6384,6383,6380,6371,6370,6368,6364,6363,6358,6343,6336,6331,6328,6321,6284,6242,6226,6026,6016,6015,2210,2025,1131,1103,1086,1083,1082,1079,1078,1075,1073,1072,1067,1066,1065,1064,1034,168,143,127],hardSync:function(t){try{t=t||[7238,7210,7209,7208,7243,7244,7245,7246,7247,7248,7249,7250,7251,7252,7253,7254,7255,7256,7257,7258,7259,7260,7261,7229,7230,7231,7232,7233,7091,7241,6534];var e=Math.floor(Math.random()*t.length);void 0!==t[e]&&adcm.callpixel(t[e])}catch(t){}},encode:function(t){return encodeURIComponent(t)},encodeFull:function(t){return encodeURIComponent(t).replace(/\./g,"%2E")},equal:function(t,e){if(!t||!e)return!1;if(t.length!=e.length)return!1;for(var n=0,o=t.length;n<o;n++)if(t[n]instanceof Array&&e[n]instanceof Array){if(!this.equal(t[n],e[n]))return!1}else if(t[n]!=e[n])return!1;return!0},blank:function(t){return t||""},aggregate:function(t){var e=document.referrer,n=window.location.hash,o=[],i="i="+this.session+".";t.extdataid?i+=this.encode(t.extdataid):i+=Math.round(1e15*Math.random()),t.profileId&&t.platformId&&(i+="&a="+(r=this.encode(t.platformId))+"&e="+(c=this.encodeFull(t.profileId)),o.push("ss:"+r),o.push("up:"+c),o.push("sync:up")),t&&t.idSessionDomain&&o.push("xdua:"+this.encode(t.idSessionDomain)),t&&t.idSessionPage&&o.push("xps:"+this.encode(t.idSessionPage)),t&&t.ga&&o.push("xga:"+this.encodeFull(t.ga.replace(/[\.]+/g,"_"))),t&&t.gid&&o.push("xgid:"+this.encodeFull(t.gid.replace(/[\.]+/g,"_"))),t.tm&&(o.push("tm:"+this.encode(t.tm)),t.tmstart&&o.push("tmstart:"+this.encode(t.tmstart)),t.tmend&&o.push("tmend:"+this.encode(t.tmend)),t.tmpoints&&o.push("tmpoints:"+this.encode(t.tmpoints)),t.tminterval&&o.push("tminterval:"+this.encode(t.tminterval)),t.tmiter&&o.push("tmiter:"+this.encode(t.tmiter))),t&&t.event&&o.push("et:"+this.encode(t.event)),t&&t.price&&o.push("ip:"+this.encode(t.price)),t&&t.elapsed_seconds&&o.push("es:"+this.encode(t.elapsed_seconds)),this.params||(this.params={referrer:/\/\/([^#]*)/gi.exec(e||window.location.href)[1],hash:null,tags:null});function a(t){return(t=(t=t.replace(/[^a-z0-9\.]+/g,"_")).replace(/[\_\_]+/g,"_")).replace(/[\.]+/g,"__")}var r=window.location.hostname,c=a((r="www."===r.substring(0,4)?r.substring(4,r.length):r).substring(r.lastIndexOf(".",r.lastIndexOf(".")-1)+1));if((r=a(r))!==c&&o.push("dn:"+this.encode(r)),o.push("dn:"+this.encode(c)),o.push("adcm:hit"),void 0===t.tags&&(t.tags=[]),"http:"===window.location.protocol&&t.tags.push("http"),t.tags&&o.push("tg:"+this.encode(t.tags.join(" "))),this.blank(n)!==this.blank(this.params.hash)&&(o.push("rh:"+this.encode(n.substr(1))),this.params.hash=n),/\/\/([^#]*)/gi.exec(window.location.href)[1]!==this.params.referrer&&e&&void 0!==e&&(i+="&pref="+this.encode(e)),0<Object.keys(t.tagsRaw).length)for(var s in t.tagsRaw)i+="&tg_"+s+"="+encodeURIComponent(t.tagsRaw[s]);return 0<o.length&&(i+="&c="+o.join(".")),this.config.triggers.catchRef.enable&&(o=document.location.href,void 0!==t.ref&&t.ref?o=t.ref:this.config.triggers.catchRef.referrer&&(o=this.config.triggers.catchRef.referrer),i+="&ref="+encodeURIComponent(o)),i},relocate:function(t){0<=this.knownIds.indexOf(this.config.id)?this.load(t,"https://tag.digitaltarget.ru/extensions/extension_"+this.config.id+".js?i="+Math.round(1e15*Math.random())):"function"==typeof t()&&t()},array_unique:function(t){var e=[];return t.forEach(function(t){t=t.trim(),-1===e.indexOf(t)&&e.push(t)}),e},call:function(n){var o=this;if(n)if(n.tags?(n.tags=n.tags.concat(o.config.tags),n.tags=o.array_unique(n.tags)):n.tags=o.config.tags,n.tagsRaw){if(0<Object.keys(o.config.tagsRaw).length)for(var t in o.config.tagsRaw)n.tagsRaw[t]=o.config.tagsRaw[t]}else n.tagsRaw=o.config.tagsRaw;else n={tags:o.config.tags,tagsRaw:o.config.tagsRaw};(n.profileId||this.config.profileId)&&(n.profileId=n.profileId||this.config.profileId,n.platformId=n.platformId||this.config.platformId||this.config.id),n.extdataid=n.extdataid||this.config.extdataid,n.idSessionDomain=n.idSessionDomain||this.config.idSessionDomain,n.idSessionPage=n.idSessionPage||this.config.idSessionPage,!1===this.config.triggers.gaid.loaded&&this.triggers.gaid(),n.ga=n.ga||this.config.ids.ga,n.gid=n.gid||this.config.ids.gid;function e(){var t=new Image;try{"function"==typeof n.success?t.onload=n.success:"function"==typeof o.config.triggers.push_to_server.success&&(t.onload=o.config.triggers.push_to_server.success),"function"==typeof n.error?t.onload=n.error:"function"==typeof o.config.triggers.push_to_server.error&&(t.onerror=o.config.triggers.push_to_server.error)}catch(t){}var e=n.id||o.config.id;t.src=window.location.protocol+"//dmg.digitaltarget.ru/1/"+e+"/i/i?"+o.aggregate(n)}var i;this.loaded?e():i=setInterval(function(){o.loaded&&(e(),clearInterval(i))},1e3)},callpixel:function(t){function e(){(new Image).src=window.location.protocol+"//dmg.digitaltarget.ru/1/"+t+"/i/i?"+i+"&c=tg:adcm_pc"}var n,o=this,i="i="+this.session+"."+Math.round(1e15*Math.random());this.loaded?e():n=setInterval(function(){o.loaded&&(e(),clearInterval(n))},1e3)},callextpixel:function(t,e){var n,o,i;void 0!==e&&e||(e="https"),void 0!==(t=t.toString())&&t?(o=function(){(new Image).src=e+":"+t},(n=this).loaded?o():i=setInterval(function(){n.loaded&&(o(),clearInterval(i))},1e3)):console.log("ADCM: Invalid external pixel url")},sessionManager:{page:{set:function(t){try{window.sessionStorage&&void 0!==window.sessionStorage.setItem&&window.sessionStorage.setItem("_84hUio38",t)}catch(t){}},get:function(){var t=window.adcm;try{if(window.sessionStorage&&void 0!==window.sessionStorage.getItem){var e=window.sessionStorage.getItem("_84hUio38");if(e)return e;var n=t.sessionManager._generateRandomString("xps");return t.sessionManager.page.set(n),n}}catch(t){}}},domain:{set:function(t){var e="_a_d3t6sf";window.adcm;try{window.localStorage&&void 0!==window.localStorage.setItem&&window.localStorage.setItem(e,t),document.cookie=e+"="+t+"; expires=Thu, 01 Jan 2024 00:00:00 UTC; path=/"}catch(t){}},get:function(){var t="_a_d3t6sf",e=window.adcm;try{if(window.localStorage&&void 0!==window.localStorage.getItem){var n=window.localStorage.getItem(t);if(n)return e.sessionManager.domain.set(n),n}}catch(t){}try{var o=document.cookie.replace(new RegExp("(?:(?:^|.*;s*)"+t+"s*=s*([^;]*).*$)|^.*$"),"$1");if(o)return e.sessionManager.domain.set(o),o}catch(t){}try{var i=e.sessionManager._generateRandomString("du");return e.sessionManager.domain.set(i),i}catch(t){}}},_generateRandomString:function(t){try{for(var e="",n="wIVhxG0YUu56jA9DKZqt2EeviXpL3kF8dcP4_NybsmHQ1glBozSJfR7MarOWCTn",o=0;o<22;o++)e+=n.charAt(Math.floor(Math.random()*n.length));return t+e}catch(t){}}},triggers:{trackMouse:function(){try{var wt=window.adcm,vt=wt.config.triggers.trackMouse;if(!vt.enable)return!1;var a=Math.sqrt,_t=Math.abs,r=function(t){return Math.pow(t,2)},n=function(t,e){return _t(t-e)},yt=function(t){t.sort(function(t,e){return t[0]==e[0]?t[1]-e[1]:t[0]-e[0]});for(var e=[],n=0;n<t.length;n++){for(;2<=e.length&&c(e[e.length-2],e[e.length-1],t[n])<=0;)e.pop();e.push(t[n])}for(var o=[],n=t.length-1;0<=n;n--){for(;2<=o.length&&c(o[o.length-2],o[o.length-1],t[n])<=0;)o.pop();o.push(t[n])}return o.pop(),e.pop(),e.concat(o)},c=function(t,e,n){return(t[0]-n[0])*(e[1]-n[1])-(t[1]-n[1])*(e[0]-n[0])},Mt=function(t,e){var n=[];for(i=0;i<t.length;i++)n.push([t[i],e[i]]);return n},xt=function(t){for(var e=0,n=0,o=t.length;n<o;n++)e+=t[n][0]*t[n===t.length-1?0:n+1][1]*.5,e-=t[n===t.length-1?0:n+1][0]*t[n][1]*.5;return _t(e)},o=function(t,e,n){var o=0;if(n)for(i=1;i<e.length;i++)o+=t(e[i],e[i-1],n[i],n[i-1]);else for(i=1;i<e.length;i++)o+=t(e[i],e[i-1]);return o},s=function(t,e){for(var n=0,o=0;o<e.length;o++)n+=t(e[o]);return n},bt=function(t){for(var e=[],n=1;n<t.length;n++)e.push(t[n]-t[n-1]);return e},kt=function(t,e,n,o){return a(r(t-e)+r(n-o))},It=function(t,e){return[o(kt,t,e),o(n,t),o(n,e)]},Et=function(t){for(var e in t)t[e]=0+t[e]/t.length;var n=0/t.length;return[n,a((s(r,t)-t.length*r(n))/(t.length-1))]},St=function(t){for(var e=t.length,n=0,o=1;o<e;o++)t[o]-t[o-1]<0&&n++;return n/e},Rt=function(t){return s(_t,t)/t.length},Tt=function(t,e,n){for(var o=t.length,i=0,a=0;a<o;a++)predicate=t[a]<n*e,predicate&&i++;return i/o};!function(){var ht={x:[],y:[]},ut=Date.now(),ft=function(){try{return document.all?function(t){var e=event.x+document.body.scrollLeft,n=event.y+document.body.scrollTop;document.getElementById("coords").innerHTML="X : "+e+" px, Y : "+n+" px | Window size: "+window.innerWidth+" x "+window.innerHeight,document.getElementById("coords-history").innerHTML="X : "+e+", Y : "+n+"<br />"+document.getElementById("coords-history").innerHTML,ht.x.push(e),ht.y.push(n)}:function(t){var e=t.pageX,t=t.pageY;ht.x.push(e),ht.y.push(t)}}catch(t){}}();document.getElementsByTagName("body")[0].addEventListener("mousemove",ft);var mt=0,pt=setInterval(function(){if(++mt>vt.stopRetryCount)return clearInterval(pt),document.getElementsByTagName("body")[0].removeEventListener("mousemove",ft),!1;if(0===ht.x.length)return!1;var t=ut,e=[].concat(ht.x),n=[].concat(ht.y),o=e.length;ht={x:[],y:[]},ut=Date.now();var i,a,r,c,s,l,d,g,h,u,f,m,p,w,v,_,y,M,x,b,k,I,E,S,R,T,H,B,C,L,j,D,O,$,U,q,N,A,F,P,X,Y,z,W,J,G,K,Q,V,Z,tt,et,nt,ot,it,at,rt,ct,st,lt,dt,gt,gt=(a=n,et=(i=e).length,V=It(i,a),r=V[0],c=V[1],s=V[2],l=i[0],d=Math.max.apply(Math,i),g=Math.min.apply(Math,i),h=a[0],u=Math.max.apply(Math,a),f=Math.min.apply(Math,a),Z=Et(i),m=Z[0],p=Z[1],tt=Et(a),w=tt[0],v=tt[1],_=_t(i[et-1]-i[0])/et,y=_t(a[et-1]-a[0])/et,M=kt(i[et-1],i[0],a[et-1],a[0]),x=r/et,b=St(i,et),k=St(a,et),ot=bt(i),it=bt(a),st=ot.length,I=ot[0],E=Math.max.apply(Math,ot),S=Math.min.apply(Math,ot),R=it[0],T=Math.max.apply(Math,it),H=Math.min.apply(Math,it),nt=Et(ot),B=nt[0],C=nt[1],rt=Et(it),L=rt[0],j=rt[1],D=Rt(ot),O=Rt(it),$=Tt(ot,D,coeff=.05),U=Tt(it,O,coeff=.05),q=_t(ot[st-1]-ot[0])/st,N=_t(it[st-1]-it[0])/st,A=kt(ot[st-1],ot[0],it[st-1],it[0]),dt=bt(ot),ct=bt(it),lt=dt.length,F=dt[0],P=Math.max.apply(Math,dt),X=Math.min.apply(Math,dt),Y=ct[0],z=Math.max.apply(Math,ct),W=Math.min.apply(Math,ct),at=Et(dt),J=at[0],G=at[1],gt=Et(ct),K=gt[0],Q=gt[1],n=_t(dt[lt-1]-dt[0])/lt,e=_t(ct[lt-1]-ct[0])/lt,V=kt(dt[lt-1],dt[0],ct[lt-1],ct[0]),Z=Rt(dt),tt=Rt(ct),et=Tt(dt,Z,coeff=.05),nt=Tt(ct,tt,coeff=.05),rt=bt(dt),st=bt(ct),ot=rt[0],it=Math.max.apply(Math,rt),at=Math.min.apply(Math,rt),gt=st[0],lt=Math.max.apply(Math,st),dt=Math.min.apply(Math,st),ct=Et(rt),rt=ct[0],ct=ct[1],st=Et(st),[r,c,s,m,p,w,v,_,y,M,x,b,k,B,C,L,j,q,N,A,D,O,$,U,J,G,K,Q,n,e,V,Z,tt,et,nt,rt,ct,st[0],st[1],xt(yt(Mt(i,a))),l,d,g,h,u,f,I,E,S,R,T,H,F,P,X,Y,z,W,ot,it,at,gt,lt,dt]);lt=function(t){for(var e in t)try{if(!t[e]||isNaN(t[e])||t[e]===1/0||t[e]===-1/0){t[e]=0;continue}t[e]=t[e].toFixed(6)}catch(t){}return t}(gt),dt=t,gt=ut,t=o,o=mt,wt.call({tm:lt.join(","),tmstart:dt,tmend:gt,tmpoints:t,tminterval:vt.interval,tmiter:o})},vt.interval)}()}catch(t){}},gaid:function(){try{var t=window.adcm.config.triggers.gaid;if(!t.enable)return!1;var e={tags:[]},n=document.cookie.replace(/(?:(?:^|.*;\s*)_ga\s*\=\s*([^;]*).*$)|^.*$/,"$1");n&&(e.ga=n,e.tags.push("adcm_ga"),window.adcm.config.ids.ga=n);var o=document.cookie.replace(/(?:(?:^|.*;\s*)_gid\s*\=\s*([^;]*).*$)|^.*$/,"$1");o&&(e.gid=o,e.tags.push("adcm_gid"),window.adcm.config.ids.gid=o),(e.ga||e.gid)&&"function"==typeof t.callback()&&t.callback(e),t.loaded=!0}catch(t){}},noBounce:function(){try{var t=window.adcm,e=t.config.triggers.noBounce,n=e.param_call;n.tags=n.tags||[],n.tags.push("nobounce"),setTimeout(function(){t.call(n),"function"==typeof e.callback()&&e.callback()},1e3*e.timeout)}catch(t){}},page_down_scroll:function(){try{function n(){var t=document.documentElement,e=document.body,t=(t.scrollTop||e&&e.scrollTop||0)-t.clientTop+t.clientHeight;r<t&&(window.removeEventListener("scroll",n,!1),a.event="pds",o.call(a),"function"==typeof i.callback()&&i.callback())}var o=window.adcm,i=o.config.triggers.page_down_scroll,a=i.param_call,r=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)-i.margin_bottom;window.addEventListener("scroll",n,!1),window.scrollTo(window.scrollX,window.scrollY-1)}catch(t){}},elapsed_seconds:function(){try{var e=window.adcm,n=e.config.triggers.elapsed_seconds,o=n.param_call;if(!n.timeouts||"object"!=typeof n.timeouts||0===n.timeouts.length)return!1;n.timeouts.forEach(function(t){setTimeout(function(){o.elapsed_seconds=t,e.call(o),"function"==typeof n.callback()&&n.callback()},1e3*t)})}catch(t){}},init_call:function(){var t=window.adcm,e=t.config.triggers.init_call,n=e.param_call;n.tags||(n.tags=[]),n.tags.push("adcmjs_init");try{void 0!==window.DeviceOrientationEvent&&window.DeviceOrientationEvent&&"ontouchstart"in window?t.config.tags.push("adcmjs_orient"):t.config.tags.push("adcmjs_noorient")}catch(t){}t.call(n),"function"==typeof e.callback()&&e.callback()},config:function(){try{function t(t){if(0===t.length)return!1;var e,n;for(n in t.tags&&(e=t.tags.split(" "),o.config.tags=o.config.tags.concat(e),o.config.tags=Array.from(new Set(o.config.tags)),o.config.tags=o.array_unique(o.config.tags)),t)"tags"!==n&&void 0!==o.config[n]&&(o.config[n]=t[n])}var o=window.adcm,e=o.config.triggers.config;if(e.el_id&&"string"==typeof e.el_id){if(!(n=document.getElementById(e.el_id)))return!1;t(n.dataset)}else if(e.el_class_name&&"string"==typeof e.el_class_name){var n,i=document.getElementsByClassName(e.el_class_name);for(inner_i=0;inner_i<i.length;inner_i++)(n=i[inner_i])&&t(n.dataset)}"function"==typeof e.callback()&&e.callback()}catch(t){}},scroll_to:function(){var s=window.adcm,l=s.config.triggers.scroll_to,d=l.param_call,g=document.documentElement,h=document.body,u=h.getBoundingClientRect();g.scrollTop||h&&h.scrollTop,g.clientTop,g.clientHeight;!function(){var t,n={},o=[];for(t in l.markers){var e=l.markers[t];if(e.el_id&&"string"==typeof e.el_id)(i=document.getElementById(e.el_id))&&(a=i.getBoundingClientRect(),l.markers[t]._checkpoint_heigh=a.top-u.top,o.push(l.markers[t]._checkpoint_heigh),n[l.markers[t]._checkpoint_heigh]=l.markers[t]);else if(e.el_class_name&&"string"==typeof e.el_class_name){var i,a,r=document.getElementsByClassName(e.el_class_name);for(inner_i=0;inner_i<r.length;inner_i++)(i=r[inner_i])&&(a=i.getBoundingClientRect(),l.markers[t]._checkpoint_heigh=a.top-u.top,o.push(l.markers[t]._checkpoint_heigh),n[l.markers[t]._checkpoint_heigh]=l.markers[t])}}function c(){if(0===n.length||0===o.length)return window.removeEventListener("scroll",c,!1),!1;var t=window.innerHeight,e=(g.scrollTop||h&&h.scrollTop||0)-g.clientTop+g.clientHeight-t/100*(100-l.window_checkpoint_percent),t=Math.min.apply(Math,o);return!(e<t)&&(void 0===(e=n[t])?(window.removeEventListener("scroll",c,!1),!1):(d.event=e.event,s.call(d),"function"==typeof l.callback()&&l.callback(),"function"==typeof e.callback()&&e.callback(),delete n[t],void o.splice(o.indexOf(t),1)))}window.addEventListener("scroll",c,!1),c()}()},scroll_percents:function(){var e,n,o=window.adcm,i=o.config.triggers.scroll_percents,a=i.param_call,r=document.documentElement,c=document.body;function t(){var t=(r.scrollTop||c&&c.scrollTop||0)-r.clientTop+r.clientHeight;if(!e.length)return!1;n/100*e[0]<=t&&(t=e[0],a.tags||(a.tags=[]),a.tags.push("psp_"+t),o.call(a),"function"==typeof i.callback(t)&&i.callback(t),e.shift())}e=i.percents.slice().sort(function(t,e){return t-e}),n=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight),window.addEventListener("scroll",t,!1),t()}}})}catch(t){}