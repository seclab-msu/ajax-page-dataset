// console.log("%c30秒自动更新消息",'color:#f0f0f0');
var updat_news_handler = [];
updat_news_handler.run = false;
function loadScript1234(url){
	var script = document.createElement('script');
	script.type= "text/javascript";
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
	script.id="msg_forhead";
	document.getElementsByTagName('head')[0].appendChild(script);
}
if(null != getCookie("_discuz_uid")){
	// console.log("登录时就有ID");
	updat_news_handler.run = true;
	updat_news();
}
function clearUpdateNews(){
	for(var i=0,len=updat_news_handler.length;i<len;i++){
		clearInterval(updat_news_handler[i]);
	}
	updat_news_handler.length = 0;
	if(document.getElementById('msg_forhead')){
		var msg_forhead=document.getElementById('msg_forhead');
		msg_forhead.parentNode.removeChild(msg_forhead);	
	}
}
var updat_newsi=0;
function updat_news(){
	// console.log("调用了updat_news" + (updat_newsi++));
	clearUpdateNews();
	if(updat_news_handler.run){
		var color = (parseInt(Math.random()*239+16).toString(16)) + "" + (parseInt(Math.random()*239+16).toString(16)) + "" + (parseInt(Math.random()*239+16).toString(16));
		// console.log("%c创建计时器",('background-color:#'+ color) );
		updat_news_handler.push( setTimeout(updat_news, 30000) );
		var dic_id = getCookie("_discuz_uid");
		if(dic_id!=""&& dic_id!=null) {
			// console.log("请求//msg.xcar.com.cn/newpop/msg_tip_new_forbbs.php?uid="+dic_id);
			loadScript1234('//msg.xcar.com.cn/newpop/msg_tip_new_forbbs.php?uid='+dic_id+'&type=cms');
		}else{
			// console.log("已退出登录");
			clearUpdateNews();
			updat_news_handler.run = false;
		}
	}
}