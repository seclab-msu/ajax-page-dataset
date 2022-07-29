//tealium universal tag - utag.loader ut4.44.202207201127, Copyright 2022 Tealium.com Inc. All Rights Reserved. 

if(typeof utag_err=='undefined')var utag_err=[];window._tealium_old_error=window._tealium_old_error || window.onerror || function(){};window.onerror=function(m,u,l){if(typeof u !== 'undefined' && u.indexOf('/utag.')>0 && utag_err.length < 5)utag_err.push({e:m,s:u,l:l,t:'js'});window._tealium_old_error(m,u,l)};
var utag_condload=false;window.__tealium_twc_switch=false;try{
/*jslint browser: true, nomen: true, plusplus: true, regexp: true */
/*global utag: true, jQuery: true, b: true */
//Tealium Environment Switcher: MUST BE FIRST. DO NOT MOVE
//Update "profile" var to the name of the current tealium profile

(function() {
    "use strict";
    if (window.location.search && (window.location.search.indexOf("tealium_env=") > -1) && !(window.utag_condload_env)) {
        var qs = window.location.search || "",
            env = qs.match(/(tealium_env=)(dev|qa|prod|clear)/),
            account = "telekom",
            //Update "profile" var to the name of the current tealium profile:
            profile = "mshop",
            a,
            b,
            //uncomment the correct line below to switch between different tealium domains
            //tealium_domain = "//tags.tiqcdn.com", //multi-cdn
            tealium_domain = "//tags-eu.tiqcdn.com", //multi-cdn (EU ONLY)
            //tealium_domain = "//tealium.hs.llnwd.net/o43", //limelight only
            src;
        if (env && env.length && env[2]) {
            if (env[2].indexOf("clear") > -1) {
                document.cookie = "utag_env_" + account + "_" + profile + "=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
                if (window.console) {
                    window.console.log("Custom Tealium environment CLEARED. Default environment for this page will be used.");
                }
                //reload the page to switch back to default environment
                window.location.search = "";
            } else {
                if (window.console) {
                    window.console.log("tealium environment = " + env[2]);
                }
                window.utag_condload_env = true;
                window.utag_condload = true;
                src = tealium_domain + "/utag/" + account + "/" + profile + "/" + env[2] + "/utag.js";
                document.cookie = "utag_env_" + account + "_" + profile + "=" + src + ";path=/";
                a = document;
                b = a.createElement('script');
                b.language = 'javascript';
                b.type = 'text/javascript';
                b.src = src;
                a.getElementsByTagName('head')[0].appendChild(b);
            }
        }
    }
}());
}catch(e){console.log(e);}

if(!utag_condload){try{
try{
  var newScript = document.createElement('SCRIPT');
  newScript.src = document.location.protocol+"//track.adform.net/Serving/Cookie/?adfaction=getjs;adfcookname=uid";
  document.getElementsByTagName('head')[0].appendChild(newScript);
}
catch(e){
}
}catch(e){console.log(e);}}

if(!utag_condload){try{ try{
/*******
 * Title: Consent Management Config
 * Run: Preloader (IMPORTANT: Edit load order so this extension runs before other consent sync extensions)
 * These variables are used by the consent sync extensions.
 * How to use:
 *     hiddenPages: If you want to hide the consent layer on certain pages, enter their page_content_id or URL here.
 *     hideConidtion: Will hide the consent layer if the expression returns true. E.g document.url == 'test.com'.
 *     isSPA: Set to true on Single Page Applications or if manual utag.view
 *     consentSync: This indicates wether the consentSync extensions should run or not.
 *     usesMaxymiser: This option enables adds a loading animation to hide flickering after giving consent for Maxymiser
 *     privacyURLs: Only accepts an object with the language codes as keys, the url String as values
 *     defaultPrivacyUrl: Set the profiles default privacy URL (only accepts Strings).
 *     customCookieName: You may use a custom Consent CookieName instead of CONSENTMGR (within quaotation marks).
 *     consentPeriod: The amount of days after which the user will have to give consent again (if he didn't visit the site again in the meanwhile). Telekom default is 90 days
 *******/

window.consentMngmntConfig = {
    consentSync: true,
    isSPA: true,
};
} catch(e){ console.log(e) } }catch(e){console.log(e);}}

if(!utag_condload){try{ try{
var TEALIUM = TEALIUM || {};

TEALIUM.defaultConsentMngmntConfig = {
    consentSync: false,
    hiddenPages: [],
    hideCondition: false,
    isSPA: false,
    usesMaxymiser: false,
    privacyURLs: false,
    defaultPrivacyURL: false,
    customCookieName: false,
    consentPeriod: 90,
    imprintURLs: false,
    defaultImprintURL: false,
    fontURLRegular: false,
    fontURLBold: false,
}

if(typeof window.consentMngmntConfig == "undefined") {
    window.consentMngmntConfig = TEALIUM.defaultConsentMngmntConfig;
    console.warn("Loaded default Tealium consent management config, since it was not defined before loading the consent library!");
} else {
    // Merge existing config
    for (var key in window.consentMngmntConfig) {
        TEALIUM.defaultConsentMngmntConfig[key] = window.consentMngmntConfig[key];
    }
    window.consentMngmntConfig = TEALIUM.defaultConsentMngmntConfig;
}

// Use the custom consent cookie name if there is one
window.utag_cfg_ovrd = window.utag_cfg_ovrd || {};
if(window.consentMngmntConfig.customCookieName) {
    window.utag_cfg_ovrd.cmcookiens = window.consentMngmntConfig.customCookieName;
}
// Sets the consent perdiod from the config file. Default ist 90 days
window.utag_cfg_ovrd.consentPeriod = window.consentMngmntConfig.consentPeriod || 90;

TEALIUM.consent_prompt = TEALIUM.consent_prompt || {};
TEALIUM.preferences_prompt = TEALIUM.preferences_prompt || {};
window.TEALIUM.consent_prompt.css = '@charset "utf-8"; @font-face{font-family:Consent-TeleNeo;font-weight:400;src:url(https://ebs10.telekom.de/opt-in/font/teleneo/teleneo-regular.woff2) format("woff2"),url(teleneo-regular.woff2) format("woff2")}@font-face{font-family:Consent-TeleNeo;font-weight:700;src:url(https://ebs10.telekom.de/opt-in/font/teleneo/teleneo-bold.woff2) format("woff2"),url(teleneo-bold.woff2) format("woff2")}#__tealiumGDPRecModal{position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;z-index:2147483645}.cl-outer{-webkit-box-align:center;-ms-flex-align:center;align-items:center;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;left:0;position:fixed;right:0;top:0;background-color:rgba(0,0,0,0.5)}.cl-main{background:#fff;border-radius:4px;-webkit-box-sizing:border-box;box-sizing:border-box;color:#262626;margin:12px;max-height:91vh;max-width:none;overflow-y:auto;overflow-x:hidden;z-index:1}.cl-content{padding:48px 24px}.cl-header{font-size:21px;font-weight:700;line-height:25px;margin:0 0 36px 0;padding:0;font-family:Consent-TeleNeo,sans-serif}.cl-intro{position:relative;font-family:Consent-TeleNeo,sans-serif;font-size:18px;font-weight:400;line-height:24px;margin:0;padding:0;padding-right:15px;max-width:none;max-height:30vh;text-align:justify;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto}#__tealiumGDPRecModal .cl-intro{overflow-y:scroll}#__tealiumGDPRecModal .cl-intro::-webkit-scrollbar-track{background:lightgray;background-color:lightgray}#__tealiumGDPRecModal .cl-intro::-webkit-scrollbar{width:4px;background:lightgray;background-color:lightgray}#__tealiumGDPRecModal .cl-intro::-webkit-scrollbar-thumb{background:#e20074;background-color:#e20074;border-radius:3px}.cl-intro i{font-style:italic;font-size:inherit;font-weight:400;line-height:inherit;font-family:Consent-TeleNeo,sans-serif;display:inline}.cl-overflow-indicator-hidden{visibility:hidden}@-webkit-keyframes cl-overflow-indicator-display{0%{opacity:0}50%{opacity:0}55%{opacity:.7}95%{opacity:.7}100%{opacity:0}}@keyframes cl-overflow-indicator-display{0%{opacity:0}50%{opacity:0}55%{opacity:.7}95%{opacity:.7}100%{opacity:0}}#cl-overflow-indicator{width:100%;position:-webkit-sticky;position:sticky;bottom:0;-webkit-animation-name:cl-overflow-indicator-display;animation-name:cl-overflow-indicator-display;-webkit-animation-duration:6s;animation-duration:6s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}@-webkit-keyframes cl-overflow-indicator-jump{from{bottom:30px}to{bottom:15px}}@keyframes cl-overflow-indicator-jump{from{bottom:30px}to{bottom:15px}}#cl-overflow-indicator-arrow:after{content:" ";position:absolute;right:15px;bottom:30px;width:20px;height:20px;color:#e20074;border-bottom:3px solid;border-right:3px solid;border-radius:3px;-webkit-transform:rotateZ(45deg);transform:rotateZ(45deg);-webkit-animation-name:cl-overflow-indicator-jump;animation-name:cl-overflow-indicator-jump;-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}.cl-main .cl-link{color:#00739f;background:none;border:0;padding:0;padding-top:5px;cursor:pointer;text-decoration:none}.cl-main .cl-link:hover{text-decoration:underline;color:#00739f;background:none;border:none}.cl-main .cl-link:active{color:#00739f;background:none;border:none}.cl-main .cl-link:focus{color:#00739f;background:none;outline:-webkit-focus-ring-color auto 1px}.cl-footer{padding-top:30px;text-align:center}.cl-actions{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.cl-privacy_link,.cl-imprint_link{padding-top:5px;display:block;text-align:center;color:#00739f !important;font-family:Consent-TeleNeo,sans-serif;font-size:16px;font-weight:400;line-height:18px;margin:0;text-decoration:none}.cl-privacy_link:hover,.cl-imprint_link:hover{text-decoration:underline}.cl-privacy_link:focus,.cl-imprint_link:focus{outline:-webkit-focus-ring-color auto 1px}.cl-main .cl-btn{-webkit-box-align:center;-ms-flex-align:center;align-items:center;background:transparent;background-color:transparent;color:#262626;border:1px solid #b2b2b2;border-radius:4px;-webkit-box-shadow:none;box-shadow:none;text-shadow:none;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer;display:inline-block;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:10px 16px;vertical-align:middle;font-family:Consent-TeleNeo,sans-serif;font-size:16px;font-weight:700;margin:0;margin-bottom:12px;-webkit-transition:background-color .2s ease,color .2s ease;transition:background-color .2s ease,color .2s ease;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:0;flex-shrink:0;height:initial;width:initial;line-height:initial}.cl-main .cl-btn:hover,.cl-main .cl-btn:active,.cl-main .cl-btn:focus{background-color:rgba(0,0,0,0.15);background:rgba(0,0,0,0.15);font-family:Consent-TeleNeo,sans-serif;-webkit-font-smoothing:inherit;-webkit-box-shadow:none;box-shadow:none;font-weight:700;border-color:#b2b2b2}.cl-main .cl-btn:focus{outline:-webkit-focus-ring-color auto 1px}.cl-main .cl-btn--accept-all,.cl-main .cl-btn--reject-all{background:#e20074;background-color:#e20074;color:#fff;border:none}.cl-main .cl-btn--accept-all:hover,.cl-main .cl-btn--accept-all:active,.cl-main .cl-btn--accept-all:focus,.cl-main .cl-btn--reject-all:hover,.cl-main .cl-btn--reject-all:active,.cl-main .cl-btn--reject-all:focus{background:#bd0061;background-color:#bd0061;color:#fff;border:none}@media (min-width:640px){.cl-main{margin:0;max-width:92.5%}.cl-content{padding:48px}.cl-footer{display:-webkit-box;display:-ms-flexbox;display:flex;gap:10px;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;text-align:left}.cl-links{display:-webkit-box;display:-ms-flexbox;display:flex;gap:5px;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1;padding-top:10px}.cl-actions{-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;-webkit-box-ordinal-group:3;-ms-flex-order:2;order:2;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.cl-main .cl-btn{font-size:18px;margin-bottom:14px}.cl-main .cl-btn:nth-of-type(3){margin-bottom:0}.cl-privacy_link,.cl-imprint_link{padding-top:0;font-size:18px;line-height:22px;text-align:left}.cl-privacy_link{-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.cl-imprint_link{-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;-webkit-box-ordinal-group:3;-ms-flex-order:2;order:2}}@media (min-width:1200px){.cl-main{max-width:79.1%}.cl-header{margin-bottom:24px}.cl-footer{padding-top:32px;-webkit-box-orient:vertical;-webkit-box-direction:reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse;gap:25px}.cl-actions{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.cl-links{gap:25px;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:left;-ms-flex-pack:left;justify-content:left;-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.cl-main .cl-btn{margin-bottom:0;margin-right:0;-webkit-box-ordinal-group:3;-ms-flex-order:2;order:2;-ms-flex-preferred-size:auto;flex-basis:auto;-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;margin-bottom:0;margin-right:30px}.cl-main .cl-btn--accept-all{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.cl-main .cl-btn--reject-all{-webkit-box-ordinal-group:3;-ms-flex-order:2;order:2}.cl-main .cl-btn--accept-custom{-webkit-box-ordinal-group:4;-ms-flex-order:3;order:3;margin-left:auto}.cl-main .cl-btn:nth-of-type(3){margin-right:0}}@media (min-width:1344px){.cl-main{max-width:1215px;width:80.66%}}#mmLoadingPrompt{display:inline-block;position:absolute;width:80px;height:80px;margin:auto;z-index:9999}#mmLoadingPrompt div{position:absolute;border:4px solid #fff;opacity:1;border-radius:50%;-webkit-animation:mmLoadingPrompt 1s cubic-bezier(0,0.2,0.8,1) infinite;animation:mmLoadingPrompt 1s cubic-bezier(0,0.2,0.8,1) infinite}#mmLoadingPrompt div:nth-child(2){-webkit-animation-delay:-0.5s;animation-delay:-0.5s}@-webkit-keyframes mmLoadingPrompt{0%{top:36px;left:36px;width:0;height:0;opacity:1}100%{top:0;left:0;width:72px;height:72px;opacity:0}}@keyframes mmLoadingPrompt{0%{top:36px;left:36px;width:0;height:0;opacity:1}100%{top:0;left:0;width:72px;height:72px;opacity:0}}';
window.TEALIUM.consent_prompt.html= '<!-- : 2.0 Date: 02.02.2021 --> <div class=cl-outer  aria-modal=true > <div id=mmLoadingPrompt  style="display:none;"> <div></div> <div></div> </div> <div class=cl-main  id=promptLayerContent > <div class=cl-content > <h5 class=cl-header >{{title}}</h5> <div class=cl-intro  id=cl-intro > {{message}} <div id=cl-overflow-indicator  class=cl-overflow-indicator-hidden > <div id=cl-overflow-indicator-arrow ></div> </div> </div> <div class=cl-footer > <div class=cl-actions > <button class="cl-btn cl-btn--accept-all" id=consentAcceptAll  tabindex=0 >{{confirmation_button}}</button> <button class="cl-btn cl-btn--reject-all" id=rejectAll  tabindex=0 >{{reject_button}}</button> <button class="cl-btn cl-btn--accept-custom" id=editSettingsBtn  tabindex=0 >{{advanced_settings_button}}</button> </div> <div class=cl-links > <a href="{{privacy_policy_link}}" class="cl-privacy_link cl-data-privacy-url" tabindex=0 >{{privacy_policy}}</a> <a href="{{imprint_link}}" class="cl-imprint_link cl-data-imprint-url" tabindex=0 >{{imprint}}</a> </div> </div> </div> </div> </div>';
window.TEALIUM.consent_prompt.js = '(function(){function acceptAllCookies(){utag.gdpr.setConsentValue(1);deferredUtagLink("content.button.consent-agree");triggerConsentChange();initiateLayerClosing(true);};function acceptRequiredCookies(){utag.gdpr.setConsentValue(0);deferredUtagLink("content.button.no-consent");triggerConsentChange();closeConsentLayer();};function goToPreferences(){utag.gdpr.showConsentPreferences();document.getElementById("__tealiumGDPRecModal").style.display="none";deferredUtagLink("content.button.consent-settings");};function toggleArrow(){var container=document.getElementById("cl-intro");var clArrow=document.getElementById("cl-overflow-indicator");var IntroFontSize=parseInt(window.getComputedStyle(container,null).getPropertyValue("font-size"));var isScrolledToBottom=container.scrollTop>=(container.scrollHeight-IntroFontSize*0.5-container.offsetHeight);if(clArrow.classList.contains("cl-overflow-indicator-hidden")&&isScrolledToBottom==false){clArrow.classList.remove("cl-overflow-indicator-hidden");return;};if(!clArrow.classList.contains("cl-overflow-indicator-hidden")&&isScrolledToBottom==true){clArrow.classList.add("cl-overflow-indicator-hidden");return;}};function closeConsentLayer(){var gdprDomObjects=[gdprModal=document.getElementById("__tealiumGDPRecModal"),gdprStyle=document.getElementById("__tealiumGDPRecStyle"),gdprScript=document.getElementById("__tealiumGDPRecScript"),gdprPrefs=document.getElementById("__tealiumGDPRcpPrefs"),gdprPrefsScript=document.getElementById("__tealiumGDPRcpPrefsScript"),gdprPrefsStyle=document.getElementById("__tealiumGDPRcpStyle")];for(var i=0;i<gdprDomObjects.length;i++){if(gdprDomObjects[i]){gdprDomObjects[i].parentElement.removeChild(gdprDomObjects[i]);}}};function deferredUtagLink(linkData){setTimeout(function(){utag.link({"wt_link_id":linkData});},1000);};(function(){if(typeof window.CustomEvent==="function")return false;function CustomEvent(event,params){params=params||{bubbles:false,cancelable:false,detail:null};var evt=document.createEvent("CustomEvent");evt.initCustomEvent(event,params.bubbles,params.cancelable,params.detail);return evt;};window.CustomEvent=CustomEvent;})();function triggerConsentChange(){var consentEvent=new CustomEvent("consentChanged");window.dispatchEvent(consentEvent);};function initiateLayerClosing(marketingCookies){if(window.consentMngmntConfig.usesMaxymiser&&marketingCookies){document.getElementById("promptLayerContent").style.display="none";document.getElementById("mmLoadingPrompt").style.display="block";setTimeout(closeConsentLayer,3000);}else{closeConsentLayer();}};var btnAcceptAll=document.getElementById("consentAcceptAll");var btnRejectAll=document.getElementById("rejectAll");var btnEditSettings=document.getElementById("editSettingsBtn");var divIntro=document.getElementById("cl-intro");btnAcceptAll.addEventListener("click",acceptAllCookies);btnRejectAll.addEventListener("click",acceptRequiredCookies);btnEditSettings.addEventListener("click",goToPreferences);divIntro.addEventListener("scroll",toggleArrow);toggleArrow();btnRejectAll.addEventListener("keydown",function(e){if(e.code==="Space"){e.preventDefault();acceptRequiredCookies();}});deferredUtagLink("content.layer.consent-view");})();';
window.TEALIUM.preferences_prompt.css = '@charset "utf-8"; @font-face{font-family:Consent-TeleNeo;font-weight:400;src:url(https://ebs10.telekom.de/opt-in/font/teleneo/teleneo-regular.woff2) format("woff2"),url(teleneo-regular.woff2) format("woff2")}@font-face{font-family:Consent-TeleNeo;font-weight:700;src:url(https://ebs10.telekom.de/opt-in/font/teleneo/teleneo-bold.woff2) format("woff2"),url(teleneo-bold.woff2) format("woff2")}#__tealiumGDPRcpPrefs{position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;z-index:2147483645}.cl-outer{-webkit-box-align:center;-ms-flex-align:center;align-items:center;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;left:0;position:fixed;right:0;top:0;background-color:rgba(0,0,0,0.5)}.cl-main{background:#fff;border-radius:4px;-webkit-box-sizing:border-box;box-sizing:border-box;color:#262626;margin:12px;max-height:91vh;max-width:none;overflow-y:auto;overflow-x:hidden;z-index:1}#__tealiumGDPRcpPrefs .cl-main::-webkit-scrollbar-track{background:lightgray;background-color:lightgray}#__tealiumGDPRcpPrefs .cl-main::-webkit-scrollbar{width:4px;background:lightgray;background-color:lightgray}#__tealiumGDPRcpPrefs .cl-main::-webkit-scrollbar-thumb{background:#e20074;background-color:#e20074;border-radius:3px}.cl-content{padding:18px}.cl-header{font-size:20px;font-weight:700;line-height:24px;margin:0 0 16px 0;font-family:Consent-TeleNeo,sans-serif}#__tealiumGDPRcpPrefs .cl-intro{color:#262626;font-family:Consent-TeleNeo,sans-serif;font-size:18px;font-weight:400;line-height:24px;margin:0;max-width:none;text-align:left;overflow:inital}.cl-intro i{font-style:italic;font-size:inherit;font-weight:400;line-height:inherit;font-family:Consent-TeleNeo,sans-serif;display:inline}.cl-main .cl-link{color:#00739f;background:none;border:0;padding:0;padding-top:5px;cursor:pointer;text-decoration:none}.cl-main .cl-link:hover{text-decoration:underline;color:#00739f;background:none;border:none}.cl-main .cl-link:active{color:#00739f;background:none;border:none}.cl-main .cl-link:focus{color:#00739f;background:none;outline:-webkit-focus-ring-color auto 1px}.cl-footer{padding-top:18px;text-align:center}.cl-actions{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.cl-privacy_link{padding-top:18px;display:block;text-align:center;color:#00739f !important;font-family:Consent-TeleNeo,sans-serif;font-size:16px;font-weight:400;line-height:18px;margin:0;text-decoration:none}.cl-privacy_link:hover{text-decoration:underline}.cl-privacy_link:focus{outline:-webkit-focus-ring-color auto 1px}.cl-main .cl-btn{-webkit-box-align:center;-ms-flex-align:center;align-items:center;background:transparent;background-color:transparent;color:#262626;border:1px solid #b2b2b2;border-radius:4px;-webkit-box-shadow:none;box-shadow:none;text-shadow:none;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;height:42px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:7px 22px;vertical-align:middle;font-family:Consent-TeleNeo,sans-serif;font-size:16px;font-weight:700;line-height:20px;margin:0;margin-bottom:12px;-webkit-transition:background-color .2s ease,color .2s ease;transition:background-color .2s ease,color .2s ease;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:0;flex-shrink:0}.cl-main .cl-btn:hover,.cl-main .cl-btn:active,.cl-main .cl-btn:focus{background-color:rgba(0,0,0,0.15);background:rgba(0,0,0,0.15);font-family:Consent-TeleNeo,sans-serif;-webkit-font-smoothing:inherit;-webkit-box-shadow:none;box-shadow:none;font-weight:700;border-color:#b2b2b2}.cl-main .cl-btn:focus{outline:-webkit-focus-ring-color auto 1px}.cl-main .cl-btn--accept-all{background:#e20074;background-color:#e20074;color:#fff;border:none}.cl-main .cl-btn--accept-all:hover,.cl-main .cl-btn--accept-all:active,.cl-main .cl-btn--accept-all:focus{background:#bd0061;background-color:#bd0061;color:#fff;border:none}.cl-option{border-bottom:1px solid #262626;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;padding:16px 0}.cl-option__icon-container{-ms-flex-negative:0;flex-shrink:0}.cl-option__desc{-ms-flex-preferred-size:100%;flex-basis:100%;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;-ms-flex-negative:0;flex-shrink:0;margin-bottom:4px}.cl-option__toggle-container{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-preferred-size:100%;flex-basis:100%;-ms-flex-negative:0;flex-shrink:0}.cl-option__toggle-container--disabled{opacity:.5;pointer-events:none}.cl-option__icon{-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:#262626;display:-webkit-box;display:-ms-flexbox;display:flex;height:40px;width:40px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-bottom:22px;margin-right:22px;-webkit-transition:color .2s linear,-webkit-filter .2s linear;transition:color .2s linear,-webkit-filter .2s linear;transition:color .2s linear,filter .2s linear;transition:color .2s linear,filter .2s linear,-webkit-filter .2s linear}.cl-option__header{color:#262626;font-family:Consent-TeleNeo,sans-serif;font-size:18px;font-weight:700;line-height:24px;margin:0}.cl-option .cl-option__text{font-family:Consent-TeleNeo,sans-serif;font-size:14px;font-weight:400;line-height:18px;text-decoration:none;margin-bottom:0;margin-left:0;margin-right:0;max-width:none;text-align:left;margin-top:4px}.cl-option .cl-option__text--detail{display:none;margin:0;padding:0}.cl-option__toggle-label{cursor:pointer;display:inline-block;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.cl-option__toggle-label:focus{outline:-webkit-focus-ring-color auto 1px}.cl-option__toggle-switch{display:inline-block;background:#ededed;border:1px solid #6b6b6b;border-radius:16px;top:4px;width:42px;height:22px;margin-right:7px;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;vertical-align:middle;-webkit-transition:background .25s;transition:background .25s}.cl-option__toggle-switch:before,.cl-option__toggle-switch:after{content:""}.cl-option__toggle-switch:before{display:block;background:#fff;border-radius:50%;width:22px;height:22px;position:absolute;top:-1px;left:-1px;-webkit-transition:left .25s;transition:left .25s;border:1px solid #6b6b6b;-webkit-box-sizing:border-box;box-sizing:border-box}.cl-option__toggle-checkbox{position:absolute;visibility:hidden;display:none}.cl-option__toggle-checkbox:checked + .cl-option__toggle-switch{background:#46a800}.cl-option__toggle-checkbox:checked + .cl-option__toggle-switch:before{left:19px}.cl-option__toggle-checkbox:checked ~ .cl-option__toggle-text--prevent{display:none}.cl-option__toggle-checkbox:checked ~ .cl-option__toggle-text--allow{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex}.cl-option__toggle-text{margin-left:5px;position:relative;top:2px;font-family:Consent-TeleNeo,sans-serif;font-size:18px;font-weight:400;line-height:29px;margin:0;color:#262626;cursor:pointer;text-decoration:none;vertical-align:top;white-space:nowrap}.cl-option__toggle-text--prevent{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex}.cl-option__toggle-text--allow{display:none}@media (min-width:640px){.cl-main{margin:0;max-width:92.5%}.cl-content{padding:28px}.cl-header{font-size:22px;line-height:28px;margin-bottom:18px}.cl-option__desc{-ms-flex-preferred-size:333px;flex-basis:333px}.cl-option__toggle-container{margin-left:80px}.cl-option__icon{height:54px;width:54px}.cl-footer{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;text-align:left}.cl-actions{-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;-webkit-box-ordinal-group:3;-ms-flex-order:2;order:2}.cl-main .cl-btn{font-size:18px;line-height:22px;padding:10px 24px;margin-bottom:14px;height:44px}.cl-privacy_link{-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1;padding-top:0;font-size:18px;line-height:22px}}@media (min-width:1024px){.cl-main{max-width:79.1%}.cl-content{padding:54px}.cl-header{font-size:24px;line-height:36px;margin-bottom:24px}.cl-option{-ms-flex-wrap:nowrap;flex-wrap:nowrap;padding:27px 0}.cl-option__header{font-size:20px;line-height:26px}.cl-option .cl-option__text{font-size:18px;line-height:24px}.cl-option__desc{margin-bottom:0}.cl-option__toggle-container{-ms-flex-preferred-size:117px;flex-basis:117px;-webkit-box-flex:2;-ms-flex-positive:2;flex-grow:2;-ms-flex-negative:1;flex-shrink:1;margin-left:40px;margin-top:0;max-width:190px}.cl-option__icon{height:67px;margin-right:54px;width:67px}.cl-footer{padding-top:32px}.cl-actions{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.cl-main .cl-btn{-webkit-box-ordinal-group:3;-ms-flex-order:2;order:2;-ms-flex-preferred-size:auto;flex-basis:auto;-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-negative:0;flex-shrink:0;margin-bottom:0;margin-right:30px}.cl-main .cl-btn--accept-custom{margin-right:30px;-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.cl-main .cl-btn--accept-all{-webkit-box-ordinal-group:3;-ms-flex-order:2;order:2}}@media (min-width:1344px){.cl-main{max-width:1215px;width:80.66%}}#mmLoadingDialog{display:inline-block;position:absolute;width:80px;height:80px;margin:auto;z-index:9999}#mmLoadingDialog div{position:absolute;border:4px solid #fff;opacity:1;border-radius:50%;-webkit-animation:mmLoadingDialog 1s cubic-bezier(0,0.2,0.8,1) infinite;animation:mmLoadingDialog 1s cubic-bezier(0,0.2,0.8,1) infinite}#mmLoadingDialog div:nth-child(2){-webkit-animation-delay:-0.5s;animation-delay:-0.5s}@-webkit-keyframes mmLoadingDialog{0%{top:36px;left:36px;width:0;height:0;opacity:1}100%{top:0;left:0;width:72px;height:72px;opacity:0}}@keyframes mmLoadingDialog{0%{top:36px;left:36px;width:0;height:0;opacity:1}100%{top:0;left:0;width:72px;height:72px;opacity:0}}';
window.TEALIUM.preferences_prompt.html = '<!-- Version: 2.0 Date: 02.02.2021 --> <div class=cl-outer  aria-modal=true > <div id=mmLoadingDialog  style="display:none;"> <div></div> <div></div> </div> <div class=cl-main  id=prefLayerContent > <div class=cl-content > <h5 class=cl-header >{{title}}</h5> <p class=cl-intro >{{message}}</p> <span id=txtBtnExpand  data-value="{{expand_detail_button}}"></span> <span id=txtBtnCollapse  data-value="{{collapse_detail_button}}"></span> <div class=cl-option > <div class=cl-option__icon-container > <svg class=cl-option__icon  focusable=false  width=24  height=24  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="M14 1l.5 2.75c.15.75.95 1.05 1.55.65l2.3-1.6 2.85 2.85-1.6 2.3c-.4.6-.05 1.4.65 1.55L23 10v4l-2.75.5a.994.994 0 0 0-.65 1.55l1.6 2.3-2.85 2.85-2.3-1.6c-.6-.4-1.4-.05-1.55.65L14 23h-4l-.5-2.75c-.15-.7-.95-1.05-1.55-.65l-2.3 1.6-2.85-2.85 1.6-2.3c.4-.6.05-1.4-.65-1.55L1 14v-4l2.75-.5a.994.994 0 0 0 .65-1.55l-1.6-2.3L5.65 2.8l2.3 1.6c.6.4 1.4.05 1.55-.65L10 1h4zm-1.25 1.5h-1.5l-.3 1.5c-.2 1.2-1.25 2.05-2.45 2.05-.5 0-1-.15-1.4-.45l-1.3-.9-1.05 1.05.9 1.3c.5.7.6 1.6.25 2.4-.3.8-1 1.35-1.85 1.5l-1.55.3v1.5l1.55.25c.85.15 1.5.7 1.85 1.5.35.8.25 1.7-.25 2.4l-.9 1.3 1.05 1.05 1.3-.9c.4-.3.9-.45 1.4-.45 1.2 0 2.25.85 2.45 2.05l.3 1.55h1.5l.3-1.55c.2-1.2 1.25-2.05 2.45-2.05.5 0 1 .15 1.4.45l1.3.9 1.05-1.05-.9-1.3c-.5-.7-.55-1.6-.25-2.3.3-.8 1-1.35 1.85-1.5l1.55-.3v-1.5l-1.55-.3c-.85-.15-1.5-.7-1.85-1.5-.35-.8-.25-1.7.25-2.4l.9-1.3-1.05-1.05-1.3.9c-.4.3-.9.45-1.4.45-1.2 0-2.25-.85-2.45-2.05l-.3-1.55zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" fill="#262626" fill-rule=evenodd ></path> </svg> </div> <div class=cl-option__desc > <h6 class=cl-option__header >{{category_required_title}}</h6> <p class=cl-option__text >{{category_required_description}}</p> <button class="cl-option__text cl-link cl-readmore-btn" tabindex=1 >{{expand_detail_button}}</button> <p class="cl-option__text cl-option__text--detail">{{category_required_detail}}</p> </div> <div class="cl-option__toggle-container cl-option__toggle-container--disabled"> <label class=cl-option__toggle-label  for=boxRequiredCookies > <input class=cl-option__toggle-checkbox  type=checkbox  checked value=required_cookies  id=boxRequiredCookies > <div class=cl-option__toggle-switch ></div> <span class=cl-option__toggle-text >{{required}}</span> </label> </div> </div> <div class=cl-option > <div class=cl-option__icon-container > <svg class=cl-option__icon  focusable=false  width=24  height=24  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <path d="M20.5 1v17l-5 5h-10c-1.65 0-3-1.35-3-3V1h18zM19 2.5H4V20c0 .85.65 1.5 1.5 1.5h9v-3c0-.85.65-1.5 1.5-1.5h3V2.5zm-2.85 4.75c.25-.3.75-.3 1.05-.05.3.25.3.75.05 1.05L12.8 13.3l-3-2.5-2.95 3.45c-.15.15-.35.25-.55.25-.15 0-.35-.05-.45-.2-.35-.25-.35-.75-.1-1.05L9.7 8.7l3 2.5z" id=path-cf234ef4-fc12-11ea-8540-cbdab8b6ea40  fill="#262626" fill-rule=evenodd ></path> </svg> </div> <div class=cl-option__desc > <h6 class=cl-option__header  id=analyticsTitle >{{category_analytics_title}}</h6> <p class=cl-option__text >{{category_analytics_description}}</p> <button class="cl-option__text cl-link cl-readmore-btn" tabindex=1 >{{expand_detail_button}}</button> <p class="cl-option__text cl-option__text--detail">{{category_analytics_detail}}</p> </div> <div class=cl-option__toggle-container > <label class=cl-option__toggle-label  tabindex=1  for=boxAnalyticalCookies  role=checkbox  aria-checked=false  aria-labelledby=analyticsTitle > <input class=cl-option__toggle-checkbox  type=checkbox  value=analytics  data-consent-num=1  id=boxAnalyticalCookies > <div class=cl-option__toggle-switch ></div> <span class="cl-option__toggle-text cl-option__toggle-text--prevent">{{no}}</span> <span class="cl-option__toggle-text cl-option__toggle-text--allow">{{yes}}</span> </label> </div> </div> <div class=cl-option > <div class=cl-option__icon-container > <svg class=cl-option__icon  focusable=false  width=24  height=24  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path fill="#262626" d="M12 1c.4 0 .75.35.75.75v1.8c4.1.35 7.35 3.6 7.7 7.7h1.8c.4 0 .75.35.75.75s-.35.75-.75.75h-1.8c-.35 4.1-3.6 7.35-7.7 7.7v1.8c0 .4-.35.75-.75.75s-.75-.35-.75-.75v-1.8c-4.1-.35-7.35-3.6-7.7-7.7h-1.8c-.4 0-.75-.35-.75-.75s.35-.75.75-.75h1.8c.35-4.1 3.6-7.35 7.7-7.7v-1.8c0-.4.35-.75.75-.75zm0 4c-3.85 0-7 3.15-7 7s3.15 7 7 7 7-3.15 7-7-3.15-7-7-7zm0 5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" fill-rule=evenodd ></path> </svg> </div> <div class=cl-option__desc > <h6 class=cl-option__header  id=displayAdsTitle >{{category_display_ads_title}}</h6> <p class=cl-option__text >{{category_display_ads_description}}</p> <button class="cl-option__text cl-link cl-readmore-btn" tabindex=1 >{{expand_detail_button}}</button> <p class="cl-option__text cl-option__text--detail">{{category_display_ads_detail}}</p> </div> <div class=cl-option__toggle-container > <label class=cl-option__toggle-label  tabindex=1  for=boxMarketingCookies  role=checkbox  aria-checked=false  aria-labelledby=displayAdsTitle > <input class=cl-option__toggle-checkbox  type=checkbox  value=display_ads  data-consent-num=3  id=boxMarketingCookies > <div class=cl-option__toggle-switch ></div> <span class="cl-option__toggle-text cl-option__toggle-text--prevent">{{no}}</span> <span class="cl-option__toggle-text cl-option__toggle-text--allow">{{yes}}</span> </label> </div> </div> <div class=cl-option > <div class=cl-option__icon-container > <svg class=cl-option__icon  focusable=false  width=24  height=24  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="M10.5 13.5V22H4c-1.1 0-2-.9-2-2v-6.5h8.5zm7.25 0c.4 0 .75.35.75.75V17h2.75c.4 0 .75.35.75.75s-.35.75-.75.75H18.5v2.75c0 .4-.35.75-.75.75s-.75-.35-.75-.75V18.5h-2.75c-.4 0-.75-.35-.75-.75s.35-.75.75-.75H17v-2.75c0-.4.35-.75.75-.75zM9 15H3.5v5c0 .3.2.5.5.5h5V15zm1.5-13v8.5H2V4c0-1.1.9-2 2-2h6.5zM20 2c1.1 0 2 .9 2 2v6.5h-8.5V2zM9 3.5H4c-.3 0-.5.2-.5.5v5H9V3.5zm11 0h-5V9h5.5V4c0-.3-.2-.5-.5-.5z" fill="#262626" fill-rule=evenodd ></path> </svg> </div> <div class=cl-option__desc > <h6 class=cl-option__header  id=socialAdsTitle >{{category_social_title}}</h6> <p class=cl-option__text >{{category_social_description}}</p> <button class="cl-option__text cl-link cl-readmore-btn" tabindex=1 >{{expand_detail_button}}</button> <p class="cl-option__text cl-option__text--detail">{{category_social_detail}}</p> </div> <div class=cl-option__toggle-container > <label class=cl-option__toggle-label  for=boxThirdPartyCookies  tabindex=1  role=checkbox  aria-checked=false  aria-labelledby=socialAdsTitle > <input class=cl-option__toggle-checkbox  type=checkbox  value=social  data-consent-num=7  id=boxThirdPartyCookies > <div class=cl-option__toggle-switch ></div> <span class="cl-option__toggle-text cl-option__toggle-text--prevent">{{no}}</span> <span class="cl-option__toggle-text cl-option__toggle-text--allow">{{yes}}</span> </label> </div> </div> <div class=cl-footer > <div class=cl-actions > <button class="cl-btn cl-btn--accept-all" id=consentSettingsAcceptAll  tabindex=1 >{{confirmation_button}}</button> <button class="cl-btn cl-btn--accept-custom" id=consentAcceptChoice  tabindex=1 >{{accept_choice_button}}</button> </div> <a href="{{privacy_link}}" class="cl-privacy_link cl-data-privacy-url" tabindex=1 >{{privacy}}</a> </div> </div> </div> </div>';
window.TEALIUM.preferences_prompt.js = '(function(){function getCookie(cname){var name=cname+"=";var decodedCookie=decodeURIComponent(document.cookie);var cookieArray=decodedCookie.split(";");for(var i=0;i<cookieArray.length;i++){var currentCookie=cookieArray[i];while(currentCookie.charAt(0)==" "){currentCookie=currentCookie.substring(1);};if(currentCookie.indexOf(name)==0){return currentCookie.substring(name.length,currentCookie.length);}};return"";};function updateConsentToggles(){var analyticsToggle=document.getElementById("boxAnalyticalCookies");var marketingToggle=document.getElementById("boxMarketingCookies");var thirdPartyToggle=document.getElementById("boxThirdPartyCookies");var consent=getCookie("CONSENTMGR");if(consent.indexOf("c1:1")>-1)analyticsToggle.checked=true;if(consent.indexOf("c3:1")>-1)marketingToggle.checked=true;if(consent.indexOf("c7:1")>-1)thirdPartyToggle.checked=true;if(consent.indexOf("consent:false")>-1){analyticsToggle.checked=false;marketingToggle.checked=false;thirdPartyToggle.checked=false;};if(consent.indexOf("consent:true")>-1&&!(consent.indexOf("c1:")>-1)){analyticsToggle.checked=true;marketingToggle.checked=true;thirdPartyToggle.checked=true;}};function acceptAllCookies(){var finalConsent={1:1,3:1,7:1};utag.gdpr.setPreferencesValues(finalConsent);deferredUtagLink("content.layer.consent-agree");triggerConsentChange();initiateLayerClosing(true);};function saveConsentPreferences(){var finalConsent={};var consentBoxes=document.querySelectorAll(".cl-option__toggle-checkbox:not(#boxRequiredCookies)");for(var i=0;i<consentBoxes.length;i++){finalConsent[consentBoxes[i].getAttribute("data-consent-num")]=Number(consentBoxes[i].checked);};utag.gdpr.setPreferencesValues(finalConsent);trackPreferences(finalConsent);triggerConsentChange();initiateLayerClosing(finalConsent[3]);};function trackPreferences(consent){var catNames={1:"analytics",3:"marketing",7:"drittanbieter"};for(var key in consent){deferredUtagLink("content.layer.consent-"+catNames[key]+"."+(consent[key]?"yes":"no"));}};function closeConsentLayer(){var gdprDomObjects=[gdprModal=document.getElementById("__tealiumGDPRecModal"),gdprStyle=document.getElementById("__tealiumGDPRecStyle"),gdprScript=document.getElementById("__tealiumGDPRecScript"),gdprPrefs=document.getElementById("__tealiumGDPRcpPrefs"),gdprPrefsScript=document.getElementById("__tealiumGDPRcpPrefsScript"),gdprPrefsStyle=document.getElementById("__tealiumGDPRcpStyle")];for(var i=0;i<gdprDomObjects.length;i++){if(gdprDomObjects[i]){gdprDomObjects[i].parentElement.removeChild(gdprDomObjects[i]);}}};function deferredUtagLink(linkData){setTimeout(function(){utag.link({"wt_link_id":linkData});},1000);};(function(){if(typeof window.CustomEvent==="function")return false;function CustomEvent(event,params){params=params||{bubbles:false,cancelable:false,detail:null};var evt=document.createEvent("CustomEvent");evt.initCustomEvent(event,params.bubbles,params.cancelable,params.detail);return evt;};window.CustomEvent=CustomEvent;})();function triggerConsentChange(){var consentEvent=new CustomEvent("consentChanged");window.dispatchEvent(consentEvent);};var btnAcceptSome=document.getElementById("consentAcceptChoice");var btnAcceptAll=document.getElementById("consentSettingsAcceptAll");btnAcceptSome.addEventListener("click",saveConsentPreferences);btnAcceptAll.addEventListener("click",acceptAllCookies);updateConsentToggles();var btnsLearnMore=document.querySelectorAll("button.cl-readmore-btn");var collapseTxt=document.getElementById("txtBtnCollapse").getAttribute("data-value");var expandTxt=document.getElementById("txtBtnExpand").getAttribute("data-value");for(var j=0;j<btnsLearnMore.length;j++){btnsLearnMore[j].addEventListener("click",function(){var detailTxt=this.nextElementSibling;if(detailTxt.style.display==="block"){detailTxt.style.display="none";this.innerHTML=expandTxt;}else{detailTxt.style.display="block";this.innerHTML=collapseTxt;}})};var toggleLabels=document.querySelectorAll(".cl-option__toggle-label");for(var k=0;k<toggleLabels.length;k++){toggleLabels[k].addEventListener("keydown",function(e){if(e.code==="Space"){e.preventDefault();var currentBox=document.getElementById(this.getAttribute("for"));currentBox.checked?currentBox.checked=false:currentBox.checked=true;e.target.ariaChecked=="true"?e.target.ariaChecked=false:e.target.ariaChecked=true;}})};var toggleLabelInputs=document.querySelectorAll(".cl-option__toggle-label input");for(var k=0;k<toggleLabelInputs.length;k++){toggleLabelInputs[k].addEventListener("change",function(e){var target=e.target;target.parentElement.ariaChecked=target.checked;})};function initiateLayerClosing(marketingCookies){if(window.consentMngmntConfig.usesMaxymiser&&marketingCookies){document.getElementById("prefLayerContent").style.display="none";document.getElementById("mmLoadingDialog").style.display="block";setTimeout(closeConsentLayer,3000);}else{closeConsentLayer();}}})();';

} catch(e){ console.log(e) } }catch(e){console.log(e);}}

