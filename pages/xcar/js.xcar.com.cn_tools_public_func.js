/* 
���ܺ��� ����
@ ����ͼ
*/

/*
------------------------------------------------------------
IE�޸�document.getElementById()��ȡ��ȷ��Ԫ��
------------------------------------------------------------
*/
function getId(id){
	var temp = document.getElementById(id);
	if(temp!=null && temp.id!=id){
		temp = document.getElementsByName(id);
		for(var i=0,len=temp.length;i<len;i++){
			if(temp[i].id==id)return temp[i];
		}
	}else{
		return temp;
	}
}

/*
**************************************************************
* ����� ������Ϣ 
BrowserInfo.name  ֵ ( msie , chrome , opera , safari)
BrowserInfo.version ֵ�� int �� ���� ��ʾ ������汾
**************************************************************
*/
if(typeof console == 'undefined'){
	console = {log:function(s){}};
}
var suserAgent = navigator.userAgent.toLowerCase();
var BrowserInfo = {};
if(suserAgent){
	if(/*@cc_on!@*/false){
		BrowserInfo.name = 'msie';
		BrowserInfo.version = parseInt( suserAgent.match(/msie (\d+)/)&&suserAgent.match(/msie (\d+)/)[1]||0, 10 );
		// BrowserInfo.clientH = document.body.clientHeight;
	}else if( suserAgent.indexOf('chrome') > -1 ){
		BrowserInfo.name = 'chrome';
		BrowserInfo.version = parseInt( suserAgent.match(/chrome\/(\d+)/)&&suserAgent.match(/chrome\/(\d+)/)[1]||0, 10 );
		// BrowserInfo.clientH = document.documentElement.clientHeight;
	}else if(!!window.opera){
		BrowserInfo.name = 'opera';
		BrowserInfo.version = parseInt( suserAgent.match(/opera\/(\d+)/)&&suserAgent.match(/opera\/(\d+)/)[1]||0, 10 );
		// BrowserInfo.clientH = document.body.clientHeight;
	}else if( suserAgent.indexOf('safari') > -1 ){
		BrowserInfo.name = 'safari';
		BrowserInfo.version = parseInt( suserAgent.match(/version\/(\d+)/)&&suserAgent.match(/version\/(\d+)/)[1]||0, 10 );
		// BrowserInfo.clientH = document.body.clientHeight;
	}else if( suserAgent.indexOf('firefox') > -1 ){
		BrowserInfo.name = 'firefox';
		BrowserInfo.version = parseInt( suserAgent.match(/firefox\/(\d+)/)&&suserAgent.match(/firefox\/(\d+)/)[1]||0, 10 );
		// BrowserInfo.clientH = document.body.clientHeight;
	}else{
		BrowserInfo.name = 'others';
		BrowserInfo.version = -1;
		// BrowserInfo.clientH = document.body.clientHeight;
	}
}else{
	
	BrowserInfo.name = 'others';
	BrowserInfo.version = -1;	
}

