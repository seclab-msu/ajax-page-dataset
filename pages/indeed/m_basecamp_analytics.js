(function(){
    
function loadScript() {
   var script = document.createElement('script');
   var done = false;
   var head = document.getElementsByTagName("head")[0];
   script.src = 'https://www.googletagmanager.com/gtag/js?id=DC-' + '6927552';
   script.onload = script.onreadystatechange = function(){
     if ( !done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") ) {
       done = true;
       configureGtag();

      // IE memory leak
      script.onload = script.onreadystatechange = null;
      head.removeChild( script );
    }
  };
  head.appendChild(script);
}
function configureGtag() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'DC-' + '6927552');
}
loadScript();

window._comscore=[];window._comscore.push({c1:'2',c2:'6486505',c4:'http:\/\/www.indeed.com\/m\/basecamp\/viewjob?jk\x3dc98081f2d63e5496\x26from\x3dtp-serp\x26tk\x3d1g4vb5tuet561800',c15:'1g4vb5ttut561800'});
var s=document.createElement('script'),e=document.getElementsByTagName('script')[0];s.async=1;s.src=(document.location.protocol=='https:'?'https://sb':'http://b')+'.scorecardresearch.com/beacon.js';e.parentNode.insertBefore(s,e);

    })();
    