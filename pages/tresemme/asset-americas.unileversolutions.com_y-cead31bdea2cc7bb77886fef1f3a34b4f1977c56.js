!function(t,e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e(require("jquery")):e(t.jQuery)}(this,function(d){var p=function(){"use strict";return{isMsie:function(){return!!/(msie|trident)/i.test(navigator.userAgent)&&navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]},isBlankString:function(t){return!t||/^\s*$/.test(t)},escapeRegExChars:function(t){return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(t){return"string"==typeof t},isNumber:function(t){return"number"==typeof t},isArray:d.isArray,isFunction:d.isFunction,isObject:d.isPlainObject,isUndefined:function(t){return void 0===t},isElement:function(t){return!(!t||1!==t.nodeType)},isJQuery:function(t){return t instanceof d},toStr:function(t){return p.isUndefined(t)||null===t?"":t+""},bind:d.proxy,each:function(t,n){d.each(t,function(t,e){return n(e,t)})},map:d.map,filter:d.grep,every:function(n,i){var s=!0;return n?(d.each(n,function(t,e){if(!(s=i.call(null,e,t,n)))return!1}),!!s):s},some:function(n,i){var s=!1;return n?(d.each(n,function(t,e){if(s=i.call(null,e,t,n))return!1}),!!s):s},mixin:d.extend,identity:function(t){return t},clone:function(t){return d.extend(!0,{},t)},getIdGenerator:function(){var t=0;return function(){return t++}},templatify:function(t){return d.isFunction(t)?t:function(){return String(t)}},defer:function(t){setTimeout(t,0)},debounce:function(s,r,a){var o,u;return function(){var t=this,e=arguments,n=function(){o=null,a||(u=s.apply(t,e))},i=a&&!o;return clearTimeout(o),o=setTimeout(n,r),u=i?s.apply(t,e):u}},throttle:function(n,i){var s,r,a,o,u=0,c=function(){u=new Date,a=null,o=n.apply(s,r)};return function(){var t=new Date,e=i-(t-u);return s=this,r=arguments,e<=0?(clearTimeout(a),a=null,u=t,o=n.apply(s,r)):a=a||setTimeout(c,e),o}},stringify:function(t){return p.isString(t)?t:JSON.stringify(t)},noop:function(){}}}(),n=function(){"use strict";var n={wrapper:"twitter-typeahead",input:"tt-input",hint:"tt-hint",menu:"tt-menu",dataset:"tt-dataset",suggestion:"tt-suggestion",selectable:"tt-selectable",empty:"tt-empty",open:"tt-open",cursor:"tt-cursor",highlight:"tt-highlight"};return function(t){var e;return t=p.mixin({},n,t),{css:(e={css:function(){var t={wrapper:{position:"relative",display:"inline-block"},hint:{position:"absolute",top:"0",left:"0",borderColor:"transparent",boxShadow:"none",opacity:"1"},input:{position:"relative",verticalAlign:"top",backgroundColor:"transparent"},inputWithNoHint:{position:"relative",verticalAlign:"top"},menu:{position:"absolute",top:"100%",left:"0",zIndex:"100",display:"none"},ltr:{left:"0",right:"auto"},rtl:{left:"auto",right:" 0"}};p.isMsie()&&p.mixin(t.input,{backgroundImage:"url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"});return t}(),classes:t,html:function(t){return{wrapper:'<span class="'+t.wrapper+'"></span>',menu:'<div class="'+t.menu+'"></div>'}}(t),selectors:function(t){var n={};return p.each(t,function(t,e){n[e]="."+t}),n}(t)}).css,html:e.html,classes:e.classes,selectors:e.selectors,mixin:function(t){p.mixin(t,e)}}}}(),l=function(){"use strict";var e;function t(t){t&&t.el||d.error("EventBus initialized without el"),this.$el=d(t.el)}return e={render:"rendered",cursorchange:"cursorchanged",select:"selected",autocomplete:"autocompleted"},p.mixin(t.prototype,{_trigger:function(t,e){t=d.Event("typeahead:"+t);return this.$el.trigger.call(this.$el,t,e||[]),t},before:function(t){var e=[].slice.call(arguments,1);return this._trigger("before"+t,e).isDefaultPrevented()},trigger:function(t){this._trigger(t,[].slice.call(arguments,1)),(t=e[t])&&this._trigger(t,[].slice.call(arguments,1))}}),t}(),e=function(){"use strict";var o=/\s+/,r=function(){var t;t=window.setImmediate?function(t){setImmediate(function(){t()})}:function(t){setTimeout(function(){t()},0)};return t}();return{onSync:function(t,e,n){return i.call(this,"sync",t,e,n)},onAsync:function(t,e,n){return i.call(this,"async",t,e,n)},off:function(t){var e;if(!this._callbacks)return this;t=t.split(o);for(;e=t.shift();)delete this._callbacks[e];return this},trigger:function(t){var e,n,i,s;if(!this._callbacks)return this;t=t.split(o),n=[].slice.call(arguments,1);for(;(s=t.shift())&&(e=this._callbacks[s]);)i=a(e.sync,this,[s].concat(n)),s=a(e.async,this,[s].concat(n)),i()&&r(s);return this}};function i(t,e,n,i){var s,r,a;if(!n)return this;for(e=e.split(o),n=i?(a=i,(r=n).bind?r.bind(a):function(){r.apply(a,[].slice.call(arguments,0))}):n,this._callbacks=this._callbacks||{};s=e.shift();)this._callbacks[s]=this._callbacks[s]||{sync:[],async:[]},this._callbacks[s][t].push(n);return this}function a(i,s,r){return function(){for(var t,e=0,n=i.length;!t&&e<n;e+=1)t=!1===i[e].apply(s,r);return!t}}}(),a=function(a){"use strict";var t={node:null,pattern:null,tagName:"strong",className:null,wordsOnly:!1,caseSensitive:!1,diacriticInsensitive:!1},e={A:"[AaªÀ-Åà-åĀ-ąǍǎȀ-ȃȦȧᴬᵃḀḁẚẠ-ảₐ℀℁℻⒜Ⓐⓐ㍱-㍴㎀-㎄㎈㎉㎩-㎯㏂㏊㏟㏿Ａａ]",B:"[BbᴮᵇḂ-ḇℬ⒝Ⓑⓑ㍴㎅-㎇㏃㏈㏔㏝Ｂｂ]",C:"[CcÇçĆ-čᶜ℀ℂ℃℅℆ℭⅭⅽ⒞Ⓒⓒ㍶㎈㎉㎝㎠㎤㏄-㏇Ｃｃ]",D:"[DdĎďǄ-ǆǱ-ǳᴰᵈḊ-ḓⅅⅆⅮⅾ⒟Ⓓⓓ㋏㍲㍷-㍹㎗㎭-㎯㏅㏈Ｄｄ]",E:"[EeÈ-Ëè-ëĒ-ěȄ-ȇȨȩᴱᵉḘ-ḛẸ-ẽₑ℡ℯℰⅇ⒠Ⓔⓔ㉐㋍㋎Ｅｅ]",F:"[FfᶠḞḟ℉ℱ℻⒡Ⓕⓕ㎊-㎌㎙ﬀ-ﬄＦｆ]",G:"[GgĜ-ģǦǧǴǵᴳᵍḠḡℊ⒢Ⓖⓖ㋌㋍㎇㎍-㎏㎓㎬㏆㏉㏒㏿Ｇｇ]",H:"[HhĤĥȞȟʰᴴḢ-ḫẖℋ-ℎ⒣Ⓗⓗ㋌㍱㎐-㎔㏊㏋㏗Ｈｈ]",I:"[IiÌ-Ïì-ïĨ-İĲĳǏǐȈ-ȋᴵᵢḬḭỈ-ịⁱℐℑℹⅈⅠ-ⅣⅥ-ⅨⅪⅫⅰ-ⅳⅵ-ⅸⅺⅻ⒤Ⓘⓘ㍺㏌㏕ﬁﬃＩｉ]",J:"[JjĲ-ĵǇ-ǌǰʲᴶⅉ⒥ⒿⓙⱼＪｊ]",K:"[KkĶķǨǩᴷᵏḰ-ḵK⒦Ⓚⓚ㎄㎅㎉㎏㎑㎘㎞㎢㎦㎪㎸㎾㏀㏆㏍-㏏Ｋｋ]",L:"[LlĹ-ŀǇ-ǉˡᴸḶḷḺ-ḽℒℓ℡Ⅼⅼ⒧Ⓛⓛ㋏㎈㎉㏐-㏓㏕㏖㏿ﬂﬄＬｌ]",M:"[MmᴹᵐḾ-ṃ℠™ℳⅯⅿ⒨Ⓜⓜ㍷-㍹㎃㎆㎎㎒㎖㎙-㎨㎫㎳㎷㎹㎽㎿㏁㏂㏎㏐㏔-㏖㏘㏙㏞㏟Ｍｍ]",N:"[NnÑñŃ-ŉǊ-ǌǸǹᴺṄ-ṋⁿℕ№⒩Ⓝⓝ㎁㎋㎚㎱㎵㎻㏌㏑Ｎｎ]",O:"[OoºÒ-Öò-öŌ-őƠơǑǒǪǫȌ-ȏȮȯᴼᵒỌ-ỏₒ℅№ℴ⒪Ⓞⓞ㍵㏇㏒㏖Ｏｏ]",P:"[PpᴾᵖṔ-ṗℙ⒫Ⓟⓟ㉐㍱㍶㎀㎊㎩-㎬㎰㎴㎺㏋㏗-㏚Ｐｐ]",Q:"[Qqℚ⒬Ⓠⓠ㏃Ｑｑ]",R:"[RrŔ-řȐ-ȓʳᴿᵣṘ-ṛṞṟ₨ℛ-ℝ⒭Ⓡⓡ㋍㍴㎭-㎯㏚㏛Ｒｒ]",S:"[SsŚ-šſȘșˢṠ-ṣ₨℁℠⒮Ⓢⓢ㎧㎨㎮-㎳㏛㏜ﬆＳｓ]",T:"[TtŢ-ťȚțᵀᵗṪ-ṱẗ℡™⒯Ⓣⓣ㉐㋏㎔㏏ﬅﬆＴｔ]",U:"[UuÙ-Üù-üŨ-ųƯưǓǔȔ-ȗᵁᵘᵤṲ-ṷỤ-ủ℆⒰Ⓤⓤ㍳㍺Ｕｕ]",V:"[VvᵛᵥṼ-ṿⅣ-Ⅷⅳ-ⅷ⒱Ⓥⓥⱽ㋎㍵㎴-㎹㏜㏞Ｖｖ]",W:"[WwŴŵʷᵂẀ-ẉẘ⒲Ⓦⓦ㎺-㎿㏝Ｗｗ]",X:"[XxˣẊ-ẍₓ℻Ⅸ-Ⅻⅸ-ⅻ⒳Ⓧⓧ㏓Ｘｘ]",Y:"[YyÝýÿŶ-ŸȲȳʸẎẏẙỲ-ỹ⒴Ⓨⓨ㏉Ｙｙ]",Z:"[ZzŹ-žǱ-ǳᶻẐ-ẕℤℨ⒵Ⓩⓩ㎐-㎔Ｚｚ]"};return function(s){var r;(s=p.mixin({},t,s)).node&&s.pattern&&(s.pattern=p.isArray(s.pattern)?s.pattern:[s.pattern],r=function(t,e,n,i){for(var s=[],r=0,a=t.length;r<a;r++){var o=p.escapeRegExChars(t[r]);i&&(o=o.replace(/\S/g,u)),s.push(o)}return n=n?"\\b("+s.join("|")+")\\b":"("+s.join("|")+")",e?new RegExp(n):new RegExp(n,"i")}(s.pattern,s.caseSensitive,s.wordsOnly,s.diacriticInsensitive),function t(e,n){var i;for(var s=0;s<e.childNodes.length;s++)3===(i=e.childNodes[s]).nodeType?s+=n(i)?1:0:t(i,n)}(s.node,function(t){var e,n,i;(e=r.exec(t.data))&&(i=a.createElement(s.tagName),s.className&&(i.className=s.className),(n=t.splitText(e.index)).splitText(e[0].length),i.appendChild(n.cloneNode(!0)),t.parentNode.replaceChild(i,n));return!!e}))};function u(t){return e[t.toUpperCase()]||t}}(window.document),f=function(){"use strict";var r;function s(t,e){(t=t||{}).input||d.error("input is missing"),e.mixin(this),this.$hint=d(t.hint),this.$input=d(t.input),this.query=this.$input.val(),this.queryWhenFocused=this.hasFocus()?this.query:null,this.$overflowHelper=(e=this.$input,d('<pre aria-hidden="true"></pre>').css({position:"absolute",visibility:"hidden",whiteSpace:"pre",fontFamily:e.css("font-family"),fontSize:e.css("font-size"),fontStyle:e.css("font-style"),fontVariant:e.css("font-variant"),fontWeight:e.css("font-weight"),wordSpacing:e.css("word-spacing"),letterSpacing:e.css("letter-spacing"),textIndent:e.css("text-indent"),textRendering:e.css("text-rendering"),textTransform:e.css("text-transform")}).insertAfter(e)),this._checkLanguageDirection(),0===this.$hint.length&&(this.setHint=this.getHint=this.clearHint=this.clearHintIfInvalid=p.noop)}return r={9:"tab",27:"esc",37:"left",39:"right",13:"enter",38:"up",40:"down"},s.normalizeQuery=function(t){return p.toStr(t).replace(/^\s*/g,"").replace(/\s{2,}/g," ")},p.mixin(s.prototype,e,{_onBlur:function(){this.resetInputValue(),this.trigger("blurred")},_onFocus:function(){this.queryWhenFocused=this.query,this.trigger("focused")},_onKeydown:function(t){var e=r[t.which||t.keyCode];this._managePreventDefault(e,t),e&&this._shouldTrigger(e,t)&&this.trigger(e+"Keyed",t)},_onInput:function(){this._setQuery(this.getInputValue()),this.clearHintIfInvalid(),this._checkLanguageDirection()},_managePreventDefault:function(t,e){var n;switch(t){case"up":case"down":n=!i(e);break;default:n=!1}n&&e.preventDefault()},_shouldTrigger:function(t,e){t="tab"!==t||!i(e);return t},_checkLanguageDirection:function(){var t=(this.$input.css("direction")||"ltr").toLowerCase();this.dir!==t&&(this.dir=t,this.$hint.attr("dir",t),this.trigger("langDirChanged",t))},_setQuery:function(t,e){var n,i;n=t,i=this.query,i=(n=s.normalizeQuery(n)===s.normalizeQuery(i))&&this.query.length!==t.length,this.query=t,e||n?!e&&i&&this.trigger("whitespaceChanged",this.query):this.trigger("queryChanged",this.query)},bind:function(){var e=this,t=p.bind(this._onBlur,this),n=p.bind(this._onFocus,this),i=p.bind(this._onKeydown,this),s=p.bind(this._onInput,this);return this.$input.on("blur.tt",t).on("focus.tt",n).on("keydown.tt",i),!p.isMsie()||9<p.isMsie()?this.$input.on("input.tt",s):this.$input.on("keydown.tt keypress.tt cut.tt paste.tt",function(t){r[t.which||t.keyCode]||p.defer(p.bind(e._onInput,e,t))}),this},focus:function(){this.$input.focus()},blur:function(){this.$input.blur()},getLangDir:function(){return this.dir},getQuery:function(){return this.query||""},setQuery:function(t,e){this.setInputValue(t),this._setQuery(t,e)},hasQueryChangedSinceLastFocus:function(){return this.query!==this.queryWhenFocused},getInputValue:function(){return this.$input.val()},setInputValue:function(t){this.$input.val(t),this.clearHintIfInvalid(),this._checkLanguageDirection()},resetInputValue:function(){this.setInputValue(this.query)},getHint:function(){return this.$hint.val()},setHint:function(t){this.$hint.val(t)},clearHint:function(){this.setHint("")},clearHintIfInvalid:function(){var t=this.getInputValue(),e=this.getHint(),e=t!==e&&0===e.indexOf(t);""!==t&&e&&!this.hasOverflow()||this.clearHint()},hasFocus:function(){return this.$input.is(":focus")},hasOverflow:function(){var t=this.$input.width()-2;return this.$overflowHelper.text(this.getInputValue()),this.$overflowHelper.width()>=t},isCursorAtEnd:function(){var t=this.$input.val().length,e=this.$input[0].selectionStart;return p.isNumber(e)?e===t:!document.selection||((e=document.selection.createRange()).moveStart("character",-t),t===e.text.length)},destroy:function(){this.$hint.off(".tt"),this.$input.off(".tt"),this.$overflowHelper.remove(),this.$hint=this.$input=this.$overflowHelper=d("<div>")}}),s;function i(t){return t.altKey||t.ctrlKey||t.metaKey||t.shiftKey}}(),s=function(){"use strict";var r,s;function t(t,e){var n,i;(t=t||{}).templates=t.templates||{},t.templates.notFound=t.templates.notFound||t.templates.empty,t.source||d.error("missing source"),t.node||d.error("missing node"),t.name&&!/^[_a-zA-Z0-9-]+$/.test(t.name)&&d.error("invalid dataset name: "+t.name),e.mixin(this),this.highlight=!!t.highlight,this.name=p.toStr(t.name||s()),this.limit=t.limit||5,this.displayFn=(n=(n=t.display||t.displayKey)||p.stringify,p.isFunction(n)?n:function(t){return t[n]}),this.templates=(e=t.templates,i=this.displayFn,{notFound:e.notFound&&p.templatify(e.notFound),pending:e.pending&&p.templatify(e.pending),header:e.header&&p.templatify(e.header),footer:e.footer&&p.templatify(e.footer),suggestion:e.suggestion||function(t){return d("<div>").text(i(t))}}),this.source=t.source.__ttAdapter?t.source.__ttAdapter():t.source,this.async=p.isUndefined(t.async)?2<this.source.length:!!t.async,this._resetLastSuggestion(),this.$el=d(t.node).addClass(this.classes.dataset).addClass(this.classes.dataset+"-"+this.name)}return r={dataset:"tt-selectable-dataset",val:"tt-selectable-display",obj:"tt-selectable-object"},s=p.getIdGenerator(),t.extractData=function(t){t=d(t);return t.data(r.obj)?{dataset:t.data(r.dataset)||"",val:t.data(r.val)||"",obj:t.data(r.obj)||null}:null},p.mixin(t.prototype,e,{_overwrite:function(t,e){(e=e||[]).length?this._renderSuggestions(t,e):this.async&&this.templates.pending?this._renderPending(t):!this.async&&this.templates.notFound?this._renderNotFound(t):this._empty(),this.trigger("rendered",e,!1,this.name)},_append:function(t,e){(e=e||[]).length&&this.$lastSuggestion.length?this._appendSuggestions(t,e):e.length?this._renderSuggestions(t,e):!this.$lastSuggestion.length&&this.templates.notFound&&this._renderNotFound(t),this.trigger("rendered",e,!0,this.name)},_renderSuggestions:function(t,e){var n=this._getSuggestionsFragment(t,e);this.$lastSuggestion=n.children().last(),this.$el.html(n).prepend(this._getHeader(t,e)).append(this._getFooter(t,e))},_appendSuggestions:function(t,e){t=this._getSuggestionsFragment(t,e),e=t.children().last();this.$lastSuggestion.after(t),this.$lastSuggestion=e},_renderPending:function(t){var e=this.templates.pending;this._resetLastSuggestion(),e&&this.$el.html(e({query:t,dataset:this.name}))},_renderNotFound:function(t){var e=this.templates.notFound;this._resetLastSuggestion(),e&&this.$el.html(e({query:t,dataset:this.name}))},_empty:function(){this.$el.empty(),this._resetLastSuggestion()},_getSuggestionsFragment:function(n,t){var i=this,s=document.createDocumentFragment();return p.each(t,function(t){var e=i._injectQuery(n,t),e=d(i.templates.suggestion(e)).data(r.dataset,i.name).data(r.obj,t).data(r.val,i.displayFn(t)).addClass(i.classes.suggestion+" "+i.classes.selectable);s.appendChild(e[0])}),this.highlight&&a({className:this.classes.highlight,node:s,pattern:n}),d(s)},_getFooter:function(t,e){return this.templates.footer?this.templates.footer({query:t,suggestions:e,dataset:this.name}):null},_getHeader:function(t,e){return this.templates.header?this.templates.header({query:t,suggestions:e,dataset:this.name}):null},_resetLastSuggestion:function(){this.$lastSuggestion=d()},_injectQuery:function(t,e){return p.isObject(e)?p.mixin({_query:t},e):e},update:function(n){var i=this,s=!1,e=!1,r=0;function t(t){e||(e=!0,t=(t||[]).slice(0,i.limit),r=t.length,i._overwrite(n,t),r<i.limit&&i.async&&i.trigger("asyncRequested",n,i.name))}this.cancel(),this.cancel=function(){s=!0,i.cancel=d.noop,i.async&&i.trigger("asyncCanceled",n,i.name)},this.source(n,t,function(t){{var e;t=t||[],!s&&r<i.limit&&(i.cancel=d.noop,e=Math.abs(r-i.limit),r+=e,i._append(n,t.slice(0,e)),i.async&&i.trigger("asyncReceived",n,i.name))}}),e||t([])},cancel:d.noop,clear:function(){this._empty(),this.cancel(),this.trigger("cleared")},isEmpty:function(){return this.$el.is(":empty")},destroy:function(){this.$el=d("<div>")}}),t}(),g=function(){"use strict";function t(t,n){var i=this;(t=t||{}).node||d.error("node is required"),n.mixin(this),this.$node=d(t.node),this.query=null,this.datasets=p.map(t.datasets,function(t){var e=i.$node.find(t.node).first();return t.node=e.length?e:d("<div>").appendTo(i.$node),new s(t,n)})}return p.mixin(t.prototype,e,{_onSelectableClick:function(t){this.trigger("selectableClicked",d(t.currentTarget))},_onRendered:function(t,e,n,i){this.$node.toggleClass(this.classes.empty,this._allDatasetsEmpty()),this.trigger("datasetRendered",e,n,i)},_onCleared:function(){this.$node.toggleClass(this.classes.empty,this._allDatasetsEmpty()),this.trigger("datasetCleared")},_propagate:function(){this.trigger.apply(this,arguments)},_allDatasetsEmpty:function(){return p.every(this.datasets,function(t){return t.isEmpty()})},_getSelectables:function(){return this.$node.find(this.selectors.selectable)},_removeCursor:function(){var t=this.getActiveSelectable();t&&t.removeClass(this.classes.cursor)},_ensureVisible:function(t){var e=t.position().top,t=e+t.outerHeight(!0),n=this.$node.scrollTop(),i=this.$node.height()+parseInt(this.$node.css("paddingTop"),10)+parseInt(this.$node.css("paddingBottom"),10);e<0?this.$node.scrollTop(n+e):i<t&&this.$node.scrollTop(n+(t-i))},bind:function(){var e=this,t=p.bind(this._onSelectableClick,this);return this.$node.on("click.tt",this.selectors.selectable,t),this.$node.on("mouseover",this.selectors.selectable,function(){e.setCursor(d(this))}),this.$node.on("mouseleave",function(){e._removeCursor()}),p.each(this.datasets,function(t){t.onSync("asyncRequested",e._propagate,e).onSync("asyncCanceled",e._propagate,e).onSync("asyncReceived",e._propagate,e).onSync("rendered",e._onRendered,e).onSync("cleared",e._onCleared,e)}),this},isOpen:function(){return this.$node.hasClass(this.classes.open)},open:function(){this.$node.scrollTop(0),this.$node.addClass(this.classes.open)},close:function(){this.$node.removeClass(this.classes.open),this._removeCursor()},setLanguageDirection:function(t){this.$node.attr("dir",t)},selectableRelativeToCursor:function(t){var e=this.getActiveSelectable(),n=this._getSelectables(),e=(e?n.index(e):-1)+t;return-1===(e=(e=(e+1)%(n.length+1)-1)<-1?n.length-1:e)?null:n.eq(e)},setCursor:function(t){this._removeCursor(),(t=t&&t.first())&&(t.addClass(this.classes.cursor),this._ensureVisible(t))},getSelectableData:function(t){return t&&t.length?s.extractData(t):null},getActiveSelectable:function(){var t=this._getSelectables().filter(this.selectors.cursor).first();return t.length?t:null},getTopSelectable:function(){var t=this._getSelectables().first();return t.length?t:null},update:function(e){var t=e!==this.query;return t&&(this.query=e,p.each(this.datasets,function(t){t.update(e)})),t},empty:function(){p.each(this.datasets,function(t){t.clear()}),this.query=null,this.$node.addClass(this.classes.empty)},destroy:function(){this.$node.off(".tt"),this.$node=d("<div>"),p.each(this.datasets,function(t){t.destroy()})}}),t}(),y=function(){"use strict";var e=g.prototype;function t(){g.apply(this,[].slice.call(arguments,0))}return p.mixin(t.prototype,g.prototype,{open:function(){return this._allDatasetsEmpty()||this._show(),e.open.apply(this,[].slice.call(arguments,0))},close:function(){return this._hide(),e.close.apply(this,[].slice.call(arguments,0))},_onRendered:function(){return this._allDatasetsEmpty()?this._hide():this.isOpen()&&this._show(),e._onRendered.apply(this,[].slice.call(arguments,0))},_onCleared:function(){return this._allDatasetsEmpty()?this._hide():this.isOpen()&&this._show(),e._onCleared.apply(this,[].slice.call(arguments,0))},setLanguageDirection:function(t){return this.$node.css("ltr"===t?this.css.ltr:this.css.rtl),e.setLanguageDirection.apply(this,[].slice.call(arguments,0))},_hide:function(){this.$node.hide()},_show:function(){this.$node.css("display","block")}}),t}(),m=function(){"use strict";function t(t,e){var n,i,s,r,a,o,u,c,h;(t=t||{}).input||d.error("missing input"),t.menu||d.error("missing menu"),t.eventBus||d.error("missing event bus"),e.mixin(this),this.eventBus=t.eventBus,this.minLength=p.isNumber(t.minLength)?t.minLength:1,this.input=t.input,this.menu=t.menu,this.enabled=!0,this.active=!1,this.input.hasFocus()&&this.activate(),this.dir=this.input.getLangDir(),this._hacks(),this.menu.bind().onSync("selectableClicked",this._onSelectableClicked,this).onSync("asyncRequested",this._onAsyncRequested,this).onSync("asyncCanceled",this._onAsyncCanceled,this).onSync("asyncReceived",this._onAsyncReceived,this).onSync("datasetRendered",this._onDatasetRendered,this).onSync("datasetCleared",this._onDatasetCleared,this),e=l(this,"activate","open","_onFocused"),t=l(this,"deactivate","_onBlurred"),n=l(this,"isActive","isOpen","_onEnterKeyed"),i=l(this,"isActive","isOpen","_onTabKeyed"),s=l(this,"isActive","_onEscKeyed"),r=l(this,"isActive","open","_onUpKeyed"),a=l(this,"isActive","open","_onDownKeyed"),o=l(this,"isActive","isOpen","_onLeftKeyed"),u=l(this,"isActive","isOpen","_onRightKeyed"),c=l(this,"_openIfActive","_onQueryChanged"),h=l(this,"_openIfActive","_onWhitespaceChanged"),this.input.bind().onSync("focused",e,this).onSync("blurred",t,this).onSync("enterKeyed",n,this).onSync("tabKeyed",i,this).onSync("escKeyed",s,this).onSync("upKeyed",r,this).onSync("downKeyed",a,this).onSync("leftKeyed",o,this).onSync("rightKeyed",u,this).onSync("queryChanged",c,this).onSync("whitespaceChanged",h,this).onSync("langDirChanged",this._onLangDirChanged,this)}return p.mixin(t.prototype,{_hacks:function(){var i=this.input.$input||d("<div>"),s=this.menu.$node||d("<div>");i.on("blur.tt",function(t){var e=document.activeElement,n=s.is(e),e=0<s.has(e).length;p.isMsie()&&(n||e)&&(t.preventDefault(),t.stopImmediatePropagation(),p.defer(function(){i.focus()}))}),s.on("mousedown.tt",function(t){t.preventDefault()})},_onSelectableClicked:function(t,e){this.select(e)},_onDatasetCleared:function(){this._updateHint()},_onDatasetRendered:function(t,e,n,i){this._updateHint(),this.eventBus.trigger("render",e,n,i)},_onAsyncRequested:function(t,e,n){this.eventBus.trigger("asyncrequest",n,e)},_onAsyncCanceled:function(t,e,n){this.eventBus.trigger("asynccancel",n,e)},_onAsyncReceived:function(t,e,n){this.eventBus.trigger("asyncreceive",n,e)},_onFocused:function(){this._minLengthMet()&&this.menu.update(this.input.getQuery())},_onBlurred:function(){this.input.hasQueryChangedSinceLastFocus()&&this.eventBus.trigger("change",this.input.getQuery())},_onEnterKeyed:function(t,e){var n;(n=this.menu.getActiveSelectable())&&this.select(n)&&(e.preventDefault(),e.stopPropagation())},_onTabKeyed:function(t,e){var n;(n=this.menu.getActiveSelectable())?this.select(n)&&e.preventDefault():(n=this.menu.getTopSelectable())&&this.autocomplete(n)&&e.preventDefault()},_onEscKeyed:function(){this.close()},_onUpKeyed:function(){this.moveCursor(-1)},_onDownKeyed:function(){this.moveCursor(1)},_onLeftKeyed:function(){"rtl"===this.dir&&this.input.isCursorAtEnd()&&this.autocomplete(this.menu.getActiveSelectable()||this.menu.getTopSelectable())},_onRightKeyed:function(){"ltr"===this.dir&&this.input.isCursorAtEnd()&&this.autocomplete(this.menu.getActiveSelectable()||this.menu.getTopSelectable())},_onQueryChanged:function(t,e){this._minLengthMet(e)?this.menu.update(e):this.menu.empty()},_onWhitespaceChanged:function(){this._updateHint()},_onLangDirChanged:function(t,e){this.dir!==e&&(this.dir=e,this.menu.setLanguageDirection(e))},_openIfActive:function(){this.isActive()&&this.open()},_minLengthMet:function(t){return(t=p.isString(t)?t:this.input.getQuery()||"").length>=this.minLength},_updateHint:function(){var t,e=this.menu.getTopSelectable(),e=this.menu.getSelectableData(e),n=this.input.getInputValue();!e||p.isBlankString(n)||this.input.hasOverflow()?this.input.clearHint():(t=f.normalizeQuery(n),t=p.escapeRegExChars(t),(t=new RegExp("^(?:"+t+")(.+$)","i").exec(e.val))&&this.input.setHint(n+t[1]))},isEnabled:function(){return this.enabled},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},isActive:function(){return this.active},activate:function(){return!!this.isActive()||!(!this.isEnabled()||this.eventBus.before("active"))&&(this.active=!0,this.eventBus.trigger("active"),!0)},deactivate:function(){return!this.isActive()||!this.eventBus.before("idle")&&(this.active=!1,this.close(),this.eventBus.trigger("idle"),!0)},isOpen:function(){return this.menu.isOpen()},open:function(){return this.isOpen()||this.eventBus.before("open")||(this.menu.open(),this._updateHint(),this.eventBus.trigger("open")),this.isOpen()},close:function(){return this.isOpen()&&!this.eventBus.before("close")&&(this.menu.close(),this.input.clearHint(),this.input.resetInputValue(),this.eventBus.trigger("close")),!this.isOpen()},setVal:function(t){this.input.setQuery(p.toStr(t))},getVal:function(){return this.input.getQuery()},select:function(t){t=this.menu.getSelectableData(t);return!(!t||this.eventBus.before("select",t.obj,t.dataset))&&(this.input.setQuery(t.val,!0),this.eventBus.trigger("select",t.obj,t.dataset),this.close(),!0)},autocomplete:function(t){var e=this.input.getQuery(),t=this.menu.getSelectableData(t);return!(!t||e===t.val||this.eventBus.before("autocomplete",t.obj,t.dataset))&&(this.input.setQuery(t.val),this.eventBus.trigger("autocomplete",t.obj,t.dataset),!0)},moveCursor:function(t){var e=this.input.getQuery(),t=this.menu.selectableRelativeToCursor(t),n=this.menu.getSelectableData(t),i=n?n.obj:null,s=n?n.dataset:null;return!(this._minLengthMet()&&this.menu.update(e)||this.eventBus.before("cursorchange",i,s))&&(this.menu.setCursor(t),n?this.input.setInputValue(n.val):(this.input.resetInputValue(),this._updateHint()),this.eventBus.trigger("cursorchange",i,s),!0)},destroy:function(){this.input.destroy(),this.menu.destroy()}}),t;function l(n){var t=[].slice.call(arguments,1);return function(){var e=[].slice.call(arguments);p.each(t,function(t){return n[t].apply(n,e)})}}}();!function(){"use strict";var t,c,e;function i(t,n){t.each(function(){var t,e=d(this);(t=e.data(c.typeahead))&&n(t,e)})}function h(t){t=p.isJQuery(t)||p.isElement(t)?d(t).first():[];return t.length?t:null}t=d.fn.typeahead,c={www:"tt-www",attrs:"tt-attrs",typeahead:"tt-typeahead"},e={initialize:function(a,o){var u;return o=p.isArray(o)?o:[].slice.call(arguments,1),u=n((a=a||{}).classNames),this.each(function(){var t,e,n,i,s,r;p.each(o,function(t){t.highlight=!!a.highlight}),t=d(this),r=d(u.html.wrapper),s=h(a.hint),e=h(a.menu),n=!1!==a.hint&&!s,i=!1!==a.menu&&!e,n&&(s=function(t,e){return t.clone().addClass(e.classes.hint).removeData().css(e.css.hint).css(function(t){return{backgroundAttachment:t.css("background-attachment"),backgroundClip:t.css("background-clip"),backgroundColor:t.css("background-color"),backgroundImage:t.css("background-image"),backgroundOrigin:t.css("background-origin"),backgroundPosition:t.css("background-position"),backgroundRepeat:t.css("background-repeat"),backgroundSize:t.css("background-size")}}(t)).prop("readonly",!0).removeAttr("id name placeholder required").attr({autocomplete:"off",spellcheck:"false",tabindex:-1})}(t,u)),i&&(e=d(u.html.menu).css(u.css.menu)),s&&s.val(""),t=function(t,e){t.data(c.attrs,{dir:t.attr("dir"),autocomplete:t.attr("autocomplete"),spellcheck:t.attr("spellcheck"),style:t.attr("style")}),t.addClass(e.classes.input).attr({autocomplete:"off",spellcheck:!1});try{t.attr("dir")||t.attr("dir","auto")}catch(t){}return t}(t,u),(n||i)&&(r.css(u.css.wrapper),t.css(n?u.css.input:u.css.inputWithNoHint),t.wrap(r).parent().prepend(n?s:null).append(i?e:null));r=i?y:g,n=new l({el:t}),i=new f({hint:s,input:t},u),s=new r({node:e,datasets:o},u),r=new m({input:i,menu:s,eventBus:n,minLength:a.minLength},u),t.data(c.www,u),t.data(c.typeahead,r)})},isEnabled:function(){var e;return i(this.first(),function(t){e=t.isEnabled()}),e},enable:function(){return i(this,function(t){t.enable()}),this},disable:function(){return i(this,function(t){t.disable()}),this},isActive:function(){var e;return i(this.first(),function(t){e=t.isActive()}),e},activate:function(){return i(this,function(t){t.activate()}),this},deactivate:function(){return i(this,function(t){t.deactivate()}),this},isOpen:function(){var e;return i(this.first(),function(t){e=t.isOpen()}),e},open:function(){return i(this,function(t){t.open()}),this},close:function(){return i(this,function(t){t.close()}),this},select:function(t){var e=!1,n=d(t);return i(this.first(),function(t){e=t.select(n)}),e},autocomplete:function(t){var e=!1,n=d(t);return i(this.first(),function(t){e=t.autocomplete(n)}),e},moveCursor:function(e){var n=!1;return i(this.first(),function(t){n=t.moveCursor(e)}),n},val:function(e){var n;return arguments.length?(i(this,function(t){t.setVal(p.toStr(e))}),this):(i(this.first(),function(t){n=t.getVal()}),n)},destroy:function(){return i(this,function(t,e){var n,i;e=(n=e).data(c.www),i=n.parent().filter(e.selectors.wrapper),p.each(n.data(c.attrs),function(t,e){p.isUndefined(t)?n.removeAttr(e):n.attr(e,t)}),n.removeData(c.typeahead).removeData(c.www).removeData(c.attr).removeClass(e.classes.input),i.length&&(n.detach().insertAfter(i),i.remove()),t.destroy()}),this}},d.fn.typeahead=function(t){return e[t]?e[t].apply(this,[].slice.call(arguments,1)):e.initialize.apply(this,arguments)},d.fn.typeahead.noConflict=function(){return d.fn.typeahead=t,this}}()});