BrowserInfo.plugins = {};
(function(){
	var plugins = {
		/* ���ֹ����ڴ˴���� */
		'MediaPlayer' : {ie:"MediaPlayer.MediaPlayer",notie:"windows media player plug-in dynamic link library"},	/* �Ƿ�֧��MediaPlayer */
		'Flash' : {ie:"ShockwaveFlash.ShockwaveFlash",notie:"shockwave flash"}	/* �Ƿ�֧��Flash */
	}
	function check_(plugin){
		var sustain = false;//�Ƿ�֧��
		try{
			var ie_flash = new ActiveXObject(plugin.ie);
			sustain = true;
		}catch(e){
			if (navigator.plugins) {	
				for (var i=0; i < navigator.plugins.length; i++) {
					if (navigator.plugins[i].name.toLowerCase().indexOf(plugin.notie) >= 0) {
						sustain = true;
					}
				}
			}
		}
		return sustain;
	};
	for(var i in plugins){
		BrowserInfo.plugins[i] = check_(plugins[i]);
	}
})();
/*
**************************************************************
* ��ȡURL��GET���� ����ֵ�Ƕ���
**************************************************************
*/
function urlGET(){
	var args = {};
    var search = decodeURIComponent(location.search.substring(1));
	var arr = search.split('&');
	for(var i=0,len=arr.length;i<len;i++){
		var t = arr[i].split('=');
		args[t[0]] = t[1];
	}
    return args;
}
/*
**************************************************************
* addHandler
**************************************************************
*/
function addHandler(a,c,b){if(a==null)return;if(a.addEventListener){addHandler=function(d,f,e){if(d==null)return;d.addEventListener(f,e,false)}}else{if(a.attachEvent){addHandler=function(d,f,e){if(d==null)return;d.attachEvent("on"+f,e)}}else{addHandler=function(d,f,e){if(d==null)return;d["on"+f]=e}}}addHandler(a,c,b)};
/*
**************************************************************
* �������¼� ���Ƿ��Ǹ�Ԫ���ж� ���˵� ð�ݶ������¼�
addHandler(main_title,'mouseover',function(e){
    if(checkHover(e,this)){
		do something...
    }
});
**************************************************************
*/
function contains(parentNode, childNode) {
    try{
		if (parentNode.contains) {
			return parentNode != childNode && parentNode.contains(childNode);
		} else {
			return !!(parentNode.compareDocumentPosition(childNode) & 16);
		}
	}catch(e){}
}
function checkHover(e,target){
	var e = e||window.event;
    if (e.type=="mouseover")  {
        return !contains(target,e.relatedTarget||e.fromElement) && !((e.relatedTarget||e.fromElement)===target);
    } else {
        return !contains(target,e.relatedTarget||e.toElement) && !((e.relatedTarget||e.toElement)===target);
    }
}
/*
**************************************************************
* ��ȡ��ȷ�� offsetLeft �� offsetTop
**************************************************************
*/
function getAbsLeft(obj){
	var l = obj.offsetLeft;
	while(obj.offsetParent != null){
		obj = obj.offsetParent;
		l += obj.offsetLeft;
	}
	return l;
}
function getAbsTop(obj){
	var top = obj.offsetTop;
	while(obj.offsetParent != null){
		// console.log(obj.offsetTop);
		obj = obj.offsetParent;
		top += obj.offsetTop;
	}
	return top;
}
/*
**************************************************************
* ��Ļ���� ��ָ��Ԫ�� ����(id,��ֵ,�ص�)
* id һ��Ҫ���ַ���!!!
**************************************************************
*/
mScroll = function (){
	var doc = document;
	var E;
	/* ��� documentElement.scrollTop �� document.body.scrollTop �Ǹ���Ч */
	if(doc.documentElement.scrollTop==0)
		doc.documentElement.scrollTop = 1;
	if(doc.documentElement.scrollTop>0){
		E = doc.documentElement;
	}else{
		E = doc.body;
	}
	doc.documentElement.scrollTop = 0;
	mScrollClear = function(){
		
	};
	return function(id,dv,CF){
		// console.log(id);
		if(typeof window.mScroll_cache == "undefined")window.mScroll_cache = {};
		if(typeof windowmScroll_lockmScroll_cache == "undefined")window.mScroll_lock = false;
		if(typeof dv == "undefined") dv = 35;
		if(!mScroll_lock){
			mScroll_lock = true;
			if(typeof mScroll_cache[id] == "undefined" && typeof id != 'number'){
				var temp_top = 0;
				var f1 = doc.getElementById(id);
				mScroll_cache[id] = getAbsTop(f1)-dv;
			}
			var x = 1,
			b = parseInt(E.scrollTop),
			c = (typeof id == 'number')?id-b : parseInt(mScroll_cache[id])-b,
			d = (500) / 12,
			t = 0;
			function Run(){
				var T = t;
				var temp = Math.ceil(- c * (T /= d) * (T - 2) + b);
				E.scrollTop = temp;
				if(t<d){
					t++;
					setTimeout(Run,10);
				}else{
					E.scrollTop = (typeof id == 'number')?id : parseInt(mScroll_cache[id]);
					mScroll_lock = false;
					if(typeof CF == 'function')CF();
				}
			}
			Run();
		}
	}
}();
/*
**************************************************************
* cookie ����:
* setCookie(cookie��,ֵ,);
* unset(cookie��);
* getCookie(cookie��);
**************************************************************
*/
function setCookie(name,value,expires,path,domain,secure){
	var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
	if(expires instanceof Date){
		cookieText += ";expires=" + expires.toGMTString();
	}
	if(path){
		cookieText += ";path=" + path;
	}
	if(domain){
		cookieText += ";domain=" + domain;
	}
	if(secure){
		cookieText += ";secure";
	}
	document.cookie = cookieText;
}
function unset(name,path,domain,secure){
	setCookie(name,"",new Date(0),path,domain,secure);
}
function getCookie(name){
	var cookieName  = encodeURIComponent(name) + "=",
		cookieStart = document.cookie.indexOf(cookieName),
		cookieValue = null;
	if(cookieStart>-1){
		var cookieEnd = document.cookie.indexOf(";",cookieStart);
		if(cookieEnd == -1){
			cookieEnd = document.cookie.length;
		}
		cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length,cookieEnd));
	}
	return cookieValue;
}

