$.ui.dialog.prototype._focusTabbable = function(){};
$linkCallBack = "/include/forms/call_back.php";
$linkServiceEntry = "/include/forms/service_entry.php";
$linkLising = "/include/forms/lising.php";
$(document).ready(function(){

    $('input[placeholder], textarea[placeholder]').placeholder();
    $('.fancybox').fancybox();
    /* $('select').selectmenu({
        style: 'dropdown', transferClasses: true
    }); */
	$(".filter select").styler();

    $(window).resize(function(){
        if($(window).width() > 979){
            $('.site-header .menu').css("display", "block");
            $('.btn-menu').css("display", "none");
        } else {
            $('.site-header .menu').css("display", "none");
            $('.btn-menu').css("display", "block");
        }
    }).resize();
    
    $('.site-header').toShowHide({
        button: '.btn-menu',
        button_close: '.btn-menu',
        close_only_button: true,
        box: '.menu',
        effect: 'fade'
    });
    
    $('.site-header .search').toShowHide({
        button: '.btn-search',
        button_close: '.btn-search',
        close_only_button: true,
        box: '.form'
    });

    if($(window).width() > 979){
        $('.site-header .menu > ul > li').toShowHide({
            method: 'hover',
            box: '.dropdown',
            button: '.submenu',
            anim_speed: 400,
            onShow: function(el){},
            onHide: function(el){}
        });
    } else {
        $('.site-header .menu > ul > li').toShowHide({
            method: 'click',
            box: '.dropdown',
            button: '.submenu',
            anim_speed: 400,
            onShow: function(el){},
            onHide: function(el){}
        });
    }

    var services_cur_tab = 1;
    $('.services-box .icons a').on('hover', function(){
        
        var this_tab = $(this).data('id');
        
        if(services_cur_tab != this_tab) {
            
            $('.services-box .icons a.cur').removeClass('cur');
            $(this).addClass('cur');
            
            $('.services-box .inbox[data-id="'+this_tab+'"]').show();
            $('.services-box .inbox[data-id="'+services_cur_tab+'"]').hide();
            
            services_cur_tab = this_tab;
        }
        
        return false;
    });

    var catalog_cur_tab = 1;
    /*$('.catalog .tabs a').on('click', function(){
        
        var this_tab = $(this).data('id');
        
        if(catalog_cur_tab != this_tab) {
            
            $('.catalog .tabs a.cur').removeClass('cur');
            $(this).addClass('cur');
            
            $('.catalog .tab-block[data-id="'+this_tab+'"]').show();
            $('.catalog .tab-block[data-id="'+catalog_cur_tab+'"]').hide();
            
            catalog_cur_tab = this_tab;
        }
        
        return false;
    });*/

    var about_cur_tab = 1;
    $('.about-product .tabs a').on('click', function(){
        
        var this_tab = $(this).data('id');
        
        if(about_cur_tab != this_tab) {
            
            $('.about-product .tabs a.cur').removeClass('cur');
            $(this).addClass('cur');
            
            $('.about-product .block[data-id="'+this_tab+'"]').show();
            $('.about-product .block[data-id="'+about_cur_tab+'"]').hide();
            
            about_cur_tab = this_tab;
        }
        
        return false;
    });


    $('.callback').on('click', function(){
        console.time('callback');
        $.ajax({url: $linkCallBack}).done(function (data) {
            console.timeEnd('callback');
            $("#form").html(data);
            $callback = $("#callback");
            $callback.dialog({
                autoOpen: true,
                modal: true,
                width: 'auto',
                open: function(){
                    $('.ui-widget-overlay').on('click', function(){
                        $callback.dialog('close');
                        $("#form").html('');
                    });
                },
                close: function(){
                    $callback.dialog('destroy');
                    $("#form").html('');
                }
            });
        });
        return false;
    });

    $('.enroll').on('click', function(){
        $service = $(this).data("id-servise");
        console.time('enroll');
        $.ajax({url: $linkServiceEntry, data: {service: $service}, method: "post"}).done(function (data) {
            console.timeEnd('enroll');
            $("#form").html(data);
            $callback = $("#enroll");
            $callback.dialog({
                autoOpen: true,
                modal: true,
                width: 'auto',
                open: function(){
                    $('.ui-widget-overlay').on('click', function(){
                        $callback.dialog('close');
                        $("#form").html('');
                    });
                },
                close: function(){
                    $callback.dialog('destroy');
                    $("#form").html('');
                }
            });
        });
        return false;
    });
    $('.calcul').on('click', function(){
        $model = $(this).data("model-code");
        console.time('calcul');
        $.ajax({url: $linkLising, data: {model: $model}, method: "post"}).done(function (data) {
            console.timeEnd('calcul');
            $("#form").html(data);
            $callback = $("#calcul");
            $callback.dialog({
                autoOpen: true,
                modal: true,
                width: 'auto',
                open: function(){
                    $('.ui-widget-overlay').on('click', function(){
                        $callback.dialog('close');
                        $("#form").html('');
                    });
                },
                close: function(){
                    $callback.dialog('destroy');
                    $("#form").html('');
                }
            });
        });
        return false;
    });

    var photo_cur = 0, $photo = $('.product-detailed');
    $photo.find('li').each(function(index){
        $(this).attr('data-pos', index);
        $photo.find('.big-img').append('<img class="hidden" data-pos="'+index+'" src="'+$(this).find('img').attr('data-src')+'" alt=""/>');
    });
    $photo.find('.big-img img:first').removeClass('hidden');
    
    $('li a', $photo).click(function(){
        
        var this_li = $(this).parent();
        var this_index = this_li.attr('data-pos');
        
        if(this_index != photo_cur) {
            
            $('.big-img img[data-pos='+photo_cur+']', $photo).addClass('hidden');
            $('.big-img img[data-pos='+this_index+']', $photo).removeClass('hidden');
            
            photo_cur = this_index;
            
            $('li.cur', $photo).removeClass('cur');
            this_li.addClass('cur');
        }
        
        return false;
    });
    
});

