window.onload = function() {
	if ($('.social-likes')) {
	  /*$('.social-likes').each(function(){
        var p = $(this).parent();

          $(this).data({
            'title': p.data('title'),
			'image': p.data('media'),
			'description': p.data('description') 
          });
      });*/
	  
      $('.social-likes').socialLikes();
    } 
}

$(document).ready(function() {

	var cmswidget_9 = $('#cmswidget_9').html();
	$('#welcome #relateds').html(cmswidget_9);
	$('#cmswidget_9').hide('slow').remove();

    /* Search */
    $('.header-search .btn-header-search').on('click', function() {

        url = $('base').attr('href') + 'index.php?route=product/search';

        var search = $('.header-search input[name=\'search\']').val();

        if (search) {
            url += '&search=' + encodeURIComponent(search);
        }

        location = url;
    });

    $('.header-search input[name=\'search\']').on('keydown', function(e) {
        if (e.keyCode == 13) {
            url = $('base').attr('href') + 'index.php?route=product/search';

            var search = $('input[name=\'search\']').val();

            if (search) {
                url += '&search=' + encodeURIComponent(search);
            }

            location = url;
        }
    });

    /* categories menu */
    $('#menu .dropdown-menu').each(function() {
        var menu = $('#menu').offset();
        var dropdown = $(this).parent().offset();

        var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#menu').outerWidth());

        if (i > 0 || i != 25) {
            $(this).css('margin-left', '-' + (i + 15) + 'px');
        }
    });

    /* disable dropdowns autoclose */
    $(document).on('click', '.dropdown-menu', function (e) {
        $(this).hasClass('keep_open') && e.stopPropagation();
    });

    /* dropdown for limit block correction */
    $('.limit-btn-group .dropdown-menu').each(function() {
        var menu = $('.limit-btn-group').offset();
        var dropdown = $(this).parent().offset();

        var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('.limit-btn-group').outerWidth());

        if (i > 0 || i != 25) {
            $(this).css('margin-left', '-' + i + 'px');
        }
    });

    // Product List
    $('#list-view').click(function() {
        $('#content .pos-9 .products .product-layout > .clearfix').remove();

        $('#content .pos-9 .products .product-layout').attr('class', 'product-layout product-list');

        $('#list-view').addClass('active');
        $('#grid-view').removeClass('active');
        localStorage.setItem('display', 'list');
    });

    // Product Grid
    $('#grid-view').click(function() {
        $('#content .pos-9 .products .product-layout > .clearfix').remove();
        $('#content .pos-9 .products .product-layout').attr('class', 'product-layout product-grid');

        $('#grid-view').addClass('active');
        $('#list-view').removeClass('active');
        localStorage.setItem('display', 'grid');
    });

    if (localStorage.getItem('display') == 'list') {
        $('#list-view').trigger('click');

        $('#list-view').addClass('active');
        $('#grid-view').removeClass('active');
    } else if (localStorage.getItem('display') == 'grid') {
        $('#grid-view').trigger('click');

        $('#grid-view').addClass('active');
        $('#list-view').removeClass('active');
    }

    // don't fire tooltips on touch devices
    if(!('ontouchstart' in window)) {
        $('[data-toggle=\'tooltip\']').tooltip({container: 'body'});
        $(document).ajaxStop(function() {
            $('[data-toggle=\'tooltip\']').tooltip({container: 'body'});
        });
    }

    // close default popups on click
    $('.success img, .warning img, .attention img, .information img').live('click', function() {
        $(this).parent().fadeOut('slow', function() {
            $(this).remove();
        });
    });
	
$('.bigimg').live('mouseenter', function(){
	var src = $(this).attr('rel2');
	$(this).attr('src', src);
});
$('.bigimg').live('mouseleave', function(){
	var src = $(this).attr('rel1');
	$(this).attr('src', src);
});
$('.mychild > li').live('click', function(){
	var id = $(this).attr('class');
	var cl = $('#' + id).attr('class');
	
	if (cl != 'myhis') {
		$('#' + id).css('display', 'block').addClass('myhis');
	} else {
		$('#' + id).css('display', 'none').removeClass('myhis');
	}
});
});

function getURLVar(key) {
    var value = [];

    var query = String(document.location).split('?');

    if (query[1]) {
        var part = query[1].split('&');

        for (i = 0; i < part.length; i++) {
            var data = part[i].split('=');

            if (data[0] && data[1]) {
                value[data[0]] = data[1];
            }
        }

        if (value[key]) {
            return value[key];
        } else {
            return '';
        }
    }
}