/*
**************************************************************
* ����������
* fadeIn(Ԫ��,�ص�)
* fadeOut(Ԫ��,�ص�)
**************************************************************
*/
var fadeIn = function(element,callback){	//����
	if(!document.addEventListener){	// IE��
		fadeIn = function(element,callback){
			element.style.filter = "alpha(opacity=0)";
			var i = 0;
			function run(){
				element.style.filter = "alpha(opacity=" + (i*10) + ")";
				i = i + 1;
				if(i>=9){
					element.style.filter = "alpha(opacity=100)";
					if(typeof callback == 'function')callback();
				}else{
					setTimeout(run,100);
				}
			}
			setTimeout(run,100);
		}
	}else{
		fadeIn = function(element,callback){
			element.style.opacity = 0;
			var i = 0;
			function run(){
				element.style.opacity = "0." + i;
				i = i + 1;
				if(i>=9){
					element.style.opacity = 1;
					if(typeof callback == 'function')callback();
				}else{
					setTimeout(run,100);
				}
			}
			setTimeout(run,100);
		}
	}
	fadeIn(element,callback);
};
var fadeOut = function(element,callback){	//����
	if(!document.addEventListener){
		fadeOut = function(element,callback){
			var i = 9;
			function run(){
				element.style.filter = "alpha(opacity=" + (i*10) + ")";
				i = i - 1;
				if(i<=0){
					element.style.filter = "alpha(opacity=0)";
					if(typeof callback == 'function')callback();
				}else{
					setTimeout(run,100);
				}
			}
			setTimeout(run,100);
		}
	}else{	//��ie��
		fadeOut = function(element,callback){
			var i = 9;
			function run(){
				element.style.opacity = "0." + i;
				i = i - 1;
				if(i<=0){
					element.style.opacity = 0;
					if(typeof callback == 'function')callback();
				}else{
					setTimeout(run,100);
				}
			}
			setTimeout(run,100);
		}
	}
	fadeOut(element,callback);
};
/*
**************************************************************
* ����Ԫ��͸���� mFade(Ԫ��,͸����)  ͸����Ϊ 0~10 ����;
**************************************************************
*/
function mFade(element,i){
	if(!document.addEventListener){
		element.style.filter = "alpha(opacity=" + (i*10) + ")";
	}else{
		if(i==10){
			element.style.opacity = "1";
		}else{
			element.style.opacity = "0." + i;
		}
	}
}

/*
**************************************************************
* loadScript
**************************************************************
*/
var documentHead = document.getElementsByTagName('head')[0];
var documentBody = document.body;
function loadScript(url,callback,suicide){
	if(typeof url == 'object'){
		var script = document.createElement('script');
		for(var i in url){
			if( typeof url[i] == 'string')script.setAttribute(i,url[i]);
		}
		script.type= "text/javascript";
		if(typeof loadScriptCharset != 'undefined')script.charset = loadScriptCharset;
		if(script.readyState){
			script.onreadystatechange = function(){
				if(script.readyState == 'loaded' || script.readyState == 'complete'){
					script.onreadystatechange = null;
					if(typeof url.callback == 'function')url.callback();
				}
			}
		}else{
			script.onload = function(){
				if(typeof url.suicide != 'undefined' && url.suicide)documentHead.removeChild(script);
				if(typeof url.callback == 'function')url.callback();
			}
		}
		script.src = url.url;
		document.getElementsByTagName('head')[0].appendChild(script);
	}else if(typeof url == 'string'){
		var script = document.createElement('script');
		script.type= "text/javascript";
		if(typeof loadScriptCharset != 'undefined')script.charset = loadScriptCharset;
		if(script.readyState){
			script.onreadystatechange = function(){
				if(script.readyState == 'loaded' || script.readyState == 'complete'){
					script.onreadystatechange = null;
					if(typeof callback == 'function')callback();
				}
			}
		}else{
			script.onload = function(){
				if(typeof suicide != 'undefined' && suicide)documentHead.removeChild(script);
				if(typeof callback == 'function')callback();
			}
		}
		script.src = url;
		document.getElementsByTagName('head')[0].appendChild(script);
	}else{
		return ;
	}
	;
}

