
function scriptReg1f(){function mkScript(fpSpec){var script=document.createElement('script');var screenSpec="screen="+
((typeof(screen)=="undefined")?"undefined":screen.width+"*"+screen.height+"*"+
(screen.colorDepth?screen.colorDepth:screen.pixelDepth));script.src='https://track.onef.pro/track/reg/v1?'+screenSpec+'&'+fpSpec+'&nonce=OF96bwZyc6'+'&1f_pixel_id=7709678550&event_type=visit';document.head.appendChild(script);};function isImportSupported(){var supported=false;try{eval("try { import('foo').catch(() => {}); } catch (e) {}");supported=true;}catch(e){}
return supported;};if(isImportSupported()){var fpPromise=import('https://track.onef.pro/cdn/fingerprintjs').then(FingerprintJS=>FingerprintJS.load()).then(fp=>fp.get()).then(result=>{var fp=result.visitorId;var fpSpec="fp="+
((typeof(fp)=="undefined")?"undefined":fp);return fpSpec;});var timeout=(prom,time)=>{var timer;return Promise.race([prom,new Promise((_r,rej)=>timer=setTimeout(rej,time))]).finally(()=>clearTimeout(timer));}
timeout(fpPromise,15000).then(fpSpec=>mkScript(fpSpec)).catch(err=>{mkScript("fp=undefined");});}else{mkScript("fp=undefined");}}
scriptReg1f();