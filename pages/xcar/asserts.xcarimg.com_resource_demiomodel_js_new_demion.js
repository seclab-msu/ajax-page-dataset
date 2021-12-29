$(function(){
    /* 颜色选择 */
    $(".hue a").hover(function () {
        $(this).find(".bd").show();
    }, function(){
        $(this).find(".bd").hide();
    });

    $("#photo_lazyload .img_lt:last").addClass("pb0");
    
    /* 吸顶滚动 */
    $(window).scroll(function(){
        if ($(this).scrollTop() > $('#NavRoll').offset().top){
            $(".tt_nav").addClass('tt_nav_cut');
            $(".secure").show();
        } else {
            $(".tt_nav").removeClass('tt_nav_cut');
            $(".secure").hide();
        }
    });

    // /* 设置第一张图片 */
    // $(".slider .bd li").first().before($(".slider .bd li").last());
    // /* 滚动切换 */
    // $(".slider").slide({
    //     mainCell:".bd ul",
    //     effect:"leftLoop",
    //     autoPlay:false,
    //     trigger:"click"
    // }); 已封装到页面

});