/*
**************************************************************
* ��ȡԪ�ظ߶� ���
**************************************************************
*/
function getOffsetHeight(id){
	var ele = null;
	if(typeof id == 'string'){
		ele = getId(id);
	}else if(typeof ele == 'object'){
		ele = id;
	}else{
		return 0;
	}
	var VoffsetHeight = 0;
	var Vdisplay = ele.style.display;
	var Vvisibility = ele.style.visibility;
	var Vposition = ele.style.position;
	ele.style.visibility = 'hidden'
	ele.style.display = 'block';
	ele.style.position = 'absolute';
	VoffsetHeight = ele.offsetHeight;
	ele.style.display    = Vdisplay;
	ele.style.visibility = Vvisibility;
	ele.style.position   = Vposition;
	Vdisplay    = null;
	Vvisibility = null;
	Vposition   = null;
	return VoffsetHeight;
}
function getOffsetWidth(id){
	var ele = null;
	if(typeof id == 'string'){
		ele = getId(id);
	}else if(typeof ele == 'object'){
		ele = id;
	}else{
		return 0;
	}
	var VoffsetHeight = 0;
	var Vdisplay = ele.style.display;
	var Vvisibility = ele.style.visibility;
	var Vposition = ele.style.position;
	ele.style.visibility = 'hidden'
	ele.style.display = 'block';
	ele.style.position = 'absolute';
	VoffsetHeight = ele.offsetWidth;
	ele.style.display    = Vdisplay;
	ele.style.visibility = Vvisibility;
	ele.style.position   = Vposition;
	Vdisplay    = null;
	Vvisibility = null;
	Vposition   = null;
	return VoffsetHeight;
}

function css(ele,sty,val){
	ele.style[sty] = val;
}
/*
**************************************************************
* ���� ��ôд
**************************************************************
*/
function css(ele,sty,val){
	ele.style[sty] = val;
}

/*
**************************************************************
* DOMReady�¼� domready(func); ֻ�в����Ƿ����ǲ���Ч��
**************************************************************
*/
(function (){
	var domready_cache = [];
	function execFunc(){
		if (arguments.callee.done) return;
		arguments.callee.done = true;
		if (_timer) clearInterval(_timer);
		for(var i =0,len = domready_cache.length;i<len;i++){
			if(typeof domready_cache[i] == 'function'){
				domready_cache[i]();
			}
		}
	};

	domready = function (func){
		if(typeof func == 'function'){
			domready_cache.push(func);
		}
	};

	switch (BrowserInfo.name){
		case 'msie':
			document.write("<script id='__ie_onload' defer src=javascript:void(0)><\/script>");
			var script = document.getElementById("__ie_onload");
			script.onreadystatechange = function() {
				if (this.readyState == "complete") {
					execFunc();
				}
			};
			return  ;
		case 'chrome':
		case 'firefox':
		case 'opera':
			document.addEventListener("DOMContentLoaded", execFunc, false);
			return  ;
		case 'safari':
			 var _timer = setInterval(function() {
				if (/loaded|complete/.test(document.readyState)) {
					execFunc();
				}
			}, 10);
			return  ;
		default :
			addHandler(window,'load',function(){
				execFunc();
			});
	}
})();


/*
**************************************************************
* ��ȡ ���ݵ� getScrollTop
**************************************************************
*/
function getScrollTop(){
	return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
}




/*
**************************************************************
* �¼������
**************************************************************
*/
var getEvent = function(event){
	return event?event:window.event;
};
var getTarget = function(event){
	return event.target||event.srcElement;	// !IE||IE
};
//��ֹĬ���¼�
var preventDefault = function(event){
	if(event.preventDefault){	// !IE
		event.preventDefault();
	}else{	//IE
		event.returnValue = false;
	}
}
//ֹͣ����orð��
var stopPropagation = function(event){
	if(event.stopPropagation){
		event.stopPropagation();
	}else{
		event.cancelBubble = true;
	}
};
//��ȡ���Ԫ�� ֻ�� mouseover mouseout ������
var getRelatedTarget = function(event){
	if(event.relatedTarget){
		return event.relatedTarget;
	} else if(event.toElement){
		return event.toElement;
	} else if(event.fromElement){
		return event.fromElement;
	} else {
		return null;
	}
};
//����¼�	��ȡ��ťֵ��0���  1�м�  2�Ҽ���
var getButton = function(event){
	if(document.implementation.hasFeature("MouseEvents","2.0")){
		return event.button;	// !IE
	}else{
		switch(event.button){	// IE
			case 0:
			case 1:
			case 3:
			case 5:
			case 7:
			return 0 ;
			case 2:
			case 6:
			return 2;
			case 4:
			return 1;
		}
	}
};

