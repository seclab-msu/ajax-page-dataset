(function(w,d,s,i) {
    var f,j,c; f=d.getElementsByTagName(s)[0]; j=d.createElement(s); j.async=true; c=d.currentScript;
    j.src='https://www.clarity.ms/tag/uet/'+i;
    j.onload = function () {
        if (!c) return;
        var co = function(u) { return u && typeof u === 'object' && !(u instanceof Array) && u.beaconParams && u.beaconParams.mid && w.clarity; };
        var r = 10;
        var cl = function() {
            if (r-- < 1) return;
            var uo = c.getAttribute('data-ueto');
            if (!uo) return;
            var u = w[uo];
            if (!co(u)) { setTimeout(function () { cl(); }, 1000); return; }
            w.clarity('set', '_uetmid', u.beaconParams.mid);
        };
        cl();
    };
    f.parentNode.insertBefore(j,f);
})(window, document, 'script', '5707321');
