/* Version=6.58.2,Timestamp=2022-05-26T20:31:38.780Z */define("back-to-top-cta",["Modernizr","d2-back-to-top-cta"],function(){"use strict";return IEA.module("UI.back-to-top-cta",function(t,o,e){_.extend(t,{_scrollToTop:function(){var o=$("body"),e=$(".back-to-top-btn"),i=$(window),n=!1;document.addEventListener("scroll",function(t){$(window).scrollTop()+i.height()>=30*o[0].scrollHeight/100?!1===n&&(Modernizr.csstransforms3d?e.addClass("show-btn"):e.animate({right:"25px"}),n=!0):!0===n&&(Modernizr.csstransforms3d?e.removeClass("show-btn"):e.animate({right:"-50px"}),n=!1)},!0)}})})}),define("d2-back-to-top-cta",[],function(){"use strict";return IEA.module("UI.back-to-top-cta",function(t,i,o){_.extend(t,{defaultSettings:{ctaLink:".js-back-to-top-cta__link"},events:{"click .js-back-to-top-cta__link":"_backToTop"},initialize:function(t){this._super(t),this.triggerMethod("init")},render:function(){return this.$el.html(this.template(this.getModelJSON())),!1===this._isEnabled&&(this.enable(),this._isEnabled=!0),this.triggerMethod("render"),this},enable:function(){this.triggerMethod("beforEnable"),this._scrollToTop(),this.triggerMethod("enable")},_scrollToTop:function(){var t,o=$(window).height(),e=this.$el.find(this.defaultSettings.ctaLink);e.addClass("hidden"),i.on("window:scrolled",function(){$(window).scrollTop()>o?e.removeClass("hidden"):e.addClass("hidden"),t=$(window).scrollTop(),$("body").height()-($("header").height()+$("footer").height())+700<t?e.css({position:"absolute"}):e.css({position:"fixed"})})},_backToTop:function(t){t.preventDefault(),$("html, body").css({transition:"all 1s cubic-bezier(0,0,0,1)"}).animate({scrollTop:0})}})})});