//�����¼� ��ȡ�ַ�����
var getCharCode = function(event){
	if(typeof event.charCode == 'number'){
		return event.charCode;	// !IE	��IE��charCode�������������
	} else {
		return event.keyCode;	// IE	��IE��keyCode�������������
	}
};

	
/*
**************************************************************
* ��ǩ�л�
**************************************************************
<div id="a1_tab">
	<span>11111</span>
	<span>22222</span>
	<span>33333</span>
	<span>44444</span>
</div>
<div id="a1_box">
	<div style="display:non1e">11111111111111</div>
	<div style="display:none">22222222222222</div>
	<div style="display:none">33333333333333</div>
	<div style="display:none">44444444444444</div>
</div>
<script>
tab_show_hidden("a1");
tab_show_hidden({
	id : 'a1',				//����
	active : 'active',		//Ĭ�� '' û��
	nowPage : 1,			//Ĭ���� 0 ���Ȳ��Ǵӵ�һ����ʼ�ģ�����Ҫ�����������������λ��
	typeof : 'click'		//Ĭ�� mouseover
});
</script>
*/
function tab_show_hidden(obj){
	var id;
	if(typeof obj != 'undefined' && typeof obj == 'string'){
		id = obj;
		tab_show_hidden[id] = {};
		tab_show_hidden[id].type = "mouseover";
	}else if(typeof obj != 'undefined' && typeof obj == 'object' && typeof obj.id != 'undefined'){
		id = obj.id;
		tab_show_hidden[id] = {};
		if(typeof obj.type != 'undefined'){
			tab_show_hidden[id].type = obj.type;
		}else{
			tab_show_hidden[id].type = "mouseover";
		}
	}else{
		return false;
	}
	tab_show_hidden[id].tab = document.getElementById(id + '_tab');
	tab_show_hidden[id].box = document.getElementById(id + '_box');
	if(typeof obj.classname != 'undefined'){
		tab_show_hidden[id].classname = obj.classname;
	}else{
		tab_show_hidden[id].classname = tab_show_hidden[id].tab.children.item(1).className;
	}
	if(typeof obj.active != 'undefined'){
		tab_show_hidden[id].active = obj.active;
	}else{
		tab_show_hidden[id].active = '';
	}
	if(typeof obj.initNum != 'undefined'){
		tab_show_hidden[id].actBefore = obj.initNum;
		// console.log(tab_show_hidden[id].actBefore);
	}
	tab_show_hidden[id].func = function(i){
		tab_show_hidden[id].actNow = i;
		tab_show_hidden[id].tab.children.item(tab_show_hidden[id].actBefore).className = tab_show_hidden[id].classname;
		tab_show_hidden[id].tab.children.item(tab_show_hidden[id].actNow).className = tab_show_hidden[id].classname + ' ' + tab_show_hidden[id].active;
		tab_show_hidden[id].box.children.item(tab_show_hidden[id].actBefore).style.display = 'none';	//����
		tab_show_hidden[id].box.children.item(tab_show_hidden[id].actNow).style.display = 'block';			//��ʾ
		tab_show_hidden[id].actBefore = i;
	}
	tab_show_hidden[id].length = tab_show_hidden[id].tab.children.length;
	for(var i=0,len=tab_show_hidden[id].length;i<len;i++){
		if(tab_show_hidden[id].tab.children.item(i) != null){
			addHandler(tab_show_hidden[id].tab.children.item(i),tab_show_hidden[id].type,(function(i){
				var i = i;
				return function(event){
					tab_show_hidden[id].func(i);
				}
			})(i));
		}
	}
}



/*
**************************************************************
* ɾ���¼�
**************************************************************
*/
var removeHandler = function(element,type,handler){
	if(element.removeEventListener){	// !IE
		element.removeEventListener(type,handler,false);
	} else if(element.detachEvent){	// IE
		element.detachEvent('on'+type,handler,false);
	} else {	//DOM0��
		element['on'+type] = null;
	}
}


/*
**************************************************************
* �ж����
**************************************************************
*/
var chk = function(obj){
    return !!(obj || obj === 0);

};

/*
**************************************************************
* ��ǰ�ֱ����Ƿ񲻴���1024
**************************************************************
*/
var is1024 = true;
var is1280 = true;
if(window.screen.width > 1024)is1024 = false;
if(window.screen.width > 1280)is1280 = false;



/*
**************************************************************
* ȥ���� google ����󣬱���ҳ���������
**************************************************************
*/
var _gaq={push:function(){}}