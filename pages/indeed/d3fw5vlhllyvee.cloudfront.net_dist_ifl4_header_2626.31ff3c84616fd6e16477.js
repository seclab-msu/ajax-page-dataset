"use strict";(self.webpackChunkgnavHeader=self.webpackChunkgnavHeader||[]).push([[2626],{9202:function(e,n){var t,i,o;Object.defineProperty(n,"__esModule",{value:!0}),n.GlobalDependencies=void 0;var a={get sendBeacon(){var e;return o||(o=null===(e=window.navigator.sendBeacon)||void 0===e?void 0:e.bind(window.navigator)),o},requestIdleCallback:null===(t=window.requestIdleCallback)||void 0===t?void 0:t.bind(window),cancelIdleCallback:null===(i=window.cancelIdleCallback)||void 0===i?void 0:i.bind(window),addEventListener:window.addEventListener.bind(window),removeEventListener:window.removeEventListener.bind(window),setTimeout:window.setTimeout.bind(window),clearTimeout:window.clearTimeout.bind(window),Date:Date,location:window.location,document:{addEventListener:document.addEventListener.bind(document),removeEventListener:document.removeEventListener.bind(document),get visibilityState(){return document.visibilityState}},URL:window.URL};n.GlobalDependencies=a},62626:function(e,n,t){var i=this&&this.__values||function(e){var n="function"==typeof Symbol&&Symbol.iterator,t=n&&e[n],i=0;if(t)return t.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&i>=e.length&&(e=void 0),{value:e&&e[i++],done:!e}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")};Object.defineProperty(n,"__esModule",{value:!0}),n.onPageHide=n.disconnect=n.configure=n.emitSignal=void 0;var o,a=t(27897),l=t(9202);n.emitSignal=function(e){if(!o)throw new Error("Attempted to emit signal message without configuring the transport. Ensure that Logger.configure() has been called before logging");o.enqueue(e)},n.configure=function(e){o=new r(e,l.GlobalDependencies)},n.disconnect=function(){o&&o.disconnect()},n.onPageHide=function(e){o&&o.onPageHide(e)};var r=function(){function e(e,n){var t=this;if(this.globals=n,this.handleStateChange=function(){"hidden"===t.globals.document.visibilityState&&t.handlePageHide()},this.handlePageHide=function(){var e,n;try{for(var o=i(t.pageHideHandlers),a=o.next();!a.done;a=o.next()){var l=a.value;try{null==l||l()}catch(e){IS_DEV}}}catch(n){e={error:n}}finally{try{a&&!a.done&&(n=o.return)&&n.call(o)}finally{if(e)throw e.error}}t.emit()},this.queue=[],this.pageHideHandlers=[],this.cancelScheduled=function(){},this.isConnected=!1,this.endpoint=e.endpoint,this.applicationId=e.applicationId,"URL"in this.globals){var o=new this.globals.URL(this.endpoint,l.GlobalDependencies.location.href);o.searchParams.append("signalAppId",this.applicationId),this.endpoint=o.toString()}(0,a.installSendBeacon)(),this.connect()}return e.prototype.configure=function(e){this.endpoint=e.endpoint,this.applicationId=e.applicationId},e.prototype.enqueue=function(e){this.connect(),this.queue.push(e)},e.prototype.connect=function(){this.isConnected||(this.globals.document.addEventListener("visibilitychange",this.handleStateChange,!1),this.run(),this.isConnected=!0)},e.prototype.disconnect=function(){this.globals.document.removeEventListener("visibilitychange",this.handleStateChange),this.emit(),this.cancelScheduled(),this.isConnected=!1},e.prototype.onPageHide=function(e){this.pageHideHandlers.push(e)},e.prototype.emit=function(){if(this.queue.length){var e=JSON.stringify({applicationId:this.applicationId,messages:this.queue});this.globals.sendBeacon(this.endpoint,e),this.queue=[]}},e.prototype.run=function(){var e=this;this.cancelScheduled=this.schedule((function(){e.emit(),e.run()}))},e.prototype.schedule=function(e){var n=this;if(this.globals.requestIdleCallback){var t=this.globals.requestIdleCallback(e);return function(){var e,i;return null===(i=(e=n.globals).cancelIdleCallback)||void 0===i?void 0:i.call(e,t)}}var i=this.globals.setTimeout(e,50);return function(){return n.globals.clearTimeout(i)}},e}()},27897:function(e,n){Object.defineProperty(n,"__esModule",{value:!0}),n.installSendBeacon=void 0,n.installSendBeacon=function(){"navigator"in self&&"sendBeacon"in navigator||("navigator"in self||(self.navigator={}),self.navigator.sendBeacon=function(e,n){try{var t=new XMLHttpRequest;return t.open("POST",e,!1),t.onerror=function(){},t.setRequestHeader("Accept","*/*"),"string"==typeof n?t.setRequestHeader("Content-Type","text/plain;charset=UTF-8"):"[object Blob]"===Object.prototype.toString.call(n)&&n.type&&t.setRequestHeader("Content-Type",n.type),t.send(n),!0}catch(e){return!1}})}}}]);
//# sourceMappingURL=2626.31ff3c84616fd6e16477.js.map