$(window).load(function(){

    $('.promo-slider ul').carouFredSel({
        circular: true,
        infinite: true,
        auto: 7000,
        responsive: true,
		duration: 10,
		interval: 1,
		variable: true,
        scroll: {
            duration: 800,
            items: 1
        },
        items: {
            height: 'variable',
            visible: 1
        },
        prev: {
            button: '.promo-slider .arr-l'
        },
        next: { 
            button: '.promo-slider .arr-r'
        },
        swipe: {
            onTouch: true
        }
        
    });

    $(window).resize(function(){
        if($(window).width() < 810){
            
        } else {
            $('.slider-products ul').carouFredSel({
                circular: true,
                infinite: true,
                auto: false,
                responsive: true,
                scroll: {
                    duration: 800,
                    items: 1
                },
                items: {
                    visible: {
                        min: 1, max: 6
                    },
                    height: 'variable'
                },
                prev: {
                    button: '.slider-products .arr-l'
                },
                next: { 
                    button: '.slider-products .arr-r'
                },
                swipe: {
                    onTouch: true
                }
                
            });
        }
    }).resize();

    $('.slider-experts ul').carouFredSel({
        circular: true,
        infinite: true,
        auto: false,
        responsive: true,
        scroll: {
            duration: 800,
            items: 1
        },
        items: {
            visible: {
                min: 1, max: 5
            },
            height: 'variable'
        },
        prev: {
            button: '.slider-experts .arr-l'
        },
        next: { 
            button: '.slider-experts .arr-r'
        },
        swipe: {
            onTouch: true
        }
        
    });

    $('.slider-gallery ul').carouFredSel({
        circular: true,
        infinite: true,
        auto: false,
        responsive: true,
        scroll: {
            duration: 800,
            items: 1
        },
        items: {
            height: 'variable',
            visible: 1
        },
        prev: {
            button: '.slider-gallery .arr-l'
        },
        next: { 
            button: '.slider-gallery .arr-r'
        },
        swipe: {
            onTouch: true
        }
        
    });

});

 $(document).on('click', '.main-link', function(e) {
	e.stopImmediatePropagation();
	if ($(this).parent().find('.accordion-hide-b').css('display') == 'block') {
		$(this).parent().removeClass('active');
		$(this).parent().find('.accordion-hide-b').slideUp(300);
	} else {
		$(this).parent().addClass('active');
		$(this).parent().find('.accordion-hide-b').slideDown(300);
	}
	e.preventDefault();
});