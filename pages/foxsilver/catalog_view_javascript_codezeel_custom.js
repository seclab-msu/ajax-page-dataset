var widthClassOptions = [];
var widthClassOptions = ({
		bestseller       : 'bestseller_default_width',		
		featured         : 'featured_default_width',
		special          : 'special_default_width',
		latest           : 'latest_default_width',
		related          : 'related_default_width',
		additional       : 'additional_default_width',
        tabbestseller    : 'tabbestseller_default_width',		
		tabfeatured      : 'tabfeatured_default_width',
		tabspecial       : 'tabspecial_default_width',
		tablatest        : 'tablatest_default_width',
		module           : 'module_default_width',
		testimonial		 : 'testimonial_default_width',
		blog         	 : 'blog_default_width',
		ourcategory      : 'ourcategory_default_width'		
});


$(document).ready(function(){

	$('#content select, .header-search select').customSelect();
	$('ul.breadcrumb').prependTo('.wrap-breadcrumb .container');
	$('.leftbanner-block').appendTo('.featured-left');	
	$('.alert').prependTo('.row #content');
	$('body[class^="product-product"] .alert.alert-info').insertAfter('.row #content .form-group.qty');
	/**/
	$( '#menu li:has(ul)' ).doubleTapToGo();
	
	$("#cart .dropdown-toggle").click(function(){
            $(this).toggleClass("active");
			$(".cart-menu").slideToggle("slow");
			$(".myaccount-menu").slideUp("slow");
			$(".language-menu").slideUp("slow");
			$(".currency-menu").slideUp("slow");
            $(".myaccount .dropdown-toggle").removeClass('active');
        	return false;
    });
		
	$("#form-currency .dropdown-toggle").click(function(){
			$('#form-currency').addClass("active");
           	$(".language-menu").slideUp("slow");
        	$(".currency-menu").slideToggle("slow");
			$(".cart-menu").slideUp("slow");
			$(".myaccount-menu").slideUp("slow");
			$(".myaccount .dropdown-toggle").removeClass('active');
        	return false;
    });
		
    $("#form-language .dropdown-toggle").click(function(){
			$('#form-language').addClass("active");
            $(".currency-menu").slideUp("slow");
        	$(".language-menu").slideToggle("slow");
			$(".cart-menu").slideUp("slow");
			$(".myaccount-menu").slideUp("slow");
			$(".myaccount .dropdown-toggle").removeClass('active');
        	return false;
    });
		
	$(".myaccount > .dropdown-toggle").click(function(){          
			$(".cart-menu").slideUp("slow");
			$(".myaccount-menu").slideToggle("slow");
			$(".language-menu").slideUp("slow");
			$(".currency-menu").slideUp("slow");	
 			$(this).toggleClass("active");		
			$("#cart .dropdown-toggle").removeClass('active');
        	return false;
    });
	
	$('.write-review,.review-count').on('click', function() {
		$('html, body').animate({scrollTop: $('#tabs_info').offset().top}, 'slow');
	});
	
	$('#search .search_button').click(function(event){			
		$(this).toggleClass('active');		
		event.stopPropagation();		
		$('#search .search_toggle').toggle('medium');		
		$( "#search .search_toggle form input[type=text]" ).focus();
	
	});
	$("#search .search_toggle").on("click", function (event) {
		event.stopPropagation();	
	});

	// Vertical Menu View/Less Category Code
	if ($(window).width() > 991) {
		var vmax_elem = 14;
		//$('.navbar-nav li').first().addClass('home_first');
		var vitems = $('.box-category .dropmenu li.main');
		var surplus = vitems.slice(vmax_elem, vitems.length);
		surplus.wrapAll('<li class="main hiden_vertical_menu"><ul class="dropdown-inner">');
		$('.hiden_vertical_menu').append('<span class="main">More Categories</span>');	
		$('.hiden_vertical_menu .main').click(function(){
		var $this = $(this);
		$this.toggleClass('active');
		if($this.hasClass('active')){
			$this.text('Less Categories');         
		} else {
			$this.text('More Categories');
		}	
		$(".hiden_vertical_menu .dropdown-inner").slideToggle(500); });
	}
	
});




