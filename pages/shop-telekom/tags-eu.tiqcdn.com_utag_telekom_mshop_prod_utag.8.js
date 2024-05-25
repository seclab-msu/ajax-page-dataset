//~~tv:23012.v453.20200113
//~~tc: Adding support for Mapp Intelligence version 4.5.3

/**
 ************ Don't change anything beyond this line ************
 ********************* Start webtrekk_v4.js *********************
 */
(function(g){g.webtrekkUnloadObjects=g.webtrekkUnloadObjects||[];g.webtrekkLinktrackObjects=g.webtrekkLinktrackObjects||[];var E=function(a){a.getJSON=function(a){if("string"===typeof a&&a&&"{"===a.charAt(0)&&"}"===a.charAt(a.length-1))try{a=a.replace(/'/g,'"').replace(/(['"])?([a-zA-Z0-9]+)(['"])?\s?:/g,'"$2":');var b;b="object"===typeof JSON&&"function"===typeof JSON.parse?JSON.parse(a):/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))?(new Function("return "+a))():null;if("object"===typeof b)return b}catch(d){}return null};a.parseJSON=function(c,b){for(var d in c){var f=d;if("object"===typeof c[f])"undefined"!==typeof a.jsonPara[f]&&"object"!==typeof a.config[a.jsonPara[f][0]]&&(a.config[a.jsonPara[f][0]]={}),a.parseJSON(c[f],f);else if(b){if(isNaN(parseInt(f))||500>parseInt(f))a.config[a.jsonPara[b][0]][f]=c[f]}else"undefined"!==typeof a.jsonPara[f]&&(a.config[a.jsonPara[f][0]]=c[f])}};
a.getMappingParam=function(c){var b=c.split(""),d,f,e;for(d=0;d<b.length;d++)if(!isNaN(parseInt(b[d]))){f=d;break}f?(b=c.substr(0,f),e=c.substr(f,c.length-1)):b=c;return{mapping:"undefined"!==typeof a.jsonPara[b]?a.jsonPara[b][0]:!1,index:e?e:!1}}},F=function(a){a.checkAsynchron=function(a,b,d,f){if("undefined"!==typeof g[a])return b?b(!0,d):1;if(0>=f)return b?b(!1,d):1;g.setTimeout(function(){d.checkAsynchron(a,b,d,f-100)},100);return 1};a.loadAsynchron=function(c,b,d,f){a.include(c)&&a.checkAsynchron(b,
d?d:!1,a,f?f:2E3)};a.include=function(a){if(!document.createElement)return!1;var b=document.getElementsByTagName("head").item(0),d=document.createElement("script");d.setAttribute("language","javascript");d.setAttribute("type","text/javascript");d.setAttribute("src",a);b.appendChild(d);return!0}},G=function(a){a.registerEvent=function(c,b,d){c.addEventListener?("webkitvisibilitychange"===b&&a.unregisterEvent(c,b,d),c.addEventListener(b,d,!1)):c.attachEvent&&("beforeunload"!==b&&"webkitvisibilitychange"!==
b||a.unregisterEvent(c,b,d),c.attachEvent("on"+b,d))};a.unregisterEvent=function(a,b,d){a.removeEventListener?a.removeEventListener(b,d,!1):a.detachEvent&&a.detachEvent("on"+b,d)}},H=function(a){a.maxlen=function(a,b){return a&&a.length>b?a.substring(0,b-1):a};a.indexOf=function(a,b,d){return a.indexOf(b,d?d:0)};a.wtTypeof=function(a){return"undefined"!==typeof a?1:0};a.wtLength=function(a){return"undefined"!==typeof a?a.length:0};a.wtEscape=function(a){try{return encodeURIComponent(a)}catch(b){return escape(a)}};
a.wtUnescape=function(a){try{return decodeURIComponent(a)}catch(b){return unescape(a)}};a.getAttribute=function(a,b){return"string"===typeof a.getAttribute(b)?a.getAttribute(b):"object"===typeof a.getAttribute(b)&&"object"===typeof a.attributes[b]&&null!==a.attributes[b]?a.attributes[b].nodeValue:""};a.plugInArray=function(a,b){if("object"!==typeof a)return!1;for(var d=0;d<a.length;d++){var f=RegExp(a[d].toLowerCase(),"g");if(-1!==b.toLowerCase().search(f))return a[d]}return!1}},I=function(a){a.decrypt=
function(c){var b="";if(c)try{b=a.wtUnescape(c.replace(/([0-9a-fA-F][0-9a-fA-F])/g,"%$1"))}catch(d){}return b};a.checkSC=function(c){if("string"!==typeof a.secureConfig)return!1;for(var b=a.secureConfig.split(";"),d=0;d<b.length;d++)if(b[d]===c)return!0;return!1}},J=function(a){a.wtHref=function(){return a.wtLocation().href};a.wtLocation=function(){return document.location};a.urlParam=function(c,b,d){if(!c||null===c||"undefined"===typeof c)return d;var f=[];0<c.indexOf("?")&&(f=c.split("?")[1].replace(/&amp;/g,
"&").split("#")[0].split("&"));for(c=0;c<f.length;c++)if(0===f[c].indexOf(b+"="))return a.wtUnescape(f[c].substring(b.length+1).replace(/\+/g,"%20"));return d};a.isOwnDomain=function(c){var b="";if(a.domain)if(0===a.domain.toUpperCase().indexOf("REGEXP:")){if(b=RegExp(a.domain.substring(7),"i"),b.test(a.getDomain(c)))return!0}else{b=a.domain.split(";");c=a.getDomain(c);for(var d=0;d<b.length;d++)if(c===b[d])return!0}return!1};a.getDomain=function(c){if("string"!==typeof c)return"";c=a.wtUnescape(c);
c=c.split("://")[1];var b=RegExp("^(?:[^/]+://)?([^/:]+)","g");return"undefined"!==typeof c&&(c=c.match(b),c[0])?c[0].toLowerCase():""}},x=function(a,c,b){b=RegExp(c+"="+b);var d=document.location.href;c=(new Date).getTime();b=b.exec(d);d=/wt_t=([\d]{13})/.exec(d);if(b&&"undefined"!==typeof b[1]&&d&&"undefined"!==typeof d[1]){d=parseInt(d[1])+9E5;if(!a.maxURLParameterValidity||c+a.maxURLParameterValidity<d)return!1;if(d>c)return a.wtUnescape(b[1])}return!1},K=function(a){var c=!1;a.baseparams=function(){var b=
screen.width+"x"+screen.height+",",b=b+(("undefined"!==typeof screen.colorDepth?screen.colorDepth:screen.pixelDepth)+","),d;d=navigator.cookieEnabled;d="boolean"!==typeof d?-1!==document.cookie.indexOf("="):d;b=b+(d?"1,":"0,")+((new Date).getTime()+",");if(a.referrerOncePerSession&&a.getCookie("wt_ropc"))d="2";else{d="0";var f=x(a,"wt_ref","(.+?)(&|$)");""!==a.getCookie("wt_ref")?(d=a.wtEscape(a.getCookie("wt_ref")),a.setCookie("wt_ref","",-3600)):f?d=a.wtEscape(f):c?(d=a.wtEscape(c),c=!1):0<document.referrer.length&&
(d=a.wtEscape(document.referrer));a.sentFullPixel?d="2":a.isOwnDomain(d)&&(d="1");a.referrerOncePerSession&&1<d.length&&a.setCookie("wt_ropc","1")}f=g.innerHeight;if(!f)try{f=document.documentElement.clientHeight}catch(e){}if(!f)try{f=document.body.clientHeight}catch(h){}"undefined"===typeof f&&(f=-1);var k;k=g.innerWidth;if(!k)try{k=document.documentElement.clientWidth}catch(l){}if(!k)try{k=document.body.clientWidth}catch(n){}"undefined"===typeof k&&(k=-1);f&&f>screen.height&&(f=screen.height);k&&
k>screen.width&&(k=screen.width);b=b+d+(","+k+"x"+f);return b+=","+(navigator.javaEnabled()?"1":"0")};a.setReferrer=function(a){"string"===typeof a&&(c=a)}},x=function(a,c,b){b=RegExp(c+"="+b);var d=document.location.href;c=(new Date).getTime();b=b.exec(d);d=/wt_t=([\d]{13})/.exec(d);if(b&&"undefined"!==typeof b[1]&&d&&"undefined"!==typeof d[1]){d=parseInt(d[1])+9E5;if(!a.maxURLParameterValidity||c+a.maxURLParameterValidity<d)return!1;if(d>c)return a.wtUnescape(b[1])}return!1},A=function(a,c,b,d){"1"!==
a.cookie||(a.optOut||a.deactivatePixel)||a.firstParty();(b=b?b:"")||(b=a.formObject&&"noForm"!==c?"form":"link");"function"===typeof a.beforeUnloadPixel?a.beforeUnloadPixel():"form"===b&&a.executePlugin(a.getPluginConfig("form","before"));var f="";if(a.config.linkId&&(f+="&ct="+a.wtEscape(a.maxlen(a.wtUnescape(a.config.linkId),255)))){var e=a.ccParams;"string"===typeof e&&""!==e&&(f+=e)}if(a.wtEp)if(a.wtEpEncoded)f+=a.wtEp;else if(e=a.wtEp,"string"===typeof e&&""!==e)for(var e=e.split(/;/),h=0;h<
e.length;h++)if("undefined"!==typeof e[h]){var k=e[h].split(/\=/);a.checkSC("custom")&&(k[1]=a.decrypt(k[1]));k[1]=a.wtEscape(k[1]);f+="&"+k[0]+"="+k[1]}"noForm"!==c&&(f+=d.getFormTrackingData());""!==f&&(a.quicksend(a.wtEscape(a.contentId.split(";")[0])+",1,"+a.baseparams(),f),a.config.linkId="",a.ccParams="",a.wtEp="");"function"===typeof a.afterUnloadPixel?a.afterUnloadPixel():"form"===b&&a.executePlugin(a.getPluginConfig("form","after"))},z=function(a){var c=[],b;for(b in a.safetagParameter){var d=
b;if("executePluginFunction"===d)a.executePluginFunction+=a.safetagParameter[d],a.safetagParameter[d]="";else if("object"!==typeof a.safetagParameter[d]||a.safetagParameter[d]instanceof RegExp)a[d]=a.safetagParameter[d],"linkTrack"!==d&&"tabBrowsing"!==d&&"execCDB"!==d||c.push(d);else{"object"!==typeof a[d]&&(a[d]={});for(var f in a.safetagParameter[d]){var e=f;a[d][e]=a.safetagParameter[d][e]}}}for(b=0;b<c.length;b++)switch(c[b]){case "linkTrack":a.linkTrackInit();break;case "tabBrowsing":a.startTabBrowsing();
break;case "execCDB":a.startCDB()}a.safetagParameter.pixel=a},L=function(a){var c=function(b,d,f){!1!==b?b():a.executePlugin(a.getPluginConfig(d?d:"page",f))},b=function(a,b){for(var d=[],f=a.split("&"),c=0,e=f.length,m,g;c<e;c++){m=f[c];g=!1;for(var q=0,p=b.length,t;q<p;q++)if(t=b[q],0===m.indexOf(t+"=")){g=!0;break}g||d.push(m)}return d.join("&")},d=function(a){a=a.split("&");for(var b="?",d=0,f=a.length;f;)d=parseInt(Math.random()*f),b+=a.splice(d,1)+"&",f--;return b.substr(0,b.length-1)},f=function(){for(var a=
parseInt(10*Math.random())+5,b="",d=0,f;d<a;d++)f=parseInt(37*Math.random()),b+="abcdefghijklmnopqrstuvwxyz-_0123456789".charAt(f);return b};a.getMediaCode=function(){if(a.mediaCode){var b=[],d=a.mediaCode.split(";"),f=0,c=[];a.mediaCodeValue&&(b=a.mediaCodeValue.split(";"));for(var e=0;e<d.length;e++){var s=a.urlParam(location.href,d[e],"");if(a.mediaCodeCookie){var m=!1,g=(a.trackId+"").split(",")[0],g="wt_mcc_"+(a.config.campaignAction?a.config.campaignAction.substring(0,1):"c")+"_"+g,q=a.getCookie(g),
p;p=d[e]+"_"+s;for(var t=0,w=p.length,u=void 0,y=0;y<w;y++)u=p.charCodeAt(y),t=(t<<5)-t+u,t&=t;p=t>1E15-1?"0":t+"";-1===q.indexOf(","+p+",")&&s?(c.push(d[e]+a.wtEscape("="+s)),m=!0):f++;m&&(s="","eid"===a.mediaCodeCookie&&(s=2592E3),a.setCookie(g,q+","+p+",",s))}else"undefined"!==typeof b&&"undefined"!==typeof b[e]&&""!==b[e]?c.push(d[e]+a.wtEscape("="+b[e])):""!==s&&c.push(d[e]+a.wtEscape("="+s))}d.length===f&&0!==d.length&&c.push("ignore%3Dignore");a.config.campaignId=c.join(";")}};a.getExtLifeCycles=
function(b,d,f){for(var c="",e={},s=b.split("|"),m=0;m<s.length;m++){for(var g=s[m].split(";"),q=0;q<g.length;q++)c=0===q?c+a.wtEscape(g[q]):c+g[q],c+=";";c=c.substr(0,c.length-1);c+="|"}c=c.substr(0,c.length-1);e.xlcl=a.wtEscape(b.split("|").length);e.xlct=a.wtEscape(d);"undefined"!==typeof f&&(e.xlcv=a.wtEscape(f));e.xlc=a.wtEscape(c);b="";for(var p in e)b+="&"+p+"="+e[p];return b};a.quicksend=function(c,e,l){if(!a.trackDomain||!a.trackId||a.deactivatePixel||a.deactivateRequest)a.deactivateRequest=
!1;else{l||(l="wt"+(a.fileSuffix?".pl":""));a.requestObfuscation&&(l+=f());"undefined"===typeof a.requestTimeout&&(a.requestTimeout=5);a.cdbeid&&(e="&cdbeid="+a.cdbeid+e);var n="";"1"===a.cookie&&(a.eid&&(n+="&eid="+a.eid),a.cookieOne&&(n+="&one=1"),a.forceNewSession&&(n+="&fns=1"));e=n+e;a.isUserIdentificationOptOuted_()&&(e="&nc=1"+e);n=document.location.href.split("#")[0];if(a.pageURLPattern&&a.pageURLReplace)try{n=n.replace(a.pageURLPattern,a.pageURLReplace)}catch(v){}e+="&pu="+a.wtEscape(n);
e="p="+a.version+","+c+e;c="//";c=a.sendViaServerActivated&&a.sendViaServerDomain&&a.sendViaServerPath?c+(a.sendViaServerDomain+"/"+a.sendViaServerPath):c+(a.trackDomain+"/"+a.trackId+"/"+l);0<a.suppressIdentificationParameter.length&&a.isUserIdentificationOptOuted_()&&(e=b(e,a.suppressIdentificationParameter));c=a.requestObfuscation?c+d(e):c+("?"+e);a.tabBrowsing?a.sendTabBrowsingPixel(c,l):a.ignorePrerendering||"undefined"===typeof document.hidden?a.sendPixel(c,l):("object"!==typeof a.prerendering&&
(a.prerendering=[]),document.hidden?(a.prerendering.push(c),a.registerEvent(document,"visibilitychange",function(){a.sendPrerendering()})):a.sendPixel(c,l));"hm"!==l&&"hm.pl"!==l&&(a.cookieOne=!1,a.forceNewSession=!1,a.sentFullPixel=1)}};a.sendPrerendering=function(){if(!document.webkitHidden){for(var b=0;b<a.prerendering.length;b++)a.sendPixel(a.prerendering[b]);a.prerendering=[]}};a.send=function(b,d,c){if("link"===d||"click"===d)a.config.linkId=b;a.config.contentId=a.config.contentId?a.config.contentId:
a.contentId;(b=b?b:a.config.contentId)||(b="no_content");b=a.wtEscape(b)+",1,";b+=a.baseparams();var f;f=[];if(navigator.plugins&&"Microsoft Internet Explorer"!==navigator.appName)for(var e=0,s=navigator.plugins.length;e<s;e++){var m="",m="Shockwave Flash"===navigator.plugins[e].name?navigator.plugins[e].description:navigator.plugins[e].name;(m=a.plugInArray(a.plugins,m))&&f.push(m)}f=f.join("|");e="";if(a.paramFirst)for(s=a.paramFirst.split(";"),m=0;m<s.length;m++){var r=a.getMappingParam(s[m]),
q=r.mapping,r=r.index;q&&(r?a.config[q]&&("undefined"!==typeof a.config[q][r]&&a.config[q][r])&&(e+="&"+s[m]+"="+a.wtEscape(a.config[q][r])):a.config[q]&&(e+="&"+s[m]+"="+a.wtEscape(a.config[q])))}if("string"===typeof c&&""!==c)for(var p=c.split(/;/),t=0;t<p.length;t++)"undefined"!==typeof p[t]&&(c=p[t].split(/\=/),a.checkSC("custom")&&(c[1]=a.decrypt(c[1])),c[1]=a.wtEscape(c[1]),e+="&"+c[0]+"="+c[1]);else{a.wtEpEncoded=!1;var w=new a.PredefinedParameter;for(t in a.config)c=t+"",w.put(c,a.config[c]);
r=w.get("all");a.config.customParameter=a.mergeCustomParameter(a.config.customParameter,r.customParameter);t=a.checkCustomParameter(a.config.customParameter,"cp");a.config.customSessionParameter=a.mergeCustomParameter(a.config.customSessionParameter,r.customSessionParameter);c=a.checkCustomParameter(a.config.customSessionParameter,"cs");s=a.checkCustomParameter(a.config.customTimeParameter,"ce");m=a.checkCustomParameter(a.cdb,"cdb");a.config.customEcommerceParameter=a.mergeCustomParameter(a.config.customEcommerceParameter,
r.customEcommerceParameter);q=a.checkCustomParameter(a.config.customEcommerceParameter,"cb");a.config.orderValue&&-1===a.paramFirst.indexOf("ov;")&&(e=a.checkSC("order")?e+("&ov="+a.wtEscape(a.decrypt(a.config.orderValue))):e+("&ov="+a.wtEscape(a.config.orderValue)));a.config.currency&&-1===a.paramFirst.indexOf("cr;")&&(e=a.checkSC("order")?e+("&cr="+a.wtEscape(a.decrypt(a.config.currency))):e+("&cr="+a.wtEscape(a.config.currency)));a.config.orderId&&-1===a.paramFirst.indexOf("oi;")&&(e+="&oi="+a.wtEscape(a.config.orderId));
a.config.product&&(-1===a.paramFirst.indexOf("ba;")&&(e+="&ba="+a.wtEscape(a.config.product)),a.config.productCost&&-1===a.paramFirst.indexOf("co;")&&(e+="&co="+a.wtEscape(a.config.productCost)),a.config.productQuantity&&-1===a.paramFirst.indexOf("qn;")&&(e+="&qn="+a.wtEscape(a.config.productQuantity)),a.config.productCategory=a.mergeCustomParameter(a.config.productCategory,r.productCategory),e+=a.checkCustomParameter(a.config.productCategory,"ca"),a.config.productStatus&&-1===a.paramFirst.indexOf("st;")&&
(e+="&st="+a.wtEscape(a.config.productStatus)));var u=x(a,"wt_cd","(.+?)(&|$)");a.config.customerId||(a.config.customerId=u);a.config.customerId&&-1===a.paramFirst.indexOf("cd;")&&(e+="&cd="+a.wtEscape(a.config.customerId));a.config.crmCategory=a.mergeCustomParameter(a.config.crmCategory,r.crmCategory);e+=a.checkCustomParameter(a.config.crmCategory,"vc");null===w.get("birthday")&&(a.config.birthdayJ&&a.config.birthdayM&&a.config.birthdayD)&&w.put("birthday",a.config.birthdayJ+a.config.birthdayM+a.config.birthdayD);
null!==w.get("telefon")&&w.put("telefon",w.get("telefon").replace(/\W|_/g,""));a.config.urmCategory=a.mergeCustomParameter(a.config.urmCategory,r.urmCategory);e+=a.checkCustomParameter(a.config.urmCategory,"uc");a.browserLang&&(e+="&la="+a.wtEscape(a.browserLang));a.config.contentGroup=a.mergeCustomParameter(a.config.contentGroup,r.contentGroup);e+=a.checkCustomParameter(a.config.contentGroup,"cg");w="";if(a.config.campaignId){var u=a.config.campaignAction?a.config.campaignAction.substring(0,1):"c",
y=u+"_"+a.config.campaignId;y in a.sentCampaignIds?a.config.campaignId="ignore%3Dignore":a.sentCampaignIds[y]=!0;"c"===u&&(u="");-1===a.paramFirst.indexOf("mc;")&&(e+="&mc="+a.wtEscape(a.config.campaignId));-1===a.paramFirst.indexOf("mca;")&&u&&(e+="&mca="+u)}a.config.customCampaignParameter=a.mergeCustomParameter(a.config.customCampaignParameter,r.customCampaignParameter);w+=a.checkCustomParameter(a.config.customCampaignParameter,"cc");a.config.internalSearch&&-1===a.paramFirst.indexOf("is;")&&(e+=
"&is="+a.wtEscape(a.maxlen(a.wtUnescape(a.config.internalSearch),255)));if(a.config.dynamicParameters)for(p in a.config.dynamicParameters)r=p+"",a.config.dynamicParameters[r]&&(e="object"===typeof a.config.dynamicParameters[r]?e+a.checkCustomParameter(a.config.dynamicParameters,r):e+("&"+p+"="+a.wtEscape(a.config.dynamicParameters[r])));t&&(e+=t);w&&(e+=w);s&&(e+=s);q&&(e+=q);c&&(e+=c);m&&(e+=m);a.config.customEid&&(e+="&ceid="+a.config.customEid);a.config.xwtip&&(e+="&X-WT-IP="+a.wtEscape(a.config.xwtip));
p="string"===typeof g.webtrekkApplicationUserAgent?g.webtrekkApplicationUserAgent:"object"===typeof g.WebtrekkAndroidWebViewCallback&&"function"===typeof g.WebtrekkAndroidWebViewCallback.getUserAgent?g.WebtrekkAndroidWebViewCallback.getUserAgent():"";if(a.config.xwtua||p)e+="&X-WT-UA="+(a.config.xwtua?a.wtEscape(a.config.xwtua):a.wtEscape(p));a.config.xwtrq&&(e+="&X-WT-RQ="+a.wtEscape(a.config.xwtrq));a.xwteid&&(e+="&X-WT-EID="+a.wtEscape(a.xwteid),a.xwteid=!1);a.config.xwtstt&&(e+="&X-WT-STT="+a.wtEscape(a.config.xwtstt))}a.config.linkId&&
a.config.customClickParameter&&(e+=a.checkCustomParameter(a.config.customClickParameter[a.config.linkId]?a.config.customClickParameter[a.config.linkId]:a.config.customClickParameter,"ck"),a.ccParams=!1);a.config.xlc&&a.config.xlct&&(""!==a.config.xlc||""!==a.config.xlct)&&(p="",p=a.config.xlcv?a.getExtLifeCycles(a.config.xlc,a.config.xlct,a.config.xlcv):a.getExtLifeCycles(a.config.xlc,a.config.xlct),e+=p);a.config.contentId||a.config.linkId||(a.config.contentId=a.contentId,a.config.linkId="wt_ignore");
a.config.linkId?(a.wtEp=e,a.wtEpEncoded=!0,A(a,"noForm",d)):("1"===a.cookie?a.cookieOne&&(e+="&np="+a.wtEscape(f)):e+="&np="+a.wtEscape(f),a.quicksend(b,e))};var e=function(){a.safetagTimeoutStarted=!0;var b=(new Date).getTime()-a.startSafetagTimeoutDate;if(a.safetagInProgress&&b<a.safetag.timeout)g.setTimeout(function(){e()},5);else{a.safetagTimeoutStarted=!1;a.safetagInProgress=!1;b>a.safetag.timeout&&(a.xwtstt=a.safetag.timeout+"");for(b=0;b<a.saveSendinfoArguments.length;b++){var d=a.saveSendinfoArguments[b];
a.sendinfo(d[0],d[1],d[2],d[3])}a.saveSendinfoArguments=[]}};a.sendinfo=function(b,d,f,n){f=f?f:"page";-1===location.href.indexOf("fb_xd_fragment")&&(a.safetag&&z(a),a.config="object"===typeof b?b:a.getConfig(),a.safetagInProgress?(b?a.saveSendinfoArguments.push([a.config,d,f,n]):a.saveSendinfoArguments.push([!1,d,f,n]),a.safetagTimeoutStarted||(a.startSafetagTimeoutDate=(new Date).getTime(),g.setTimeout(function(){e()},5))):(a.config.campaignId||(!a.mediaCode||"page"!==f||a.config.linkId)||a.getMediaCode(),
a.config.linkId&&(f="click",d||(d=a.config.linkId)),a.isUserIdentificationOptOuted_()?a.deleteUserIdentification_():a.optOut||a.deactivatePixel||("1"===a.cookie?a.firstParty():a.xwteid=x(a,"wt_eid","([\\d]{19})")),c(a.beforeSendinfoPixel,f,"before"),a.safetag&&z(a),""===a.contentId&&""===d||a.send(d,f,n),c(a.afterSendinfoPixel,f,"after")))}},M=function(a){for(var c=[E,F,G,H,I,J,K,L],b=0;b<c.length;b++)c[b](a)},N=function(a){a.setProperty("paramFirst","");a.jsonPara={ck:["customClickParameter",{}],
cp:["customParameter",{}],cs:["customSessionParameter",{}],ce:["customTimeParameter",{}],cb:["customEcommerceParameter",{}],vc:["crmCategory",{}],uc:["urmCategory",{}],ca:["productCategory",{}],cc:["customCampaignParameter",{}],cg:["contentGroup",{}],ct:["linkId",""],ov:["orderValue",""],cr:["currency",""],oi:["orderId",""],ba:["product",""],co:["productCost",""],qn:["productQuantity",""],st:["productStatus",""],cd:["customerId",""],is:["internalSearch",""],mc:["campaignId",""],mca:["campaignAction",
""]};a.checkBrowser=function(){a.isIE=-1!==navigator.appName.indexOf("Microsoft");a.isIE||(a.isOpera=-1!==navigator.appName.indexOf("Opera"),a.isOpera||(a.isSafari=-1!==navigator.vendor.toLowerCase().indexOf("apple"),a.isChrome=-1!==navigator.vendor.toLowerCase().indexOf("google"),a.isSafari||a.isChrome||(a.isFirefox=-1!==navigator.userAgent.toLowerCase().indexOf("firefox"))))};a.generateDefaultConfig("trackId trackDomain domain secureConfig beforeSendinfoPixel afterSendinfoPixel beforeUnloadPixel afterUnloadPixel ignorePrerendering plugins trackingSwitchMediaCode trackingSwitchMediaCodeValue trackingSwitchMediaCodeTimestamp isIE isOpera isSafari isChrome isFirefox wtEpEncoded fileSuffix dynamicParameters xwtip xwtua xwtrq config xwteid xwtstt customTimeParameter sentFullPixel wtEp pageURLPattern pageURLReplace".split(" "));
a.plugins||(a.plugins="Adobe Acrobat;Windows Media Player;Shockwave Flash;RealPlayer;QuickTime;Java;Silverlight".split(";"));"string"===typeof a.plugins&&(a.plugins=a.plugins.split(";"));a.browserLang=!1;"string"===typeof navigator.language?a.browserLang=navigator.language.substring(0,2):"string"===typeof navigator.userLanguage&&(a.browserLang=navigator.userLanguage.substring(0,2));a.checkBrowser()},O=function(a){a.url2contentId=function(c){if(!c)return"no_content";if(a.pageURLPattern&&a.pageURLReplace)try{c=
c.replace(a.pageURLPattern,a.pageURLReplace)}catch(b){}c=/\/\/(.*)/.exec(c);return 1>c.length?"no_content":c[1].split("?")[0].split("#")[0].replace(/\./g,"_").replace(/\//g,".").replace(/\.{2,}/g,".").toLowerCase().split(";")[0]};a.generateDefaultConfig("contentId contentGroup internalSearch numberSearchResults errorMessages npsScore npsScoreFeedback paywall articleTitle pageMainCategory pageSubCategory pageAuthor contentTags pageTitle pageType pageLength daysSincePublication testVariant testExperiment customParameter".split(" "));
a.contentId=a.contentId?a.contentId:a.url2contentId(document.location.href)},P=function(a){"undefined"===typeof a.safetag&&(a.safetag=!1);"undefined"===typeof a.safetagInProgress&&(a.safetagInProgress=!1);"undefined"===typeof a.safetagParameter&&(a.safetagParameter={});"undefined"===typeof a.update&&(a.update=function(){});a.saveSendinfoArguments=[];a.safetagTimeoutStarted=!1},Q=function(a){a.generateDefaultConfig(["loginStatus","pixelVersion","trackingPlatform","customSessionParameter","forceNewSession"])},
R=function(a){a.generateDefaultConfig("customEcommerceParameter orderValue currency orderId product productCost productQuantity productCategory productStatus couponValue productLabel productMainCategory productSubCategory productManufacturer paymentMethod productShortDescription productLongDescription shippingService shippingSpeed shippingCosts grossMargin orderStatus productVariant productSoldOut".split(" "))},S=function(a){a.generateDefaultConfig("crmCategory urmCategory customerId customEid xlc xlct xlcv paywallUser email emailRID emailOptin firstName lastName telefon gender birthday birthdayJ birthdayM birthdayD country city postalCode street streetNumber validation".split(" "))},
T=function(a){a.setProperty("formAttribute","name");a.setProperty("formFieldAttribute","name");a.setProperty("formValueAttribute","value");a.setProperty("formFieldDefaultValue",{});a.setProperty("multipleFormArray",[]);a.generateDefaultConfig("form formFullContent formAnonymous gatherFormsP formObject formName formFocus formSubmit formPathAnalysis".split(" "))},U=function(a){a.setProperty("linkTrackAttribute","name");a.setProperty("delayLinkTrackTime",200);a.generateDefaultConfig("linkId linkTrack linkTrackParams linkTrackPattern linkTrackReplace linkTrackDownloads linkTrackIgnorePattern customClickParameter delayLinkTrack noDelayLinkTrackAttribute linktrackNamedlinksOnly ccParams".split(" "))},
V=function(a){a.sentCampaignIds={};a.setProperty("campaignAction","click");a.generateDefaultConfig("mediaCode mediaCodeValue mediaCodeCookie campaignId customCampaignParameter referrerOncePerSession".split(" "))},W=function(a){a.cdb={};a.cdbData=[]},X=function(a,c,b){a.getConfig=function(b){var c={},e;for(e in a)c[e]=b?!1:a[e];return c};a.setProperty=function(d,f){a[d]=f;"undefined"!==typeof c[d]?a[d]=c[d]:"undefined"!==typeof b[d]&&(a[d]=b[d])};a.generateDefaultConfig=function(b){for(var c=0;c<b.length;c++)a.setProperty(b[c],
!1)};(function(){for(var d=[N,O,P,Q,R,S,T,U,V,W],f=0;f<d.length;f++)d[f](a,c,b)})()},z=function(a){var c=[],b;for(b in a.safetagParameter){var d=b;if("executePluginFunction"===d)a.executePluginFunction+=a.safetagParameter[d],a.safetagParameter[d]="";else if("object"!==typeof a.safetagParameter[d]||a.safetagParameter[d]instanceof RegExp)a[d]=a.safetagParameter[d],"linkTrack"!==d&&"tabBrowsing"!==d&&"execCDB"!==d||c.push(d);else{"object"!==typeof a[d]&&(a[d]={});for(var f in a.safetagParameter[d]){var e=
f;a[d][e]=a.safetagParameter[d][e]}}}for(b=0;b<c.length;b++)switch(c[b]){case "linkTrack":a.linkTrackInit();break;case "tabBrowsing":a.startTabBrowsing();break;case "execCDB":a.startCDB()}a.safetagParameter.pixel=a},Y=function(a){a.pageCounter=0;a.clickCounter=0;a.linkCounter=0;a.formCounter=0;a.configCounter=0;a.mediaCounter=0;a.plugin={};a.setProperty("executePluginFunction","");a.getRequestCounter=function(c,b){var d=0;"after"!==b&&d++;return"undefined"!==typeof a[c+"Counter"]?(a[c+"Counter"]+=
d,a[c+"Counter"]):0};a.getPluginConfig=function(c,b){return{instance:a,mode:c,type:b,requestCounter:a.getRequestCounter(c,b)}};a.executePlugin=function(c,b){if(!a.executePluginFunction||"string"!==typeof a.executePluginFunction)return!1;var d=b?b:{};a.epf=!1;for(var f=a.executePluginFunction.split(";"),e=0;e<f.length;e++)if(f[e]&&"function"===typeof g[f[e]]){a.epf=g[f[e]];try{a.epf(c,d)}catch(h){}}return!1!==a.epf};a.triggerConfigPlugins=function(c){"undefined"!==typeof a.safetag&&a.safetag&&z(a);
a.config="object"===typeof c?c:a.getConfig();a.executePlugin(a.getPluginConfig("config","before"));"undefined"!==typeof a.safetag&&a.safetag&&z(a);a.executePlugin(a.getPluginConfig("config","after"))}},Z=function(a){a.setProperty("cookie","3");a.setProperty("updateCookie",!0);a.setProperty("cookieSecure",!1);a.setProperty("cookieEidTimeout",!1);a.setProperty("cookieSidTimeout",!1);var c=function(b,d,c,e,h){b=a.wtEscape(b)+"="+a.wtEscape(d);b=b+(";domain="+c)+";path=/";e&&(b+=";expires="+a.getExpiryDate(e,
h));a.cookieSecure&&(b+=";secure");document.cookie=b};a.getExpiryDate=function(a,d){var c=new Date,e=c.getTime();d&&(e=parseInt(d));c.setTime(e+6E4*a);return c.toUTCString()};a.setCookie=function(b,d,f,e){var h=document.location.hostname;if(-1===h.search(/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/))for(var k=h.split("."),l=k[k.length-1],n=k.length-2;0<=n;n--)if(l=k[n]+"."+l,c(b,d,l,f,e),a.getCookie(b)===d)return;c(b,d,h,f,e)};a.getCookie=function(b){for(var d=document.cookie.split(";"),c=0;c<
d.length;c++){var e=d[c].substr(0,d[c].indexOf("=")),h=d[c].substr(d[c].indexOf("=")+1),e=e.replace(/^\s+|\s+$/g,"");if(e===b)return a.wtUnescape(h)}return""}},$=function(a){a.cookieManager=function(a,b,d,f){this.name=a;this.keySeperator="~";this.fieldSeparator="#";this.durationSeperator="|";this.found=!1;this.expires=b?b:!1;this.accessPath=d?d:"/";this.secure=f?f:!1;this.rawValue="";this.fields=[];this.fieldsDuration=[];var e=function(a){try{return decodeURIComponent(a)}catch(b){return g.unescape(a)}},
h=function(a){try{return encodeURIComponent(a)}catch(b){return g.escape(a)}};this.read=function(){this.rawValue=null;this.found=!1;for(var a=document.cookie.split(";"),b=0;b<a.length;b++){var d=a[b].substr(0,a[b].indexOf("=")),c=a[b].substr(a[b].indexOf("=")+1),d=d.replace(/^\s+|\s+$/g,"");d===this.name&&(this.rawValue=c,this.found=!0)}if(null!==this.rawValue){a=b=0;do a=this.rawValue.indexOf(this.fieldSeparator,b),-1!==a&&(b=this.rawValue.substring(b,a).split(this.durationSeperator),d=b[0].split(this.keySeperator),
this.fields[d[0]]=e(d[1]),this.fieldsDuration[d[0]]=parseInt(e(b[1])),b=a+1);while(-1!==a&&a!==this.rawValue.length-1)}return this.found};this.getSize=function(){var a=(new Date).getTime(),b="",d;for(d in this.fields){var c=d+"";this.fieldsDuration[c]>=a&&(b+=h(c)+this.keySeperator+h(this.fields[c])+this.durationSeperator+h(this.fieldsDuration[c])+this.fieldSeparator)}return b.length};this.write=function(){var a=(new Date).getTime(),b=!0,d=this.name+"=",c;for(c in this.fields){var e=c+"";this.fieldsDuration[e]>=
a&&(d+=h(e)+this.keySeperator+h(this.fields[e])+this.durationSeperator+h(this.fieldsDuration[e])+this.fieldSeparator,b=!1)}a=b?-99999:this.expires;""!==a&&"number"===typeof a&&(b=new Date,b.setTime((new Date).getTime()+864E5*a),d+="; expires="+b.toGMTString());null!==this.accessPath&&(d+="; PATH="+this.accessPath);a=location.hostname;-1===a.search(/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/)&&(a=location.hostname.split("."),a=a[a.length-2]+"."+a[a.length-1]);b="";this.secure&&(b=";secure");
document.cookie=d+("; DOMAIN="+a)+b};this.remove=function(){this.expires=-10;this.write();return this.read()};this.get=function(a){var b=(new Date).getTime();return this.fieldsDuration[a]>=b?this.fields[a]:""};this.set=function(a,b,d,c,e){d=d?d:31536E3;c=c?c:"last";var f=(new Date).getTime();if("first"===c&&""!==this.fields[a]&&null!==this.fields[a]&&this.fieldsDuration[a]>=f)return this.fields[a];this.fields[a]=b;this.fieldsDuration[a]=f+1E3*parseInt(d);e||this.write();return b};this.prepare=function(a,
b,d,c){return this.set(a,b,d,c,!0)};this.read()}},aa=function(a,c,b){Z(a,c,b);$(a)},ba=function(a){a.optOut=!1;a.setProperty("optoutName","webtrekkOptOut");a.optOut=""!==a.getCookie(a.optoutName);a.optOut&&(a.deactivatePixel=!0);a.getTrackingOptOut=function(){return!!a.getCookie(a.optoutName)};a.setTrackingOptOut=function(c,b){var d="number"===typeof c?c:2592E3,f="function"===typeof b?b:function(){};a.setCookie(a.optoutName,"1",d);a.trackId&&a.trackDomain?a.invokeImage("https://"+a.trackDomain+"/"+
a.trackId+"/optout?duration="+parseInt(d/1440+""),f):f()};a.removeTrackingOptOut=function(){a.setTrackingOptOut(-3600)}},ca=function(a){var c=function(){a.enableIdentificationOptOut&&(a.enableAnonymousFunction=a.enableIdentificationOptOut);"miCookieOptOut"!==a.optOutIdentificationName&&(a.anonymousCookieName=a.optOutIdentificationName)};a.setProperty("enableIdentificationOptOut",!1);a.setProperty("enableAnonymousFunction",!1);a.setProperty("anonymousOptIn",!1);a.setProperty("optOutIdentificationName",
"miCookieOptOut");a.setProperty("anonymousCookieName","miCookieOptOut");a.setProperty("suppressIdentificationParameter",[]);a.getIdentifierOptOut=function(){c();return!!a.getCookie(a.anonymousCookieName)};a.setIdentifierOptOut=function(b,d){c();var f="function"===typeof d?d:function(){};a.setCookie(a.anonymousCookieName,"1","number"===typeof b?b:2592E3);f()};a.removeIdentifierOptOut=function(){c();a.setIdentifierOptOut(-3600)};a.getAnonymousCookie=a.getIdentifierOptOut;a.setAnonymousCookie=a.setIdentifierOptOut;
a.removeAnonymousCookie=a.removeIdentifierOptOut;a.isUserIdentificationOptOuted_=function(){c();var b=!!a.getAnonymousCookie();return a.enableAnonymousFunction&&(!a.anonymousOptIn&&b||a.anonymousOptIn&&!b)};a.deleteUserIdentification_=function(){a.eid=!1;a.firstVisitContact=!1;a.firstVisitTimestamp=!1;a.lastVisitContact=!1;a.cookieOne=!1;a.forceNewSession=!1;a.setCookie("wt3_eid","",-3600);a.setCookie("wt3_sid","",-3600);a.setCookie("wt_cdbeid","",-3600)}},da=function(a){a.setProperty("pixelSampling",
!1);a.setPixelSampling=function(c){c=c?c:a.pixelSampling;for(var b=a.trackId.split(",")[0],d=a.getCookie("wt3_sample").split(";"),f=!1,e=0;e<d.length;e++)-1!==d[e].indexOf(b+"|"+c)?f=!0:-1!==d[e].indexOf(b+"|")&&(d[e]="");e=6;a.cookieEidTimeout&&(e=a.cookieEidTimeout);f?(d=d.join(";"),a.setCookie("wt3_sample",d,43200*e)):(Math&&Math.random&&0===parseInt(Math.random()*c)?d.push(b+"|"+c+"|1"):d.push(b+"|"+c+"|0"),a.setCookie("wt3_sample",d.join(";"),43200*e),d=a.getCookie("wt3_sample"));-1===d.indexOf(b+
"|"+c+"|1")&&(a.deactivatePixel=!0)};a.pixelSampling&&!a.optOut&&a.setPixelSampling()},ea=function(a,c,b){a.deactivatePixel=!1;ba(a);da(a);ca(a)},fa={data_:{},setItem:function(a,c){this.data_[a]=c+""},getItem:function(a){return"undefined"!==typeof this.data_[a]?this.data_[a]:null},removeItem:function(a){delete this.data_[a]},clear:function(){this.data_={}}},ga=function(){var a;try{g.localStorage.setItem("wt_test","1"),g.localStorage.removeItem("wt_test"),a=g.localStorage}catch(c){a=fa}return a},ha=
function(a){var c=ga();this.setItem_=function(b){c.setItem(a,b)};this.removeItem_=function(){c.removeItem(a)};this.getItem_=function(){var b=c.getItem(a);return"string"===typeof b&&b?b:""};this.clear_=function(){c.clear()}},ia=function(a,c){var b=this,d=new ha(a),f=[];b.MAX_QUEUEING_ITEMS=c;var e=function(){for(;f.length>b.MAX_QUEUEING_ITEMS;)b.shift_();d.setItem_(f.join("|"))},f=function(){var a=d.getItem_(),b=[];a&&"string"===typeof a&&(b=a.split("|"));return b}();b.length_=function(){return f.length};
b.push_=function(a){f.push(a);e()};b.first_=function(){return 0===f.length?"":f[0]};b.shift_=function(){var a=f.shift();e();return"string"===typeof a?a:""};b.clear_=function(){f=[];d.removeItem_()}},ja=function(a,c,b){var d=this,f=!1,e=null,h=c.resendInterval,k=c.ttl;d.queue_=new ia(a,c.size);var l=function(a){a=b.urlParam(a,"p","").replace(/[\s\S]+,(\d{13}),.+/,"$1");return"string"===typeof a&&a&&(a=parseInt(a),!isNaN(a)&&Date.now()<=a+k)?!1:!0},n=function(){if(0>=d.queue_.length_())f=!1;else{var a=
d.queue_.first_();l(a)?(d.queue_.shift_(),n()):b.invokeImage(a,function(a,c,f){b._requestLoadHandler(a,c,f);"success"===c?(d.queue_.shift_(),n()):e=g.setTimeout(function(){n()},h)},6E4)}},v=function(){!f&&0<d.queue_.length_()&&(f=!0,n())};v();d.add_=function(a){d.queue_.push_(a);v()};d.remove_=function(){g.clearTimeout(e);d.queue_.clear_();f=!1}},ka=function(a){var c=!1,b,d=function(){b="object"===typeof g.WebtrekkAndroidWebViewCallback?g.WebtrekkAndroidWebViewCallback:{};c="function"===typeof b.trackCustomPage};
d();this.isActive_=function(){d();return c};this.add_=function(d){if(c){var e=d.split("?")[1].split("&");d={};for(var h=0,k=e.length;h<k;h++){var l=e[h].split("=");d[a.wtUnescape(l[0])]=a.wtUnescape(l[1])}delete d.eid;delete d.fns;delete d.one;delete d.la;delete d["X-WT-UA"];e=d.p.split(",");e.splice(-8);e.shift();e=e.join(",");delete d.p;b.trackCustomPage(e,g.JSON.stringify(d))}}},la=function(a){a.deactivateRequest=!1;a.completeRequest=!1;a.requestQueue={};a.webtrekkSDKCallback=null;a.setProperty("simulatedRequestTimeout",
500);a.setProperty("replaceMutatedVowel",!1);a.setProperty("requestLimitAmount",1E3);a.setProperty("requestLimitTime",1800);a.setProperty("maxRequestLength",24576);a.setProperty("requestObfuscation",!1);a.setProperty("requestQueueActivated",!1);a.setProperty("requestQueueTTL",3E5);a.setProperty("requestQueueResendInterval",5E3);a.setProperty("requestQueueSize",100);a.setProperty("sendViaSDK",!1);a.setProperty("sendViaServerActivated",!1);a.setProperty("sendViaServerDomain","");a.setProperty("sendViaServerPath",
"");a.setProperty("sendViaServerDroppedRequests",0);a.setProperty("sendViaServerBlacklist",[/.+/]);var c=!1,b=function(a){return-1!==a.indexOf("ct=")?"link":-1!==a.indexOf("fn=")?"form":-1!==a.indexOf("mi=")?"media":-1!==a.indexOf("/cdb")||-1!==a.indexOf("/fbc")?"cdb":-1!==a.indexOf("/ce")?"independent":-1!==a.indexOf("/re")?"redirect":"page"},d=function(a,b,d){"function"!==typeof g.Image&&(g.Image=function(){return document.createElement("img")});var c=new g.Image;(function(a,c){var f=!1,k=function(d){return f?
!1:(f=!0,b(a,d,Date.now()-c))};a.onerror=function(){k("error")};a.onload=function(){k("success")};g.setTimeout(function(){k("timeout")},d)})(c,Date.now());c.src=a};a._requestLoadHandler=function(d,c,h){if(d&&c){var k=b(d.src);a.executePlugin({instance:a,mode:k,type:c,requestCounter:0},{status:c,time:h,request:d.src,item:d})}};a.invokeImage=function(a,b,c){a&&"string"===typeof a&&d(a,"function"===typeof b?b:function(){},"number"===typeof c?c:2E3)};a.sendPixel=function(d,e){var h=d,k=b(h),l;l=a.sendViaServerBlacklist;
for(var n=[],g=0;g<l.length;g++)if("string"===typeof l[g]){if(-1!==l[g].indexOf("*"))try{l[g]=RegExp(l[g].replace(/(\.)/g,"\\$1").replace(/\*/g,".*"))}catch(s){}n.push(l[g])}else l[g]instanceof RegExp&&n.push(l[g]);0===n.length&&(n=[/.+/]);l=n;if(a.sendViaServerActivated&&0!==a.sendViaServerDroppedRequests&&(1===a.sendViaServerDroppedRequests&&-1!==h.search(/[?&]ov=.+/)||2===a.sendViaServerDroppedRequests&&-1!==h.search(/[?&]st=(view|add|conf)/)||3===a.sendViaServerDroppedRequests&&"page"===k)){var m,
n="";try{m=d.split("?")[1].split("&");for(var g={},r=0,q=m.length;r<q;r++){var p=m[r].split("=");g[a.wtUnescape(p[0])]=a.wtUnescape(p[1])}var t=g.p.split(",");t.splice(-8);t.shift();n=t.join(",")}catch(w){}m=n;q=!1;for(p=0;p<l.length;p++)if("string"===typeof l[p]){if(l[p]===m){q=!0;break}}else if(l[p].test(m)){q=!0;break}if(q)return}var u;a:{m=a.trackId.split(",")[0];q=a.getCookie("wt_rla").split(";");l={};p=0;for(t=q.length;p<t;p++)n=q[p].split(","),3<=n.length&&(g=parseInt(n[1]),r=parseInt(n[2]),
l[n[0]]={amount:isNaN(g)?0:g,time:isNaN(r)?(new Date).getTime():r});"undefined"===typeof l[m]&&(l[m]={amount:0,time:(new Date).getTime()});q=(new Date).getTime();if(q-l[m].time>1E3*a.requestLimitTime)c=!1,l[m]={amount:0,time:q};else if(l[m].amount===a.requestLimitAmount-1&&(c=!0),l[m].amount>=a.requestLimitAmount){u=!0;break a}if("link"===k||"page"===k||"form"===k){l[m].amount++;k=[];for(u in l)k.push(u+","+l[u].amount+","+l[u].time);a.setCookie("wt_rla",k.join(";"),86400)}u=!1}if(!u){if(a.replaceMutatedVowel){u=
[[/%C3%84/g,"ae"],[/%C3%A4/g,"ae"],[/%C4/g,"ae"],[/%E4/g,"ae"],[/%C3%96/g,"oe"],[/%C3%B6/g,"oe"],[/%D6/g,"oe"],[/%F6/g,"oe"],[/%C3%9C/g,"ue"],[/%C3%BC/g,"ue"],[/%DC/g,"ue"],[/%FC/g,"ue"],[/%C3%9F/g,"ss"],[/%DF/g,"ss"]];k=0;for(l=u.length;k<l;k++)h=h.replace(u[k][0],u[k][1]);h=h.toLowerCase()}a.completeRequest=h.split("?")[1];h=a.maxlen(h,a.maxRequestLength);c&&(h+="&rla="+a.requestLimitAmount+"%7C"+a.requestLimitTime);a.sendPixelImage(h,e)}};a.sendPixelImage=function(b,d){var c=b;0!==c.search(/https:|http:/)&&
(c="https:"+c);if("hm"===d||"hm.pl"===d)c+="&hm_ts="+(new Date).getTime();a.sendViaSDK&&null===a.webtrekkSDKCallback&&(a.webtrekkSDKCallback=new ka(a));if("hm"!==d&&"hm.pl"!==d&&a.sendViaSDK&&a.webtrekkSDKCallback.isActive_())a.webtrekkSDKCallback.add_(c);else if(a.requestQueueActivated){var k=a.trackId.split(",")[0];"undefined"===typeof a.requestQueue[k]&&(a.requestQueue[k]=new ja(k,{activated:a.requestQueueActivated,ttl:a.requestQueueTTL,resendInterval:a.requestQueueResendInterval,size:a.requestQueueSize},
a));a.requestQueue[k].add_(c)}else a.invokeImage(c,function(b,d,c){a._requestLoadHandler(b,d,c)},a.simulatedRequestTimeout)}},x=function(a,c,b){b=RegExp(c+"="+b);var d=document.location.href;c=(new Date).getTime();b=b.exec(d);d=/wt_t=([\d]{13})/.exec(d);if(b&&"undefined"!==typeof b[1]&&d&&"undefined"!==typeof d[1]){d=parseInt(d[1])+9E5;if(!a.maxURLParameterValidity||c+a.maxURLParameterValidity<d)return!1;if(d>c)return a.wtUnescape(b[1])}return!1},B=function(a){var c=a.trackId.split(",")[0],b="number"===
typeof a.cookieEidTimeout?a.cookieEidTimeout:6,d=a.generateEid(),f="",e="",h=[],k=-1,l="",n=!1,v=d,s=!1,m=!1,r=function(d){b?a.setCookie("wt3_eid",h.join(";"),43200*b,d):a.setCookie("wt3_eid",h.join(";"))},q=function(b,d,c){for(var e=!1,f=a.getCookie("wt3_eid").split(";"),k=0,g=f.length;k<g;k++)if(-1!==f[k].indexOf(d+"|")){e=!0;f[k]=d+"|"+b;break}e||f.push(d+"|"+b);h=f;r(c)},p=function(a){if(a&&"2"===a.substring(0,1)){a=parseInt(a.substring(1,11)+"000");a=new Date(a);var b=a.getFullYear()+"",b=b+
(10>a.getMonth()+1?"0":""),b=b+(a.getMonth()+1),b=b+(10>a.getDate()?"0":""),b=b+a.getDate(),b=b+(10>a.getHours()?"0":""),b=b+a.getHours(),b=b+(10>a.getMinutes()?"0":"");return b+=a.getMinutes()}return""};this.init=function(){h=a.getCookie("wt3_eid").split(";");for(var b=0;b<h.length;b++)if(-1!==h[b].indexOf(c+"|")){k=b;e=h[b];l=e.replace(c+"|","").split("#")[0];-1!==e.indexOf("#")&&(v=e.replace(c+"|","").split("#")[1]);break}f=x(a,"wt_eid","([\\d]{19})");"string"===typeof g.webtrekkApplicationEverId?
f=g.webtrekkApplicationEverId:"object"===typeof g.WebtrekkAndroidWebViewCallback&&(f=g.WebtrekkAndroidWebViewCallback.getEverId());l?(f&&(h[k]=c+"|"+f,l=f,a.updateCookie=!0),"undefined"!==typeof g.wt_mcp_eid&&(n=!0),-1===h[k].indexOf("#")?h[k]+="#"+d:h[k]=e.replace(/#[0-9]{19}/g,"#"+d),a.updateCookie?r():s=v=!1):("string"===typeof g.wt_mcp_eid&&-1!==g.wt_mcp_eid.indexOf(c+"|")?(l=g.wt_mcp_eid.replace(c+"|",""),n=!0):f?l=f:(l=a.generateEid(),n=!0),h.push(c+"|"+l+"#"+d),r());if(a.updateCookie)a:{if(v=
p(v),s=p(l),(b=l)&&"2"===b.substring(0,1)&&(b=parseInt(b.substring(1,11)),1089676800<b&&23E8>b)){m=b+"000";break a}m=!1}};this.getId=function(){var b;if(b=a.validateEverId)b=l.replace(/^\d((\d){10})\d+$/,"$1"),b=!(1089676800<parseInt(b));b&&(l=a.generateEid(),q(l,c));return l};this.setId=function(a,b,d){q(a,b,d)};this.getUrlId=function(){return f};this.getLastVisitContact=function(){return v};this.getFirstVisitContact=function(){return s};this.getFirstVisitContactTimestamp=function(){return m};this.getCookieOne=
function(){return n}},C=function(a){var c=a.trackId.split(",")[0],b=[],d="";this.init=function(){b=a.getCookie("wt3_sid").split(";");for(var f=0;f<b.length;f++)if(-1!==b[f].indexOf(c)){d=b[f];break}d||b.push(c);a.setCookie("wt3_sid",b.join(";"))};this.getId=function(){return d};this.setId=function(b){for(var d=!1,c=a.getCookie("wt3_sid").split(";"),k=0,g=c.length;k<g;k++)if(-1!==c[k].indexOf(b)){d=!0;break}d||c.push(b);a.setCookie("wt3_sid",c.join(";"))}},ma=function(a){var c=!1,b=function(a){var b=
document.createElement("canvas"),d=null;try{d=b.getContext(a)}catch(c){}return d&&null!==d},d=function(a,b){var d=document.createElement("img");d.crossOrigin="use-credentials";(function(a,b){var d=!1,c=function(c,e){if(!d){d=!0;if(c){var f=document.createElement("canvas"),h=f.getContext("2d");f.height=a.height;f.width=a.width;h.drawImage(a,0,0);try{var k=h.getImageData(0,0,6,1).data;return b(k)}catch(g){return b([],"5")}}return b([],e)}return 0};a.onerror=function(){c(!1,"4")};a.onload=function(){c(!0)};
g.setTimeout(function(){c(!1,"3")},2E3)})(d,b);0!==a.search(/https:|http:/)&&(a="https://"+a);d.src=a},f=function(a){for(var b="",d=0,c;d<a.length;d++)c=a[d].toString(16),2>c.length&&(c="0"+c),b+=c,2===d%4&&d++;b=b.substr(0,b.length-4);return"string"===typeof b&&-1!==b.search(/^[0-9a-f]{32}$/)&&-1===b.search(/^[f]{32}$/)?b:""},e=function(b){"1"===b?a.setCookie("wt_cdbeid",b,15):a.setCookie("wt_cdbeid",b)},h=function(b){("1"!==a.cookie||"1"===a.cookie&&a.eid)&&0<a.pageCounter?g.setTimeout(function(){b()},
300):g.setTimeout(function(){h(b)},50)},k=function(b){h(function(){var d;if("1"===a.cookie)d="https://fbc.wcfbc.net/v1/fbc"+("?p="+a.version+",0"),d+="&eid="+a.wtEscape(a.eid),d+="&acc="+a.wtEscape(a.trackId),d+="&t="+(new Date).getTime(),d+="&err="+b,a.invokeImage(d);else for(var c=a.trackId.split(","),e=0,f=c.length;e<f;e++){var h="https://fbc.wcfbc.net/v1/fbc",h=h+("?p="+a.version+",0"),h=h+("&acc="+a.wtEscape(c[e])),h=h+("&t="+(new Date).getTime()),h=h+("&err="+b);d="https://";d+=a.trackDomain+
"/"+a.trackId+"/cc";d+="?a=r&c=wteid_"+c[e];d+="&t="+a.wtEscape(h);a.invokeImage(d)}})},l=function(){c=!0;if(!(a.deactivatePixel||a.isSafari||a.isUserIdentificationOptOuted_())){var g=a.getCookie("wt_cdbeid");g&&-1!==g.search(/^[0-9a-f]{32}$/)&&(a.cdbeid=g);g||(a.useCDBCache&&!a.isIE&&b("2d")?("string"!==typeof a.useCDBCache&&(a.useCDBCache="fbc.wcfbc.net/v1/fbc"),d(a.useCDBCache,function(b,d){var c=f(b);c?(e(c),h(function(){a.quicksend(a.wtEscape(a.contentId.split(";")[0])+",1,"+a.baseparams(),"&cdbeid="+
c,"cdb")})):(e("1"),k(d?d:"6"))})):(g="",a.useCDBCache&&a.isIE?g="1":a.useCDBCache&&!b("2d")&&(g="2"),e("1"),k(g)))}};a.cdbeid=!1;a.setProperty("execCDB",!0);a.setProperty("useCDBCache",!1);a.startCDB=function(){c||(a.execCDB=!0,l())};a.execCDB&&l()},na=function(a,c,b){a.eid=!1;a.firstVisitContact=!1;a.firstVisitTimestamp=!1;a.lastVisitContact=!1;a.cookieOne=!1;a.setProperty("globalVisitorIds",!1);a.setProperty("validateEverId",!1);a.setProperty("maxURLParameterValidity",9E5);a.zeroPad=function(a,
b){for(var c="",h=0;h<=b;h++)c+="0";c+=a;return c.substring(c.length-b,c.length)};a.generateEid=function(){var b=Math.floor((new Date).getTime()/1E3);1089676800>b&&(b="3"+a.zeroPad(Math.floor(1E4*Math.random()),4)+a.zeroPad(Math.floor(1E5*Math.random()),5));return"2"+a.zeroPad(b,10)+a.zeroPad(Math.floor(1E8*Math.random()),8)};a.setEverId=function(b,c,e){b&&("string"===typeof b&&-1!==b.search(/^[0-9]{19}$/))&&(c&&"string"===typeof c||(c=a.trackId.split(",")[0]),(new B(a)).setId(b,c,e),(new C(a)).setId(c))};
a.firstParty=function(){if(!a.isUserIdentificationOptOuted_()){var b=new B(a);b.init();var c=new C(a);c.init();a.eid=b.getId();a.cookieOne=b.getCookieOne();c.getId()||(b.getId()!==b.getUrlId()&&(a.forceNewSession=!0),a.firstVisitContact=b.getFirstVisitContact(),a.lastVisitContact=b.getLastVisitContact());a.firstVisitTimestamp=b.getFirstVisitContactTimestamp()}};a.globalVisitorIds&&(c.execCDB=!0);ma(a,c,b)},oa=function(a){a.overlayOn="1"===a.urlParam(a.wtHref(),"wt_overlay","0")||"1"===a.getCookie("wt_overlay");
var c=function(){"undefined"!==typeof g.wt_overlay?g.setTimeout(function(){g.wt_overlay()},1E3):("undefined"===typeof g.wt_overlay_retry&&(g.wt_overlay_retry=0),g.wt_overlay_retry++,60>g.wt_overlay_retry&&g.setTimeout(function(){c()},1E3))};"0"===a.urlParam("wt_overlay")&&(a.overlayOn=!1,a.setCookie("wt_overlay","",-3600));a.overlayOn&&!a.disableOverlayView&&(a.setCookie("wt_overlay","1"),a.startOverlay("overlay",c))},pa=function(a,c,b){a.setProperty("reporturl","report2.webtrekk.de/cgi-bin/wt");
a.setProperty("disableOverlayView",!1);var d=function(b){var d=a.reporturl;-1!==b.search(/^((http[s]?:\/\/)?(report\d+|analytics)\.webtrekk\.(com|de)\/)/)&&(d=b.split("/"),d.pop(),d=d.join("/"));return d};a.searchContentIds=function(){var b=0,d=0;a.contentIds=a.wtEscape(a.contentId.split(";")[0]);do{b++;var c=a.urlParam(document.location.href,"wt_contentId"+b,!1);c&&(a.contentIds+="&wt_contentId"+b+"="+a.wtEscape(c),d++)}while(d>=b)};a.startOverlay=function(b,c){a.searchContentIds();a.urlParam(a.wtHref(),
"wt_reporter",!1)?a.reporturl=d(a.urlParam(a.wtHref(),"wt_reporter",!1)):a.getCookie("wt_overlayFrame")&&(a.reporturl=d(a.getCookie("wt_overlayFrame")));-1===a.reporturl.search(/http|https/)&&(a.reporturl=document.location.protocol+"//"+a.reporturl);if(a.contentIds){var h=a.reporturl+"/"+b+".pl?wt_contentId="+a.contentIds+"&x="+(new Date).getTime();if(a.include(h))if("complete"!==document.readyState)a.registerEvent(g,"load",c);else return c()}return 0};(function(){for(var b=!1,d=0;d<g.webtrekkUnloadObjects.length;d++)a===
g.webtrekkUnloadObjects[d]&&(b=!0);b||g.webtrekkUnloadObjects.push(a);oa(a)})()},qa=function(){var a=this,c="customClickParameter customSessionParameter customCampaignParameter customEcommerceParameter customParameter crmCategory urmCategory contentGroup productCategory".split(" "),b={numberSearchResults:[c[4],771],errorMessages:[c[4],772],loginStatus:[c[1],800],pixelVersion:[c[1],801],trackingPlatform:[c[1],802],npsScore:[c[6],850],npsScoreFeedback:[c[6],851],productLabel:[c[8],870],productMainCategory:[c[8],
871],productSubCategory:[c[8],872],productManufacturer:[c[8],873],productShortDescription:[c[8],874],productLongDescription:[c[8],875],paymentMethod:[c[3],761],shippingService:[c[3],762],shippingSpeed:[c[3],763],shippingCosts:[c[3],764],grossMargin:[c[3],765],orderStatus:[c[3],766],productVariant:[c[3],767],couponValue:[c[3],563],productSoldOut:[c[3],760],paywall:[c[4],773],articleTitle:[c[4],774],paywallUser:[c[6],852],pageMainCategory:[c[7],880],pageSubCategory:[c[7],881],pageAuthor:[c[7],882],
contentTags:[c[4],775],pageTitle:[c[4],776],pageType:[c[4],777],pageLength:[c[4],778],daysSincePublication:[c[4],779],testVariant:[c[4],781],testExperiment:[c[4],782],email:[c[6],700],emailRID:[c[6],701],emailOptin:[c[6],702],firstName:[c[6],703],lastName:[c[6],704],telefon:[c[6],705],gender:[c[6],706],birthday:[c[6],707],country:[c[6],708],city:[c[6],709],postalCode:[c[6],710],street:[c[6],711],streetNumber:[c[6],712],validation:[c[6],713]},d={},f=function(){for(var a=0;a<c.length;a++)d[c[a]]={}};
f();this.list={};this.clear=function(){d={};a.list={};f()};this.get=function(b){b="all"===b?d:"undefined"!==typeof a.list[b]?a.list[b]:null;return b};this.put=function(c,f){if(f&&"undefined"!==typeof b[c]){var g=b[c];"undefined"===typeof d[g[0]]&&(d[g[0]]={});d[g[0]][g[1]]=f;a.list[c]=f}return a};this.remove=function(c){var f=null;if("undefined"!==typeof b[c]){var g=b[c];"undefined"!==typeof d[g[0]]&&"undefined"!==typeof d[g[0]][g[1]]&&(f=d[g[0]][g[1]],delete d[g[0]][g[1]]);delete a.list[c]}return f}},
ra=function(a){a.PredefinedParameter=qa;a.checkCustomParameter=function(c,b){var d="";if("object"===typeof c)for(var f in c)isNaN(parseInt(f))||("undefined"===typeof c[f]||"string"!==typeof c[f]||""===c[f])||(a.checkSC("custom")&&(c[f]=a.decrypt(c[f])),-1===a.paramFirst.indexOf(b+f+";")&&(d+="&"+b+f+"="+a.wtEscape(c[f])));return d};a.mergeCustomParameter=function(a,b){var d=a;d||(d={});for(var f in b)d[f]=b[f];return d}},sa=function(a,c,b){var d=this;d.item=b;d.href="undefined"!==typeof b.href?b.href:
"";d.href||(d.href=a.getAttribute(b,"href")?a.getAttribute(b,"href"):"");d.linkIdByNameOrId=a.getAttribute(b,"name")?a.getAttribute(b,"name"):"";d.linkIdByNameOrId||(d.linkIdByNameOrId=a.getAttribute(b,"id")?a.getAttribute(b,"id"):"");d.linkId="";d.action="link";d.isDownloadFile=!1;d.isInternalLink=function(){var c;if(a.linkTrackDownloads){c=a.linkTrackDownloads.split(";");for(var e=d.href.split("."),e=e.pop(),h=0;h<c.length;h++)if(c[h]===e){d.isDownloadFile=!0;break}}if(d.isDownloadFile||"_blank"===
b.target)d.action="click";c=d.href;var e=c.toLowerCase(),h=c.split("#")[0],g=document.location,l=d.item,n=a.getAttribute,v=n(l,"onclick"),s=n(l,"onmousedown"),l=n(l,"ontouchstart");c=a.noDelayLinkTrackAttribute?!!a.getAttribute(b,a.noDelayLinkTrackAttribute):!(c&&!(0===e.indexOf("javascript:")||0===e.indexOf("#")||"click"===d.action||h===g.href.split("#")[0]&&-1!==c.indexOf("#")||h===g.pathname.split("#")[0]&&-1!==c.indexOf("#")||v&&-1!==v.search(/return false[;]?$/)||s&&-1!==s.search(/return false[;]?$/)||
l&&-1!==l.search(/return false[;]?$/)));return c};d.getCCParams=function(){var b="";if(a.config.customClickParameter){var c="undefined"!==typeof a.config.customClickParameter[d.linkIdByNameOrId]?a.config.customClickParameter[d.linkIdByNameOrId]:!1;c||(c=a.config.customClickParameter);for(var h in c)!isNaN(parseInt(h))&&("string"===typeof c[h]&&c[h])&&(a.checkSC("custom")&&(c[h]=a.decrypt(c[h])),b+="&ck"+h+"="+a.wtEscape(c[h]))}return b};d.setJSONParams=function(){d.linkId||(d.linkId=a.getAttribute(b,
a.linkTrackAttribute));null!==a.getJSON(d.linkId)&&(a.parseJSON(a.getJSON(d.linkId)),d.linkId=a.config.linkId)};d.getLinkId=function(){d.linkId=a.getAttribute(b,a.linkTrackAttribute);d.setJSONParams();if("link"===a.linkTrack){var c=d.href.indexOf("//");d.href=0<=c?d.href.substr(c+2):d.href;a.linkTrackPattern&&(a.linkTrackReplace||(a.linkTrackReplace=""),d.href=d.href.replace(a.linkTrackPattern,a.linkTrackReplace));d.linkId=(d.linkId?d.linkId+".":"")+d.href.split("?")[0].split("#")[0].replace(/\//g,
".");c=[];a.linkTrackParams&&(c=a.linkTrackParams.replace(/;/g,",").split(","));for(var e=0;e<c.length;e++){var h=a.urlParam(d.href,c[e],"");h&&(d.linkId+="."+c[e]+"."+h)}}return d.linkId}},ta=function(a){var c=this;c.triggerObjectName="__"+(new Date).getTime()+"_"+parseInt(1E3*Math.random());var b=function(b,d){var h=d[c.triggerObjectName];a.config=a.getConfig(!0);a.config.customClickParameter=a.customClickParameter;a.ccParams=h.getCCParams();var g=a.config.linkId=h.getLinkId();a.sendinfo(a.config,
g,h.action)},d=function(d){a.registerEvent(d,"click",function(e){if(e.which&&1===e.which||e.button&&1===e.button)!a.delayLinkTrack||(e.ctrlKey||e.altKey||e.metaKey||e.shiftKey||"function"!==typeof e.preventDefault||d[c.triggerObjectName].isInternalLink())||(e.preventDefault(),g.setTimeout(function(){document.location.href=d.href},a.delayLinkTrackTime)),b(e,d)})};c.linkTrackInit=function(){if(a.linkTrack&&("link"===a.linkTrack||"standard"===a.linkTrack)){for(var b=!1,e=0;e<g.webtrekkLinktrackObjects.length;e++)a===
g.webtrekkLinktrackObjects[e]&&(b=!0);b||g.webtrekkLinktrackObjects.push(a);b=0;for(e=document.links.length;b<e;b++){var h=document.links[b],k=a.getAttribute(h,a.linkTrackAttribute),l=a.getAttribute(h,"href");(a.linkTrackIgnorePattern&&l&&-1===l.search(a.linkTrackIgnorePattern)||!a.linkTrackIgnorePattern)&&("undefined"===typeof h[c.triggerObjectName]&&(k||"link"===a.linkTrack))&&(h[c.triggerObjectName]=new sa(a,c,h),d(h))}}}},ua=function(a){a.linkTrackObject=new ta(a);a.linkTrackInstall=a.linkTrackObject.linkTrackInit;
a.linkTrackInit=a.linkTrackObject.linkTrackInit;"complete"===document.readyState?a.linkTrackInit():a.registerEvent(g,"load",function(){a.linkTrackInit()})},D=function(a,c){var b=this,d=null,f=null;b.formObject=!1;b.formFocus=!1;b.formName=!1;b.form=a.form;b.formSubmit=!1;b.formFieldData={};b.formFieldDataUnused={};b.formFieldDataPathAnalysis=[];b.triggerObjectName="__"+(new Date).getTime()+"_"+parseInt(1E3*Math.random()+"");var e=function(a){return"select-multiple"!==a&&"select-one"!==a&&"checkbox"!==
a&&"radio"!==a},h=function(d,c){if(a.formPathAnalysis)if("select-multiple"===c.type)for(var e=b.getFormFieldValue(c).split("|"),f=0,h=e.length;f<h;f++)b.formFieldDataPathAnalysis.push([d,c.type,e[f]]);else b.formFieldDataPathAnalysis.push([d,c.type,b.getFormFieldValue(c)])},k=function(c,e){a.registerEvent(e,"click",function(){if(e!==d){null!==d&&h(f,d);d=e;var a=f=c;b.formObject&&(b.formFocus=a,delete b.formFieldDataUnused[a])}})},l=function(){if(b.form&&!b.formObject)for(var a=document.forms,d=0,
c=a.length;d<c;d++){var e=a[d];if("undefined"!==typeof e.elements.wt_form){b.formObject=e;break}}},n=function(a){!b.form||a.target!==b.formObject&&a.srcElement!==b.formObject||(b.formSubmit=!0)},v=function(){l();if(b.formObject){var d=a.getAttribute(b.formObject,a.formAttribute);b.formName=d?d:a.contentId.split(";")[0];for(var d=0,e=b.formObject.elements,f=e.length;d<f;d++){var h=e[d],m=b.getFormFieldName(h);"hidden"!==h.type&&("button"!==h.type&&"image"!==h.type&&"reset"!==h.type&&"submit"!==h.type&&
"fieldset"!==h.type)&&m&&("undefined"===typeof b.formFieldData[m]&&(b.formFieldData[m]=[]),"undefined"===typeof b.formFieldDataUnused[m]&&(b.formFieldDataUnused[m]=[]),b.formFieldData[m].push(h),b.formFieldDataUnused[m].push(h),k(m,h))}a.registerEvent(b.formObject,"submit",n);a.registerEvent(g,"beforeunload",function(){c(b)});a.registerEvent(g,"unload",function(){c(b)})}},s=function(d){var c=[];a.formFullContent&&(c=a.formFullContent.split(";"));if(a.formAnonymous||e(d.type)){for(var f=0;f<c.length;f++)if(c[f]===
b.getFormFieldName(d))return!1;return!0}return!1},m=function(b,d){var c=d;c||(c=b);var f=a.getAttribute(c,a.formValueAttribute).replace(/[.;|]/g,"_");return e(b.type)?a.maxlen(a.wtUnescape(c.value),110):s(b)?"anon":a.maxlen(a.wtUnescape(f),110)},r=function(a,d,c,e){var f=a.replace(/[.;|]/g,"_")+".",f=f+(d+"|")+(c+"|");return f=e?f+"0":f+(b.formFocus&&b.formFocus===a?"1":"0")},q=function(a,b){for(var d=[],c=0,e=b.length;c<e;c++)if("undefined"!==typeof a[b[c]])if("select-multiple"===a[b[c]][0])for(var f=
a[b[c]][1].split("|"),h=0,g=f.length;h<g;h++)d.push(r(b[c],a[b[c]][0],f[h]));else d.push(r(b[c],a[b[c]][0],a[b[c]][1]));return d.join(";")},p=function(a){for(var d in a){var c=d+"";if(1<a[c].length){for(var e=!1,f=0;f<a[c].length;f++){var h=b.getFormFieldValue(a[c][f]);if("empty"!==h){a[c]=[a[c][f].type,h];e=!0;break}}e||(a[c]=[a[c][0].type,"empty"])}else a[c]=[a[c][0].type,b.getFormFieldValue(a[c][0])]}},t=function(){if(!b.formObject)return"";p(b.formFieldData);p(b.formFieldDataUnused);var d=[],
c;c=[];if("undefined"!==typeof b.formObject.elements.wt_fields){var e=b.formObject.elements.wt_fields.value;e&&(c=e.split(";"))}if(0>=c.length)for(var f in b.formFieldData)e=f+"","string"===typeof e&&e&&c.push(e);f=!1;if(a.formPathAnalysis){(e=q(b.formFieldDataUnused,c))&&d.push(e);for(var e=0,h=b.formFieldDataPathAnalysis.length;e<h;e++){var g=b.formFieldDataPathAnalysis,k;a:{k=0;for(var l=c.length;k<l;k++)if(g[e][0]===c[k]){k=!0;break a}k=!1}k&&(f=!0,d.push(r(g[e][0],g[e][1],g[e][2],!0)))}f&&(c=
d[d.length-1],c=c.substr(0,c.length-1),d[d.length-1]=c+"1")}else return q(b.formFieldData,c);return d.join(";")};b.getFormFieldName=function(b){var c=b.name;a.formFieldAttribute&&(c="",(b=a.getAttribute(b,a.formFieldAttribute))||null!==b)&&(c=b);return c};b.getFormFieldValue=function(c){var d=c.type,e="";if("select-multiple"===d){for(var e=[],f=0,h=c.options,g=h.length;f<g;f++)h[f].selected&&e.push(m(c,h[f]));0>=e.length&&e.push("empty");e=e.join("|")}else"select-one"===d?(e="",-1!==c.selectedIndex&&
((e=m(c,c.options[c.selectedIndex]))||(e="empty"))):"checkbox"===d||"radio"===d?c.checked?(e=m(c))||(e="checked"):e="empty":"hidden"!==d&&("button"!==d&&"image"!==d&&"reset"!==d&&"submit"!==d)&&(f=(e=m(c))?"filled_out":"empty",s(c)||(f=e),h=b.getFormFieldName(c),"undefined"!==typeof a.formFieldDefaultValue[h]&&a.formFieldDefaultValue[h]===e&&"empty"!==f&&(f="empty"),f||(f="empty"),e=f);return s(c)&&"select-multiple"!==d&&"empty"!==e&&"filled_out"!==e?"anon":e};b.formTrackInstall=function(a){b.formObject=
a?a:document.forms[0]?document.forms[0]:!1;b.formObject&&(b.form="1",v())};b.getFormTrackingData=function(){var c="";if(b.formObject){null!==d&&h(f,d);var e=t();if(e){var g=b.formSubmit;a.formSubmit&&(g=a.formSubmit);c+="&fn="+a.wtEscape(b.formName)+"%7C"+(g?"1":"0");c+="&ft="+a.wtEscape(e)}b.formSubmit=!1;a.formSubmit=!1;b.formName=!1;b.formObject=!1;b.formFocus=!1;b.formFieldData={};b.formFieldDataUnused={};b.formFieldDataPathAnalysis=[]}return c};b.formTrackSubmit=function(){b.formSubmit=!0};b.sendFormRequest=
function(){"1"!==a.cookie||(a.optOut||a.deactivatePixel)||a.firstParty();"function"===typeof a.beforeUnloadPixel?a.beforeUnloadPixel():a.executePlugin(a.getPluginConfig("form","before"));var c=b.getFormTrackingData();c&&a.quicksend(a.wtEscape(a.contentId.split(";")[0])+",1,"+a.baseparams(),c);"function"===typeof a.afterUnloadPixel?a.afterUnloadPixel():a.executePlugin(a.getPluginConfig("form","after"))};b.updateFormFieldStatus=function(a){if(a&&"undefined"!==typeof a.type){var c=a.type,d=b.getFormFieldName(a),
e=b.getFormFieldValue(a);d&&(e&&"undefined"!==typeof b.formFieldData[d])&&(b.formFieldData[d].splice(0,0,a),b.formFieldDataPathAnalysis.push([d,c,e]),b.formFocus=d,delete b.formFieldDataUnused[d])}};b.init=function(){b.form&&("1"===b.form&&!b.formObject)&&v();return b}},va=function(a){a.multipleFormArray=[];var c=function(b){for(var c=0;c<a.multipleFormArray.length;c++)if(a.multipleFormArray[c].formObject===b)return a.multipleFormArray[c];return!1},b=function(b){if(b&&"undefined"!==typeof b.elements&&
!c(b)){var f=new D(a,function(b){A(a,"form","form",b)});a.multipleFormArray.push(f);f.formTrackInstall(b)}};a.multipleFormTrackInstall=b;a.multipleFormTrackInit=b;a.multipleFormTrackSubmit=function(a){a&&(a=c(a))&&a.formTrackSubmit()};a.sendMultipleFormRequest=function(b){if(b)(b=c(b))&&b.sendFormRequest();else for(b=0;b<a.multipleFormArray.length;b++)a.multipleFormArray[b].sendFormRequest()};a.updateMultipleFormFieldStatus=function(a,b){if(a){var e=c(a);e&&e.updateFormFieldStatus(b)}}},wa=function(a,
c){var b=this;b.name=a?a:"";b.elements=c?c:[];b.add=function(a){a&&null!==a&&b.elements.push(a);return b};b.getAttribute=function(){return a};b.addEventListener=b.removeEventListener=function(){}},A=function(a,c,b,d){"1"!==a.cookie||(a.optOut||a.deactivatePixel)||a.firstParty();(b=b?b:"")||(b=a.formObject&&"noForm"!==c?"form":"link");"function"===typeof a.beforeUnloadPixel?a.beforeUnloadPixel():"form"===b&&a.executePlugin(a.getPluginConfig("form","before"));var f="";if(a.config.linkId&&(f+="&ct="+
a.wtEscape(a.maxlen(a.wtUnescape(a.config.linkId),255)))){var e=a.ccParams;"string"===typeof e&&""!==e&&(f+=e)}if(a.wtEp)if(a.wtEpEncoded)f+=a.wtEp;else if(e=a.wtEp,"string"===typeof e&&""!==e)for(var e=e.split(/;/),h=0;h<e.length;h++)if("undefined"!==typeof e[h]){var g=e[h].split(/\=/);a.checkSC("custom")&&(g[1]=a.decrypt(g[1]));g[1]=a.wtEscape(g[1]);f+="&"+g[0]+"="+g[1]}"noForm"!==c&&(f+=d.getFormTrackingData());""!==f&&(a.quicksend(a.wtEscape(a.contentId.split(";")[0])+",1,"+a.baseparams(),f),
a.config.linkId="",a.ccParams="",a.wtEp="");"function"===typeof a.afterUnloadPixel?a.afterUnloadPixel():"form"===b&&a.executePlugin(a.getPluginConfig("form","after"))},xa=function(a){a.formTrackObject=new D(a,function(c){A(a,"form","form",c)});a.formTrackInstall=a.formTrackObject.formTrackInstall;a.formTrackInit=a.formTrackObject.formTrackInstall;a.formTrackSubmit=a.formTrackObject.formTrackSubmit;a.sendFormRequest=a.formTrackObject.sendFormRequest;a.updateFormFieldStatus=a.formTrackObject.updateFormFieldStatus;
"complete"===document.readyState?a.formTrackObject.init():a.registerEvent(g,"load",function(){a.formTrackObject.init()});a.CustomForm=wa;va(a)},ya=function(){var a="",c="",b=!1,d=!0,f=0,e=null,h=!1,k=function(){},l=function(){},n=function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,c)},v=function(){var a=1E3;e=g.setInterval(function(){0>=a&&(g.clearInterval(e),h=!1,b||(d=!0,f++,k(f)));a-=5},5)};this.isPageHidden=function(){return b};this.isPageVisible=
function(){return d};this.setVisibleCall=function(a){k=a};this.setHiddenCall=function(a){l=a};"undefined"!==typeof document.hidden?(a="hidden",c="visibilitychange"):"undefined"!==typeof document.mozHidden?(a="mozHidden",c="mozvisibilitychange"):"undefined"!==typeof document.msHidden?(a="msHidden",c="msvisibilitychange"):"undefined"!==typeof document.oHidden?(a="oHidden",c="ovisibilitychange"):"undefined"!==typeof document.webkitHidden&&(a="webkitHidden",c="webkitvisibilitychange");a&&(b=document[a],
(d=!b)&&f++,function(){n(document,c,function(){(b=document[a])?(g.clearInterval(e),d=h=!1,l()):h||(h=!0,v())})}())},za=function(a){a.setProperty("tabBrowsing",!1);var c=[],b=[],d=null,f=function(){d=new ya;d.setVisibleCall(function(d){if(1<d&&0<b.length){var f=b[0].split("&");d-=1;f[1]="tb="+d+"&cp770="+d+"&"+f[1];a.sendPixel(f.join("&"),b[1])}for(var g=0,l=c.length;g<l;g++)f=c[g][0],d=c[g][1],a.sendPixel(f,d),"wt"===d&&-1===f.search(/&(ct|fn|ft)=.+&/)&&(b=[f,d]);c=[]})};a.tabBrowsing&&f();a.sendTabBrowsingPixel=
function(e,f){d.isPageVisible()?(a.sendPixel(e,f),"wt"===f&&-1===e.search(/&(ct|fn|ft)=.+&/)&&(b=[e,f])):c.push([e,f])};a.startTabBrowsing=function(){null===d&&(a.tabBrowsing=!0,f())}};g.webtrekkV3=g.WebtrekkV3=function(a){var c=g.webtrekkConfig;a||(a=g.webtrekkConfig);this.version="453";for(var b=[M,X,Y,aa,ea,la,na,pa,ra,ua,xa,za],d=0;d<b.length;d++)b[d](this,a,c)}})(window);

/** End webtrekk_v4.js */

//tealium universal tag - utag.sender.23012 ut4.0.202203140906, Copyright 2022 Tealium.com Inc. All Rights Reserved.
try {
  (function (id, loader) {
    var u = {"id" : id};
    utag.o[loader].sender[id] = u;
    // Please do not modify
    if (utag.ut === undefined) { utag.ut = {}; }
    // Start Tealium loader 4.41
    /* utag.js version 4.26 or above is required to avoid errors with this loader function */
    var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
    if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) { u.loader = function(o, a, b, c, l, m) { utag.DB(o); a = document; if (o.type == "iframe") { m = a.getElementById(o.id); if (m && m.tagName == "IFRAME") { b = m; } else { b = a.createElement("iframe"); } o.attrs = o.attrs || {}; utag.ut.merge(o.attrs, { "height": "1", "width": "1", "style": "display:none" }, 0); } else if (o.type == "img") { utag.DB("Attach img: " + o.src); b = new Image(); } else { b = a.createElement("script"); b.language = "javascript"; b.type = "text/javascript"; b.async = 1; b.charset = "utf-8"; } if (o.id) { b.id = o.id; } for (l in utag.loader.GV(o.attrs)) { b.setAttribute(l, o.attrs[l]); } b.setAttribute("src", o.src); if (typeof o.cb == "function") { if (b.addEventListener) { b.addEventListener("load", function() { o.cb(); }, false); } else { b.onreadystatechange = function() { if (this.readyState == "complete" || this.readyState == "loaded") { this.onreadystatechange = null; o.cb(); } }; } } if (o.type != "img" && !m) { l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to " + l + ": " + o.src); if (l == "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b); } } } }; } else { u.loader = utag.ut.loader; }
    // End Tealium loader
    // Start Tealium typeOf 4.35
    if (utag.ut.typeOf === undefined) { u.typeOf = function(e) {return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();};} else { u.typeOf = utag.ut.typeOf; }
    // End Tealium typeOf
    u.toBoolean = function (val) {
      val = val || "";
      return val === true || val.toLowerCase() === "true" || val.toLowerCase() === "on";
    };
    u.ev = {"view" : 1, "link" : 1};

      u.map={"page_content_id":"contentId","page_domain":"contentGroup01","page_navigation_level_1":"contentGroup02","page_navigation_level_2":"contentGroup03","page_navigation_level_3":"contentGroup04","page_navigation_level_4":"contentGroup05","page_navigation_level_5":"contentGroup06","page_navigation_level_6":"contentGroup07","page_target_group":"contentGroup08","page_type":"contentGroup10","wt_link_id":"linkId","wt_track_id":"trackId","page_searchfilter_1":"customParameter01","page_searchfilter_2":"customParameter02","search_engine_searchword":"internalSearch","wt_campaign_id":"campaignId","wt_media_code":"mediaCode","wt_media_code_cookie":"mediaCodeCookie","page_name":"contentGroup09","page_active_tab":"customParameter10","search_engine_page_number":"customParameter01","search_engine_results_per_page":"customParameter05","search_engine_total_results":"customParameter06","shop_customer_type":"customSessionParameter01","shop_order_id":"orderId","shop_product_bookability":"customEcommerceParameter05","shop_product_business_case":"customEcommerceParameter04","shop_product_manufacturer_sku":"customEcommerceParameter03","shop_product_sku":"customEcommerceParameter02","shop_product_status":"productStatus","shop_product_type":"customEcommerceParameter06","shop_order_value":"orderValue","shop_product_name":"product","shop_product_price":"productCost","shop_product_quantity":"productQuantity","shop_wb":"customEcommerceParameter41","shop_vo":"customEcommerceParameter01","shop_product_category":"customEcommerceParameter25","shop_product_class":"customEcommerceParameter39","shop_product_duration":"customEcommerceParameter42","shop_product_group":"customEcommerceParameter30","wt_link_track_pattern":"linkTrackPattern","wt_link_track_replace":"linkTrackReplace","adform_uid":"customSessionParameter02","shop_customer_lifetime_value":"customEcommerceParameter43","shop_product_option":"customEcommerceParameter33","shop_product_solo_eg":"customEcommerceParameter34","shop_product_tarif":"customEcommerceParameter26","shop_product_zubehoer":"customEcommerceParameter35","shop_vpnr":"customEcommerceParameter01","shop_payment_mode":"customEcommerceParameter37","shop_gutschein_kampagne":"customSessionParameter22,customParameter53","shop_gutschein_vorhanden":"customSessionParameter21,customParameter52","wt_product_category_fn":"productCategory01","wt_product_category_mofu":"productCategory03","wt_product_category_pruef":"productCategory05","page_convention":"customParameter100","shop_product_value":"customEcommerceParameter50"};
  u.extend=[function(a,b){ try{ if(typeof b['qp.wt_mc']!='undefined'&&b['qp.wt_mc']!=''){b['wt_media_code']='wt_mc';b['wt_media_code_cookie']='sid'} } catch(e){ utag.DB(e); }  },
function(a,b,c,d,e,f,g){if(1){d=b['js_page.utag.cfg.path'];if(typeof d=='undefined')return;c=[{'/dev/':'865234457892410'},{'/qa/':'196380495960676'}];var m=false;for(e=0;e<c.length;e++){for(f in utag.loader.GV(c[e])){if(d.toString().indexOf(f)>-1){b['wt_track_id']=c[e][f];m=true};};if(m)break};if(!m)b['wt_track_id']='196380495960676';   }},
function(a,b){ try{ if(1){try{b['adform_uid']=window.Adform && window.Adform._uid ? window.Adform._uid : ""}catch(e){}} } catch(e){ utag.DB(e); }  },
function(a,b){ try{ if(typeof b['shop_customer_type']=='undefined'){b['shop_customer_type']='nicht bestandskunde'} } catch(e){ utag.DB(e); }  },
function(a,b){ try{ if(1){
window.wt_replacePersonalData = function(conf) {
	if(conf.type == "before" && (conf.mode == "link" || conf.mode == "click")) {
		/**
		 * replacePersonalData ers�tzt alle Telefonnummern �bergebenen String
		 *
		 * @param {String} str String, welcher bearbeitet werden soll
		 * @return modifizierter String
		 */
		this.replacePersonalData = function(str) {
			var replacer = [
				[/tel:[\d\s.\-+]+/g, "removed-tel"],
				[/msisdn.[\d]+/g, "removed-tel"],
				[/mailto:.+@.+/g, "removed-mail"]
			];
			
			var s = str;
			for(var i = 0; i < replacer.length; i++) {
				s = s.replace(replacer[i][0], replacer[i][1]);
			}
			return s.toLowerCase();
		};

	
		/**
		 * modify Link ID to filter personal data
		 */
		this.config.linkId = this.replacePersonalData(this.config.linkId);
	}
}

window.webtrekkConfig = window.webtrekkConfig || {};
window.webtrekkConfig["executePluginFunction"] = window.webtrekkConfig["executePluginFunction"] || "";
//safe add to config
if (window.webtrekkConfig["executePluginFunction"].indexOf("wt_replacePersonalData") < 0){
	window.webtrekkConfig["executePluginFunction"] += ";wt_replacePersonalData";
}

window.webtrekkConfigMaster = window.webtrekkConfigMaster || {};
window.webtrekkConfigMaster["executePluginFunction"] = window.webtrekkConfigMaster["executePluginFunction"] || "";
//safe add to config
if (window.webtrekkConfigMaster["executePluginFunction"].indexOf("wt_replacePersonalData") < 0){
	window.webtrekkConfigMaster["executePluginFunction"] += ";wt_replacePersonalData";
}


} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if(a === "link") {
  return true;
}

window.webtrekkConfig["cookieSecure"] = true;
} } catch(e){ utag.DB(e) }  }];


    u.send = function(a, b) {
      if (u.ev[a] || u.ev.all !== undefined) {
        utag.DB("send:8");

        var c, d, e, f, prop;

        u.data = {
          "qsp_delim" : "&",
          "kvp_delim" : "=",
          "base_url" : "",
          "optoutName" : "",
          "optoutTimeFrame" : "",
          "paramFirst" : "",
          "linkTrackIgnorePattern" : "^[javascript\:|\#]",
          "delayLinkTrack" : "",
          "delayLinkTrackTime" : 300,
          // E-Commerce Vars
          "product_id" : [],
          "product_name" : [],
          "product_sku" : [],
          "product_brand" : [],
          "product_category" : [],
          "product_subcategory" : [],
          "product_quantity" : [],
          "product_unit_price" : [],
          "product_discount" : [],
          "wt_object_name" : "wtm" || "wt",
          "wt_config" :{
            "trackId" : "196380495960676",
            "trackDomain" : "pix.telekom.de",
            "domain" : "REGEXP:.*((3d-?secure|securesuite|arcot|verified-?by-?visa\\.|geschuetzt-?einkaufen\\.|secure\\.dkb|mastercardsecurecode\\.|acs\\.|attempts\\.securecode|secure-?code\\.|computop-paygate|\\.wlp-acs|hvbmc\\.|paypal|secure\\.payengine|sofort\\.com)|([0-9a-zA-Z\\-]*\\.?(telekom\\.payback|telekom|t-mobile|t-online|entertain|corporatebenefits\\.spectrum8)\\.[a-zA-Z]{2,3}$)).*",
            "linkTrack" : "link",
            "linkTrackAttribute" : "data-tealium-rel",
            "linkTrackParams" : "",
            "linkTrackDownloads" : "",
            "linkTrackPattern" : new RegExp(";jsessionid=[a-zA-Z0-9\.]+[#|?|&]?","g"),
            "linkTrackReplace" : "?",
            "pixelSampling" : "",
            "forceHTTPS" : "1",
            "cookie" : "3",
            "cookieDomain" : "",
            "contentId" : "",
            "form" : "0",
            "sendViaServerActivated" : "false",
            "requestQueueActivated" : "true",
            "executePluginFunction" : ";",
            "mediaCodeCookie" : "",
            "mediaCode" : "",
            "enableAnonymousFunction": "",
            "anonymousOptIn": "",
            "anonymousCookieName": "",
            "suppressIdentificationParameter": ""
          },
          "pixelConfig" : {
            "linkId": "",
            "productCategory" : {}
          }
        };

        // Start tag-scoped extensions
        for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){if(typeof utag_err!='undefined'){utag_err.push({e:'extension error:'+e,s:utag.cfg.path+'utag.'+id+'.js',l:c,t:'ex'})}}};
        utag.DB("send:8:EXTENSIONS");
        utag.DB(b);
        // End tag-scoped extensions

        c = [];

        // Start Mapping
        // mapping runs after pulling values from the E-Commerce extension
        // to give mappinged values top priority
        for (d in utag.loader.GV(u.map)) {
          if (b[d] !== undefined && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              u.data[e[f]] = b[d];

              if (/^(order|product)_/.test(e[f])) {
                continue;
              }
              // Test for webtrekk numbered variables e.g. contentGroup01
              var match = /^([a-zA-Z]+)([0-9]+)$/.exec(e[f]);

              if (match !== null) {
                var paramName = match[1];
                var paramIndex = parseInt(match[2], 10);
                if (typeof u.data.pixelConfig[paramName] !== "object") {
                  u.data.pixelConfig[paramName] = {};
                }
                u.data.pixelConfig[paramName][paramIndex] = b[d];
              } else {
                // special global page config type keyword
                if (e[f] !== "linkId" &&  u.data.wt_config[e[f]] !== undefined) {
                  // contentId has to be in both the global config and the pixel config
                  // contentId is required to be set at tracking instance instantiation time
                  // contentId is needed for ajax driven sites where contentId value is changing
                  // on utag.view/utag.link requests
                  if (e[f] === "contentId") {
                    u.data.pixelConfig[e[f]] = b[d];
                  }
                  u.data.wt_config[e[f]] = b[d];
                } else if(e[f].indexOf("wt_config.") === 0){
                  e[f] = e[f].split("wt_config.")[1];
                  if (/^(ignorePrerendering|formPathAnalysis|tabBrowsing|globalVisitorIds|execCDB|useCDBCache|useCDBScript|requestQueueActivated|enableAnonymousFunction|anonymousOptIn)$/.test(e[f])) {
                    b[d] = u.toBoolean(b[d]);
                  }
                  u.data.wt_config[e[f]] = b[d];
                }  else {
                  // Not a special type parameter, set it as wt.variable
                  u.data.pixelConfig[e[f]] = b[d];
                }
              }
            }
          }
        }

        utag.DB("send:8:MAPPINGS");
        utag.DB(u.data);
        // End Mapping

        // Pull E-Commerce extension values
        // Mappings override E-Commerce extension values
        u.data.order_id = u.data.order_id || u.data.orderId || b._corder || "";
        u.data.order_total = u.data.order_total || u.data.orderValue ||b._ctotal || "";
        u.data.order_subtotal = u.data.order_subtotal || b._csubtotal || "";
        u.data.order_currency = u.data.order_currency || u.data.orderCurrency || b._ccurrency || "";
        if (u.data.product_id.length === 0 && b._cprod !== undefined) { u.data.product_id = b._cprod.slice(0); }
        if (u.data.product_name.length === 0 && b._cprodname !== undefined) { u.data.product_name = b._cprodname.slice(0); }
        if (u.data.product_brand.length === 0 && b._cbrand !== undefined) { u.data.product_brand = b._cbrand.slice(0); }
        if (u.data.product_category.length === 0 && b._ccat !== undefined) { u.data.product_category = b._ccat.slice(0); }
        if (u.data.product_subcategory.length === 0 && b._ccat2 !== undefined) { u.data.product_subcategory = b._ccat2.slice(0); }
        if (u.data.product_quantity.length === 0 && b._cquan !== undefined) { u.data.product_quantity = b._cquan.slice(0); }
        if (u.data.product_unit_price.length === 0 && b._cprice !== undefined) { u.data.product_unit_price = b._cprice.slice(0); }

        if (u.data.order_id) {
          if (u.data.order_couponValue) {u.data.pixelConfig.order_couponValue = u.data.order_couponValue;}
          u.data.pixelConfig.orderId = u.data.order_id;
          u.data.pixelConfig.orderValue = u.data.order_total || u.data.order_subtotal;
          u.data.pixelConfig.orderCurrency = u.data.order_currency;
          if (u.data.product) {
            u.data.pixelConfig.product = (u.typeOf(u.data.product) === "array")  ? u.data.product.join(";") : u.data.product ;
          } else {
            u.data.pixelConfig.product = (u.data.product_id.length && u.data.product_id.length > 0 && u.data.product_id.join) ?
              u.data.product_id.join(";") : (u.data.product_name.length && u.data.product_name.length > 0 && u.data.product_name.join) ?
              u.data.product_name.join(";") : "";
          }

          if (!u.data.pixelConfig.productCategory[1]) {
            u.data.pixelConfig.productCategory[1] = (u.data.product_category.length && u.data.product_category.length > 0 && u.data.product_category.join) ? u.data.product_category.join(";") : "";
          }
          if (!u.data.pixelConfig.productCategory[2]) {
            u.data.pixelConfig.productCategory[2] = (u.data.product_brand.length && u.data.product_brand.length > 0 && u.data.product_brand.join) ? u.data.product_brand.join(";") : "";
          }
          if (!u.data.pixelConfig.productCategory[3]) {
            u.data.pixelConfig.productCategory[3] = (u.data.product_subcategory.length && u.data.product_subcategory.length > 0 && u.data.product_subcategory.join) ? u.data.product_subcategory.join(";") : "";
          }
          if (!u.data.pixelConfig.productQuantity) {
            u.data.pixelConfig.productQuantity = (u.data.product_quantity.length && u.data.product_quantity.length > 0 && u.data.product_quantity.join) ? u.data.product_quantity.join(";") : "";
          }
          if (!u.data.pixelConfig.productCost) {
            u.data.pixelConfig.productCost = (u.data.product_unit_price.length && u.data.product_unit_price.length > 0 && u.data.product_unit_price.join) ? u.data.product_unit_price.join(";") : "";
          }
          u.data.pixelConfig.productStatus = u.data.pixelConfig.productStatus || "conf";
        } // end e-commerce block

        // link requests must have a "linkId" keyword
        if (a === "link") {
          u.data.pixelConfig.linkId = u.data.linkId || "";
        } else {
          // linkId only sent with a link event
          delete u.data.pixelConfig.linkId;
        }

        if (!window[u.data.wt_object_name]) {
          // webtrekk config must be initialised to something. If it already exists, then the new object will overwrite it in the initialisation call
          window.webtrekkConfig = window.webtrekkConfig || u.data.wt_config;
          window[u.data.wt_object_name] = new webtrekkV3(u.data.wt_config);
          if (u.data.optoutName || u.data.optoutTimeFrame) {
            window[u.data.wt_object_name].optoutName = u.data.optoutName || "webtrekkOptOut";
            if (u.data.optoutTimeFrame ) {
              var optOutTF = parseInt(u.data.optoutTimeFrame);
              if(!isNaN(optOutTF)) {
                window[u.data.wt_object_name].setCookie(window[u.data.wt_object_name].optoutName, 1, optOutTF);
              }
            }
          }
          // form tracking on single pages only - only one form can be tracked per pixel instance and page
          if (u.data.pixelConfig.formTrackInstall && window[u.data.wt_object_name].formTrackInstall) {
            window[u.data.wt_object_name].formTrackInstall(u.data.pixelConfig.formTrackInstall);
            // delete so it will not be sent in sendinfo
            delete u.data.pixelConfig.formTrackInstall;
          }
        }

        // clear out pixelConfig if properties are not set before transmitting
        for (prop in utag.loader.GV(u.data.pixelConfig)) {
          if (u.data.pixelConfig[prop] === "" || (u.typeOf(u.data.pixelConfig[prop]) === "array" && u.data.pixelConfig[prop].length === 0)) {
            try{
              delete u.data.pixelConfig[prop];
            }catch(e){
              u.data.pixelConfig[prop] = undefined;
              utag.DB(e);
            }
          }
        }

        // call sendinfo with custom arguments for one or more pixel request
        // from potentially the same page
        if (window[u.data.wt_object_name].sendinfo) {
          window[u.data.wt_object_name].sendinfo(u.data.pixelConfig);

          // update globalConfig contentId with any view/link request sent from the same page
          if (u.data.pixelConfig.contentId !== undefined) {
            window[u.data.wt_object_name].contentId = u.data.pixelConfig.contentId;
          }
        }

        utag.DB("send:8:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  }("8", "telekom.mshop"));
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag
