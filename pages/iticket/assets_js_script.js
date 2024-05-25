!function(t){"use strict";function r(t){var r={path:!0,query:!0,hash:!0};return t?(/^[a-z]+:/.test(t)&&(r.protocol=!0,r.host=!0,/[-a-z0-9]+(\.[-a-z0-9])*:\d+/i.test(t)&&(r.port=!0),/\/\/(.*?)(?::(.*?))?@/.test(t)&&(r.user=!0,r.pass=!0)),r):r}function e(t,e,o){var u,f,l,y=h?"file://"+(process.platform.match(/^win/i)?"/":"")+p("fs").realpathSync("."):document.location.href;e||(e=y),h?u=p("url").parse(e):(u=document.createElement("a"),u.href=e);var d=r(e);l=e.match(/\/\/(.*?)(?::(.*?))?@/)||[];for(f in a)t[f]=d[f]?u[a[f]]||"":"";if(t.protocol=t.protocol.replace(/:$/,""),t.query=t.query.replace(/^\?/,""),t.hash=s(t.hash.replace(/^#/,"")),t.user=s(l[1]||""),t.pass=s(l[2]||""),t.port=c[t.protocol]==t.port||0==t.port?"":t.port,!d.protocol&&/[^\/#?]/.test(e.charAt(0))&&(t.path=e.split("?")[0].split("#")[0]),!d.protocol&&o){var g=new n(y.match(/(.*\/)/)[0]),m=g.path.split("/"),v=t.path.split("/"),q=["protocol","user","pass","host","port"],w=q.length;for(m.pop(),f=0;w>f;f++)t[q[f]]=g[q[f]];for(;".."===v[0];)m.pop(),v.shift();t.path=("/"!==e.charAt(0)?m.join("/"):"")+"/"+v.join("/")}t.path=t.path.replace(/^\/{2,}/,"/"),t.paths(("/"===t.path.charAt(0)?t.path.slice(1):t.path).split("/")),t.query=new i(t.query)}function o(t){return encodeURIComponent(t).replace(/'/g,"%27")}function s(t){return t=t.replace(/\+/g," "),t=t.replace(/%([ef][0-9a-f])%([89ab][0-9a-f])%([89ab][0-9a-f])/gi,function(t,r,e,o){var s=parseInt(r,16)-224,i=parseInt(e,16)-128;if(0===s&&32>i)return t;var n=parseInt(o,16)-128,h=(s<<12)+(i<<6)+n;return h>65535?t:String.fromCharCode(h)}),t=t.replace(/%([cd][0-9a-f])%([89ab][0-9a-f])/gi,function(t,r,e){var o=parseInt(r,16)-192;if(2>o)return t;var s=parseInt(e,16)-128;return String.fromCharCode((o<<6)+s)}),t.replace(/%([0-7][0-9a-f])/gi,function(t,r){return String.fromCharCode(parseInt(r,16))})}function i(t){for(var r,e=/([^=&]+)(=([^&]*))?/g;r=e.exec(t);){var o=decodeURIComponent(r[1].replace(/\+/g," ")),i=r[3]?s(r[3]):"";void 0!==this[o]&&null!==this[o]?(this[o]instanceof Array||(this[o]=[this[o]]),this[o].push(i)):this[o]=i}}function n(t,r){e(this,t,!r)}var h="undefined"==typeof window&&"undefined"!=typeof global&&"function"==typeof require,p=h?t.require:null,a={protocol:"protocol",host:"hostname",port:"port",path:"pathname",query:"search",hash:"hash"},c={ftp:21,gopher:70,http:80,https:443,ws:80,wss:443};i.prototype.toString=function(){var t,r,e="",s=o;for(t in this)if(!(this[t]instanceof Function||null===this[t]))if(this[t]instanceof Array){var i=this[t].length;if(i)for(r=0;i>r;r++)e+=e?"&":"",e+=s(t)+"="+s(this[t][r]);else e+=(e?"&":"")+s(t)+"="}else e+=e?"&":"",e+=s(t)+"="+s(this[t]);return e},n.prototype.clearQuery=function(){for(var t in this.query)this.query[t]instanceof Function||delete this.query[t];return this},n.prototype.queryLength=function(){var t,r=0;for(t in this)this[t]instanceof Function||r++;return r},n.prototype.isEmptyQuery=function(){return 0===this.queryLength()},n.prototype.paths=function(t){var r,e="",i=0;if(t&&t.length&&t+""!==t){for(this.isAbsolute()&&(e="/"),r=t.length;r>i;i++)t[i]=!i&&t[i].match(/^\w:$/)?t[i]:o(t[i]);this.path=e+t.join("/")}for(t=("/"===this.path.charAt(0)?this.path.slice(1):this.path).split("/"),i=0,r=t.length;r>i;i++)t[i]=s(t[i]);return t},n.prototype.encode=o,n.prototype.decode=s,n.prototype.isAbsolute=function(){return this.protocol||"/"===this.path.charAt(0)},n.prototype.toString=function(){return(this.protocol&&this.protocol+"://")+(this.user&&o(this.user)+(this.pass&&":"+o(this.pass))+"@")+(this.host&&this.host)+(this.port&&":"+this.port)+(this.path&&this.path)+(this.query.toString()&&"?"+this.query)+(this.hash&&"#"+o(this.hash))},t[t.exports?"exports":"Url"]=n}("undefined"!=typeof module&&module.exports?module:window);
/*Размер Слайдера на главной странице*/

var bodyWidth = $(window).width();
var bodyHeight = $(window).height();
// var heightSlider = $("#sync1 .item, .wrap_slide_info_event").height( bodyHeight - 102);


function initSelectbox() {
  $('.lang_panel').selectbox();
  $('.sotr_events').selectbox();
  $('#categori_filter').selectbox();
  $('#place_filter').selectbox();
  $('#mob_leng').selectbox();
}

function CategoriesResize() {
  var bodyWidth = $(window).width();
  var bodyHeight = $(window).height();
  // var heightSlider = $("#sync1 .item, .wrap_slide_info_event").height( bodyHeight - 102);

  /*Категории событий*/
  var countLi = $(".event_category ul.nav").find("li").length; console.log(countLi);
  var documentWidth = parseInt(document.documentElement.clientWidth);
  var windowsWidth = parseInt(window.innerWidth);
  var scrollbarWidth = windowsWidth - documentWidth;
  if( (bodyWidth + scrollbarWidth) < 767 ){
    if( countLi % 2 == 0 ){
      countLi = countLi / 2;
      var widthLi = 100 / countLi;
    }
    else{
      countLi = ( Math.floor(countLi / 2) ); console.log('even' + countLi)
      var widthLi = 100 / countLi; console.log('widthli' + widthLi)
      $(".event_category").addClass("even");
    }
  }
  else{
    var widthLi = 100 / countLi;
  }
  $(".event_category ul.nav li").css("width", widthLi + "%");
}
function GetUrl(name,atribute) {
  var u = new Url();
  delete u.query['page'];
  if(atribute == ''){
    delete u.query[name];
  }else{
    u.query[name] = atribute;
  }
  return u;
}



function RunDatepicker() {

  $( ".btn_calendar_datepicker" ).datepicker({
    showOn: "button",
    buttonImage: "/assets/i/svg_icon/calendar3.svg",
    buttonImageOnly: true,
    buttonText: "Select date",
    showOtherMonths: true,
    selectOtherMonths: true,
    minDate: 0,
    beforeShow: function(input, inst) {

      // var pos = $('.btn_calendar').offset();


      var window_w = $(window).width();

      if (window_w > 768) {
        var pos = $('.btn_calendar').offset();
        setTimeout(function () {
          inst.dpDiv.css({
            top: pos.top + 70,
            left: pos.left - 215
          }).addClass('custom-datepicker');
        }, 0);
      } else {
        var pos = $('.mob_sorting_box .btn_calendar').offset();
        setTimeout(function () {
          inst.dpDiv.css({
            top: pos.top + 60,
            left: pos.left - 220
          }).addClass('custom-datepicker');
        }, 0);
      }
    },
    beforeShowDay: function (date) {
      var year = date.getFullYear();
      var month = ("0" + (date.getMonth() + 1)).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);
      var dateString = day + "." + month + "." + year;
      var gotDate = jQuery.inArray(dateString, avDates);
      if (gotDate >= 0) {
        return [true, "ui-available-now-date"];
      }else{
        return [false, "ui-unselected-date"];
      }
    },
    onSelect: function(dateText, inst) {
      url = GetUrl('data', dateText);
      window.location.href = url;
    },
    onClose: function(input, inst) {
      setTimeout(function () {
        inst.dpDiv.removeClass('custom-datepicker');
      }, 100);
    }
  });

}





jQuery(document).ready(function() {




  $('#loginModal a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    // console.log(e.target); // newly activated tab
    // console.log(e.relatedTarget); // previous active tab
    var index = $(this).parent().index();
    console.log(index);

    $('.modal-footer .social-tab-text').removeClass('active');
    $('.modal-footer .social-tab-text').eq(index).addClass('active');

    if (index == 2) {
      $('.modal-footer').hide();

      $('#loginModal .tabs .nav li').addClass('hidden');
      $('#loginModal .tabs .nav li').eq(2).removeClass('hidden');

    } else {
      $('.modal-footer').show();
      $('#loginModal .tabs .nav li').addClass('hidden');
      $('#loginModal .tabs .nav li').eq(0).removeClass('hidden');
      $('#loginModal .tabs .nav li').eq(1).removeClass('hidden');
    }

  })


  $('#ratingModal').modal('show');




  $('[data-countdown]').each(function() {
    var $this = $(this), finalDate = $(this).data('countdown');
    $this.countdown(finalDate, function(event) {
      $this.html(event.strftime('%H:%M:%S'));
    });
  });



  RunDatepicker();



  $('#ticket_dates').select2({
    minimumResultsForSearch: -1,
    width: '305px'
  });




  // $('body').delay(500).queue(function(next){

  // 	$(this).css('padding-right', '1px');
  // });




  /*OWL SLIDER - Слайдер на главной странице*/


  $("#carousel-custom-dots").on("mouseenter", ".owl-dot",  function() {
    var index = $(this).index();
    $(this).parents('.wrap').addClass('show-custom');

    var title = $("#sync1 .owl-item:not(.cloned)").eq(index).find('.item').data('title');
    $(".custom-dots .dots-text").html(title);

  }).on('mouseleave', ".owl-dot", function() {
    $(this).parents('.wrap').removeClass('show-custom');
  });




  var sync1 = $("#sync1");
  var sync2 = $("#sync2");

  $("#sync1").owlCarousel({
    //   autoplay: true,
    // navigation: false,
    // pagination: true,
    // items:1,
    // // animateOut: 'slideOutDown',
    //   animateIn: 'fadeIn',
    //   smartSpeed: 0,
    // autoplayHoverPause: true,
    // responsiveRefreshRate: 200,
    //   afterAction: syncPosition,

    responsive : {
      // breakpoint from 0 up
      0 : {
        autoplay: true,
        autoplayTimeout: 3000,
        nav: false,
        items:1,
        loop: true,
      },

      1025 : {
        autoplay: true,
        autoplayTimeout: 3000,
        // nav: true,
        items:1,
        loop: true,
        // animateOut: 'slideOutDown',
        animateIn: 'fadeIn',
        smartSpeed: 0,
        autoplayHoverPause: true,
        responsiveRefreshRate: 200,
        afterAction: syncPosition,
        dotsContainer: '#carousel-custom-dots',
        mouseDrag: false
      }
    }
  });

  // sync2.owlCarousel({

  // 	pagination:false,
  // 	responsiveRefreshRate : 100,
  // 	afterInit : function(el){
  // 	  el.find(".owl-item").eq(0).addClass("synced");
  // 	}
  // });

  function syncPosition(el){
    var current = this.currentItem;
    $("#sync2")
      .find(".owl-item")
      .removeClass("synced")
      .eq(current)
      .addClass("synced")
    if($("#sync2").data("owlCarousel") !== undefined){
      center(current)
    }
  }

  $("#sync2").on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).data("owlItem");
    sync1.trigger("owl.goTo",number);
  });

  function center(number){
    var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
    var num = number;
    var found = false;
    for(var i in sync2visible){
      if(num === sync2visible[i]){
        var found = true;
      }
    }

    if(found===false){
      if(num>sync2visible[sync2visible.length-1]){
        sync2.trigger("owl.goTo", num - sync2visible.length+2)
      }else{
        if(num - 1 === -1){
          num = 0;
        }
        sync2.trigger("owl.goTo", num);
      }
    } else if(num === sync2visible[sync2visible.length-1]){
      sync2.trigger("owl.goTo", sync2visible[1])
    } else if(num === sync2visible[0]){
      sync2.trigger("owl.goTo", num-1)
    }
  }

  /*Конец слайдера на главной*/

  /*owl Слайдер календарь событий*/
  var eventCalendar = $("#calendar_slider");

  eventCalendar.owlCarousel({

    responsive : {
      0 : {
        items : 2,
      },
      480 : {
        items : 4,
      },
      768 : {
        items : 5,
      },
      1025 : {
        items : 6,
      },
      1200 : {
        items : 7,
      },
    },

    responsiveRefreshRate : 100,
    slideSpeed : 1000,
    nav: true,
    navText: ['',''],
    dots: false,
    margin: 5,

  });

  /*owl Слайдер евентов*/
  var eventCalendar = $("#event_slider");

  eventCalendar.owlCarousel({

    responsive : {
      0 : {
        items : 1,
      },
      768 : {
        items : 3,
      },
      992 : {
        items : 4,
      },
    },

    responsiveRefreshRate : 100,
    slideSpeed : 1000,
    nav: true,
    navText: ['',''],
    dots: false,
    margin: 20,
  });


  /*Инициализация скрипта для стилизации Selectbox*/

  initSelectbox();

  /* datetimepicker Календарь*/
  $( function() {
    var dateFormat = "mm/dd/yy",
      from = $( "#start_date" )
        .datepicker({
          showOn: "button",
          buttonImage: "/i/svg_icon/calendar.svg",
          buttonImageOnly: true,
          buttonText: "Select date",
          showOtherMonths: true,
          selectOtherMonths: true
        })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
        }),
      to = $( "#finish_date" ).datepicker({
        showOn: "button",
        buttonImage: "/i/svg_icon/calendar.svg",
        buttonImageOnly: true,
        buttonText: "Select date",
        showOtherMonths: true,
        selectOtherMonths: true
      })
        .on( "change", function() {
          from.datepicker( "option", "maxDate", getDate( this ) );
        });
    $.datepicker.setDefaults($.datepicker.regional[lang]);

    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }

      return date;
    }
  } );


  // $("header .selectbox .select").click(function(){
  // 	if (!$(this).parent().hasClass('open')) {
  // 		$(this).parent().addClass('open');
  // 	} else {
  // 		$(this).parent().removeClass('open');
  // 	}
  // });

  var notif_val = 0;

  if ($('.header-notification').length) {
    console.log('111');
    notif_val = $('.header-notification').innerHeight();
  }


  $(window).scroll(function() {
    window_w = $(window).width();
    // if (window_w > 1024) {
    if ($(this).scrollTop() > 100 + notif_val) {
      $('body').addClass('fixed');
    } else {
      $('body').removeClass('fixed');
    }

    if ($(this).scrollTop() > 150 + notif_val) {
      $('body').addClass('fixed-open');
    } else {
      $('body').removeClass('fixed-open');
    }
    // }
  });


  /*Обработчик кнопок*/
  $(".search_btn_head").click(function(){
    if (!$(this).hasClass('open')) {

      $('.wrap_head_actions div, .btn_menu').removeClass('open');
      $(".loaction-section").slideUp();
      $(".contacts_phone").slideUp();
      $(".lang-section").slideUp();

      $(this).addClass('open');
      $(".search_form").slideDown().find('input').focus();
    } else {
      $(this).removeClass('open');
      $(".search_form").slideUp();
    }
  });


  $(".lang_btn_head").click(function(){
    if (!$(this).hasClass('open')) {
      $('.wrap_head_actions div, .btn_menu').removeClass('open');
      $(".loaction-section").slideUp();
      $(".search_form").slideUp();
      $(".contacts_phone").slideUp();

      $(this).addClass('open');
      $(".lang-section").slideDown();
    } else {
      $(this).removeClass('open');
      $(".lang-section").slideUp();
    }
  });

  $(".location_btn_head").click(function(){
    if (!$(this).hasClass('open')) {
      $('.wrap_head_actions div, .btn_menu').removeClass('open');
      $(".search_form").slideUp();
      $(".contacts_phone").slideUp();
      $(".lang-section").slideUp();

      $(this).addClass('open');
      $(".loaction-section").slideDown();
    } else {
      $(this).removeClass('open');
      $(".loaction-section").slideUp();
    }
  });


  $(".close_search").click(function(){
    $(".search_btn_head").removeClass('open');
    $(".search_form").slideUp();
  });

  $(".phone_btn_head").click(function() {
    if (!$(this).hasClass('open')) {
      $('.wrap_head_actions div, .btn_menu').removeClass('open');
      $(".loaction-section").slideUp();
      $(".search_form").slideUp();
      $(".lang-section").slideUp();
      $(this).addClass('open');
      $(".contacts_phone").slideDown();
    } else {
      $(this).removeClass('open');
      $(".contacts_phone").slideUp();
    }
  });

  $(".btn_menu").click(function(){


    if (!$(this).hasClass('open')) {
      $('.wrap_head_actions div').removeClass('open');
      $(".loaction-section").slideUp();
      $(".search_form").slideUp();
      $(".lang-section").slideUp();
      $(".contacts_phone").slideUp();

      $(this).addClass('open');
      $(".main_nav_menu").slideDown();

      $("#mob_menu").addClass("active");
      if( $(".filter_box").css("display") == "block" ){
        $(".filter_box").css("display", "none");
      }
      $("html").addClass("overflow");
      // $("header").removeClass("fixed");


    } else {
      $(this).removeClass('open');
      $(".main_nav_menu").slideUp();


      $("#mob_menu").removeClass("active");

      if( $(".filter_box").css("display") == "none" ){
        $(".filter_box").css("display", "block");
      }
      $("html").removeClass("overflow");
      // $("header").addClass("fixed");

    }

  });

  $("#mob_menu").click(function(evt){
    var target = evt.target;
    if( $(target).attr("id") =="mob_menu"  ){
      $("html").removeClass("overflow");
      $(this).removeClass("active");
    }

  });

  // $(".login_btn_head, .login_line >a ").click(function() {
  // 	$(".sign_in_panel.rel").fadeToggle();
  // });



  $(document).on('click', function(e) {
    if (!$(e.target).closest(".wrap_head_actions").length) {
      $('.contacts_phone').slideUp();
    }

    if (!$(e.target).closest(".search_btn_head").length && !$(e.target).closest(".search_form").length) {
      $('.search_form').slideUp();
      $(".search_btn_head").removeClass('open');
    }

    if (!$(e.target).closest(".main_nav_menu").length && !$(e.target).closest(".btn_menu").length) {
      $('.main_nav_menu').slideUp();
    }
    if (!$(e.target).closest(".sign_in_panel.rel").length && !$(e.target).closest(".login_btn_head").length && !$(e.target).closest(".login_line > a").length) {
      $('.sign_in_panel.rel').fadeOut();
    }
    e.stopPropagation();
  });

  $(".btn_filter").click(function(){
    $("html").toggleClass("overflow");
    $("header").toggleClass("fixed");
    $(".filter_box").slideToggle();
  });

  $(".filter_box h3 span").click(function(){
    $("html").removeClass("overflow");
    $("header").removeClass("fixed");
    $(".filter_box").slideToggle();
  });



  /*Категории событий*/
  var countLi = $(".event_category ul.nav").find("li").length;
  var documentWidth = parseInt(document.documentElement.clientWidth);
  var windowsWidth = parseInt(window.innerWidth);
  var scrollbarWidth = windowsWidth - documentWidth;
  if( (bodyWidth + scrollbarWidth) < 767 ){
    if( countLi % 2 == 0 ){
      countLi = countLi / 2;
      var widthLi = 100 / countLi;
    }
    else{
      countLi = ( Math.floor(countLi / 2) ); console.log('even' + countLi)
      var widthLi = 100 / countLi; console.log('widthli' + widthLi)
      $(".event_category").addClass("even");
    }
  }
  else{
    var widthLi = 100 / countLi;
  }
  $(".event_category ul.nav li").css("width", widthLi + "%");


  $(".liked_txt .liked").click(function(){
    $(this).toggleClass("lik")}
  );

});