/*For Parallax*/
jQuery(window).load(function(){					 
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
	if(!isMobile) {
		if($(".parallax").length){  $(".parallax").sitManParallex({  invert: false });};    
	}else{
		$(".parallax").sitManParallex({  invert: true });
	}
});

/*For Parallex*/

function mobile(){
   
      var parallax = document.querySelectorAll(".parallax-breadcrumb"),
         speed = 0.42;
  
  window.onscroll = function(){
    [].slice.call(parallax).forEach(function(el,i){

      var windowYOffset = window.pageYOffset,
          elBackgrounPos = "50%" + -(windowYOffset * speed) + "px";
      
      el.style.backgroundPosition = elBackgrounPos;

    });
  };
}
jQuery(document).ready(function() { mobile();});
jQuery(window).resize(function() { mobile();});

$(document).click(function(){
	$(".cart-menu").slideUp('slow');
	$(".myaccount-menu").slideUp('slow');
	$(".language-menu").slideUp("slow");
	$(".currency-menu").slideUp("slow");
	$(".myaccount > .dropdown-toggle").removeClass('active');
	$("#cart .dropdown-toggle").removeClass('active');
});

function mobileToggleMenu(){
	//alert($(window).width());
	if ($(window).width() < 992)
	{
		$("#footer .mobile_togglemenu").remove();
		$("#footer .column h5").append( "<a class='mobile_togglemenu'>&nbsp;</a>" );
		$("#footer .column h5").addClass('toggle');
		$("#footer .mobile_togglemenu").click(function(){
			$(this).parent().toggleClass('active').parent().find('ul').toggle('slow');
		});

	}else{
		$("#footer .column h5").parent().find('ul').removeAttr('style');
		$("#footer .column h5").removeClass('active');
		$("#footer .column h5").removeClass('toggle');
		$("#footer .mobile_togglemenu").remove();
	}	
}
$(document).ready(function(){mobileToggleMenu();});
$(window).resize(function(){mobileToggleMenu();});

function mobileToggleColumn(){
//alert($(window).width());

	if ($(window).width() < 992)
	{
		$('#column-left,#column-right').appendTo('.home_row');
		$('#column-left,#column-right').insertAfter('#content');
		$("#column-left .box-heading .mobile_togglemenu,#column-right .box-heading .mobile_togglemenu").remove();
		$("#column-left .box-heading,#column-right .box-heading").append( "<a class='mobile_togglemenu'>&nbsp;</a>" );
		$("#column-left .box-heading,#column-right .box-heading").addClass('toggle');
		$("#column-left .box-heading .mobile_togglemenu,#column-right .box-heading .mobile_togglemenu").click(function(){
			$(this).parent().toggleClass('active').parent().find('.box-content,.filterbox,.list-group').slideToggle('slow');
		});

	}else{
		$('#column-left').prependTo('.home_row');
		$('#column-right').appendTo('.home_row');
		$('#column-left').insertBefore('#content');
		$("#column-left .box-heading,#column-right .box-heading").parent().find('.box-content,.filterbox,.list-group').removeAttr('style');
		$("#column-left .box-heading,#column-right .box-heading").removeClass('active');
		$("#column-left .box-heading,#column-right .box-heading").removeClass('toggle');
		$("#column-left .box-heading .mobile_togglemenu,#column-right .box-heading .mobile_togglemenu").remove();
	}
}
$(document).ready(function(){mobileToggleColumn();});
$(window).resize(function(){mobileToggleColumn();});

$(document).ready(function(){
	$(".box-category-heading").click(function(){
	$(".codezeelcategory .box-content").slideToggle(800);
	$('.box-category-heading').toggleClass('active');
	});
});

$(document).ready(function(){
  $(".dropdown-toggle").click(function(){
    $("ul.dropdown-toggle").toggle('slow');
  });
 
});


