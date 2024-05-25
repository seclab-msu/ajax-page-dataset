$(document).ready(function(){
	/* 下拉插件JS */
	$(".selectbox_two").hover(
	  function () {
		$(this).addClass("selectbox_hover");
	  },
	  function () {
		$(this).removeClass("selectbox_hover");
	  }
	);
	$(".option_two li").hover(
	  function () {
		$(this).addClass("active");
	  },
	  function () {
		$(this).removeClass("active");
	  }
	);
	$(".selecttxt_two").click(function(event){
		//停止冒泡
		event.stopPropagation();
		if($(this).siblings(".option_two").height()>=300){
			$(this).siblings(".option_two").height(300);
		}else{
			$(this).siblings(".option_two").height('auto');
		}
		
		/* 判断当前状态如果打开则关闭 */
		if($(this).parent().is('.selectbox_on')){
			$(this).parent().find(".option_two").hide();
			$(this).parent().removeClass("selectbox_on");	
			return;
		};
		$(".selectbox_two").removeClass("selectbox_on");			
		$(this).parent().addClass("selectbox_on");
		$(".selectbox_two").find('.option_two').hide();
		$(this).parent().find(".option_two").show();
	});
	
	
	/* 点击页面其他地方，清除当前下拉框状态 */
	$(document).click(function(event){
		var eo=$(event.target);
		if($(".selectbox_two").is(":visible") && eo.attr("class")!="option_two" && !eo.parent(".option_two").length)
		$('.option_two').hide();
		$(".selectbox_two").removeClass("selectbox_on");					  
	});
	/* 赋值给文本框 */
	$(".option_two li").not(".onblur").click(function(){
		var value=$(this).children("a").html();
		$(this).parents(".option_two").siblings(".selecttxt_two").children(".selectem_two").html(value);
		$("#select_value").val(value);
		$('.option_two').hide();
		$(".selectbox_two").removeClass("selectbox_on");	
		$(this).parents(".option_two").siblings(".selecttxt_two").css("color","#666");
	 })
	 /* 下拉插件JS end */
	 
	 
	 	//个人声明
$('#info_protect').change(function(){
	if($(this).is(':checked')){
		$("#appsubmit").css({'background-color':'#fd9001','cursor':'pointer'});
	}else{
		$("#appsubmit").css({'background-color':'#cbcbcb','cursor':'default'});
	}	
})



/** 更多相关车系 S **/
	var liLength = $('.polymerization_ul li').length
	if(liLength/2 >= 3){
		$('.polymerization_ul').width('529px')
	}else{
    if(liLength === 2){
      $('.polymerization_ul').width('360px')
    }else{
      $('.polymerization_ul').css({'width':liLength/2 * 180 - 12 + "px"})
    }
	}

	$('.polymerization').hover(function(){
		$(this).find('.polymerization_txt ').addClass('polymerization_cur');
		$(this).find('.polymerization_ul').show();
	},function(){
		$(this).find('.polymerization_txt ').removeClass('polymerization_cur')
		$(this).find('.polymerization_ul').hide();
	})
/** 更多相关车系 E **/	 
});