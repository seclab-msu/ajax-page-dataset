/* 
功能函数 集合
@ 朝革图
*/

/*
------------------------------------------------------------
IE修复document.getElementById()获取正确的元素
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
* 浏览器 基本信息 
BrowserInfo.name  值 ( msie , chrome , opera , safari)
BrowserInfo.version 值是 int 型 数字 表示 浏览器版本
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
		/* 名字规则在此处添加 */
		'MediaPlayer' : {ie:"MediaPlayer.MediaPlayer",notie:"windows media player plug-in dynamic link library"},	/* 是否支持MediaPlayer */
		'Flash' : {ie:"ShockwaveFlash.ShockwaveFlash",notie:"shockwave flash"}	/* 是否支持Flash */
	}
	function check_(plugin){
		var sustain = false;//是否支持
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
* 获取URL的GET参数 返回值是对象
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
* 鼠标进入事件 中是否是该元素判断 过滤掉 冒泡而来的事件
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
* 获取正确的 offsetLeft 和 offsetTop
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
* 屏幕滚动 到指定元素 参数(id,差值,回调)
* id 一定要是字符串!!!
**************************************************************
*/
mScroll = function (){
	var doc = document;
	var E;
	/* 检测 documentElement.scrollTop 和 document.body.scrollTop 那个有效 */
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
* cookie 操作:
* setCookie(cookie名,值,);
* unset(cookie名);
* getCookie(cookie名);
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
* 渐隐、渐现
* fadeIn(元素,回调)
* fadeOut(元素,回调)
**************************************************************
*/
var fadeIn = function(element,callback){	//渐隐
	if(!document.addEventListener){	// IE下
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
var fadeOut = function(element,callback){	//渐显
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
	}else{	//非ie下
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
* 设置元素透明度 mFade(元素,透明度)  透明度为 0~10 整数;
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
* 获取元素高度 宽度
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
* 初步 这么写
**************************************************************
*/
function css(ele,sty,val){
	ele.style[sty] = val;
}

/*
**************************************************************
* DOMReady事件 domready(func); 只有参数是方法是才有效。
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
* 获取 兼容的 getScrollTop
**************************************************************
*/
function getScrollTop(){
	return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
}




/*
**************************************************************
* 事件绑定相关
**************************************************************
*/
var getEvent = function(event){
	return event?event:window.event;
};
var getTarget = function(event){
	return event.target||event.srcElement;	// !IE||IE
};
//阻止默认事件
var preventDefault = function(event){
	if(event.preventDefault){	// !IE
		event.preventDefault();
	}else{	//IE
		event.returnValue = false;
	}
}
//停止捕获or冒泡
var stopPropagation = function(event){
	if(event.stopPropagation){
		event.stopPropagation();
	}else{
		event.cancelBubble = true;
	}
};
//获取相关元素 只对 mouseover mouseout 有意义
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
//鼠标事件	获取按钮值（0左键  1中键  2右键）
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

//键盘事件 获取字符编码
var getCharCode = function(event){
	if(typeof event.charCode == 'number'){
		return event.charCode;	// !IE	非IE有charCode属性来保存编码
	} else {
		return event.keyCode;	// IE	而IE用keyCode属性来保存编码
	}
};

	
/*
**************************************************************
* 标签切换
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
	id : 'a1',				//必填
	active : 'active',		//默认 '' 没有
	nowPage : 1,			//默认是 0 ，既不是从第一个开始的，都需要这个参数来帮助程序定位。
	typeof : 'click'		//默认 mouseover
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
		tab_show_hidden[id].box.children.item(tab_show_hidden[id].actBefore).style.display = 'none';	//隐藏
		tab_show_hidden[id].box.children.item(tab_show_hidden[id].actNow).style.display = 'block';			//显示
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
* 删除事件
**************************************************************
*/
var removeHandler = function(element,type,handler){
	if(element.removeEventListener){	// !IE
		element.removeEventListener(type,handler,false);
	} else if(element.detachEvent){	// IE
		element.detachEvent('on'+type,handler,false);
	} else {	//DOM0级
		element['on'+type] = null;
	}
}


/*
**************************************************************
* 判断真假
**************************************************************
*/
var chk = function(obj){
    return !!(obj || obj === 0);

};

/*
**************************************************************
* 当前分辨率是否不大于1024
**************************************************************
*/
var is1024 = true;
var is1280 = true;
if(window.screen.width > 1024)is1024 = false;
if(window.screen.width > 1280)is1280 = false;



/*
**************************************************************
* 去掉了 google 分享后，避免页面残留报错
**************************************************************
*/
var _gaq={push:function(){}}