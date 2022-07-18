/*! For license information please see 6179.57f34bd81b6629d24618.js.LICENSE.txt */
(self.webpackChunkgnavHeader=self.webpackChunkgnavHeader||[]).push([[6179],{6892:function(e,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.attachGoogleOneTap=void 0,n.handlePassportResponse=u,n.handlePromptMomentNotification=d,n.useGoogleIdTokenForAuth=p;var t,r=(t=o(71171))&&t.__esModule?t:{default:t},a=o(14385),i=o(2451),c=o(49949),l=o(5954),s=o(55966);function d(e){var n=e.notification,o=e.baseSecureUrl,t=e.googTapClientTK,r=e.observer,a=e.isDisplayTest,i=void 0!==a&&a,s=e.itpSupportEnabled,d=void 0!==s&&s;n.isNotDisplayed()?(r.disconnect(),(0,c.logOneTapActionToPassport)({baseSecureUrl:o,action:"NotDisplayed",oneTapTk:t})):n.isSkippedMoment()?("user_cancel"===n.getSkippedReason()?(0,c.logOneTapActionToPassport)({baseSecureUrl:o,action:"ClosedSelector",oneTapTk:t}):"issuing_failed"===n.getSkippedReason()?(r.disconnect(),(0,l.decrementBannerShownDueToError)()):"auto_cancel"===n.getSkippedReason()&&r.disconnect(),(0,c.logOneTapActionToPassport)({baseSecureUrl:o,action:"SikppedOneTap",oneTapTk:t})):n.isDismissedMoment()?(r.disconnect(),(0,c.logOneTapActionToPassport)({baseSecureUrl:o,action:"Dismissed",oneTapTk:t})):n.isDisplayed()&&((0,c.logOneTapActionToPassport)({baseSecureUrl:o,action:"SelectorOpened",oneTapTk:t}),(0,l.recordBannerShown)(i)),d&&(0,c.logOneTapActionToPassport)({baseSecureUrl:o,action:"ItpEnabledOneTap",oneTapTk:t})}function u(e){var n=e.passportResponse,o=e.idToken,t=e.googTapClientTK,r=e.baseSecureUrl,c=e.locale;return new Promise((function(e,l){n.json().then((function(s){if(s.legalConsentBanner)(0,i.renderLegalConsentBanner)({oneTapResponse:s,idToken:o,googTapClientTK:t,baseSecureUrl:r,locale:c}).then((function(n){var o=n.email,t=n.givenName,r=n.familyName,a=n.isNewAccount;return e({email:o,givenName:t,familyName:r,isNewAccount:a})})).catch((function(e){return l(e)}));else if(s.redirectUrl){location.replace(s.redirectUrl);var d=new Error("Redirecting for security");d.type=a.oneTapErrorTypes.SECURITY_REDIRECTION,d.respone=n,l(d)}else if(s.success&&s.email)s.cookieManagerUrl?fetch(s.cookieManagerUrl,{cache:"no-cache",credentials:"include",mode:"cors"}).then((function(){return e({email:s.email,givenName:s.givenName,familyName:s.familyName,isNewAccount:s.isNewAccount})})).catch((function(e){return l(e)})):e({email:s.email,givenName:s.givenName,familyName:s.familyName,isNewAccount:s.isNewAccount});else{var u=new Error("Invalid response from passport web app");u.type=a.oneTapErrorTypes.PASSPORT_WEB_APP_ERROR,u.respone=n,l(u)}})).catch((function(e){e.response=n,l(e)}))}))}function p(e){var n=e.idToken,o=e.googTapClientTK,t=e.baseSecureUrl,r=e.okToCreate,a=void 0!==r&&r,i=e.locale,c=window.location.href.replace(/&/g,"%26");return new Promise((function(e,r){fetch("".concat(t,"/account/googleauth/onetap"),{body:"token=".concat(n,"&googTapClientTK=").concat(o,"&googTapCreate=").concat(a,"&hl=").concat(i,"&continue=").concat(c),cache:"no-cache",credentials:"include",headers:{"content-type":"application/x-www-form-urlencoded"},method:"POST",mode:"cors"}).then((function(a){return u({passportResponse:a,idToken:n,googTapClientTK:o,baseSecureUrl:t,locale:i}).then((function(n){var o=n.email,t=n.givenName,r=n.familyName,a=n.isNewAccount;return e({email:o,givenName:t,familyName:r,isNewAccount:a})})).catch((function(e){return r(e)}))})).catch((function(e){return r(e)}))}))}n.attachGoogleOneTap=function(e){var n=e.googleClientId,o=e.baseSecureUrl,t=e.proctorGroup,i=e.forceShowOneTap,u=void 0!==i&&i,T=e.locale,f=void 0===T?"en_US":T,g=e.parentId,v=void 0===g?void 0:g,E=e.isDisplayTest,C=void 0!==E&&E,m=e.itpSupportEnabled,y=void 0!==m&&m;return new Promise((function(e,i){function T(e){var n=new CustomEvent("onetapevent",{detail:{displayed:e}});window.dispatchEvent(n)}if(t===a.proctorGroupEnum.INACTIVE){T(!1);var g=new Error("Google one tap proctor is inactive");return g.type=a.oneTapErrorTypes.PROCTOR_NOT_ACTIVE,void i(g)}var E=(0,r.default)();if((0,c.logOneTapActionToPassport)({baseSecureUrl:o,action:"LibraryCalled",oneTapTk:E}),t===a.proctorGroupEnum.CONTROL){T(!1);var m=new Error("Google one tap proctor is control");return m.type=a.oneTapErrorTypes.PROCTOR_NOT_ACTIVE,void i(m)}if((0,l.isBannerHiddenDueToBrowserStorage)(u,C)){T(!1),(0,c.logOneTapActionToPassport)({baseSecureUrl:o,action:"DisabledByBrowserStorage",oneTapTk:E});var O=new Error("Google one tap was previously closed by the user in this session");return O.type=a.oneTapErrorTypes.USER_CANCELLED,void i(O)}var _=document.getElementsByTagName("body")[0],w=new MutationObserver((function(e,n){e.forEach((function(e){var o=e.addedNodes;o&&o.length>0&&"credential_picker_container"===o[0].id&&(window.setTimeout((function(){window.focus()}),1500),n.disconnect())}))}));w.observe(_,{childList:!0}),window.setTimeout((function(){w.disconnect()}),1e4),(0,s.asyncLoadScript)(a.webConstants.GOOGLE_ONE_TAP_SCRIPT_URL_V2,(function(){var e=new Error("Google one tap script failed to load");e.type=a.oneTapErrorTypes.SCRIPT_LOAD_FAILED,i(e)})),window.onGoogleLibraryLoad=function(){var t=(0,l.getIndeedCookieDomain)(window.location.hostname).substring(1);google.accounts.id.initialize({client_id:n,cancel_on_tap_outside:!1,state_cookie_domain:t,itp_support:y,prompt_parent_id:v,callback:function(n){n.credential&&p({idToken:n.credential,googTapClientTK:E,baseSecureUrl:o,locale:f}).then((function(n){var o=n.email,t=n.givenName,r=n.familyName,a=n.isNewAccount;return e({email:o,givenName:t,familyName:r,isNewAccount:a})})).catch((function(e){return i(e)}))}}),google.accounts.id.prompt((function(e){T(!(e.isNotDisplayed()||e.isSkippedMoment())),d({notification:e,baseSecureUrl:o,googTapClientTK:E,observer:w,isDisplayTest:C,itpSupportEnabled:y})}))}}))}},14385:function(e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.webConstants=n.userCreatedErrors=n.proctorGroupEnum=n.oneTapErrorTypes=void 0;n.proctorGroupEnum={INACTIVE:0,CONTROL:1,ACTIVE:2};n.webConstants={GOOGLE_ONE_TAP_SCRIPT_URL_V2:"https://accounts.google.com/gsi/client",CONSENT_BANNER_OVERLAY_HTML_ID:"passport-frontendclient-overlay",GOOGLE_ONLY_MODAL_HTML_ID:"passport-frontendclient-google-only-modal",SESSION_STORAGE_BANNER_CLOSED:"hideOneTap",GOOGLE_ONE_TAP_USEAGE_COOKIE:"gonetap",CONSENT_BANNER_COMPONENT_CLASSNAME:"legalConsentBannerComponent",MODAL_PROMO_TEXT_CLASSNAME:"modalPromoText"};var o={PROCTOR_NOT_ACTIVE:"proctorNotActive",GOOGLE_ERROR:"googleError",USER_CANCELLED:"userCanceled",PASSPORT_WEB_APP_ERROR:"passportWebAppError",SECURITY_REDIRECTION:"securityRedirection",JSON_PARSE_EXCEPTION:"jsonParseError",NO_CREDENTIALS_AVAILABLE:"noCredentialsAvailable",REQUEST_FAILED:"requestFailed",SCRIPT_LOAD_FAILED:"scriptLoadFailed"};n.oneTapErrorTypes=o;var t=[o.SECURITY_REDIRECTION,o.USER_CANCELLED,o.PROCTOR_NOT_ACTIVE];n.userCreatedErrors=t},70915:function(e,n,o){"use strict";n.j=void 0;var t=o(14385),r=o(5954);function a(e){var n=document.getElementById(t.webConstants.CONSENT_BANNER_OVERLAY_HTML_ID);n&&(n.style.display="none"),e&&(0,r.recordBannerClosed)(),window.closeGoogleOnlyModal=null,window.submitGoogleOnlyModal=null}function i(e){var n=encodeURIComponent(window.location.href),o="".concat(e,"/account/googleauth/init?continue=").concat(n);window.innerWidth<=800&&window.innerHeight<=600?window.location.href=o:function(e,n,o){var t=arguments.length>3&&void 0!==arguments[3]?arguments[3]:180,r="\n                width=".concat(n,",\n                height=").concat(o,",\n                menubar=no,\n                status=no,\n                scrollbars=no,\n                dependent=yes,\n                top=").concat(window.top.screenY+t,",\n                left=").concat(window.top.screenX+(window.innerWidth-n)/2,"\n            "),a=window.open(e,"Login",r);a.focus()}(o,680,765),a(!1)}n.j=function(e){var n=e.baseSecureUrl,o=e.title,c=e.body,l=e.buttonText,s=e.locale;return new Promise((function(e,d){if((0,r.isBannerHiddenDueToBrowserStorage)(!1))d();else{var u=document.createElement("div");u.setAttribute("id",t.webConstants.CONSENT_BANNER_OVERLAY_HTML_ID),u.setAttribute("dir",function(e){var n=e.split("_").shift();return["ar","iw"].includes(n)?"rtl":"ltr"}(s)),window.closeGoogleOnlyModal=function(){d(),a(!0)},window.submitGoogleOnlyModal=function(){e(),i(n)},u.innerHTML='<div id="google-Only-Modal" class=\'google-Only-Modal\'>\n             <div class="icl-Card">\n             <div class="google-Only-Modal-Upper-Row">\n             <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="google-Only-Modal-Icon">\n                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.64 9.20455C17.64 8.56637 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#4285F4"/>\n                <path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853"/>\n                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957273C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z" fill="#FBBC05"/>\n                <path fill-rule="evenodd" clip-rule="evenodd" d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"/>\n             </svg>\n             <div id="google-Only-Modal-Headline" class="icl-Card-headline">'.concat(o,'</div>\n                <button aria-label="Close" class="icl-CloseButton icl-Card-close" onclick="closeGoogleOnlyModal()">\n                    <svg role="img" class="icl-Icon icl-Icon--black icl-Icon--sm" aria-label="Close">\n                        <path d="M14.53,4.53L13.47,3.47,9,7.94,4.53,3.47,3.47,4.53,7.94,9,3.47,13.47l1.06,1.06L9,10.06l4.47,4.47,1.06-1.06L10.06,9Z">\n                        </path>\n                    </svg>\n                </button>\n            </div>\n            <div class="icl-Card-cta">\n                <button id="google-Only-Modal-Button" type="button" class="icl-Button--primary icl-Button--md icl-Button--block" onclick="submitGoogleOnlyModal()">').concat(l,'</button>\n            </div>\n            <div id="google-Only-Modal-Body" class="icl-Card-body">').concat(c,"</div>\n            </div>\n        </div>"),document.body.appendChild(u),(0,r.recordBannerShown)()}}))}},2451:function(e,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.renderLegalConsentBanner=void 0;var t=o(6892),r=o(14385),a=o(49949);function i(){var e=document.getElementById(r.webConstants.CONSENT_BANNER_OVERLAY_HTML_ID);e&&(e.style.display="none"),window.closeOneTapLegalConsentBanner=null,window.submitOneTapLegalConsentBanner=null}o(44798);n.renderLegalConsentBanner=function(e){var n=e.oneTapResponse,o=e.idToken,c=e.googTapClientTK,l=e.baseSecureUrl,s=e.locale;return new Promise((function(e,d){window.closeOneTapLegalConsentBanner=function(){var e=new Error("Google one consent banner closed by user");e.type=r.oneTapErrorTypes.USER_CANCELLED,d(e),i(),(0,a.logOneTapActionToPassport)({baseSecureUrl:l,action:"ConsentClosed",oneTapTk:c})},window.submitOneTapLegalConsentBanner=function(){(0,t.useGoogleIdTokenForAuth)({idToken:o,googTapClientTK:c,baseSecureUrl:l,okToCreate:!0,locale:s}).then((function(n){var o=n.email,t=n.givenName,r=n.familyName,a=n.isNewAccount;return e({email:o,givenName:t,familyName:r,isNewAccount:a})})).catch((function(e){return d(e)})),i()};var u=document.createElement("div");u.setAttribute("id",r.webConstants.CONSENT_BANNER_OVERLAY_HTML_ID),u.setAttribute("class","passport-Consent-Overlay"),u.setAttribute("dir",function(e){var n=e.split("_").shift();return["ar","iw"].includes(n)?"rtl":"ltr"}(s)),u.innerHTML='<div id="google-One-Tap-Consent-Banner" class=\'google-One-Tap-Consent-Banner\'>\n                <div id="gray-Mask" class="gray-Mask"></div>\n                    <div id="legal-Consent-Banner" class="icl-Card">\n                    <button aria-label="Close" class="icl-CloseButton icl-Card-close" onclick="closeOneTapLegalConsentBanner()">\n                        <svg role="img" class="icl-Icon icl-Icon--black icl-Icon--sm" aria-label="Close">\n                            <path d="M14.53,4.53L13.47,3.47,9,7.94,4.53,3.47,3.47,4.53,7.94,9,3.47,13.47l1.06,1.06L9,10.06l4.47,4.47,1.06-1.06L10.06,9Z">\n                            </path>\n                        </svg>\n                    </button>\n                    <div id="one-Tap-Headline" class="icl-Card-headline">'.concat(n.legalConsentBanner.headline,'</div>\n                    <div id="one-Tap-Body" class="icl-Card-body">').concat(n.legalConsentBanner.content,'</div>\n                    <div class="icl-Card-cta">\n                        <button id="one-Tap-Button" type="button" class="icl-Button--primary icl-Button--md icl-Button--block" onclick="submitOneTapLegalConsentBanner()">').concat(n.legalConsentBanner.buttonText,"</button>\n                    </div>\n                </div>\n            </div>"),document.body.appendChild(u)}))}},70480:function(e,n,o){"use strict";n.d=void 0;var t=o(14385);n.d=function(e){var n=e.error;if(n.type!==t.oneTapErrorTypes.SECURITY_REDIRECTION&&n.type!==t.oneTapErrorTypes.USER_CANCELLED&&n.type!==t.oneTapErrorTypes.PROCTOR_NOT_ACTIVE&&n.type!==t.oneTapErrorTypes.NO_CREDENTIALS_AVAILABLE&&n.type!==t.oneTapErrorTypes.REQUEST_FAILED&&n.type!==t.oneTapErrorTypes.SCRIPT_LOAD_FAILED)throw n}},55966:function(e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.asyncLoadScript=function(e,n){return new Promise((function(){var o=document.createElement("script");o.src=e,document.body.appendChild(o),o.onerror=n}))}},5954:function(e,n,o){"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}Object.defineProperty(n,"__esModule",{value:!0}),n.decrementBannerShownDueToError=function(){var e=a.get(r.webConstants.GOOGLE_ONE_TAP_USEAGE_COOKIE);d(e)&&s(Number(e)-1)},n.getIndeedCookieDomain=l,n.isBannerHiddenDueToBrowserStorage=function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!e)try{if(window.sessionStorage.getItem(r.webConstants.SESSION_STORAGE_BANNER_CLOSED))return!0;var o=a.get(r.webConstants.GOOGLE_ONE_TAP_USEAGE_COOKIE);return d(o)?n||Number(o)>=5:"string"==typeof o&&o===c}catch(e){return!1}return!1},n.recordBannerClosed=function(){s(c)},n.recordBannerShown=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=a.get(r.webConstants.GOOGLE_ONE_TAP_USEAGE_COOKIE);d(n)?s(Number(n)+1,e):s(1,e)};var r=o(14385),a=function(e,n){if(!n&&e&&e.__esModule)return e;if(null===e||"object"!==t(e)&&"function"!=typeof e)return{default:e};var o=i(n);if(o&&o.has(e))return o.get(e);var r={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var c in e)if("default"!==c&&Object.prototype.hasOwnProperty.call(e,c)){var l=a?Object.getOwnPropertyDescriptor(e,c):null;l&&(l.get||l.set)?Object.defineProperty(r,c,l):r[c]=e[c]}r.default=e,o&&o.set(e,r);return r}(o(36808));function i(e){if("function"!=typeof WeakMap)return null;var n=new WeakMap,o=new WeakMap;return(i=function(e){return e?o:n})(e)}var c="closed";function l(e){var n=e.lastIndexOf(".indeed.");if(-1===n)throw new Error("Cannot set cookie on non indeed domain ".concat(e," ."));return e.substring(n)}function s(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];a.remove(r.webConstants.GOOGLE_ONE_TAP_USEAGE_COOKIE);var o=n?1/24:1;a.set(r.webConstants.GOOGLE_ONE_TAP_USEAGE_COOKIE,e,{expires:o,domain:l(window.location.hostname)})}function d(e){return!isNaN(e)}},49949:function(e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.logOneTapActionToPassport=function(e){var n=e.baseSecureUrl,o=e.action,t=e.oneTapTk,r=e.error,a=void 0===r?"":r,i=""===a?"":"err=".concat(a);fetch("".concat(n,"/rpc/log?a=onetap_action&oneTapA=").concat(o,"&clVer=").concat("0.3.40","&googTapClientTK=").concat(t,"&").concat(i),{cache:"no-cache",method:"GET",mode:"no-cors",credentials:"include"})}},48406:function(e,n,o){"use strict";o.r(n),o.d(n,{googleOneTap:function(){return s}});var t=o(6892),r=o(70915),a=o(70480),i=o(9072),c=o(52602),l=o(14385),s=function(){var e=(0,i.iE)();try{var n=e.googleOneTapModel;n&&(n.shouldAttachGoogleOnlyModal?(0,r.j)({baseSecureUrl:n.passportUrl,title:n.modalTitle,body:n.modalBody,buttonText:n.modalButtonText,locale:n.locale}):(0,t.attachGoogleOneTap)({googleClientId:n.googleClientId,baseSecureUrl:n.passportUrl,parentId:"got_cta",isDisplayTest:n.isDisplayTest,itpSupportEnabled:n.itpSupportEnabled}).then((function(){return location.reload()})).catch((function(e){n.modalActive&&e.type===l.oneTapErrorTypes.SCRIPT_LOAD_FAILED&&(0,r.j)({baseSecureUrl:n.passportUrl,title:n.modalTitle,body:n.modalBody,buttonText:n.modalButtonText,locale:n.locale}),(0,a.d)({error:e})})))}catch(n){(0,c.Ay)(e,n)}}},36808:function(e,n,o){var t,r;!function(a){if(void 0===(r="function"==typeof(t=a)?t.call(n,o,n,e):t)||(e.exports=r),!0,e.exports=a(),!!0){var i=window.Cookies,c=window.Cookies=a();c.noConflict=function(){return window.Cookies=i,c}}}((function(){function e(){for(var e=0,n={};e<arguments.length;e++){var o=arguments[e];for(var t in o)n[t]=o[t]}return n}function n(e){return e.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function o(t){function r(){}function a(n,o,a){if("undefined"!=typeof document){"number"==typeof(a=e({path:"/"},r.defaults,a)).expires&&(a.expires=new Date(1*new Date+864e5*a.expires)),a.expires=a.expires?a.expires.toUTCString():"";try{var i=JSON.stringify(o);/^[\{\[]/.test(i)&&(o=i)}catch(e){}o=t.write?t.write(o,n):encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=encodeURIComponent(String(n)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var c="";for(var l in a)a[l]&&(c+="; "+l,!0!==a[l]&&(c+="="+a[l].split(";")[0]));return document.cookie=n+"="+o+c}}function i(e,o){if("undefined"!=typeof document){for(var r={},a=document.cookie?document.cookie.split("; "):[],i=0;i<a.length;i++){var c=a[i].split("="),l=c.slice(1).join("=");o||'"'!==l.charAt(0)||(l=l.slice(1,-1));try{var s=n(c[0]);if(l=(t.read||t)(l,s)||n(l),o)try{l=JSON.parse(l)}catch(e){}if(r[s]=l,e===s)break}catch(e){}}return e?r[e]:r}}return r.set=a,r.get=function(e){return i(e,!1)},r.getJSON=function(e){return i(e,!0)},r.remove=function(n,o){a(n,"",e(o,{expires:-1}))},r.defaults={},r.withConverter=o,r}((function(){}))}))},44798:function(e,n,o){"use strict";o.r(n)},45327:function(e){for(var n=[],o=0;o<256;++o)n[o]=(o+256).toString(16).substr(1);e.exports=function(e,o){var t=o||0,r=n;return[r[e[t++]],r[e[t++]],r[e[t++]],r[e[t++]],"-",r[e[t++]],r[e[t++]],"-",r[e[t++]],r[e[t++]],"-",r[e[t++]],r[e[t++]],"-",r[e[t++]],r[e[t++]],r[e[t++]],r[e[t++]],r[e[t++]],r[e[t++]]].join("")}},85217:function(e){var n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(n){var o=new Uint8Array(16);e.exports=function(){return n(o),o}}else{var t=new Array(16);e.exports=function(){for(var e,n=0;n<16;n++)0==(3&n)&&(e=4294967296*Math.random()),t[n]=e>>>((3&n)<<3)&255;return t}}},71171:function(e,n,o){var t=o(85217),r=o(45327);e.exports=function(e,n,o){var a=n&&o||0;"string"==typeof e&&(n="binary"===e?new Array(16):null,e=null);var i=(e=e||{}).random||(e.rng||t)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,n)for(var c=0;c<16;++c)n[a+c]=i[c];return n||r(i)}}}]);
//# sourceMappingURL=6179.57f34bd81b6629d24618.js.map