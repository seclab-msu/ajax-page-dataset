!function(l,d){"use strict";var e;"function"==typeof define&&define.amd?define(["backbone","underscore","layoutmanager","relational","paginator","enquire","picturefill","imagesloaded"],function(e,t,i,n,o,a,s,r){return l.IEA=d(l,e)}):"undefined"!=typeof exports?(e=require("backbone"),require("underscore"),require("layoutmanager"),require("relational"),require("enquire"),require("picturefill"),require("paginator"),require("imagesloaded"),module.exports=d(l,e)):l.IEA=d(l,l.Backbone,l._,l.Layoutmanager,l.Relational,l.Paginator,l.Enquire,l.Picturefill,l.Imagesloaded)}(this,function(e,n){"use strict";var t=e.IEA,k=n.IEA={VERSION:"2.3.1"},l=(k.History=n.History,k.noConflict=function(){return e.IEA=t,this},k.Deferred=n.$.Deferred,Array.prototype.slice);function i(e,t){var i={compEl:document.body,crossDomain:!0,dataType:"jsonp",type:"GET",cache:!1,async:!0,timeout:2e4,contentType:"application/x-www-form-urlencoded; charset=UTF-8",successCallback:function(){},failuerCallBack:function(){},completeCallback:function(){}};t=$.extend(i,t),$.ajax({url:e,cache:t.cache,context:t.compEl,contentType:t.contentType,crossDomain:t.crossDomain,dataType:t.dataType,type:t.type,async:t.async,timeout:t.timeout,headers:{"Access-Control-Allow-Origin":"*"},success:function(e){t.successCallback(e)},error:function(e){t.failuerCallBack(e),t.compEl.append('<p class="error-msg">'+t.errorMsg+"</p>")},complete:function(){t.completeCallback()}})}String.prototype.hyphenToCamelCase=function(){return k.hyphenToCamelCase(this)},k.extend=n.Model.extend,k.modules={},k.getOption=function(e,t){if(e&&t)return e=(e.options&&void 0!==e.options[t]?e.options:e)[t],e},k.setOption=function(e,t,i){return!(!e||!t)&&(e.options&&void 0!==e.options[t]?e.options[t]=i:e[t]=i,!0)},k.hyphenToCamelCase=function(e){if(!e)return"";var t=e.split("-"),i=t.length,n=t[0];if(1<i)for(var o="",a=1;a<i;a++)n+=(o=t[a]).charAt(0).toUpperCase()+o.slice(1);return n},k.create=function(e){return"function"!=typeof Object.create&&(Object.create=function(e){function t(){}return t.prototype=e,new t}),Object.create(e)},k.getApplication=function(){return k.instance},k.getVersion=function(){return k.VERSION},k.module=function(e,t){var i=l.call(arguments);return void 0!==k.currentInstance?k.currentInstance.addModule.apply(k.currentInstance,i):k.modules[e]=t},k.service=function(e,i){return k[e]=function(){var e=_.flatten([this,k.currentInstance,k,n.$,_]),t=l.call(arguments),e=i.apply(this,e);return _.extend(e.prototype,n.Events,{_initCallbacks:new k.Callbacks,addInitializer:function(e){this._initCallbacks.add(e)},start:function(e){this._initCallbacks.run(e,this)},triggerMethod:k.triggerMethod}),(e=new e).initialize.apply(e,t)},i},k.registerModules=function(e){for(var t in k.modules)e.addModule(t,k.modules[t])},k.EventAggregator=function(){function e(){}return e.extend=n.Model.extend,_.extend(e.prototype,n.Events),e},k.actAsCollection=function(e,i){_.each(["forEach","each","map","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","toArray","first","initial","rest","last","without","isEmpty","pluck"],function(t){e[t]=function(){var e=[_.values(_.result(this,i))].concat(_.toArray(arguments));return _[t].apply(_,e)}})},k.serializeFormObject=function(e){var o={};return $.each(e.serializeArray(),function(e,t){var i=o[t.name],n=$.trim(t.value);null!=i?Array.isArray(i)?i.push(n):o[t.name]=[i,n]:o[t.name]=n}),o},k.consolify=function(e){function t(){}window.console||(window.console={});for(var i="log info warn error debug trace dir group groupCollapsed groupEnd time timeEnd profile profileEnd dirxml assert count markTimeline timeStamp clear".split(" "),n=i.length;n--;)!1!==e&&window.console[i[n]]||(window.console[i[n]]=t)},k.checkNonConditionalIEVersion=function(){var e,t=!1,i=null;return window.MSInputMethodContext?(t=!0,i=11):~navigator.userAgent.indexOf("MSIE")&&(e=new Function("/*@cc_on return @_jscript_version; @*/")())&&(t=!0,i=e),{isIE:t,version:Number(i)}},k.getJSON=function(e,t){t.dataType="jsonp",i(e,t)},k.getScript=function(e,t){t.dataType="script",i(e,t)};var o=new RegExp("debug=iea"),a=(window._=require("underscore"),k.Config=function(e,t){n.Model.apply(this,[e]),this.app=t},k.Config.extend=n.Model.extend,_.extend(k.Config.prototype,n.Model.prototype,{defaults:{$htmlAndBody:$("html, body"),$body:$("body"),$window:$(window),$document:$(document),isIE8:$("body").hasClass("lt-ie9"),pageTitle:document.title,isMobileBreakpoint:!1,isTabletBreakpoint:!1,isDesktopBreakpoint:!1,FLCN_TEMPLATE:{},FLCN_BASEPATH:"lib",FLCN_TEMPLATEPATH:"lib/js/templates/",FLCN_IMAGEPATH:"lib/images/",FLCN_VIEWPATH:"lib/js/templates/",FLCN_SASSPATH:"lib/js/sass/",FLCN_THEMEPATH:"lib/js/sass/theme/",FLCN_DEPENDENCIES:["iea.components"],JSONDataKey:"data",templateFramework:"Handlebars",defaultTemplateName:"",dependencies:["app.components"],theme:"whitelabel",selector:"enscale",extension:"jpg",breakpoints:{},template:{},i18n:{},layout:{},debug:!0,messages:{loadErrDefaultTitle:"Component could not be loaded",loadErrDefaultMsg:"Could not load the requested component"},conventions:{notFoundClass:"not-found",errorClass:"error",componentLoadErrDefTitle:"Component could not be loaded",componentLoadErrMsg:"Could not load the requested component"},settings:{errorHandler:"error",missingTemplateHandler:"missingTemplate"},environment:{development:[],stage:[],production:[]},development:{},stage:{},production:{}},initialize:function(e){var t=this,i=e.breakpoints,n=+i.deviceLarge.slice(0,-2),i=+i.deviceXlarge.slice(0,-2);e&&e.url&&(this.urlRoot=e.url),this.set({template:{namespace:e.template.namespace||e.name,parentNamespace:e.template.parentNamespace||e.name,path:e.template.path||{}},breakpoints:{mobile:{media:"screen and (max-width: "+(n-1)+"px)",prefix:".mobP.high."},mobileLandscape:{media:"screen and (max-width: "+(n-1)+"px) and (orientation : landscape)",prefix:".mobL.high."},tablet:{media:"screen and (min-width: "+n+"px) and (max-width: "+(i-1)+"px)",prefix:".tabP.high."},tabletLandscape:{media:"screen and (min-width: "+n+"px) and (max-width: "+(i-1)+"px) and (orientation : landscape)",prefix:".tabL.high."},desktop:{media:"screen and (min-width: "+i+"px)",prefix:".full.high."}}}),this.set(this.get(this.getEnvironment())),this.on("change",function(e){this.get("debug")&&console.info("%c "+this.getEnvironment()+" configuration changed! ","background: #222; color: #fff",e.changed),t.app.triggerMethod("configuration:changed",e.changed)})},getTemplateSetting:function(e){var t=this.get("template");return e?t[e]:t},geti18NSetting:function(e){var t=this.get("i18n");return e?t[e]:t},getLayoutSetting:function(e){var t=this.get("layout");return e?t[e]:t},getSetting:function(e){var t=this.get("settings");return e?t[e]:t},getMessageSetting:function(e){var t=this.get("messages");return e?t[e]:t},getDebugSetting:function(e){var t=this.get("debug");return e?t[e]:t},getConventionSetting:function(e){var t=this.get("conventions");return e?t[e]:t},getEnvironmentSetting:function(e){var t=this.get("environment");return e?t[e]:t},getDevelopmentSetting:function(e){var t=this.get("development");return e?t[e]:t},getStageSetting:function(e){var t=this.get("stage");return e?t[e]:t},getProductionSetting:function(e){var t=this.get("production");return e?t[e]:t},getEnvironment:function(){var e,t=this.get("environment");for(e in t)for(var i=0;i<t[e].length;i++)if(new RegExp(t[e][i]).test(location.hostname))return e;return o.test(window.location.href)?"development":"production"}}),/(^|:)(\w)/g);function s(e,t,i){return i.toUpperCase()}function d(e,t,i){this.view=new this.View(_.extend(i,{el:e,model:new k.Model(t)})),this.view.triggerMethod("before:show",this),this.app.triggerMethod("component:loaded",this),this.view.enable(),this.view.triggerMethod("show",this),this.app.triggerMethod("image:lazyload",this),self.view.$el.imagesLoaded().done(function(){self.view.triggerMethod("image:load",this)}).fail(function(){self.view.triggerMethod("image:fail",this)}),e.data("module",self)}function c(e,t,i){this.view=new this.View(_.extend(i,{el:e,model:new k.Model(t)})),this.view.triggerMethod("before:show",this),this.app.triggerMethod("component:loaded",this),this.view.render(),this.view.triggerMethod("show",this),setTimeout(function(){self.app.triggerMethod("image:lazyload",self),self.view.$el.imagesLoaded().done(function(){self.view.triggerMethod("image:load",this)}).fail(function(){self.view.triggerMethod("image:fail",this)})},300),e.data("module",self)}function r(){}k.triggerMethod=function(e){var t,e=this["on"+e.replace(a,s)];return e&&_.isFunction(e)&&(t=e.apply(this,_.tail(arguments))),this.trigger&&_.isFunction(this.trigger)&&this.trigger.apply(this,arguments),t},k.triggerMethodOn=function(e,t){var i=_.tail(arguments,2);return(e.triggerMethod&&_.isFunction(e.triggerMethod)?e:k).triggerMethod.apply(e,[t].concat(i))},k.Module=function(e,t,i){this.moduleName=e,this.options=_.extend({},this.options,i),this.initialize=i.initialize||this.initialize,this.submodules={},this._setupInitializersAndFinalizers(),this.app=t,_.isFunction(this.initialize)&&this.initialize(e,t,this.options)},k.Module.extend=k.extend,_.extend(k.Module.prototype,n.Events,{startWithParent:!0,initialize:function(){},addInitializer:function(e){this._initializerCallbacks.add(e)},addFinalizer:function(e){this._finalizerCallbacks.add(e)},start:function(t){this._isInitialized||(_.each(this.submodules,function(e){e.startWithParent&&e.start(t)}),this.triggerMethod("before:start",t),this._initializerCallbacks.run(t,this),this._isInitialized=!0,this.triggerMethod("start",t))},stop:function(){this._isInitialized&&(this._isInitialized=!1,this.triggerMethod("before:stop"),_.each(this.submodules,function(e){e.stop()}),this._finalizerCallbacks.run(void 0,this),this._initializerCallbacks.reset(),this._finalizerCallbacks.reset(),this.triggerMethod("stop"))},addDefinition:function(e,t){this._runModuleDefinition(e,t)},getViewInstance:function(e){return void 0!==this.View?new this.View({className:this.moduleName,parent:this,app:this.app,el:$("<div>"),model:new k.Model(e)}):new k.View({el:$("<div>"),model:new k.Model(e)})},_runModuleDefinition:function(e,t){e&&(t=_.flatten([this,this.app,k,n.$,_,t]),e.apply(this,t))},_setupInitializersAndFinalizers:function(){this._initializerCallbacks=new k.Callbacks,this._finalizerCallbacks=new k.Callbacks},triggerMethod:k.triggerMethod,triggerMethodOn:k.triggerMethodOn}),_.extend(k.Module,{create:function(n,e,o){var a=n,s=l.call(arguments),e=(s.splice(0,3),e.split(".")),t=e.length,r=[];return r[t-1]=o,_.each(e,function(e,t){var i=a;a=this._getModule(i,e,n,o),this._addModuleDefinition(i,a,r[t],s)},this),a},_getModule:function(e,t,i,n){var o=_.extend({},n),n=this.getClass(n),a=e[t];return a||(a=new n(t,i,o),e[t]=a,e.submodules[t]=a),a},getClass:function(e){var t=k.Module;return e?e.prototype instanceof t?e:e.moduleClass||t:t},_addModuleDefinition:function(e,t,i,n){var o=this._getDefine(i),i=this._getStartWithParent(i,t);o&&t.addDefinition(o,n),this._addStartWithParent(e,t,i)},_getStartWithParent:function(e,t){var i;return _.isFunction(e)&&e.prototype instanceof k.Module?void 0===(i=t.constructor.prototype.startWithParent)||i:!_.isObject(e)||(void 0===(i=e.startWithParent)||i)},_getDefine:function(e){return!_.isFunction(e)||e.prototype instanceof k.Module?_.isObject(e)?e.define:null:e},_addStartWithParent:function(e,t,i){t.startWithParent=t.startWithParent&&i,t.startWithParent&&!t.startWithParentIsConfigured&&(t.startWithParentIsConfigured=!0,e.addInitializer(function(e){t.startWithParent&&t.start(e)}))},_loadComponents:function(r){"undefined"!==r.parent&&"UI"===r.parent.moduleName&&(r.addInitializer(function(){var s=this;$('[data-role="'+r.moduleName+'"]').each(function(e,t){var n=$(t),t=n.data("server"),i=$("#"+n.data("config")),o=n.data("path"),a=(_.extend(r.View.prototype,{className:r.moduleName,parent:r,app:r.app,isServerComponent:t,template:r.app.getTemplate(r.moduleName)}),{});if(void 0!==i&&i.length){console.log("%c Serverside component found : ","background: #428bca; color: #fff",r.moduleName);try{0===(i=i.html().trim()).indexOf("var config")&&(i=(i=i.split("var config = ")[1]).substring(0,i.length-1)),i=JSON.parse(i)}catch(e){i={}}d.apply(s,[n,i,a])}else void 0!==o&&"string"==typeof o?(console.log("%c Clientside component found : ","background: #428bca; color: #fff",r.moduleName),(t=new k.Model({url:o}).fetch()).done(function(e){_.isEmpty(e)&&(e={status:"Error",details:"No data found"},a={template:r.app.getTemplate("notfound"),_isEnabled:!0}),c.apply(s,[n,e,a])}),t.fail(function(e,t,i){c.apply(s,[n,{status:t,details:i},{template:r.app.getTemplate("notfound"),_isEnabled:!0}])})):(console.log("%c Serverside component found : ","background: #428bca; color: #fff",r.moduleName),d.apply(s,[n,{},a]))})}),r.addFinalizer(function(){$('[data-role="'+r.moduleName+'"]').each(function(){$(this).data("view").stop()})}))}}),k.Model=function(e){n.Model.apply(this,[e])},k.Model.extend=n.Model.extend,_.extend(k.Model.prototype,n.Model.prototype,{defaults:{hasShown:!1},initialize:function(e){_.extend(this,e),e&&e.url&&(this.urlRoot=e.url)}}),k.Collection=function(e){n.Collection.apply(this,[e])},k.Collection.extend=n.Collection.extend,_.extend(k.Collection.prototype,n.Collection.prototype,{model:k.Model,defaults:{hasShown:!1},initialize:function(e){_.extend(this,e),e&&e.url&&(this.urlRoot=e.url)}}),k.AbstractView=function(e){n.View.apply(this,[e])},n.Layout.configure({manage:!1,el:!1}),k.AbstractView.extend=n.View.extend,k.Layout=n.Layout,_.extend(k.AbstractView.prototype,n.View.prototype,{initialize:function(e){var t=_.extend(this,e),i=t.triggerMethod;t.app.on("matchMobile",i.bind(t,"matchMobile")).on("unmatchMobile",i.bind(t,"unmatchMobile")).on("matchTablet",i.bind(t,"matchTablet")).on("unmatchTablet",i.bind(t,"unmatchTablet")).on("matchDesktop",i.bind(t,"matchDesktop")).on("unmatchDesktop",i.bind(t,"unmatchDesktop")).on("window:resized",i.bind(t,"window:resized")),setTimeout(function(){i.call(t,t.app.getCurrentBreakpoint())},300),this._isEnabled=!1},clearStyles:function(e){e.attr("style","")},stop:function(){this.undelegateEvents(),this.remove()},show:function(){this.$el.fadeIn(0)},hide:function(e,t,i){this.$el.fadeOut(0,function(){"function"==typeof e&&e.apply(t,i||[])})},clean:function(){},triggerMethod:k.triggerMethod}),k.View=function(e){k.AbstractView.apply(this,[e])},k.View.extend=k.AbstractView.extend,_.extend(k.View.prototype,k.AbstractView.prototype,{events:{},initialize:function(e){k.AbstractView.prototype.initialize.apply(this,arguments),_.extend(this,e),_.bindAll(this,"render"),this.listenTo(this.model,"change",function(){this.triggerMethod("model:change",this.model.changed)}),this.$el.addClass(this.moduleName)},render:function(){this.$el.html(this.template(this.model.toJSON().data)),!1===this._isEnabled&&(this.enable(),this._isEnabled=!0)},enable:function(){},addEvent:function(e,t){"string"==typeof e?this.events[e]=t:_.isObject(e)&&_.extend(this.events,e)},removeEvent:function(e){this.events=_.omit(this.events,e)},updateSetting:function(e,t){"string"==typeof e?this.defaultSettings[e]=t:_.isObject(e)&&_.extend(this.defaultSettings,e)},getTemplate:function(){return this.app.getTemplate.apply(this.app,arguments)},getModelJSON:function(e,t){var i={},n=this.app.getValue("JSONDataKey"),o=this.model.get(n),a=this.moduleName.hyphenToCamelCase();if(void 0===t&&(t=this.model),void 0===e&&(e=!1),n&&!e&&o&&a?((t=o[a]).randomNumber=o.randomNumber,void 0!==this.extends?i[this.extends.moduleName.hyphenToCamelCase()]=t:i[a]=t):i=this.model.toJSON(),void 0===i)throw new Error("Model does not have data or does not have the key "+this.moduleName.hyphenToCamelCase());return i},getViewName:function(){return this.parent.moduleName},parse:function(e){function o(i,n){return _.each(i,function(e,t){e instanceof Object?i[t]=o(e,n+"["+t+"_attributes]"):i[t]=a.$('[name="'+n+"["+t+']"]').val()}),i}var a=this;this.model.attributes=o(this.model.attributes,e)},populate:function(e){function n(e,i){_.each(e,function(e,t){e instanceof Object?n(e,i+"["+t+"_attributes]"):_.isString(e)&&o.$('[name="'+i+"["+t+']"]').val(e)})}var o=this;n(this.model.attributes,e)}}),k.Callbacks=function(){this._deferred=k.Deferred(),this._callbacks=[]},_.extend(k.Callbacks.prototype,{add:function(t,i){var e=_.result(this._deferred,"promise");this._callbacks.push({cb:t,ctx:i}),e.then(function(e){t.call(i||e.context,e.options)})},run:function(e,t){this._deferred.resolve({options:e,context:t})},reset:function(){var e=this._callbacks;this._deferred=k.Deferred(),this._callbacks=[],_.each(e,function(e){this.add(e.cb,e.ctx)},this)}}),k.Application=function(){this._initCallbacks=new k.Callbacks,this.submodules={},this.components={},this.dependencies=[],this.initialize.apply(this,arguments)},k.Application.extend=k.extend,_.extend(k.Application.prototype,n.Events,{initialize:function(e){var t=this,i=$("body").data("config");k.currentInstance=this,i&&(e=_.extend(e,{url:i})),this.config=new k.Config(e,this);try{this.config.fetch({success:function(){t.triggerMethod("config:loaded",t)},error:function(){console.info("Configuration load error")}})}catch(e){setTimeout($.proxy(this.triggerMethod,this,"config:loaded",this),100)}this.on("config:loaded",function(){k.consolify(t.config.getDebugSetting()),t.addInitializer($.proxy(t._listenToWindowEvents,t)),t.addInitializer($.proxy(t._setUserAgent,t)),t.addInitializer($.proxy(t._listenToViewportEvents,t)),t.addInitializer(function(){"production"!==t.config.getEnvironment()&&t.config.get("$body").append('<p style="padding:1px;position:absolute;z-index:999;background-color:yellow;font-size:8px;margin:0;bottom:0;"> IEA Version : '+k.getVersion()+" | "+t.config.get("name")+" | "+t.config.getEnvironment()+"</p>")}),setTimeout($.proxy(t.triggerMethod,t,"application:ready",t),100)}),this.on("image:lazyload",$.proxy(this._handleLazyLoad,this))},addInitializer:function(e){this._initCallbacks.add(e)},start:function(e){var t=this;$(document).ready(function(){t.triggerMethod("before:start",e),t._initCallbacks.run(e,t),t.triggerMethod("start",e)})},addModule:function(e,t){var t=k.Module.getClass(t),i=Array.prototype.slice.call(arguments);return i.unshift(this),t.create.apply(t,i)},getValue:function(e){return e&&this.config?this.config.get(e):void 0},setValue:function(e,t){return!!e&&(this.config&&this.config.set(e,t),!0)},getTemplateFramework:function(){return this.getValue("templateFramework")},getTemplateExtension:function(){var e="";return e="Handlebars"===this.getValue("templateFramework")?"hbss":e},getTemplateNamespace:function(e){e=e.split("/"),e="dependencies"===e[2]?"d2-ui-platform"===e[3]?this.getValue("parentAppName"):e[3]:"lib"===e[0]?e[0]:e[1];return e},getTemplate:function(e,t){var i,n,o,a,s,r,l=this.getValue("defaultTemplateName")||e,d=this.config.getTemplateSetting();if(!e)return!1;if(this.getValue("appBasePath")){if(t&&"string"==typeof t&&t.indexOf(this.getValue("templatePath"))<0?(a=t.split("/")[0],n=d.path[a],o=(_.isString(n)||(n=n[t.split(/[\/ ]+/).pop().split(".")[0]]),this.getTemplateNamespace(n)),(a=n+t).indexOf(this.getTemplateExtension())<0&&(a=a+"."+this.getTemplateExtension())):(n=d.path[e])&&(o=(_.isString(n)||(n=n[e]),this.getTemplateNamespace(n))),a)i=a;else if(_.isArray(l))for(var c=0;c<l.length;c++){if(i=n+e+"/"+l[c]+"."+this.getTemplateExtension(),window[o]&&window[o][e]&&window[o][e][l[c]])return console.info("%c Component template exists : ","background: #00A61E; color: #fff",i),window[o][e][l[c]];console.info("%c Component template does not exists : ","background: #00A61E; color: #fff",i)}else i=n+e+"/"+l+"."+this.getTemplateExtension();if(window[o]&&_.has(window["unilever-iea"],t.split("/")[0]))return console.info("%c Component template exists : ","background: #00A61E; color: #fff",t),s=t.split("/")[0],d=t.split(".")[0].split("/"),r=window[o][s],d=d.slice(1),_.each(d,function(e){r=r[e]}),r;throw new Error("Template does not exists for "+s)}return!1},registerTemplate:function(e,t){var i=this.getValue("defaultTemplateName")||e,n="";return!!e&&(n=t?t+"."+this.getTemplateExtension():e+"/"+i+"."+this.getTemplateExtension(),this.config.attributes.FLCN_TEMPLATE&&(this.getValue("FLCN_TEMPLATE")[e]=n),!0)},getCurrentBreakpoint:function(){var e="matchDesktop";return this.getValue("isMobileBreakpoint")?e="matchMobile":this.getValue("isTabletBreakpoint")?e="matchTablet":this.getValue("isDesktopBreakpoint")&&(e="matchDesktop"),e},addDependencies:function(e){return _.isArray(e)?this.dependencies=this.dependencies.concat(e):this.dependencies.push(e),this.dependencies},loadDependencies:function(e,o){_.isFunction(e)&&(o=e,e=this.dependencies),function t(i,n){i.length?require([i.shift()],function(e){n.push(e),t(i,n)}):o.apply(null,n)}(e,[])},renderComponent:function(e,t,n){var o=this,e=$(e),i=e.data("role"),a="notfound",s=e.data("server")||!1,r=$("#"+e.data("config")),l=e.data("name"),d=e.data("path"),c="",u="",p=!1,h=this.config.getConventionSetting(),g=this.config.getMessageSetting("loadErrDefaultTitle"),f=this.config.getMessageSetting("loadErrDefaultMsg"),m=this.config.getMessageSetting("invalidJSONDefaultMsg"),l=l||t||i+"-"+Math.floor(1e3*Math.random()+1);if(this.UI&&this.UI[i]){for(var b,v=[this.UI[i]],y=this.UI[i],w="notfound";_.has(y,"extend");)v.push(y.extend),y=y.extend;for(v.push(k.View),b=v.length;0<b;b--)v[b-2]&&((w=d&&"string"==typeof d?this.getTemplate(v[b-2].moduleName):"notfound")&&(c=w),v[b-2]=v[b-1].extend(v[b-2]));c||(p=!0);var M,C=v[0],x={el:e,className:i,parent:o.UI[i],app:o,isServerComponent:s,template:c};if(r&&!d&&r.length){console.info("%c SSR component enabled : ","background: #428bca; color: #fff",i);try{0===(r=r.html().trim()).indexOf("var config")&&(r=(r=r.split("var config = ")[1]).substring(0,r.length-1)),r=JSON.parse(r)}catch(e){p=!0,r={status:e.message||g,details:e.stack||m}}(_.isEmpty(r)||p)&&(u=h.errorClass),o._showComponent.apply(o,[C,l,r,x,"enable",s,n,u])}else d&&"string"==typeof d?(console.info("%c CSR component rendered : ","background: #428bca; color: #fff",i,d),(t=new k.Model({url:d}).fetch()).done(function(e){if(_.isEmpty(e)||e.responseHeader&&e.responseHeader.status&&"200"!==e.responseHeader.status){try{M=e.responseHeader.messages[0]}catch(e){M=m}e={status:g,details:M},x.template=o.getTemplate(a),x._isEnabled=!0,p=!0,u=h.errorClass}else p&&(x.template=o.getTemplate(a),u=h.notFoundClass,e={status:g,details:f});o._showComponent.apply(o,[C,l,e,x,"render",s,n,u])}),t.fail(function(e,t,i){u=h.errorClass,x.template=o.getTemplate(a),x._isEnabled=!0,p=!0,o._showComponent.apply(o,[C,l,{status:t||g,details:i.stack||f},x,"render",s,n,u])})):(console.info("%c SSR component enabled : ","background: #428bca; color: #fff",i),o._showComponent.apply(o,[C,l,{},x,"enable",s,n,u]))}},renderAllComponent:function(){var i,n,o=this,a=$("[data-role]",$(document));return a.each(function(e,t){i=e===a.length-1,n=$(t).data("role")+"-"+(e+1),o.renderComponent.apply(o,[t,n,i])}),this},triggerMethod:k.triggerMethod,triggerMethodOn:k.triggerMethodOn,_loadComponentModules:function(){var e=this;this.loadDependencies(function(){e.triggerMethod("dependencies:loaded",e)})},_showComponent:function(e,t,i,n,o,a,s,r){var l=this.config.getConventionSetting("notFoundClass"),d=this.config.getSetting("missingTemplateHandler"),c=this.config.getSetting("errorHandler");i.data&&i.data.randomNumber&&(t=n.className+"-"+i.data.randomNumber),n.model=new k.Model(i),this.components[t]=new e(n),this.triggerMethodOn(this.components[t],"before:show"),i.data&&i.data.viewType&&"noView"===i.data.viewType||this.components[t][o](),r&&(r===l?this.triggerMethod(d,{type:d,response:i,compId:t,options:n}):this.triggerMethod(c,{type:c,response:i,compId:t,options:n}),this.components[t].$el.addClass(r)),this.triggerMethodOn(this.components[t],"show"),this.triggerMethod("component:show",this.components[t]),s&&this.triggerMethod("components:loaded",this.components[t]),this.triggerMethod("image:lazyload",this.components[t]),this.components[t].$el.data("view",this.components[t]).prop("id",t)},_listenToViewportEvents:function(){var e=this;this.getValue("isIE8")?(this.setValue("isMobileBreakpoint",!1),this.setValue("isTabletBreakpoint",!1),this.setValue("isDesktopBreakpoint",!0),e.triggerMethod("matchDesktop")):enquire.register(this.getValue("breakpoints").mobile.media,{setup:function(){},match:function(){e.setValue("isMobileBreakpoint",!0),e.setValue("isTabletBreakpoint",!1),e.setValue("isDesktopBreakpoint",!1),e.triggerMethod("matchMobile")},unmatch:function(){e.setValue("isMobileBreakpoint",!1),e.triggerMethod("unMatchMobile")}}).register(this.getValue("breakpoints").tablet.media,{setup:function(){},match:function(){e.setValue("isMobileBreakpoint",!1),e.setValue("isTabletBreakpoint",!0),e.setValue("isDesktopBreakpoint",!1),e.triggerMethod("matchTablet")},unmatch:function(){e.setValue("isTabletBreakpoint",!1),e.triggerMethod("unmatchTablet")}}).register(this.getValue("breakpoints").desktop.media,{setup:function(){},match:function(){e.setValue("isMobileBreakpoint",!1),e.setValue("isTabletBreakpoint",!1),e.setValue("isDesktopBreakpoint",!0),e.triggerMethod("matchDesktop")},unmatch:function(){e.setValue("isDesktopBreakpoint",!1),e.triggerMethod("unmatchDesktop")}},!0)},_listenToWindowEvents:function(){var n=this,o=$(window),a=o.width(),s=o.height();o.on("resize orientationchange",_.debounce(function(e){var t,i=o.width();i===a&&(t=o.height())===s||(a=i,s=t,n._handleLazyLoad(n),n.triggerMethod("window:resized",e))},500)),o.on("scroll",_.debounce(function(e){n.triggerMethod("window:scrolled",e),n.triggerMethod("image:lazyload",n)},100)),n.triggerMethod("window:resized")},_handleLazyLoad:function(o){"undefined"!=typeof Picturefill&&Picturefill(),picturefill({reevaluate:!0}),o instanceof k.View&&(o.loadedImageCount=0,$.fn.imagesLoaded&&o.$el.imagesLoaded().progress(function(e,t){var i=$(t.img),n=i.parent();n.removeClass("is-loading").addClass("loaded"),k.triggerMethodOn(i,"load"),t.isLoaded?n.removeClass("is-loading").addClass("loaded"):(n.addClass("is-broken"),k.triggerMethodOn(i,"fail")),o.loadedImageCount++}).always(function(){o.triggerMethod("image:loaded"),$("picture.loaded",o.$el).removeClass("is-broken")}))},_setUserAgent:function(){var e=k.checkNonConditionalIEVersion(),t=null!==navigator.userAgent.match(/iPad/i);this.setValue("isIE",e.isIE),this.setValue("IEVersion",e.version),e.isIE&&10<=e.version&&$("body").addClass("ie ie"+e.version),t&&$("body").addClass("iPad")},_registerModules:k.registerModules}),k.Analytics=function(e){this.options=e,this._initCallbacks=new k.Callbacks,_.extend(this,e),this.initialize.apply(this,arguments)},k.Analytics.extend=k.extend,_.extend(k.Analytics.prototype,{initialize:r,addInitializer:function(e){this._initCallbacks.add(e)},start:function(e){this._initCallbacks.run(e,this)},page:r,component:r,link:r,video:r,custom:r,_clearVariables:r}),k.Model.extend=k.Collection.extend=k.View.extend=k.AbstractView.extend=function(e,t){e=f(this,e,t);return e.extend=this.extend,e};function u(i,n,o){function e(){var e,t=this._super;this._super=i[n]||h(n);try{e=o.apply(this,arguments)}finally{this._super=t}return e}for(var t in o)e[t]=o[t],delete o[t];return e}function p(){}var h=function(e){throw"Super does not implement this method: "+e},g=/\b_super\b/,f=function(e,t,i){var n=e.prototype,o=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return e.apply(this,arguments)};if(_.extend(o,e,i),p.prototype=n,o.prototype=new p,t)for(var a in _.extend(o.prototype,t),t)"function"==typeof t[a]&&g.test(t[a])&&(o.prototype[a]=u(n,a,t[a]));return i&&_.extend(o,i),(o.prototype.constructor=o).__super__=n,o};return k});