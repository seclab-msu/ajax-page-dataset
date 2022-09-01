!function(e){var t,r;"object"==typeof exports&&"function"==typeof require?module.exports=e(require("underscore"),require("backbone")):"function"==typeof define&&define.amd?define(["underscore","backbone"],e):"undefined"!=typeof _&&"undefined"!=typeof Backbone&&(t=Backbone.PageableCollection,r=e(_,Backbone),Backbone.PageableCollection.noConflict=function(){return Backbone.PageableCollection=t,r})}(function(P,c){"use strict";var v=P.extend,p=P.omit,y=P.clone,k=P.each,m=P.pick,f=P.contains,u=P.isEmpty,b=P.pairs,n=P.invert,S=P.isArray,_=P.isFunction,o=P.isObject,R=P.keys,C=P.isUndefined,x=Math.ceil,i=Math.floor,g=Math.max,w=c.Collection.prototype;function h(e,t){if(P.isNumber(e)&&!P.isNaN(e)&&P.isFinite(e)&&~~e===e)return e;throw new TypeError("`"+t+"` must be a finite integer")}function q(e,t,r){var s,a,e=e._events[t];e&&e.length?(s=e[e.length-1],a=s.callback,s.callback=function(){try{a.apply(this,arguments),r()}catch(e){throw e}finally{s.callback=a}}):r()}var l=/[\s'"]/g,d=/[<>\s'"]/g,e=c.PageableCollection=c.Collection.extend({state:{firstPage:1,lastPage:null,currentPage:null,pageSize:25,totalPages:null,totalRecords:null,sortKey:null,order:-1},mode:"server",queryParams:{currentPage:"page",pageSize:"per_page",totalPages:"total_pages",totalRecords:"total_entries",sortKey:"sort_by",order:"order",directions:{"-1":"asc",1:"desc"}},constructor:function(e,t){w.constructor.apply(this,arguments);var r=this.mode=(t=t||{}).mode||this.mode||z.mode,s=v({},z.queryParams,this.queryParams,t.queryParams||{}),s=(s.directions=v({},z.queryParams.directions,this.queryParams.directions,s.directions),this.queryParams=s,this.state=v({},z.state,this.state,t.state)),a=(s.currentPage=null==s.currentPage?s.firstPage:s.currentPage,e=(e=S(e)?e:e?[e]:[]).slice(),"server"==r||null!=s.totalRecords||u(e)||(s.totalRecords=e.length),this.switchMode(r,v({fetch:!1,resetState:!1,models:e},t)),t.comparator);s.sortKey&&!a&&this.setSorting(s.sortKey,s.order,t),"server"!=r&&(r=this.fullCollection,a&&t.full&&(this.comparator=null,r.comparator=a),t.full&&r.sort(),u(e)||(this.reset(e,v({silent:!0},t)),this.getPage(s.currentPage),e.splice.apply(e,[0,e.length].concat(this.models)))),this._initState=y(this.state)},_makeFullCollection:function(e,t){for(var r,s=["url","model","sync","comparator"],a=this.constructor.prototype,i={},n=0,o=s.length;n<o;n++)C(a[r=s[n]])||(i[r]=a[r]);var l=new(c.Collection.extend(i))(e,t);for(n=0,o=s.length;n<o;n++)this[r=s[n]]!==a[r]&&(l[r]=this[r]);return l},_makeCollectionEventHandler:function(p,m){return function(e,t,r,s){var a,i,n,o,l,c,u=p._handlers,h=(k(R(u),function(e){var t=u[e];p.off(e,t),m.off(e,t)}),y(p.state)),f=h.firstPage,g=0===f?h.currentPage:h.currentPage-1,d=h.pageSize,g=g*d,P=g+d;"add"==e&&(s=s||{},r==m?g<=(i=m.indexOf(t))&&i<P&&(o=p,l=c=i-g):(i=g+(l=p.indexOf(t)),o=m,c=C(s.at)?i:s.at+g),s.onRemove||(++h.totalRecords,delete s.onRemove),p.state=p._checkState(h),o&&(o.add(t,v({},s,{at:c})),(a=d<=l?t:!C(s.at)&&c<P&&p.length>d?p.at(d):null)&&q(r,e,function(){p.remove(a,{onAdd:!0})})),s.silent||p.trigger("pageable:state:change",p.state)),"remove"==e&&(s.onAdd?delete s.onAdd:(--h.totalRecords?(i=h.totalPages=x(h.totalRecords/d),h.lastPage=0===f?i-1:i||f,h.currentPage>i&&(h.currentPage=h.lastPage)):(h.totalRecords=null,h.totalPages=null),p.state=p._checkState(h),o=s.index,r==p?((n=m.at(P))?q(p,e,function(){p.push(n,{onRemove:!0})}):!p.length&&h.totalRecords&&p.reset(m.models.slice(g-d,P-d),v({},s,{parse:!1})),m.remove(t)):g<=o&&o<P&&((n=m.at(P-1))&&q(p,e,function(){p.push(n,{onRemove:!0})}),p.remove(t),!p.length&&h.totalRecords&&p.reset(m.models.slice(g-d,P-d),v({},s,{parse:!1})))),s.silent||p.trigger("pageable:state:change",p.state)),"reset"==e&&(s=r,(r=t)==p&&null==s.from&&null==s.to?(l=m.models.slice(0,g),c=m.models.slice(g+p.models.length),m.reset(l.concat(p.models).concat(c),s)):r==m&&((h.totalRecords=m.models.length)||(h.totalRecords=null,h.totalPages=null),"client"==p.mode&&(P=(g=(0===(f=h.lastPage=h.currentPage=h.firstPage)?h.currentPage:h.currentPage-1)*d)+d),p.state=p._checkState(h),p.reset(m.models.slice(g,P),v({},s,{parse:!1}))),s.silent||p.trigger("pageable:state:change",p.state)),"sort"==e&&(s=r,(r=t)===m&&p.reset(m.models.slice(g,P),v({},s,{parse:!1}))),k(R(u),function(t){var r=u[t];k([p,m],function(e){e.on(t,r);e=e._events[t]||[];e.unshift(e.pop())})})}},_checkState:function(e){var t=this.mode,r=this.links,s=e.totalRecords,a=e.pageSize,i=e.currentPage,n=e.firstPage;e.totalPages;if(null!=s&&null!=a&&null!=i&&null!=n&&("infinite"!=t||r)){if(s=h(s,"totalRecords"),a=h(a,"pageSize"),i=h(i,"currentPage"),n=h(n,"firstPage"),a<1)throw new RangeError("`pageSize` must be >= 1");if(s=e.totalPages=x(s/a),n<0||1<n)throw new RangeError("`firstPage must be 0 or 1`");if(e.lastPage=0===n?g(0,s-1):s||n,"infinite"==t){if(!r[i+""])throw new RangeError("No link found for page "+i)}else if(i<n||0<s&&(n?s<i:s<=i))throw new RangeError("`currentPage` must be firstPage <= currentPage "+(n?"<":"<=")+" totalPages if "+n+"-based. Got "+i+".")}return e},setPageSize:function(e,t){e=h(e,"pageSize"),t=t||{first:!1};var r=this.state,s=x(r.totalRecords/e),a=s?g(r.firstPage,i(s*r.currentPage/r.totalPages)):r.firstPage,r=this.state=this._checkState(v({},r,{pageSize:e,currentPage:t.first?r.firstPage:a,totalPages:s}));return this.getPage(r.currentPage,p(t,["first"]))},switchMode:function(e,t){if(!f(["server","client","infinite"],e))throw new TypeError('`mode` must be one of "server", "client" or "infinite"');var r,s,a=this.state=(t=t||{fetch:!0,resetState:!0}).resetState?y(this._initState):this._checkState(v({},this.state)),i=(this.mode=e,this),n=this.fullCollection,o=this._handlers=this._handlers||{};if("server"==e||n?"server"==e&&n&&(k(R(o),function(e){r=o[e],i.off(e,r),n.off(e,r)}),delete this._handlers,this._fullComparator=n.comparator,delete this.fullCollection):(((n=this._makeFullCollection(t.models||[],t)).pageableCollection=this).fullCollection=n,s=this._makeCollectionEventHandler(this,n),k(["add","remove","reset","sort"],function(e){o[e]=r=P.bind(s,{},e),i.on(e,r),n.on(e,r)}),n.comparator=this._fullComparator),"infinite"==e)for(var l=this.links={},e=a.firstPage,c=x(a.totalRecords/a.pageSize),u=0===e?g(0,c-1):c||e,h=a.firstPage;h<=u;h++)l[h]=this.url;else this.links&&delete this.links;return t.silent||this.trigger("pageable:state:change",a),t.fetch?this.fetch(p(t,"fetch","resetState")):this},hasPreviousPage:function(){var e=this.state,t=e.currentPage;return"infinite"!=this.mode?t>e.firstPage:!!this.links[t-1]},hasNextPage:function(){var e=this.state,t=this.state.currentPage;return"infinite"!=this.mode?t<e.lastPage:!!this.links[t+1]},getFirstPage:function(e){return this.getPage("first",e)},getPreviousPage:function(e){return this.getPage("prev",e)},getNextPage:function(e){return this.getPage("next",e)},getLastPage:function(e){return this.getPage("last",e)},getPage:function(e,t){var r=this.mode,s=this.fullCollection,a=(t=t||{fetch:!1},this.state),i=a.firstPage,n=a.currentPage,o=a.lastPage,l=a.pageSize,c=e;switch(e){case"first":c=i;break;case"prev":c=n-1;break;case"next":c=n+1;break;case"last":c=o;break;default:c=h(e,"index")}this.state=this._checkState(v({},a,{currentPage:c})),t.silent||this.trigger("pageable:state:change",this.state),t.from=n,t.to=c;a=(0===i?c:c-1)*l,s=s&&s.length?s.models.slice(a,a+l):[];return"client"!=r&&("infinite"!=r||u(s))||t.fetch?("infinite"==r&&(t.url=this.links[c]),this.fetch(p(t,"fetch"))):(this.reset(s,p(t,"fetch")),this)},getPageByOffset:function(e,t){if(e<0)throw new RangeError("`offset must be > 0`");e=h(e);e=i(e/this.state.pageSize);return 0!==this.state.firstPage&&e++,e>this.state.lastPage&&(e=this.state.lastPage),this.getPage(e,t)},sync:function(e,t,i){var n,o,l=this;return"infinite"==l.mode&&(n=i.success,o=l.state.currentPage,i.success=function(e,t,r){var s=l.links,a=l.parseLinks(e,v({xhr:r},i));a.first&&(s[l.state.firstPage]=a.first),a.prev&&(s[o-1]=a.prev),a.next&&(s[o+1]=a.next),n&&n(e,t,r)}),(w.sync||c.sync).call(l,e,t,i)},parseLinks:function(e,t){var s,a={},t=t.xhr.getResponseHeader("Link");return t&&(s=["first","prev","next"],k(t.split(","),function(e){var e=e.split(";"),r=e[0].replace(d,""),e=e.slice(1);k(e,function(e){var e=e.split("="),t=e[0].replace(l,""),e=e[1].replace(l,"");"rel"==t&&f(s,e)&&(a[e]=r)})})),a},parse:function(e,t){var r=this.parseState(e,y(this.queryParams),y(this.state),t);return r&&(this.state=this._checkState(v({},this.state,r))),this.parseRecords(e,t)},parseState:function(e,t,r,s){var a,i;if(e&&2===e.length&&o(e[0])&&S(e[1]))return a=y(r),i=e[0],k(b(p(t,"directions")),function(e){var t=e[0],e=e[1],r=i[e];C(r)||P.isNull(r)||(a[t]=i[e])}),i.order&&(a.order=+n(t.directions)[i.order]),a},parseRecords:function(e,t){return e&&2===e.length&&o(e[0])&&S(e[1])?e[1]:e},fetch:function(a){a=a||{};var r=this._checkState(this.state),i=this.mode,s=("infinite"!=i||a.url||(a.url=this.links[r.currentPage]),a.data||{}),e=a.url||this.url||"",t=(e=_(e)?e.call(this):e).indexOf("?"),t=(-1!=t&&(v(s,function(e){for(var t,r={},s=decodeURIComponent,a=e.split("&"),i=0,n=a.length;i<n;i++){var o,l=(o=a[i].split("="))[0];null==(o=o[1])&&(o=!0),l=s(l),o=s(o),t=r[l],S(t)?t.push(o):r[l]=t?[t,o]:o}return r}(e.slice(t+1))),e=e.slice(0,t)),a.url=e,a.data=s,"client"==this.mode?m(this.queryParams,"sortKey","order"):p(m(this.queryParams,R(z.queryParams)),"directions")),n=P.clone(this);if(P.each(t,function(e,t){e=_(e)?e.call(n):e,null!=r[t]&&null!=e&&P.isUndefined(s[e])&&(s[e]=r[t])},this),r.sortKey&&r.order){var o=_(t.order)?t.order.call(n):t.order;if(S(r.order))for(s[o]=[],d=0;d<r.order.length;d+=1)s[o].push(this.queryParams.directions[r.order[d]]);else s[o]=this.queryParams.directions[r.order+""]}else r.sortKey||delete s[t.order];for(var l,c,u,h,f,g=b(p(this.queryParams,R(z.queryParams))),d=0;d<g.length;d++)c=(l=g[d])[1],null!=(c=_(c)?c.call(n):c)&&(s[l[0]]=c);return"server"!=i?(h=(u=this).fullCollection,f=a.success,a.success=function(e,t,r){r=r||{},C(a.silent)?delete r.silent:r.silent=a.silent;var s=e.models;"client"==i?h.reset(s,r):(h.add(s,v({at:h.length},v(r,{parse:!1}))),u.trigger("reset",u,r)),f&&f(e,t,r)},w.fetch.call(this,v({},a,{silent:!0}))):w.fetch.call(this,a)},_makeComparator:function(s,a,i){var e=this.state;if(s=s||e.sortKey,a=a||e.order,s&&a)return i=i||function(e,t){return e.get(t)},function(e,t){var r,e=i(e,s),t=i(t,s);return 1===a&&(r=e,e=t,t=r),e===t?0:e<t?-1:1}},setSorting:function(e,t,r){var s=this.state,s=(s.sortKey=e,s.order=t=t||s.order,this.fullCollection),a=!1,i=!1,n=(e||(a=i=!0),this.mode),n=(r=v({side:"client"==n?n:"server",full:!0},r),this._makeComparator(e,t,r.sortValue)),e=r.full,t=r.side;return"client"==t?e?(s&&(s.comparator=n),a=!0):(this.comparator=n,i=!0):"server"!=t||e||(this.comparator=n),a&&(this.comparator=null),i&&s&&(s.comparator=null),this}}),z=e.prototype;return e});