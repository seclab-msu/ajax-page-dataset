/**
 * Created by zhoulongfei on 2018/6/21.
 * E-mail:36995800@163.com
 */
(function(doc,win,undefined){
    function  clearCookie(k,domain) {
        var d=new Date();
        d.setTime(+d-1000);
        domain=domain||doc.location.host;
        doc.cookie = k + "=0;" +"expires="+d.toUTCString()+ ";max-age=0;domain="+domain+";path=/";
    }
    function setCookie(k,v,t,domain){
        var d=new Date();
        t = t || 365 * 24 * 60 * 60;
        d.setTime(+d+1000*t);
        domain=domain?domain:doc.location.host.split(':')[0];
        doc.cookie = k + "=" + v +";expires="+d.toUTCString()+";max-age=" + t+";domain="+domain+";path=/";
    }
    clearCookie('place_ip','.xcar.com.cn');
    clearCookie('place_crid','.xcar.com.cn');
    clearCookie('place_prid','.xcar.com.cn');
    clearCookie('news_cityinfo_1029','.xcar.com.cn');
    setCookie('isRemoveCookie',1,60*60,'.xcar.com.cn');
})(document,window);