function LangCurDropDown(selector,subsel){
	var main_block = new HoverWatcher(selector);
	var sub_ul = new HoverWatcher(subsel);
	$(selector).click(function() {
		$(selector).addClass('active');
		$(subsel).slideToggle('slow');
		setTimeout(function() {
			if (!main_block.isHoveringOver() && !sub_ul.isHoveringOver())
				$(subsel).stop(true, true).slideUp(450);
				$(selector).removeClass('active');
		}, 3000);
	});
	
	$(subsel).hover(function() {
		setTimeout(function() {
			if (!main_block.isHoveringOver() && !sub_ul.isHoveringOver())
				$(subsel).stop(true, true).slideUp(450);
		}, 3000);
	});	
}


$(document).ready(function(){

	LangCurDropDown('.myaccount','.myaccount-menu');
	LangCurDropDown('#form-currency','.currency-menu');
	LangCurDropDown('#form-language','.language-menu');
	LangCurDropDown('#cart','.cart-menu');

});

function leftright()
{
	if ($(window).width() < 992){
			if($('.category_filter .col-md-3, .category_filter .col-md-2, .category_filter .col-md-1').hasClass('text-right')==true){
			$(".category_filter .col-md-3, .category_filter .col-md-2, .category_filter .col-md-1").addClass('text-left');
			$(".category_filter .col-md-3, .category_filter .col-md-2, .category_filter .col-md-1").removeClass('text-right');
			}
	}
}

$(document).ready(function(){leftright();});
$(window).resize(function(){leftright();});

function menuResponsive(){
	 
	if ($(window).width() < 992){
		//alert($(window).width());
		$('#menu').css('display','none');
		$('#res-menu').css('display','block');
		$('.nav-responsive').css('display','block');
		if($('.main-navigation').hasClass('treeview')!=true){
			$("#res-menu").addClass('responsive-menu');
			$("#res-menu").removeClass('main-menu');
			$("#res-menu .main-navigation").treeview({
				animated: "slow",
				collapsed: true,
				unique: true		
			});
			$('#res-menu .main-navigation a.active').parent().removeClass('expandable');
			$('#res-menu .main-navigation a.active').parent().addClass('collapsable');
			$('#res-menu .main-navigation .collapsable ul').css('display','block');		
		}
	
	}else{
		$('#menu').css('display','block');
		$('#res-menu').css('display','none');
		$("#res-menu .hitarea").remove();
		$("#res-menu").removeClass('responsive-menu');
		$("#res-menu").addClass('main-menu');
		$(".main-navigation").removeClass('treeview');
		$("#res-menu ul").removeAttr('style');
		$('#res-menu li').removeClass('expandable');
		$('#res-menu li').removeClass('collapsable');
		$('.nav-responsive').css('display','none');
	}

}
$(document).ready(function(){menuResponsive();});
$(window).resize(function(){menuResponsive();});

function productCarouselAutoSet() { 
	$("#content .product-carousel, .banners-slider-carousel .product-carousel, .testimonial-area .product-carousel, .czcategory_listblock .product-carousel").each(function() {
		var objectID = $(this).attr('id');
		var myObject = objectID.replace('-carousel','');
		if(myObject.indexOf("-") >= 0)
			myObject = myObject.substring(0,myObject.indexOf("-"));		
		if(widthClassOptions[myObject])
			var myDefClass = widthClassOptions[myObject];
		else
			var myDefClass= 'grid_default_width';
		var slider = $("#content #" + objectID + ", .banners-slider-carousel #"+ objectID + ", .testimonial-area #"+ objectID + ", .czcategory_listblock #"+ objectID);
		slider.sliderCarousel({
			defWidthClss : myDefClass,
			subElement   : '.slider-item',
			subClass     : 'product-block',
			firstClass   : 'first_item_cz',
			lastClass    : 'last_item_cz',
			slideSpeed : 200,
			paginationSpeed : 800,
			autoPlay : false,
			stopOnHover : false,
			goToFirst : true,
			goToFirstSpeed : 1000,
			goToFirstNav : true,
			pagination : false,
			paginationNumbers: false,
			responsive: true,
			responsiveRefreshRate : 200,
			baseClass : "slider-carousel",
			theme : "slider-theme",
			autoHeight : true
		});
		
		var nextButton = $(this).parent().find('.next');
		var prevButton = $(this).parent().find('.prev');
		nextButton.click(function(){
			slider.trigger('slider.next');
		})
		prevButton.click(function(){
			slider.trigger('slider.prev');
		})
	});
}
//$(window).load(function(){productCarouselAutoSet();});
$(document).ready(function(){productCarouselAutoSet();});


