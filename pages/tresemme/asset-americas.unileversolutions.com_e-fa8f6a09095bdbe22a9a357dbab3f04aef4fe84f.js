!function(t,i,n){var e=window.matchMedia;"undefined"!=typeof module&&module.exports?module.exports=n(e):"function"==typeof define&&define.amd?define(function(){return i[t]=n(e)}):i[t]=n(e)}("enquire",this,function(e){"use strict";function s(t,i){for(var n=0,e=t.length;n<e&&!1!==i(t[n],n);n++);}function o(t){return"function"==typeof t}function i(t){(this.options=t).deferSetup||this.setup()}function r(t,i){this.query=t,this.isUnconditional=i,this.handlers=[],this.mql=e(t);var n=this;this.listener=function(t){n.mql=t,n.assess()},this.mql.addListener(this.listener)}function t(){if(!e)throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!e("only all").matches}return i.prototype={setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){this.initialised||this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(t){return this.options===t||this.options.match===t}},r.prototype={addHandler:function(t){t=new i(t);this.handlers.push(t),this.matches()&&t.on()},removeHandler:function(n){var e=this.handlers;s(e,function(t,i){if(t.equals(n))return t.destroy(),!e.splice(i,1)})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){s(this.handlers,function(t){t.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var i=this.matches()?"on":"off";s(this.handlers,function(t){t[i]()})}},t.prototype={register:function(i,t,n){var e=this.queries,n=n&&this.browserIsIncapable;return e[i]||(e[i]=new r(i,n)),o(t)&&(t={match:t}),n=t,s(t="[object Array]"!==Object.prototype.toString.apply(n)?[t]:t,function(t){o(t)&&(t={match:t}),e[i].addHandler(t)}),this},unregister:function(t,i){var n=this.queries[t];return n&&(i?n.removeHandler(i):(n.clear(),delete this.queries[t])),this}},new t});