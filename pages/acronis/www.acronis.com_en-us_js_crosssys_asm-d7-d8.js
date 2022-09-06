window.addEventListener('load', function() {
var p = location.search.substring(1).split("&");
for (var i = 0; i < p.length; i ++) {
var component = p[i].split('=');
if (component[0] === 'utm_content') {
var utm = decodeURIComponent(component[1]).split(':');
if (window.localStorage && /smart|SmartDisplay/.test(utm[0])) {
localStorage.setItem('utm_content', component[1]);
}
if (window.sessionStorage && /sfdc|Smart_sfdc/.test(utm[0])) {
sessionStorage.setItem('utm_content', component[1]);
}
}
}
(function ($) {
if (!$) { return; }
if (!/\/(articles|blog)\//.test(location.pathname)) {
return false;
}
$(function() {
$.ajax({
type: 'get',
cache: false,
async: false,
url: 'https://www.acronis.com/en-us/js/crosssys/ribbons/contents/subscription-form.html'
}).done(function (html) {
$(html).appendTo('body');
});
});
})(window.$ || window.jQuery);
(function ($) {
if (!$) { return; }
if ( getCookie('cookies_note') === 'got_it' ) {
return;
}
if (/(kb|forum).acronis.com/.test(window.location.host)) {
$.ajax({
cache: false,
type: 'get',
async: false,
url: 'https://www.acronis.com/en-us/js/crosssys/ribbons/contents/cookies-note-v2.html'
}).done(function (html) {
var $note = $(html).prependTo('body');
var $actions = $('[data-action]', $note);
$actions.on('click', function (e) {
e.preventDefault();
var expires = new Date();
expires.setFullYear(expires.getFullYear() + 1);
setCookie('cookies_note', 'got_it', expires.toUTCString(), '/');
$note.remove();
});
});
}
function setCookie(name, value, expires, path, domain, secure) {
document.cookie = name + '=' + escape(value) +
((expires) ? '; expires=' + expires : '') +
((path) ? '; path=' + path : '') +
((domain) ? '; domain=' + domain : '') +
((secure) ? '; secure' : '');
}
function getCookie(name) {
var cookie = ' ' + document.cookie;
var search = ' ' + name + '=';
var set_str = null;
var offset = 0;
var end = 0;
if (cookie.length > 0) {
offset = cookie.indexOf(search);
if (offset !== -1) {
offset += search.length;
end = cookie.indexOf(';', offset);
if (end === -1) {
end = cookie.length;
}
set_str = unescape(cookie.substring(offset, end));
}
}
return (set_str);
}
})(window.$ || window.jQuery);
(function ($) {
if (!$) { return; }
if (/acronis-cyber-backup/.test(location.href)) {
var bannerUrl = '/js/crosssys/ribbons/contents/onboarding-service.html';
$.ajax({
cache: false,
type: 'get',
async: false,
url: 'https://www.acronis.com//en-us' + bannerUrl,
}).done(function (html) {
$(html).prependTo('body');
$('.ribbon-top-page a').on('click', function(e) {
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
'event': 'Acronis',
'eventCategory': 'click_advanced',
'eventAction': this.href,
'eventLabel': 'cta_ribbon|Onboarding Service',
'eventContext': 'banner'
});
});
});
}
var path = location.pathname.replace(/\/+/g, '/').replace(/^\/\w\w-\w\w\/?/, '').replace(/\/$/, '');
function setCookie(name, value, expires, path, domain, secure) {
document.cookie = name + '=' + escape(value) +
((expires) ? '; expires=' + expires : '') +
((path) ? '; path=' + path : '') +
((domain) ? '; domain=' + domain : '') +
((secure) ? '; secure' : '');
}
function getCookie(name) {
var cookie = ' ' + document.cookie;
var search = ' ' + name + '=';
var set_str = null;
var offset = 0;
var end = 0;
if (cookie.length > 0) {
offset = cookie.indexOf(search);
if (offset !== -1) {
offset += search.length;
end = cookie.indexOf(';', offset);
if (end === -1) {
end = cookie.length;
}
set_str = unescape(cookie.substring(offset, end));
}
}
return (set_str);
}
if (getCookie('a-banner-media') === 'hide') {
return;
}
var isKB = location.hostname === "kb.acronis.com";
var isForum = location.hostname === "forum.acronis.com";
if (isKB || isForum) {
var productName = 'Acronis Cyber Protect';
var bannerURL = 'banner-acronis-cyber-protect.html';
if (/cloud.*?manager|(\/(64214|64217|64220|64223|64226|64229|64235|64238|64241|64244|64253|64256|64268|64271|64274|64283|64289|64292|64307|64313|64322|64331|64340|64346|64355|64361|64370|64373|64376|64403|64406|64445|64472|64475|64478|64481|64484|64487|64490|64493|64499|64514|64517|64520|64523|64526|64529|64532|64550|64565|64574|64595|64610|64616|64702|68390|70403))/i.test(location.href)) {
productName = 'Acronis Cloud Manager'; 
bannerURL = 'banner-acronis-cloud-manager.html';
}
if (/cloud.*?security|evaluationfaq|(\/(57492|57541|57776|61725|63187|63189|63194|63195|64259|64262|64265|64277|64280|64286|64316|64328|64334|64337|64343|64379|64382|64385|64388|64391|64394|64397|64400|64409|64412|64415|64418|64421|64424|64427|64430|64433|64436|64439|64442|64448|64451|64457|64460|64463|64466|64469|64502|64505|64508|64511|64535|64538|64541|64544|64547|64559|64562|64568|64571|64577|64580|64583|64598|64622|64628|64631|64676|64679|67762|69869|70526))/i.test(location.href)) {
productName = 'Acronis Cloud Security'; 
bannerURL = 'banner-acronis-cloud-security.html';
}
if (/disaster.*?recovery|(\/(52370|54620|54776|55136|55142|55154|55166|55178|55724|57081|57094|57099|57400|58415|58450|58474|58478|58481|58486|58498|58848|59135|59235|59597|59618|59681|60102|60243|60246|60307|60499|60503|61034|61129|61131|61433|61435|61437|62051|62052|62053|62054|62057|62061|62067|62070|62073|67546|67981|68042|68045|68070|68071|68074|68078|68080|68083|68090|68150|68159|68165|68270|68271|68471|68710|69178|69292|69368|69377|69872|70203|70437))/i.test(location.href)) {
productName = 'Acronis Cyber Disaster Recovery';
bannerURL = 'banner-acronis-cyber-disaster-recovery.html'; 
}
if (/add-on|addon|dravailability/i.test(location.href)) {
productName = 'Acronis Cyber Disaster Recovery Add-On';
bannerURL = 'banner-acronis-cyber-disaster-recovery-addon.html'; 
}
if (/cyber.*?files|evaluationfaq|accessfaq|(\/(38490|39368|42899|45285|46968|47194|47618|47696|48776|49184|49251|49400|52418|54518|54812|55016|55718|55874|56103|56166|56367|56952|57337|57492|57541|57776|57780|61725|63187|63189|63194|63195|67762|69869|70526))/i.test(location.href)) {
productName = 'Acronis Cyber Files'; 
bannerURL = 'banner-acronis-cyber-files.html';
}
if (/cyber.*?infrastructure|sdiremote|(\/(59997|60331|60621|60632|60663|61024|61054|61905|62017|62187|62188|62294|62823|62938|62963|63109|63144|63288|63326|63378|63414|63431|63721|63761|64011|64033|64105|64142|64145|64192|64196|64759|64787|64825|64844|64948|64974|64994|65080|65087|65089|65091|65137|65145|65165|65174|65210|65294|65339|65503|65506|65613|67321|67385|67799|67949|68011|68016|68018|68019|68236|68382|68623|68726|68737|68741|68755|68780|68797|68862|69267|69436|69961|69964|70046|70611|70636|70673))/i.test(location.href)) {
productName = 'Acronis Cyber Infrastructure'; 
bannerURL = 'banner-acronis-cyber-infrastructure.html';
}
if (/(backup|protect).*?cloud|servicesbydc|licensing-switch|\/(35681|37472|46575|47241|47678|48140|49028|49778|49862|52406|54554|54596|54602|54608|55052|55058|55064|55088|55244|55538|55784|55802|55808|55876|55912|55920|55944|55950|56010|56031|56046|56049|56070|56187|56193|56199|56202|56307|56310|56313|56331|56379|56382|56412|56418|56424|56502|56862|57072|57107|57110|57128|57223|57328|57420|57423|57429|57459|57464|57473|57488|57501|57596|57601|57604|57853|58116|58132|58154|58221|58237|58275|58372|58831|59043|59277|59281|59283|59285|59296|59406|59416|59419|59524|59533|59556|59611|59690|59798|59903|59937|59975|59976|59991|60087|60107|60112|60114|60129|60132|60157|60216|60223|60265|60276|60464|60480|60486|60495|60572|60586|60593|60603|60606|60610|60629|60655|60657|60700|60759|60827|60836|60839|60842|60849|60864|60881|60926|60983|61025|61045|61049|61066|61100|61106|61190|61243|61267|61346|61356|61429|61451|61454|61469|61477|61513|61517|6152|61520|61535|61568|61570|61575|61577|61648|61668|61674|61681|61727|61805|61809|61913|61916|61937|61955|61967|61980|61993|62009|62013|62025|62133|62174|62227|62307|62359|62376|62396|62398|62405|62424|62465|62479|62506|62516|62525|62533|62534|62539|62549|62554|62556|62559|62576|62591|62594|62607|62618|62710|62728|62897|62901|62918|62921|62942|62960|62978|63130|63176|63198|63212|63313|63323|63329|63331|63410|63511|63573|63763|63846|63884|63996|64098|64210|64657|64741|64744|64771|64775|64782|64818|64866|64901|64905|64963|64984|64987|65056|65063|65163|65181|65204|65257|65381|65399|65442|65480|65516|65564|65571|65599|65628|65656|66238|67066|67084|67159|67340|67433|67492|67540|67541|67820|67895|67900|67905|67917|67969|67993|68000|68035|68323|68341|68393|68436|68445|68455|68475|68516|68551|68553|69153|69277|69347|69359|69498|69551|69573|69671|69686|69797|69814|69855|69867|69885|69894|69940|69959|70033|70036|70037|70091|70093|70095|70193|70206|70207|70225|70322|70352|70529|70533|70546|70572|70582|70615|70681|70692|70698|70702|70707|70711|70732|70737|70746|70751|70757|70769|70774|70781|8149)/i.test(location.href)) {
productName = 'Acronis Cyber Protect Cloud'; 
bannerURL = 'banner-acronis-cyber-protect-cloud.html';
}
if (isForum) {
if (/acronis-cyber-protect-home|acronis-true-image/.test(location.pathname)) { 
productName = 'Acronis Cyber Protect Home Office';
bannerURL = 'banner-acronis-cyber-protect-home-office.html';
}
}
if (isKB) {
if (/\/(2931|10253|10471|11578|11681|11992|12065|13327|13418|13420|13450|13460|13467|13504|13506|13533|13534|13634|13641|13643|13644|13645|13648|13671|13672|13704|14179|14187|14272|14297|14300|14342|14737|14740|14741|14815|14817|14830|14832|14833|14877|14898|14911|14959|1505|1506|15226|15261|1527|1528|1529|1530|1535|1538|1550|15543|15545|1560|1561|1563|1565|1566|1568|16090|16187|1619|16194|1623|16233|16241|16249|1625|16336|16365|16398|16402|16426|16463|1648|1655|1657|1677|1680|1681|1683|1685|16853|16854|1692|1694|16967|16978|1698|16982|1699|1700|1701|1703|1704|1705|17076|17113|17116|17117|17130|17157|1717|1718|17229|1726|1728|17372|17374|1739|1742|1749|17540|1757|17612|1771|1772|1773|1785|1786|1793|1798|1799|1803|1805|1808|18094|1811|1813|1814|1821|18255|18317|18348|18350|1836|18469|18551|18717|18727|1877|18807|18847|20069|22114|22124|22152|22154|22185|22186|22221|22240|22606|2271|2294|2311|23334|23362|23405|23496|23525|23561|23567|23667|23799|23826|23881|23882|23920|23921|23922|23927|23950|23953|23954|24011|24012|24015|24018|24109|24146|24462|24504|24626|24846|25277|25286|25287|25370|25936|26327|26348|26634|26635|26637|26752|26823|2699|2704|27259|27262|27299|27341|27346|27586|27618|2770|2780|2787|2797|2808|28145|2819|28300|28303|28345|2841|28535|2866|2917|2974|30321|30322|30665|30687|30771|30775|30858|30859|32131|32140|32142|32173|32230|32393|32417|32642|3288|33033|33818|34017|34065|34111|34113|34114|34116|34121|34122|34224|34257|34258|34260|34262|34283|34287|34292|34317|34318|34324|3470|34861|34863|34867|34873|34878|34879|34881|34917|34965|34969|3499|3502|3526|3553|3555|35770|36091|3643|3648|36554|3701|37280|37283|3730|3731|37576|3793|38055|3886|38937|38970|40147|40302|40641|40642|40827|4117|41379|41445|41540|41681|4232|4235|4240|4290|43831|43896|43955|44112|44113|44115|44117|44149|44150|44151|44331|44334|44335|44339|44342|44344|44345|44348|44350|44351|44353|44358|44366|44725|44741|44743|44746|44747|45437|45522|45527|45619|45806|46170|46255|46325|46340|46475|46505|46710|46770|46790|46840|46892|46893|46927|46928|47001|47004|47143|47165|47168|47211|47212|47214|47215|47216|47218|47221|47222|47224|47226|47242|47558|47606|47744|47792|47804|4799|48152|48212|48218|48236|48242|48260|48290|48296|48302|48326|48338|48350|48362|48380|48386|48392|48398|48404|48416|48458|48464|48500|48506|48518|48554|48572|48578|48596|48608|48632|48644|48662|48668|48686|48698|48704|48806|48818|48824|49082|4910|49112|49190|49198|49210|49216|49478|49484|49490|49502|49706|49892|49904|49910|49958|50042|50084|50174|5139|52346|52412|5304|5370|5372|5375|5410|5415|5421|54530|54747|54914|54944|54950|54974|55010|55820|56004|56361|56514|56517|56523|56526|56529|56532|56535|56550|56553|56595|56598|56604|56607|56610|56619|56625|56628|56631|56634|56637|56646|56652|56655|56697|56712|56757|56760|56772|56808|56892|56898|5697|57042|57180|57216|57321|57331|57334|57373|57401|57597|57875|57895|57905|57946|57982|57988|57992|58000|58004|58048|5806|58243|58249|58297|58382|58403|58431|58451|58522|58530|58531|58535|58542|58559|58570|58575|58591|58611|58615|58619|58630|58714|58722|58730|58735|58788|58803|58816|58820|58827|58840|58859|58880|58915|58947|58951|58964|59003|59051|59063|59079|59093|59095|59105|59107|59115|59127|59184|59194|59196|59203|59211|59265|59335|59356|59359|59440|59518|59537|59549|59557|5958|59581|59584|59586|59672|59680|59686|59689|59700|59772|59792|59811|59852|59865|59870|59873|59877|59878|59879|59909|59916|59947|60091|60104|60117|60121|60124|60125|60131|60142|60144|60146|60150|60152|60155|60158|60165|60166|60169|60173|60174|60175|60178|60180|60181|60183|60185|60190|60193|60194|60195|60197|60198|60209|60222|60232|60278|60287|60353|60386|60390|60414|60425|60440|60449|60469|60474|60522|60546|60567|60569|60589|60612|60616|60619|60620|60654|60662|60680|60683|60752|60779|60782|60820|60870|60915|60918|60964|60974|60984|60993|60997|60999|61112|61171|61203|61205|61206|61225|61271|61282|61362|61364|61425|61428|61430|61489|61500|61553|61590|61593|61596|61597|61601|61613|61617|61620|61621|61624|61626|61630|61632|61635|61637|61639|61642|61645|61659|61661|61665|61667|61695|61700|61717|61721|61730|61731|61732|61733|61735|61738|61740|61755|61761|61763|61772|61783|61789|61793|61797|61803|61814|61816|61832|61844|61848|61860|61878|61880|61882|61883|61889|61902|61903|61927|61978|61979|61992|62562|63207|63226|63227|63239|63240|63252|63255|63256|63366|63425|63444|63445|63448|63498|63516|63518|6424|6533|7918|8189|8563|8762|8966|1538|9468|1677|1836|46475|46840|56526|56772|57988|59581|59700|60195|60197|60915|60918|61489|61665|61667|61832|61848|61927|61979|62069|63425|63766|63839|64645|64856|67076|67265|67484|67868|68496|68593|68771|68788|68793|69302|69352|69357|69387|69390|69418|69427|69450|69458|69466|69472|69474|69477|69480|69487|69488|69491|69587|69590|69596|69598|69618|69667|69673|69704|69706|69914|69937|69989|70011|70013|70016|70017|70022|70023|70026|70140|70215|70782|acronis-cyber-protect-home|acronis-true-image|ati|macinfo|true-image|trueimage|wbd2018giveaway)(\/|$)/.test(location.pathname)) {
productName = 'Acronis Cyber Protect Home Office';
bannerURL = 'banner-acronis-cyber-protect-home-office.html';
}
if (/\/tag\/(activation|activation-fails|agent-sql-installation|backupagent-integration|backward-compatibility|compatibility|configuration|consolidation|deduplication|defragmentation|destination|disk-director-add12-installation-issue-failure|e-mail-notifications-issue|esxi-configuration-backup-failure|expiration|installation|installation-log|limitation|notification|offline-activation-issue|registration|replication|replication-offsite|replicationcleanup-fails|rollback-initial-installation|slow-installation|slow-replication|slow-validation|synchronization|too-many-activations|trial-version-limitations|uninstall-true-image|uninstallation-fails|use-true-image-business|validation|acronis-access-evaluation-faq|activation|activation-issues-entitlement|creating-ms-installer-log-acronis-software|evaluationfaq|freelinking)(\/|$)/.test(location.pathname)) {
productName = 'Acronis Cyber Protect Home Office';
bannerURL = 'banner-acronis-cyber-protect-home-office.html';
}
}
if (/disk.*?director|ADD11A|(\/(14432|14455|14457|14458|14460|14531|14633|14634|14638|14641|14643|15051|15053|15054|15081|15084|15085|15089|15287|15356|15650|15652|15703|1601|16063|16124|16279|25937|28442|32170|37315|46988|47030|61428|61933|61944|61945|61948|61953|61954|61962|61973|61994|62351|62859|62950))/i.test(location.href)) {
productName = 'Acronis Disk Director'; 
bannerURL = 'banner-acronis-disk-director.html';
}
if (/(access|files).*?connect|(\/(39356|39357|39359|39362|39363|39371|39378|39388|39390|39393|39394|39395|39450|39453|39460|39466|39468|39475|39476|39478|39481|39486|39490|39493|39496|39536|39538|39539|39542|39547|39548|39550|39551|39553|39560|39561|39621|39622|39623|39624|39625|39626|39627|39628|39629|39633|39635|39636|39638|39639|39642|39644|39647|39707|39709|39712|39722|39724|39726|39727|39743|39744|39745|39748|39755|39758|39789|39794|39795|39796|39801|39802|39803|39807|39898|39905|39907|39908|39909|39910|39911|39912|39914|39915|39916|39917|39919|39921|39923|39925|39955|39968|39970|39979|39991|39992|39994|39995|43590|46620|47186|48794|49136|50216|52358|54884|56364|56913|56949|56991|57122|57141|57240|57496|57500|57768|57772|57784|58944|67649))/i.test(location.href)) {
productName = 'Acronis Files Connect';
bannerURL = 'banner-acronis-files-connect.html'; 
}
if (/snap.*?deploy|(\/(11120|14670|1523|15473|15476|15677|15721|16362|16373|16388|16412|1664|1665|17158|1722|17511|18327|18514|18746|18747|18748|18791|18840|18890|20416|20417|20527|20528|20607|20610|2304|23178|24995|24998|24999|25086|25093|25124|25194|25215|25345|25798|25891|25894|25895|25897|25900|25902|25905|25906|26151|26155|26159|26161|26185|26186|26255|26256|26258|26259|26266|26297|26298|26300|26318|26645|26914|2786|27928|30855|35411|36643|36647|36679|36683|36698|36763|41183|4326|4495|46415|46425|46445|46450|46670|46800|46885|46997|47152|47252|47253|47256|47257|47259|47361|47403|47409|47415|47421|47427|47433|47439|47445|47475|47481|47552|47900|48134|4837|49034|49094|49100|49246|49724|49730|49874|50138|55478|56133|56352|57455|57625|57705|57708|57716|58060|59925|60230|60643|60878|60893|61072|61087|61332|61344|62387|62493|6637|68356|68423|68460|68465|68468|68474|68481|68482|68483|68484|68486|68492|68493|68511|68765|69143|8340|9370))/i.test(location.href)) {
productName = 'Snap Deploy';
bannerURL = 'banner-acronis-snap-deploy.html'; 
}
$(function() {
$.ajax({
type: 'get',
cache: false,
async: false,
url: 'https://www.acronis.com/en-us/js/crosssys/ribbons/contents/' + bannerURL
}).done(function (html) {
if (isForum) {
html = html.replace('<div class="a-banner-media">', '<div class="a-banner-media a-banner-media-forum">');
}
$(html).insertAfter(isKB ? $('#search-wrapper') : $('#seo-banners'));
$('.a-banner-media-close').on('click', function (e) {
e.preventDefault();
var expires = new Date();
expires.setFullYear(expires.getFullYear() + 1);
setCookie('a-banner-media', 'hide', expires.toUTCString(), '/');
$('.a-banner-media').remove();
});
if (dataLayer) {
$('.a-banner-media a').on('click', function(){
dataLayer.push({
'event': 'Acronis',
'eventCategory': 'click',
'eventAction': this.href,
'eventLabel': $(this).hasClass('a-banner-media-try') ? 'Try now' : 'Learn more',
'eventContext': 'Banner ' + (isKB ? 'KB' : 'Forum'),
'eventContent': productName
});
});
}
});
});
}
})(window.$ || window.jQuery);
if (window.location.host === 'www.acronis.com' || window.location.host.indexOf('corp.acronis.com') !== -1 ) {
(function ($) {
if (!$) { return; }
var match = '';
var redirectLink = '';
var pathname = window.location.pathname;
var locale = pathname.replace(/^\//,'').replace(/\/.*/,'');
var locales = {
'en-hk': 'HK',
'zh-cn': 'CN',
'zh-tw': 'TW'
};
var redirect = {
'home': {
'HK': 'http://www.lapcom.com.hk/en/product.php?cid=1',
'CN': 'http://www.tieten.cn/trialBuy/acronis/index.html#bga4',
'TW': 'https://www.t-tech.com.tw/acronis-personal.php'
},
'business': {
'HK': 'http://www.lapcom.com.hk/en/product.php?cid=1',
'CN': 'http://www.tieten.cn/trialBuy/acronis/index.html#bga1',
'TW': 'https://www.t-tech.com.tw/portal_c1_first.php?owner_num=c1_20060&button_num=c1&folder_id=3425'
},
'add': {
'HK': 'http://www.lapcom.com.hk/en/product.php?cid=1',
'CN': 'http://www.tieten.cn/trialBuy/acronis/index.html#bga4',
'TW': 'https://www.t-tech.com.tw/acronis-personal.php'
}
};
var pages = {
'/products/true-image/purchasing': redirect.home,
'/products/disk-director/upgrade': redirect.add,
'/products/disk-director/purchasing': redirect.add,
'/products/true-image/upgrade': redirect.home,
'/products/backup/cloud-storage/purchasing': redirect.business,
'/products/backup/purchasing': redirect.business,
'/solutions/backup/server/purchasing': redirect.business,
'/solutions/backup/g-suite/purchasing': redirect.business,
'/solutions/backup/office-365/purchasing': redirect.business,
'/solutions/backup/workstation/purchasing': redirect.business,
'/solutions/backup/virtual-machine/purchasing': redirect.business,
'/solutions/backup/server-essentials/purchasing': redirect.business,
'/products/backup/disaster-recovery/purchasing': redirect.business,
'/solutions/backup/server/purchasing/server-advanced': redirect.business
};
if (!/en-hk|zh-cn|zh-tw/.test(locale)) {
return false;
}
$.each(pages, function(k, v) {
if (match) {
return;
} 
if (new RegExp(k, 'g').test(pathname)) {
match = v;
}
});
if(match) {
$.ajax({
url: 'https://geoapi.acronis.com/api',
type: 'GET',
cache: false,
dataType: 'json',
success: function(response){
if (response && response.country && response.country.code) {
redirectLink = match[response.country.code] ? match[response.country.code] : '';
}
},
complete: function () {
$('body').css({'display': 'none'});
window.location.assign(redirectLink ? redirectLink : match[locales[locale]] );
}
});
}
})(window.$ || window.jQuery);
(function ($) {
if (!$) { return; }
var locale = (/^\/(\w\w-\w\w)\/?/.exec(location.pathname) || ['/en-us/', 'en-us'])[1],
expires = new Date();
expires.setFullYear(expires.getFullYear() + 1);
setCookie('language_prefix', locale, expires.toUTCString(), '/');
function setCookie(name, value, expires, path, domain, secure) {
document.cookie = name + '=' + escape(value) +
((expires) ? '; expires=' + expires : '') +
((path) ? '; path=' + path : '') +
((domain) ? '; domain=' + domain : '') +
((secure) ? '; secure' : '');
}
function getCookie(name) {
var cookie = ' ' + document.cookie;
var search = ' ' + name + '=';
var set_str = null;
var offset = 0;
var end = 0;
if (cookie.length > 0) {
offset = cookie.indexOf(search);
if (offset !== -1) {
offset += search.length;
end = cookie.indexOf(';', offset);
if (end === -1) {
end = cookie.length;
}
set_str = unescape(cookie.substring(offset, end));
}
}
return (set_str);
}
})(window.$ || window.jQuery);
}
});