if(!utag_condload){try{ try{
/**
 * Title: Consent Sync
 * Run: Preloader (runs before ConsentHide Extension)
 * Version: 2.2 (IE11 Support)
 * Date: 10.03.2021
 */

(function() {

// Only execute the extension if ConsentManagementConfig is present
if (window.consentMngmntConfig.consentSync) {

    // copy local consent to remote
    function sendConsentToServer() {
        var setRequest = new XMLHttpRequest();
        setRequest.open('GET', 'https://ebs10.telekom.de/opt-in/set.php?consent=' + utag.data['cp.CONSENTMGR']);
        setRequest.withCredentials = true;
        setRequest.send();
    }

    // event 'consentChanged' is fired in the Consent Management Scripts
    window.addEventListener('consentChanged', sendConsentToServer);

    // if the server returns an error show the consent layer
    function consentSyncFallback() {
        logCSMsg("Consent Sync Error: Network Error");
        logCSMsg("Consent Sync Fallback: Showing Consent Prompt");
        triggerExplicitConsent();
        triggerPageEvents();
    }


    function initiateGetRequest() {
        var getRequest = new XMLHttpRequest();
        getRequest.addEventListener("load", responseHandler);
        getRequest.addEventListener("error", consentSyncFallback)
        getRequest.open('GET', 'https://ebs10.telekom.de/opt-in/cookie.php');
        getRequest.withCredentials = true;
        getRequest.send();
    }

    // substitutes utag.gdpr.getCookieValues() function as utag.gdpr may not yet be present
    function getCookie(e) {
        for (var n = e + "=", t = decodeURIComponent(document.cookie).split(";"), o = 0; o < t.length; o++) {
            for (var r = t[o];
                " " == r.charAt(0);) r = r.substring(1);
            if (0 == r.indexOf(n)) return r.substring(n.length, r.length)
        }
        return false;
    }
    
    // For debugging. To use, enter window.consentsync_debug=true in console
    function logCSMsg(msg) {
        if(window.consentsync_debug)
            console.log('[CONSENT SYNC] ' + msg);
    }

    // Display Consent Layer
    function triggerExplicitConsent() {
        // only if no local consent is present and not on hiddenPages
        if(
            !getCookie('CONSENTMGR') && 
            !window.consentMngmntConfig.hideCondition &&
            !(window.consentMngmntConfig.hiddenPages.indexOf(utag_data['page_content_id']) > -1) && 
            !(window.consentMngmntConfig.hiddenPages.indexOf(window.location.href) > -1)
        ) { 
            if (typeof utag.gdpr != "undefined") {
                utag.gdpr.showExplicitConsent();
            } else {
                document.removeEventListener("readystatechange", this);
                document.addEventListener("readystatechange", this);
            }
        }
    }
    
    // push page events into queue in case utag is not defined yet
    function triggerPageEvents(){
        if ((window.utag && window.utag.udoname) || (window.utag && window.utag_data)) {
            window.consentSyncEventStack = window.consentSyncEventStack || [];
            while(e = window.consentSyncEventStack.shift()){
                if(e.event == 'link')
                    utag.tealiumLink(e.data, e.cb, e.uids);
                if(e.event == 'view')
                    utag.tealiumView(e.data, e.cb, e.uids);
            }
            document.removeEventListener("readystatechange", this);
            window.consentSyncReady = true;
        } else {
            document.removeEventListener("readystatechange", this);
            document.addEventListener("readystatechange", this);
        }
    }
    
    try {
        window.consentsync_debug = window.consentsync_debug || getCookie('consentsync_debug');
        window.utag_data = window.utag_data || {};
    
        window.utag_cfg_ovrd = window.utag_cfg_ovrd || {};
        window.utag_cfg_ovrd.noview = true;

        var responseHandler = function responseHandler() {
            if (this.status === 200) {
    
                var timestampRegEx = new RegExp(/ts:([0-9]+)\|?/);
    
                // get local cookie
                var localTimestamp = 0;
                var localConsentCookie = getCookie('CONSENTMGR');
                if (timestampRegEx.test(localConsentCookie)){
                    localTimestamp = localConsentCookie.replace(/.*\|?ts:([0-9]+)\|?.*/, "$1");
                    logCSMsg('Local Cookie: ' + localConsentCookie);
                }
    
                // get remote cookie
                var remoteTimestamp = 0;
                var remoteConsentCookie = false;
                if (this.responseText !== '' && timestampRegEx.test(this.responseText)) {
                    remoteConsentCookie = this.responseText;
                    remoteTimestamp = remoteConsentCookie.replace(/.*\|?ts:([0-9]+)\|?.*/, "$1");
                    logCSMsg('Remote Cookie: ' + remoteConsentCookie);
                }
                
                // CASE: Neither local nor remote consent exists
                if (!localConsentCookie && !remoteConsentCookie) {
                    logCSMsg('No Consent Information found, triggering Consent Display');
                    triggerExplicitConsent();
                    triggerPageEvents();
                    return;
                }
                
                // CASE: Remote cookie is newer or local does not exist
                if (remoteTimestamp > localTimestamp) {
                    logCSMsg('Writing Remote Cookie to Local Storage');
                    var i, optOut, values = {}, optOutData = decodeURI(this.responseText).split("|");
                    for (i = 0; i < optOutData.length; i++) {
                        optOut = optOutData[i].split(":");
                        values[optOut[0]] = optOut[1];
                    }
                    utag.gdpr.setCookie(values);
                    triggerPageEvents();
                    return;
                }
                
                // CASE: Local and remote consent are identical => extend cookies expiry date
                // CASE: Only local consent is present => send to remote
                // CASE: Local consent is newer => replace remote
                logCSMsg('Sending Local Cookie to Sync Server');
                sendConsentToServer();
                triggerPageEvents();
            }
        };
    
        initiateGetRequest();

    } catch (e) {
        logCSMsg("Consent Sync Error: " + e);
        logCSMsg("Consent Sync Fallback: Showing Consent Prompt");
        triggerExplicitConsent();
        triggerPageEvents();
    }
}

})();
} catch(e){ console.log(e) } }catch(e){console.log(e);}}

if(!utag_condload){try{ try{
if(window.location.protocol === "file:") {
    window.utag_cfg_ovrd = window.utag_cfg_ovrd || {}
    window.utag_cfg_ovrd.noload = true;
}
} catch(e){ console.log(e) } }catch(e){console.log(e);}}

