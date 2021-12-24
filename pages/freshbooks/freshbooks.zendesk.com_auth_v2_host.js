!function e(i,s,o){function t(r,a){if(!s[r]){if(!i[r]){var d="function"==typeof require&&require;if(!a&&d)return d(r,!0);if(n)return n(r,!0);throw new Error("Cannot find module '"+r+"'")}var l=s[r]={exports:{}};i[r][0].call(l.exports,function(e){var s=i[r][1][e];return t(s?s:e)},l,l.exports,e,i,s,o)}return s[r].exports}for(var n="function"==typeof require&&require,r=0;r<o.length;r++)t(o[r]);return t}({1:[function(e,i,s){function o(){var e=(new t).getBrowser();return e.name.toLowerCase()}var t=e("../helpers/ua-parser.min"),n=["firefox"],r=["safari","firefox","mobile safari"];i.exports={browserName:function(){return o()},shortenedFlow:function(){var e=o();return n.includes(e)},storageAccessRequired:function(e){var i,s=o();return e.allowFirefox?(console.log("allowFirefox enabled"),i=r.includes(s),console.log("Require storage access for "+s+": "+i),i):(i=["safari","mobile safari"].includes(s),console.log("Require storage access for "+s+": "+i),i)},requestStorageAccess:function(){return new Promise(function(e){document.requestStorageAccess().then(function(i){e(i)}.bind(this))["catch"](function(i){console.log("ACCESS REQUEST REJECTED: "+i),e(!1)}.bind(this))})}}},{"../helpers/ua-parser.min":12}],2:[function(e,i,s){var o=function(e){for(var i,s,o=1,t=arguments.length;t>o;o++){i=arguments[o];for(s in i)i.hasOwnProperty(s)&&(e[s]=i[s])}return e};i.exports=o},{}],3:[function(e,i,s){var o=e("./toDashed"),t=e("./ie8/forEach"),n=function(e,i){var s,n;if(!e)throw new Error("Missing elm");return i=i||[],s="data-",n={},t(i,function(i){var t,r;t=s+o(i),r=e.getAttribute(t),/^(true|false)$/.test(r)&&(r="true"===r),/^\d+$/.test(r)&&(r=parseInt(r,10)),null!==r&&(n[i]=r)}),n};i.exports=n},{"./ie8/forEach":6,"./toDashed":9}],4:[function(e,i,s){var o=function(e,i,s){var o;for(o in e)e.hasOwnProperty(o)&&i.call(s,o,e[o])};i.exports=o},{}],5:[function(e,i,s){var o=function(e,i){return function(){return e.apply(i,arguments)}};i.exports=o},{}],6:[function(e,i,s){var o=function(e,i,s){var o,t;for(t=0,o=e.length;o>t;t++)i.call(s,e[t])};i.exports=o},{}],7:[function(e,i,s){var o=function(e,i,s){var o="on"+i;window.addEventListener?e.removeEventListener(i,s,!1):e.detachEvent(o,s)};i.exports=o},{}],8:[function(e,i,s){var o=function(e,i,s){var o="on"+i;window.addEventListener?e.addEventListener(i,s,!1):e.attachEvent(o,s)};i.exports=o},{}],9:[function(e,i,s){var o=function(e){var i;return e=e||"",i=/([A-Z])/g,e.replace(/([A-Z])/g,function(e){return"-"+e.toLowerCase()})};i.exports=o},{}],10:[function(e,i,s){var o=function(e){var i;return e=e||"",i=/([A-Z])/g,e.replace(/([A-Z])/g,function(e){return"_"+e.toLowerCase()})};i.exports=o},{}],11:[function(e,i,s){var o={onload:1,onunload:1,onblur:1,onchange:1,onfocus:1,onreset:1,onselect:1,onsubmit:1,onabort:1,onkeydown:1,onkeypress:1,onkeyup:1,onclick:1,ondblclick:1,onmousedown:1,onmousemove:1,onmouseout:1,onmouseover:1,onmouseup:1},t=function(e){var i,s;i=document,document.createEvent?(s=document.createEvent("Events"),s.initEvent(e,!0,!0)):document.createEventObject&&(s=document.createEventObject(),s.eventType=e),s.eventName=e,i.dispatchEvent?i.dispatchEvent(s):i.fireEvent&&o["on"+e]?i.fireEvent("on"+s.eventType,s):i[e]?i[e]():i["on"+e]&&i["on"+e]()};i.exports=t},{}],12:[function(e,i,s){!function(e,o){"use strict";var t="0.7.22",n="",r="?",a="function",d="undefined",l="object",c="string",u="major",h="model",w="name",p="type",f="vendor",m="version",v="architecture",b="console",g="mobile",y="tablet",x="smarttv",k="wearable",E="embedded",A={extend:function(e,i){var s={};for(var o in e)i[o]&&i[o].length%2===0?s[o]=i[o].concat(e[o]):s[o]=e[o];return s},has:function(e,i){return"string"==typeof e?-1!==i.toLowerCase().indexOf(e.toLowerCase()):!1},lowerize:function(e){return e.toLowerCase()},major:function(e){return typeof e===c?e.replace(/[^\d\.]/g,"").split(".")[0]:o},trim:function(e){return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}},T={rgx:function(e,i){for(var s,t,n,r,d,c,u=0;u<i.length&&!d;){var h=i[u],w=i[u+1];for(s=t=0;s<h.length&&!d;)if(d=h[s++].exec(e))for(n=0;n<w.length;n++)c=d[++t],r=w[n],typeof r===l&&r.length>0?2==r.length?typeof r[1]==a?this[r[0]]=r[1].call(this,c):this[r[0]]=r[1]:3==r.length?typeof r[1]!==a||r[1].exec&&r[1].test?this[r[0]]=c?c.replace(r[1],r[2]):o:this[r[0]]=c?r[1].call(this,c,r[2]):o:4==r.length&&(this[r[0]]=c?r[3].call(this,c.replace(r[1],r[2])):o):this[r]=c?c:o;u+=2}},str:function(e,i){for(var s in i)if(typeof i[s]===l&&i[s].length>0){for(var t=0;t<i[s].length;t++)if(A.has(i[s][t],e))return s===r?o:s}else if(A.has(i[s],e))return s===r?o:s;return e}},S={browser:{oldsafari:{version:{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}}},device:{amazon:{model:{"Fire Phone":["SD","KF"]}},sprint:{model:{"Evo Shift 4G":"7373KT"},vendor:{HTC:"APA",Sprint:"Sprint"}}},os:{windows:{version:{ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"}}}},N={browser:[[/(opera\smini)\/([\w\.-]+)/i,/(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,/(opera).+version\/([\w\.]+)/i,/(opera)[\/\s]+([\w\.]+)/i],[w,m],[/(opios)[\/\s]+([\w\.]+)/i],[[w,"Opera Mini"],m],[/\s(opr)\/([\w\.]+)/i],[[w,"Opera"],m],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,/(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i,/(bidubrowser|baidubrowser)[\/\s]?([\w\.]+)/i,/(?:ms|\()(ie)\s([\w\.]+)/i,/(rekonq)\/([\w\.]*)/i,/(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i],[w,m],[/(konqueror)\/([\w\.]+)/i],[[w,"Konqueror"],m],[/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],[[w,"IE"],m],[/(edge|edgios|edga|edg)\/((\d+)?[\w\.]+)/i],[[w,"Edge"],m],[/(yabrowser)\/([\w\.]+)/i],[[w,"Yandex"],m],[/(Avast)\/([\w\.]+)/i],[[w,"Avast Secure Browser"],m],[/(AVG)\/([\w\.]+)/i],[[w,"AVG Secure Browser"],m],[/(puffin)\/([\w\.]+)/i],[[w,"Puffin"],m],[/(focus)\/([\w\.]+)/i],[[w,"Firefox Focus"],m],[/(opt)\/([\w\.]+)/i],[[w,"Opera Touch"],m],[/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i],[[w,"UCBrowser"],m],[/(comodo_dragon)\/([\w\.]+)/i],[[w,/_/g," "],m],[/(windowswechat qbcore)\/([\w\.]+)/i],[[w,"WeChat(Win) Desktop"],m],[/(micromessenger)\/([\w\.]+)/i],[[w,"WeChat"],m],[/(brave)\/([\w\.]+)/i],[[w,"Brave"],m],[/(qqbrowserlite)\/([\w\.]+)/i],[w,m],[/(QQ)\/([\d\.]+)/i],[w,m],[/m?(qqbrowser)[\/\s]?([\w\.]+)/i],[w,m],[/(baiduboxapp)[\/\s]?([\w\.]+)/i],[w,m],[/(2345Explorer)[\/\s]?([\w\.]+)/i],[w,m],[/(MetaSr)[\/\s]?([\w\.]+)/i],[w],[/(LBBROWSER)/i],[w],[/xiaomi\/miuibrowser\/([\w\.]+)/i],[m,[w,"MIUI Browser"]],[/;fbav\/([\w\.]+);/i],[m,[w,"Facebook"]],[/safari\s(line)\/([\w\.]+)/i,/android.+(line)\/([\w\.]+)\/iab/i],[w,m],[/headlesschrome(?:\/([\w\.]+)|\s)/i],[m,[w,"Chrome Headless"]],[/\swv\).+(chrome)\/([\w\.]+)/i],[[w,/(.+)/,"$1 WebView"],m],[/((?:oculus|samsung)browser)\/([\w\.]+)/i],[[w,/(.+(?:g|us))(.+)/,"$1 $2"],m],[/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i],[m,[w,"Android Browser"]],[/(sailfishbrowser)\/([\w\.]+)/i],[[w,"Sailfish Browser"],m],[/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i],[w,m],[/(dolfin)\/([\w\.]+)/i],[[w,"Dolphin"],m],[/(qihu|qhbrowser|qihoobrowser|360browser)/i],[[w,"360 Browser"]],[/((?:android.+)crmo|crios)\/([\w\.]+)/i],[[w,"Chrome"],m],[/(coast)\/([\w\.]+)/i],[[w,"Opera Coast"],m],[/fxios\/([\w\.-]+)/i],[m,[w,"Firefox"]],[/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],[m,[w,"Mobile Safari"]],[/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],[m,w],[/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i],[[w,"GSA"],m],[/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],[w,[m,T.str,S.browser.oldsafari.version]],[/(webkit|khtml)\/([\w\.]+)/i],[w,m],[/(navigator|netscape)\/([\w\.-]+)/i],[[w,"Netscape"],m],[/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,/(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,/(links)\s\(([\w\.]+)/i,/(gobrowser)\/?([\w\.]*)/i,/(ice\s?browser)\/v?([\w\._]+)/i,/(mosaic)[\/\s]([\w\.]+)/i],[w,m]],cpu:[[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],[[v,"amd64"]],[/(ia32(?=;))/i],[[v,A.lowerize]],[/((?:i[346]|x)86)[;\)]/i],[[v,"ia32"]],[/windows\s(ce|mobile);\sppc;/i],[[v,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],[[v,/ower/,"",A.lowerize]],[/(sun4\w)[;\)]/i],[[v,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],[[v,A.lowerize]]],device:[[/\((ipad|playbook);[\w\s\),;-]+(rim|apple)/i],[h,f,[p,y]],[/applecoremedia\/[\w\.]+ \((ipad)/],[h,[f,"Apple"],[p,y]],[/(apple\s{0,1}tv)/i],[[h,"Apple TV"],[f,"Apple"],[p,x]],[/(archos)\s(gamepad2?)/i,/(hp).+(touchpad)/i,/(hp).+(tablet)/i,/(kindle)\/([\w\.]+)/i,/\s(nook)[\w\s]+build\/(\w+)/i,/(dell)\s(strea[kpr\s\d]*[\dko])/i],[f,h,[p,y]],[/(kf[A-z]+)\sbuild\/.+silk\//i],[h,[f,"Amazon"],[p,y]],[/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i],[[h,T.str,S.device.amazon.model],[f,"Amazon"],[p,g]],[/android.+aft([bms])\sbuild/i],[h,[f,"Amazon"],[p,x]],[/\((ip[honed|\s\w*]+);.+(apple)/i],[h,f,[p,g]],[/\((ip[honed|\s\w*]+);/i],[h,[f,"Apple"],[p,g]],[/(blackberry)[\s-]?(\w+)/i,/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,/(hp)\s([\w\s]+\w)/i,/(asus)-?(\w+)/i],[f,h,[p,g]],[/\(bb10;\s(\w+)/i],[h,[f,"BlackBerry"],[p,g]],[/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone|p00c)/i],[h,[f,"Asus"],[p,y]],[/(sony)\s(tablet\s[ps])\sbuild\//i,/(sony)?(?:sgp.+)\sbuild\//i],[[f,"Sony"],[h,"Xperia Tablet"],[p,y]],[/android.+\s([c-g]\d{4}|so[-l]\w+)(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[h,[f,"Sony"],[p,g]],[/\s(ouya)\s/i,/(nintendo)\s([wids3u]+)/i],[f,h,[p,b]],[/android.+;\s(shield)\sbuild/i],[h,[f,"Nvidia"],[p,b]],[/(playstation\s[34portablevi]+)/i],[h,[f,"Sony"],[p,b]],[/(sprint\s(\w+))/i],[[f,T.str,S.device.sprint.vendor],[h,T.str,S.device.sprint.model],[p,g]],[/(htc)[;_\s-]+([\w\s]+(?=\)|\sbuild)|\w+)/i,/(zte)-(\w*)/i,/(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i],[f,[h,/_/g," "],[p,g]],[/(nexus\s9)/i],[h,[f,"HTC"],[p,y]],[/d\/huawei([\w\s-]+)[;\)]/i,/(nexus\s6p|vog-l29|ane-lx1|eml-l29|ele-l29)/i],[h,[f,"Huawei"],[p,g]],[/android.+(bah2?-a?[lw]\d{2})/i],[h,[f,"Huawei"],[p,y]],[/(microsoft);\s(lumia[\s\w]+)/i],[f,h,[p,g]],[/[\s\(;](xbox(?:\sone)?)[\s\);]/i],[h,[f,"Microsoft"],[p,b]],[/(kin\.[onetw]{3})/i],[[h,/\./g," "],[f,"Microsoft"],[p,g]],[/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,/mot[\s-]?(\w*)/i,/(XT\d{3,4}) build\//i,/(nexus\s6)/i],[h,[f,"Motorola"],[p,g]],[/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],[h,[f,"Motorola"],[p,y]],[/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],[[f,A.trim],[h,A.trim],[p,x]],[/hbbtv.+maple;(\d+)/i],[[h,/^/,"SmartTV"],[f,"Samsung"],[p,x]],[/\(dtv[\);].+(aquos)/i],[h,[f,"Sharp"],[p,x]],[/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,/((SM-T\w+))/i],[[f,"Samsung"],h,[p,y]],[/smart-tv.+(samsung)/i],[f,[p,x],h],[/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,/(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i,/sec-((sgh\w+))/i],[[f,"Samsung"],h,[p,g]],[/sie-(\w*)/i],[h,[f,"Siemens"],[p,g]],[/(maemo|nokia).*(n900|lumia\s\d+)/i,/(nokia)[\s_-]?([\w-]*)/i],[[f,"Nokia"],h,[p,g]],[/android[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i],[h,[f,"Acer"],[p,y]],[/android.+([vl]k\-?\d{3})\s+build/i],[h,[f,"LG"],[p,y]],[/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],[[f,"LG"],h,[p,y]],[/(lg) netcast\.tv/i],[f,h,[p,x]],[/(nexus\s[45])/i,/lg[e;\s\/-]+(\w*)/i,/android.+lg(\-?[\d\w]+)\s+build/i],[h,[f,"LG"],[p,g]],[/(lenovo)\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+))/i],[f,h,[p,y]],[/android.+(ideatab[a-z0-9\-\s]+)/i],[h,[f,"Lenovo"],[p,y]],[/(lenovo)[_\s-]?([\w-]+)/i],[f,h,[p,g]],[/linux;.+((jolla));/i],[f,h,[p,g]],[/((pebble))app\/[\d\.]+\s/i],[f,h,[p,k]],[/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i],[f,h,[p,g]],[/crkey/i],[[h,"Chromecast"],[f,"Google"],[p,x]],[/android.+;\s(glass)\s\d/i],[h,[f,"Google"],[p,k]],[/android.+;\s(pixel c)[\s)]/i],[h,[f,"Google"],[p,y]],[/android.+;\s(pixel( [23])?( xl)?)[\s)]/i],[h,[f,"Google"],[p,g]],[/android.+;\s(\w+)\s+build\/hm\1/i,/android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,/android.+(mi[\s\-_]*(?:a\d|one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i,/android.+(redmi[\s\-_]*(?:note)?(?:[\s_]?[\w\s]+))\s+build/i],[[h,/_/g," "],[f,"Xiaomi"],[p,g]],[/android.+(mi[\s\-_]*(?:pad)(?:[\s_]?[\w\s]+))\s+build/i],[[h,/_/g," "],[f,"Xiaomi"],[p,y]],[/android.+;\s(m[1-5]\snote)\sbuild/i],[h,[f,"Meizu"],[p,g]],[/(mz)-([\w-]{2,})/i],[[f,"Meizu"],h,[p,g]],[/android.+a000(1)\s+build/i,/android.+oneplus\s(a\d{4})[\s)]/i],[h,[f,"OnePlus"],[p,g]],[/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i],[h,[f,"RCA"],[p,y]],[/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i],[h,[f,"Dell"],[p,y]],[/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i],[h,[f,"Verizon"],[p,y]],[/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i],[[f,"Barnes & Noble"],h,[p,y]],[/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i],[h,[f,"NuVision"],[p,y]],[/android.+;\s(k88)\sbuild/i],[h,[f,"ZTE"],[p,y]],[/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i],[h,[f,"Swiss"],[p,g]],[/android.+[;\/]\s*(zur\d{3})\s+build/i],[h,[f,"Swiss"],[p,y]],[/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i],[h,[f,"Zeki"],[p,y]],[/(android).+[;\/]\s+([YR]\d{2})\s+build/i,/android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i],[[f,"Dragon Touch"],h,[p,y]],[/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i],[h,[f,"Insignia"],[p,y]],[/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i],[h,[f,"NextBook"],[p,y]],[/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i],[[f,"Voice"],h,[p,g]],[/android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i],[[f,"LvTel"],h,[p,g]],[/android.+;\s(PH-1)\s/i],[h,[f,"Essential"],[p,g]],[/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i],[h,[f,"Envizen"],[p,y]],[/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i],[f,h,[p,y]],[/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i],[h,[f,"MachSpeed"],[p,y]],[/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i],[f,h,[p,y]],[/android.+[;\/]\s*TU_(1491)\s+build/i],[h,[f,"Rotor"],[p,y]],[/android.+(KS(.+))\s+build/i],[h,[f,"Amazon"],[p,y]],[/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i],[f,h,[p,y]],[/\s(tablet|tab)[;\/]/i,/\s(mobile)(?:[;\/]|\ssafari)/i],[[p,A.lowerize],f,h],[/[\s\/\(](smart-?tv)[;\)]/i],[[p,x]],[/(android[\w\.\s\-]{0,9});.+build/i],[h,[f,"Generic"]]],engine:[[/windows.+\sedge\/([\w\.]+)/i],[m,[w,"EdgeHTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[m,[w,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,/(icab)[\/\s]([23]\.[\d\.]+)/i],[w,m],[/rv\:([\w\.]{1,9}).+(gecko)/i],[m,w]],os:[[/microsoft\s(windows)\s(vista|xp)/i],[w,m],[/(windows)\snt\s6\.2;\s(arm)/i,/(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,/(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],[w,[m,T.str,S.os.windows.version]],[/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],[[w,"Windows"],[m,T.str,S.os.windows.version]],[/\((bb)(10);/i],[[w,"BlackBerry"],m],[/(blackberry)\w*\/?([\w\.]*)/i,/(tizen|kaios)[\/\s]([\w\.]+)/i,/(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i],[w,m],[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i],[[w,"Symbian"],m],[/\((series40);/i],[w],[/mozilla.+\(mobile;.+gecko.+firefox/i],[[w,"Firefox OS"],m],[/(nintendo|playstation)\s([wids34portablevu]+)/i,/(mint)[\/\s\(]?(\w*)/i,/(mageia|vectorlinux)[;\s]/i,/(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,/(hurd|linux)\s?([\w\.]*)/i,/(gnu)\s?([\w\.]*)/i],[w,m],[/(cros)\s[\w]+\s([\w\.]+\w)/i],[[w,"Chromium OS"],m],[/(sunos)\s?([\w\.\d]*)/i],[[w,"Solaris"],m],[/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i],[w,m],[/(haiku)\s(\w+)/i],[w,m],[/cfnetwork\/.+darwin/i,/ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i],[[m,/_/g,"."],[w,"iOS"]],[/(mac\sos\sx)\s?([\w\s\.]*)/i,/(macintosh|mac(?=_powerpc)\s)/i],[[w,"Mac OS"],[m,/_/g,"."]],[/((?:open)?solaris)[\/\s-]?([\w\.]*)/i,/(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,/(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,/(unix)\s?([\w\.]*)/i],[w,m]]},z=function(i,s){if("object"==typeof i&&(s=i,i=o),!(this instanceof z))return new z(i,s).getResult();var t=i||(e&&e.navigator&&e.navigator.userAgent?e.navigator.userAgent:n),r=s?A.extend(N,s):N;return this.getBrowser=function(){var e={name:o,version:o};return T.rgx.call(e,t,r.browser),e.major=A.major(e.version),e},this.getCPU=function(){var e={architecture:o};return T.rgx.call(e,t,r.cpu),e},this.getDevice=function(){var e={vendor:o,model:o,type:o};return T.rgx.call(e,t,r.device),e},this.getEngine=function(){var e={name:o,version:o};return T.rgx.call(e,t,r.engine),e},this.getOS=function(){var e={name:o,version:o};return T.rgx.call(e,t,r.os),e},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return t},this.setUA=function(e){return t=e,this},this};z.VERSION=t,z.BROWSER={NAME:w,MAJOR:u,VERSION:m},z.CPU={ARCHITECTURE:v},z.DEVICE={MODEL:h,VENDOR:f,TYPE:p,CONSOLE:b,MOBILE:g,SMARTTV:x,TABLET:y,WEARABLE:k,EMBEDDED:E},z.ENGINE={NAME:w,VERSION:m},z.OS={NAME:w,VERSION:m},typeof s!==d?(typeof i!==d&&i.exports&&(s=i.exports=z),s.UAParser=z):"function"==typeof define&&define.amd?define(function(){return z}):e&&(e.UAParser=z);var O=e&&(e.jQuery||e.Zepto);if(O&&!O.ua){var R=new z;O.ua=R.getResult(),O.ua.get=function(){return R.getUA()},O.ua.set=function(e){R.setUA(e);var i=R.getResult();for(var s in i)O.ua[s]=i[s]}}}("object"==typeof window?window:this)},{}],13:[function(e,i,s){function o(){if(this.KEYS=["returnTo","role","theme","token","locale","brandId","authOrigin","authDomain","showMobileDeeplink","mobileDeeplinkParams","action"],this.elm=document.currentScript||document.querySelector('[src*="/auth/v2"]'),!this.elm)throw new Error("Could not find script tag for zendesk_auth");if(this.declarativeOptions=a(this.elm,this.KEYS),!this.declarativeOptions.authDomain){var e;e=this.elm.getAttribute("src")||"",this.declarativeOptions.authDomain=e.replace(/\/auth\/v2.*/,"")}this.open=function(e){var i,s;return e=e||{},s||(i=r({},this.declarativeOptions,e),s=new n(i),s.onDestroyed(function(){s=void 0})),{close:function(){s.close()}}},this.declarativeOptions.action&&this.open()}var t,n=e("./lib/Host"),r=e("./helpers/extend"),a=e("./helpers/fetchDeclarativeAttrs");t=new o,window.Zendesk=window.Zendesk||{},window.Zendesk.Auth=function(e){return t.open(e)}},{"./helpers/extend":2,"./helpers/fetchDeclarativeAttrs":3,"./lib/Host":16}],14:[function(e,i,s){var o=e("../helpers/forIn"),t=function(){this.element=document.createElement("div"),this.styles={"-webkit-overflow-scrolling":"touch",overflow:"auto",position:"absolute",top:0,right:0,left:0,"z-index":99999},this.style()};t.prototype={style:function(){var e="";o(this.styles,function(i,s){e+=[i,":",s,"!important;"].join("")}),this.element.setAttribute("style",e)},changeStyles:function(e){e=e||{},o(e,function(e,i){this.styles[e]=i},this),this.style()},destroy:function(){this.element.parentNode&&this.element.parentNode.removeChild(this.element),this.element=null}},i.exports=t},{"../helpers/forIn":4}],15:[function(e,i,s){var o=function(e){"string"==typeof e&&(e=this.deserialize(e)),e=e||{},this.type=e.type||"",this.data=e.data||{}};o.prototype={serialize:function(){return JSON.stringify(this)},deserialize:function(e){return JSON.parse(e)}},i.exports=o},{}],16:[function(e,i,s){var o=e("./Iframe"),t=e("./Receiver"),n=e("../helpers/extend"),r=e("../helpers/triggerEvent"),a=e("../helpers/toUnderscore"),d=e("../helpers/ie8/forEach"),l=e("../helpers/cookieAccessHelper"),c=function(e){e=e||{},this.validParams=["role","returnTo","theme","token","locale","brandId","authOrigin","showMobileDeeplink","mobileDeeplinkParams"],this.options=n({action:"signin",authDomain:"",returnTo:window.location.href},e),this.load()};c.prototype={load:function(){this.frame||(this.frame=new o([this.options.authDomain,"/auth/v2/login/",this.options.action,"?",this.getParams()].join("")),this.receiver=new t(window,{acceptFromSource:this.frame.getWindow()}),this.receiver.on("auth:load_url",this.onLoadUrl,this),this.receiver.on("auth:goto_return_to",this.gotoReturnTo,this),this.receiver.on("auth:loaded",this.onLoaded,this),this.receiver.on("auth:close",this.close,this),this.receiver.on("auth:resize",this.onResize,this),r("auth:load"))},close:function(){r("auth:close"),this.destroy.apply(this,arguments)},getParams:function(){var e=[],i=decodeURIComponent(this.options.returnTo),s=i.match(/\/admin|\/agent|\/chat|\/connect|\/explore|\/sell|oauth\//);return d(this.validParams,function(i){if(this.options.hasOwnProperty(i)){var s=a(i);e.push(s+"="+encodeURIComponent(this.options[i]))}},this),s&&e.push("role=agent"),l.storageAccessRequired({allowFirefox:!0})&&(e.push("cookie_access_required=1"),e.push("browser="+l.browserName()),l.shortenedFlow()&&e.push("request_cookie_access_state=request_access")),e.join("&")},destroy:function(){this.frame.destroy(),this.receiver.destroy(),this.frame=void 0,this.receiver=void 0,this.onDestroyed.call(this)},onDestroyed:function(){},onResize:function(e){var i=e.height,s=window.innerHeight||document.documentElement.clientHeight;i>0&&this.frame.changeStyles({height:i+"px","min-height":s+"px"})},onLoadUrl:function(e){this.close(),window.location.href=e.url},gotoReturnTo:function(){window.location.href===this.options.returnTo?window.location.reload(!0):window.location.href=this.options.returnTo},onLoaded:function(){r("auth:loaded"),document.querySelector("body").scrollTop=1}},i.exports=c},{"../helpers/cookieAccessHelper":1,"../helpers/extend":2,"../helpers/ie8/forEach":6,"../helpers/toUnderscore":10,"../helpers/triggerEvent":11,"./Iframe":17,"./Receiver":19}],17:[function(e,i,s){var o=e("./Container"),t=e("../helpers/extend"),n=e("../helpers/forIn"),r=function(e,i){if(!e)throw new Error("src not provided");this.settings=t({src:e,autoLoad:!0,attachTo:"body"},i),this.element=document.createElement("iframe"),this.element.setAttribute("scrolling","no"),this.element.setAttribute("allowTransparency",!0),this.element.setAttribute("border",0),this.element.setAttribute("frameborder",0),this.container=(new o).element,this.styles={"z-index":"99999",display:"block","background-color":"transparent",border:"none",overflow:"hidden",visibility:"visible",margin:"0",padding:"0","-webkit-tap-highlight-color":"transparent",width:"100%",height:"100%"},this.settings.autoLoad&&this.load()};r.prototype={style:function(){var e="";n(this.styles,function(i,s){e+=[i,":",s,"!important;"].join("")}),this.element.setAttribute("style",e)},changeStyles:function(e){e=e||{},n(e,function(e,i){this.styles[e]=i},this),this.style()},attach:function(){var e=document.querySelector(this.settings.attachTo);e&&(this.container.appendChild(this.element),e.appendChild(this.container))},src:function(){this.element.src=this.settings.src},load:function(){this.style(),this.attach(),this.src()},getWindow:function(){return this.element.contentWindow},destroy:function(){this.container.parentNode&&this.container.parentNode.removeChild(this.container),this.container=null,this.element=null}},i.exports=r},{"../helpers/extend":2,"../helpers/forIn":4,"./Container":14}],18:[function(e,i,s){function o(){this.events={}}var t=e("../helpers/ie8/forEach");o.prototype={on:function(e,i,s){this.events[e]||(this.events[e]=[]),this.events[e].push({callback:i,thisArg:s})},emit:function(e,i){var s=this.events[e]||[],o=this.events["*"]||[],n=o.concat(s);t(n,function(s){s.callback.call(s.thisArg,i,e)})},destroy:function(){this.events=void 0}},i.exports=o},{"../helpers/ie8/forEach":6}],19:[function(e,i,s){var o=e("./Evt"),t=e("./Mediator"),n=e("../helpers/extend"),r=e("../helpers/ie8/bind"),a=e("../helpers/ie8/on"),d=e("../helpers/ie8/off"),l=function(e,i){if(!e)throw new Error("missing target");this.events={},this.target=e,this.settings=n({acceptFromSource:null},i||{}),this.onMessage=r(this.onMessage,this),a(this.target,"message",this.onMessage),this.mediator=new t};l.prototype={onMessage:function(e){if(e.source===this.settings.acceptFromSource){var i=new o(e.data);this.mediator.emit(i.type,i.data)}},on:function(){this.mediator.on.apply(this.mediator,arguments)},destroy:function(){d(this.target,"message",this.onMessage),this.mediator.destroy(),this.mediator=void 0,this.settings=void 0,this.target=void 0,this.events=void 0}},i.exports=l},{"../helpers/extend":2,"../helpers/ie8/bind":5,"../helpers/ie8/off":7,"../helpers/ie8/on":8,"./Evt":15,"./Mediator":18}]},{},[13]);