$( window ).resize(function() {
  CategoriesResize();

});

function OpenEventsByDate(item,date){
  $('#calendar_slider .orange').removeClass('orange');
  $(item).parent().addClass('orange');
  $.get(js_lang+'/filter/eventsbydate',{one_date:date},function(data){
    $('.sl-recent').html(data.html).show();
  },'json');
};
var js_lang;

// ------------------------------ //

var ListEvents = function(key, value) {
  $('.new-filter').addClass('loading');
  $('.filter-results-rows').css({
    opacity: 0.3
  });
  var k = key
  var url = window.location.origin+window.location.pathname

  // query string to array
  var queryObj = new Array();
  var querystring = window.location.search.replace('?', '').split('&');
  for (var i = 0; i < querystring.length; i++) {
    var nameI = querystring[i].split('=')[0];
    var valueI = querystring[i].split('=')[1];
    if(nameI){
      queryObj[nameI] = valueI;
    }
  }
  //exception for category
  if(key == 'category'){
    var urlRepl = url.replace(window.location.pathname,'/events')
    if(value == 'none'){
      url = urlRepl
    }else{
      url = urlRepl +'/'+ value
    }
  }else{
    queryObj[key] = value
    // remove query if not option
    if(value == 'none'){
      delete queryObj[key]
    }
  }

  var urlSend = url;
  url = url +(Object.keys(queryObj).length ? '?' : '')+ serializeObj(queryObj)
  if(key == 'page'){
    delete queryObj[key]
    urlSend = urlSend +(Object.keys(queryObj).length ? '?' : '')+ serializeObj(queryObj)
  }else{
    urlSend = url
  }

  if(key == 'reset'){

    cur = -1;
    prv = -1;
    d1 = 0;
    d2 = 0;

    url = window.location.origin+'/'+lang+'/events'
    urlSend = window.location.origin+'/'+lang+'/events'
  }
  window.history.pushState({}, '',urlSend)
  $.ajax({
    type: "GET",
    dataType: "html",
    url: url
  }).done(function(data) {
    content = $.parseHTML(data);
    if(k == 'page'){
      if(queryObj['grid']){
        tableHtml = $(content[0]).find('.new-filter-results tbody').html();
        $('.event-list-filter .new-filter-results tbody').append(tableHtml);
        if(tableHtml.trim()){
          $('.load_more').attr('data-value',parseInt(value) + 1);
        }else{
          $('.load_more').remove();
        }
      }else{
        gridHtml = $(content[0]).find('.filter-results-rows').html();
        $('.filter-results-rows').append(gridHtml);
        if($(content[0]).find('.event-list-filter .load_more').length){
          $('.event-list-filter .load_more')[0].outerHTML = $(content[0]).find('.event-list-filter .load_more')[0].outerHTML;
        }else{
          $('.event-list-filter .load_more').remove();
        }
      }
    }else{
      gridHtml = $(content[0]).find('.event-list-filter').html();
      $('.event-list-filter').html(gridHtml);
      if($('html').hasClass('filter-open')){
        $('.mobile-overlay').show();
        $('.new-mobile-filter-wrap').show();
        $('.new-mobile-filter').addClass('filter-open')
        $('.new-mobile-filter-trigger').addClass('filter-open');
      }
      EventFilterRefresh();
    }
    $('.new-filter').removeClass('loading');
    $('.filter-results-rows').css({
      opacity: 1
    });
  },'json');
}