if (typeof utag == "undefined" && !utag_condload) {
  var utag = {
    id:"telekom.mshop",
    o:{},
    sender: {},
    send: {},
    rpt: {
      ts: {
        a: new Date()
      }
    },
    dbi: [],
    db_log : [],
    loader: {
      q: [],
      lc: 0,
      f: {},
      p: 0,
      ol: 0,
      wq: [],
      lq: [],
      bq: {},
      bk: {},
      rf: 0,
      ri: 0,
      rp: 0,
      rq: [],
      ready_q : [], 
      sendq :{"pending":0},
      run_ready_q : function(){
        for(var i=0;i<utag.loader.ready_q.length;i++){
          utag.DB("READY_Q:"+i);
          try{utag.loader.ready_q[i]()}catch(e){utag.DB(e)};
        }
      },
      lh: function(a, b, c) {
        a = "" + location.hostname;
        b = a.split(".");
        c = (/\.co\.|\.com\.|\.org\.|\.edu\.|\.net\.|\.asn\.|\...\.jp$/.test(a)) ? 3 : 2;
        return b.splice(b.length - c, c).join(".");
      },
      WQ: function(a, b, c, d, g) {
        utag.DB('WQ:' + utag.loader.wq.length);
        try {
          // this picks up a utag_data items added after utag.js was loaded
          // Gotcha: Data layer set after utag.js will not overwrite something already set via an extension.  Only "new" values are copied from utag_data
          // for case where utag_data is set after utag.js is loaded
          if(utag.udoname && utag.udoname.indexOf(".")<0){
            utag.ut.merge(utag.data,window[utag.udoname],0);
          }

          // TBD: utag.handler.RE('view',utag.data,"bwq");
          // process load rules again if this flag is set
          if(utag.cfg.load_rules_at_wait){
            utag.handler.LR(utag.data);
          }
        } catch (e) {utag.DB(e)};
	
	d=0;
        g=[]; 
        for (a = 0; a < utag.loader.wq.length; a++) {
          b = utag.loader.wq[a];
	  b.load = utag.loader.cfg[b.id].load;
          if (b.load == 4){
            //LOAD the bundled tag set to wait here
            this.f[b.id]=0;
            utag.loader.LOAD(b.id)
          }else if (b.load > 0) {
            g.push(b);
            //utag.loader.AS(b); // moved: defer loading until flags cleared
	    d++;
          }else{
            // clear flag for those set to wait that were not actually loaded
            this.f[b.id]=1;
          }
        }
        for (a = 0; a < g.length; a++) {
          utag.loader.AS(g[a]);
        }

	if(d==0){
	  utag.loader.END();
	}
      },
      AS: function(a, b, c, d) {
        utag.send[a.id] = a;
        if (typeof a.src == 'undefined') {
          a.src = utag.cfg.path + ((typeof a.name != 'undefined') ? a.name : 'ut' + 'ag.' + a.id + '.js')
        }
        a.src += (a.src.indexOf('?') > 0 ? '&' : '?') + 'utv=' + (a.v?utag.cfg.template+a.v:utag.cfg.v);
        utag.rpt['l_' + a.id] = a.src;
        b = document;
        this.f[a.id]=0;
        if (a.load == 2) {
          utag.DB("Attach sync: "+a.src);
          a.uid=a.id;
          b.write('<script id="utag_' + a.id + '" src="' + a.src + '"></scr' + 'ipt>')
          if(typeof a.cb!='undefined')a.cb();
        } else if(a.load==1 || a.load==3) {
          if (b.createElement) {
            c = 'utag_telekom.mshop_'+a.id;
            if (!b.getElementById(c)) {
	      d = {
	        src:a.src,
		id:c,
                uid:a.id,
		loc:a.loc
              }
              if(a.load == 3){d.type="iframe"};
	      if(typeof a.cb!='undefined')d.cb=a.cb;
              utag.ut.loader(d);
            }
          }
        }
      },
      GV: function(a, b, c) {
        b = {};
        for (c in a) {
          if (a.hasOwnProperty(c) && typeof a[c] != "function") b[c] = a[c];
        }
        return b
      },
      OU: function(a, b, c, d, f){
        try {
          if (typeof utag.data['cp.OPTOUTMULTI'] != 'undefined') {
            c = utag.loader.cfg;
            a = utag.ut.decode(utag.data['cp.OPTOUTMULTI']).split('|');
            for (d = 0; d < a.length; d++) {
              b = a[d].split(':');
              if (b[1] * 1 !== 0) {
                if (b[0].indexOf('c') == 0) {
                  for (f in utag.loader.GV(c)) {
                    if (c[f].tcat == b[0].substring(1)) c[f].load = 0
                  }
                } else if (b[0] * 1 == 0) {
                  utag.cfg.nocookie = true
                } else {
                  for (f in utag.loader.GV(c)) {
                    if (c[f].tid == b[0]) c[f].load = 0
                  }
                }
              }
            }
          }
        } catch (e) {utag.DB(e)}
      },
      RDdom: function(o){
        var d = document || {}, l = location || {};
        o["dom.referrer"] = d.referrer;
        o["dom.title"] = "" + d.title;
        o["dom.domain"] = "" + l.hostname;
        o["dom.query_string"] = ("" + l.search).substring(1);
        o["dom.hash"] = ("" + l.hash).substring(1);
        o["dom.url"] = "" + d.URL;
        o["dom.pathname"] = "" + l.pathname;
        o["dom.viewport_height"] = window.innerHeight || (d.documentElement?d.documentElement.clientHeight:960);
        o["dom.viewport_width"] = window.innerWidth || (d.documentElement?d.documentElement.clientWidth:960);
      },
      RDcp: function(o, b, c, d){
        b = utag.loader.RC();
        for (d in b) {
          if (d.match(/utag_(.*)/)) {
            for (c in utag.loader.GV(b[d])) {
              o["cp.utag_" + RegExp.$1 + "_" + c] = b[d][c];
            }
          }
        }
        for (c in utag.loader.GV((utag.cl && !utag.cl['_all_']) ? utag.cl : b)) {
          if (c.indexOf("utag_") < 0 && typeof b[c] != "undefined") o["cp." + c] = b[c];
        }
        //o["_t_visitor_id"]=o["cp.utag_main_v_id"];
        //o["_t_session_id"]=o["cp.utag_main_ses_id"];
      },
      RDqp: function(o, a, b, c){
        a = location.search + (location.hash+'').replace("#","&");
        if(utag.cfg.lowerqp){a=a.toLowerCase()};
        if (a.length > 1) {
          b = a.substring(1).split('&');
          for (a = 0; a < b.length; a++) {
            c = b[a].split("=");
            if(c.length>1){
              o["qp." + c[0]] = utag.ut.decode(c[1])
            }
          }
        }
      },
      RDmeta: function(o, a, b, h){
        a = document.getElementsByTagName("meta");
        for (b = 0; b < a.length; b++) {
          try{
            h = a[b].name || a[b].getAttribute("property") || ""; 
          }catch(e){h="";utag.DB(e)};
          if (utag.cfg.lowermeta){h=h.toLowerCase()};
          if (h != ""){o["meta." + h] = a[b].content}
        }
      },
      RDva: function(o){
        // Read visitor attributes in local storage
        var readAttr = function(o, l ){
          var a = "", b;
          a = localStorage.getItem(l);
          if(!a || a=="{}")return;
          b = utag.ut.flatten({va : JSON.parse(a)});
          utag.ut.merge(o,b,1);
        }
        try{
          readAttr(o, "tealium_va" );
          readAttr(o, "tealium_va_" + o["ut.account"] + "_" + o["ut.profile"] );
        }catch(e){ utag.DB(e) }
      },
      RDut: function(o, a){
        // Add built-in data types to the data layer for use in mappings, extensions and RDva function.
        var t = {};
        var d = new Date();
        var m = ( utag.ut.typeOf(d.toISOString) == "function" );
        o["ut.domain"] = utag.cfg.domain;
        o["ut.version"] = utag.cfg.v;
        // i.e. "view" or "link"
        t["tealium_event"] = o["ut.event"] = a || "view";
        t["tealium_visitor_id"] = o["ut.visitor_id"]=o["cp.utag_main_v_id"];
        t["tealium_session_id"] = o["ut.session_id"]=o["cp.utag_main_ses_id"];
        try{
          t["tealium_datasource"] = utag.cfg.datasource;
          t["tealium_account"] = o["ut.account"] = utag.cfg.utid.split("/")[0];
          t["tealium_profile"] = o["ut.profile"] = utag.cfg.utid.split("/")[1];
          t["tealium_environment"] = o["ut.env"] = utag.cfg.path.split("/")[6];
        }catch(e){ utag.DB(e) }

        t["tealium_random"] = Math.random().toFixed(16).substring(2);
        t["tealium_library_name"] = "ut"+"ag.js";
        t["tealium_library_version"] = ( utag.cfg.template + "0" ).substring(2);
        t["tealium_timestamp_epoch"] = Math.floor( d.getTime() / 1000 );
        t["tealium_timestamp_utc"] = ( m ? d.toISOString() : "");
        // Adjust date to local time
        d.setHours( d.getHours() - ( d.getTimezoneOffset() / 60 ) );
        t["tealium_timestamp_local"] = ( m ? d.toISOString().replace( "Z","" ) : "" );

        // Any existing data elements with "tealium_" will not be overwritten
        utag.ut.merge( o, t, 0 );
      },
      RDses: function( o, a, c ) {
        a = (new Date()).getTime();
        c = ( a + parseInt( utag.cfg.session_timeout ) ) + "";

        // cp.utag_main_ses_id will not be in the data layer when it has expired or this is first page view of all time
	if ( !o["cp.utag_main_ses_id"] ) {
          o["cp.utag_main_ses_id"] = a + "";
          o["cp.utag_main__ss"] = "1";
          o["cp.utag_main__sn"] = ( 1 + parseInt( o["cp.utag_main__sn"] || 0 ) ) + "";
        } else {
          o["cp.utag_main__ss"] = "0";
        }
        
        o["cp.utag_main__pn"] = o["cp.utag_main__pn"] || "1";
        o["cp.utag_main__st"] = c;

        utag.loader.SC( "utag_main", { "_sn": ( o["cp.utag_main__sn"] || 1 ), "_ss": o["cp.utag_main__ss"], "_st": c, "ses_id": ( o["cp.utag_main_ses_id"] || a ) + ";exp-session", "_pn": o["cp.utag_main__pn"] + ";exp-session" } );
      },
      RDpv: function( o ) {
        if ( typeof utag.pagevars == "function" ) {
          utag.DB("Read page variables");
          utag.pagevars(o);
        }
      },
      RD: function( o, a ) {
        utag.DB("utag.loader.RD");
        utag.DB(o);

        utag.loader.RDcp(o);

        if ( !utag.loader.rd_flag ) {
          utag.loader.rd_flag = 1;
          o["cp.utag_main_v_id"] = o["cp.utag_main_v_id"] || utag.ut.vi((new Date()).getTime());
          o["cp.utag_main__pn"] = ( 1 + parseInt( o["cp.utag_main__pn"] || 0 ) ) + "";
          // the _st value is not-yet-set for first page view so we'll need wait to write in _pn value (which is exp-session)
          // The SC function expires (removes) cookie values that expired with the session
          utag.loader.SC( "utag_main", { "v_id": o["cp.utag_main_v_id"] } );
          utag.loader.RDses(o);
        }

        // first utag.track call for noview should not clear session start (_ss) value
        if(a && !utag.cfg.noview)utag.loader.RDses(o);
        utag.loader.RDqp(o);
        utag.loader.RDmeta(o);
        utag.loader.RDdom(o);
        utag.loader.RDut(o, a || "view");
        utag.loader.RDpv(o);
        utag.loader.RDva(o);
      },
      RC: function(a, x, b, c, d, e, f, g, h, i, j, k, l, m, n, o, v, ck, cv, r, s, t) {
        o = {};
        b = ("" + document.cookie != "") ? (document.cookie).split("; ") : [];
        r = /^(.*?)=(.*)$/;
        s = /^(.*);exp-(.*)$/;
        t = (new Date()).getTime();
        for (c = 0; c < b.length; c++) {
          if (b[c].match(r)) {
            ck = RegExp.$1;
            cv = RegExp.$2;
          }
          e = utag.ut.decode(cv);
          if (typeof ck!="undefined"){
            if (ck.indexOf("ulog") == 0 || ck.indexOf("utag_") == 0) {
              e = cv.split("$");
              g = [];
              j = {};
              for (f = 0; f < e.length; f++) {
                try{
                  g = e[f].split(":");
                  if (g.length > 2) {
                    g[1] = g.slice(1).join(":");
                  }
                  v = "";
                  if (("" + g[1]).indexOf("~") == 0) {
                    h = g[1].substring(1).split("|");
                    for (i = 0; i < h.length; i++) h[i] = utag.ut.decode(h[i]);
                    v = h
                  } else v = utag.ut.decode(g[1]);
                  j[g[0]] = v;
                }catch(er){utag.DB(er)};
              }
              o[ck] = {};
              for (f in utag.loader.GV(j)) {
                if (j[f] instanceof Array) {
                  n = [];
                  for (m = 0; m < j[f].length; m++) {
                    if (j[f][m].match(s)){
                      k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                      if (k > t) n[m] = (x == 0) ? j[f][m] : RegExp.$1;
                    }
                  }
                  j[f] = n.join("|");
                } else {
                  j[f] = "" + j[f];
                  if (j[f].match(s)) {
                    k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                    j[f] = (k < t) ? null : (x == 0 ? j[f] : RegExp.$1);
                  }
                }
                if (j[f]) o[ck][f] = j[f];
              }
            } else if (utag.cl[ck] || utag.cl['_all_']) {
              o[ck] = e
            }
          }
        }
        return (a) ? (o[a] ? o[a] : {}) : o;
      },
      SC: function(a, b, c, d, e, f, g, h, i, j, k, x, v) {
        if (!a) return 0;
        if (a=="utag_main" && utag.cfg.nocookie) return 0;
        v = "";
        var date = new Date();
        var exp = new Date();
        exp.setTime(date.getTime()+(365*24*60*60*1000));
        x = exp.toGMTString();
        if (c && c == "da") {
          x = "Thu, 31 Dec 2009 00:00:00 GMT";
        } else if (a.indexOf("utag_") != 0 && a.indexOf("ulog") != 0) {
          if (typeof b != "object") {
            v = b
          }
        } else {
          d = utag.loader.RC(a, 0);
          for (e in utag.loader.GV(b)) {
            f = "" + b[e];
            if (f.match(/^(.*);exp-(\d+)(\w)$/)) {
              g = date.getTime() + parseInt(RegExp.$2) * ((RegExp.$3 == "h") ? 3600000 : 86400000);
              if (RegExp.$3 == "u") g = parseInt(RegExp.$2);
              f = RegExp.$1 + ";exp-" + g;
            }
            if (c == "i") {
              if (d[e] == null) d[e] = f;
            } else if (c == "d") delete d[e];
            else if (c == "a") d[e] = (d[e] != null) ? (f - 0) + (d[e] - 0) : f;
            else if (c == "ap" || c == "au") {
              if (d[e] == null) d[e] = f;
              else {
                if (d[e].indexOf("|") > 0) {
                  d[e] = d[e].split("|")
                }
                g = (d[e] instanceof Array) ? d[e] : [d[e]];
                g.push(f);
                if (c == "au") {
                  h = {};
                  k = {};
                  for (i = 0; i < g.length; i++) {
                    if (g[i].match(/^(.*);exp-(.*)$/)) {
                      j = RegExp.$1;
                    }
                    if (typeof k[j] == "undefined") {
                      k[j] = 1;
                      h[g[i]] = 1;
                    }
                  }
                  g = [];
                  for (i in utag.loader.GV(h)) {
                    g.push(i);
                  }
                }
                d[e] = g
              }
            } else d[e] = f;
          }
          h = new Array();
          for (g in utag.loader.GV(d)) {
            if (d[g] instanceof Array) {
              for (c = 0; c < d[g].length; c++) {
                d[g][c] = encodeURIComponent(d[g][c])
              }
              h.push(g + ":~" + d[g].join("|"))
            } else h.push((g + ":").replace(/[\,\$\;\?]/g,"") + encodeURIComponent(d[g]))
          }
          if (h.length == 0) {
            h.push("");
            x = ""
          }
          v = (h.join("$"));
        }
        document.cookie = a + "=" + v + ";path=/;domain=" + utag.cfg.domain + ";expires=" + x;
        return 1
      },
      LOAD: function(a, b, c, d) {
        //utag.DB('utag.loader.LOAD:' + a);
        if(!utag.loader.cfg){
           return
        }
	if(this.ol==0){
          if(utag.loader.cfg[a].block && utag.loader.cfg[a].cbf){
            this.f[a] = 1;
	    delete utag.loader.bq[a];
          }
	  for(b in utag.loader.GV(utag.loader.bq)){
            if(utag.loader.cfg[a].load==4 && utag.loader.cfg[a].wait==0){
              utag.loader.bk[a]=1;
              utag.DB("blocked: "+ a);
            }
	    utag.DB("blocking: " + b);
	    return;
	  }
	  utag.loader.INIT();
	  return;
	}
        utag.DB('utag.loader.LOAD:' + a);

        if (this.f[a] == 0) {
          this.f[a] = 1;
      	
	  if(utag.cfg.noview!=true){
	    if(utag.loader.cfg[a].send){
              utag.DB("SENDING: "+a);
              try{
                if (utag.loader.sendq.pending > 0 && utag.loader.sendq[a]) {
                  utag.DB("utag.loader.LOAD:sendq: "+a);
                  while( d = utag.loader.sendq[a].shift() ) {
                    utag.DB(d);
                    utag.sender[a].send(d.event, utag.handler.C(d.data));
                    utag.loader.sendq.pending--;
                  }
                } else {
                  utag.sender[a].send('view',utag.handler.C(utag.data));
                }
		utag.rpt['s_' + a] = 0;
	      } catch (e) {
                utag.DB(e);
	        utag.rpt['s_' + a] = 1;
	      }
	    }
	  }
	  if(utag.loader.rf==0)return;
          for (b in utag.loader.GV(this.f)) {
            if (this.f[b] == 0 || this.f[b] == 2) return
          }
	  utag.loader.END();
        }
      },
      EV: function(a, b, c, d) {
        if (b == "ready") {
          if(!utag.data){
            try {
              utag.cl = {'_all_': 1};
              utag.loader.initdata();    
              utag.loader.RD(utag.data);
            }catch(e){ utag.DB(e) };
          }
          if ( (document.attachEvent || utag.cfg.dom_complete) ? document.readyState === "complete" : document.readyState !== "loading" ) setTimeout(c, 1);
          else {
            utag.loader.ready_q.push(c);
            var RH;

            if(utag.loader.ready_q.length<=1){
              if (document.addEventListener) {
                RH = function() {
                  document.removeEventListener("DOMContentLoaded", RH, false);
                  utag.loader.run_ready_q()
                };
                if(!utag.cfg.dom_complete)document.addEventListener("DOMContentLoaded", RH, false);
                window.addEventListener("load", utag.loader.run_ready_q, false);
              } else if (document.attachEvent) {
                RH = function() {
                  if (document.readyState === "complete") {
                    document.detachEvent("onreadystatechange", RH);
                    utag.loader.run_ready_q()
                  }
                };
                document.attachEvent("onreadystatechange", RH);
                window.attachEvent("onload", utag.loader.run_ready_q);
              }
            }
          }
        } else {
          if (a.addEventListener) {
            a.addEventListener(b, c, false)
          } else if (a.attachEvent) {
            a.attachEvent(((d == 1) ? "" : "on") + b, c)
          }
        }
      },
      END: function(b, c, d, e, v, w){
        if(this.ended){return};
        this.ended=1;
	utag.DB("loader.END");
        b = utag.data;
        // add the default values for future utag.link/view calls
	if(utag.handler.base && utag.handler.base!='*'){
          e = utag.handler.base.split(",");
          for (d = 0; d < e.length; d++) {
            if (typeof b[e[d]] != "undefined") utag.handler.df[e[d]] = b[e[d]]
          }
        }else if (utag.handler.base=='*'){
           utag.ut.merge(utag.handler.df,b,1);
        }

        utag.rpt['r_0']="t";
	for(var r in utag.loader.GV(utag.cond)){
          utag.rpt['r_'+r]=(utag.cond[r])?"t":"f";
        }

        utag.rpt.ts['s'] = new Date();
	(function(a,b,c,l){if(typeof utag_err!='undefined'&&utag_err.length>0){
                                                a='//uconnect.tealiumiq.com/ulog/_error?utid='+utag.cfg.utid;
                                                l=utag_err.length > 5 ? 5:utag_err.length;
                                                for(b=0;b<l;b++){
                                                    c=utag_err[b];
                                                    a+='&e'+b+'='+encodeURIComponent(c.t+'::'+c.l+'::'+c.s+'::'+c.e);
                                                }
                                                utag.dbi.push((new Image()).src=a);
                                            }})();

        v = utag.cfg.path;
        // both .tiqcdn.com and .tiqcdn.cn supported
        w = v.indexOf(".tiqcdn.");
        if(w>0 && b["cp.utag_main__ss"]==1 && !utag.cfg.no_session_count)utag.ut.loader({src:v.substring(0,v.indexOf("/ut"+"ag/")+6)+"tiqapp/ut"+"ag.v.js?a="+utag.cfg.utid+(utag.cfg.nocookie?"&nocookie=1":"&cb="+(new Date).getTime()),id:"tiqapp"})
        
        if(utag.cfg.noview!=true)utag.handler.RE('view',b,"end");
	utag.handler.INIT();
      }
    },
    DB: function(a, b) {
      // return right away if we've already checked the cookie
      if(utag.cfg.utagdb===false){
        return;
      }else if(typeof utag.cfg.utagdb=="undefined"){
        b = document.cookie+'';
        utag.cfg.utagdb=((b.indexOf('utagdb=true') >= 0)?true:false);
      }
      if(utag.cfg.utagdb===true){
        var t;
        if(utag.ut.typeOf(a) == "object"){
          t=utag.handler.C(a)
        }else{
          t=a
        }
        utag.db_log.push(t);
        try{if(!utag.cfg.noconsole)console.log(t)}catch(e){}
      }
    },
    RP: function(a, b, c) {
      if (typeof a != 'undefined' && typeof a.src != 'undefined' && a.src != '') {
        b = [];
        for (c in utag.loader.GV(a)) {
          if (c != 'src') b.push(c + '=' + escape(a[c]))
        }
        this.dbi.push((new Image()).src = a.src + '?utv=' + utag.cfg.v + '&utid=' + utag.cfg.utid + '&' + (b.join('&')))
      }
    },
    view: function(a,c,d) {
      return this.track({event:'view', data:a, cfg:{cb:c,uids:d}})
    },
    link: function(a,c,d) {
      return this.track({event:'link', data:a, cfg:{cb:c,uids:d}})
    },
    track: function(a,b,c,d) {
      if (typeof a == "string") a = { event: a, data: b, cfg: {cb: c} };

      for(d in utag.loader.GV(utag.o)){
        try{
          utag.o[d].handler.trigger(a.event || "view", a.data || a, a.cfg)
        }catch(e){utag.DB(e)};
      }
      if(a.cfg && a.cfg.cb)try{a.cfg.cb()}catch(e){utag.DB(e)};
      return true
    },
    handler: {
      base: "",
      df: {},
      o: {},
      send: {},
      iflag: 0,
      INIT: function(a, b, c) {
        utag.DB('utag.handler.INIT');
        if(utag.initcatch){
          utag.initcatch=0;
          return
        }
        this.iflag = 1;
        a = utag.loader.q.length;
        if (a > 0) {
          utag.DB("Loader queue");
          for (b = 0; b < a; b++) {
            c = utag.loader.q[b];
            utag.handler.trigger(c.a, c.b, c.c)
          }
        }
        //##UTABSOLUTELAST##
      },
      test: function() {
        return 1
      },
      // reset and run load rules
      LR: function(b){
        utag.DB("Load Rules");
        for(var d in utag.loader.GV(utag.cond)){
          utag.cond[d]=false;
        }
        utag.DB(b);
        utag.loader.loadrules(b);
        utag.DB(utag.cond);
        utag.loader.initcfg();
        // use the OPTOUTMULTI cookie value to override load rules
        utag.loader.OU();
	for(var r in utag.loader.GV(utag.cond)){
          utag.rpt['r_'+r]=(utag.cond[r])?"t":"f";
        }
      },
      // The third param "c" is a string that defines the location i.e. "blr" == before load rules
      RE:function(a,b,c,d,e,f,g){
        if(c!="alr" && !this.cfg_extend){
          return 0; 
        }
        utag.DB("RE: "+c);
        if(c=="alr")utag.DB("All Tags EXTENSIONS");
        utag.DB(b);
        if(typeof this.extend != "undefined"){
          g=0;
          for (d = 0; d < this.extend.length; d++) {
            try {
              /* Extension Attributes */
              e=0;
              if(typeof this.cfg_extend!="undefined"){
                f=this.cfg_extend[d];
                if(typeof f.count == "undefined")f.count=0;
                if(f[a]==0 || (f.once==1 && f.count>0) || f[c]==0){
                  e=1
                }else{
                  if(f[c]==1){g=1};
                  f.count++
                }
              }
              if(e!=1){
                this.extend[d](a, b);
                utag.rpt['ex_' + d] = 0
              }
            } catch (er) {
              utag.DB(er);
              utag.rpt['ex_' + d] = 1;
	      utag.ut.error({e:er.message,s:utag.cfg.path+'utag.js',l:d,t:'ge'});
            }
          }
          utag.DB(b);
          return g;
        }
      },
      trigger: function(a, b, c, d, e, f) {
        utag.DB('trigger:'+a+(c && c.uids?":"+c.uids.join(","):""));
        b = b || {};
        utag.DB(b);

        if (!this.iflag) {
          utag.DB("trigger:called before tags loaded");
          for (d in utag.loader.f) {
            if (!(utag.loader.f[d] === 1)) utag.DB('Tag '+d+' did not LOAD')
          }
          utag.loader.q.push({
            a: a,
            b: utag.handler.C(b),
            c: c
          });
          return;
        }

        // update all values for AJAX pages
        utag.ut.merge(b,this.df,0);
        utag.loader.RD( b, a );

        // clearing noview flag after the RD function call
        utag.cfg.noview = false;

        function sendTag(a, b, d){
          try {
            if(typeof utag.sender[d]!="undefined"){
              utag.DB("SENDING: "+d);
              utag.sender[d].send(a, utag.handler.C(b));
	      utag.rpt['s_' + d] = 0;
            }else if (utag.loader.cfg[d].load!=2){
              // utag.link calls can load in new tags
              utag.loader.sendq[d] = utag.loader.sendq[d] || [];
              utag.loader.sendq[d].push({"event":a, "data":utag.handler.C(b)});
              utag.loader.sendq.pending++;
              utag.loader.AS({id : d, load : 1}); 
            }
          }catch (e) {utag.DB(e)}
        }
        
        // utag.track( { event : "view", data: {myvar : "myval" }, cfg: { uids : [1,2,10] } } );
        if(c && c.uids){
          this.RE(a,b,"alr");
          for(f=0;f<c.uids.length;f++){
            d=c.uids[f];
            // bypass load rules
            sendTag(a, b, d);
          }
        }else if(utag.cfg.load_rules_ajax){
          this.RE(a,b,"blr");
          // process load rules based on current data layer
          this.LR(b);
          this.RE(a,b,"alr");
          
          for(f = 0; f < utag.loader.cfgsort.length; f++){
            d = utag.loader.cfgsort[f];
            if(utag.loader.cfg[d].load && utag.loader.cfg[d].send){
              sendTag(a, b, d);
            }
          }
        }else{
          // legacy behavior
          this.RE(a,b,"alr");
          for (d in utag.loader.GV(utag.sender)) {
            sendTag(a, b, d);
          }
        }
        this.RE(a,b,"end");
      },
      // "sort-of" copy
      C: function(a, b, c) {
        b = {};
        for (c in utag.loader.GV(a)) {
          if(a[c] instanceof Array){
            b[c] = a[c].slice(0)
          }else{
            // objects are still references to the original (not copies)
            b[c] = a[c]
          }
        }
        return b
      }
    },
    ut:{
      pad: function(a,b,c,d){
        a=""+((a-0).toString(16));d='';if(b>a.length){for(c=0;c<(b-a.length);c++){d+='0'}}return ""+d+a
      },
      vi: function(t,a,b){
        if(!utag.v_id){
          a=this.pad(t,12);b=""+Math.random();a+=this.pad(b.substring(2,b.length),16);try{a+=this.pad((navigator.plugins.length?navigator.plugins.length:0),2);a+=this.pad(navigator.userAgent.length,3);a+=this.pad(document.URL.length,4);a+=this.pad(navigator.appVersion.length,3);a+=this.pad(screen.width+screen.height+parseInt((screen.colorDepth)?screen.colorDepth:screen.pixelDepth),5)}catch(e){utag.DB(e);a+="12345"};utag.v_id=a;
        }
        return utag.v_id
      },
      hasOwn: function(o, a) {
        return o != null && Object.prototype.hasOwnProperty.call(o, a)
      },
      isEmptyObject: function(o, a) {
	for (a in o) {
          if (utag.ut.hasOwn(o,a))return false
        }
        return true
      },
      isEmpty: function(o) {
        var t = utag.ut.typeOf(o);
        if ( t == "number" ){
          return isNaN(o)
        }else if ( t == "boolean" ){
          return false
        }else if ( t == "string" ){
          return o.length === 0
        }else return utag.ut.isEmptyObject(o)
      },
      typeOf: function(e) {
        return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
      },
      flatten: function(o){
        // stop when arriving at a string, array, boolean, number (float or integer)
        var a = {}; 
        function r(c, p) {
          if (Object(c) !== c || c instanceof Array) {
            a[p] = c;
          } else {
            if(utag.ut.isEmptyObject(c)){
              //a[p] = {};
            }else{
              for (var d in c) {
                r(c[d], p ? p+"."+d : d);
              }
            }
          }
        }
        r(o, "");

        return a;
      },
      merge: function(a, b, c, d) {
        if(c){
          for(d in utag.loader.GV(b)){
            a[d] = b[d]
          }
        }else{
          for(d in utag.loader.GV(b)){
            if(typeof a[d]=="undefined")a[d] = b[d]
          }
        }
      },
      decode: function(a, b) {
        b = "";
        try{b = decodeURIComponent(a)}catch(e){utag.DB(e)};
        if (b == ""){b = unescape(a)};
        return b
      },
      encode: function(a, b) {
        b = "";
        try{b = encodeURIComponent(a)}catch(e){utag.DB(e)};
        if (b == ""){b = escape(a)};
        return b
      },
      error: function(a, b, c){
        if(typeof utag_err!="undefined"){
          utag_err.push(a)
        }
      },
      loader: function(o, a, b, c, l, m) {
        utag.DB(o);
        a=document;
        if (o.type=="iframe") {
          // if iframe of same ID already exists, just reset the src value (do not create a new iframe)
          m = a.getElementById( o.id );
          if ( m && m.tagName == "IFRAME" ) {
            b = m;
          } else {
            b = a.createElement("iframe");
          }
          o.attrs = o.attrs || {};
          utag.ut.merge( o.attrs, { "height" : "1", "width" : "1", "style" : "display:none" } , 0 );
        }else if (o.type=="img"){
          utag.DB("Attach img: "+o.src);
          b = new Image();
        }else{
          b = a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";
        }
        if(o.id){b.id=o.id};
        for( l in utag.loader.GV(o.attrs) ){
          b.setAttribute( l, o.attrs[l] )
        }
        b.setAttribute("src", o.src);
        if (typeof o.cb=="function") {
          if(b.addEventListener) {
            b.addEventListener("load",function(){o.cb()},false);
          }else {
            // old IE support
            b.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){this.onreadystatechange=null;o.cb()}};
          }
        }
        if(typeof o.error=="function"){
          utag.loader.EV(b, "error", o.error);
        }
        if ( o.type != "img" && !m ) {
          l = o.loc || "head";
          c = a.getElementsByTagName(l)[0];
          if (c) {
            utag.DB("Attach to "+l+": "+o.src);
            if (l == "script") {
              c.parentNode.insertBefore(b, c);
            } else {
              c.appendChild(b)
            }
          }
        }
      }
    }
  };
  utag.o['telekom.mshop']=utag;
  utag.cfg = {
    template : "ut4.44.",
    // Enable load rules ajax feature by default
    load_rules_ajax: true,
    load_rules_at_wait: false,
    lowerqp: false,
    noconsole: false,
    //noview: ##UTNOVIEW##,
    session_timeout: 1800000,
    readywait: 0,
    noload: 0,
    domain: utag.loader.lh(),
    datasource: "##UTDATASOURCE##".replace("##"+"UTDATASOURCE##",""),
    path: "//tags-eu.tiqcdn.com/utag/telekom/mshop/prod/",
    utid: "telekom/mshop/202207201127"
  };
  utag.cfg.v = utag.cfg.template + "202207201127";
  utag.cond={10:0,12:0,13:0,18:0,22:0,23:0,24:0,25:0,26:0,27:0,28:0,32:0,8:0};