function addToCart(product_id, quantity) {
    quantity = typeof(quantity) != 'undefined' ? quantity : 1;

    $.ajax({
        url: 'index.php?route=checkout/cart/add',
        type: 'post',
        data: 'product_id=' + product_id + '&quantity=' + quantity,
        dataType: 'json',
        success: function(json) {
            $('.success, .warning, .attention, .information, .error').remove();

            if (json['redirect']) {
                location = json['redirect'];
            }
            if (json['success']) {
                $("#image-appendix").remove()
                $.colorbox({
                    width: '550px',
                    close: "<button class='btn btn-default' type='button'><i class='fa fa-fw fa-times'></i></button>",
                    onComplete: function() { if(navigator.appVersion.indexOf("MSIE 8.")!=-1) {$("html, body").animate({scrollTop:0}, 'slow');}; },
                    html: "<h4 class='col-xs-12 text-center'>" + json['success'] + "</h4><p class='text-center'><a href='checkout' class='btn btn-lg btn-primary'><i class='fa fa-fw fa-share'></i> <span>" + button_checkout + "</span></a></p><p class='text-center'><a href='tovary_zdorovia' class='btn btn-default'>" + button_shopping + "</a></p>", title:"" });
                $('#cart').load('index.php?route=module/cart' + ' #cart > *');
            }
        }
    });
}

function addToWishList(product_id) {
    $.ajax({
        url: 'index.php?route=account/wishlist/add',
        type: 'post',
        data: 'product_id=' + product_id,
        dataType: 'json',
        success: function(json) {
            $('.success, .warning, .attention, .information').remove();
            $("#image-appendix").remove()
            if (json['success']) {
                $.colorbox({
                    width: '550px',
                    close: "<button class='btn btn-default' type='button'><i class='fa fa-fw fa-times'></i></button>",
                    onComplete: function() { if(navigator.appVersion.indexOf("MSIE 8.")!=-1) {$("html, body").animate({scrollTop:0}, 'slow');}; },
                    html: "<h4 class='col-xs-12 text-center'>" + json['success'] + "</h4><p class='text-center'><a href='" + link_wishlist + "' class='btn btn-lg btn-primary'><i class='fa fa-thumbs-o-up fa-fw'></i> <span>Отложенное</span></a></p><p class='text-center'><a href='tovary_zdorovia' class='btn btn-default'>Перейти в каталог товаров</a></p>", title:"" });
                $('#wishlist-total').html(json['total']);
            }
        }
    });
}

function addToCompare(product_id) {
    $.ajax({
        url: 'index.php?route=product/compare/add',
        type: 'post',
        data: 'product_id=' + product_id,
        dataType: 'json',
        success: function(json) {
            $('.success, .warning, .attention, .information').remove();
            if (json['success']) {
                $("#image-appendix").remove()
                $.colorbox({
                    width: '550px',
                    close: "<button class='btn btn-default' type='button'><i class='fa fa-fw fa-times'></i></button>",
                    onComplete: function() { if(navigator.appVersion.indexOf("MSIE 8.")!=-1) {$("html, body").animate({scrollTop:0}, 'slow');}; },
                    html: "<h4 class='col-xs-12 text-center'>" + json['success'] + "</h4><p class='text-center'><a href='" + link_compare + "' class='btn btn-lg btn-primary'><i class='fa fa-fw fa-bar-chart-o'></i> <span>" + text_compare + "</span></a></p><p class='text-center'><a href='tovary_zdorovia' class='btn btn-default'>" + button_shopping + "</a></p>", title:"" });
                $('#compare-total').html(json['total']);
            }
        }
    });
}

$(document).ready(function(){
	$('.detail_page').on('click', '.review .pagination_buttons .links a', function(e) {
		var rev_par = $(this).parents('.review');
		$.post( $(this).attr('href'), function( data ) {
			rev_par.html(data);			
			//$(this).parents('.review').addClass('test90').html(data);
//			$( ".result" ).html( data );
		});
		return false;
	});
	
	$('.product-block .image a ').hover(
		function(){
			var aLink = $(this);
			var aImg = aLink.find('img'); 
			rel2 = aImg.attr('rel2');
			if(rel2) aImg.attr('src', rel2); 	
		},
		function(){
			var aLink = $(this);
			var aImg = aLink.find('img'); 
			rel1 = aImg.attr('rel1');
			if(rel1) aImg.attr('src', rel1); 	
		},
	);
});
