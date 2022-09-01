/* Version=6.58.2,Timestamp=2022-05-26T20:31:38.780Z */define("d2-search-input-v2",["search","commonService","typeahead","animService","analytics","lazyLoadService"],function(){"use strict";return IEA.module("UI.search-input-v2",function(e,a,t){var n,i,r=null,s=null,l=null,c=null,o=[],u=null;_.extend(e,{defaultSettings:{searchWrapper:".c-search-input-v2-form__elements",searchInput:".c-search-input-v2-form__textbox.typeahead",clearSearch:".o-btn--reset",searchButton:".js-search-handler",searchForm:".c-search-input-v2-form",takeoverSearchOverlay:".c-search-input-v2__search-overlay",subBrandEnabled:".c-search-sub-brand__enabled",subBrand:".c-search-sub-brand",placeHolder:".js-search-input-v2-placeholder",searchHeadingTxt:".js-search-input-v2-headingtxt",logoImage:".js-search-input-v2-logo",searchInputSubBrand:".c-search-input-v2__subbrand",subBrandActiveItem:".c-search-sub-brand__item.active",subBrandItem:".c-search-sub-brand__item",subBrandWrapper:".c-search-subbrand__wrapper",subBrandPanel:".c-search-subbrand__panel",isPageLoad:!0,searchInputHeader:".c-search-input-v2__header",searchInputWrapper:".c-search-input-v2__wrapper",predictivSearch:".predictive__search__form__textbox",predictiveSuggestion:".predictive__search__suggestion",predictiveSearchSeaction:".predictive__search__section",predictiveSuggestionOption:".suggestion-list__suggestion",predictiveResultCount:4,itemsPerPage:4},events:{"submit form":"_submitForm","click .o-btn--search-handler":"_openModal","click .o-btn--search-close":"_closeModal","click .c-search-sub-brand__enabled":"_selectedSubBrand","click .suggestion-list__suggestion":"_updateSuggestionSubmit","click .js-barcode-handler":"openBarcodeScanner","click .o-btn--barcode-reset":"closeBarcodeScanner","click .predictive__search__form__reset":"_resetPredictiveSearch"},initialize:function(e){this._super(e),r=new IEA.search,s=new IEA.animService,l=new IEA.Analytics,c=new IEA.commonService,u=new IEA.LazyLoad,this.triggerMethod("init")},render:function(){return this.$el.html(this.template(this.getModelJSON())),!1===this._isEnabled&&(this.enable(),this._isEnabled=!0),this.triggerMethod("render"),this},enable:function(){this.triggerMethod("beforEnable");var t=this,e=t.defaultSettings;t.componentJson=t.getModelJSON(),t.searchData=t.componentJson.searchInputV2,t.subBrandMap=t.searchData.subBrandMap,t.searchWrapper=t.$el.find(e.searchWrapper),t.searchInputField=t.$el.find(e.searchInput),t.clearSearch=e.clearSearch,t.searchButton=e.searchButton,t.searchForm=e.searchForm,t.searchKeyword="",t.inputVal="",t.selectedSubBrand="",t.predictivSearch=e.predictivSearch,t.predictiveSuggestionOption=e.predictiveSuggestionOption,t.isLocalEnv=IEA.currentInstance.config.attributes.localEnv,t.predictiveVar={},t.barcodeVideoContainerId="barcode-video-element-"+t.searchData.randomNumber,t.searchData.subBrandMap&&1<t.searchData.subBrandMap.subBrands.length&&t._onLoadSelectedSubBrand(),t._enableSearchMethods(),t._enablePredictiveSearch(),t.searchData.enableBarcodeScan&&(c.listenEvent("barcodeCameraAllowed",function(e,a){t._barcodeAnalytics("cameraAllow"),$(a.ref.videoElement).parent().removeClass("hidden")}),r.initializeBarcodeApi().then(function(e){e&&t.$el.find(".js-barcode-handler").removeClass("hidden")})),this.triggerMethod("enable")},openBarcodeScanner:function(e){e.preventDefault();var a,t=this,n={};t._barcodeAnalytics("click"),$(".barcode-main-container").addClass("hidden"),r.getVideoDevices().then(function(e){(a=e&&e.length?e[e.length-1].deviceId:null)||t._barcodeAnalytics("cameraPopup"),r.scanCode(a,t.barcodeVideoContainerId).then(function(a){c.dispatchEvent("barcodeSearch",{context:t,barcode:a}),t.closeBarcodeScanner(),$(t.searchForm).hasClass("predictive-search-form")?t.$el.find(t.predictivSearch).val(a.text):t.$el.find(t.searchInputField).typeahead("val",a.text+" "+t.searchData.inLabel+" Product"),(n=t.getBarcodeSearchResultOptions(a.text)).onCompleteCallback=function(e){u.preLoader(t.$el,!1),1===(e=JSON.parse(e)).totalResults?window.location.href=e.response[0].PageUrl:t._updateParams(a.text+" "+t.searchData.inLabel+" Product",$(t.searchForm))},n.onErrorCallback=function(e){u.preLoader(t.$el,!1)},u.preLoader(t.$el,!0),c.getDataAjaxMethod(n)}).catch(function(e){"permission denied"===e.message.toLowerCase()&&(t.closeBarcodeScanner(),t._barcodeAnalytics("cameraDeny"))})})},closeBarcodeScanner:function(){r.closeScanner(),this.$el.find(".barcode-main-container").addClass("hidden")},getBarcodeSearchResultOptions:function(e){var t,a={},n=this,i=n.searchData.additionalBrands,r=[];return i&&_.each(i,function(e){r.push(e.name)}),_.each(n.searchData.subBrandMap.subBrands,function(e,a){e.name.trim()===n.selectedSubBrand&&(t=e.subBrandsearchTag[0]?e.subBrandsearchTag[0].trim():"")}),i=$(n.defaultSettings.subBrand).find(".active").text().trim(),a.servletUrl=n.searchData.requestServlet,a.queryParams="?q="+encodeURIComponent(e)+"&fq=ContentType:Product&Locale="+(n.searchData.market||n.searchData.locale)+"&BrandName="+n.searchData.brandName+"&PageNum=1&ipp="+n.defaultSettings.itemsPerPage+"&SU="+n.searchData.searchUnder+"&sbn="+encodeURIComponent(i||"")+"&sip="+n.searchData.searchInputPath+"&sbtg="+(t||"")+"&ab="+r.join(","),a},_resetPredictiveSearch:function(e){$(this.defaultSettings.predictiveSuggestion).html(""),$(this.defaultSettings.predictiveSearchSeaction).html(""),$(this.defaultSettings.predictiveSuggestion).addClass("hide"),$(this.defaultSettings.predictiveSearchSeaction).addClass("hide"),e&&($(this.defaultSettings.predictivSearch).val(""),this.searchData.enableBarcodeScan&&this.closeBarcodeScanner(),s.closeOverlay(this.defaultSettings.takeoverSearchOverlay)),this._setOverlayTabbing()},_updateSuggestionSubmit:function(e){e=$(e.currentTarget).text().trim();$(this.predictivSearch).val(e),$(this.searchForm).submit()},onMatchMobile:function(){this.defaultSettings.predictiveResultCount=3},onMatchTablet:function(){this.defaultSettings.predictiveResultCount=4},_enablePredictiveSearch:function(){var a=this;$(".predictive__search__form__textbox").on("input",_.debounce(function(){$.proxy(a._predictiveSearch(),a)},500)),$(document).keyup(function(e){"Escape"===e.key&&a._resetPredictiveSearch(!0)})},_predictiveSearch:function(e){var a=this,t=$(a.predictivSearch).val().trim();a.predictiveVar={},a.predictiveVar.inputvalue=t,a._resetPredictiveSearch(!1),t.length>=a.searchData.minCharToTriggerAutoSuggest&&(a._abortRunningPredictiveAjax(),a._predictiveSearchSuggestion(),a._predictiveSearchContent(t))},_abortRunningPredictiveAjax:function(e){o.length&&(_.each(o,function(e,a){e.abort()}),o=[],this.predictiveVar.predictiveCallBack=0)},_predictiveSearchSuggestion:function(){var a=this,e={ajaxType:"GET"},e=(e.header={brand:a.searchData.brandName,locale:a.searchData.market,"Content-Type":"application/json"},a.searchData.isExternal&&(e.header["external-contents"]="recipe"),e.servletUrl=a.searchData.searchSuggestionHandler+"?q="+encodeURIComponent(a.predictiveVar.inputvalue)+"&Locale="+a.searchData.market+"&BrandName="+a.searchData.brandName,e.onCompleteCallback=function(e){e&&a._predictiveSuggestionTemplate(e)},e.onErrorCallback=function(e){},c.ajaxDataRequestXhr(e));o.push(e)},_predictiveSuggestionTemplate:function(e){var a=this,t={},n=[];if(e){for(var i,r,s=0;s<a.searchData.autoSuggestResultCount;s++)e[s]&&(i={},r=new RegExp(a.predictiveVar.inputvalue,"ig"),i.text=e[s].replace(r,"<span>"+a.predictiveVar.inputvalue+"</span>"),i.value=e[s],n[s]=i);t.data=n,t.SuggestionHeading=a.searchData.searchHeadingText,a.predictiveVar.noSuggestionResult=!e.length;t=a.getTemplate("search-input-predictive-suggestion","partials/search-input-predictive-suggestion.hbss")(t);$(a.defaultSettings.predictiveSuggestion).html(t)}this.triggerMethod("afterPredictiveSuggestion")},_predictiveSearchContent:function(){var n,i=this;i.predictiveVar.allContentType=[],i.predictiveVar.contentData=[],i.predictiveVar.clearAllResult=!0,i.predictiveVar.predictiveCallBack=0,_.each(i.searchData.tabContentTypes,function(e,a){"everything"!==e.contentName.toLowerCase()&&""!==e.type&&i.predictiveVar.allContentType.push(e)}),_.each(i.predictiveVar.allContentType,function(a,e){var t=i._getContentAjaxOption(a);t.onCompleteCallback=function(e){i._showPredictiveSearchResult(e,a,"success")},t.onErrorCallback=function(e){i._showPredictiveSearchResult(e,a,"error")},n=c.ajaxDataRequestXhr(t),o.push(n)})},_showPredictiveSearchResult:function(e,a,t){var n=this,i="";n.predictiveVar.predictiveCallBack++,this.triggerMethod("predictiveContentRender"),"success"!==t||_.isEmpty(e)?n.predictiveVar.contentData[a.contentName]="":n.predictiveVar.contentData[a.contentName]=n._predictiveContentRender(e,a),n.predictiveVar.allContentType.length===n.predictiveVar.predictiveCallBack&&(n.predictiveVar.clearAllResult?(t=n.searchData.noResultMessage+" '"+n.predictiveVar.inputvalue+"'",$(".suggestion-list__title span").html(t),n.predictiveVar.noSuggestionResult||$(".suggestion-list__subtitle span").html(n.searchData.noResultSuggestion)):(_.each(n.predictiveVar.allContentType,function(e,a){i+=n.predictiveVar.contentData[e.contentName]}),$(n.defaultSettings.predictiveSearchSeaction).html(i),setTimeout($.proxy(n._setOverlayTabbing,n),200)),$(n.defaultSettings.predictiveSuggestion).removeClass("hide"),$(n.defaultSettings.predictiveSearchSeaction).removeClass("hide"),this.triggerMethod("afterPredictiveContent"))},_predictiveContentRender:function(e,a){var t,n=this,i={},r={},s=0;return i.contentType=a.contentType,i.contentName=a.contentName.toLowerCase(),i.breakpointVariation=n.searchData.breakpointVariation,i.data=e,r.resultText=n.searchData.resultText,r.viewallText=n.searchData.viewAllTextLabel,r.isMigrationEnabled=n.searchData.isMigrationEnabled,r.viewAllLink=n.searchData.searchResultPage+"?q="+encodeURIComponent(n.predictiveVar.inputvalue)+"&fq=ContentType:"+a.contentName+"&Locale="+n.searchData.locale+"&BrandName="+n.searchData.brandName,"recipe"===a.contentName.toLowerCase()?(n.searchData.isMigrationEnabled?(i.data="object"!=typeof e?JSON.parse(e):e,s=i.data.hits.total.value):e.data&&e.data.recipeCount&&(s=e.data.recipeCount),0!==s&&(n.predictiveVar.clearAllResult=!1),s<=n.defaultSettings.predictiveResultCount&&(r.viewallText="",r.viewAllLink="")):(0!==e.totalResults&&(n.predictiveVar.clearAllResult=!1),e.totalResults<=n.defaultSettings.predictiveResultCount&&(r.viewallText="",r.viewAllLink="")),i.returnData=r,t=e?n.getTemplate("search-input-predictive-suggestion","partials/search-input-predictive-content.hbss")(i):t},_getContentAjaxOption:function(e){var a,t,n=this,i={};return i.locale=n.searchData.locale,i.BrandName=n.searchData.brandName,i.inputvalue=n.predictiveVar.inputvalue,"internal"!==e.type.toLowerCase()?(a=n.searchData.locale,t=n.searchData.isMigrationEnabled?{recipeUrl:n.searchData.recipeUrl,imageRenditions:n.searchData.imageRenditions,imageurl:n.searchData.imageurl,SearchKeyword:n.predictiveVar.inputvalue,size:n.defaultSettings.predictiveResultCount.toString(),from:"1",EnableDidYouMean:!0}:{SearchKeyword:n.predictiveVar.inputvalue,PageSize:n.defaultSettings.predictiveResultCount,PageIndex:1,EnableDidYouMean:!0},i.servletUrl=n.searchData.recipeEndPoint,i.ajaxType=n.isLocalEnv?"GET":"POST",i.data=JSON.stringify(t)):(a=n.searchData.market,i.ajaxType="GET",i.servletUrl=n.searchData.requestServlet+"?q="+encodeURIComponent(n.predictiveVar.inputvalue)+"&"+e.queryParams+"&Locale="+a+"&BrandName="+n.searchData.brandName+"&PageNum=1&ipp="+n.defaultSettings.predictiveResultCount),i.header={brand:n.searchData.brandName,locale:a,"Content-Type":"application/json"},i.contentType=e.contentName,i},_enableSearchMethods:function(){var e=this;$(document).on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(e){var a=$(this);if(a.data("typeahead"))return!0;a.typeahead(a.data())}),0===$(e.searchInputField).parent(".twitter-typeahead").length&&e._renderSuggestions(),$(e.$el.find(e.clearSearch)).on("click",{field:e.defaultSettings.searchInput,wrapper:e.defaultSettings.searchWrapper},r.clearSearchVal)},_submitForm:function(e){var a=this,t=a.$el.find(a.searchForm),n=a.searchInputField,i=t.data("action");if(""!==t.attr("action")||t.hasClass("predictive-search-form"))return t.hasClass("predictive-search-form")&&a._updatePredictivParams(),!0;e.preventDefault(),0<n.typeahead("val").length&&n.typeahead("val").trim().length?(t.attr("action",i),a._updateParams(n.typeahead("val"),t),a._searchAnalytics()):$(n).focus()},_updatePredictivParams:function(){var e=$(this.predictivSearch).val().trim(),a=$(this.searchForm),t=a.data("action");a.attr("action",t),$("input[name=q]").val(e)},_renderSuggestions:function(){var n=this,e=n.searchData||"",a=n.searchData.includeContentType?n.searchData.includeContentType.length:0,e={inputFont:parseInt($(n.searchInputField).css("font-size")),dropDownLabel:void 0!==e.includeContentType?e.includeContentType:"",searchWrapper:n.searchWrapper,inLabel:e.inLabel,searchInputField:n.searchInputField,clearSearch:n.clearSearch,customKeyword:!n.searchData.disableContentTypeFilter,hint:!n.searchData.disableAutoComplete,locale:$("input[name=Locale]").val(),brandName:$("input[name=BrandName]").val(),searchKeyword:n.searchKeyword.toLowerCase(),suggestionsLimit:n.searchData.autoSuggestResultCount,suggestionsLimitDefault:a,minLengthToTriggerAutoSuggest:n.searchData.minCharToTriggerAutoSuggest,autoSuggest:!n.searchData.disableAutoSuggest,isExternal:n.searchData.isExternal,selectCallback:function(e,a,t){n._updateParams(a,t.parents(n.searchForm)),e.searchKeyword=n.searchKeyword}};r.showSuggestions(e,n)},_updateParams:function(t,e){var n,i=this,a=i.searchData.includeContentType,r="";a.length?$(a).each(function(e,a){if(-1!==t.indexOf(a.contentType))return r="ContentType:"+a.contentType,i.searchKeyword=t.split(" "+i.searchData.inLabel+" "+a.contentType)[0],!1;i.searchKeyword=t,r=""}):(i.searchKeyword=t,r=""),a=$(i.defaultSettings.subBrand).find(".active").text().trim(),_.each(i.subBrandMap.subBrands,function(e,a){e.name.trim()===i.selectedSubBrand&&(n=e.subBrandsearchTag[0]?e.subBrandsearchTag[0].trim():"")}),$("input[name=q]").val(i.searchKeyword),$("input[name=fq]").val(r),$("input[name=sbn]").val(a),$("input[name=sbtg]").val(n),e.submit()},_searchAnalytics:function(){var e,a,t;"undefined"!=typeof digitalData&&"undefined"!=typeof ctConstants&&(e={},a=this.$el.find(".c-search-input-v2"),t=$(this.defaultSettings.subBrand).find(".active").text().trim(),1<a.length&&(a=a.eq(1)),l.trackComponentInfo(a,digitalData),e.eventInfo={type:ctConstants.trackEvent,eventAction:ctConstants.siteSearch,eventLabel:t?t+" - "+this.searchKeyword:a.data("componentname")+" - "+this.searchKeyword,eventValue:1},e.category={primaryCategory:ctConstants.engagement},e.subcategory="Interest",digitalData.event.push(e))},_onLoadSelectedSubBrand:function(){var t=this,n=t.defaultSettings,i=t.getTemplate("search-input-list","partials/search-input-list.hbss");n.isPageLoad&&(t.selectedSubBrand=t.subBrandMap.selectedSubBrand.trim()),_.each(t.subBrandMap.subBrands,function(e,a){e.name.trim()===t.selectedSubBrand&&(""===t.subBrandMap.selectedSubBrandClass?$(n.searchInputWrapper).find("div[data-subbrandclass]").attr("class",""):$(n.searchInputWrapper).find("div[data-subbrandclass]").attr("class",e.class),e={searchHeadingText:e.searchHeadingText||t.searchData.searchHeadingText,searchLogoImage:{url:e.searchLogoImage.url||t.searchData.searchLogoImage.url,fileName:e.searchLogoImage.fileName||t.searchData.searchLogoImage.fileName,isNotAdaptiveImage:e.searchLogoImage.isNotAdaptiveImage||t.searchData.searchLogoImage.isNotAdaptiveImage,extension:e.searchLogoImage.extension||t.searchData.searchLogoImage.extension,altImage:e.searchLogoImage.altImage||t.searchData.searchLogoImage.altImage,title:e.searchLogoImage.title||t.searchData.searchLogoImage.title,path:e.searchLogoImage.path||t.searchData.searchLogoImage.path},searchInputPlaceholderText:e.searchInputPlaceholderText||t.searchData.searchInputPlaceholderText,ctaLabel:e.ctaLabel||t.searchData.ctaLabel,accessibilityFixFlag:t.searchData.accessibilityFixFlag},$(t.searchInputField).attr("placeholder",e.searchInputPlaceholderText),$(n.searchInputHeader).html(i(e)))})},_selectedSubBrand:function(e){var a=this,t=a.defaultSettings,e=$(e.currentTarget);$(t.subBrandEnabled).removeClass("active"),e.addClass("active"),a.selectedSubBrand=e.text().trim(),a.subBrandName=a.selectedSubBrand,t.isPageLoad=!1,a._onLoadSelectedSubBrand()},_openModal:function(e){e.preventDefault(),s.openOverlay(this.defaultSettings.takeoverSearchOverlay),$(".js-main-wrapper").removeClass("u-blur-background"),$(this.searchForm).hasClass("predictive-search-form")?setTimeout(function(){$(".predictive__search__form__textbox").focus()},200):setTimeout(function(){$(".c-search-input-v2-form__textbox").focus()},200),this._setOverlayTabbing()},_closeModal:function(e){e.preventDefault(),$(this.defaultSettings.searchInput).typeahead("val",""),this.searchData.enableBarcodeScan&&this.closeBarcodeScanner(),s.closeOverlay(this.defaultSettings.takeoverSearchOverlay)},_setOverlayTabbing:function(){i&&i.off("keydown"),n&&n.off("keydown");var e=this.$el.find(".c-search-input-v2__search-overlay").find("input,button,a").not(":input[readonly]").filter(":visible");n=e.first(),i=e.last(),n.focus(),i.on("keydown",function(){9!==event.which||event.shiftKey||(event.preventDefault(),n.focus())}),n.on("keydown",function(){9===event.which&&event.shiftKey&&(event.preventDefault(),i.focus())})},_barcodeAnalytics:function(e,a){if("undefined"!=typeof digitalData&&"undefined"!=typeof ctConstants){var t=this.$el.find("[data-component-experience-variant]").data(),n=t.componentVariants,i=t.componentPositions,t=t.componentname,r={};switch(digitalData.component.push({componentInfo:{componentID:t,componentName:t},attributes:{position:i,listPosition:i,componentVariant:n}}),e){case"click":r.eventInfo={type:ctConstants.trackEvent,eventAction:ctConstants.anchorLinkClicked,eventLabel:"Barcode Scan Button Clicked",eventValue:1},r.category={primaryCategory:ctConstants.engagement},r.subcategory="Read",digitalData.event.push(r);break;case"cameraPopup":r.eventInfo={type:ctConstants.trackEvent,eventAction:ctConstants.cameraPopupImpression,eventLabel:" Camera Popup Open",eventValue:1},r.category={primaryCategory:ctConstants.custom},r.subcategory="Others",r.attributes={nonInteractive:{nonInteraction:1}},digitalData.event.push(r);break;case"cameraAllow":r.eventInfo={type:ctConstants.trackEvent,eventAction:ctConstants.cameraPermission,eventLabel:"Allow",eventValue:1},r.category={primaryCategory:ctConstants.engagement},r.subcategory="Interest",digitalData.event.push(r);break;case"cameraDeny":r.eventInfo={type:ctConstants.trackEvent,eventAction:ctConstants.cameraPermission,eventLabel:"Deny",eventValue:1},r.category={primaryCategory:ctConstants.engagement},r.subcategory="Interest",digitalData.event.push(r)}}}})})}),require(["handlebars","unileverHelpers"],function(e){this["unilever-iea"]=this["unilever-iea"]||{},this["unilever-iea"].partials=this["unilever-iea"].partials||{},this["unilever-iea"].partials["search-input-list"]=e.template({1:function(e,a,t,n,i){return null!=(t=t.if.call(a,null!=(t=null!=a?a.searchLogoImage:a)?t.url:t,{name:"if",hash:{},fn:e.program(2,i,0),inverse:e.noop,data:i}))?t:""},2:function(e,a,t,n,i){return'        <span class="c-search-input-v2__logo js-search-input-v2-logo">\n            '+e.escapeExpression((t.adaptiveRetina||a&&a.adaptiveRetina||t.helperMissing).call(a,null!=(e=null!=a?a.searchLogoImage:a)?e.path:e,null!=(e=null!=a?a.searchLogoImage:a)?e.extension:e,null!=(e=null!=a?a.searchLogoImage:a)?e.altImage:e,null!=(e=null!=a?a.searchLogoImage:a)?e.title:e,null!=(e=null!=a?a.searchLogoImage:a)?e.fileName:e,null!=(e=null!=a?a.searchLogoImage:a)?e.url:e,null!=(e=null!=a?a.searchLogoImage:a)?e.isNotAdaptiveImage:e,"68,32,68,32,68,32,68,32","true","searchInputV2.searchLogo","","",!1,null!=a?a.breakpointVariation:a,{name:"adaptiveRetina",hash:{},data:i}))+"\n        </span>\n"},4:function(e,a,t,n,i){return null!=(t=t.if.call(a,null!=a?a.accessibilityFixFlag:a,{name:"if",hash:{},fn:e.program(5,i,0),inverse:e.program(7,i,0),data:i}))?t:""},5:function(e,a,t,n,i){return'        <div class="o-text__heading-2 js-search-input-v2-headingtxt">\n            '+e.escapeExpression("function"==typeof(e=null!=(e=t.searchHeadingText||(null!=a?a.searchHeadingText:a))?e:t.helperMissing)?e.call(a,{name:"searchHeadingText",hash:{},data:i}):e)+"\n        </div>\n"},7:function(e,a,t,n,i){return'        <h2 class="o-text__heading-2 js-search-input-v2-headingtxt">\n            '+e.escapeExpression("function"==typeof(e=null!=(e=t.searchHeadingText||(null!=a?a.searchHeadingText:a))?e:t.helperMissing)?e.call(a,{name:"searchHeadingText",hash:{},data:i}):e)+"\n        </h2>\n"},compiler:[7,">= 4.0.0"],main:function(e,a,t,n,i){var r;return(null!=(r=t.if.call(a,null!=a?a.searchLogoImage:a,{name:"if",hash:{},fn:e.program(1,i,0),inverse:e.noop,data:i}))?r:"")+(null!=(r=t.if.call(a,null!=a?a.searchHeadingText:a,{name:"if",hash:{},fn:e.program(4,i,0),inverse:e.noop,data:i}))?r:"")},useData:!0})}),require(["handlebars","unileverHelpers"],function(e){this["unilever-iea"]=this["unilever-iea"]||{},this["unilever-iea"].partials=this["unilever-iea"].partials||{},this["unilever-iea"].partials["search-input-predictive-suggestion"]=e.template({1:function(e,a,t,n,i){var r=e.lambda;return'<li><a class="suggestion-list__suggestion" href="#'+e.escapeExpression(r(null!=a?a.value:a,a))+'">'+(null!=(e=r(null!=a?a.text:a,a))?e:"")+"</a></li>\n"},compiler:[7,">= 4.0.0"],main:function(e,a,t,n,i){return'<li class="suggestion-list__title"><span tabindex="0">'+e.escapeExpression(e.lambda(null!=a?a.SuggestionHeading:a,a))+'</span></li>\n<li class="suggestion-list__subtitle"><span></span></li>\n'+(null!=(t=t.each.call(a,null!=a?a.data:a,{name:"each",hash:{},fn:e.program(1,i,0),inverse:e.noop,data:i}))?t:"")},useData:!0})}),require(["handlebars","unileverHelpers"],function(e){this["unilever-iea"]=this["unilever-iea"]||{},this["unilever-iea"].partials=this["unilever-iea"].partials||{},this["unilever-iea"].partials["search-input-predictive-content"]=e.template({1:function(e,a,t,n,i){var r,s=e.lambda,l=e.escapeExpression,c=t.helperMissing;return'    <li class="predictive__search__section__header">\n        <div class="item-section">\n            <div tabindex="0" class="item-section__heading"><span>'+l(s(null!=a?a.contentType:a,a))+'</span>\n            <span class="item-section__count">'+l(s(null!=(r=null!=(r=null!=a?a.data:a)?r.data:r)?r.recipeCount:r,a))+" "+l(s(null!=(r=null!=a?a.returnData:a)?r.resultText:r,a))+"</span></div>\n"+(null!=(r=(t.ifCondx||a&&a.ifCondx||c).call(a,null!=(r=null!=(r=null!=a?a.data:a)?r.data:r)?r.recipeCount:r,"!==",0,{name:"ifCondx",hash:{},fn:e.program(2,i,0),inverse:e.noop,data:i}))?r:"")+'        </div>\n    </li>\n    <li class="predictive__search__section__list">\n'+(null!=(r=(t.ifCondx||a&&a.ifCondx||c).call(a,null!=(r=null!=(r=null!=a?a.data:a)?r.data:r)?r.recipeCount:r,"!==",0,{name:"ifCondx",hash:{},fn:e.program(6,i,0),inverse:e.noop,data:i}))?r:"")+"    </li>\n"},2:function(e,a,t,n,i){return null!=(t=t.if.call(a,null!=(t=null!=a?a.returnData:a)?t.viewallText:t,{name:"if",hash:{},fn:e.program(3,i,0),inverse:e.noop,data:i}))?t:""},3:function(e,a,t,n,i){var r,s=e.lambda,l=e.escapeExpression;return'                <div class="item-section__link_all"><a href="'+l(s(null!=(r=null!=a?a.returnData:a)?r.viewAllLink:r,a))+'">'+l(s(null!=(r=null!=a?a.returnData:a)?r.viewallText:r,a))+(null!=(r=t.if.call(a,null!=a?a.contentType:a,{name:"if",hash:{},fn:e.program(4,i,0),inverse:e.noop,data:i}))?r:"")+"</a></div>\n"},4:function(e,a,t,n,i){return'\x3c!--excludesearch--\x3e<span class="sr-only">'+e.escapeExpression(e.lambda(null!=a?a.contentType:a,a))+"</span>\x3c!--endexcludesearch--\x3e"},6:function(e,a,t,n,i){return'        <ul class="flex-container">\n'+(null!=(t=t.each.call(a,null!=(t=null!=(t=null!=a?a.data:a)?t.data:t)?t.recipesList:t,{name:"each",hash:{},fn:e.program(7,i,0),inverse:e.noop,data:i}))?t:"")+"        </ul>\n"},7:function(e,a,t,n,i){var r,s=e.lambda,l=e.escapeExpression;return'            <li>\n                <a class="image__link" href="'+l(s(null!=(r=null!=a?a.aemProperties:a)?r.path:r,a))+'" tabindex="-1">\n'+(null!=(r=t.if.call(a,null!=(r=null!=a?a.assets:a)?r.image:r,{name:"if",hash:{},fn:e.program(8,i,0),inverse:e.program(13,i,0),data:i}))?r:"")+'                </a>\n                <a class="title_link" href="'+l(s(null!=(r=null!=a?a.aemProperties:a)?r.path:r,a))+'">'+l("function"==typeof(e=null!=(e=t.title||(null!=a?a.title:a))?e:t.helperMissing)?e.call(a,{name:"title",hash:{},data:i}):e)+"</a>\n            </li>\n"},8:function(e,a,t,n,i){return null!=(t=t.if.call(a,null!=(t=null!=(t=null!=a?a.assets:a)?t.image:t)?t.default:t,{name:"if",hash:{},fn:e.program(9,i,0),inverse:e.program(11,i,0),data:i}))?t:""},9:function(e,a,t,n,i){return"                                "+e.escapeExpression((t.adaptiveRetinaRMS||a&&a.adaptiveRetinaRMS||t.helperMissing).call(a,null!=(e=null!=(e=null!=(e=null!=(e=null!=a?a.assets:a)?e.image:e)?e.default:e)?e[0]:e)?e.title:e,null!=(e=null!=(e=null!=(e=null!=(e=null!=a?a.assets:a)?e.image:e)?e.default:e)?e[0]:e)?e.title:e,null!=(e=null!=(e=null!=(e=null!=(e=null!=a?a.assets:a)?e.image:e)?e.default:e)?e[0]:e)?e.versions:e,"672,672,672,672,568,568,460,460","false","searchListingV2.listingImageRecipe",{name:"adaptiveRetinaRMS",hash:{},data:i}))+"\n"},11:function(e,a,t,n,i){return'                                <span class="noimage"></span>\n'},13:function(e,a,t,n,i){return'                            <span class="noimage"></span>\n'},15:function(e,a,t,n,i,r,s){var l,c=e.lambda,o=e.escapeExpression,u=t.helperMissing;return'    <li class="predictive__search__section__header">\n        <div class="item-section">\n            <div tabindex="0" class="item-section__heading"><span>'+o(c(null!=a?a.contentType:a,a))+'</span>\n            <span class="item-section__count">'+o(c(null!=(l=null!=a?a.data:a)?l.totalResults:l,a))+" "+o(c(null!=(l=null!=a?a.returnData:a)?l.resultText:l,a))+"</span></div>\n"+(null!=(l=(t.ifCondx||a&&a.ifCondx||u).call(a,null!=(l=null!=a?a.data:a)?l.totalResults:l,"!==",0,{name:"ifCondx",hash:{},fn:e.program(2,i,0,r,s),inverse:e.noop,data:i}))?l:"")+'        </div>\n    </li>\n    <li class="predictive__search__section__list">\n'+(null!=(l=(t.ifCondx||a&&a.ifCondx||u).call(a,null!=(l=null!=a?a.data:a)?l.totalResults:l,"!==",0,{name:"ifCondx",hash:{},fn:e.program(16,i,0,r,s),inverse:e.noop,data:i}))?l:"")+"    </li>\n\n"},16:function(e,a,t,n,i,r,s){return'        <ul class="flex-container">\n'+(null!=(t=t.each.call(a,null!=(t=null!=a?a.data:a)?t.response:t,{name:"each",hash:{},fn:e.program(17,i,0,r,s),inverse:e.noop,data:i}))?t:"")+"        </ul>\n"},17:function(e,a,t,n,i,r,s){var l,c=t.helperMissing,o="function",u=e.escapeExpression;return'            <li>\n                <a class="image__link" href="'+u(typeof(l=null!=(l=t.PageUrl||(null!=a?a.PageUrl:a))?l:c)==o?l.call(a,{name:"PageUrl",hash:{},data:i}):l)+'" tabindex="-1">\n'+(null!=(e=(t.ifCondx||a&&a.ifCondx||c).call(a,null!=s[1]?s[1].ContentType:s[1],"===","Product",{name:"ifCondx",hash:{},fn:e.program(18,i,0,r,s),inverse:e.program(18,i,0,r,s),data:i}))?e:"")+'                </a>\n                <a class="title_link" href="'+u(typeof(l=null!=(l=t.PageUrl||(null!=a?a.PageUrl:a))?l:c)==o?l.call(a,{name:"PageUrl",hash:{},data:i}):l)+'">'+u(typeof(l=null!=(l=t.Title||(null!=a?a.Title:a))?l:c)==o?l.call(a,{name:"Title",hash:{},data:i}):l)+"</a>\n            </li>\n"},18:function(e,a,t,n,i){return"                        "+e.escapeExpression((t.adaptiveRetina||a&&a.adaptiveRetina||t.helperMissing).call(a,null!=(e=null!=a?a.image:a)?e.path:e,null!=(e=null!=a?a.image:a)?e.extension:e,null!=(e=null!=a?a.image:a)?e.altImage:e,null!=(e=null!=a?a.image:a)?e.title:e,null!=(e=null!=a?a.image:a)?e.fileName:e,null!=(e=null!=a?a.image:a)?e.url:e,null!=(e=null!=a?a.image:a)?e.isNotAdaptiveImage:e,"90,90,90,90,70,70,50,50","false","searchListingV2.listingImagePredictive",{name:"adaptiveRetina",hash:{},data:i}))+"\n"},compiler:[7,">= 4.0.0"],main:function(e,a,t,n,i,r,s){return null!=(t=(t.ifCond||a&&a.ifCond||t.helperMissing).call(a,null!=a?a.contentName:a,"recipe",{name:"ifCond",hash:{},fn:e.program(1,i,0,r,s),inverse:e.program(15,i,0,r,s),data:i}))?t:""},useData:!0,useDepths:!0})}),require(["handlebars","unileverHelpers"],function(e){this["unilever-iea"]=this["unilever-iea"]||{},this["unilever-iea"].partials=this["unilever-iea"].partials||{},this["unilever-iea"].partials["input-suggestions"]=e.template({1:function(e,a,t,n,i){var r;return'    <div class="c-image-suggestion">\n        <div class="c-image-suggestion__image">\n            '+e.escapeExpression((t.adaptiveRetina||a&&a.adaptiveRetina||t.helperMissing).call(a,null!=(r=null!=(r=null!=a?a.data:a)?r.image:r)?r.path:r,null!=(r=null!=(r=null!=a?a.data:a)?r.image:r)?r.extension:r,null!=(r=null!=(r=null!=a?a.data:a)?r.image:r)?r.altImage:r,null!=(r=null!=(r=null!=a?a.data:a)?r.image:r)?r.title:r,null!=(r=null!=(r=null!=a?a.data:a)?r.image:r)?r.fileName:r,null!=(r=null!=(r=null!=a?a.data:a)?r.image:r)?r.url:r,null!=(r=null!=(r=null!=a?a.data:a)?r.image:r)?r.isNotAdaptiveImage:r,"90,90,90,90,70,70,50,50","false","storeSearch.suggestionImage","","",!1,null!=a?a.breakpointVariation:a,{name:"adaptiveRetina",hash:{},data:i}))+"\n        </div>\n"+(null!=(r=t.if.call(a,null!=(r=null!=a?a.data:a)?r.Title:r,{name:"if",hash:{},fn:e.program(2,i,0),inverse:e.noop,data:i}))?r:"")+"    </div>\n"},2:function(e,a,t,n,i){return'            <div class="c-image-suggestion__text o-text__heading-6">\n                '+e.escapeExpression(e.lambda(null!=(e=null!=a?a.data:a)?e.Title:e,a))+"\n            </div>\n"},4:function(e,a,t,n,i){return null!=(t=t.if.call(a,null!=a?a.formAddressEnabled:a,{name:"if",hash:{},fn:e.program(5,i,0),inverse:e.program(8,i,0),data:i}))?t:""},5:function(e,a,t,n,i){var r;return'        <div class="c-address-suggestion">\n            '+e.escapeExpression(e.lambda(null!=(r=null!=a?a.data:a)?r.Text:r,a))+"\n"+(null!=(r=t.if.call(a,null!=(r=null!=a?a.data:a)?r.Description:r,{name:"if",hash:{},fn:e.program(6,i,0),inverse:e.noop,data:i}))?r:"")+"        </div>\n"},6:function(e,a,t,n,i){return'                <span class="c-address-suggestion__desc">'+e.escapeExpression(e.lambda(null!=(e=null!=a?a.data:a)?e.Description:e,a))+"</span>\n"},8:function(e,a,t,n,i){return null!=(t=t.if.call(a,null!=a?a.data:a,{name:"if",hash:{},fn:e.program(9,i,0),inverse:e.noop,data:i}))?t:""},9:function(e,a,t,n,i){return"            <div>"+e.escapeExpression(e.lambda(null!=a?a.data:a,a))+"</div>\n"},compiler:[7,">= 4.0.0"],main:function(e,a,t,n,i){return null!=(t=t.if.call(a,null!=a?a.suggestionImage:a,{name:"if",hash:{},fn:e.program(1,i,0),inverse:e.program(4,i,0),data:i}))?t:""},useData:!0})}),define("search-input-v2",["animService","commonService","d2-search-input-v2"],function(){"use strict";return IEA.module("UI.search-input-v2",function(e){new IEA.commonService;_.extend(e,{onInit:function(){},onEnable:function(){}})})});