utag.pagevars=function(ud){ud = ud || utag.data;try{ud['js_page.xtpage']=xtpage}catch(e){utag.DB(e)};try{ud['js_page.shop_product_tarif']=shop_product_tarif}catch(e){utag.DB(e)};try{ud['js_page.shop_product_option']=shop_product_option}catch(e){utag.DB(e)};try{ud['js_page.shop_product_endgeraet']=shop_product_endgeraet}catch(e){utag.DB(e)};try{ud['js_page.BrowserDetect.browser']=BrowserDetect.browser}catch(e){utag.DB(e)};try{ud['js_page.utag.cfg.path']=utag.cfg.path}catch(e){utag.DB(e)};};
utag.loader.initdata = function() {   try {       utag.data = (typeof utag_data != 'undefined') ? utag_data : {};       utag.udoname='utag_data';    } catch (e) {       utag.data = {};       utag.DB('idf:'+e);   }};utag.loader.loadrules = function(_pd,_pc) {var d = _pd || utag.data; var c = _pc || utag.cond;for (var l in utag.loader.GV(c)) {switch(l){
case '10':try{c[10]|=(typeof d['shop_order_id']!='undefined'&&typeof d['shop_order_id']!='undefined'&&d['shop_order_id']!='')||(d['page_content_id'].toString().toLowerCase().indexOf('shop.telekom.de.privatkunden.shop.bestaetigung'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '12':try{c[12]|=(d['page_type'].toString().toLowerCase().indexOf('ipds'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '13':try{c[13]|=(d['page_content_id'].toString().toLowerCase().indexOf('shop.telekom.de.privatkunden.shop.warenkorb'.toLowerCase())>-1)||(d['dom.url'].toString().toLowerCase().indexOf('shop.telekom.de/shop/warenkorb'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '18':try{c[18]|=(typeof d['shop_order_id']!='undefined'&&typeof d['shop_order_id']!='undefined'&&d['shop_order_id']!=''&&d['dom.url'].toString().toLowerCase().indexOf('for-friends'.toLowerCase())<0)}catch(e){utag.DB(e)}; break;
case '22':try{c[22]|=(d['page_content_id'].toString().toLowerCase().indexOf('shop.telekom.de.privatkunden.master.bestellbestaetigung'.toLowerCase())>-1)||(d['page_content_id'].toString().toLowerCase().indexOf('shop.telekom.de.privatkunden.shop.bestaetigung'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '23':try{c[23]|=(d['page_content_id'].toString().indexOf('shop.telekom.de.privatkunden.shop.warenkorb')>-1)}catch(e){utag.DB(e)}; break;
case '24':try{c[24]|=(d['page_content_id'].toString().indexOf('shop.telekom.de.privatkunden.shop.kundenformular.persoenliche-daten')>-1)}catch(e){utag.DB(e)}; break;
case '25':try{c[25]|=(d['page_content_id'].toString().indexOf('shop.telekom.de.privatkunden.shop.zusammenfassung')>-1)}catch(e){utag.DB(e)}; break;
case '26':try{c[26]|=(d['page_type'].toString().toLowerCase().indexOf('product.individual'.toLowerCase())<0&&d['page_content_id'].toString().toLowerCase().indexOf('shop.telekom.de.privatkunden.shop.warenkorb'.toLowerCase())<0&&d['page_content_id'].toString().toLowerCase().indexOf('shop.telekom.de.privatkunden.shop.bestaetigung'.toLowerCase())<0)}catch(e){utag.DB(e)}; break;
case '27':try{c[27]|=(d['page_type'].toString().toLowerCase().indexOf('product.individual'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '28':try{c[28]|=(d['page_content_id'].toString().toLowerCase().indexOf('shop.telekom.de.privatkunden.shop.warenkorb'.toLowerCase())>-1)}catch(e){utag.DB(e)}; break;
case '32':try{c[32]|=(d['page_type'].toString().toLowerCase()!='www.telekom.de.privatkunden.login'.toLowerCase()&&d['page_type'].toString().toLowerCase()!='www.telekom.de.privatkunden.benutzer'.toLowerCase()&&d['page_type'].toString().toLowerCase()!='www.telekom.de.privatkunden.passwort'.toLowerCase()&&d['page_content_id'].toString().toLowerCase().indexOf('.kundencenter.'.toLowerCase())<0&&!/^login\.telekom\./i.test(d['page_content_id']))}catch(e){utag.DB(e)}; break;
case '8':try{c[8]|=(d['page_content_id'].toString().toLowerCase().indexOf('shop.telekom.de.privatkunden.shop.bestellbestaetigung'.toLowerCase())<0)}catch(e){utag.DB(e)}; break;}}};utag.pre=function() {    utag.loader.initdata();utag.pagevars();    try{utag.loader.RD(utag.data)}catch(e){utag.DB(e)};    utag.loader.loadrules();    };utag.loader.GET=function(){utag.cl={'_all_':1};utag.pre();
  utag.handler.extend=[function(a,b){ try{utag.runonce = utag.runonce || {};utag.runonce.ext = utag.runonce.ext || {};if(typeof utag.runonce.ext[111]=='undefined'){utag.runonce.ext[111]=1;if(1){
/**
 * Title: Consent Track overwrite
 * Run: Before Load Rules (runs after ConsentSync Extension)
 * Version: 2.0
 * Date: 10.02.2021
 */
 
(function() {

// Only execute the extension if ConsentManagementConfig is present
if (window.consentMngmntConfig.consentSync) {

	// suppress the consent layer
	utag.gdpr.consent_prompt.noShow = true;

	window.consentSyncEventStack = [];
	if(typeof window.consentSyncReady == "undefined")
		window.consentSyncReady = false;

	utag.tealiumLink = utag.link;
	utag.tealiumView = utag.view;
	utag.link = function(data, cb, uids){
		if (window.consentSyncReady) {
			utag.tealiumLink(data, cb, uids);
		} else {
			window.consentSyncEventStack.push({event: 'link', data:data, cb:cb, uids:uids});
		}
	}
	utag.view = function(data, cb, uids){
		if (window.consentSyncReady) {
			utag.tealiumView(data, cb, uids);
		} else {
			window.consentSyncEventStack.push({event: 'view', data:data, cb:cb, uids:uids});
		}
	}

	if(!window.consentMngmntConfig.isSPA){
		var utagDataCopy = window[window.utag && window.utag.udoname || "utag_data"];
		utag.view(utagDataCopy);
	}
}

})(); 
}
}} catch(e){ utag.DB(e) }  },
function(a,b){ try{utag.runonce = utag.runonce || {};utag.runonce.ext = utag.runonce.ext || {};if(typeof utag.runonce.ext[112]=='undefined'){utag.runonce.ext[112]=1;if(1){
/**
 * Title: Consent Layer Hide
 * Run: Before Load Rules (All Tags)
 * Version: 2.1 (IE11 Support)
 * Date: 15.02.2021
 */

// set the noShow Property if the hideCondition is met or we are on a hiddenPages-Site and do not use the consent sync
if(typeof utag != "undefined" && typeof utag.gdpr != "undefined" && typeof utag.data != "undefined") {
    if(
        window.consentMngmntConfig.hideCondition ||
        window.consentMngmntConfig.hiddenPages.indexOf(utag.data['page_content_id']) > -1 || 
        window.consentMngmntConfig.hiddenPages.indexOf(window.location.href) > -1
    ) 
        utag.gdpr.consent_prompt.noShow=true;
} 
}
}} catch(e){ utag.DB(e) }  },
function(a,b){ try{utag.runonce = utag.runonce || {};utag.runonce.ext = utag.runonce.ext || {};if(typeof utag.runonce.ext[125]=='undefined'){utag.runonce.ext[125]=1;if(1){
/** 
 * Version: 1.1
 * Date: 21.03.2022
 */

 (function(){
    // Font File Src URL
    if (typeof window.consentMngmntConfig.fontURLRegular == "string") {
        var re = /(@font-face{.+?font-weight:400.+?src:url\().+?(\)\sformat)/;
        utag.gdpr.consent_prompt.content.css = utag.gdpr.consent_prompt.content.css.replace(re, "$1" + window.consentMngmntConfig.fontURLRegular + "$2");
        utag.gdpr.preferences_prompt.content.css = utag.gdpr.preferences_prompt.content.css.replace(re, "$1" + window.consentMngmntConfig.fontURLRegular + "$2");
    }
    
    if (typeof window.consentMngmntConfig.fontURLBold == "string") {
        var re = /(@font-face{.+?font-weight:700.+?src:url\().+?(\)\sformat)/;
        utag.gdpr.consent_prompt.content.css = utag.gdpr.consent_prompt.content.css.replace(re, "$1" + window.consentMngmntConfig.fontURLBold + "$2");
        utag.gdpr.preferences_prompt.content.css = utag.gdpr.preferences_prompt.content.css.replace(re, "$1" + window.consentMngmntConfig.fontURLBold + "$2");
    }

    // IMPRINT
    // Set profile specific fallback imprint URL if exists
    if (typeof window.consentMngmntConfig.defaultImprintURL == "string") {
        for (var language in utag.gdpr.consent_prompt.languages) {
            utag.gdpr.consent_prompt.languages[language].custom_tokens.imprint_link = window.consentMngmntConfig.defaultImprintURL;
        }
    }

    // Multiple URL present, replace according to langauge code
    if (typeof window.consentMngmntConfig.imprintURLs == "object") {

        for (var language in utag.gdpr.consent_prompt.languages) {
            // Try to use a exact language code match to get the URL
            if (window.consentMngmntConfig.imprintURLs.hasOwnProperty(language)) {
                var currImprintLangURL = window.consentMngmntConfig.imprintURLs[language];

                utag.gdpr.consent_prompt.languages[language].custom_tokens.imprint_link = currImprintLangURL;
            }
            // If not found, use language code without country code to find URL
            else if (window.consentMngmntConfig.imprintURLs.hasOwnProperty(language.split('-')[0])) {
                var langWithoutCountryCode = language.split('-')[0];
                var currImprintLangURL = window.consentMngmntConfig.imprintURLs[langWithoutCountryCode];

                utag.gdpr.consent_prompt.languages[langWithoutCountryCode].custom_tokens.imprint_link = currImprintLangURL;
            }
        }
    }
    
    //PRIVACY
    // Set profile specific fallback privacy URL if exists
    if (typeof window.consentMngmntConfig.defaultPrivacyURL == "string") {
        for (var language in utag.gdpr.consent_prompt.languages) {
            utag.gdpr.consent_prompt.languages[language].custom_tokens.privacy_policy_link = window.consentMngmntConfig.defaultPrivacyURL;
            utag.gdpr.preferences_prompt.languages[language].custom_tokens.privacy_link = window.consentMngmntConfig.defaultPrivacyURL;
        }
    }

    // Multiple URL present, replace according to langauge code
    if (typeof window.consentMngmntConfig.privacyURLs == "object") {

        for (var language in utag.gdpr.consent_prompt.languages) {
            // Try to use a exact language code match to get the URL
            if (window.consentMngmntConfig.privacyURLs.hasOwnProperty(language)) {
                var currPrivacyLangURL = window.consentMngmntConfig.privacyURLs[language];

                utag.gdpr.consent_prompt.languages[language].custom_tokens.privacy_policy_link = currPrivacyLangURL;
                utag.gdpr.preferences_prompt.languages[language].custom_tokens.privacy_link = currPrivacyLangURL;

            }
            // If not found, use language code without country code to find URL
            else if (window.consentMngmntConfig.privacyURLs.hasOwnProperty(language.split('-')[0])) {
                var langWithoutCountryCode = language.split('-')[0];
                var currPrivacyLangURL = window.consentMngmntConfig.privacyURLs[langWithoutCountryCode];

                utag.gdpr.consent_prompt.languages[langWithoutCountryCode].custom_tokens.privacy_policy_link = currPrivacyLangURL;
                utag.gdpr.preferences_prompt.languages[langWithoutCountryCode].custom_tokens.privacy_link = currPrivacyLangURL;
            }
        }
    }
})();
}
}} catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
var str = b.page_content_id;
str = str.toLowerCase();

/*
***********************************************************
Check for special characters with subsequent identification
***********************************************************
*/

str = str.replace(/[&§\/\\äöüß_@°^²³#,+()$~%'":*?!<>{}]/g,'');


if (str != b.page_content_id){b.page_convention = "convention failure";}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
var str = b.shop_product_name;
str = str.toLowerCase();

/************
Charcode translations:
33 !, 36 $, 37 %, 58 :, 61 =, 63 ?, 91 [, 93 ], 123 {, 125 }, 174 ®
************/

// replace following Chars
str = str
.replaceAll(String.fromCharCode(43)," plus ")
.replaceAll(String.fromCharCode(42)," stern ")
.replaceAll(String.fromCharCode(176)," grad ")
.replaceAll(String.fromCharCode(8364)," euro ")
.replaceAll(String.fromCharCode(233),"e")
.replaceAll(String.fromCharCode(109,178),"qm")
.replaceAll(String.fromCharCode(8217),"-")
.replaceAll(String.fromCharCode(945)," alpha ")
.replaceAll(String.fromCharCode(180),"-")
.replaceAll(String.fromCharCode(39,39), " zoll ")
.replaceAll(String.fromCharCode(37), " ")
.replaceAll(String.fromCharCode(58), " ")
.replaceAll(String.fromCharCode(33), " ")
.replaceAll(String.fromCharCode(63), " ")
.replaceAll(String.fromCharCode(36), " ")
.replaceAll(String.fromCharCode(61), " ")
.replaceAll(String.fromCharCode(91), " ")
.replaceAll(String.fromCharCode(93), " ")
.replaceAll(String.fromCharCode(123), " ")
.replaceAll(String.fromCharCode(125), " ")
.replaceAll(String.fromCharCode(174), " ")
.replaceAll(String.fromCharCode(8482), " ")
.replaceAll(String.fromCharCode(8222), " ")
.replaceAll(String.fromCharCode(8220), " ")
.replaceAll(String.fromCharCode(96), " ");

// replace quotes " if there is more than one
quoteChars = (str.match(/"/g) || []);
if (quoteChars.length > 1) str = str.replaceAll(String.fromCharCode(34), " ");

// remove whitespaces
str = str.replaceAll(/  +/g, ' ').trim();


// fill empty with 'leerer produktname'
if (str === null || str === undefined || str === "") str = "leerer produktname";

b.shop_product_name = str;
} } catch(e){ utag.DB(e) }  },
function(a,b){
var allDataTealiumRel = document.querySelectorAll('[data-tealium-rel]');
for(var x = 0; x < allDataTealiumRel.length; x++){
  allDataTealiumRel[x].setAttribute('data-tealium-rel',allDataTealiumRel[x].getAttribute('data-tealium-rel').toLowerCase()); 

}
},
function(a,b){
var dur, 
    price, 
    qty,
    order_tot, 
    i,
    data_source_name = "shop_order_value", // change this to alter the output data source
    order_id_ds = "shop_order_id", // change this to alter the data source name of the order id
    store_data = "yes"; // set to "no" to disable data storage (session only - will be deleted when session is terminated)
if (b.shop_product_price && b.shop_product_duration) {
  dur = b.shop_product_duration.split(";");
  price = b.shop_product_price.split(";");
  qty = b.shop_product_quantity.split(";");
  
  order_tot = 0;
  
  for (i = 0; i < price.length; i++) {
    if (!dur[i]) {
      dur[i] = 1;   
    }
    if (!qty[i]) {
     qty[i] = 1;    
    }
    order_tot = order_tot + (parseFloat(price[i]) * parseInt(dur[i]) * parseInt(qty[i]));
  }
  
  b[data_source_name] = order_tot;
  if (store_data === "yes") {
    utag.loader.SC("utag_main", {
      "order_total": b[data_source_name] + ";exp-session"
    });
  }
} else if (b['cp.utag_main_order_total'] && store_data === "yes") {
  b[data_source_name] = parseFloat(b['cp.utag_main_order_total']);
}

  // only run this on order conf page
  if (!b[order_id_ds] && b[data_source_name]) {
    try {
      delete b[data_source_name];
    } catch (e) {
      utag.DB(e);
      b[data_source_name] = undefined;
    }
  }
},
function(a,b){
/*
 * @author: Kevin Thomas Faurholt - Tealium, Inc.
 * 
 * Customizable config Object
 * - Mandatory domain : set the topmost domain (content-ID) from where this extension is supposed to run at
 */
//var config = { "domain" : "geschaeftskunden.telekom.de" };
var config = {}; //domain will be auto-detected if not present

/** DO NOT TOUCH BELOW THIS LINE ***************************************************************/
/* @author: kevin thomas faurholt */
// !!!!!!!!!!!!!!DELETE REPLACE IF CONTENTID IS FIXED!!!!!!!!!!!
b["page_content_id"] = b["page_content_id"].replace("www.","") || "";

//var domain = (config && config.domain ? config.domain : document.domain).replace(".", "\\.");
//var re = new RegExp("^(?:www[.])?(.*" + domain.replace(/www[.]/, "") + ")[.]?(.*)$", "i");
//var parts = b["page_content_id"].match(re);
//var level = (parts[2] || "").split(".");
var parts = b["page_content_id"];
var level = (parts || "").split(".");
//b["page_domain"] = parts[1] ? ("www." + parts[1]) : "ERROR";

//Entwicklungsumgebung
//b["page_domain"] = level[0] + "." + level[1] + "." + level[2] + "." + level[3];

//Schulungsumgebung
b["page_domain"] = level[0] + "." + level[1] + "." + level[2];

// max 6 navigation levels
j=1;

// Für die Entwicklungsumgbung muss die Variable i auf 4 geändert werden
for(var i = 4; i < level.length && (i+1) < 10; i++)
{
  if (i == 4){
  if (level[i]== "privatkunden" || level[i]== "geschaeftskunden" || level[i]== "personalverkauf" || level[i]== "alle")
  {b["page_target_group"] = level[i] || "";i++;}else{b["page_target_group"] = "privatkunden";}
  }
  b["page_navigation_level_"+(j)] = level[i];j++;

}

// page_name is always last level in the contentId
b["page_name"] = level[level.length-1] || "";
//b["page_target_group"] = "privatkunden";


},
function(a,b){ try{ if(1){try{b['wt_link_track_pattern']=new RegExp("((\\?|\\&).*#|#)","g");}catch(e){};try{b['wt_link_track_replace']="+";}catch(e){}} } catch(e){ utag.DB(e); }  },
function(a,b,c,d){
  b._ccity='';
  b._ccountry='';
  b._ccurrency='';
  b._ccustid='';
  b._corder=(typeof b['shop_order_id']!='undefined')?b['shop_order_id']:'';
  b._cpromo='';
  b._cship='';
  b._cstate='';
  b._cstore='';
  b._csubtotal=(typeof b['shop_order_value']!='undefined')?b['shop_order_value']:'';
  b._ctax='';
  b._ctotal='';
  b._ctype='';
  b._czip='';
  b._cprod=(typeof b['shop_product_manufacturer_sku']!='undefined'&&b['shop_product_manufacturer_sku'].length>0)?b['shop_product_manufacturer_sku'].split(';'):[];
  b._cprodname=(typeof b['shop_product_name']!='undefined'&&b['shop_product_name'].length>0)?b['shop_product_name'].split(';'):[];
  b._cbrand=[];
  b._ccat=[];
  b._ccat2=[];
  b._cquan=(typeof b['shop_product_quantity']!='undefined'&&b['shop_product_quantity'].length>0)?b['shop_product_quantity'].split(';'):[];
  b._cprice=(typeof b['shop_product_price']!='undefined'&&b['shop_product_price'].length>0)?b['shop_product_price'].split(';'):[];
  b._csku=(typeof b['shop_product_sku']!='undefined'&&b['shop_product_sku'].length>0)?b['shop_product_sku'].split(';'):[];
  b._cpdisc=[];
  if(b._cprod.length==0){b._cprod=b._csku.slice()};
  if(b._cprodname.length==0){b._cprodname=b._csku.slice()};
  function tf(a){if(a=='' || isNaN(parseFloat(a))){return a}else{return (parseFloat(a)).toFixed(2)}};
  b._ctotal=tf(b._ctotal);b._csubtotal=tf(b._csubtotal);b._ctax=tf(b._ctax);b._cship=tf(b._cship);for(c=0;c<b._cprice.length;c++){b._cprice[c]=tf(b._cprice[c])};for(c=0;c<b._cpdisc.length;c++){b._cpdisc[c]=tf(b._cpdisc[c])};
},
function(a,b){ try{ if(typeof b['qp.mlid']!='undefined'){if(typeof b['cp.mtlzr']=='undefined'){document.cookie="mtlzr="+b['qp.mlid']+";path=/;domain="+utag.cfg.domain+";expires=";b['cp.mtlzr']=b['qp.mlid'];}}} catch(e){ utag.DB(e); } },
function(a,b){ try{ if(1){
//Telekom Unterwegs
if(b.page_domain == 'www.telekom.de' && b.page_navigation_level_1 == 'unterwegs'){
  b.wt_product_category_fn = 'mobilfunk';
  b.wt_product_category_mofu = b.shop_product_category;
  b.wt_product_category_pruef = 'aus_pixel_'+b.page_domain;
}
//Shop
else if(b.page_domain == 'shop.telekom.de'){
  b.wt_product_category_fn = 'mobilfunk';
  b.wt_product_category_mofu = b.shop_product_category;
  b.wt_product_category_pruef = 'aus_pixel_'+b.page_domain;
}
//Geschäftskunden
else if(b.page_domain == 'geschaeftskunden.telekom.de'){
  if(b.page_navigation_level_1 == 'mobilfunk'){
    b.wt_product_category_fn = 'mobilfunk';
    b.wt_product_category_mofu = b.shop_product_category;
    b.wt_product_category_pruef = 'aus_pixel_'+b.page_domain;
  }
  else if(b.shop_product_category == 'doubleplay' || b.shop_product_category == 'tripleplay'){
    b.wt_product_category_fn = b.shop_product_category;
    b.wt_product_category_mofu = 'festnetz';
    b.wt_product_category_pruef = 'aus_pixel_'+b.page_domain;
  }
  else if(b.shop_product_category == 'zubehoer' && (b.page_navigation_level_1 == 'festnetz-internet' || b.page_navigation_level_1 == 'router' || b.page_navigation_level_1 == 'anfrage')){
    b.wt_product_category_fn = b.shop_product_category;
    b.wt_product_category_mofu = 'festnetz';
    b.wt_product_category_pruef = 'aus_pixel_'+b.page_domain;
  }
  else if(b.shop_product_category == 'option' && b.page_navigation_level_1 == 'festnetz-internet'){
    b.wt_product_category_fn = b.shop_product_category;
    b.wt_product_category_mofu = 'festnetz';
    b.wt_product_category_pruef = 'aus_pixel_'+b.page_domain;
  }
}
//smarthome
else if(b.page_domain == 'www.smarthome.de'){
    if(b.shop_product_category == 'zubehoer-smarthome'){
        b.wt_product_category_fn = 'zubehoer-smarthome';
        b.wt_product_category_mofu = 'festnetz';
        b.wt_product_category_pruef = 'aus_pixel_'+b.page_domain;
    } else if(b.shop_product_category.indexOf('serviceprodukt') === 0){
        b.wt_product_category_fn = 'serviceprodukt-smarthome';
        b.wt_product_category_mofu = 'festnetz';
        b.wt_product_category_pruef = 'aus_pixel_'+b.page_domain;
    }
}
//Telekom Profis
else if(b.page_domain == 'www.telekom-profis.de'){
  if(b.shop_product_category == 'contract' || b.shop_product_category == 'endgeraet'){
    b.wt_product_category_fn = 'mobilfunk';
    b.wt_product_category_mofu = b.shop_product_category;
    b.wt_product_category_pruef = 'aus_pixel_'+b.page_domain;
  }
  else if(b.shop_product_category == 'doubleplay' || b.shop_product_category == 'tripleplay'){
    b.wt_product_category_fn = b.shop_product_category;
    b.wt_product_category_mofu = 'festnetz';
    b.wt_product_category_pruef = 'aus_pixel_'+b.page_domain;
  }
}
//Payback
else if(b.page_domain == 'telekom.payback.de'){
	if(b.page_navigation_level_1 == 'unterwegs'){
	  b.wt_product_category_fn = 'mobilfunk';
	  b.wt_product_category_mofu = b.shop_product_category;
      b.wt_product_category_pruef = 'aus_pixel_'+b.page_domain;
	}
	else if(b.page_navigation_level_1 == 'zuhause'){
	  b.wt_product_category_fn = b.shop_product_category;
	  b.wt_product_category_mofu = 'festnetz';
      b.wt_product_category_pruef = 'aus_pixel_'+b.page_domain;
	}
}
//tarifbestellen
else if(b.page_domain == 'tarifbestellen.t-online.de'){
	if(b.shop_product_category == 'single play'){
	  b.wt_product_category_fn = 'singleplay';
	  b.wt_product_category_mofu = 'festnetz';
      b.wt_product_category_pruef = 'aus_pixel_'+b.page_domain;
	}
	else if(b.shop_product_category == 'double play'){
	  b.wt_product_category_fn = 'doubleplay';
	  b.wt_product_category_mofu = 'festnetz';
      b.wt_product_category_pruef = 'aus_pixel_'+b.page_domain;
	}
	else if(b.shop_product_category == 'triple play'){
	  b.wt_product_category_fn = 'tripleplay';
	  b.wt_product_category_mofu = 'festnetz';
      b.wt_product_category_pruef = 'aus_pixel_'+b.page_domain;
	}
	else if(b.shop_product_name.indexOf('data') === 0){ // wenn in dem PRODUKT NAME die zeichenkette 'data' direkt am anfange steht
	  b.wt_product_category_fn = 'mobilfunk';
	  b.wt_product_category_mofu = 'contract - mbb';
      b.wt_product_category_pruef = 'aus_pixel_'+b.page_domain;
	}
	else if(b.shop_product_name.indexOf('data') == -1){ // wenn in dem PRODUKT NAME die zeichenkette 'data' nicht vorkommt
	  b.wt_product_category_fn = 'mobilfunk';
	  b.wt_product_category_mofu = 'contract';
      b.wt_product_category_pruef = 'aus_pixel_'+b.page_domain;
	}
	else if(b.shop_product_category == 'smarthome'){
	  b.wt_product_category_fn = 'zubehoer-smarthome';
	  b.wt_product_category_mofu = 'festnetz';
      b.wt_product_category_pruef = 'aus_pixel_'+b.page_domain;
	}
	else if(b.shop_product_category.indexOf('endgeraet') > -1){ // wenn in der PRODUKT KATEGORIE die zeichenkette 'endgeraet' irgendwo vorkommt
	  b.wt_product_category_fn = 'mobilfunk';
	  b.wt_product_category_mofu = b.shop_product_category;
      b.wt_product_category_pruef = 'aus_pixel_'+b.page_domain;
	}
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){b['shop_order_currency']='EUR'} } catch(e){ utag.DB(e); }  },
function(a,b){ try{utag.runonce = utag.runonce || {};utag.runonce.ext = utag.runonce.ext || {};if(typeof utag.runonce.ext[86]=='undefined'){utag.runonce.ext[86]=1;if(1){
(function(b){"undefined"===typeof b.wt_teaserTracking&&(b.wts=b.wts||[],b.wts.push(["wt_teaserTracking"]));b.wt_teaserTracking=function(a){if(("page"===a.mode||"config"===a.mode)&&1===a.requestCounter){var e=b.wt_teaserTrackingConfig_v2||{teaserAttribute:"data-wt-teaser",viewPercent:100,viewTime:1E3,attribution:"all",maxSendTeasers:{session:1E4,page:1E3},clearConversions:!0,autoEngagements:!0};if("undefined"!==typeof document.querySelectorAll&&"undefined"!==typeof document.querySelector){var l=function(a,
e,t){var k=[],l=!0,r=!0,h="",g="";this.setItems=function(a){if("undefined"!==typeof a&&null!==a&&a.length)for(var c=0;c<a.length;c++)k.push(y(a[c]))};this.deleteItems=function(a){if("object"===typeof a&&null!==a&&a.length)for(var c=0;c<a.length;c++)k.indexOf(a[c])&&k.splice(k.indexOf(a[c]),1)};var n=function(){h=b.innerHeight||self.innerHeight||document.documentElement&&document.documentElement.clientHeight||document.body.clientHeight;g=b.innerWidth||self.innerWidth||document.documentElement&&document.documentElement.clientWidth||
document.body.clientWidth;l=!0},y=function(a){a.wt_vp=a.wt_vp||{};a.wt_vp.dimension=p(a);return a},u=function(f){b.setTimeout(function(){for(var c=[],d=!1,b=0;b<f.length;b++)f[b].wt_vp.dimension=p(f[b]),f[b].wt_vp.dimension.visible.height.percent>=a.percent.on&&f[b].wt_vp.dimension.visible.width.percent>=a.percent.on?(f[b].wt_vp.on-=50,c.push(f[b]),0>=f[b].wt_vp.on&&(d=!0)):delete f[b].wt_vp.on;c.length&&(d&&!r?e(c):u(c))},50)},m=function(f){b.setTimeout(function(){for(var c=[],b=0;b<f.length;b++)f[b].wt_vp.dimension=
p(f[b]),f[b].wt_vp.dimension.hidden.height.percent>=a.percent.off&&f[b].wt_vp.dimension.hidden.width.percent>=a.percent.off?(f[b].wt_vp.off-=50,0===f[b].wt_vp.off?(delete f[b].wt_vp.on,delete f[b].wt_vp.off):c.push(f[b])):delete f[b].wt_vp.off;c.length&&m(c)},50)},p=function(a){var b=a.wt_vp.dimension||{rec:null,visible:{height:{percent:null,pixel:null},width:{percent:null,pixel:null}},hidden:{height:{percent:null,pixel:null},width:{percent:null,pixel:null}}},d=a.getBoundingClientRect();b.rec={height:"undefined"!==
typeof d.height?d.height:a.clientHeight,width:"undefined"!==typeof d.width?d.width:a.clientWidth,top:d.top,right:d.right,bottom:d.bottom,left:d.left};a=b.visible.height;var d=b.rec,p=0;(0<=d.top||0<d.top+d.height)&&d.top<h&&(p+=d.height,p+=0>d.top?d.top:0,p-=d.top+d.height>h?d.height+d.top-h:0);if(0>=d.left+d.width||d.left>=g)p=0;a.pixel=p;a=b.visible.width;d=b.rec;p=0;(0<=d.left||0<d.left+d.width)&&d.left<g&&(p=d.width,p+=0>d.left?d.left:0,p-=d.left+d.width>g?d.left+d.width-g:0);if(0>=d.top+d.height||
d.top>=h)p=0;a.pixel=p;b.visible.height.percent=100*b.visible.height.pixel/b.rec.height;b.visible.width.percent=100*b.visible.width.pixel/b.rec.width;b.hidden.height.pixel=b.rec.height-b.visible.height.pixel;b.hidden.width.pixel=b.rec.width-b.visible.width.pixel;b.hidden.height.percent=100-b.visible.height.percent;b.hidden.width.percent=100-b.visible.width.percent;return b};this.start=function(){if(r&&k.length){q();var a=b,c=q;a.addEventListener?a.addEventListener("scroll",c,!1):a.attachEvent&&a.attachEvent("onscroll",
c);a=b;c=q;a.addEventListener?a.addEventListener("resize",c,!1):a.attachEvent&&a.attachEvent("onresize",c);r=!1}};this.stop=function(){if(!r){var a=b,c=q;a.removeEventListener?a.removeEventListener("scroll",c,!1):a.detachEvent&&a.detachEvent("onscroll",c);a=b;c=q;a.removeEventListener?a.removeEventListener("resize",c,!1):a.detachEvent&&a.detachEvent("onresize",c);r=!0}};var q=function(){n();if(k.length&&l){l=!1;for(var b=[],c=[],d=0;d<k.length;d++){k[d].wt_vp.dimension=p(k[d]);var q=k[d].wt_vp.dimension,
g=q.hidden.height.percent>=a.percent.off&&q.hidden.width.percent>=a.percent.off;q.visible.height.percent>=a.percent.on&&q.visible.width.percent>=a.percent.on&&"undefined"===typeof k[d].wt_vp.on?(k[d].wt_vp.on=a.view.on,b.push(k[d])):0>=k[d].wt_vp.on&&g&&"undefined"===typeof k[d].wt_vp.off&&(k[d].wt_vp.off=a.view.off,c.push(k[d]))}b.length&&u(b);c.length&&m(c)}};n();this.setItems(t);this.start()},s=function(a,e,t,k){b.wt_ttv2=b.wt_ttv2||[];var l=function(){},r=function(a){if(a&&"{"===a.charAt(0)&&
"}"===a.charAt(a.length-1)){var b;try{b=(new Function("return "+("("+a+")")))()}catch(g){b=null}if(b&&null!==b)return b}return!1},h=function(){if(e.teaserAttribute){for(var a=[],g=document.querySelectorAll("*["+e.teaserAttribute+"]"),h={},m=0,p=g.length;m<p;m++)for(var q=g[m].attributes,f=0,c=q.length;f<c;f++){var d;if(d=q[f].name===e.teaserAttribute)d=r(q[f].value),d=!d||"object"!==typeof d.ck||"string"!==typeof d.ck["520"]&&"string"!==typeof d.ck["521"]?!1:!0;if(d){d=r(q[f].value);q[f].value="";
d={selector:g[m],data:{rank:"undefined"!==typeof d.ck["520"]?d.ck["520"]:"",name:"undefined"!==typeof d.ck["521"]?d.ck["521"]:"",type:"undefined"!==typeof d.ck["522"]?d.ck["522"]:"",content:"undefined"!==typeof d.ck["526"]?d.ck["526"]:"",variant:"undefined"!==typeof d.ck["527"]?d.ck["527"]:"",requestId:"undefined"!==typeof d.ck["529"]?d.ck["529"]:"",targetGroup:"undefined"!==typeof d.ck["530"]?d.ck["530"]:"",rule:"undefined"!==typeof d.ck["531"]?d.ck["531"]:"",itemPage:"undefined"!==typeof d.ck["532"]?
d.ck["532"]:"",itemPosition:"undefined"!==typeof d.ck["533"]?d.ck["533"]:"",seen:"undefined"!==typeof d.ckv},conversion:{type:"undefined"!==typeof d.vic?"view":"undefined"!==typeof d.ctc?"click":"product"}};var k=d.data.name+d.data.rank;"undefined"===typeof h[k]?h[k]=d:(d.data.seen=!0,a.push(d))}}for(var w in h)a.push(h[w]);b.wt_ttv2.push(a)}},g=function(a,b,g,m,p,q,f,c,d,h,e,w,l,r,C){if(b||a)a={rank:a?a:"",name:b?b:"",type:g?g:"",content:f?f:"",variant:c?c:"",requestId:e?e:"",targetGroup:w?w:"",
rule:l?l:"",itemPage:r?r:"",itemPosition:C?C:"",cType:h?"view":"product",cGoal:"both"},"1"===m&&k.wasSeenOrLimitReached({wt_ttv2:{data:a}})?(k.track("view",[a]),h&&(t.setEngagement(a),t.setConversion(a))):"1"===p&&(k.track("click",[a]),t.setEngagement(a),t.setConversion(a))};this.searchTeaser=function(){h()};b.wt_tt=b.wt_tt||a;b.wt_tt.tt=b.wt_tt.tt||{version:"1.0.5",teaserAttribute:e.teaserAttribute,searchTeaser:h,addClickParameter:g,checkTeaserCookie:l,checkTeaserConversions:l,startScrollPosition:l,
sendTeaserAction:l,setScrollPos:l}},x=function(a,b){var e=(a.trackId+"").split(",")[0],k="wt_ttv2_c_"+e,l="wt_ttv2_e_"+e,r="name rank type content variant requestId targetGroup rule itemPage itemPosition cType cGoal cValue".split(" "),h=function(p,q){for(var f=[],c=0,d=q.length;c<d;c++)f.push(q[c].join("*"));4E3>=a.wtEscape(f.join("~")).length?a.setCookie(p,f.join("~")):("first"===b?q.pop():q.shift(),h(p,q))},g=function(b){b=a.getCookie(b).split("~");for(var q=[],f=0,c=b.length,d;f<c;f++)b[f]&&(d=
b[f].split("*"),q.push(d));return q},n=function(a){var b="";switch(a){case "view":b="0";break;case "click":b="1";break;case "product":b="2";break;case "0":b="view";break;case "1":b="click";break;case "2":b="product"}return b},y=function(a){var b="";switch(a){case "order":b="0";break;case "goal":b="1";break;case "both":b="2";break;case "0":b="order";break;case "1":b="goal";break;case "2":b="both"}return b},u=function(a){for(var b="            ".split(" "),f=0,c=r.length;f<c;f++){if("undefined"!==typeof a[r[f]]&&
a[r[f]]){var d=b,g=f,m;m=a[r[f]];m+="";m=m.replace(/[\*~]/g,"");d[g]=m}"cType"===r[f]&&(b[f]=n(b[f]));"cGoal"===r[f]&&(b[f]=y(b[f]))}return b},m=function(a){for(var b=[],f=0,c=a.length;f<c;f++){for(var d=a[f],g={},m=!1,h=0,e=d.length;h<e;h++)"cType"===r[h]&&(d[h]=n(d[h])),"cGoal"===r[h]&&(d[h]=y(d[h])),d[h]&&(g[r[h]]=d[h],m=!0);m&&b.push(g)}return b};this.deleteGoal=function(){for(var a=g(k),b=[],f=0,c=a.length;f<c;f++){var d=a[f];"0"===d[11]&&b.push(d)}h(k,b)};this.deleteOrder=function(){for(var a=
g(k),b=[],f=0,c=a.length;f<c;f++){var d=a[f];"1"===d[11]&&b.push(d)}h(k,b)};this.setEngagement=function(a){a=u(a);h(l,[a])};this.getEngagement=function(){return m(g(l))};this.deleteEngagement=function(){a.setCookie(l,"",-3600)};this.setConversion=function(a){var m=g(k);a=u(a);for(var f=!1,c=0,d=m.length;c<d;c++){var e=m[c].join("*")===a.join("*");if("first"===b){if(e){f=!0;break}}else if(e){m.splice(c,1);break}}f||(m.push(a),h(k,m))};this.getConversion=function(){return m(g(k))}},z=function(a,b){var e=
b.session,k=b.page,l=b.sendMultipleTeaserViews,r="wt_ttv2_s_"+(a.trackId+"").split(",")[0],h,g,n={rank:["ck520",""],name:["ck521",""],type:["ck522",""],view:["ck523",""],click:["ck524",""],pi:["ck525",""],content:["ck526",""],variant:["ck527",""],conf:["ck528",""],requestId:["ck529",""],targetGroup:["ck530",""],rule:["ck531",""],itemPage:["ck532",""],itemPosition:["ck533",""]},y=function(a,b,f,c){if("object"===typeof b)for(var d in b){var m=d+"";y(a+m,b[m],f,c)}else{"undefined"===typeof c[a]&&(c[a]=
[]);if(c[a].length<f)for(d=c[a].length;d<f;d++)c[a].push("");c[a].push(b)}},u=function(b){var m="&ct=webtrekk_ignore",f;for(f in b)var c=f+"",m=m+("&"+c+"="+a.wtEscape(b[c].join(";")));return m},m=function(b,m){if(m){a.config.dynamicParameters||(a.config.dynamicParameters={});for(var f in b){var c=f+"";a.config.dynamicParameters[c]=b[c].join(";")}}else a.quicksend(a.wtEscape(a.contentId.split(";")[0])+",1,"+a.baseparams(),u(b))};this.track=function(a,b){if(0<b.length&&("view"===a||"click"===a||"pi"===
a||"conf"===a)){for(var f=0,c=b.length;f<c;f++)b[f][a]&&null!==b[f][a]||(b[f][a]="1");for(var c="conf"===a,f={},d=0,g=b.length,h;d<g;d++){h=b[d];for(var e in h){var k=e+"";"undefined"!==typeof n[k]&&y(n[k][0],h[k],d,f)}}if(c)m(f,c);else{for(e={};0<f.ck521.length;){for(var l in f)c=l+"","undefined"===typeof e[c]&&(e[c]=[]),e[c].push(f[c][0]),f[c].shift();6144<u(e).length&&(m(e,!1),e={})}"undefined"!==typeof e.ck521&&0<e.ck521.length&&m(e,!1)}}};this.wasSeenOrLimitReached=function(b){b=l||"undefined"===
typeof b.wt_ttv2||"undefined"!==typeof b.wt_ttv2.data?!1:!0;if(b=!b){a:{if(-1!==k){if(0>=g){b=!0;break a}g--}b=!1}if(b=!b){a:{if(-1!==e){if(0>=h){b=!0;break a}h--;a.setCookie(r,h)}b=!1}b=!b}}return b};g=k;h=function(){if(e){var b=a.getCookie(r);return b&&!isNaN(b)?parseInt(b):e}return 0}()},A=function(a,b,e,k){var l=function(a,b){if(a&&"string"===typeof a)if(b+="",a=a.replace(",","."),b=b.replace(",","."),-1!==a.search(/%$/)){a=a.replace("%","");var e=parseFloat(a)/100,k=parseFloat(b);if(!isNaN(e)&&
!isNaN(k)&&0!==e)return k*e+""}else if(e=parseFloat(a),!isNaN(e))return e+"";return"1"},r=function(a){var e=[];switch(b.attribution){case "last":e.push(a.pop());break;case "first":e.push(a.shift());break;default:e=a}return e};this.init=function(){if(a.config.orderValue||"undefined"!==typeof wt_teaserConversions&&wt_teaserConversions){var h=e.getConversion();if(0<h.length)if("undefined"!==typeof wt_teaserConversions&&wt_teaserConversions){for(var g=[],n=0,s=h.length;n<s;n++){var u=h[n];"product"!==
u.cType&&"order"!==u.cGoal&&(u.conf=l(u.cValue,""),g.push(u))}0<g.length&&(h=r(g),k.track("conf",h));b.clearConversions&&(e.deleteGoal(),e.deleteEngagement())}else{for(var g=a.config.product?a.config.product.split(";"):[],n=a.config.productCost?a.config.productCost.split(";"):[],s=[],u=0,m=h.length;u<m;u++){var p=h[u];if("goal"!==p.cGoal){p.conf="";if("product"===p.cType){var q;a:{q=0;for(var f=g.length;q<f;q++)if(g[q]===p.name)break a;q=!1}f="";!1!==q&&(f="undefined"!==typeof n[q]?n[q]:"",p.conf=
l(f,a.config.orderValue))}else p.conf=l(p.cValue,a.config.orderValue);p.conf&&s.push(p)}}0<s.length&&(h=r(s),k.track("conf",h));b.clearConversions&&(e.deleteOrder(),e.deleteEngagement())}}}},B=function(a,e){b.wt_ttv2=b.wt_ttv2||[];var t=new x(a,e.attribution),k=new z(a,{session:e.maxSendTeasers.session,page:e.maxSendTeasers.page,sendMultipleTeaserViews:!1}),v=new s(a,e,t,k),r=new A(a,e,t,k),h=new l({view:{on:e.viewTime,off:e.viewTime},percent:{on:e.viewPercent,off:e.viewPercent}},function(a){for(var b=
[],e=0,f=a.length;e<f;e++)k.wasSeenOrLimitReached(a[e])&&("view"===a[e].wt_ttv2.data.cType&&(t.setEngagement(a[e].wt_ttv2.data),t.setConversion(a[e].wt_ttv2.data)),b.push(a[e].wt_ttv2.data),delete a[e].wt_ttv2.data);0<b.length&&k.track("view",b)}),g=function(b,e){var g=n(e),f=b.querySelectorAll("a,area,button,input[type=submit]"),c=("string"===typeof b.tagName?b.tagName:"string"===typeof b.nodeName?b.nodeName:"").toLowerCase();if("a"===c||"area"===c)f=[b];for(var c=0,d=f.length;c<d;c++)(function(b,
c){"undefined"===typeof b.wt_ttv2&&(b.wt_ttv2={});"undefined"===typeof b.wt_exclude&&(b.wt_ttv2.click=c,a.registerEvent(b,"click",function(){var a=b.wt_ttv2.click;k.track("click",[a]);t.setEngagement(a);t.setConversion(a)}))})(f[c],g)},n=function(a){var b={},e;for(e in a){var f=e+"";b[f]=a[f]}return b},y=function(a){if(a&&null!==a)if("string"===typeof a)try{return document.querySelector(a)}catch(b){}else if("object"===typeof a)return a;return null},u=function(){if(0<arguments.length){var a=arguments;
"undefined"!==typeof a[0].length&&0<a[0].length&&"string"!==typeof a[0][0]&&(a=arguments[0]);h.stop();for(var b=0,e=a.length;b<e;b++)if(a[b]&&null!==a[b])if("string"===typeof a[b][0]&&"object"===typeof a[b][1]){var f=a[b][0],c=a[b][1];if("string"===typeof c.name&&c.name||"string"===typeof c.rank&&c.rank)c.cType="string"===typeof c.cType&&c.cType?c.cType:"product",c.cGoal="string"===typeof c.cGoal&&c.cGoal?c.cGoal:"both","view"===f&&k.wasSeenOrLimitReached({wt_ttv2:{data:c}})?(k.track(f,[c]),"view"===
c.cType&&(t.setEngagement(c),t.setConversion(c))):"click"===f&&(k.track(f,[c]),t.setEngagement(c),t.setConversion(c))}else if(a[b]&&null!==a[b]&&"undefined"!==typeof a[b].selector&&"object"===typeof a[b].data&&("string"===typeof a[b].data.name&&a[b].data.name||"string"===typeof a[b].data.rank&&a[b].data.rank)){f=y(a[b].selector);c=a[b];"object"!==typeof c.conversion&&(c.conversion={});c.conversion.type="string"!==typeof c.conversion.type||"view"!==c.conversion.type&&"click"!==c.conversion.type?"product":
c.conversion.type;c.conversion.goal="string"!==typeof c.conversion.goal||"order"!==c.conversion.goal&&"goal"!==c.conversion.goal?"both":c.conversion.goal;c.conversion.value="string"===typeof c.conversion.value||"number"===typeof c.conversion.value?c.conversion.value+"":"";c.data.cType=c.conversion.type;c.data.cGoal=c.conversion.goal;c.data.cValue=c.conversion.value;if("undefined"!==typeof a[b].exclude&&(c=a[b].exclude,"number"===typeof c.length&&0<c.length))for(var d=0,l=c.length;d<l;d++){var r=y(c[d]);
r&&null!==r&&(r.wt_exclude=!0)}if(c=f)if(c=null!==f)c=f,l=a[b].data,"undefined"===typeof c.wt_ttv2?(d=n(l),l=n(l),c.wt_ttv2={data:d,click:l},"undefined"!==typeof d.seen&&d.seen||h.setItems([c]),c=!0):c=!1;c&&g(f,a[b].data)}h.start()}};this.sendPageEngagement=function(){if(e.autoEngagements||"undefined"!==typeof wt_teaserEngagements&&wt_teaserEngagements){var a=t.getEngagement();0<a.length&&k.track("pi",a)}};this.sendTeaserAttribution=function(){r.init()};this.init=function(){v.searchTeaser();for(var a=
0;a<b.wt_ttv2.length;a++)u(b.wt_ttv2[a]);b.wt_ttv2={push:u,length:0,version:"1.0.5"}}},v=null;"page"===a.mode&&"after"===a.type?(v=new B(a.instance,e),v.sendPageEngagement(),v.init()):"page"===a.mode&&"before"===a.type?(v=new B(a.instance,e),v.sendTeaserAttribution()):"config"===a.mode&&"before"===a.type&&(v=new B(a.instance,e),v.init())}}}})(window);
}
}} catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
/** DO NOT TOUCH BELOW THIS LINE ***************************************************************/
/* @author: Thomas Golz */
if (typeof b["shop_order_id"]!= "undefined"){

var category_parts = b["shop_product_category"];
var category_level = (category_parts || "").split(";");

var price_parts = b["shop_product_price"];
var price_level = (price_parts || "").split(";");

var quantity_parts = b["shop_product_quantity"];
var quantity_level = (quantity_parts || "").split(";");

var duration_parts = b["shop_product_duration"];
var duration_level = (duration_parts || "").split(";");

var order_value = 0;
var product_value = "";

for(var i = 0; i < price_level.length; i++)
{
if (category_level[i] == "contract")
    {
    order_value = order_value + (price_level[i] * duration_level[i] * quantity_level[i]); 
    }
else if (category_level[i] == "contract mbb")
    {
    order_value = order_value + (price_level[i] * duration_level[i] * quantity_level[i]); 
    }
else if (category_level[i] == "endgeraet")
    {
    order_value = order_value + (price_level[i] * duration_level[i] * quantity_level[i] * 0.1);   
    }
else if (category_level[i] == "zubehoer")
    {
    order_value = order_value + (price_level[i] * duration_level[i] * quantity_level[i] * 0.1);   
    }
}
order_value = order_value.toFixed(2);
b["shop_product_value"] = order_value;
}
} } catch(e){ utag.DB(e) }  }];
  utag.handler.cfg_extend=[{"end":0,"alr":0,"bwq":0,"blr":1,"id":"111"},{"bwq":0,"blr":1,"id":"112","alr":0,"end":0},{"blr":1,"id":"125","bwq":0,"alr":0,"end":0},{"bwq":0,"id":"126","blr":1,"alr":0,"end":0},{"blr":0,"id":"94","bwq":0,"alr":1,"end":0},{"end":0,"alr":1,"blr":0,"id":"59","bwq":0},{"end":0,"alr":1,"bwq":0,"blr":0,"id":"34"},{"id":"29","blr":0,"bwq":0,"alr":1,"end":0},{"end":0,"alr":1,"blr":0,"id":"38","bwq":0},{"bwq":0,"blr":0,"id":"39","alr":1,"end":0},{"end":0,"alr":1,"blr":0,"id":"49","bwq":0},{"bwq":0,"blr":0,"id":"78","alr":1,"end":0},{"id":"82","blr":0,"bwq":0,"alr":1,"end":0},{"bwq":0,"id":"86","blr":0,"alr":1,"end":0},{"bwq":0,"blr":0,"id":"129","alr":1,"end":0}];
  utag.loader.initcfg = function(){
    utag.loader.cfg={"8":{load:1,tcat:3,send:1,v:202203140906,wait:1,tid:23012},"33":{load:1,tcat:3,send:1,v:202203031007,wait:1,tid:23012},"62":{load:1,tcat:3,send:1,v:202112151514,wait:1,tid:23012},"58":{load:utag.cond[26],tcat:3,send:1,v:202001160830,wait:1,tid:1203},"59":{load:utag.cond[27],tcat:3,send:1,v:202203031007,wait:1,tid:1203},"60":{load:utag.cond[28],tcat:3,send:1,v:202203031007,wait:1,tid:1203},"61":{load:utag.cond[10],tcat:3,send:1,v:202203031007,wait:1,tid:1203},"23":{load:utag.cond[10],tcat:1,send:1,v:201511301452,wait:1,tid:20011},"28":{load:utag.cond[18],tcat:3,send:1,v:201606210809,wait:1,tid:24004},"29":{load:utag.cond[10],tcat:1,send:1,v:201601051731,wait:1,tid:20011},"40":{load:1,tcat:1,send:1,v:202110151247,wait:1,tid:20010},"49":{load:utag.cond[13],tcat:1,send:1,v:202111180929,wait:1,tid:20011},"43":{load:utag.cond[10],tcat:1,send:1,v:202203140913,wait:1,tid:20011},"46":{load:utag.cond[8],tcat:7,send:1,v:201907290728,wait:1,tid:20010},"48":{load:utag.cond[22],tcat:7,send:1,v:202203140925,wait:1,tid:7132},"50":{load:1,tcat:7,send:1,v:201909051251,wait:1,tid:6026},"52":{load:utag.cond[12],tcat:7,send:1,v:201909051251,wait:1,tid:6026},"53":{load:utag.cond[24],tcat:7,send:1,v:201909051251,wait:1,tid:6026},"54":{load:utag.cond[25],tcat:7,send:1,v:201909051251,wait:1,tid:6026},"55":{load:utag.cond[22],tcat:7,send:1,v:201909051251,wait:1,tid:6026},"56":{load:utag.cond[23],tcat:7,send:1,v:201909051251,wait:1,tid:6026},"77":{load:1,tcat:9,send:1,v:202106140801,wait:1,tid:20067},"78":{load:utag.cond[8],tcat:9,send:1,v:202111221039,wait:1,tid:20010},"79":{load:utag.cond[10],tcat:7,send:1,v:202111221434,wait:1,tid:7117},"87":{load:utag.cond[32],tcat:7,send:1,v:202207201127,wait:1,tid:20067},"95":{load:1,tcat:3,send:1,v:202206161006,wait:1,tid:20010}};
utag.loader.cfgsort=["8","33","62","58","59","60","61","23","28","29","40","49","43","46","48","50","52","53","54","55","56","77","78","79","87","95"];
  }
utag.loader.initcfg();
try {utag.gdpr.applyConsentState();} catch(e) {utag.DB(e)}}
//tealium universal tag - utag.gdpr ut4.0.##UTVERSION##, Copyright ##UTYEAR## Tealium.com Inc. All Rights Reserved.
//tv:3.0.9
utag.gdpr = {
    trackUIDs : [],
    consent_prompt : {
        noShow : false,
        isEnabled : true,
    content : {}
},
preferences_prompt : {
    single_cookie: false,
        noShow : false,
        isEnabled: true,
        defaultState : false,
        content : {},
    categories : {"cdp":{"enabled":"1","id":11},"search":{"id":4,"enabled":"1"},"display_ads":{"enabled":"1","id":3},"social":{"id":7,"enabled":"1"},"mobile":{"enabled":"1","id":12},"analytics":{"enabled":"1","id":1},"cookiematch":{"id":10,"enabled":"1"},"engagement":{"id":13,"enabled":"1"},"personalization":{"enabled":"1","id":6},"big_data":{"enabled":"1","id":8},"email":{"enabled":"1","id":5},"misc":{"enabled":"1","id":9},"affiliates":{"enabled":"1","id":2},"crm":{"id":15,"enabled":"1"},"monitoring":{"id":14,"enabled":"1"}}
},
// Do Not Sell functionality is integrated with GDPR consent logic. The relevant logic is enabled as required
doNotSell : {
    noShow: false,
        isEnabled : false
},
getCategories : function(onlyEnabledCats){
    if (!(utag.gdpr.preferences_prompt && utag.gdpr.preferences_prompt.categories)) {
        return [];
    }
    var length    = utag.gdpr.keys(utag.gdpr.preferences_prompt.categories).length,
        cats      = new Array(length),
        gdpr_cats = utag.gdpr.preferences_prompt.categories;
    for (var cat in gdpr_cats){
        if (!gdpr_cats.hasOwnProperty(cat)) {
            continue;
        }
        var isCatEnabled = gdpr_cats[cat].enabled === true || gdpr_cats[cat].enabled == 1; //The JSON can be true | "1" | 1
        if (onlyEnabledCats && !isCatEnabled) {
            continue;
        }
        cats[gdpr_cats[cat].id - 1] = cat;
    }

    for (var i = cats.length - 1; i >= 0; i--){
        if (cats[i] === undefined) {
            cats.splice(i, 1);
        }
    }

    return cats;
},
getSelectedCategories : function(){
    var sc = [], gc = utag.gdpr.getCategories(), cs = utag.gdpr.getConsentState(), i;

    try {
        if (typeof cs === "number") {
            return (parseInt(cs) === 1) ? gc : sc;
        } else {
            for (i in utag.loader.GV(cs)){
                if ("1" === cs[i].ct) {
                    sc.push(gc[i]);
                }
            }
        }
    }
    catch (e) {
        utag.DB(e);
    }

    return sc;
},
getCategoryLanguage : function(category){
    if (!(utag.gdpr.preferences_prompt && utag.gdpr.preferences_prompt.categories)) {
        return [];
    }
    var language = utag.gdpr.getLanguage(utag.gdpr.preferences_prompt);
    return utag.gdpr.preferences_prompt.languages[language].categories[category];
},
getConsentState : function(){
    var re         = /^c\d+/,
        cd         = utag.gdpr.getCookieValues(),
        np         = 1,
        gc         = utag.gdpr.getCategories(),
        pc         = (function(gc){
            var pc = [];
            for (var i = 0; i < gc.length; i++){
                pc.push({
                    ct : null,
                    name : gc[i]
                });
            }
            return pc;
        }(gc)),
        filteredCD = (function(cd){
            var d = {};
            for (var prop in cd){
                if (!cd.hasOwnProperty(prop)) {
                    continue;
                }
                if (re.test(prop)) {
                    d[prop] = cd[prop];
                }
            }
            return d;
        }(cd));

    filteredCD = utag.gdpr.sortedObject(filteredCD, function(val1, val2){
        var idx1 = parseInt((val1 || "").substring(1), 10),
            idx2 = parseInt((val2 || "").substring(1), 10);
        if (isNaN(idx1) || isNaN(idx2)) {
            return 0;
        }
        return idx1 > idx2 ? 1 : -1;
    });

    for (var cn in utag.loader.GV(filteredCD)){
        if (cn.match(re)) {
            var idx = parseInt(cn.substring(1), 10) - 1,
                ct  = gc[idx];
            pc[idx].ct = cd[cn];
            if (cd[cn] * 1 !== 1) {
                np = 0;
            }
        }
    }
    if (cd.consent) {
        if (cd.consent === true || cd.consent === "true") {
            return np ? np : pc;
        } else {
            return -1;
        }
    } else if (np === 0) {
        return pc;
    } else {
        return 0;
    }
},
getCookieValues : function(){
    var values = {},
        rcd    = (function(){
            var value = "; " + document.cookie;
            var parts = value.split("; " + utag.gdpr.cookieNS + "=");
            if (parts.length == 2) return utag.ut.decode(parts.pop().split(";").shift());
        }()),
        cd     = utag.gdpr.typeOf(rcd) === "string" ? rcd : "";

    if (utag.data && cd) {
        utag.data["cp." + utag.gdpr.cookieNS] = cd;
    }

    if (cd) {
        var i,
            optOut,
            optOutData = decodeURI(cd).split("|");
        for (i = 0; i < optOutData.length; i++){
            optOut = optOutData[i].split(":");
            values[optOut[0]] = optOut[1];
        }
    }
    utag.gdpr.values = values;
    return values;
},
getDeTokenizedContent : function(data, _lang){
    if (utag.gdpr.isEmpty(data)) return null;

    var tokenRegExpPattern = /{{(.*?)}}/gm,
        token_match        = /[{}]/g,
        two_part           = /display_ads|big_data/;

    var lang     = utag.gdpr.getLanguage(data, _lang),
        langData = utag.gdpr.clone(data.languages[lang]);

    for (var t1 in utag.gdpr.sortedObject(langData.common_tokens)){
        if (!langData.common_tokens.hasOwnProperty(t1)) {
            continue;
        }

        langData.common_tokens[t1] = tokenReplace(langData.common_tokens[t1]);
    }

    for (var t2 in utag.gdpr.sortedObject(langData.custom_tokens)){
        if (!langData.custom_tokens.hasOwnProperty(t2)) {
            continue;
        }

        langData.custom_tokens[t2] = tokenReplace(langData.custom_tokens[t2]);
    }

    function tokenReplace(str){
        if (!str) return str;
        var replacements = str.match(tokenRegExpPattern);
        if (!replacements) return str;
        for (var i = 0; i < replacements.length; i++){
            var token = replacements[i].replace(token_match, "") || "";
            var regExpReplaceAll = new RegExp(replacements[i],"g");
            if (langData.common_tokens[token]) {
                str = str.replace(regExpReplaceAll, langData.common_tokens[token]);
            } else if (langData.custom_tokens[token]) {
                str = str.replace(regExpReplaceAll, langData.custom_tokens[token]);
            } else if (langData.categories && token.indexOf("category_") > -1) {
                var split_token = token.split("_");
                if (token.match(two_part)) {
                    split_token[1] = split_token[1] + "_" + split_token[2];
                    split_token.splice(2, 1);
                }
                var category = langData.categories[split_token[1]],
                    key      = {
                        "title" : "name",
                        "description" : "notes"
                    }[split_token[2]];
                if (category[key]) {
                    str = str.replace(regExpReplaceAll, category[key]);
                }
            }
        }
        return str;
    }

    return {
        language: lang,
        tokens: langData,
        js : tokenReplace(data.content.js),
        html : tokenReplace(data.content.html),
        css : tokenReplace(data.content.css)
    };
},
getLanguage : function(promptData, preferredLang){
    var udoName = window.utag.udoname || "utag_data";
    var dataObject = window.utag.data || window[udoName];
    var langLocale = (preferredLang || dataObject[window.utag.cfg.gdprDLRef] || (navigator.languages && navigator.languages[0] || navigator.language || navigator.userLanguage)).toLowerCase();
    var lang = (langLocale || "").split("-")[0];
    if (!promptData) {
        return langLocale;
    }
    var languages = promptData.languages;
    return languages[langLocale] ? langLocale : languages[lang] ? lang : promptData.defaultLang;
},
getTokenLanguage : function(promptData, token, lang){
    if (utag.gdpr.isEmpty(promptData)) return null;
    if (utag.gdpr.isEmpty(token)) return null;

    var getDeTokenizedContent = utag.gdpr.getDeTokenizedContent(promptData, lang);
    var langData = getDeTokenizedContent.tokens;

    if (lang && getDeTokenizedContent.language !== lang) return null;

    if (utag.gdpr.isEmpty(langData)) return null;

    if (langData.common_tokens[token]) {
        return langData.common_tokens[token];
    } else if (langData.custom_tokens[token]) {
        return langData.custom_tokens[token];
    } else if (langData.categories && token.indexOf("category_") > -1) {
        var split_token = token.split("_"),
            category    = langData.categories[split_token[1]];
        if (category[split_token[2]]) {
            return category[split_token[2]];
        }
    }

    return null;
},
refreshCookie:function(){if (utag && utag.DB) {utag.DB("utag.gdpr.refreshCookie has been deprecated");}},
setCookie : function(cookieData){
    utag.DB("Consent Manager: Set Cookie");
    if (utag.gdpr.typeOf(cookieData) !== "object") {
        return;
    }

    if (utag.gdpr.keys(cookieData).length === 0) {
        return;
    }
    var consentType = utag.gdpr.typeOf(cookieData.consent);

    if (consentType === "number") {
        cookieData.consent = cookieData.consent == 1; //convert a 1 to true, everything else is false
        consentType = utag.gdpr.typeOf(cookieData.consent);
    }

    if (consentType !== "boolean" &&
        !(consentType === "string" && (cookieData.consent.toLowerCase() === "true" || cookieData.consent.toLowerCase() === "false"))) {
        utag.DB("Invalid option sent to setCookie [consent must be true/false]");
        return;
    }

    if (utag.gdpr.typeOf(cookieData.ts) !== "number" || (cookieData.ts.toString().length !== 13)) {
        cookieData.ts = new Date().getTime();
    }

    utag.gdpr.values = cookieData;

    var mo2Val = [];

    for (var i in utag.loader.GV(cookieData)){

        if (/^(consent|dns|ts|c\d+)$/.test(i)) {
            mo2Val.push(i + ":" + cookieData[i]);
        } else {
            utag.DB("Invalid option sent to setCookie [" + i + "], is unknown");
        }
    }

    var daysToSet = utag.gdpr.consentPeriod;

    if (!daysToSet) {
        var expiryMonths = cookieData.dns == undefined ? 12 : 13;
        var today = new Date();
        today.setMonth(today.getMonth() + expiryMonths);
            daysToSet = Math.ceil((today.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    }

    var expiry = new Date(cookieData.ts);
    expiry.setDate(expiry.getDate() + daysToSet);

    var cookie_string = [
        utag.gdpr.cookieNS +"="+ encodeURI(mo2Val.join("|")),
        "path=" + utag.gdpr.path,
        "expires=" + expiry.toGMTString()];
    if (utag.gdpr.domain){
        cookie_string.push("domain=" + utag.gdpr.domain);
    }
    document.cookie = cookie_string.join("; ");
    utag.data["cp." + utag.gdpr.cookieNS] = mo2Val.join("|"); // Keep utag.data in sync with what's in the cookie
},
defaultConsentForDoNotSell : function(key, cookieData){
    if (key === 'dns'){ // Fixes the issue where consent is nonexistent in a purely DNS scenario.
        var consentType = utag.gdpr.typeOf(cookieData.consent);
        if (consentType === "undefined") {
            utag.DB("Consent Manager: Defaulting missing consent for Do Not Sell.");
            cookieData.consent = "true";
        }
    }
    return cookieData;
},
setCookieValue : function(key, value){
    utag.DB("Consent Manager: Set Cookie Value");
    if (!key || (utag.gdpr.typeOf(value) === "undefined" || utag.gdpr.typeOf(value) === "null")) return;
    var cookieData = utag.handler.C(utag.gdpr.getCookieValues());
    cookieData[key] = value;
    cookieData = utag.gdpr.defaultConsentForDoNotSell(key, cookieData);

    utag.gdpr.setCookie(cookieData);
},
setConsentValue : function(_response){
    utag.DB("Consent Manager: Set Consent Value: " + _response);
    var valid = {
        true : 1,
        "true" : 1,
        1 : 1,
        false : 0,
        "false" : 0,
        0 : 0
    };
    if (!valid.hasOwnProperty(_response)) {
        throw new Error("No response supplied");
    }
    var response = valid[_response] === 1;
    utag.gdpr.setCookieValue("ts", new Date().getTime()); //timestamp
    utag.gdpr.setCookieValue("consent", response); //response

    utag.gdpr.processQueue(response);
    
},
setPreferencesValues : function(categories, noCollect){
    utag.DB("Consent Manager: Set Preferences Values");
    var i,
        fld,
        cookie_data  = utag.gdpr.getCookieValues(),
        lookup       = {},
        rgx          = /\D/,
        names        = utag.gdpr.getCategories(),
        chosen_list  = [],
        consent_seen = false,
        decline_seen = false,
        crgx         = /c\d/;

    if (utag.gdpr.typeOf(categories) !== "object") {
        utag.DB("Categories is not type object.");
        return;
    }

    try {
        for (i = 0; i < names.length; i++){
            lookup[names[i]] = "c" + (i + 1);
        }
        for (var cat in categories){
            if (!categories.hasOwnProperty(cat)) {
                continue;
            }
            if (categories[cat] !== "1" && categories[cat] !== "0" && categories[cat] !== 1 && categories[cat] !== 0) {
                continue;
            }
            if (cat.match(rgx)) {
                cookie_data[lookup[cat]] = categories[cat];
                if (categories[cat] != 0) {
                    chosen_list.push(cat);
                }
            } else {
                cookie_data["c" + cat] = categories[cat];
                if (categories[cat] != 0) {
                    chosen_list.push(names[cat - 1]);
                }
            }
        }

        for (fld in utag.loader.GV(cookie_data)){
            if (fld.match(crgx)) {
                if (cookie_data[fld] != 0) {
                    consent_seen = true;
                } else {
                    decline_seen = true;
                }
            }
        }
        cookie_data["ts"] = new Date().getTime();
        cookie_data["consent"] = consent_seen;
        utag.gdpr.setCookie(cookie_data);
        utag.gdpr.processQueue(consent_seen);
    }
    catch (e) {
        utag.DB(e);
    }

    if (noCollect) {
        return;
    }

    
},
setAllCategories : function(state, noCollect){
    utag.DB("Consent Manager: Set Preferences All Categories: " + state);
    if (state === undefined) return;
    if (utag.gdpr.typeOf(state) !== "boolean") return;
    var allCats = utag.gdpr.getCategories(), prefs = {};
    for (var i = 0; i < allCats.length; i++){
        prefs["" + (i + 1)] = state ? "1" : "0";
    }
    utag.gdpr.setPreferencesValues(prefs, noCollect);
},
setPreferencesFromList : function(list){
    utag.DB("Consent Manager: Set Preferences From List");
    var prefs = {}, allCats = utag.gdpr.getCategories();
    if (utag.gdpr.typeOf(list) !== "array") {
        utag.DB("List should be of type array");
        return;
    }
    for (var i = 0; i < list.length; i++){
        prefs[list[i]] = "1";
    }
    for (var j = 0; j < allCats.length; j++){
        if (!prefs[allCats[j]]) {
            prefs[allCats[j]] = "0";
        }
    }
    utag.gdpr.setPreferencesValues(prefs);
},
processQueue : function(consent_seen){
    utag.DB("Consent Manager: Processing Consent Queue");
    if (utag.gdpr.noqueue) {
        return;
    }
    if (!consent_seen) {
        utag.gdpr.queue = [];
        return;
    }
    utag.DB("Consent Manager: Processing Consent Queue Length: " + utag.gdpr.queue.length);
    var event, data, conds = {};

    //create a new cond object for us to modify
    utag.gdpr.merge(conds, utag.cond);

    for (var i = 0; i < utag.gdpr.queue.length; i++){
        event = utag.gdpr.queue[i];
        if (!(event.cfg && event.cfg.uids)) {
            data = {};
            //Copy core data over
            utag.loader.RD(data, event.event);
            //Copy data user sent
                utag.gdpr.merge(data, event.data, true);

            //Make sure we reset all conds to 0/false;
            for (var cond in conds){
                if (!conds.hasOwnProperty(cond)) {
                    continue;
                }
                conds[cond] = 0;
            }

            //Need to trigger the BLR extensions before re-processing the load rules
            utag.handler.RE(event.event, data, "blr");

            //Find out what LRs trigger for the data we have
            utag.loader.loadrules(data, conds);

            event.cfg = event.cfg || {};
            event.cfg.uids = [];
            event.data = data;

            //Store conds into utag.conds so that the initcfg can pull them in for setting the tags (& any future extensions)
            utag.cond = conds;
            //Call initcfg so we can get utag.loader.cfg[X].load evaluated
            utag.loader.initcfg();

            //Re-apply consentState
            utag.gdpr.applyConsentState();

            //create an array of UIDs to call, excluding the omittedTags as they have already fired.
            var consentState = utag.gdpr.getConsentState();
            var csType = utag.gdpr.typeOf(consentState);
            for (var id in utag.loader.GV(utag.loader.cfg)){
                if (utag.gdpr.omittedTags[id]) continue;
                var tag = utag.loader.cfg[id];
                if(tag.load && tag.send) {
                    if (tag.tcat !== 0) {
                        if ((csType === "array" && consentState[tag.tcat - 1].ct == "1") ||
                            (csType === "number" && consentState == 1)) {
                            event.cfg.uids.push(id);
                        }
                    } else if (tag.tcat === 0) {
                        event.cfg.uids.push(id);
                    }
                }
            }
        }
        //call old track call with data from the array
        //call - this is correct as we are using the stored event as an object
        if (event.cfg.uids) {
            // make sure that we remove omitted tag uids as these have already gone through the process
            for (var indexCfgUID = event.cfg.uids.length - 1;  indexCfgUID > -1; indexCfgUID--){
                if (!utag.gdpr.omittedTags[event.cfg.uids[indexCfgUID]]) continue;
                event.cfg.uids.splice(indexCfgUID,1);
            }
            utag.gdpr.trackUIDs = utag.gdpr.trackUIDs.concat(event.cfg.uids);
        }
        utag.track_old.call(this, event);
    }

    utag.gdpr.queue = [];

},
typeOf : function(e){
    return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
},
merge : function(a, b, c, d){
    if (c) {
        for (d in utag.loader.GV(b)){
            a[d] = b[d];
        }
    } else {
        for (d in utag.loader.GV(b)){
            if (typeof a[d] == "undefined")
                a[d] = b[d];
        }
    }
},
shouldTagFire : function(taguid){
    if (!taguid && utag.gdpr.typeOf(utag.gdpr.trackUIDs) !== "array") return true;

    var lc = utag.loader.cfg,
        cs = utag.gdpr.getConsentState(),
        uid = taguid || utag.gdpr.trackUIDs.shift();
    //If no uid then this function shouldn't of been called.
    //To be safe we will stop any firing
    if (utag.gdpr.typeOf(uid) === "undefined") return true;
    utag.DB("Consent Manager: Applying consent: " + uid);
    var csTYpe = utag.gdpr.typeOf(cs);
    var tag = lc[uid];

    var blockedTagLookup = utag.gdpr.dns ? utag.gdpr.dns.getBlockedDnsTagLookup() : {};

    if (!utag.gdpr.omittedTags[uid] && tag.send && tag.tcat !== 0) {
        if ((csTYpe === "array" && cs[tag.tcat - 1].ct == "1") ||
            (csTYpe === "number" && cs == 1) ||
            parseInt(blockedTagLookup[uid]) === 1) {
            utag.DB("Consent Manager: Applying consent: " + uid + " allowed to send");
            return false;
        }
    } else if ((utag.gdpr.omittedTags[uid] || tag.tcat == 0) && tag.send){
        utag.DB("Consent Manager: Omitted Tag: " + uid + " allowed to send");
        return false;
    }
    utag.DB("Consent Manager: Applying consent: " + uid + " not allowed to send");
    return true;
},
applyConsentState : function(){
    utag.DB("Consent Manager: Applying consent");
    try {
        var i, lc = utag.loader.cfg, cs = utag.gdpr.getConsentState(),
            ot                          = utag.gdpr.omittedTags;

        if (typeof cs === "number") {

            if ((utag.gdpr.consent_prompt.isEnabled && parseInt(cs) !== 1) ||
                ((!utag.gdpr.consent_prompt.isEnabled && utag.gdpr.preferences_prompt.isEnabled) && parseInt(cs) === -1)) {
                utag.DB("Consent Manager: Setting all tags to off");
                for (i in utag.loader.GV(lc)){
                    if (typeof ot[i] === "undefined") {
                        lc[i].load = 0;
                    }
                }
            }
        } else if (utag.gdpr.consent_prompt.isEnabled || utag.gdpr.preferences_prompt.isEnabled) { // GDPR Partial consent
            utag.DB("Consent Manager: Partial Consent");
            for (i in utag.loader.GV(lc)){
                if (typeof ot[i] === "undefined") {
                    if (lc[i].tcat > 0 && cs[lc[i].tcat - 1].ct != "1") {
                        lc[i].load = 0;
                    }
                }
            }
        }
        // CCPA Do Not Sell
        var btl = utag.gdpr.dns ? utag.gdpr.dns.getBlockedDnsTagLookup() : null;
        utag.DB("Consent Manager: Do Not Sell Tags");
        if (btl) { // If dns isn't in use, this will be null
            for (i in utag.loader.GV(lc)) {
                if (parseInt(btl[i]) === 1) {
                    lc[i].load = 0;
                }
            }
        }

    }
    catch (e) {
        utag.DB(e);
    }
},
updateConsentCookie : function(consent_categories){
    utag.DB("Consent Manager: Updating consent cookie");
    var list,
        listType = utag.gdpr.typeOf(consent_categories);
    if (listType === "string") {
        list = consent_categories.split(/\s*,\s*/);
    } else if (listType !== "array") {
        list = [];
    } else {
        list = consent_categories.slice();
    }

    if (list.length === 0) {
        utag.gdpr.setConsentValue(false);
        utag.gdpr.setAllCategories(false);
        return;
    }

    utag.gdpr.setPreferencesFromList(list);
},
keys : function(obj){
    if (Object.keys) {
        return Object.keys(obj);
    }
    var array = [];
    for (var prop in obj){
        if (!obj.hasOwnProperty(prop)) {
            continue;
        }
        array.push(prop);
    }
    return array;
},
sortedObject : function(obj, func){
    var _obj = {};
    if (obj !== undefined) {
        var _k1 = utag.gdpr.keys(obj).sort(func);
        for (var z = 0; z < _k1.length; z++){
            _obj[_k1[z]] = obj[_k1[z]];
        }
    }
    return _obj;
},
clone: function(a) {
    var level = 0;
    return cloner(a);
    function cloner(a){
        var b = {};
        var c;
        level++;
        if (level === 5) return a;
        for (c in utag.loader.GV(a)) {
            if (utag.gdpr.typeOf(a[c]) === "array") {
                b[c] = a[c].slice(0)
            } else if (utag.gdpr.typeOf(a[c]) === "object") {
                b[c] = cloner(a[c]);
            } else {
                b[c] = a[c];
            }
        }
        level--;
        return b;
    }
},
isEmpty : function(obj){
    var t = utag.gdpr.typeOf(obj);
    switch (t){
        case "string":
        case "array":
            return obj.length === 0;
        case "object":
            for (var p in obj){
                if (!obj.hasOwnProperty(p)) {
                    continue;
                }
                return false;
            }
        default:
            return true;
    }
},
queue : [],
    domain : window.utag_cfg_ovrd && window.utag_cfg_ovrd.domain || utag.cfg.domain,
    path : window.utag_cfg_ovrd && window.utag_cfg_ovrd.cookie_path || "/",
    noqueue : window.utag_cfg_ovrd && window.utag_cfg_ovrd.nogdprqueue || false,
    noview : window.utag_cfg_ovrd && window.utag_cfg_ovrd.noview || false,
    consentPeriod : (window.utag_cfg_ovrd && window.utag_cfg_ovrd.consentPeriod) || 0,
    cookieNS : window.utag_cfg_ovrd && window.utag_cfg_ovrd.cmcookiens || "CONSENTMGR",
    eventProfile : window.utag_cfg_ovrd && window.utag_cfg_ovrd.cmeventprofile || "main" || "main",
    omittedTags : {"33":1,"8":1,"77":1}
};

if (window.utag_cfg_ovrd && window.utag_cfg_ovrd.domain == ""){
    utag.gdpr.domain = "";
}

utag.loader.initdataOld = utag.loader.initdata;
utag.loader.initdata = function(){
    utag.loader.initdataOld();
    if (utag.gdpr.getConsentState() !== 0) return;
    if (utag.gdpr.noview) return;
    if (!utag.loader.rd_flag && !utag.gdpr.noqueue) {
        utag.gdpr.queue.push({
            event : "view",
            data : utag.handler.C(utag.data)
        });
    }
};

utag.gdpr.promptEnabledSetting = function() {
    if (!utag.gdpr.dr && (utag.cfg.readywait || utag.cfg.waittimer)) {
        utag.gdpr.dr = 1;
        return;
    }
    if (utag.gdpr.consent_prompt.isEnabled === true && !(1)) {
        utag.gdpr.consent_prompt.isEnabled = false;
    }
    if (utag.gdpr.doNotSell.isEnabled === true && !(1)) {
        utag.gdpr.doNotSell.isEnabled = false;
    }
}

utag.preOld = utag.pre;
utag.pre = function(){
    utag.preOld();
    utag.gdpr.promptEnabledSetting();
    utag.pre = utag.preOld;
};

utag.gdpr.consent_prompt.languages={"nl":{"common_tokens":{"message":"Cookies en vergelijkbare technologie&euml;n kunnen worden gebruikt om informatie op uw eindapparaat op te slaan, aan te vullen en uit te lezen. Door op &bdquo;accepteer alles&ldquo; te klikken, accepteert u toegang tot uw eindapparaat en de verwerking van uw <i title=\"\n• HTTP-headerinformatie (inclusief IP-adres, webbrowserinformatie, paginalocatie, document, website-URL, dag en tijdstip van gebruik),\n• Pixelspecifieke gegevens (bijv. pixel-ID),\n• Gebruiksgegevens van de website (gezochte producten, verrichte bestellingen, bekeken pagina's),\n• Contractgegevens (geboekte prijzen/producten uitsluitend voor Telekom-doeleinden, geen gebruik door derden),\n• Sociaal-demografische gegevens (leeftijdsgroep, postcodegebied (bijv. 532xx Bonn) en geslacht),\n• E-mailadres voor apparaatoverschrijdende profielen\n\">gegevens</i>, het aanmaken en verwerken van individuele gebruiksprofielen op websites, partnerwebsites en apparaten, en de overdracht van uw gegevens aan derden, waarvan een sommigen uw gegevens in landen buiten de Europese Unie opslaan (AVG art. 49). Telekom kan onder omstandigheden niet in alle gevallen garanderen dat het Europese niveau van gegevensbescherming wordt nageleefd. Details vindt u onder <a href=\"{{privacy_policy_link}}\" class=\"cl-link cl-data-privacy-url\" tabindex=\"1\">Privacybeleid</a>. Een deel van de gegevens wordt aangevuld met sociaal-demografische informatie (bijv. geslacht, leeftijd en postcodegebied) en gebruikt voor analyse, retargeting en gepersonaliseerde inhoud en voor de weergave van aanbiedingen op de Telekom-website en advertenties op websites van derden. U verklaart zich er eveneens mee akkoord dat uw gegevens voor eigen doeleinden van partners worden gebruikt en andere gegevens worden samengevoegd.\n<br><br>\nDoor ons uw toestemming te gegeven voor de informatieservice en cookies wordt gepseudonimiseerde informatie uit uw contracten en sociaal-demografische gegevens (bijv. leeftijd, geboekte producten) via een cookie en aan uw web-/appgegevens gekoppelde e-mail-hash gebruikt voor de weergave van individuele aanbiedingen op Telekom en websites van derden.\n<br><br>\nMeer informatie, ook over gegevensverwerking door derden en de mogelijkheid om uw toestemming op elk moment in te trekken, vindt u in de instellingen en in onze informatie over Privacybeleid.","title":"Toestemming voor gegevensverwerking","confirmation_button":"Accepteer alles"},"custom_tokens":{"opt_in":"","privacy_policy_text":"","advanced_settings_button":"Instellingen wijzigen","opt_out":"","privacy_policy":"Privacybeleid","reject_button":"Alleen vereist","privacy_policy_url":"","imprint":"Afdruk","privacy_policy_link":"https://www.telekom.de/ueber-das-unternehmen/datenschutz","company_logo_url":"","imprint_link":"https://www.telekom.de/impressum"},"isDefault":"false"},"fr":{"isDefault":"false","custom_tokens":{"advanced_settings_button":"Modifier les param&egrave;tres","opt_out":"","privacy_policy":"Protection des donn&eacute;es","reject_button":"Seulement n&eacute;cessaire","privacy_policy_url":"","opt_in":"","privacy_policy_text":"","privacy_policy_link":"https://www.telekom.de/ueber-das-unternehmen/datenschutz","company_logo_url":"","imprint_link":"https://www.telekom.de/impressum","imprint":"Mentions l&eacute;gales"},"common_tokens":{"confirmation_button":"Tout accepter","message":"Les cookies et les technologies similaires permettent d&rsquo;enregistrer, d&rsquo;enrichir et de lire des informations sur votre terminal. En cliquant sur &bdquo;tout accepter&ldquo; vous acceptez l&rsquo;acc&egrave;s &agrave; votre terminal ainsi que le traitement de vos <i title=\"\n• Informations d&rsquo;en-t&ecirc;te HTTP (notamment adresse IP, informations sur le navigateur web, emplacement d&rsquo;enregistrement des pages, document, URL du site web, date et heure de l&rsquo;utilisation), \n• Donn&eacute;es sp&eacute;cifiques au pixel (par exemple ID de pixel),\n• Donn&eacute;es d&rsquo;utilisation du site web (produits recherch&eacute;s, commandes pass&eacute;es, pages consult&eacute;es),\n• Donn&eacute;es contractuelles (forfaits/produits achet&eacute;s exclusivement &agrave; des fins Telekom, pas d&rsquo;utilisation par des tiers),\n• Donn&eacute;es sociod&eacute;mographiques (tranche d&rsquo;&acirc;ge, zone de code postal (par exemple 532xx Bonn) et sexe),\n• Adresse e-mail pour les profils multi-appareils\n\">donn&eacute;es</i>, la cr&eacute;ation et le traitement de profils d&rsquo;utilisation individuels sur l&rsquo;ensemble de sites web, dispositifs et aupr&egrave;s de nos partenaires, ainsi que la transmission de vos donn&eacute;es &agrave; des prestataires tiers, qui traitent parfois vos donn&eacute;es dans des pays situ&eacute;s en dehors de l&rsquo;Union europ&eacute;enne (RGPD, art. 49). Dans certains cas, Telekom ne peut garantir le respect du niveau de protection des donn&eacute;es qui s&rsquo;applique &agrave; l&rsquo;Europe. Vous trouverez tous les d&eacute;tails sous <a href=\"{{privacy_policy_link}}\" class=\"cl-link cl-data-privacy-url\" tabindex=\"1\">Protection des donn&eacute;es</a>. Les donn&eacute;es sont en partie compl&eacute;t&eacute;es par des informations sociod&eacute;mographiques (telles que le sexe, la tranche d&rsquo;&acirc;ge/d&eacute;cennie et la zone de code postal) et sont utilis&eacute;es &agrave; des fins d&rsquo;analyse, de reciblage publicitaire et de diffusion de contenus et d&rsquo;offres personnalis&eacute;s sur des sites de Telekom, pour la diffusion de publicit&eacute; sur des sites de prestataires tiers, ainsi que pour les propres fins des partenaires, et sont associ&eacute;es &agrave; des donn&eacute;es.\n<br><br>\nSi vous nous avez donn&eacute; votre consentement au service d&rsquo;information et aux cookies, nous prenons &eacute;galement en compte pour la diffusion d&rsquo;offres individuelles sur les sites de Telekom et des prestataires tiers des informations pseudonymis&eacute;es issues de vos contrats et donn&eacute;es socio-d&eacute;mographiques (par exemple tranche d&rsquo;&acirc;ge/d&eacute;cennie, produits achet&eacute;s), qui sont affect&eacute;es &agrave; vos donn&eacute;es d&rsquo;utilisation web/app au moyen d&rsquo;un cookie et d&rsquo;une adresse e-mail hach&eacute;e.\n<br><br>\nVous trouverez de plus amples informations, notamment sur le traitement des donn&eacute;es par des prestataires tiers et sur la possibilit&eacute; de r&eacute;voquer votre consentement &agrave; tout moment, dans les param&egrave;tres ainsi que dans nos informations sur la protection des donn&eacute;es.","title":"Consentement au traitement de donn&eacute;es"}},"es":{"isDefault":"false","custom_tokens":{"opt_in":"","privacy_policy_text":"","opt_out":"","advanced_settings_button":"Cambiar los ajustes","privacy_policy":"Protecci&oacute;n de datos","reject_button":"Solo necesario","privacy_policy_url":"","imprint":"Aviso legal","privacy_policy_link":"https://www.telekom.de/ueber-das-unternehmen/datenschutz","company_logo_url":"","imprint_link":"https://www.telekom.de/impressum"},"common_tokens":{"confirmation_button":"Aceptar todo","message":"Por medio de cookies y tecnolog&iacute;as similares se puede almacenar, acumular y leer informaci&oacute;n en su terminal. Al hacer clic en &bdquo;aceptar todo&ldquo; est&aacute; aceptando el acceso a su terminal, el tratamiento de sus <i title=\"\n• Informaci&oacute;n de cabecera HTTP (entre otros, direcci&oacute;n IP, informaci&oacute;n sobre el navegador web, ubicaci&oacute;n de la p&aacute;gina, documento, URL de la p&aacute;gina web, fecha y hora de uso), \n• Datos espec&iacute;ficos de p&iacute;xeles (p. ej., ID de p&iacute;xel)\n• Datos de uso de la p&aacute;gina web (productos buscados, pedidos efectuados, p&aacute;ginas a las que haya accedido),\n• Datos contractuales (tarifas/productos contratados \t&uacute;nicamente para fines de Telekom, sin uso de terceros),\n• Datos sociodemogr&aacute;ficos (grupo de edad, c&oacute;digo postal [p. ej., 532xx Bonn] y sexo),\n• Direcci&oacute;n de correo electr&oacute;nico para perfiles correspondientes a diferentes dispositivos\n\">datos</i>, y la creaci&oacute;n y el tratamiento de perfiles de uso individuales para diferentes p&aacute;ginas web, socios y dispositivos, as&iacute; como la transmisi&oacute;n de sus datos a terceros proveedores que, en algunos casos, realizan el tratamiento de sus datos en pa&iacute;ses de fuera de la Uni&oacute;n Europea (art. 49 del RGPD). En determinadas circunstancias, es posible que Telekom no pueda garantizar que el nivel de privacidad europeo se respete en todos los casos. Encontrar&aacute; los detalles en <a href=\"{{privacy_policy_link}}\" class=\"cl-link cl-data-privacy-url\" tabindex=\"1\">Protecci&oacute;n de Datos</a>. Los datos se complementan parcialmente con informaci&oacute;n sociodemogr&aacute;fica (p. ej., sexo, segmento de edad y c&oacute;digo postal) y se utilizan y combinan con otros datos para el an&aacute;lisis, el retargeting y la reproducci&oacute;n de contenidos y ofertas personalizados en las p&aacute;ginas de Telekom, para la reproducci&oacute;n de publicidad en p&aacute;ginas de terceros proveedores y para fines propios de los socios.\n<br><br>\nSi nos ha otorgado su consentimiento para el servicio de informaci&oacute;n y para el uso de cookies, tendremos en cuenta para la reproducci&oacute;n individual de ofertas en las p&aacute;ginas de Telekom y de terceros proveedores tambi&eacute;n la informaci&oacute;n seudonimizada de sus contratos y los datos sociodemogr&aacute;ficos (p. ej., segmento de edad, productos contratados), que se asignar&aacute;n a sus datos de uso de la web y de la aplicaci&oacute;n a trav&eacute;s de una cookie y de un hash de correo electr&oacute;nico.\n<br><br>\nEn los ajustes y en nuestros avisos de privacidad encontrar&aacute; m&aacute;s informaci&oacute;n, incluyendo informaci&oacute;n sobre el tratamiento de los datos por parte de terceros proveedores y sobre la posibilidad de revocar su consentimiento en cualquier momento.","title":"Consentimiento para el tratamiento de datos"}},"en":{"isDefault":"false","custom_tokens":{"privacy_policy_url":"","reject_button":"Only required","privacy_policy":"Privacy Policy","opt_out":"","advanced_settings_button":"Change settings","privacy_policy_text":"","opt_in":"","company_logo_url":"","imprint_link":"https://www.telekom.de/impressum","privacy_policy_link":"https://www.telekom.de/ueber-das-unternehmen/datenschutz","imprint":"Imprint"},"common_tokens":{"confirmation_button":"Agree to all","title":"Consent to data processing","message":"Cookies and similar technologies can be used to store, enrich and read information on your device. By clicking on &bdquo;Agree to all&ldquo; you agree to allow access to your device and also to the processing of your  <i title=\"\n• HTTP header information (including IP address, information about the web browser, page location, document, URL of the website, date and time of use), \n• Pixel-specific data (such as pixel ID),\n• Website usage data (searched products, orders placed, accessed pages),\n• Contract data (booked tariffs/products exclusively for Telekom purposes, no third-party use),\n• Socio-demographic data (age group, ZIP code area (e.g. 532xx Bonn and gender),\n• Email address for cross-device profiles\n\">data</i>, the creation and processing of individual usage profiles across websites and across partners and devices, and the transfer of your data to third-party providers, some of whom process your data in countries outside the European Union (GDPR Art. 49). Telekom may not be able to ensure compliance with the European level of data protection in all cases. For details, see <a href=\"{{privacy_policy_link}}\" class=\"cl-link cl-data-privacy-url\" tabindex=\"1\">privacy policy</a>. Some of the data is supplemented with socio-demographic information (e.g., sex, age decade, and ZIP code area) and is used for analysis purposes, retargeting, and displaying personalized content and offers on Deutsche Telekom pages; it is also used for displaying advertising on third-party sites as well as for the partners’ own purposes, and in some cases, it is merged with other data.\n<br><br>\nIf you have given us your consent to the information service as well as your consent to cookies, we shall also take into account pseudonymous information from your contracts and socio-demographic data (e.g., age decade, booked products), which can be assigned to your web/app usage data via a cookie or email hash, for the individual placement of advertising on Deutsche Telekom and third-party sites.\n<br><br>\nFor more details, also in relation to data processing by third-party providers and the revocation of your consent, which can be declared at any time, please refer to the settings and our privacy policy."}},"de":{"common_tokens":{"title":"Einwilligung in die Datenverarbeitung","message":"Mittels Cookies und &auml;hnlicher Technologien k&ouml;nnen Informationen auf Ihrem Endger&auml;t gespeichert, angereichert und gelesen werden. Mit einem Klick auf &bdquo;Alle akzeptieren&ldquo; stimmen Sie dem Zugriff auf Ihr Endger&auml;t zu sowie der Verarbeitung Ihrer <i title=\"\n• HTTP Header-Informationen (u.a. IP-Adresse, Informationen zum Webbrowser, Seitenspeicherort, Dokument, URL der Webseite, Tag und Uhrzeit der Nutzung), \n• Pixelspezifische Daten (wie z.B. Pixel-ID)\n• Nutzungsdaten der Webseite (gesuchte Produkte, get&auml;tigte Bestellungen, aufgerufene Seiten)\n• Vertragsdaten (gebuchte Tarife/Produkte ausschlie&szlig;lich TDG Zwecke, keine Drittnutzung)\n• Soziodemografische Daten (Altersgruppe, PLZ-Bereich (z.B. 532xx Bonn) und Geschlecht)\n• E-Mail-Adresse f&uuml;r ger&auml;te&uuml;bergreifende Profile\n\">Daten</i>, der Webseiten- sowie partner- und ger&auml;te&uuml;bergreifenden Erstellung und Verarbeitung von individuellen Nutzungsprofilen sowie der Weitergabe Ihrer Daten an Drittanbieter, die zum Teil Ihre Daten in L&auml;ndern au&szlig;erhalb der europ&auml;ischen Union verarbeiten (DSGVO Art. 49). Die Telekom kann unter Umst&auml;nden nicht in allen F&auml;llen sicherstellen, dass das europ&auml;ische Datenschutzniveau eingehalten wird. Details finden Sie unter <a href=\"{{privacy_policy_link}}\" class=\"cl-link cl-data-privacy-url\" tabindex=\"1\">Datenschutz</a>. Die Daten werden teilweise mit soziodemografischen Informationen (wie z.B. Geschlecht, Altersdekade und PLZ-Bereich) erg&auml;nzt und f&uuml;r Analysen, Retargeting und zur Ausspielung von personalisierten Inhalten und Angeboten auf Seiten der Telekom, als auch zur Werbeausspielung auf Drittanbieterseiten, sowie zu eigenen Zwecken von Partnern genutzt und mit Daten zusammengef&uuml;hrt.\n<br><br>\nWenn Sie uns Ihre Einwilligung zum Informationsservice sowie Ihre Cookie Einwilligung erteilt haben, ber&uuml;cksichtigen wir zur individuellen Angebotsausspielung auf Telekom und Drittanbieterseiten auch pseudonymisierte Informationen aus Ihren Vertr&auml;gen und soziodemografische Daten (z.B. Altersdekade, gebuchte Produkte), die &uuml;ber einen Cookie und einen E-Mail-Hash Ihren Web-/Appnutzungsdaten zugeordnet werden.\n<br><br>\nWeitere Informationen, auch zur Datenverarbeitung durch Drittanbieter und zum jederzeit m&ouml;glichen Widerrufs Ihrer Einwilligung, finden Sie in den Einstellungen sowie in unseren Datenschutzhinweisen.","confirmation_button":"Alle akzeptieren"},"display_name":"German (de)","custom_tokens":{"imprint":"Impressum","imprint_link":"https://www.telekom.de/impressum","reject_button":"Nur erforderliche","privacy_policy":"Datenschutzhinweis","privacy_policy_link":"https://www.telekom.de/ueber-das-unternehmen/datenschutz","advanced_settings_button":"Einstellungen &auml;ndern"},"isDefault":"true"}};utag.gdpr.consent_prompt.content.css=window.TEALIUM.consent_prompt.css;utag.gdpr.consent_prompt.content.html=window.TEALIUM.consent_prompt.html;utag.gdpr.consent_prompt.content.js=window.TEALIUM.consent_prompt.js;utag.gdpr.consent_prompt.defaultLang="de";utag.gdpr.showExplicitConsent=function(_lang){var cn=document.getElementById("__tealiumGDPRecStyle");if(cn){cn.parentNode.removeChild(cn);}var hn=document.getElementById("__tealiumGDPRecModal");if(hn){hn.parentNode.removeChild(hn);}var sn=document.getElementById("__tealiumGDPRecScript");if(sn){sn.parentNode.removeChild(sn);}var dtc=utag.gdpr.getDeTokenizedContent(utag.gdpr.consent_prompt,_lang);var head=document.head||document.getElementsByTagName("head")[0],style=document.createElement("style"),mDiv=document.createElement("div"),scr=document.createElement("script"),body=document.body||document.getElementsByTagName("body")[0];style.type="text/css";style.id="__tealiumGDPRecStyle";if(style.styleSheet){style.styleSheet.cssText=dtc.css;}else{style.appendChild(document.createTextNode(dtc.css));}head.appendChild(style);mDiv.innerHTML=dtc.html;mDiv.id="__tealiumGDPRecModal";body.appendChild(mDiv);scr.language="javascript";scr.type="text/javascript";scr.text="try{"+dtc.js+"} catch(e){utag.DB(e)}";scr.id="__tealiumGDPRecScript";head.appendChild(scr);};
utag.gdpr.preferences_prompt.languages={"nl":{"custom_tokens":{"category_analytics_detail":"Aanbieders gebruiken analysecookies om gebruiks- en herkenningsopties te verzamelen in zogenaamde pseudonieme gebruikersprofielen. Zo worden analysecookies bijvoorbeeld gebruikt om het aantal individuele bezoekers van een website of dienst te bepalen of om andere statistieken te verzamelen over de werking van onze producten, en om gebruikersgedrag te analyseren op basis van anonieme en pseudonieme informatie over hoe bezoekers de website gebruiken. Deze gebruikersprofielen kunnen niet direct naar een persoon worden teruggeleid.","company_logo_url":"","expand_detail_button":"Meer informatie","category_display_ads_detail":"Marketingcookies worden gebruikt om interessante advertentie-inhoud weer te geven en om de effectiviteit van onze campagnes te meten. Dit gebeurt niet alleen op de websites van Telekom, maar ook op sites van andere reclamepartners (derden). Dit noemt men ook wel retargeting. Het wordt gebruikt om pseudonieme inhouds-of advertentieprofielen samen te stellen, relevante advertenties op andere websites te plaatsen en om inzichten af te leiden over doelgroepen die de advertenties en inhoud bekijken. Voor interessegerichte samenstelling van doelgroepen van aangemelde gebruikers (bestandsklanten) wordt rekening gehouden met informatie over gekochte producten, tarieven, opties en contractverlengingen. De toewijzing van gebruiksgedrag en contractinformatie gebeurt door verschillende cookie-ID&apos;s te vergelijken met het gehashte e-mailadres. Deze gebruikersprofielen kunnen niet direct naar een persoon worden teruggeleid. Marketing- en retargetingcookies helpen ons om voor u mogelijke relevante advertentie-inhoud weer te geven. Door het onderdrukken van marketingcookies zult u dezelfde hoeveelheid reclame blijven zien, maar zal ze mogelijk minder relevant zijn voor u. Meer informatie vindt u <a class=\"cl-link cl-data-privacy-url\" href=\"https://www.telekom.de/ueber-das-unternehmen/datenschutz\" tabindex=\"1\">hier</a>.","accept_choice_button":"Selectie bevestigen","privacy_link":"https://www.telekom.de/ueber-das-unternehmen/datenschutz","category_required_description":"Deze cookies zijn noodzakelijk voor het gebruik van de websitepagina&apos;s en essenti&euml;le functies.","privacy":"Privacybeleid","category_required_detail":"Ze maken basisfuncties mogelijk, zoals de verwerking van bestellingen in de onlineshop en de toegang tot beveiligde delen van de website. Daarnaast dienen ze voor anonieme evaluatie van het gebruikersgedrag op basis waarvan we onze website verder ontwikkelen.","privacy_policy_url":"","collapse_detail_button":"Minder informatie","category_required_title":"Vereiste cookies","required":"Verplicht","privacy_policy_text":"","category_social_detail":"Wanneer u Telekom-pagina&apos;s bezoekt, worden gegevens verzameld door middel van cookies of vergelijkbare technologie&euml;n en doorgegeven aan derden, deels voor eigen doeleinden van Telekom. Voor meer informatie over doeleinden en rechtsgronden van verdere verwerking voor eigen doeleinden van derde aanbieders, verwijzen we naar het privacybeleid van de externe aanbieder (Google, Facebook, LinkedIn, emetriq etc.). De informatie over onafhankelijke externe aanbieders vindt u <a class=\"cl-link cl-data-privacy-url\" href=\"{{privacy_link}}\" tabindex=\"1\">hier</a>. <br> We maken ook gebruik van een mechanisme voor cross-deviceprofilering door middel van ID&apos;s en e-mailhash op onze websites en we dragen deze en sociaal-demografische gegevens, zoals postcode, leeftijdsgroep en geslacht, over aan ons partnerbedrijf emetriq GmbH. Dat bedrijf combineert de informatie en verwerkt ze met eigen gegevens voor reclameprofilering voor eigen doeleinden. Gedetailleerde informatie vindt u <a class=\"cl-link cl-data-privacy-url\" href=\"{{privacy_link}}\" tabindex=\"1\">hier</a>. Telekom Deutschland GmbH en emetriq GmbH zijn gezamenlijk verantwoordelijk voor cross-deviceprofilering in overeenstemming met artikel 26 AVG. Meer informatie over de verantwoordelijkheid van de partners en uw respectievelijke rechten vindt u <a class=\"cl-link cl-data-privacy-url\" href=\"{{privacy_link}}\" tabindex=\"1\">hier</a>."},"categories":{"personalization":{"notes":"","name":""},"engagement":{"notes":"","name":""},"cookiematch":{"notes":"","name":""},"big_data":{"name":"","notes":""},"crm":{"name":"","notes":""},"affiliates":{"notes":"","name":""},"misc":{"name":"","notes":""},"email":{"name":"","notes":""},"monitoring":{"name":"","notes":""},"cdp":{"notes":"","name":""},"display_ads":{"name":"Marketingcookies","notes":"Deze cookies en soortgelijke technologie&euml;n worden gebruikt om u gepersonaliseerde relevante advertentie-inhoud te kunnen tonen op de websites van Telekom en van derden. "},"search":{"notes":"","name":""},"mobile":{"notes":"","name":""},"social":{"notes":"Op de websitepagina&apos;s van Telekom worden diensten van externe leveranciers aangeboden die hun diensten op eigen verantwoordelijkheid of onder gezamenlijke verantwoordelijkheid met Telekom Deutschland GmbH leveren. Daarbij worden gegevens en informatie aan de externe aanbieders overgedragen, voor hun eigen reclamedoeleinden verwerkt en samengevoegd met gegevens van derden.","name":"Diensten van andere bedrijven (onafhankelijke externe aanbieders)"},"analytics":{"notes":"Deze cookies helpen ons om het gebruiksgedrag beter te begrijpen.","name":"Analytische cookies"}},"common_tokens":{"confirmation_button":"Alles accepteren","yes":"Toestaan","message":"Wij gebruiken cookies voor een gepersonaliseerde weergave van onze website. Hieronder vallen niet alleen cookies voor de werking en optimalisatie van de site, maar ook cookies voor diensten zoals tekst- of videochat en reclame op basis van uw gebruiksgedrag online. Zo is het bijvoorbeeld mogelijk om vast te stellen of u onze pagina&apos;s herhaaldelijk bezoekt vanaf hetzelfde apparaat. We willen u de keuze geven welke cookies u toestaat:","no":"Niet toestaan","title":"Uw privacy-instellingen beheren"},"isDefault":"false"},"es":{"common_tokens":{"title":"Gestione la configuraci&oacute;n de su privacidad","no":"No permitir","message":"Utilizamos cookies para ofrecerle una experiencia &oacute;ptima en nuestras p&aacute;ginas web. Hay cookies para el buen funcionamiento y la optimizaci&oacute;n de la p&aacute;gina, as&iacute; como para servicios como el uso de los chats de texto o de v&iacute;deo, o para publicidad orientada en funci&oacute;n de su comportamiento de uso online. As&iacute; sabemos, por ejemplo, si suele visitar nuestras p&aacute;ginas desde el mismo dispositivo. Queremos darle la posibilidad de seleccionar las cookies que desea permitir:","confirmation_button":"Aceptar todas","yes":"Permitir"},"categories":{"analytics":{"notes":"Estas cookies nos ayudan a comprender mejor el comportamiento de uso.","name":"Cookies anal&iacute;ticas"},"mobile":{"name":"","notes":""},"social":{"name":"Servicios de otras empresas (terceros proveedores independientes)","notes":"Las p&aacute;ginas de Telekom incluyen servicios de terceros proveedores que ofrecen sus servicios de manera independiente o bajo la responsabilidad conjunta con Telekom Deutschland GmbH. En este caso, los datos y la informaci&oacute;n se transmiten a terceros proveedores, se tratan con fines publicitarios propios y se combinan con datos de terceros."},"display_ads":{"notes":"Estas cookies y otras tecnolog&iacute;as similares se utilizan para poder mostrarle contenidos publicitarios personalizados y, por tanto, relevantes en las p&aacute;ginas de Telekom y de terceros proveedores.","name":"Cookies de marketing"},"search":{"notes":"","name":""},"cdp":{"name":"","notes":""},"monitoring":{"notes":"","name":""},"crm":{"name":"","notes":""},"misc":{"notes":"","name":""},"email":{"notes":"","name":""},"affiliates":{"name":"","notes":""},"big_data":{"notes":"","name":""},"personalization":{"notes":"","name":""},"engagement":{"name":"","notes":""},"cookiematch":{"notes":"","name":""}},"custom_tokens":{"privacy":"Aviso de privacidad","category_required_detail":"Posibilitan funciones b&aacute;sicas como la tramitaci&oacute;n de los pedidos en la tienda online o el acceso a las &aacute;reas protegidas de la p&aacute;gina web. Tambi&eacute;n las utilizamos para la evaluaci&oacute;n an&oacute;nima del comportamiento de uso y as&iacute; desarrollar de forma continua nuestra presencia en la web para usted.","category_required_description":"Estas cookies son necesarias para poder navegar por las p&aacute;ginas y utilizar las funciones esenciales.","privacy_link":"https://www.telekom.de/ueber-das-unternehmen/datenschutz","category_display_ads_detail":"Las cookies de marketing se emplean para mostrar contenidos publicitarios interesantes y para medir la efectividad de nuestras campa&ntilde;as. Esto no solo sucede en las p&aacute;ginas web de Telekom, sino tambi&eacute;n en otras p&aacute;ginas de socios anunciantes (terceros proveedores). Esta t&eacute;cnica se denomina tambi&eacute;n &laquo;retargeting&raquo; y sirve para crear perfiles seud&oacute;nimos de contenidos o anuncios, para mostrar publicidad relevante en otras p&aacute;ginas web y para deducir informaci&oacute;n relativa a los grupos objetivo que han visto los anuncios y contenidos. Para crear una especificaci&oacute;n de grupos objetivo que responda a los intereses de los usuarios conectados (clientes actuales) se tiene en cuenta la informaci&oacute;n sobre productos adquiridos, tarifas, opciones y pr&oacute;rrogas de contratos. La asignaci&oacute;n del comportamiento de uso y la informaci&oacute;n contractual se realiza mediante una comparaci&oacute;n de diferentes ID de cookies con las direcciones de correo electr&oacute;nico transformadas en hash. Estos datos no incluyen ninguna informaci&oacute;n que pueda relacionarse directamente con una persona. Las cookies de marketing y retargeting nos ayudan a mostrarle contenido publicitario potencialmente relevante para usted. Si bloquea las cookies de marketing, usted seguir&aacute; viendo la misma cantidad de publicidad, pero esta ser&aacute; posiblemente menos relevante para usted. Encontrar&aacute; m&aacute;s informaci&oacute;n <a class=\"cl-link cl-data-privacy-url\" href=\"https://www.telekom.de/ueber-das-unternehmen/datenschutz\" tabindex=\"1\">aqu&iacute;</a>.","accept_choice_button":"Confirmar selecci&oacute;n","expand_detail_button":"Ampliar","company_logo_url":"","category_analytics_detail":"Las cookies anal&iacute;ticas permiten a los proveedores iniciales o terceros recoger las opciones de uso y reconocimiento en los llamados perfiles de uso pseud&oacute;nimos. Utilizamos las cookies anal&iacute;ticas, por ejemplo, para calcular el n&uacute;mero de visitantes individuales de una p&aacute;gina web o de un servicio, o para calcular otras estad&iacute;sticas relativas al funcionamiento de nuestros productos. Tambi&eacute;n para analizar el comportamiento de uso bas&aacute;ndonos en informaci&oacute;n an&oacute;nima y pseud&oacute;nima, como la forma de interactuar de los visitantes con la p&aacute;gina web. Estos datos no incluyen ninguna informaci&oacute;n que pueda relacionarse directamente con una persona.","category_social_detail":"Durante la visita de las p&aacute;ginas de Telekom, se recogen datos a trav&eacute;s de cookies y tecnolog&iacute;as similares que se transmiten a terceros, en parte para fines propios de Telekom. En los avisos de privacidad de los terceros proveedores (Google, Facebook, LinkedIn, emetriq, etc.) encontrar&aacute; informaci&oacute;n sobre el alcance, la finalidad y la base jur&iacute;dica del procesamiento de datos para fines propios de estos terceros proveedores. Encontrar&aacute; informaci&oacute;n sobre los terceros proveedores independientes <a class=\"cl-link cl-data-privacy-url\" href=\"{{privacy_link}}\" tabindex=\"1\">aqu&iacute;</a>.<br>Asimismo, en nuestras p&aacute;ginas web empleamos un mecanismo para la creaci&oacute;n de perfiles para diferentes dispositivos mediante ID y hash de correo electr&oacute;nico, y transmitimos estos datos, adem&aacute;s de informaci&oacute;n sociodemogr&aacute;fica como c&oacute;digo postal, segmento de edad y sexo, a nuestra empresa asociada emetriq GmbH, que procesa y combina la informaci&oacute;n con datos propios para la formaci&oacute;n de perfiles publicitarios, tambi&eacute;n con fines propios. Encontrar&aacute; informaci&oacute;n detallada <a class=\"cl-link cl-data-privacy-url\" href=\"{{privacy_link}}\" tabindex=\"1\">aqu&iacute;</a>. La responsabilidad de la creaci&oacute;n de perfiles para diferentes dispositivos corresponde de manera conjunta a Telekom Deutschland GmbH y emetriq GmbH con arreglo al art. 26 del RGPD. Encontrar&aacute; m&aacute;s informaci&oacute;n sobre la responsabilidad de los socios y sobre sus derechos como parte interesada <a class=\"cl-link cl-data-privacy-url\" href=\"{{privacy_link}}\" tabindex=\"1\">aqu&iacute;</a>.","privacy_policy_text":"","required":"Necesarias","category_required_title":"Cookies necesarias","collapse_detail_button":"Reducir","privacy_policy_url":""},"isDefault":"false"},"fr":{"custom_tokens":{"privacy":"Informations sur la protection des donn&eacute;es","category_required_detail":"Ils permettent l&rsquo;ex&eacute;cution de fonctions de base telles que le traitement des commandes dans la boutique en ligne et l&rsquo;acc&egrave;s aux zones prot&eacute;g&eacute;es du site web. Ils sont &eacute;galement destin&eacute;s &agrave; assurer l&rsquo;&eacute;valuation anonyme du comportement de l&rsquo;utilisateur, que nous utilisons pour am&eacute;liorer constamment notre pr&eacute;sence web.","privacy_link":"https://www.telekom.de/ueber-das-unternehmen/datenschutz","category_required_description":"Ces cookies sont requis pour que vous puissiez naviguer &agrave; travers ces pages et utiliser les fonctions essentielles.","accept_choice_button":"Confirmer la s&eacute;lection","category_display_ads_detail":"Les cookies de marketing sont utilis&eacute;s pour afficher des contenus publicitaires int&eacute;ressants et mesurer l&rsquo;efficacit&eacute; de nos campagnes. Ceci est effectu&eacute; non seulement sur les sites web de Telekom, mais aussi sur les sites web d&rsquo;autres partenaires publicitaires (prestataires tiers). Ceci est &eacute;galement appel&eacute; reciblage. Le reciblage est destin&eacute; &agrave; la cr&eacute;ation de profils de contenu ou d&rsquo;annonces sous pseudonyme, &agrave; l&rsquo;activation de publicit&eacute;s pertinentes sur les autres sites web et &agrave; la g&eacute;n&eacute;ration d&rsquo;informations sur les groupes cibles qui ont consult&eacute; les annonces et les contenus. Les informations sur les produits, tarifs, options et prolongements de contrats achet&eacute;s sont prises en compte pour la cr&eacute;ation, dans le respect des int&eacute;rêts, de groupes cibles d&rsquo;utilisateurs enregistr&eacute;s (clients existants). L&rsquo;affectation de comportements d&rsquo;utilisation et d&rsquo;informations contractuelles est effectu&eacute;e via une comparaison de diff&eacute;rents ID de cookies avec les adresses e-mail hach&eacute;es. Ceci ne permet pas de remonter jusqu&rsquo;&agrave; une personne. Les cookies de marketing et de reciblage nous aident &agrave; afficher des contenus publicitaires aussi pertinents que possible pour vous. En refusant les cookies de marketing, la quantit&eacute; de publicit&eacute;s affich&eacute;es sera la même, mais ces publicit&eacute;s pourront être moins pertinentes pour vous. Cliquez <a class=\"cl-link cl-data-privacy-url\" href=\"https://www.telekom.de/ueber-das-unternehmen/datenschutz\" tabindex=\"1\">ici</a> pour plus d&rsquo;informations.","company_logo_url":"","expand_detail_button":"En voir plus","category_analytics_detail":"Les cookies d&rsquo;analyse permettent le recours &agrave; des possibilit&eacute;s d&rsquo;utilisation et d&rsquo;identification par le prestataire primaire ou des prestataires tiers, dans le cadre de profils d&rsquo;utilisation sous pseudonyme. Nous utilisons par exemple des cookies d&rsquo;analyse pour d&eacute;terminer le nombre de visiteurs individuels d&rsquo;un site web ou d&rsquo;un service ou pour recueillir d&rsquo;autres statistiques portant sur l&rsquo;utilisation de nos produits, ou encore pour analyser le comportement de l&rsquo;utilisateur sur la base d&rsquo;informations anonymes ou sous pseudonyme afin d&rsquo;analyser la mani&egrave;re dont les visiteurs interagissent avec notre site web. Ceci ne permet pas de remonter jusqu&rsquo;&agrave; une personne.","category_social_detail":"Dans ce cadre, lors d&rsquo;une visite des sites de Telekom, des donn&eacute;es sont recueillies au moyen de cookies ou de technologies similaires et transmises &agrave; des tiers, en partie &agrave; des fins propres &agrave; Telekom. Pour connaître l&rsquo;&eacute;tendue, les finalit&eacute;s et le fondement juridique d&rsquo;un traitement aux propres fins du prestataire tiers, veuillez consulter les informations sur la protection des donn&eacute;es du prestataire tiers (Google, Facebook, LinkedIn, emetriq etc.). Vous trouverez <a class=\"cl-link cl-data-privacy-url\" href=\"{{privacy_link}}\" tabindex=\"1\">ici</a> les informations sur les prestataires tiers agissant sous leur propre responsabilit&eacute;. <br> Nous utilisons &eacute;galement sur nos sites web un m&eacute;canisme pour la cr&eacute;ation de profils sur diff&eacute;rents appareils au moyen d&rsquo;ID et d&rsquo;adresses e-mail hach&eacute;es, et transmettons ces donn&eacute;es ainsi que des informations socio-d&eacute;mographiques, telles que code postal, groupe d&rsquo;&acirc;ge et sexe &agrave; notre partenaire emetriq GmbH, qui associe ces informations &agrave; ses propres donn&eacute;es et les traite &agrave; ses propres fins pour la cr&eacute;ation de profils publicitaires. Vous trouverez tous les d&eacute;tails <a class=\"cl-link cl-data-privacy-url\" href=\"{{privacy_link}}\" tabindex=\"1\">ici</a>. Telekom Deutschland GmbH et emetriq GmbH sont conjointement responsables de la cr&eacute;ation de profils sur diff&eacute;rents appareils aux termes de l&rsquo;art. 26 RGPD. Pour plus d&rsquo;informations sur la responsabilit&eacute; des partenaires et vos droits en tant que personne concern&eacute;e, cliquez <a class=\"cl-link cl-data-privacy-url\" href=\"{{privacy_link}}\" tabindex=\"1\">ici</a>.","privacy_policy_text":"","required":"Obligatoire","category_required_title":"Cookies requis","collapse_detail_button":"En voir moins","privacy_policy_url":""},"common_tokens":{"yes":"Autoriser","confirmation_button":"Tout accepter","message":"Pour pouvoir vous offrir une exp&eacute;rience optimale sur nos pages web, nous utilisons des cookies. Ils comprennent notamment les cookies pour l&rsquo;utilisation et l&rsquo;optimisation du site, les cookies pour les services tels que l&rsquo;utilisation du chat texte ou vid&eacute;o ou encore ceux destin&eacute;s &agrave; la publicit&eacute; orient&eacute;e sur votre comportement d&rsquo;utilisation en ligne. Ils permettent par exemple d&rsquo;identifier si vous avez d&eacute;j&agrave; visit&eacute; des pages web &agrave; partir du même appareil. Nous souhaitons vous donner le choix des cookies que vous autorisez&nbsp;:","no":"Ne pas autoriser","title":"G&eacute;rez vos param&egrave;tres de protection des donn&eacute;es"},"categories":{"engagement":{"notes":"","name":""},"personalization":{"notes":"","name":""},"cookiematch":{"notes":"","name":""},"big_data":{"name":"","notes":""},"crm":{"name":"","notes":""},"misc":{"notes":"","name":""},"email":{"notes":"","name":""},"affiliates":{"name":"","notes":""},"monitoring":{"name":"","notes":""},"cdp":{"name":"","notes":""},"display_ads":{"notes":"Ces cookies et des technologies similaires sont utilis&eacute;s pour permettre l&rsquo;affichage de contenus publicitaires personnalis&eacute;s et donc pertinents pour vous sur les sites web de Telekom et des prestataires tiers. ","name":"Cookies de marketing"},"search":{"name":"","notes":""},"mobile":{"notes":"","name":""},"social":{"notes":"Les sites de Telekom int&egrave;grent les services de prestataires tiers qui ex&eacute;cutent leurs services soit sous leur propre responsabilit&eacute; soit en responsabilit&eacute; conjointe avec Telekom Deutschland GmbH. Dans ce cadre, des donn&eacute;es et informations sont transmises &agrave; des prestataires tiers qui les traitent &agrave; leurs propres fins publicitaires et les associent aux donn&eacute;es de tiers.","name":"Services d&rsquo;autres entreprises (prestataires tiers sous leur propre responsabilit&eacute;)"},"analytics":{"name":"Cookies analytiques","notes":"Ces cookies nous aident &agrave; mieux comprendre le comportement d&rsquo;utilisation."}},"isDefault":"false"},"en":{"categories":{"monitoring":{"name":"","notes":""},"crm":{"name":"","notes":""},"affiliates":{"notes":"","name":""},"email":{"notes":"","name":""},"misc":{"name":"","notes":""},"big_data":{"notes":"","name":""},"personalization":{"name":"","notes":""},"engagement":{"name":"","notes":""},"cookiematch":{"notes":"","name":""},"analytics":{"notes":"These cookies help us to improve our understanding of user behavior.","name":"Analytical cookies"},"mobile":{"name":"","notes":""},"social":{"name":"Services by other companies (independent third-party providers)","notes":"Deutsche Telekom&rsquo;s websites include links to third-party service providers, who provide their services under their own responsibility or in joint responsibility with Telekom Deutschland GmbH. In this instance, data and information are transmitted to third-party providers, processed for individual advertising purposes, and merged with data of third parties."},"display_ads":{"notes":"These cookies and similar technologies are used in order to show you personalized and therefore relevant advertising contents on Deutsche Telekom and third-party sites. ","name":"Marketing cookies"},"search":{"name":"","notes":""},"cdp":{"name":"","notes":""}},"common_tokens":{"confirmation_button":"Accept all","yes":"Yes","message":"We use cookies to provide you with an optimized website experience. This includes cookies for the operation and optimization of the web page and services, such as text and video chats, as well as tools for serving advertising that is geared to your online usage patterns. They enable the system to tell if you repeatedly visit our web pages from the same device. We want to give you the choice of which cookies are permitted:","no":"No","title":"Manage your data privacy settings"},"custom_tokens":{"category_required_description":"These cookies are required to enable you to navigate through the web pages and use key functions.","privacy_link":"https://www.telekom.de/ueber-das-unternehmen/datenschutz","accept_choice_button":"Save settings","category_display_ads_detail":"Marketing cookies are used to display interesting advertising contents and to measure the effectiveness of our campaigns. This is done not only on Deutsche Telekom&rsquo;s websites, but also on other websites of advertising partners (third-party providers). This is also referred to as retargeting. It is used to create pseudonymous content or ad profiles, for the placement of relevant advertising on other websites, and to derive insights into target groups that have viewed the ads and content. For the interest-based creation of a target-group specification of logged-in users (existing customers), information about purchased products, tariffs, options, and contract extensions is taken into account. The assignment of usage behavior and contract information is carried out by matching various cookie IDs with the hashed email address. This information cannot be traced back to a person. Marketing and retargeting cookies allow us to present you with potentially relevant advertising contents. By suppressing marketing cookies, you will continue to see the same number of ads, but they may be less relevant for your interests. You can find further information <a class=\"cl-link cl-data-privacy-url\" href=\"https://www.telekom.de/ueber-das-unternehmen/datenschutz\" tabindex=\"1\">here</a>.","category_required_detail":"They support basic functions, such as order processing in the online shop and access to secured areas of the web page. They also serve the purpose of performing an anonymous analysis of user patterns, which we use to continuously develop and improve our web pages for you.","privacy":"Privacy policy","company_logo_url":"","expand_detail_button":"Find out more","category_analytics_detail":"Analysis cookies allow for the compilation of usage and identification data by the original provider or third-party providers into pseudonymous usage profiles. We use analysis cookies, e.g., to determine the number of individual visitors to a web page or a service, to collect statistical data on the performance of our products, and to analyze the visitors usage patterns and visitor interactions on the basis of anonymous and pseudonymous information. This information cannot be traced back to a person.","privacy_policy_text":"","category_social_detail":"When you visit Deutsche Telekom&rsquo;s websites, cookies or similar technologies record data and send it to third parties, in part for Deutsche Telekom&rsquo;s own purposes. The scope, purpose, and legal basis on which further processing is carried out for the third party&rsquo;s own purposes can be found in the third party&rsquo;s privacy notice (Google, Facebook, LinkedIn, emetriq, etc.). Information about independent third-party providers is available <a class=\"cl-link cl-data-privacy-url\" href=\"{{privacy_link}}\" tabindex=\"1\">here</a>.   <br> Furthermore, we use a mechanism on our websites for the creation of profiles across devices using IDs and email hashes, and we transmit this data as well as socio-demographic information, e.g., ZIP code, age group, and sex, to our partner company emetriq GmbH, which merges and processes these details with its own data for commercial profiling and for its own purposes. Details are available <a class=\"cl-link cl-data-privacy-url\" href=\"{{privacy_link}}\" tabindex=\"1\">here</a>. Telekom Deutschland GmbH and emetriq GmbH share joint responsibility under Art. 26 GDPR for the creation of profiles across devices. More information about the responsibility of partners and your rights as a data subject is available <a class=\"cl-link cl-data-privacy-url\" href=\"{{privacy_link}}\" tabindex=\"1\">here</a>.","privacy_policy_url":"","required":"Required","category_required_title":"Required cookies","collapse_detail_button":"Show less"},"isDefault":"false"},"de":{"isDefault":"true","display_name":"German (de)","categories":{"cdp":{"notes":"","name":""},"display_ads":{"notes":"Diese Cookies und &auml;hnliche Technologien werden eingesetzt, um Ihnen personalisierte und dadurch relevante werbliche Inhalte anzeigen zu k&ouml;nnen.","name":"Marketing-Cookies"},"search":{"notes":"","name":""},"mobile":{"notes":"","name":""},"social":{"name":"Dienste von anderen Unternehmen (eigenverantwortliche Drittanbieter)","notes":"Auf Seiten der Telekom werden Drittanbieterdienste eingebunden, die ihre Services eigenverantwortlich oder in gemeinsamer Verantwortung mit Telekom Deutschland GmbH erbringen. Hierbei werden Daten und Informationen an Drittanbieter &uuml;bermittelt, zu eigenen werblichen Zwecke verarbeitet und mit Daten Dritter zusammengef&uuml;hrt."},"analytics":{"name":"Analytische Cookies","notes":"Diese Cookies helfen uns, das Nutzungsverhalten besser zu verstehen."},"personalization":{"notes":"","name":""},"engagement":{"notes":"","name":""},"cookiematch":{"name":"","notes":""},"big_data":{"name":"","notes":""},"crm":{"name":"","notes":""},"affiliates":{"name":"","notes":""},"misc":{"name":"","notes":""},"email":{"name":"","notes":""},"monitoring":{"name":"","notes":""}},"common_tokens":{"message":"Um Ihnen ein optimales Webseitenerlebnis zu bieten, setzen wir Cookies ein. Dazu z&auml;hlen Cookies f&uuml;r den Betrieb und die Optimierung der Seite als auch f&uuml;r Services, wie die Nutzung des Text- oder Video Chats sowie auch an Ihrem online Nutzungsverhalten orientierte Werbung. So kann z.B. erkannt werden, wenn Sie unsere Seiten vom selben Ger&auml;t aus wiederholt besuchen. Wir m&ouml;chten Ihnen die Wahl geben, welche Cookies Sie zulassen:","description":"","no":"Nicht erlauben","title":"Verwalten Sie Ihre Datenschutz-Einstellungen","confirmation_button":"Alle akzeptieren","yes":"Erlauben","status":"","category":""},"custom_tokens":{"expand_detail_button":"Mehr erfahren","category_analytics_detail":"Analyse-Cookies erm&ouml;glichen die Erhebung von Nutzungs- und Erkennungsm&ouml;glichkeiten durch Erst- oder Drittanbieter, in so genannten pseudonymen Nutzungsprofilen. Wir benutzen beispielsweise Analyse-Cookies, um die Zahl der individuellen Besucher einer Webseite oder eines Dienstes zu ermitteln oder um andere Statistiken im Hinblick auf den Betrieb unserer Produkte zu erheben, als auch das Nutzerverhalten auf Basis anonymer und pseudonymer Informationen zu analysieren, wie Besucher mit der Webseite interagieren. Ein unmittelbarer R&uuml;ckschluss auf eine Person ist dabei nicht m&ouml;glich.","privacy_link":"https://www.telekom.de/ueber-das-unternehmen/datenschutz","category_required_description":"Diese Cookies sind notwendig, damit Sie durch die Seiten navigieren und wesentliche Funktionen nutzen k&ouml;nnen.","accept_choice_button":"Auswahl best&auml;tigen","category_display_ads_detail":"Marketing-Cookies werden eingesetzt, um interessante Werbeinhalte anzuzeigen und die Wirksamkeit unserer Kampagnen zu messen. Dies geschieht nicht nur auf Webseiten der Telekom, sondern auch auf anderen Werbepartner-Seiten (Drittanbieter). Dies wird auch als Retargeting bezeichnet. Es dient zur Erstellung pseudonymer Inhalts- oder Anzeigenprofile, der Schaltung relevanter Werbung auf anderen Webseiten und um Erkenntnisse &uuml;ber Zielgruppen, die die Anzeigen und Inhalte betrachtet haben, abzuleiten. F&uuml;r die interessengerechte Erstellung von Zielgruppen Spezifikation von eingeloggten Usern (Bestandskunden) werden Informationen zu gekauften Produkten, Tarifen, Optionen und Vertragsverl&auml;ngerungen ber&uuml;cksichtigt. Die Zuordnung von Nutzungsverhalten und Vertragsinformation erfolgt &uuml;ber einen Abgleich verschiedener Cookie IDs mit der gehashten E-Mail-Adresse. Ein unmittelbarer R&uuml;ckschluss auf eine Person ist dabei nicht m&ouml;glich. Marketing- und Retargeting-Cookies helfen uns m&ouml;gliche relevante werbliche Inhalte f&uuml;r Sie anzuzeigen. Durch das Unterdr&uuml;cken von Marketing-Cookies sehen Sie auch weiterhin die gleiche Anzahl an Werbung, die aber m&ouml;glicherweise weniger relevant f&uuml;r Sie ist. Weitere Informationen finden Sie <a class=\"cl-link cl-data-privacy-url\" href=\"https://www.telekom.de/ueber-das-unternehmen/datenschutz\" tabindex=\"1\">hier</a>.","category_required_detail":"Sie erm&ouml;glichen Grundfunktionen, wie die Bestellabwicklung im Online-Shop und den Zugriff auf gesicherte Bereiche der Webseite. Zudem dienen sie der anonymen Auswertung des Nutzerverhaltens, die von uns verwendet werden, um unseren Webauftritt stetig f&uuml;r Sie weiterzuentwickeln.","privacy":"Datenschutzhinweis","required":"Erforderlich","category_required_title":"Erforderliche Cookies","collapse_detail_button":"Weniger erfahren","category_social_detail":"Dabei werden beim Besuch von Telekom Seiten Daten mittels Cookies oder &auml;hnlicher Technologien erfasst und an Dritte &uuml;bermittelt, zum Teil f&uuml;r Telekomeigene Zwecke. In welchem Umfang, zu welchen Zwecken und auf Basis welcher Rechtsgrundlage eine Weiterverarbeitung zu eigenen Zwecken des Drittanbieters erfolgt, entnehmen Sie bitte den Datenschutzhinweisen des Drittanbieters(Google, Facebook, LinkedIn, emetriq etc.). Die Informationen zu den eigenverantwortlichen Drittanbietern finden Sie <a class=\"cl-link cl-data-privacy-url\" href=\"{{privacy_link}}\" tabindex=\"1\">hier</a>.<br> <br> Dar&uuml;ber hinaus setzen wir auf unseren Webseiten einen Mechanismus zur ger&auml;te&uuml;bergreifende Profilerstellung mittels IDs und E-Mail-Hash ein und &uuml;bermitteln soziodemografische Informationen, wie Postleitzahl, Altersgruppe und Geschlecht an unser Partnerunternehmen emetriq GmbH, welches die Informationen mit eigenen Daten zur werblichen Profilbildung auch f&uuml;r eigene Zwecke zusammenf&uuml;hrt und verarbeitet. Details finden Sie <a class=\"cl-link cl-data-privacy-url\" href=\"{{privacy_link}}\" tabindex=\"1\">hier</a>. F&uuml;r die ger&auml;te&uuml;bergreifende Profilerstellung sind die Telekom Deutschland GmbH und emetriq GmbH gemeinsame Verantwortliche nach Art. 26 DSGVO. Weitere Informationen zur Verantwortlichkeit der Partner sowie zu Ihren Betroffenenrechten erhalten Sie <a class=\"cl-link cl-data-privacy-url\" href=\"{{privacy_link}}\" tabindex=\"1\">hier</a>."}}};utag.gdpr.preferences_prompt.content.css=window.TEALIUM.preferences_prompt.css;utag.gdpr.preferences_prompt.content.html=window.TEALIUM.preferences_prompt.html;utag.gdpr.preferences_prompt.content.js=window.TEALIUM.preferences_prompt.js;utag.gdpr.preferences_prompt.defaultLang="de";utag.gdpr.showConsentPreferences=function(_lang){function cloneObject(source,target,depth){if(depth===undefined){depth=1;}else if(depth===-1){utag.DB("Max Clone depth exceeded, using reference");return source;}if(window.JSON){return JSON.parse(JSON.stringify(source));}target=target||{};for(var prop in source){if(!source.hasOwnProperty(prop)){continue;}switch(utag.gdpr.typeOf(source[prop])){case"array":target[prop]=source[prop].slice(0);break;case"object":target[prop]=cloneObject(source[prop],target[prop],--depth);break;default:target[prop]=source[prop];}}return target;}try{if(utag.gdpr.preferences_prompt.noShow){return;}var cn=document.getElementById("__tealiumGDPRcpStyle");if(cn){cn.parentNode.removeChild(cn);}var hn=document.getElementById("__tealiumGDPRcpPrefs");if(hn){hn.parentNode.removeChild(hn);}var sn=document.getElementById("__tealiumGDPRcpPrefsScript");if(sn){sn.parentNode.removeChild(sn);}var promptData=cloneObject(utag.gdpr.preferences_prompt);var activeCats=utag.gdpr.getCategories(true);var cats='';var id;for(var i=0;i<activeCats.length;i++){id=utag.gdpr.preferences_prompt.categories[activeCats[i]].id;cats+='<tr><td>{{category_'+activeCats[i]+'_title}}</td><td>{{category_'+activeCats[i]+'_description}}</td><td><input type="checkbox" class="toggle" id="toggle_cat'+id+'"/><label for="toggle_cat'+id+'"> <span class="on">{{yes}}</span> <span class="off">{{no}}</span></label></td></tr>';}promptData.content.html=promptData.content.html.replace('<!--CATEGORIES-->',cats);var dtc=utag.gdpr.getDeTokenizedContent(promptData,_lang);var head=document.head||document.getElementsByTagName("head")[0],style=document.createElement("style"),mDiv=document.createElement("div"),scr=document.createElement("script"),body=document.body||document.getElementsByTagName("body")[0];style.type="text/css";style.id="__tealiumGDPRcpStyle";if(style.styleSheet){style.styleSheet.cssText=dtc.css;}else{style.appendChild(document.createTextNode(dtc.css));}head.appendChild(style);mDiv.innerHTML=dtc.html;mDiv.id="__tealiumGDPRcpPrefs";body.appendChild(mDiv);scr.language="javascript";scr.type="text/javascript";scr.text="try{"+dtc.js+"} catch(e){utag.DB(e)}";scr.id="__tealiumGDPRcpPrefsScript";head.appendChild(scr);}catch(e){utag.DB(e);}};
utag.gdpr.dns = null;


utag.track_old = utag.track;
utag.track = function(a, b, c, d){
    if (typeof a == "string") a = {
        event : a,
        data : b,
        cfg : {
            cb : c,
            uids : d
        }
    };
    if (a.event === "update_consent_cookie" && b.consent_categories) {
        utag.gdpr.updateConsentCookie(b.consent_categories);
    } else if (a.event === "set_dns_state" && typeof b.do_not_sell !== 'undefined') {
        utag.gdpr.dns.setDnsState(b.do_not_sell);
    } else {
        if (utag.gdpr.getConsentState() === 0) {
            if (!utag.gdpr.noqueue) utag.gdpr.queue.push({
                event : a.event,
                data : utag.handler.C(a.data),
                cfg : utag.handler.C(a.cfg)
            });
        }
        if (a.cfg.uids) {
            var uids = [];
            for (var i = 0; i < a.cfg.uids.length; i++){
                if (!utag.gdpr.shouldTagFire(a.cfg.uids[i])) {
                    uids.push(a.cfg.uids[i]);
                }
            }
            a.cfg.uids = uids;
            utag.gdpr.trackUIDs = utag.gdpr.trackUIDs.concat(uids);
        }
        return utag.track_old.apply(this, arguments);
    }
};
utag.loader.OU_old = utag.loader.OU;
utag.loader.OU = function(tid){
    try {
        if (utag.gdpr.typeOf(tid) !== "undefined") {
            return utag.gdpr.shouldTagFire();
        }
        utag.gdpr.applyConsentState();
    }
    catch (e) {
        utag.DB(e);
    }
};

if (utag.gdpr.preferences_prompt.single_cookie) {
    window.utag_cfg_ovrd = window.utag_cfg_ovrd || {};
    utag.loader.SC("utag_main", null, "da");
    window.utag_cfg_ovrd.nocookie = true;
}
if (!utag.gdpr.consent_prompt.isEnabled && !utag.gdpr.doNotSell.isEnabled && utag.gdpr.getConsentState() == 0) {
    utag.gdpr.setAllCategories(utag.gdpr.preferences_prompt.defaultState, !0);
}

  if(typeof utag_cfg_ovrd!='undefined'){for(utag._i in utag.loader.GV(utag_cfg_ovrd))utag.cfg[utag._i]=utag_cfg_ovrd[utag._i]};
  utag.loader.PINIT = function(a,b,c){
    utag.DB("Pre-INIT");
    if (utag.cfg.noload) {
      return;
    }

    try {
      // Initialize utag.data
      this.GET();
      // Even if noview flag is set, we still want to load in tags and have them ready to fire
      // FUTURE: blr = "before load rules"
      if(utag.handler.RE('view',utag.data,"blr")){
        utag.handler.LR(utag.data);
      }
      
    }catch(e){utag.DB(e)};
    // process 'blocking' tags (tags that need to run first)
    a=this.cfg;
    c=0;
    for (b in this.GV(a)) {
      // external .js files (currency converter tag) are blocking
      if(a[b].block == 1 || (a[b].load>0 && (typeof a[b].src!='undefined'&&a[b].src!=''))){
        a[b].block = 1;
        c=1;
        this.bq[b]=1;
      }
    }
    if(c==1) {
      for (b in this.GV(a)) {
        if(a[b].block){
          // handle case of bundled and blocking (change 4 to 1)
          // (bundled tags that do not have a .src should really never be set to block... they just run first)
          a[b].id=b; 
          if(a[b].load==4)a[b].load=1; 
 	  a[b].cb=function(){
            var d=this.uid;
            utag.loader.cfg[d].cbf=1;
            utag.loader.LOAD(d)
          };
          this.AS(a[b]);
        }
      }
    }
    if(c==0)this.INIT();
  };
  utag.loader.INIT = function(a, b, c, d, e) {
    utag.DB('utag.loader.INIT');
    if (this.ol == 1) return -1;
    else this.ol = 1;
    // The All Tags scope extensions run after blocking tags complete
    // The noview flag means to skip these Extensions (will run later for manual utag.view call)
    if(utag.cfg.noview!=true)utag.handler.RE('view',utag.data,"alr"); 

    utag.rpt.ts['i'] = new Date();
     
    d = this.cfgsort;
    // TODO: Publish engine should sort the bundled tags first..
    for (a=0;a<d.length;a++){
      e = d[a];
      b = this.cfg[e];
      b.id = e;
      if(b.block != 1){
        // do not wait if the utag.cfg.noview flag is set and the tag is bundled
        if (utag.loader.bk[b.id] || ((utag.cfg.readywait||utag.cfg.noview) && b.load==4)){
          this.f[b.id]=0;
          utag.loader.LOAD(b.id)
        }else if (b.wait == 1 && utag.loader.rf == 0) {
	  utag.DB('utag.loader.INIT: waiting ' + b.id);
          this.wq.push(b)
          this.f[b.id]=2;
        }else if (b.load>0){
	  utag.DB('utag.loader.INIT: loading ' + b.id);
	  this.lq.push(b);
          this.AS(b);
        }
      }
    }
          
    if (this.wq.length > 0) utag.loader.EV('', 'ready', function(a) {
      if(utag.loader.rf==0){
        utag.DB('READY:utag.loader.wq');
        utag.loader.rf=1;
        utag.loader.WQ();
      }
    });
    else if(this.lq.length>0)utag.loader.rf=1;
    else if(this.lq.length==0)utag.loader.END();

    return 1
  };
  utag.loader.EV('', 'ready', function(a) {if(utag.loader.efr!=1){utag.loader.efr=1;try{if(utag.cfg.readywait||utag.cfg.waittimer){utag.loader.EV("","ready",function(){setTimeout(function(){utag.gdpr.promptEnabledSetting();cmExplicitDomReady();cmDNSDomReady();},utag.cfg.waittimer||1);});}else{utag.gdpr.promptEnabledSetting();cmExplicitDomReady();cmDNSDomReady();}function cmExplicitDomReady(){try{if(utag.gdpr.consent_prompt.isEnabled){if(!utag.gdpr.consent_prompt.noShow){if(!utag.gdpr.getConsentState()){utag.gdpr.showExplicitConsent();}}}}catch(e){utag.DB(e);}}function cmDNSDomReady(){try{if(utag.gdpr.doNotSell.isEnabled){if(!utag.gdpr.doNotSell.noShow){if(!utag.gdpr.dns.getDnsState()){utag.gdpr.showDoNotSellBanner();}}}}catch(e){utag.DB(e);}}}catch(e){utag.DB(e);}}})

  if(utag.cfg.readywait || utag.cfg.waittimer){
    utag.loader.EV('', 'ready', function(a) {
      if(utag.loader.rf==0){
        utag.loader.rf=1;
        utag.cfg.readywait=1;
        utag.DB('READY:utag.cfg.readywait');
        setTimeout(function(){utag.loader.PINIT()}, utag.cfg.waittimer || 1);
      }
    })
  }else{
    utag.loader.PINIT()
  }
}