function productListAutoSet() { 
	$("#content .productbox-grid").each(function(){
		var objectID = $(this).attr('id');
		if(objectID.length > 0){
			if(widthClassOptions[objectID.replace('-grid','')])
				var myDefClass= widthClassOptions[objectID.replace('-grid','')];
		}else{
			var myDefClass= 'grid_default_width';
		}	
		$(this).smartColumnsRows({
			defWidthClss : myDefClass,
			subElement   : '.product-items',
			subClass     : 'product-block'
		});
	});		
}
$(window).load(function(){productListAutoSet();});
$(window).resize(function(){productListAutoSet();});


function HoverWatcher(selector){
	this.hovering = false;
	var self = this;

	this.isHoveringOver = function() {
		return self.hovering;
	}

	$(selector).hover(function() {
		self.hovering = true;
	}, function() {
		self.hovering = false;
	})
}

function LangCurDropDown(selector,subsel){
	var main_block = new HoverWatcher(selector);
	var sub_ul = new HoverWatcher(subsel);
	$(selector).click(function() {
		$(selector).addClass('active');
		$(subsel).slideToggle('slow');
		setTimeout(function() {
			if (!main_block.isHoveringOver() && !sub_ul.isHoveringOver())
				$(subsel).stop(true, true).slideUp(450);
				$(selector).removeClass('active');
		}, 3000);
	});
	
	$(subsel).hover(function() {
		setTimeout(function() {
			if (!main_block.isHoveringOver() && !sub_ul.isHoveringOver())
				$(subsel).stop(true, true).slideUp(450);
		}, 3000);
	});	
}

$(document).ready(function(){

	LangCurDropDown('#form-currency','.currency_div');
	LangCurDropDown('#form-language','.language_div');

	$('.nav-responsive').click(function() {
        $('.responsive-menu .main-navigation').slideToggle();
		$('.nav-responsive div').toggleClass('active');
		
    }); 

	$(".treeview-list").treeview({
		animated: "slow",
		collapsed: true,
		unique: true		
	});
	$('.treeview-list a.active').parent().removeClass('expandable');
	$('.treeview-list a.active').parent().addClass('collapsable');
	$('.treeview-list .collapsable ul').css('display','block');
});

 
$(document).ready(function(){
  $(".cz_headerlinks_inner").click(function(){
    $(".header_links").toggle('slow');
  });
  
});

/*For Grid and List View Buttons*/
function gridlistactive(){
$('.btn-list-grid button').on('click', function() {
if($(this).hasClass('grid')) {
  $('.btn-list-grid button').addClass('active');
  $('.btn-list-grid button.list').removeClass('active');
}
  else if($(this).hasClass('list')) {
$('.btn-list-grid button').addClass('active');
  $('.btn-list-grid button.grid').removeClass('active');
  }
});
}
$(document).ready(function(){gridlistactive()});
$(window).resize(function(){gridlistactive()});



/*For Back to Top button*/
$(document).ready(function(){
$("body").append("<a class='top_button' title='Back To Top' href=''>TOP</a>");

$(function () {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 70) {
			$('.top_button').fadeIn();
		} else {
			$('.top_button').fadeOut();
		}
	});
	// scroll body to 0px on click
	$('.top_button').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
});
});


function blogCrop(){
if ($(window).width() > 992) {
	$('.information-blogger-blogs .blog-image').each(function() {									  
	var that = $(this);
	var url = that.find('img').attr('src');
	that.css({'background-image':'url("' + url + '")'});
});
}
}
jQuery(document).ready(function() {blogCrop();});
jQuery(window).resize(function() {blogCrop();});

