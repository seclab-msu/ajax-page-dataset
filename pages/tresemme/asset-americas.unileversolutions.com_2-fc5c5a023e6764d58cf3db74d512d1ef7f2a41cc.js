/* Version=6.58.2,Timestamp=2022-05-26T20:31:38.780Z */define("d2-rich-text-v2",["formService"],function(){"use strict";var n=null;return IEA.module("UI.rich-text-v2",function(t,e,o){_.extend(t,{defaultSettings:{nonLoggedInUser:".c-nonLoggedIn-user",loggedInUser:".c-loggedIn-user",description:".c-rich-text-v2__description"},initialize:function(t){this._super(t),n=new IEA.formService,this.triggerMethod("init")},render:function(){return this.$el.html(this.template(this.getModelJSON())),!1===this._isEnabled&&(this.enable(),this._isEnabled=!0),this.triggerMethod("render"),this},enable:function(){this.triggerMethod("beforEnable");var t,e,o=this;o.componentJson=o.getModelJSON().richTextV2,o.componentJson.displayDifferentTextForLoggedInUsers&&(t=(e=o.$el.find(o.defaultSettings.description)).find(o.defaultSettings.nonLoggedInUser),e=e.find(o.defaultSettings.loggedInUser),void 0!==n.getCookie("token")?(t.attr("hidden",!0),e.removeAttr("hidden")):(t.removeAttr("hidden"),e.attr("hidden",!0))),this.triggerMethod("enable")}})})}),define("rich-text-v2",["d2-rich-text-v2"],function(){"use strict";return IEA.module("UI.rich-text-v2",function(t,e,o){_.extend(t,{onEnable:function(){this._scrollMenu()},_scrollMenu:function(){if(this.$el.children(".how-to-nav").length){let n=document.querySelectorAll(".how-to-nav ul li a");window.addEventListener("scroll",function(){let i=window.scrollY,t=document.querySelector(".how-to-nav");var e,o=t.offsetTop;let r=$("header").outerHeight()-Math.abs((e=document.querySelector("header"),e=window.getComputedStyle(e),{translateX:(e=new DOMMatrixReadOnly(e.transform)).m41,translateY:e.m42}).translateY);window.pageYOffset>o&&window.pageYOffset<$(".c-column-control--parent-column-control").offset().top+$(".c-column-control--parent-column-control").outerHeight()-$(".how-to-nav").outerHeight()-r?(t.classList.add("sticky"),$(t).find(".c-rich-text-v2__wrapper").css("top",r)):(t.classList.remove("sticky"),$(t).find(".c-rich-text-v2__wrapper").css("top",0)),n.forEach(function(t){let e=$("."+t.hash.replace("#",""));var o=e.offset().top-$(".how-to-nav").outerHeight()-r-5;o<=i&&o+e.outerHeight()>i?t.classList.add("active"):t.classList.remove("active");let n=$(".how-to-nav .c-rich-text-v2__description");$(".how-to-nav a.active").length?(o=$(".how-to-nav a.active").offset().left-$(".how-to-nav ul").offset().left,n[0].scrollTo({top:0,left:Math.max(o),behavior:"smooth"})):n[0].scrollTo({top:0,left:Math.max(n.offset().left),behavior:"smooth"}),t.addEventListener("click",function(t){t.preventDefault();t=$("."+$(this).attr("href").replace("#","")).offset().top-$(".how-to-nav").outerHeight()-r;window.scrollTo({top:t,behavior:"smooth"})})})})}}})})});