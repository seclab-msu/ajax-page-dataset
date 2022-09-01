define(["underscore","iea","magnificPopup"],function(i,n){"use strict";IEA.service("popup",function(n,e){function t(){return this}return i.extend(t.prototype,{initialize:function(n){var e=this,t={type:"inline",mainClass:"iea-popup",closeOnBgClick:!0,closeBtnInside:!0,closeMarkup:'<button title="%title%" class="mfp-close"><i class="mfp-close-icn icon-close-light"></i></button>',showCloseBtn:!0,enableEscapeKey:!0,modal:!1,fixedContentPos:"auto",midClick:!0,ajax:{settings:null,cursor:"mfp-ajax-cur"},iframe:{markup:'<div class="mfp-iframe-scaler"><button class="mfp-close"><i class="mfp-close-icn icon-close-light"></i></button><iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe><div class="mfp-title">Some caption</div></div>'},preloader:!0,callbacks:{beforeOpen:function(){e.triggerMethod("popup:beforeOpen",e.instance)},open:function(){$(".mfp-close",e.instance.container).click(function(){e.close()}),e.triggerMethod("popup:open",e.instance)},close:function(){e.triggerMethod("popup:close",e.instance)},lazyLoad:function(n){e.triggerMethod("popup:lazyload",n,e.instance)},change:function(n){e.triggerMethod("popup:change",n,e.instance)},resize:function(n){e.triggerMethod("popup:resize",n,e.instance)},beforeClose:function(n){e.triggerMethod("popup:beforeClose",n,e.instance)},afterClose:function(n){e.triggerMethod("popup:afterClose",n,e.instance)},buildControls:function(){"gallery"===e.options.type&&this.contentContainer.append(this.arrowLeft.add(this.arrowRight))},markupParse:function(){}}};return void 0!==n&&void 0!==n.type&&"gallery"===n.type&&(t=i.extend(t,{gallery:{enabled:!0,preload:[1,2],navigateByImgClick:!0,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-prevent-close %dir%"><i class="icon-arrow-%dir% mfp-prevent-close"></i></button>',tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:'<span class="mfp-counter">%curr% of %total%</span>'}})),this.options=i.extend(t,n),this.instance=$.magnificPopup.instance,this},open:function(n,e,t){var i=0;return void 0!==this.instance&&this.instance.isOpen&&$.magnificPopup.instance.close(),void 0!==n&&(isNaN(parseInt(n))?this._setPopupData(n,e,t):i=n),$.magnificPopup.open(this.options,i),this.instance=$.magnificPopup.instance,this},next:function(){this.instance=$.magnificPopup.instance,this.instance.isOpen&&this.instance.next()},prev:function(){this.instance=$.magnificPopup.instance,this.instance.isOpen&&this.instance.prev()},getCurrentItem:function(){if(this.instance=$.magnificPopup.instance,this.instance.isOpen)return this.instance.currItem},getCurrentItemIndex:function(){if(this.instance=$.magnificPopup.instance,this.instance.isOpen)return this.instance.index},goTo:function(n){this.instance=$.magnificPopup.instance,this.instance.isOpen?this.instance.goTo(n):this.open(n)},close:function(){return this.instance=$.magnificPopup.instance,void 0!==this.instance&&this.instance.close(),this},_setPopupData:function(n,e,t){void 0===e&&(e="inline"),i.isArray(n)?i.extend(this.options,{items:n,gallery:{enabled:!0}}):n instanceof IEA.Model||n instanceof IEA.Collection?i.extend(this.options,{items:n.toJSON(),gallery:{enabled:!0}}):n instanceof IEA.View?i.extend(this.options,{items:{src:n.render().$el,type:e}}):"inline"!==e&&"image"!==e||i.extend(this.options,{items:{src:n,type:e}}),this.options=i.extend(this.options,t)}}),t})});