function subscribe()
{
	var emailpattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	var email = $('#txtemail').val();
	if(email != "")
	{
		if(!emailpattern.test(email))
		{
		
			$('.text-danger').remove();
			var str = '<span class="error">Invalid Email</span>';
			$('#txtemail').after('<div class="text-danger">Invalid Email</div>');
			return false;
		}
		else
		{
			$.ajax({
				url: 'index.php?route=extension/module/newsletters/news',
				type: 'post',
				data: 'email=' + $('#txtemail').val(),
				dataType: 'json',
				
				success: function(json) {
				$('.text-danger').remove();
				$('#txtemail').after('<div class="text-danger">' + json.message + '</div>');
				}
				
			});
			return false;
		}
	}
	else
	{
		$('.text-danger').remove();
		$('#txtemail').after('<div class="text-danger">Email Is Require</div>');
		$(email).focus();
		return false;
	}
	

}

// ViewMore products in tab
jQuery(document).ready(function () {
  	var size_li = jQuery("#tab-latest #tablatest-grid > div").size();
	var size_li_spec = jQuery("#tab-special #tabspecial-grid > div").size();
	var size_li_best = jQuery("#tab-bestseller #tabbestseller-grid > div").size();
	var x=8;
	var y=8;	
	var z=8;	
		
	jQuery('#tab-latest #tablatest-grid > div:lt('+x+')').fadeIn('slow');
	jQuery('#tab-special #tabspecial-grid > div:lt('+y+')').fadeIn('slow');
	jQuery('#tab-bestseller #tabbestseller-grid > div:lt('+z+')').fadeIn('slow');
		    	
    jQuery('#tab-latest .gridcount').click(function () {
	if(x==size_li){									 	
			 jQuery('#tab-latest .cz-status').show();
			 jQuery('#tab-latest .gridcount').hide();	 
			 
	}else{
		x= (x+4 <= size_li) ? x+4 : size_li;
        jQuery('#tab-latest #tablatest-grid > div:lt('+x+')').fadeIn('slow');
	}
    });
	
	jQuery('#tab-special .gridcount').click(function () {
	if(y==size_li_spec){									 
			 jQuery('#tab-special .gridcount').hide();
			 jQuery('#tab-special .cz-status').show();
			 
	}else{
		y= (y+4 <= size_li_spec) ? y+4 : size_li_spec;
        jQuery('#tab-special #tabspecial-grid > div:lt('+y+')').fadeIn('slow');
	}
    });
	
   
	jQuery('#tab-bestseller .gridcount').click(function () {
	if(z==size_li_best){									 
			 jQuery('#tab-bestseller  .gridcount').hide();
			 jQuery('#tab-bestseller  .cz-status').show();
			 
	}else{
		z= (z+4 <= size_li_best) ? z+4 : size_li_best;
        jQuery('#tab-bestseller #tabbestseller-grid > div:lt('+z+')').fadeIn('slow');
	}
    });			
	
});

$(document).ready(function(){
	jQuery(function($){
	
		var max_elem = 7 ;
		
		if($(window).width() <=1199){ max_elem = 5;}
		
		var items = $('#menu  li.top_level');
		var surplus = items.slice(max_elem, items.length);
		surplus.wrapAll('<li class="top_level hiden_menu dropdown more_menu"><div class="dropdown-menu">');
		$('.hiden_menu').prepend('<a href="#" class="level-top">...</a>');
	
	});
});


// Top Fixed Menu 
function headerfix() {
	
	if ($(this).scrollTop() > 250) {
		$(".headertop-inner").addClass('fixed');
	}else{
		$(".headertop-inner").removeClass('fixed');		
	}
}

jQuery(window).resize(function() {headerfix();});
jQuery(document).ready(function() {headerfix();});
jQuery(document).scroll(function() {headerfix();});
//--------------- video Open in LighBox ----------------//

window.document.onkeydown = function(e) {
  if (!e) {
    e = event;
  }
  if (e.keyCode == 27) {
    lightbox_close();
  }
}

function lightbox_open() {
	var lightBoxVideo = document.getElementById("myVideo");
	document.getElementById('light').style.display = 'block';
	document.getElementById('fade').style.display = 'block';
	lightBoxVideo.play();
}

function lightbox_close() {
	var lightBoxVideo = document.getElementById("myVideo");
	document.getElementById('light').style.display = 'none';
	document.getElementById('fade').style.display = 'none';
	lightBoxVideo.pause();
}
jQuery(window).load(function() {  
	"use strict"; 
	if ($("#myVideo").length > 0) {
		
		lightbox_open();
		lightbox_close();
	}
});