var serializeObj = function(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}
// -------------------------------------- //

$(function(){
  $(window).on("popstate", function (e) {
    if (!e.originalEvent.state) {
      // location.reload();
    }
  });
  if(typeof lang !== 'undefined'){
    js_lang  = lang == 'ro' ? '' : '/'+lang;
  }else{
    js_lang = '';
  }

  /* Event page - Start filter*/

  $('body').on('change','[data-action="event-filter"]', function(event) {
    ListEvents($(this).data('name'),$(this).val())
  });
  $('body').on('click','[data-action="event-filter"]', function(event) {
    ListEvents($(this).data('name'),$(this).attr('data-value'))
  });

  /* Event page - End filter*/

  //search
  var searchTimeout;
  $('body').on('keyup','[data-action="site-search"]', function(event) {
    var item = this;
    if(searchTimeout) {
      $('.search_form .loading-icon').removeClass('hidden');
      clearTimeout(searchTimeout);
    }
    if($(item).val() == ''){
      $('.search-result').html('');
      $('.search_form .loading-icon').addClass('hidden');
    }else{
      searchTimeout = setTimeout(function () {
        $.ajax({
          type: "GET",
          dataType: "json",
          url: $(item).parents('form').attr('action'),
          data:{
            text:$(item).val()
          }
        }).done(function(data) {
          $('.search-result').html(data.html);
          $('.search_form .loading-icon').addClass('hidden');
        },'json');
      },1300);
    }
  });


  $('body').on('click','[data-action="change-category"]', function(event) {
    event.preventDefault();
    id = $(this).attr('data-id');
    cache = $(this).attr('data-cache');
    if(cache == 'false' || $('#tab_cat-'+id).attr('data-content') == 'false'){
      $('#categori_filter').val(id);
      $('#categori_filter').trigger('refresh');
      if($(this).attr('data-filter') == 'true'){
        obj = $('[data-action="event-filter"]').serialize();
      }else{
        if(cache == 'false'){
          obj = {category:id,sort:$('.sort-event-hidden').val()};
        }
      }
      if(cache == 'false'){
        $('.sort-page-hidden').val(1)
        loadEventFilter(obj);
      }else{
        $.ajax({
          type: "GET",
          dataType: "json",
          url: js_lang+'/filter/categories',
          data:{
            category:id,
            main:1
          }
        }).done(function(data) {
          $('#tab_cat-'+id).attr('data-content',true);
          $('#tab_cat-'+id).html(data.html);
        },'json');
      }
    }
  });



// ------------------ next page -----------------------
  $('body').on('click','[data-action="next-page"]', function(event) {
    item = this;
    main = $(item).attr('data-main');
    if(main != 'true'){
      $('.sort-page-hidden').val(parseInt($('.sort-page-hidden').val())+1)
      if($(item).attr('data-filter') == 'true'){
        obj = $('[data-action="event-filter"]').serialize();
      }else{
        obj = {
          page:$('.sort-page-hidden').val(),
          sort:$('.sort-event-hidden').val(),
          category:$('.event_category .tabs .nav .active a').attr('data-id')
        };
      }
    }else{
      obj = {
        main:1,
        category:$(item).attr('data-id'),
        page:$(item).attr('data-page'),
      }
    }
    $.ajax({
      type: "GET",
      dataType: "json",
      url: js_lang+'/filter/categories',
      data:obj
    }).done(function(data) {
      if(main != 'true'){
        $('[data-action="next-page"]').prev().append(data.html);
        window.history.pushState({}, '',data.url)
      }else{
        $(item).before(data.html);
        $(item).remove();
      }
    },'json');
  });




  // ----------------end next page ---------------------------------



  $('body').on('click','[data-action="next-page-ticket"]', function(event) {
    item = this;
    main = $(item).attr('data-main');
    obj = {
      main:1,
      category:$(item).attr('data-id'),
      offset:$(item).attr('data-main'),
    }
    $.ajax({
      type: "POST",
      dataType: "json",
      url: js_lang+'/account/tickets',
      data:obj
    }).done(function(data) {
      // alert('sdfsd');
      // console.log(data);

      if(parseInt($(item).attr('data-main')) >= parseInt(item.id)){
        $('.load_more').remove();
      }

      $(item).attr('data-main',parseInt($(item).attr('data-main'))+6);
      if(main != 'true'){
        $('[data-action="next-page-ticket"]').prev().append(data.html);
        window.history.pushState({}, '',data.url)
        if(parseInt($(item).attr('data-main')) == parseInt(item.id)){
          $('.load_more').remove();
        }
      }else{
        $(item).before(data.html);
        $(item).remove();
      }
    },'json');
  });



  // end next page tickets ---------------
  $('body').on('submit','[data-action="event-filter"]', function(event) {
    event.preventDefault();
    loadEventFilter($(this).serialize());
  });
  $('[data-action="event-sort"]').change(function(event){
    event.preventDefault();
    filter = $('.event_category .tabs .nav li').eq(0).find('a');
    sortValue = $(this).val();
    if(filter.attr('data-filter') == 'true'){
      obj = $('[data-action="event-filter"]').serialize();
    }else{
      obj = {category:$('#categori_filter').val(),sort:sortValue};
    }
    $('.sort-event-hidden').val(sortValue);
    loadEventFilter(obj);
  });

  $('body').on('click','[data-action="clear-event-filter"]', function(event) {
    event.preventDefault();
    $(".filter_box").slideUp();
    loadEventFilter({sort:$('.sort-event-hidden').val()});
  });

  $('body').on('click','[data-action="add-favorite"]', function(event) {
    event.preventDefault();
    PNotify.removeAll();
    console.log('444');
    item = this;
    $.ajax({
      type: "POST",
      dataType: "json",
      url: js_lang+'/event/add-to-favorite',
      data:{
        id:$(item).attr('data-id')
      }
    }).done(function(data) {
      if(data.success === true){
        new PNotify({
          title: data.message,
          text: '',
          type: 'success'
        });
        if(data.remove === true){
          $(item).removeClass("liked");
        }else{
          $(item).addClass("liked");
        }
      }else{
        new PNotify({
          title: data.message,
          text: '',
          type: 'error'
        });
        $(item).removeClass("liked");
        console.log('333');
      }
    },'json');
  });

  function loadEventFilter(obj){
    $.ajax({
      type: "GET",
      dataType: "json",
      url: js_lang+'/filter/event',
      data:obj,
    }).done(function(data) {
      $('.event_category').html(data.html);
      initSelectbox();
      window.history.pushState({}, '',data.url);
      CategoriesResize();
      RunDatepicker();
    },'json');
  }
  $('body').on('click','[data-action="new-payment"]', function(event) {
    document.domain = 'iticket.md';
    event.preventDefault();
    item = this;
    PNotify.removeAll();
    new PNotify({
      title: 'Подождите! Идет переход на оплату.',
      text: '',
      type: 'success',
    });
    $.ajax({
      type: "POST",
      dataType: "json",
      url: 'https://admin.iticket.md/booking/newPayment',
      data:{
        lang:lang,
        si:si,
        cli:cli,
        ev:$(item).attr('data-ev'),
        seat:$(item).attr('data-id')
      },
    }).done(function(data) {
      PNotify.removeAll();
      if(data.success){
        new PNotify({
          title: data.message,
          text: '',
          type: 'success',
        });
        window.location.href = data.redirect;
      }else{
        new PNotify({
          title: data.message,
          text: '',
          type: 'error',
        });
      }
    },'json');
  });

  $('body').on('click','[data-action="refund-method"]', function(event) {
    item = this;

    $(this).parent().find('div').removeClass('active');
    $(this).addClass('active');


    method = $(item).data('type');
    $(item).parents('.back').find('.tab-type').hide();
    $(item).parents('.back').find('.tab-'+method).show();
    $(item).parents('.back').find('.refund-method').val(method);
  })

  $('body').on('click','[data-action="delete-payment"]', function(event) {
    if (confirm(translation.cancel)) {
      event.preventDefault();
      item = this;
      PNotify.removeAll();
      $.ajax({
        type: "POST",
        dataType: "json",
        url: js_lang + '/account/delete-ticket',
        data: {
          seat: $(item).attr('data-id'),
          type: $(item).parents('.back').find('.refund-method').val()
        }
      }).done(function (data) {
        PNotify.removeAll();
        if (data.success) {
          new PNotify({
            title: data.message,
            text: '',
            type: 'success'
          });
          $(item).parents('.col-md-6').remove();
        } else {
          new PNotify({
            title: data.message,
            text: '',
            type: 'error'
          });
        }
      }, 'json');
    }
  });

  window.onpopstate = function(e){
    if(e.state !== null) {
      // location.reload();
    }
  }
});
function siteNotify(data){
  PNotify.removeAll();
  new PNotify({
    title: data.message,
    text: '',
    type: data.type
  });
}
