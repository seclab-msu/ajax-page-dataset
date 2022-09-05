; /* /bitrix/js/main/core/core_window.min.js?148050392974754*/
; /* /bitrix/js/main/core/core_popup.min.js?149752499539932*/
; /* /bitrix/js/main/core/core_date.min.js?148050392934241*/
; /* /bitrix/js/main/utils.min.js?148050392919858*/
; /* /bitrix/js/main/session.min.js?14805039292511*/
; /* /bitrix/js/main/core/core.js?1600156110117645*/
; /* /bitrix/js/main/core/core_ajax.min.js?149752499521127*/
; /* /bitrix/js/main/json/json2.min.js?14805039293442*/
; /* /bitrix/js/main/core/core_ls.min.js?14805039297365*/
; /* /bitrix/js/main/core/core_fx.min.js?14975249959768*/

; /* Start:"a:4:{s:4:"full";s:45:"/bitrix/js/main/core/core.js?1600156110117645";s:6:"source";s:28:"/bitrix/js/main/core/core.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
/**********************************************************************/
/*********** Bitrix JS Core library ver 0.9.0 beta ********************/
/**********************************************************************/

;(function(window){

if (!!window.BX && !!window.BX.extend)
	return;

var _bxtmp;
if (!!window.BX)
{
	_bxtmp = window.BX;
}

window.BX = function(node, bCache)
{
	if (BX.type.isNotEmptyString(node))
	{
		var ob;

		if (!!bCache && null != NODECACHE[node])
			ob = NODECACHE[node];
		ob = ob || document.getElementById(node);
		if (!!bCache)
			NODECACHE[node] = ob;

		return ob;
	}
	else if (BX.type.isDomNode(node))
		return node;
	else if (BX.type.isFunction(node))
		return BX.ready(node);

	return null;
};

BX.debugEnableFlag = false;

// language utility
BX.message = function(mess)
{
	if (BX.type.isString(mess))
	{
		if (typeof BX.message[mess] == "undefined")
		{
			BX.onCustomEvent("onBXMessageNotFound", [mess]);
			if (typeof BX.message[mess] == "undefined")
			{
				BX.debug("message undefined: " + mess);
				BX.message[mess] = "";
			}

		}

		return BX.message[mess];
	}
	else
	{
		for (var i in mess)
		{
			if (mess.hasOwnProperty(i))
			{
				BX.message[i] = mess[i];
			}
		}
		return true;
	}
};

if(!!_bxtmp)
{
	for(var i in _bxtmp)
	{
		if(_bxtmp.hasOwnProperty(i))
		{
			if(!BX[i])
			{
				BX[i]=_bxtmp[i];
			}
			else if(i=='message')
			{
				for(var j in _bxtmp[i])
				{
					if(_bxtmp[i].hasOwnProperty(j))
					{
						BX.message[j]=_bxtmp[i][j];
					}
				}
			}
		}
	}

	_bxtmp = null;
}

var

/* ready */
__readyHandler = null,
readyBound = false,
readyList = [],

/* list of registered proxy functions */
proxySalt = Math.random(),
proxyId = 1,
proxyList = [],

/* getElementById cache */
NODECACHE = {},

/* List of denied event handlers */
deniedEvents = [],

/* list of registered event handlers */
eventsList = [],

/* list of registered custom events */
customEvents = {},

/* list of external garbage collectors */
garbageCollectors = [],

/* list of loaded CSS files */
cssList = [],
cssInit = false,

/* list of loaded JS files */
jsList = [],
jsInit = false,


/* browser detection */
bSafari = navigator.userAgent.toLowerCase().indexOf('webkit') != -1,
bOpera = navigator.userAgent.toLowerCase().indexOf('opera') != -1,
bFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') != -1,
bChrome = navigator.userAgent.toLowerCase().indexOf('chrome') != -1,
bIE = document.attachEvent && !bOpera,

/* regexps */
r = {
	script: /<script([^>]*)>/ig,
	script_end: /<\/script>/ig,
	script_src: /src=["\']([^"\']+)["\']/i,
	script_type: /type=["\']([^"\']+)["\']/i,
	space: /\s+/,
	ltrim: /^[\s\r\n]+/g,
	rtrim: /[\s\r\n]+$/g,
	style: /<link.*?(rel="stylesheet"|type="text\/css")[^>]*>/i,
	style_href: /href=["\']([^"\']+)["\']/i
},

eventTypes = {
	click: 'MouseEvent',
	dblclick: 'MouseEvent',
	mousedown: 'MouseEvent',
	mousemove: 'MouseEvent',
	mouseout: 'MouseEvent',
	mouseover: 'MouseEvent',
	mouseup: 'MouseEvent',
	focus: 'MouseEvent',
	blur: 'MouseEvent'
},

lastWait = [],

CHECK_FORM_ELEMENTS = {tagName: /^INPUT|SELECT|TEXTAREA|BUTTON$/i},

PRELOADING = 1, PRELOADED = 2, LOADING = 3, LOADED = 4,
assets = {},
isAsync = null;

BX.MSLEFT = 1;
BX.MSMIDDLE = 2;
BX.MSRIGHT = 4;

BX.ext = function(ob)
{
	for (var i in ob)
	{
		if(ob.hasOwnProperty(i))
		{
			this[i] = ob[i];
		}
	}
};

/* OO emulation utility */
BX.extend = function(child, parent)
{
	var f = function() {};
	f.prototype = parent.prototype;

	child.prototype = new f();
	child.prototype.constructor = child;

	child.superclass = parent.prototype;
	if(parent.prototype.constructor == Object.prototype.constructor)
	{
		parent.prototype.constructor = parent;
	}
};

BX.namespace = function(namespace)
{
	var parts = namespace.split(".");
	var parent = BX;

	if (parts[0] === "BX")
	{
		parts = parts.slice(1);
	}

	for (var i = 0; i < parts.length; i++) {

		if (typeof parent[parts[i]] === "undefined")
		{
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}

	return parent;
};

BX.debug = function()
{
	if (BX.debugStatus())
	{
		if (window.console && window.console.log)
			window.console.log('BX.debug: ', arguments.length > 0 ? arguments : arguments[0]);
		if (window.console && window.console.trace)
			console.trace();
	}
};

BX.debugEnable = function(flag)
{
	flag = typeof (flag) == 'boolean'? flag: true;
	BX.debugEnableFlag = flag;
};

BX.debugStatus = function()
{
	return BX.debugEnableFlag || false;
};

BX.is_subclass_of = function(ob, parent_class)
{
	if (ob instanceof parent_class)
		return true;

	if (parent_class.superclass)
		return BX.is_subclass_of(ob, parent_class.superclass);

	return false;
};

BX.clearNodeCache = function()
{
	NODECACHE = {};
	return false;
};

BX.bitrix_sessid = function() {return BX.message("bitrix_sessid"); };

/* DOM manipulation */
/**
 * Creates the specified HTML element
 * @param {String} tag
 * @param {Object} [data]
 * @param {Document} [context]
 * @returns {Element}
 */
BX.create = function(tag, data, context)
{
	context = context || document;

	if (null == data && typeof tag == 'object' && tag.constructor !== String)
	{
		data = tag; tag = tag.tag;
	}

	var elem;
	if (BX.browser.IsIE() && !BX.browser.IsIE9() && null != data && null != data.props && (data.props.name || data.props.id))
	{
		elem = context.createElement('<' + tag + (data.props.name ? ' name="' + data.props.name + '"' : '') + (data.props.id ? ' id="' + data.props.id + '"' : '') + '>');
	}
	else
	{
		elem = context.createElement(tag);
	}

	return data ? BX.adjust(elem, data) : elem;
};

BX.adjust = function(elem, data)
{
	var j,len;

	if (!elem.nodeType)
		return null;

	if (elem.nodeType == 9)
		elem = elem.body;

	if (data.attrs)
	{
		for (j in data.attrs)
		{
			if(data.attrs.hasOwnProperty(j))
			{
				if (j == 'class' || j == 'className')
					elem.className = data.attrs[j];
				else if (j == 'for')
					elem.htmlFor = data.attrs[j];
				else if(data.attrs[j] == "")
					elem.removeAttribute(j);
				else
					elem.setAttribute(j, data.attrs[j]);
			}
		}
	}

	if (data.style)
	{
		for (j in data.style)
		{
			if(data.style.hasOwnProperty(j))
			{
				elem.style[j] = data.style[j];
			}
		}
	}

	if (data.props)
	{
		for (j in data.props)
		{
			if(data.props.hasOwnProperty(j))
			{
				elem[j] = data.props[j];
			}
		}
	}

	if (data.events)
	{
		for (j in data.events)
		{
			if(data.events.hasOwnProperty(j))
			{
				BX.bind(elem, j, data.events[j]);
			}
		}
	}

	if (data.dataset)
	{
		for (j in data.dataset)
		{
			if(data.dataset.hasOwnProperty(j))
			{
				elem.dataset[j] = data.dataset[j]
			}
		}
	}

	if (data.children && data.children.length > 0)
	{
		for (j=0,len=data.children.length; j<len; j++)
		{
			if (BX.type.isNotEmptyString(data.children[j]))
				elem.innerHTML += data.children[j];
			else if (BX.type.isElementNode(data.children[j]))
				elem.appendChild(data.children[j]);
		}
	}
	else if (data.text)
	{
		BX.cleanNode(elem);
		elem.appendChild((elem.ownerDocument || document).createTextNode(data.text));
	}
	else if (typeof data.html !== 'undefined')
	{
		elem.innerHTML = data.html;
	}

	return elem;
};

BX.remove = function(ob)
{
	if (ob && null != ob.parentNode)
		ob.parentNode.removeChild(ob);
	ob = null;
	return null;
};

BX.cleanNode = function(node, bSuicide)
{
	node = BX(node);
	bSuicide = !!bSuicide;

	if (node && node.childNodes)
	{
		while(node.childNodes.length > 0)
			node.removeChild(node.firstChild);
	}

	if (node && bSuicide)
	{
		node = BX.remove(node);
	}

	return node;
};

BX.html = function(node, html, parameters)
{
	if(typeof html == 'undefined')
		return node.innerHTML;

	if(typeof parameters == 'undefined')
		parameters = {};

	html = BX.processHTML(html.toString());

	var assets = [];
	var inlineJS = [];

	if(typeof html.STYLE != 'undefined' && html.STYLE.length > 0)
	{
		for(var k in html.STYLE)
			assets.push(html.STYLE[k]);
	}

	if(typeof html.SCRIPT != 'undefined' && html.SCRIPT.length > 0)
	{
		for(var k in html.SCRIPT)
		{
			if(html.SCRIPT[k].isInternal)
				inlineJS.push(html.SCRIPT[k].JS);
			else
				assets.push(html.SCRIPT[k].JS);
		}
	}

	if(parameters.htmlFirst && typeof html.HTML != 'undefined' && node)
	{
		node.innerHTML = html.HTML;
	}

	var p = new BX.Promise();

	var afterAsstes = function(){
		if(!parameters.htmlFirst && typeof html.HTML != 'undefined' && node)
		{
			node.innerHTML = html.HTML;
		}

		for(var k in inlineJS)
		{
			BX.evalGlobal(inlineJS[k]);
		}

		if(BX.type.isFunction(parameters.callback))
		{
			parameters.callback();
		}

		p.fulfill();
	};

	if(assets.length > 0)
	{
		BX.load(assets, afterAsstes);
	}
	else
	{
		afterAsstes();
	}

	return p;
};

BX.insertAfter = function(node, dstNode)
{
	dstNode.parentNode.insertBefore(node, dstNode.nextSibling);
};

BX.prepend = function(node, dstNode)
{
	dstNode.insertBefore(node, dstNode.firstChild);
};

BX.append = function(node, dstNode)
{
	dstNode.appendChild(node);
};

BX.addClass = function(ob, value)
{
	var classNames;
	ob = BX(ob);

	value = BX.util.trim(value);
	if (value == '')
		return ob;

	if (ob)
	{
		if (!ob.className)
		{
			ob.className = value
		}
		else if (!!ob.classList && value.indexOf(' ') < 0)
		{
			ob.classList.add(value);
		}
		else
		{
			classNames = (value || "").split(r.space);

			var className = " " + ob.className + " ";
			for (var j = 0, cl = classNames.length; j < cl; j++)
			{
				if (className.indexOf(" " + classNames[j] + " ") < 0)
				{
					ob.className += " " + classNames[j];
				}
			}
		}
	}

	return ob;
};

BX.removeClass = function(ob, value)
{
	ob = BX(ob);
	if (ob)
	{
		if (ob.className && !!value)
		{
			if (BX.type.isString(value))
			{
				if (!!ob.classList && value.indexOf(' ') < 0)
				{
					ob.classList.remove(value);
				}
				else
				{
					var classNames = value.split(r.space), className = " " + ob.className + " ";
					for (var j = 0, cl = classNames.length; j < cl; j++)
					{
						className = className.replace(" " + classNames[j] + " ", " ");
					}

					ob.className = BX.util.trim(className);
				}
			}
			else
			{
				ob.className = "";
			}
		}
	}

	return ob;
};

BX.toggleClass = function(ob, value)
{
	var className;
	ob = BX(ob);

	if (BX.type.isArray(value))
	{
		className = ' ' + ob.className + ' ';
		for (var j = 0, len = value.length; j < len; j++)
		{
			if (BX.hasClass(ob, value[j]))
			{
				className = (' ' + className + ' ').replace(' ' + value[j] + ' ', ' ');
				className += ' ' + value[j >= len-1 ? 0 : j+1];

				j--;
				break;
			}
		}

		if (j == len)
			ob.className += ' ' + value[0];
		else
			ob.className = className;

		ob.className = BX.util.trim(ob.className);
	}
	else if (BX.type.isNotEmptyString(value))
	{
		if (!!ob.classList)
		{
			ob.classList.toggle(value);
		}
		else
		{
			className = ob.className;
			if (BX.hasClass(ob, value))
			{
				className = (' ' + className + ' ').replace(' ' + value + ' ', ' ');
			}
			else
			{
				className += ' ' + value;
			}

			ob.className = BX.util.trim(className);
		}
	}

	return ob;
};

BX.hasClass = function(el, className)
{
	el = BX(el);
	if (!el || !BX.type.isDomNode(el))
	{
		BX.debug(el);
		return false;
	}

	if (!el.className || !className)
	{
		return false;
	}

	if (!!el.classList && !!className && className.indexOf(' ') < 0)
	{
		return el.classList.contains(BX.util.trim(className));
	}
	else
		return ((" " + el.className + " ").indexOf(" " + className + " ")) >= 0;
};

BX.setOpacity = function(ob, percentage)
{
	if (ob.style.filter != null)
	{
		//IE
		ob.style.zoom = "100%";

		if (percentage == 100)
		{
			ob.style.filter = "";
		}
		else
		{
			ob.style.filter = 'alpha(opacity=' + percentage.toString() + ')';
		}
	}
	else if (ob.style.opacity != null)
	{
		// W3C
		ob.style.opacity = (percentage / 100).toString();
	}
	else if (ob.style.MozOpacity != null)
	{
		// Mozilla
		ob.style.MozOpacity = (percentage / 100).toString();
	}
};

BX.hoverEvents = function(el)
{
	if (el)
		return BX.adjust(el, {events: BX.hoverEvents()});
	else
		return {mouseover: BX.hoverEventsHover, mouseout: BX.hoverEventsHout};
};

BX.hoverEventsHover = function(){BX.addClass(this,'bx-hover');this.BXHOVER=true;};
BX.hoverEventsHout = function(){BX.removeClass(this,'bx-hover');this.BXHOVER=false;};

BX.focusEvents = function(el)
{
	if (el)
		return BX.adjust(el, {events: BX.focusEvents()});
	else
		return {mouseover: BX.focusEventsFocus, mouseout: BX.focusEventsBlur};
};

BX.focusEventsFocus = function(){BX.addClass(this,'bx-focus');this.BXFOCUS=true;};
BX.focusEventsBlur = function(){BX.removeClass(this,'bx-focus');this.BXFOCUS=false;};

BX.setUnselectable = function(node)
{
	node.style.userSelect = node.style.MozUserSelect = node.style.WebkitUserSelect = node.style.KhtmlUserSelect = node.style = 'none';
	node.setAttribute('unSelectable', 'on');
};

BX.setSelectable = function(node)
{
	node.style.userSelect = node.style.MozUserSelect = node.style.WebkitUserSelect = node.style.KhtmlUserSelect = node.style = '';
	node.removeAttribute('unSelectable');
};

BX.styleIEPropertyName = function(name)
{
	if (name == 'float')
		name = BX.browser.IsIE() ? 'styleFloat' : 'cssFloat';
	else
	{
		var res = BX.browser.isPropertySupported(name);
		if (res)
		{
			name = res;
		}
		else
		{
			var reg = /(\-([a-z]){1})/g;
			if (reg.test(name))
			{
				name = name.replace(reg, function () {return arguments[2].toUpperCase();});
			}
		}
	}
	return name;
};

/* CSS-notation should be used here */
BX.style = function(el, property, value)
{
	if (!BX.type.isElementNode(el))
		return null;

	if (value == null)
	{
		var res;

		if(el.currentStyle)
			res = el.currentStyle[BX.styleIEPropertyName(property)];
		else if(window.getComputedStyle)
		{
			var q = BX.browser.isPropertySupported(property, true);
			if (!!q)
				property = q;

			res = BX.GetContext(el).getComputedStyle(el, null).getPropertyValue(property);
		}

		if(!res)
			res = '';
		return res;
	}
	else
	{
		el.style[BX.styleIEPropertyName(property)] = value;
		return el;
	}
};

BX.focus = function(el)
{
	try
	{
		el.focus();
		return true;
	}
	catch (e)
	{
		return false;
	}
};

BX.firstChild = function(el)
{
	var e = el.firstChild;
	while (e && !BX.type.isElementNode(e))
	{
		e = e.nextSibling;
	}

	return e;
};

BX.lastChild = function(el)
{
	var e = el.lastChild;
	while (e && !BX.type.isElementNode(e))
	{
		e = e.previousSibling;
	}

	return e;
};

BX.previousSibling = function(el)
{
	var e = el.previousSibling;
	while (e && !BX.type.isElementNode(e))
	{
		e = e.previousSibling;
	}

	return e;
};

BX.nextSibling = function(el)
{
	var e = el.nextSibling;
	while (e && !BX.type.isElementNode(e))
	{
		e = e.nextSibling;
	}

	return e;
};

/*
	params: {
		obj : html node
		className : className value
		recursive : used only for older browsers to optimize the tree traversal, in new browsers the search is always recursively, default - true
	}

	Search all nodes with className
*/
BX.findChildrenByClassName = function(obj, className, recursive)
{
	if(!obj || !obj.childNodes) return null;

	var result = [];
	if (typeof(obj.getElementsByClassName) == 'undefined')
	{
		recursive = recursive !== false;
		result = BX.findChildren(obj, {className : className}, recursive);
	}
	else
	{
		var col = obj.getElementsByClassName(className);
		for (i=0,l=col.length;i<l;i++)
		{
			result[i] = col[i];
		}
	}
	return result;
};

/*
	params: {
		obj : html node
		className : className value
		recursive : used only for older browsers to optimize the tree traversal, in new browsers the search is always recursively, default - true
	}

	Search first node with className
*/
BX.findChildByClassName = function(obj, className, recursive)
{
	if(!obj || !obj.childNodes) return null;

	var result = null;
	if (typeof(obj.getElementsByClassName) == 'undefined')
	{
		recursive = recursive !== false;
		result = BX.findChild(obj, {className : className}, recursive);
	}
	else
	{
		var col = obj.getElementsByClassName(className);
		if (col && typeof(col[0]) != 'undefined')
		{
			result = col[0];
		}
		else
		{
			result = null;
		}
	}
	return result;
};

/*
	params: {
		tagName|tag : 'tagName',
		className|class : 'className',
		attribute : {attribute : value, attribute : value} | attribute | [attribute, attribute....],
		property : {prop: value, prop: value} | prop | [prop, prop]
	}

	all values can be RegExps or strings
*/
BX.findChildren = function(obj, params, recursive)
{
	return BX.findChild(obj, params, recursive, true);
};

BX.findChild = function(obj, params, recursive, get_all)
{
	if(!obj || !obj.childNodes) return null;

	recursive = !!recursive; get_all = !!get_all;

	var n = obj.childNodes.length, result = [];

	for (var j=0; j<n; j++)
	{
		var child = obj.childNodes[j];

		if (_checkNode(child, params))
		{
			if (get_all)
				result.push(child);
			else
				return child;
		}

		if(recursive == true)
		{
			var res = BX.findChild(child, params, recursive, get_all);
			if (res)
			{
				if (get_all)
					result = BX.util.array_merge(result, res);
				else
					return res;
			}
		}
	}

	if (get_all || result.length > 0)
		return result;
	else
		return null;
};

BX.findParent = function(obj, params, maxParent)
{
	if(!obj)
		return null;

	var o = obj;
	while(o.parentNode)
	{
		var parent = o.parentNode;

		if (_checkNode(parent, params))
			return parent;

		o = parent;

		if (!!maxParent &&
			(BX.type.isFunction(maxParent)
				|| typeof maxParent == 'object'))
		{
			if (BX.type.isElementNode(maxParent))
			{
				if (o == maxParent)
					break;
			}
			else
			{
				if (_checkNode(o, maxParent))
					break;
			}
		}
	}
	return null;
};

BX.findNextSibling = function(obj, params)
{
	if(!obj)
		return null;
	var o = obj;
	while(o.nextSibling)
	{
		var sibling = o.nextSibling;
		if (_checkNode(sibling, params))
			return sibling;
		o = sibling;
	}
	return null;
};

BX.findPreviousSibling = function(obj, params)
{
	if(!obj)
		return null;

	var o = obj;
	while(o.previousSibling)
	{
		var sibling = o.previousSibling;
		if(_checkNode(sibling, params))
			return sibling;
		o = sibling;
	}
	return null;
};

BX.checkNode = function(obj, params)
{
	return _checkNode(obj, params);
};

BX.findFormElements = function(form)
{
	if (BX.type.isString(form))
		form = document.forms[form]||BX(form);

	var res = [];

	if (BX.type.isElementNode(form))
	{
		if (form.tagName.toUpperCase() == 'FORM')
		{
			res = form.elements;
		}
		else
		{
			res = BX.findChildren(form, CHECK_FORM_ELEMENTS, true);
		}
	}

	return res;
};

BX.isParentForNode = function(whichNode, forNode)
{

	if(!BX.type.isDomNode(whichNode) || !BX.type.isDomNode(forNode))
		return false;

	while(true){

		if(whichNode == forNode)
			return true;

		if(forNode && forNode.parentNode)
			forNode = forNode.parentNode;
		else
			break;
	}

	return false;
};

BX.clone = function(obj, bCopyObj)
{
	var _obj, i, l;
	if (bCopyObj !== false)
		bCopyObj = true;

	if (obj === null)
		return null;

	if (BX.type.isDomNode(obj))
	{
		_obj = obj.cloneNode(bCopyObj);
	}
	else if (typeof obj == 'object')
	{
		if (BX.type.isArray(obj))
		{
			_obj = [];
			for (i=0,l=obj.length;i<l;i++)
			{
				if (typeof obj[i] == "object" && bCopyObj)
					_obj[i] = BX.clone(obj[i], bCopyObj);
				else
					_obj[i] = obj[i];
			}
		}
		else
		{
			_obj =  {};
			if (obj.constructor)
			{
				if (BX.type.isDate(obj))
					_obj = new Date(obj);
				else
					_obj = new obj.constructor();
			}

			for (i in obj)
			{
				if (typeof obj[i] == "object" && bCopyObj)
					_obj[i] = BX.clone(obj[i], bCopyObj);
				else
					_obj[i] = obj[i];
			}
		}

	}
	else
	{
		_obj = obj;
	}

	return _obj;
};

// access private. use BX.mergeEx instead.
// todo: refactor BX.merge, make it work through BX.mergeEx
BX.merge = function(){
	var arg = Array.prototype.slice.call(arguments);

	if(arg.length < 2)
		return {};

	var result = arg.shift();

	for(var i = 0; i < arg.length; i++)
	{
		for(var k in arg[i]){

			if(typeof arg[i] == 'undefined' || arg[i] == null)
				continue;

			if(arg[i].hasOwnProperty(k)){

				if(typeof arg[i][k] == 'undefined' || arg[i][k] == null)
					continue;

				if(typeof arg[i][k] == 'object' && !BX.type.isDomNode(arg[i][k]) && (typeof arg[i][k]['isUIWidget'] == 'undefined')){

					// go deeper

					var isArray = 'length' in arg[i][k];

					if(typeof result[k] != 'object')
						result[k] = isArray ? [] : {};

					if(isArray)
						BX.util.array_merge(result[k], arg[i][k]);
					else
						BX.merge(result[k], arg[i][k]);

				}else
					result[k] = arg[i][k];
			}
		}
	}

	return result;
};

BX.mergeEx = function()
{
	var arg = Array.prototype.slice.call(arguments);
	if(arg.length < 2)
	{
		return {};
	}

	var result = arg.shift();
	for (var i = 0; i < arg.length; i++)
	{
		for (var k in arg[i])
		{
			if (typeof arg[i] == "undefined" || arg[i] == null || !arg[i].hasOwnProperty(k))
			{
				continue;
			}

			if (BX.type.isPlainObject(arg[i][k]) && BX.type.isPlainObject(result[k]))
			{
				BX.mergeEx(result[k], arg[i][k]);
			}
			else
			{
				result[k] = BX.type.isPlainObject(arg[i][k]) ? BX.clone(arg[i][k]) : arg[i][k];
			}
		}
	}

	return result;
};

/* events */
BX.bind = function(el, evname, func)
{
	if (!el)
	{
		return;
	}

	if (evname === 'mousewheel')
	{
		BX.bind(el, 'DOMMouseScroll', func);
	}
	else if (evname === 'transitionend')
	{
		BX.bind(el, 'webkitTransitionEnd', func);
		BX.bind(el, 'msTransitionEnd', func);
		BX.bind(el, 'oTransitionEnd', func);
		// IE8-9 doesn't support this feature!
	}
	else if (evname === 'bxchange')
	{
		BX.bind(el, "change", func);
		BX.bind(el, "cut", func);
		BX.bind(el, "paste", func);
		BX.bind(el, "drop", func);
		BX.bind(el, "keyup", func);

		return;
	}
	else if (evname === 'fullscreenchange')
	{
		if (document.cancelFullScreen)
			BX.bind(el, "fullscreenchange", func);
		else if (document.mozCancelFullScreen)
			BX.bind(el, "mozfullscreenchange", func);
		else if (document.webkitCancelFullScreen)
			BX.bind(el, "webkitfullscreenchange", func);
	}

	if (el.addEventListener) // Gecko / W3C
	{
		el.addEventListener(evname, func, false);
	}
	else if (el.attachEvent) // IE
	{
		el.attachEvent("on" + evname, BX.proxy(func, el));
	}
	else
	{
		try
		{
			el["on" + evname] = func;
		}
		catch(e)
		{
			BX.debug(e)
		}
	}

	eventsList[eventsList.length] = {'element': el, 'event': evname, 'fn': func};
};

BX.unbind = function(el, evname, func)
{
	if (!el)
	{
		return;
	}

	if (evname === 'mousewheel')
	{
		BX.unbind(el, 'DOMMouseScroll', func);
	}
	else if (evname === 'transitionend')
	{
		BX.unbind(el, 'webkitTransitionEnd', func);
		BX.unbind(el, 'msTransitionEnd', func);
		BX.unbind(el, 'oTransitionEnd', func);
	}
	else if (evname === 'bxchange')
	{
		BX.unbind(el, "change", func);
		BX.unbind(el, "cut", func);
		BX.unbind(el, "paste", func);
		BX.unbind(el, "drop", func);
		BX.unbind(el, "keyup", func);

		return;
	}

	if(el.removeEventListener) // Gecko / W3C
	{
		el.removeEventListener(evname, func, false);
	}
	else if(el.detachEvent) // IE
	{
		el.detachEvent("on" + evname, BX.proxy(func, el));
	}
	else
	{
		el["on" + evname] = null;
	}
};

BX.getEventButton = function(e)
{
	e = e || window.event;

	var flags = 0;

	if (typeof e.which != 'undefined')
	{
		switch (e.which)
		{
			case 1: flags = flags|BX.MSLEFT; break;
			case 2: flags = flags|BX.MSMIDDLE; break;
			case 3: flags = flags|BX.MSRIGHT; break;
		}
	}
	else if (typeof e.button != 'undefined')
	{
		flags = event.button;
	}

	return flags || BX.MSLEFT;
};

BX.unbindAll = function(el)
{
	if (!el)
		return;

	for (var i=0,len=eventsList.length; i<len; i++)
	{
		try
		{
			if (eventsList[i] && (null==el || el==eventsList[i].element))
			{
				BX.unbind(eventsList[i].element, eventsList[i].event, eventsList[i].fn);
				eventsList[i] = null;
			}
		}
		catch(e){}
	}

	if (null==el)
	{
		eventsList = [];
	}
};

var captured_events = null, _bind = null;
BX.CaptureEvents = function(el_c, evname_c)
{
	if (_bind)
		return;

	_bind = BX.bind;
	captured_events = [];

	BX.bind = function(el, evname, func)
	{
		if (el === el_c && evname === evname_c)
			captured_events.push(func);

		_bind.apply(this, arguments);
	}
};

BX.CaptureEventsGet = function()
{
	if (_bind)
	{
		BX.bind = _bind;

		var captured = captured_events;

		_bind = null;
		captured_events = null;
		return captured;
	}
	return null;
};

// Don't even try to use it for submit event!
BX.fireEvent = function(ob,ev)
{
	var result = false, e = null;
	if (BX.type.isDomNode(ob))
	{
		result = true;
		if (document.createEventObject)
		{
			// IE
			if (eventTypes[ev] != 'MouseEvent')
			{
				e = document.createEventObject();
				e.type = ev;
				result = ob.fireEvent('on' + ev, e);
			}

			if (ob[ev])
			{
				ob[ev]();
			}
		}
		else
		{
			// non-IE
			e = null;

			switch (eventTypes[ev])
			{
				case 'MouseEvent':
					e = document.createEvent('MouseEvent');
					try
					{
						e.initMouseEvent(ev, true, true, top, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, null);
					}
					catch (initException)
					{
						e.initMouseEvent(ev, true, true, window, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, null);
					}

				break;
				default:
					e = document.createEvent('Event');
					e.initEvent(ev, true, true);
			}

			result = ob.dispatchEvent(e);
		}
	}

	return result;
};

BX.getWheelData = function(e)
{
	e = e || window.event;
	e.wheelData = e.detail ? e.detail * -1 : e.wheelDelta / 40;
	return e.wheelData;
};

BX.proxy_context = null;

BX.delegate = function (func, thisObject)
{
	if (!func || !thisObject)
		return func;

	return function() {
		var cur = BX.proxy_context;
		BX.proxy_context = this;
		var res = func.apply(thisObject, arguments);
		BX.proxy_context = cur;
		return res;
	}
};

BX.delegateLater = function (func_name, thisObject, contextObject)
{
	return function()
	{
		if (thisObject[func_name])
		{
			var cur = BX.proxy_context;
			BX.proxy_context = this;
			var res = thisObject[func_name].apply(contextObject||thisObject, arguments);
			BX.proxy_context = cur;
			return res;
		}
		return null;
	}
};

BX._initObjectProxy = function(thisObject)
{
	if (typeof thisObject['__proxy_id_' + proxySalt] == 'undefined')
	{
		thisObject['__proxy_id_' + proxySalt] = proxyList.length;
		proxyList[thisObject['__proxy_id_' + proxySalt]] = {};
	}
};

BX.proxy = function(func, thisObject)
{
	if (!func || !thisObject)
		return func;

	BX._initObjectProxy(thisObject);

	if (typeof func['__proxy_id_' + proxySalt] == 'undefined')
		func['__proxy_id_' + proxySalt] = proxyId++;

	if (!proxyList[thisObject['__proxy_id_' + proxySalt]][func['__proxy_id_' + proxySalt]])
		proxyList[thisObject['__proxy_id_' + proxySalt]][func['__proxy_id_' + proxySalt]] = BX.delegate(func, thisObject);

	return proxyList[thisObject['__proxy_id_' + proxySalt]][func['__proxy_id_' + proxySalt]];
};

BX.defer = function(func, thisObject)
{
	if (!!thisObject)
		return BX.defer_proxy(func, thisObject);
	else
		return function() {
			var arg = arguments;
			setTimeout(function(){func.apply(this,arg)}, 10);
		};
};

BX.defer_proxy = function(func, thisObject)
{
	if (!func || !thisObject)
		return func;

	BX.proxy(func, thisObject);

	this._initObjectProxy(thisObject);

	if (typeof func['__defer_id_' + proxySalt] == 'undefined')
		func['__defer_id_' + proxySalt] = proxyId++;

	if (!proxyList[thisObject['__proxy_id_' + proxySalt]][func['__defer_id_' + proxySalt]])
	{
		proxyList[thisObject['__proxy_id_' + proxySalt]][func['__defer_id_' + proxySalt]] = BX.defer(BX.delegate(func, thisObject));
	}

	return proxyList[thisObject['__proxy_id_' + proxySalt]][func['__defer_id_' + proxySalt]];
};

BX.once = function(el, evname, func)
{
	if (typeof func['__once_id_' + evname + '_' + proxySalt] == 'undefined')
	{
		func['__once_id_' + evname + '_' + proxySalt] = proxyId++;
	}

	this._initObjectProxy(el);

	if (!proxyList[el['__proxy_id_' + proxySalt]][func['__once_id_' + evname + '_' + proxySalt]])
	{
		var g = function()
		{
			BX.unbind(el, evname, g);
			func.apply(this, arguments);
		};

		proxyList[el['__proxy_id_' + proxySalt]][func['__once_id_' + evname + '_' + proxySalt]] = g;
	}

	return proxyList[el['__proxy_id_' + proxySalt]][func['__once_id_' + evname + '_' + proxySalt]];
};

BX.bindDelegate = function (elem, eventName, isTarget, handler)
{
	var h = BX.delegateEvent(isTarget, handler);
	BX.bind(elem, eventName, h);
	return h;
};

BX.delegateEvent = function(isTarget, handler)
{
	return function(e)
	{
		e = e || window.event;
		var target = e.target || e.srcElement;

		while (target != this)
		{
			if (_checkNode(target, isTarget))
			{
				return handler.call(target, e);
			}
			if (target && target.parentNode)
				target = target.parentNode;
			else
				break;
		}
		return null;
	}
};

BX.False = function() {return false;};
BX.DoNothing = function() {};

// TODO: also check event handlers set via BX.bind()
BX.denyEvent = function(el, ev)
{
	deniedEvents.push([el, ev, el['on' + ev]]);
	el['on' + ev] = BX.DoNothing;
};

BX.allowEvent = function(el, ev)
{
	for(var i=0, len=deniedEvents.length; i<len; i++)
	{
		if (deniedEvents[i][0] == el && deniedEvents[i][1] == ev)
		{
			el['on' + ev] = deniedEvents[i][2];
			BX.util.deleteFromArray(deniedEvents, i);
			return;
		}
	}
};

BX.fixEventPageXY = function(event)
{
	BX.fixEventPageX(event);
	BX.fixEventPageY(event);
	return event;
};

BX.fixEventPageX = function(event)
{
	if (event.pageX == null && event.clientX != null)
	{
		event.pageX =
			event.clientX +
			(document.documentElement && document.documentElement.scrollLeft || document.body && document.body.scrollLeft || 0) -
			(document.documentElement.clientLeft || 0);
	}

	return event;
};

BX.fixEventPageY = function(event)
{
	if (event.pageY == null && event.clientY != null)
	{
		event.pageY =
			event.clientY +
			(document.documentElement && document.documentElement.scrollTop || document.body && document.body.scrollTop || 0) -
			(document.documentElement.clientTop || 0);
	}

	return event;
};

/**
 * @deprecated
 * @see e.preventDefault()
 */
BX.PreventDefault = function(e)
{
	if(!e) e = window.event;
	if(e.stopPropagation)
	{
		e.preventDefault();
		e.stopPropagation();
	}
	else
	{
		e.cancelBubble = true;
		e.returnValue = false;
	}
	return false;
};

BX.eventReturnFalse = function(e)
{
	e=e||window.event;
	if (e && e.preventDefault) e.preventDefault();
	else e.returnValue = false;
	return false;
};

BX.eventCancelBubble = function(e)
{
	e=e||window.event;
	if(e && e.stopPropagation)
		e.stopPropagation();
	else
		e.cancelBubble = true;
};

/* custom events */
/*
	BX.addCustomEvent(eventObject, eventName, eventHandler) - set custom event handler for particular object
	BX.addCustomEvent(eventName, eventHandler) - set custom event handler for all objects
*/
BX.addCustomEvent = function(eventObject, eventName, eventHandler)
{
	/* shift parameters for short version */
	if (BX.type.isString(eventObject))
	{
		eventHandler = eventName;
		eventName = eventObject;
		eventObject = window;
	}

	eventName = eventName.toUpperCase();

	if (!customEvents[eventName])
		customEvents[eventName] = [];

	customEvents[eventName].push(
		{
			handler: eventHandler,
			obj: eventObject
		}
	);
};

BX.removeCustomEvent = function(eventObject, eventName, eventHandler)
{
	/* shift parameters for short version */
	if (BX.type.isString(eventObject))
	{
		eventHandler = eventName;
		eventName = eventObject;
		eventObject = window;
	}

	eventName = eventName.toUpperCase();

	if (!customEvents[eventName])
		return;

	for (var i = 0, l = customEvents[eventName].length; i < l; i++)
	{
		if (!customEvents[eventName][i])
			continue;
		if (customEvents[eventName][i].handler == eventHandler && customEvents[eventName][i].obj == eventObject)
		{
			delete customEvents[eventName][i];
			return;
		}
	}
};

// Warning! Don't use secureParams with DOM nodes in arEventParams
BX.onCustomEvent = function(eventObject, eventName, arEventParams, secureParams)
{
	/* shift parameters for short version */
	if (BX.type.isString(eventObject))
	{
		secureParams = arEventParams;
		arEventParams = eventName;
		eventName = eventObject;
		eventObject = window;
	}

	eventName = eventName.toUpperCase();

	if (!customEvents[eventName])
		return;

	if (!arEventParams)
		arEventParams = [];

	var h;
	for (var i = 0, l = customEvents[eventName].length; i < l; i++)
	{
		h = customEvents[eventName][i];
		if (!h || !h.handler)
			continue;

		if (h.obj == window || /*eventObject == window || */h.obj == eventObject) //- only global event handlers will be called
		{
			h.handler.apply(eventObject, !!secureParams ? BX.clone(arEventParams) : arEventParams);
		}
	}
};

BX.bindDebouncedChange = function(node, fn, fnInstant, timeout, ctx)
{
	ctx = ctx || window;
	timeout = timeout || 300;

	var dataTag = 'bx-dc-previous-value';
	BX.data(node, dataTag, node.value);

	var act = function(fn, val){

		var pVal = BX.data(node, dataTag);

		if(typeof pVal == 'undefined' || pVal != val){
			if(typeof ctx != 'object')
				fn(val);
			else
				fn.apply(ctx, [val]);
		}
	};

	var actD = BX.debounce(function(){
		var val = node.value;
		act(fn, val);
		BX.data(node, dataTag, val);
	}, timeout);

	BX.bind(node, 'keyup', actD);
	BX.bind(node, 'change', actD);
	BX.bind(node, 'input', actD);

	if(BX.type.isFunction(fnInstant)){

		var actI = function(){
			act(fnInstant, node.value);
		};

		BX.bind(node, 'keyup', actI);
		BX.bind(node, 'change', actI);
		BX.bind(node, 'input', actI);
	}
};

BX.parseJSON = function(data, context)
{
	var result = null;
	if (BX.type.isString(data))
	{
		try {
			if (data.indexOf("\n") >= 0)
				eval('result = ' + data);
			else
				result = (new Function("return " + data))();
		} catch(e) {
			BX.onCustomEvent(context, 'onParseJSONFailure', [data, context])
		}
	}
	else if(BX.type.isPlainObject(data))
	{
		return data;
	}

	return result;
};

/* ready */
BX.isReady = false;
BX.ready = function(handler)
{
	bindReady();

	if (!BX.type.isFunction(handler))
	{
		BX.debug('READY: not a function! ', handler);
	}
	else
	{
		if (BX.isReady)
			handler.call(document);
		else if (readyList)
			readyList.push(handler);
	}
};

BX.submit = function(obForm, action_name, action_value, onAfterSubmit)
{
	action_name = action_name || 'save';
	if (!obForm['BXFormSubmit_' + action_name])
	{
		obForm['BXFormSubmit_' + action_name] = obForm.appendChild(BX.create('INPUT', {
			'props': {
				'type': 'submit',
				'name': action_name,
				'value': action_value || 'Y'
			},
			'style': {
				'display': 'none'
			}
		}));
	}

	if (obForm.sessid)
		obForm.sessid.value = BX.bitrix_sessid();

	setTimeout(BX.delegate(function() {BX.fireEvent(this, 'click'); if (onAfterSubmit) onAfterSubmit();}, obForm['BXFormSubmit_' + action_name]), 10);
};

// returns function which runs fn in timeout ms after returned function is finished being called
BX.debounce = function(fn, timeout, ctx)
{
	var timer = 0;

	return function()
	{
		ctx = ctx || this;
		var args = arguments;

		clearTimeout(timer);

		timer = setTimeout(function()
		{
			fn.apply(ctx, args);
		}, timeout);
	}
};

// returns function which runs fn and repeats every timeout ms while returned function is being called
BX.throttle = function(fn, timeout, ctx)
{

	var timer = 0,
		args = null,
		invoke;

	return function()
	{
		ctx = ctx || this;
		args = arguments;
		invoke = true;

		if(!timer)
		{
			var q = function()
			{
				if(invoke)
				{
					fn.apply(ctx, args);
					invoke = false;
					timer = setTimeout(q, timeout);
				}
				else
				{
					timer = null;
				}
			};
			q();
		}
	};
};

/* browser detection */
BX.browser = {

	IsIE: function()
	{
		return bIE;
	},

	IsIE6: function()
	{
		return (/MSIE 6/i.test(navigator.userAgent));
	},

	IsIE7: function()
	{
		return (/MSIE 7/i.test(navigator.userAgent));
	},

	IsIE8: function()
	{
		return (/MSIE 8/i.test(navigator.userAgent));
	},

	IsIE9: function()
	{
		return !!document.documentMode && document.documentMode >= 9;
	},

	IsIE10: function()
	{
		return !!document.documentMode && document.documentMode >= 10;
	},

	IsIE11: function()
	{
		return BX.browser.DetectIeVersion() >= 11;
	},

	IsOpera: function()
	{
		return bOpera;
	},

	IsSafari: function()
	{
		return bSafari;
	},

	IsFirefox: function()
	{
		return bFirefox;
	},

	IsChrome: function()
	{
		return bChrome;
	},

	IsMac: function()
	{
		return (/Macintosh/i.test(navigator.userAgent));
	},

	IsAndroid: function()
	{
		return (/Android/i.test(navigator.userAgent));
	},

	IsIOS: function()
	{
		return (/(iPad;)|(iPhone;)/i.test(navigator.userAgent));
	},

	IsMobile: function()
	{
		return (/(ipad|iphone|android|mobile|touch)/i.test(navigator.userAgent));
	},

	DetectIeVersion: function()
	{
		if(BX.browser.IsOpera() || BX.browser.IsSafari() || BX.browser.IsFirefox() || BX.browser.IsChrome())
		{
			return -1;
		}

		var rv = -1;
		if (!!(window.MSStream) && !(window.ActiveXObject) && ("ActiveXObject" in window))
		{
			//Primary check for IE 11 based on ActiveXObject behaviour (please see http://msdn.microsoft.com/en-us/library/ie/dn423948%28v=vs.85%29.aspx)
			rv = 11;
		}
		else if (BX.browser.IsIE10())
		{
			rv = 10;
		}
		else if (BX.browser.IsIE9())
		{
			rv = 9;
		}
		else if (BX.browser.IsIE())
		{
			rv = 8;
		}

		if (rv == -1 || rv == 8)
		{
			var re;
			if (navigator.appName == "Microsoft Internet Explorer")
			{
				re = new RegExp("MSIE ([0-9]+[\.0-9]*)");
				if (re.exec(navigator.userAgent) != null)
					rv = parseFloat( RegExp.$1 );
			}
			else if (navigator.appName == "Netscape")
			{
				//Alternative check for IE 11
				rv = 11;
				re = new RegExp("Trident/.*rv:([0-9]+[\.0-9]*)");
				if (re.exec(navigator.userAgent) != null)
					rv = parseFloat( RegExp.$1 );
			}
		}

		return rv;
	},

	IsDoctype: function(pDoc)
	{
		pDoc = pDoc || document;

		if (pDoc.compatMode)
			return (pDoc.compatMode == "CSS1Compat");

		return (pDoc.documentElement && pDoc.documentElement.clientHeight);
	},

	SupportLocalStorage: function()
	{
		return !!BX.localStorage && !!BX.localStorage.checkBrowser()
	},

	addGlobalClass: function() {

		var globalClass = "bx-core";
		if (BX.hasClass(document.documentElement, globalClass))
		{
			return;
		}

		//Mobile
		if (BX.browser.IsIOS())
		{
			globalClass += " bx-ios";
		}
		else if (BX.browser.IsMac())
		{
			globalClass += " bx-mac";
		}
		else if (BX.browser.IsAndroid())
		{
			globalClass += " bx-android";
		}

		globalClass += (BX.browser.IsMobile() ? " bx-touch" : " bx-no-touch");
		globalClass += (BX.browser.isRetina() ? " bx-retina" : " bx-no-retina");

		//Desktop
		var ieVersion = -1;
		if (/AppleWebKit/.test(navigator.userAgent))
		{
			globalClass += " bx-chrome";
		}
		else if ((ieVersion = BX.browser.DetectIeVersion()) > 0)
		{
			globalClass += " bx-ie bx-ie" + ieVersion;
			if (ieVersion > 7 && ieVersion < 10 && !BX.browser.IsDoctype())
			{
				// it seems IE10 doesn't have any specific bugs like others event in quirks mode
				globalClass += " bx-quirks";
			}
		}
		else if (/Opera/.test(navigator.userAgent))
		{
			globalClass += " bx-opera";
		}
		else if (/Gecko/.test(navigator.userAgent))
		{
			globalClass += " bx-firefox";
		}

		BX.addClass(document.documentElement, globalClass);
	},

	isPropertySupported: function(jsProperty, bReturnCSSName)
	{
		if (!BX.type.isNotEmptyString(jsProperty))
			return false;

		var property = jsProperty.indexOf("-") > -1 ? getJsName(jsProperty) : jsProperty;
		bReturnCSSName = !!bReturnCSSName;

		var ucProperty = property.charAt(0).toUpperCase() + property.slice(1);
		var properties = (property + ' ' + ["Webkit", "Moz", "O", "ms"].join(ucProperty + " ") + ucProperty).split(" ");
		var obj = document.body || document.documentElement;

		for (var i = 0; i < properties.length; i++)
		{
			var prop = properties[i];
			if (obj.style[prop] !== undefined)
			{
				var prefix = prop == property
							? ""
							: "-" + prop.substr(0, prop.length - property.length).toLowerCase() + "-";
				return bReturnCSSName ? prefix + getCssName(property) : prop;
			}
		}

		function getCssName(propertyName)
		{
			return propertyName.replace(/([A-Z])/g, function() { return "-" + arguments[1].toLowerCase(); } )
		}

		function getJsName(cssName)
		{
			var reg = /(\-([a-z]){1})/g;
			if (reg.test(cssName))
				return cssName.replace(reg, function () {return arguments[2].toUpperCase();});
			else
				return cssName;
		}

		return false;
	},

	addGlobalFeatures : function(features, prefix)
	{
		if (!BX.type.isArray(features))
			return;

		var classNames = [];
		for (var i = 0; i < features.length; i++)
		{
			var support = !!BX.browser.isPropertySupported(features[i]);
			classNames.push( "bx-" + (support ? "" : "no-") + features[i].toLowerCase());
		}
		BX.addClass(document.documentElement, classNames.join(" "));
	},

	isRetina : function()
	{
		return window.devicePixelRatio && window.devicePixelRatio >= 2;
	}
};

/* low-level fx funcitons*/
BX.show = function(ob, displayType)
{
	if (ob.BXDISPLAY || !_checkDisplay(ob, displayType))
	{
		ob.style.display = ob.BXDISPLAY;
	}
};

BX.hide = function(ob, displayType)
{
	if (!ob.BXDISPLAY)
		_checkDisplay(ob, displayType);

	ob.style.display = 'none';
};

BX.toggle = function(ob, values)
{
	if (!values && BX.type.isElementNode(ob))
	{
		var bShow = true;
		if (ob.BXDISPLAY)
			bShow = !_checkDisplay(ob);
		else
			bShow = ob.style.display == 'none';

		if (bShow)
			BX.show(ob);
		else
			BX.hide(ob);
	}
	else if (BX.type.isArray(values))
	{
		for (var i=0,len=values.length; i<len; i++)
		{
			if (ob == values[i])
			{
				ob = values[i==len-1 ? 0 : i+1];
				break;
			}
		}
		if (i==len)
			ob = values[0];
	}

	return ob;
};

/* some useful util functions */

BX.util = {
	array_values: function(ar)
	{
		if (!BX.type.isArray(ar))
			return BX.util._array_values_ob(ar);
		var arv = [];
		for(var i=0,l=ar.length;i<l;i++)
			if (ar[i] !== null && typeof ar[i] != 'undefined')
				arv.push(ar[i]);
		return arv;
	},

	_array_values_ob: function(ar)
	{
		var arv = [];
		for(var i in ar)
			if (ar[i] !== null && typeof ar[i] != 'undefined')
				arv.push(ar[i]);
		return arv;
	},

	array_keys: function(ar)
	{
		if (!BX.type.isArray(ar))
			return BX.util._array_keys_ob(ar);
		var arv = [];
		for(var i=0,l=ar.length;i<l;i++)
			if (ar[i] !== null && typeof ar[i] != 'undefined')
				arv.push(i);
		return arv;
	},

	_array_keys_ob: function(ar)
	{
		var arv = [];
		for(var i in ar)
			if (ar[i] !== null && typeof ar[i] != 'undefined')
				arv.push(i);
		return arv;
	},

	object_keys: function(obj)
	{
		var arv = [];
		for(var k in obj)
		{
			if(obj.hasOwnProperty(k))
			{
				arv.push(k);
			}
		}
		return arv;
	},

	array_merge: function(first, second)
	{
		if (!BX.type.isArray(first)) first = [];
		if (!BX.type.isArray(second)) second = [];

		var i = first.length, j = 0;

		if (typeof second.length === "number")
		{
			for (var l = second.length; j < l; j++)
			{
				first[i++] = second[j];
			}
		}
		else
		{
			while (second[j] !== undefined)
			{
				first[i++] = second[j++];
			}
		}

		first.length = i;

		return first;
	},
	
	array_flip: function ( object ) 
	{
	    var newObject = {};
		
	    for (var key in object) 
		{
	        newObject[object[key]] = key;
	    }
		
	    return newObject;
	},

	array_unique: function(ar)
	{
		var i=0,j,len=ar.length;
		if(len<2) return ar;

		for (; i<len-1;i++)
		{
			for (j=i+1; j<len;j++)
			{
				if (ar[i]==ar[j])
				{
					ar.splice(j--,1); len--;
				}
			}
		}

		return ar;
	},

	in_array: function(needle, haystack)
	{
		for(var i=0; i<haystack.length; i++)
		{
			if(haystack[i] == needle)
				return true;
		}
		return false;
	},

	array_search: function(needle, haystack)
	{
		for(var i=0; i<haystack.length; i++)
		{
			if(haystack[i] == needle)
				return i;
		}
		return -1;
	},

	object_search_key: function(needle, haystack)
	{
		if (typeof haystack[needle] != 'undefined')
			return haystack[needle];

		for(var i in haystack)
		{
			if (typeof haystack[i] == "object")
			{
				var result = BX.util.object_search_key(needle, haystack[i]);
				if (result !== false)
					return result;
			}
		}
		return false;
	},

	trim: function(s)
	{
		if (BX.type.isString(s))
			return s.replace(r.ltrim, '').replace(r.rtrim, '');
		else
			return s;
	},

	urlencode: function(s){return encodeURIComponent(s);},

	// it may also be useful. via sVD.
	deleteFromArray: function(ar, ind) {return ar.slice(0, ind).concat(ar.slice(ind + 1));},
	insertIntoArray: function(ar, ind, el) {return ar.slice(0, ind).concat([el]).concat(ar.slice(ind));},

	htmlspecialchars: function(str)
	{
		if(!str.replace) return str;

		return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	},

	htmlspecialcharsback: function(str)
	{
		if(!str.replace) return str;

		return str.replace(/\&quot;/g, '"').replace(/&#39;/g, "'").replace(/\&lt;/g, '<').replace(/\&gt;/g, '>').replace(/\&amp;/g, '&');
	},

	// Quote regular expression characters plus an optional character
	preg_quote: function(str, delimiter)
	{
		if(!str.replace)
			return str;
		return str.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
	},

	jsencode: function(str)
	{
		if (!str || !str.replace)
			return str;

		var escapes =
		[
			{ c: "\\\\", r: "\\\\" }, // should be first
			{ c: "\\t", r: "\\t" },
			{ c: "\\n", r: "\\n" },
			{ c: "\\r", r: "\\r" },
			{ c: "\"", r: "\\\"" },
			{ c: "'", r: "\\'" },
			{ c: "<", r: "\\x3C" },
			{ c: ">", r: "\\x3E" },
			{ c: "\\u2028", r: "\\u2028" },
			{ c: "\\u2029", r: "\\u2029" }
		];
		for (var i = 0; i < escapes.length; i++)
			str = str.replace(new RegExp(escapes[i].c, 'g'), escapes[i].r);
		return str;
	},

	nl2br: function(str)
	{
		if (!str || !str.replace)
			return str;

		return str.replace(/([^>])\n/g, '$1<br/>');
	},

	str_pad: function(input, pad_length, pad_string, pad_type)
	{
		pad_string = pad_string || ' ';
		pad_type = pad_type || 'right';
		input = input.toString();

		if (pad_type == 'left')
			return BX.util.str_pad_left(input, pad_length, pad_string);
		else
			return BX.util.str_pad_right(input, pad_length, pad_string);

	},

	str_pad_left: function(input, pad_length, pad_string)
	{
		var i = input.length, q=pad_string.length;
		if (i >= pad_length) return input;

		for(;i<pad_length;i+=q)
			input = pad_string + input;

		return input;
	},

	str_pad_right: function(input, pad_length, pad_string)
	{
		var i = input.length, q=pad_string.length;
		if (i >= pad_length) return input;

		for(;i<pad_length;i+=q)
			input += pad_string;

		return input;
	},

	strip_tags: function(str)
	{
		return str.split(/<[^>]+>/g).join('');
	},

	strip_php_tags: function(str)
	{
		return str.replace(/<\?(.|[\r\n])*?\?>/g, '');
	},

	popup: function(url, width, height)
	{
		var w, h;
		if(BX.browser.IsOpera())
		{
			w = document.body.offsetWidth;
			h = document.body.offsetHeight;
		}
		else
		{
			w = screen.width;
			h = screen.height;
		}
		return window.open(url, '', 'status=no,scrollbars=yes,resizable=yes,width='+width+',height='+height+',top='+Math.floor((h - height)/2-14)+',left='+Math.floor((w - width)/2-5));
	},
	
	shuffle: function(array) 
	{
		var temporaryValue, randomIndex;
		var currentIndex = array.length;
		
		while (0 !== currentIndex) 
		{
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		
		return array;
	},

	// BX.util.objectSort(object, sortBy, sortDir) - Sort object by property
	// function params: 1 - object for sort, 2 - sort by property, 3 - sort direction (asc/desc)
	// return: sort array [[objectElement], [objectElement]] in sortDir direction

	// example: BX.util.objectSort({'L1': {'name': 'Last'}, 'F1': {'name': 'First'}}, 'name', 'asc');
	// return: [{'name' : 'First'}, {'name' : 'Last'}]
	objectSort: function(object, sortBy, sortDir)
	{
		sortDir = sortDir == 'asc'? 'asc': 'desc';

		var arItems = [], i;
		for (i in object)
		{
			if (object.hasOwnProperty(i) && object[i][sortBy])
			{
				arItems.push([i, object[i][sortBy]]);
			}
		}

		if (sortDir == 'asc')
		{
			arItems.sort(function(i, ii) {
				var s1, s2;
				if (!isNaN(i[1]) && !isNaN(ii[1]))
				{
					s1 = parseInt(i[1]);
					s2 = parseInt(ii[1]);
				}
				else
				{
					s1 = i[1].toString().toLowerCase();
					s2 = ii[1].toString().toLowerCase();
				}

				if (s1 > s2)
					return 1;
				else if (s1 < s2)
					return -1;
				else
					return 0;
			});
		}
		else
		{
			arItems.sort(function(i, ii) {
				var s1, s2;
				if (!isNaN(i[1]) && !isNaN(ii[1]))
				{
					s1 = parseInt(i[1]);
					s2 = parseInt(ii[1]);
				}
				else
				{
					s1 = i[1].toString().toLowerCase();
					s2 = ii[1].toString().toLowerCase();
				}
				if (s1 < s2)
					return 1;
				else if (s1 > s2)
					return -1;
				else
					return 0;
			});
		}

		var arReturnArray = Array();
		for (i = 0; i < arItems.length; i++)
		{
			arReturnArray.push(object[arItems[i][0]]);
		}

		return arReturnArray;
	},

	// #fdf9e5 => {r=253, g=249, b=229}
	hex2rgb: function(color)
	{
		var rgb = color.replace(/[# ]/g,"").replace(/^(.)(.)(.)$/,'$1$1$2$2$3$3').match(/.{2}/g);
		for (var i=0;  i<3; i++)
		{
			rgb[i] = parseInt(rgb[i], 16);
		}
		return {'r':rgb[0],'g':rgb[1],'b':rgb[2]};
	},

	remove_url_param: function(url, param)
	{
		if (BX.type.isArray(param))
		{
			for (var i=0; i<param.length; i++)
			{
				url = BX.util.remove_url_param(url, param[i]);
			}
		}
		else
		{
			var pos, params;
			if((pos = url.indexOf('?')) >= 0 && pos != url.length-1)
			{
				params = url.substr(pos + 1);
				url = url.substr(0, pos + 1);

				params = params.replace(new RegExp('(^|&)'+param+'=[^&#]*', 'i'), '');
				params = params.replace(/^&/, '');

				if(BX.type.isNotEmptyString(params))
				{
					url = url + params;
				}
				else
				{
					//remove trailing question character
					url = url.substr(0, url.length - 1);
				}
			}
		}
		return url;
	},

	/*
	{'param1': 'value1', 'param2': 'value2'}
	 */
	add_url_param: function(url, params)
	{
		var param;
		var additional = '';
		var hash = '';
		var pos;

		for(param in params)
		{
			url = this.remove_url_param(url, param);
			additional += (additional != ''? '&':'') + param + '=' + params[param];
		}

		if((pos = url.indexOf('#')) >= 0)
		{
			hash = url.substr(pos);
			url = url.substr(0, pos);
		}

		if((pos = url.indexOf('?')) >= 0)
		{
			url = url + (pos != url.length-1? '&' : '') + additional + hash;
		}
		else
		{
			url = url + '?' + additional + hash;
		}

		return url;
	},

	even: function(digit)
	{
		return (parseInt(digit) % 2 == 0);
	},

	hashCode: function(str)
	{
		if(!BX.type.isNotEmptyString(str))
		{
			return 0;
		}

		var hash = 0;
		for (var i = 0; i < str.length; i++)
		{
			var c = str.charCodeAt(i);
			hash = ((hash << 5) - hash) + c;
			hash = hash & hash;
		}
		return hash;
	},

	getRandomString: function (length)
	{
		var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var charQty = chars.length;

		length = parseInt(length);
		if(isNaN(length) || length <= 0)
		{
			length = 8;
		}

		var result = "";
		for (var i = 0; i < length; i++)
		{
			result += chars.charAt(Math.floor(Math.random() * charQty));
		}
		return result;
	},

	number_format: function(number, decimals, dec_point, thousands_sep)
	{
		var i, j, kw, kd, km, sign = '';
		decimals = Math.abs(decimals);
		if (isNaN(decimals) || decimals < 0)
		{
			decimals = 2;
		}
		dec_point = dec_point || ',';
		if (typeof thousands_sep === 'undefined')
			thousands_sep = '.';

		number = (+number || 0).toFixed(decimals);
		if (number < 0)
		{
			sign = '-';
			number = -number;
		}

		i = parseInt(number, 10) + '';
		j = (i.length > 3 ? i.length % 3 : 0);

		km = (j ? i.substr(0, j) + thousands_sep : '');
		kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
		kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, '0').slice(2) : '');

		return sign + km + kw + kd;
	},

	getExtension: function (url)
	{
		url = url || "";
		var items = url.split("?")[0].split(".");
		return items[items.length-1].toLowerCase();
	},
	addObjectToForm: function(object, form, prefix)
	{
		if(!BX.type.isString(prefix))
		{
			prefix = "";
		}

		for(var key in object)
		{
			if(!object.hasOwnProperty(key))
			{
				continue;
			}

			var value = object[key];
			var name = prefix !== "" ? (prefix + "[" + key + "]") : key;
			if(BX.type.isArray(value))
			{
				for(var i = 0; i < value.length; i++)
				{
					BX.util.addObjectToForm(value[i], form, (name + "[" + i.toString() + "]"));
				}
			}
			else if(BX.type.isPlainObject(value))
			{
				BX.util.addObjectToForm(value, form, name);
			}
			else
			{
				value = BX.type.isFunction(value.toString) ? value.toString() : "";
				if(value !== "")
				{
					form.appendChild(BX.create("INPUT", { attrs: { type: "hidden", name: name, value: value } }));
				}
			}
		}
	},

	observe: function(object, enable)
	{
		if (!BX.browser.IsChrome() || typeof(object) != 'object')
			return false;

		enable = enable !== false;

		var observer = function(options)
		{
			options.forEach(function(option){
				var groupName = option.name + ' changed';
				console.groupCollapsed(groupName);
				console.log('Old value: ', option.oldValue);
				console.log('New value: ', option.object[option.name]);
				console.groupEnd(groupName);
			});
		}
		if (enable)
		{
			Object.observe(object, observer);
		}
		else
		{
			Object.unobserve(object, observer);
		}

		return enable;
	}
};

BX.type = {
	isString: function(item) {
		return item === '' ? true : (item ? (typeof (item) == "string" || item instanceof String) : false);
	},
	isNotEmptyString: function(item) {
		return BX.type.isString(item) ? item.length > 0 : false;
	},
	isBoolean: function(item) {
		return item === true || item === false;
	},
	isNumber: function(item) {
		return item === 0 ? true : (item ? (typeof (item) == "number" || item instanceof Number) : false);
	},
	isFunction: function(item) {
		return item === null ? false : (typeof (item) == "function" || item instanceof Function);
	},
	isElementNode: function(item) {
		//document.body.ELEMENT_NODE;
		return item && typeof (item) == "object" && "nodeType" in item && item.nodeType == 1 && item.tagName && item.tagName.toUpperCase() != 'SCRIPT' && item.tagName.toUpperCase() != 'STYLE' && item.tagName.toUpperCase() != 'LINK';
	},
	isDomNode: function(item) {
		return item && typeof (item) == "object" && "nodeType" in item;
	},
	isArray: function(item) {
		return item && Object.prototype.toString.call(item) == "[object Array]";
	},
	isDate : function(item) {
		return item && Object.prototype.toString.call(item) == "[object Date]";
	},
	isPlainObject: function(item)
	{
		if(!item || typeof(item) !== "object" || item.nodeType)
		{
			return false;
		}

		var hasProp = Object.prototype.hasOwnProperty;
		try
		{
			if (item.constructor && !hasProp.call(item, "constructor") && !hasProp.call(item.constructor.prototype, "isPrototypeOf") )
			{
				return false;
			}
		}
		catch (e)
		{
			return false;
		}

		var key;
		for (key in item)
		{
		}
		return typeof(key) === "undefined" || hasProp.call(item, key);
	}
};

BX.isNodeInDom = function(node, doc)
{
	return node === (doc || document) ? true :
		(node.parentNode ? BX.isNodeInDom(node.parentNode) : false);
};

BX.isNodeHidden = function(node)
{
	if (node === document)
		return false;
	else if (BX.style(node, 'display') == 'none')
		return true;
	else
		return (node.parentNode ? BX.isNodeHidden(node.parentNode) : true);
};

BX.evalPack = function(code)
{
	while (code.length > 0)
	{
		var c = code.shift();

		if (c.TYPE == 'SCRIPT_EXT' || c.TYPE == 'SCRIPT_SRC')
		{
			BX.loadScript(c.DATA, function() {BX.evalPack(code)});
			return;
		}
		else if (c.TYPE == 'SCRIPT')
		{
			BX.evalGlobal(c.DATA);
		}
	}
};

BX.evalGlobal = function(data)
{
	if (data)
	{
		var head = document.getElementsByTagName("head")[0] || document.documentElement,
			script = document.createElement("script");

		script.type = "text/javascript";

		if (!BX.browser.IsIE())
		{
			script.appendChild(document.createTextNode(data));
		}
		else
		{
			script.text = data;
		}

		head.insertBefore(script, head.firstChild);
		head.removeChild(script);
	}
};

BX.processHTML = function(data, scriptsRunFirst)
{
	var matchScript, matchStyle, matchSrc, matchHref, matchType, scripts = [], styles = [];
	var textIndexes = [];
	var lastIndex = r.script.lastIndex = r.script_end.lastIndex = 0;

	while ((matchScript = r.script.exec(data)) !== null)
	{
		r.script_end.lastIndex = r.script.lastIndex;
		var matchScriptEnd = r.script_end.exec(data);
		if (matchScriptEnd === null)
		{
			break;
		}

		// skip script tags of special types
		var skipTag = false;
		if ((matchType = matchScript[1].match(r.script_type)) !== null)
		{
			if(matchType[1] == 'text/html' || matchType[1] == 'text/template')
				skipTag = true;
		}

		if(skipTag)
		{
			textIndexes.push([lastIndex, r.script_end.lastIndex - lastIndex]);
		}
		else
		{
			textIndexes.push([lastIndex, matchScript.index - lastIndex]);

			var bRunFirst = scriptsRunFirst || (matchScript[1].indexOf('bxrunfirst') != '-1');

			if ((matchSrc = matchScript[1].match(r.script_src)) !== null)
			{
				scripts.push({"bRunFirst": bRunFirst, "isInternal": false, "JS": matchSrc[1]});
			}
			else
			{
				var start = matchScript.index + matchScript[0].length;
				var js = data.substr(start, matchScriptEnd.index-start);

				scripts.push({"bRunFirst": bRunFirst, "isInternal": true, "JS": js});
			}
		}

		lastIndex = matchScriptEnd.index + 9;
		r.script.lastIndex = lastIndex;
	}

	textIndexes.push([lastIndex, lastIndex === 0 ? data.length : data.length - lastIndex]);
	var pureData = "";
	for (var i = 0, length = textIndexes.length; i < length; i++)
	{
		pureData += data.substr(textIndexes[i][0], textIndexes[i][1]);
	}

	while ((matchStyle = pureData.match(r.style)) !== null)
	{
		if ((matchHref = matchStyle[0].match(r.style_href)) !== null && matchStyle[0].indexOf('media="') < 0)
		{
			styles.push(matchHref[1]);
		}

		pureData = pureData.replace(matchStyle[0], '');
	}

	return {'HTML': pureData, 'SCRIPT': scripts, 'STYLE': styles};
};

BX.garbage = function(call, thisObject)
{
	garbageCollectors.push({callback: call, context: thisObject});
};

/* window pos functions */

BX.GetDocElement = function (pDoc)
{
	pDoc = pDoc || document;
	return (BX.browser.IsDoctype(pDoc) ? pDoc.documentElement : pDoc.body);
};

BX.GetContext = function(node)
{
	if (BX.type.isElementNode(node))
		return node.ownerDocument.parentWindow || node.ownerDocument.defaultView || window;
	else if (BX.type.isDomNode(node))
		return node.parentWindow || node.defaultView || window;
	else
		return window;
};

BX.GetWindowInnerSize = function(pDoc)
{
	var width, height;

	pDoc = pDoc || document;

	if (window.innerHeight) // all except Explorer
	{
		width = BX.GetContext(pDoc).innerWidth;
		height = BX.GetContext(pDoc).innerHeight;
	}
	else if (pDoc.documentElement && (pDoc.documentElement.clientHeight || pDoc.documentElement.clientWidth)) // Explorer 6 Strict Mode
	{
		width = pDoc.documentElement.clientWidth;
		height = pDoc.documentElement.clientHeight;
	}
	else if (pDoc.body) // other Explorers
	{
		width = pDoc.body.clientWidth;
		height = pDoc.body.clientHeight;
	}
	return {innerWidth : width, innerHeight : height};
};

BX.GetWindowScrollPos = function(pDoc)
{
	var left, top;

	pDoc = pDoc || document;

	if (window.pageYOffset) // all except Explorer
	{
		left = BX.GetContext(pDoc).pageXOffset;
		top = BX.GetContext(pDoc).pageYOffset;
	}
	else if (pDoc.documentElement && (pDoc.documentElement.scrollTop || pDoc.documentElement.scrollLeft)) // Explorer 6 Strict
	{
		left = pDoc.documentElement.scrollLeft;
		top = pDoc.documentElement.scrollTop;
	}
	else if (pDoc.body) // all other Explorers
	{
		left = pDoc.body.scrollLeft;
		top = pDoc.body.scrollTop;
	}
	return {scrollLeft : left, scrollTop : top};
};

BX.GetWindowScrollSize = function(pDoc)
{
	var width, height;
	if (!pDoc)
		pDoc = document;

	if ( (pDoc.compatMode && pDoc.compatMode == "CSS1Compat"))
	{
		width = pDoc.documentElement.scrollWidth;
		height = pDoc.documentElement.scrollHeight;
	}
	else
	{
		if (pDoc.body.scrollHeight > pDoc.body.offsetHeight)
			height = pDoc.body.scrollHeight;
		else
			height = pDoc.body.offsetHeight;

		if (pDoc.body.scrollWidth > pDoc.body.offsetWidth ||
			(pDoc.compatMode && pDoc.compatMode == "BackCompat") ||
			(pDoc.documentElement && !pDoc.documentElement.clientWidth)
		)
			width = pDoc.body.scrollWidth;
		else
			width = pDoc.body.offsetWidth;
	}
	return {scrollWidth : width, scrollHeight : height};
};

BX.GetWindowSize = function(pDoc)
{
	var innerSize = this.GetWindowInnerSize(pDoc);
	var scrollPos = this.GetWindowScrollPos(pDoc);
	var scrollSize = this.GetWindowScrollSize(pDoc);

	return  {
		innerWidth : innerSize.innerWidth, innerHeight : innerSize.innerHeight,
		scrollLeft : scrollPos.scrollLeft, scrollTop : scrollPos.scrollTop,
		scrollWidth : scrollSize.scrollWidth, scrollHeight : scrollSize.scrollHeight
	};
};

BX.scrollTop = function(node, val){
	if(typeof val != 'undefined'){

		if(node == window){
			throw new Error('scrollTop() for window is not implemented');
		}else
			node.scrollTop = parseInt(val);

	}else{

		if(node == window)
			return BX.GetWindowScrollPos().scrollTop;

		return node.scrollTop;
	}
}

BX.scrollLeft = function(node, val){
	if(typeof val != 'undefined'){

		if(node == window){
			throw new Error('scrollLeft() for window is not implemented');
		}else
			node.scrollLeft = parseInt(val);

	}else{

		if(node == window)
			return BX.GetWindowScrollPos().scrollLeft;

		return node.scrollLeft;
	}
}

BX.hide_object = function(ob)
{
	ob = BX(ob);
	ob.style.position = 'absolute';
	ob.style.top = '-1000px';
	ob.style.left = '-1000px';
	ob.style.height = '10px';
	ob.style.width = '10px';
};

BX.is_relative = function(el)
{
	var p = BX.style(el, 'position');
	return p == 'relative' || p == 'absolute';
};

BX.is_float = function(el)
{
	var p = BX.style(el, 'float');
	return p == 'right' || p == 'left';
};

BX.is_fixed = function(el)
{
	var p = BX.style(el, 'position');
	return p == 'fixed';
};

BX.pos = function(el, bRelative)
{
	var r = { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };
	bRelative = !!bRelative;
	if (!el)
		return r;
	if (typeof (el.getBoundingClientRect) != "undefined" && el.ownerDocument == document && !bRelative)
	{
		var clientRect = {};

		// getBoundingClientRect can return undefined and generate exception in some cases in IE8.
		try
		{
			clientRect = el.getBoundingClientRect();
		}
		catch(e)
		{
			clientRect =
			{
				top: el.offsetTop,
				left: el.offsetLeft,
				width: el.offsetWidth,
				height: el.offsetHeight,
				right: el.offsetLeft + el.offsetWidth,
				bottom: el.offsetTop + el.offsetHeight
			};
		}

		var root = document.documentElement;
		var body = document.body;

		r.top = clientRect.top + (root.scrollTop || body.scrollTop);
		r.left = clientRect.left + (root.scrollLeft || body.scrollLeft);
		r.width = clientRect.right - clientRect.left;
		r.height = clientRect.bottom - clientRect.top;
		r.right = clientRect.right + (root.scrollLeft || body.scrollLeft);
		r.bottom = clientRect.bottom + (root.scrollTop || body.scrollTop);
	}
	else
	{
		var x = 0, y = 0, w = el.offsetWidth, h = el.offsetHeight;
		var first = true;
		for (; el != null; el = el.offsetParent)
		{
			if (!first && bRelative && BX.is_relative(el))
				break;

			x += el.offsetLeft;
			y += el.offsetTop;
			if (first)
			{
				first = false;
				continue;
			}

			var elBorderLeftWidth = parseInt(BX.style(el, 'border-left-width')),
				elBorderTopWidth = parseInt(BX.style(el, 'border-top-width'));

			if (!isNaN(elBorderLeftWidth) && elBorderLeftWidth > 0)
				x += elBorderLeftWidth;
			if (!isNaN(elBorderTopWidth) && elBorderTopWidth > 0)
				y += elBorderTopWidth;
		}

		r.top = y;
		r.left = x;
		r.width = w;
		r.height = h;
		r.right = r.left + w;
		r.bottom = r.top + h;
	}

	for(var i in r)
	{
		if(r.hasOwnProperty(i))
		{
			r[i] = Math.round(r[i]);
		}
	}

	return r;
};

BX.width = function(node, val){
	if(typeof val != 'undefined')
		BX.style(node, 'width', parseInt(val)+'px');
	else{

		if(node == window)
			return window.innerWidth;

		//return parseInt(BX.style(node, 'width'));
		return BX.pos(node).width;
	}
}

BX.height = function(node, val){
	if(typeof val != 'undefined')
		BX.style(node, 'height', parseInt(val)+'px');
	else{

		if(node == window)
			return window.innerHeight;

		//return parseInt(BX.style(node, 'height'));
		return BX.pos(node).height;
	}
}

BX.align = function(pos, w, h, type)
{
	if (type)
		type = type.toLowerCase();
	else
		type = '';

	var pDoc = document;
	if (BX.type.isElementNode(pos))
	{
		pDoc = pos.ownerDocument;
		pos = BX.pos(pos);
	}

	var x = pos["left"], y = pos["bottom"];

	var scroll = BX.GetWindowScrollPos(pDoc);
	var size = BX.GetWindowInnerSize(pDoc);

	if((size.innerWidth + scroll.scrollLeft) - (pos["left"] + w) < 0)
	{
		if(pos["right"] - w >= 0 )
			x = pos["right"] - w;
		else
			x = scroll.scrollLeft;
	}

	if(((size.innerHeight + scroll.scrollTop) - (pos["bottom"] + h) < 0) || ~type.indexOf('top'))
	{
		if(pos["top"] - h >= 0 || ~type.indexOf('top'))
			y = pos["top"] - h;
		else
			y = scroll.scrollTop;
	}

	return {'left':x, 'top':y};
};

BX.scrollToNode = function(node)
{
	var obNode = BX(node);

	if (obNode.scrollIntoView)
		obNode.scrollIntoView(true);
	else
	{
		var arNodePos = BX.pos(obNode);
		window.scrollTo(arNodePos.left, arNodePos.top);
	}
};

/* non-xhr loadings */
BX.showWait = function(node, msg)
{
	node = BX(node) || document.body || document.documentElement;
	msg = msg || BX.message('JS_CORE_LOADING');

	var container_id = node.id || Math.random();

	var obMsg = node.bxmsg = document.body.appendChild(BX.create('DIV', {
		props: {
			id: 'wait_' + container_id
		},
		style: {
			background: 'url("/bitrix/js/main/core/images/wait.gif") no-repeat scroll 10px center #fcf7d1',
			border: '1px solid #E1B52D',
			color: 'black',
			fontFamily: 'Verdana,Arial,sans-serif',
			fontSize: '11px',
			padding: '10px 30px 10px 37px',
			position: 'absolute',
			zIndex:'10000',
			textAlign:'center'
		},
		text: msg
	}));

	setTimeout(BX.delegate(_adjustWait, node), 10);

	lastWait[lastWait.length] = obMsg;
	return obMsg;
};

BX.closeWait = function(node, obMsg)
{
	if(node && !obMsg)
		obMsg = node.bxmsg;
	if(node && !obMsg && BX.hasClass(node, 'bx-core-waitwindow'))
		obMsg = node;
	if(node && !obMsg)
		obMsg = BX('wait_' + node.id);
	if(!obMsg)
		obMsg = lastWait.pop();

	if (obMsg && obMsg.parentNode)
	{
		for (var i=0,len=lastWait.length;i<len;i++)
		{
			if (obMsg == lastWait[i])
			{
				lastWait = BX.util.deleteFromArray(lastWait, i);
				break;
			}
		}

		obMsg.parentNode.removeChild(obMsg);
		if (node) node.bxmsg = null;
		BX.cleanNode(obMsg, true);
	}
};

BX.setJSList = function(scripts)
{
	if (BX.type.isArray(scripts))
	{
		jsList = scripts;
	}
};

BX.getJSList = function()
{
	initJsList();
	return jsList;
};

BX.setCSSList = function(scripts)
{
	if (BX.type.isArray(scripts))
	{
		cssList = scripts;
	}
};

BX.getCSSList = function()
{
	initCssList();
	return cssList;
};

BX.getJSPath = function(js)
{
	return js.replace(/^(http[s]*:)*\/\/[^\/]+/i, '');
};

BX.getCSSPath = function(css)
{
	return css.replace(/^(http[s]*:)*\/\/[^\/]+/i, '');
};

BX.getCDNPath = function(path)
{
	return path;
};

BX.loadScript = function(script, callback, doc)
{
	if (BX.type.isString(script))
	{
		script = [script];
	}

	return BX.load(script, callback, doc);
};

BX.loadCSS = function(css, doc, win)
{
	if (BX.type.isString(css))
	{
		css = [css];
	}

	if (BX.type.isArray(css))
	{
		css = css.map(function(url) {
			return { url: url, ext: "css" }
		});

		BX.load(css, null, doc);
	}
};

BX.load = function(items, callback, doc)
{
	if (!BX.isReady)
	{
		var _args = arguments;
		BX.ready(function() {
			BX.load.apply(this, _args);
		});
		return null;
	}

	doc = doc || document;
	if (isAsync === null)
	{
		isAsync = "async" in doc.createElement("script") || "MozAppearance" in doc.documentElement.style || window.opera;
	}

	return isAsync ? loadAsync(items, callback, doc) : loadAsyncEmulation(items, callback, doc);
};

BX.convert =
{
	nodeListToArray: function(nodes)
	{
		try
		{
			return (Array.prototype.slice.call(nodes, 0));
		}
		catch (ex)
		{
			var ary = [];
			for(var i = 0, l = nodes.length; i < l; i++)
			{
				ary.push(nodes[i]);
			}
			return ary;
		}
	}
};

function loadAsync(items, callback, doc)
{
	if (!BX.type.isArray(items))
	{
		return;
	}

	function allLoaded(items)
	{
		items = items || assets;
		for (var name in items)
		{
			if (items.hasOwnProperty(name) && items[name].state !== LOADED)
			{
				return false;
			}
		}

		return true;
	}

	if (!BX.type.isFunction(callback))
	{
		callback = null;
	}

	var itemSet = {}, item, i;
	for (i = 0; i < items.length; i++)
	{
		item = items[i];
		item = getAsset(item);
		itemSet[item.name] = item;
	}

	var callbackWasCalled = false;
	for (i = 0; i < items.length; i++)
	{
		item = items[i];
		item = getAsset(item);
		load(item, function () {
			if (allLoaded(itemSet))
			{
				if (!callbackWasCalled)
				{
					callback && callback();
					callbackWasCalled = true;
				}

			}
		}, doc);
	}
}

function loadAsyncEmulation(items, callback, doc)
{
	function onPreload(asset)
	{
		asset.state = PRELOADED;
		if (BX.type.isArray(asset.onpreload) && asset.onpreload)
		{
			for (var i = 0; i < asset.onpreload.length; i++)
			{
				asset.onpreload[i].call();
			}
		}
	}

	function preLoad(asset)
	{
		if (asset.state === undefined)
		{
			asset.state = PRELOADING;
			asset.onpreload = [];

			loadAsset(
				{ url: asset.url, type: "cache", ext: asset.ext},
				function () { onPreload(asset); },
				doc
			);
		}
	}

	if (!BX.type.isArray(items))
	{
		return;
	}

	if (!BX.type.isFunction(callback))
	{
		callback = null;
	}

	var rest = [].slice.call(items, 1);
	for (var i = 0; i < rest.length; i++)
	{
		preLoad(getAsset(rest[i]));
	}

	load(getAsset(items[0]), items.length === 1 ? callback : function () {
		loadAsyncEmulation.apply(null, [rest, callback, doc]);
	}, doc);
}

function load(asset, callback, doc)
{
	callback = callback || BX.DoNothing;

	if (asset.state === LOADED)
	{
		callback();
		return;
	}

	if (asset.state === PRELOADING)
	{
		asset.onpreload.push(function () {
			load(asset, callback, doc);
		});
		return;
	}

	asset.state = LOADING;

	loadAsset(
		asset,
		function () {
			asset.state = LOADED;
			callback();
		},
		doc
	);
}

function loadAsset(asset, callback, doc)
{
	callback = callback || BX.DoNothing;

	function error(event)
	{
		ele.onload = ele.onreadystatechange = ele.onerror = null;
		callback();
	}

	function process(event)
	{
		event = event || window.event;
		if (event.type === "load" || (/loaded|complete/.test(ele.readyState) && (!doc.documentMode || doc.documentMode < 9)))
		{
			window.clearTimeout(asset.errorTimeout);
			window.clearTimeout(asset.cssTimeout);
			ele.onload = ele.onreadystatechange = ele.onerror = null;
			callback();
		}
	}

	function isCssLoaded()
	{
		if (asset.state !== LOADED && asset.cssRetries <= 20)
		{
			for (var i = 0, l = doc.styleSheets.length; i < l; i++)
			{
				if (doc.styleSheets[i].href === ele.href)
				{
					process({"type": "load"});
					return;
				}
			}

			asset.cssRetries++;
			asset.cssTimeout = window.setTimeout(isCssLoaded, 250);
		}
	}

	var ele;
	var ext = BX.type.isNotEmptyString(asset.ext) ? asset.ext : BX.util.getExtension(asset.url);

	if (ext === "css")
	{
		ele = doc.createElement("link");
		ele.type = "text/" + (asset.type || "css");
		ele.rel = "stylesheet";
		ele.href = asset.url;

		asset.cssRetries = 0;
		asset.cssTimeout = window.setTimeout(isCssLoaded, 500);
	}
	else
	{
		ele = doc.createElement("script");
		ele.type = "text/" + (asset.type || "javascript");
		ele.src = asset.url;
	}

	ele.onload = ele.onreadystatechange = process;
	ele.onerror = error;

	ele.async = false;
	ele.defer = false;

	asset.errorTimeout = window.setTimeout(function () {
		error({type: "timeout"});
	}, 7000);

	if (ext === "css")
	{
		cssList.push(normalizeMinUrl(normalizeUrl(asset.url)));
	}
	else
	{
		jsList.push(normalizeMinUrl(normalizeUrl(asset.url)));
	}

	var templateLink = null;
	var head = doc.head || doc.getElementsByTagName("head")[0];
	if (ext === "css" && (templateLink = getTemplateLink(head)) !== null)
	{
		templateLink.parentNode.insertBefore(ele, templateLink);
	}
	else
	{
		head.insertBefore(ele, head.lastChild);
	}
}

function getAsset(item)
{
	var asset = {};
	if (typeof item === "object")
	{
		asset = item;
		asset.name = asset.name ? asset.name : BX.util.hashCode(item.url);
	}
	else
	{
		asset = { name: BX.util.hashCode(item), url : item };
	}

	var ext = BX.type.isNotEmptyString(asset.ext) ? asset.ext : BX.util.getExtension(asset.url);
	if ((ext === "css" && isCssLoaded(asset.url)) || isScriptLoaded(asset.url))
	{
		asset.state = LOADED;
	}

	var existing = assets[asset.name];
	if (existing && existing.url === asset.url)
	{
		return existing;
	}

	assets[asset.name] = asset;
	return asset;
}

function normalizeUrl(url)
{
	if (!BX.type.isNotEmptyString(url))
	{
		return "";
	}

	url = BX.getJSPath(url);
	url = url.replace(/\?[0-9]*$/, "");

	return url;
}

function normalizeMinUrl(url)
{
	if (!BX.type.isNotEmptyString(url))
	{
		return "";
	}

	var minPos = url.indexOf(".min");
	return minPos >= 0 ? url.substr(0, minPos) + url.substr(minPos + 4) : url;
}

function isCssLoaded(fileSrc)
{
	initCssList();

	fileSrc = normalizeUrl(fileSrc);
	var fileSrcMin = normalizeMinUrl(fileSrc);

	return (fileSrc !== fileSrcMin && BX.util.in_array(fileSrcMin, cssList)) || BX.util.in_array(fileSrc, cssList);
}

function initCssList()
{
	if(!cssInit)
	{
		var linksCol = document.getElementsByTagName('link');

		if(!!linksCol && linksCol.length > 0)
		{
			for(var i = 0; i < linksCol.length; i++)
			{
				var href = linksCol[i].getAttribute('href');
				if (BX.type.isNotEmptyString(href))
				{
					href = normalizeMinUrl(normalizeUrl(href));
					cssList.push(href);
				}
			}
		}
		cssInit = true;
	}
}

function getTemplateLink(head)
{
	var findLink = function(tag)
	{
		var links = head.getElementsByTagName(tag);
		for (var i = 0, length = links.length; i < length; i++)
		{
			var templateStyle = links[i].getAttribute("data-template-style");
			if (BX.type.isNotEmptyString(templateStyle) && templateStyle == "true")
			{
				return links[i];
			}
		}

		return null;
	};

	var link = findLink("link");
	if (link === null)
	{
		link = findLink("style");
	}

	return link;
}

function isScriptLoaded(fileSrc)
{
	initJsList();

	fileSrc = normalizeUrl(fileSrc);
	var fileSrcMin = normalizeMinUrl(fileSrc);

	return (fileSrc !== fileSrcMin && BX.util.in_array(fileSrcMin, jsList)) || BX.util.in_array(fileSrc, jsList);
}

function initJsList()
{
	if(!jsInit)
	{
		var scriptCol = document.getElementsByTagName('script');

		if(!!scriptCol && scriptCol.length > 0)
		{
			for(var i=0; i<scriptCol.length; i++)
			{
				var src = scriptCol[i].getAttribute('src');

				if (BX.type.isNotEmptyString(src))
				{
					src = normalizeMinUrl(normalizeUrl(src));
					jsList.push(src);
				}
			}
		}
		jsInit = true;
	}
}

BX.reload = function(back_url, bAddClearCache)
{
	if (back_url === true)
	{
		bAddClearCache = true;
		back_url = null;
	}

	var new_href = back_url || top.location.href;

	var hashpos = new_href.indexOf('#'), hash = '';

	if (hashpos != -1)
	{
		hash = new_href.substr(hashpos);
		new_href = new_href.substr(0, hashpos);
	}

	if (bAddClearCache && new_href.indexOf('clear_cache=Y') < 0)
		new_href += (new_href.indexOf('?') == -1 ? '?' : '&') + 'clear_cache=Y';

	if (hash)
	{
		// hack for clearing cache in ajax mode components with history emulation
		if (bAddClearCache && (hash.substr(0, 5) == 'view/' || hash.substr(0, 6) == '#view/') && hash.indexOf('clear_cache%3DY') < 0)
			hash += (hash.indexOf('%3F') == -1 ? '%3F' : '%26') + 'clear_cache%3DY';

		new_href = new_href.replace(/(\?|\&)_r=[\d]*/, '');
		new_href += (new_href.indexOf('?') == -1 ? '?' : '&') + '_r='+Math.round(Math.random()*10000) + hash;
	}

	top.location.href = new_href;
};

BX.clearCache = function()
{
	BX.showWait();
	BX.reload(true);
};

BX.template = function(tpl, callback, bKillTpl)
{
	BX.ready(function() {
		_processTpl(BX(tpl), callback, bKillTpl);
	});
};

BX.isAmPmMode = function()
{
	return (BX.message('FORMAT_DATETIME').match('T') != null);
};

BX.formatDate = function(date, format)
{
	date = date || new Date();

	var bTime = date.getHours() || date.getMinutes() || date.getSeconds(),
		str = !!format
			? format :
			(bTime ? BX.message('FORMAT_DATETIME') : BX.message('FORMAT_DATE')
		);

	return str.replace(/YYYY/ig, date.getFullYear())
		.replace(/MMMM/ig, BX.util.str_pad_left((date.getMonth()+1).toString(), 2, '0'))
		.replace(/MM/ig, BX.util.str_pad_left((date.getMonth()+1).toString(), 2, '0'))
		.replace(/DD/ig, BX.util.str_pad_left(date.getDate().toString(), 2, '0'))
		.replace(/HH/ig, BX.util.str_pad_left(date.getHours().toString(), 2, '0'))
		.replace(/MI/ig, BX.util.str_pad_left(date.getMinutes().toString(), 2, '0'))
		.replace(/SS/ig, BX.util.str_pad_left(date.getSeconds().toString(), 2, '0'));
};
BX.formatName = function(user, template, login)
{
	user = user || {};
	template = (template || '');
	var replacement = {
		TITLE : (user["TITLE"] || ''),
		NAME : (user["NAME"] || ''),
		LAST_NAME : (user["LAST_NAME"] || ''),
		SECOND_NAME : (user["SECOND_NAME"] || ''),
		LOGIN : (user["LOGIN"] || ''),
		NAME_SHORT : user["NAME"] ? user["NAME"].substr(0, 1) + '.' : '',
		LAST_NAME_SHORT : user["LAST_NAME"] ? user["LAST_NAME"].substr(0, 1) + '.' : '',
		SECOND_NAME_SHORT : user["SECOND_NAME"] ? user["SECOND_NAME"].substr(0, 1) + '.' : '',
		EMAIL : (user["EMAIL"] || ''),
		ID : (user["ID"] || ''),
		NOBR : "",
		'/NOBR' : ""
	}, result = template;
	for (var ii in replacement)
	{
		if (replacement.hasOwnProperty(ii))
		{
			result = result.replace("#" + ii+ "#", replacement[ii])
		}
	}
	result = result.replace(/([\s]+)/gi, " ").trim();
	if (result == "")
	{
		result = (login == "Y" ? replacement["LOGIN"] : "");
		result = (result == "" ? "Noname" : result);
	}
	return result;
};

BX.getNumMonth = function(month)
{
	var wordMonthCut = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
	var wordMonth = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

	var q = month.toUpperCase();
	for (i = 1; i <= 12; i++)
	{
		if (q == BX.message('MON_'+i).toUpperCase() || q == BX.message('MONTH_'+i).toUpperCase() || q == wordMonthCut[i-1].toUpperCase() || q == wordMonth[i-1].toUpperCase())
		{
			return i;
		}
	}
	return month;
};

BX.parseDate = function(str, bUTC, formatDate, formatDatetime)
{
	if (BX.type.isNotEmptyString(str))
	{
		if (!formatDate)
			formatDate = BX.message('FORMAT_DATE');
		if (!formatDatetime)
			formatDatetime = BX.message('FORMAT_DATETIME');

		var regMonths = '';
		for (i = 1; i <= 12; i++)
		{
			regMonths = regMonths + '|' + BX.message('MON_'+i);
		}

		var expr = new RegExp('([0-9]+|[a-z]+' + regMonths + ')', 'ig');
		var aDate = str.match(expr),
			aFormat = formatDate.match(/(DD|MI|MMMM|MM|M|YYYY)/ig),
			i, cnt,
			aDateArgs=[], aFormatArgs=[],
			aResult={};

		if (!aDate)
			return null;

		if(aDate.length > aFormat.length)
		{
			aFormat = formatDatetime.match(/(DD|MI|MMMM|MM|M|YYYY|HH|H|SS|TT|T|GG|G)/ig);
		}

		for(i = 0, cnt = aDate.length; i < cnt; i++)
		{
			if(BX.util.trim(aDate[i]) != '')
			{
				aDateArgs[aDateArgs.length] = aDate[i];
			}
		}

		for(i = 0, cnt = aFormat.length; i < cnt; i++)
		{
			if(BX.util.trim(aFormat[i]) != '')
			{
				aFormatArgs[aFormatArgs.length] = aFormat[i];
			}
		}


		var m = BX.util.array_search('MMMM', aFormatArgs);
		if (m > 0)
		{
			aDateArgs[m] = BX.getNumMonth(aDateArgs[m]);
			aFormatArgs[m] = "MM";
		}
		else
		{
			m = BX.util.array_search('M', aFormatArgs);
			if (m > 0)
			{
				aDateArgs[m] = BX.getNumMonth(aDateArgs[m]);
				aFormatArgs[m] = "MM";
			}
		}

		for(i = 0, cnt = aFormatArgs.length; i < cnt; i++)
		{
			var k = aFormatArgs[i].toUpperCase();
			aResult[k] = k == 'T' || k == 'TT' ? aDateArgs[i] : parseInt(aDateArgs[i], 10);
		}

		if(aResult['DD'] > 0 && aResult['MM'] > 0 && aResult['YYYY'] > 0)
		{
			var d = new Date();

			if(bUTC)
			{
				d.setUTCDate(1);
				d.setUTCFullYear(aResult['YYYY']);
				d.setUTCMonth(aResult['MM'] - 1);
				d.setUTCDate(aResult['DD']);
				d.setUTCHours(0, 0, 0);
			}
			else
			{
				d.setDate(1);
				d.setFullYear(aResult['YYYY']);
				d.setMonth(aResult['MM'] - 1);
				d.setDate(aResult['DD']);
				d.setHours(0, 0, 0);
			}

			if(
				(!isNaN(aResult['HH']) || !isNaN(aResult['GG']) || !isNaN(aResult['H']) || !isNaN(aResult['G']))
					&& !isNaN(aResult['MI'])
			)
			{
				if (!isNaN(aResult['H']) || !isNaN(aResult['G']))
				{
					var bPM = (aResult['T']||aResult['TT']||'am').toUpperCase()=='PM';
					var h = parseInt(aResult['H']||aResult['G']||0, 10);
					if(bPM)
					{
						aResult['HH'] = h + (h == 12 ? 0 : 12);
					}
					else
					{
						aResult['HH'] = h < 12 ? h : 0;
					}
				}
				else
				{
					aResult['HH'] = parseInt(aResult['HH']||aResult['GG']||0, 10);
				}

				if (isNaN(aResult['SS']))
					aResult['SS'] = 0;

				if(bUTC)
				{
					d.setUTCHours(aResult['HH'], aResult['MI'], aResult['SS']);
				}
				else
				{
					d.setHours(aResult['HH'], aResult['MI'], aResult['SS']);
				}
			}

			return d;
		}
	}

	return null;
};

BX.selectUtils =
{
	addNewOption: function(oSelect, opt_value, opt_name, do_sort, check_unique)
	{
		oSelect = BX(oSelect);
		if(oSelect)
		{
			var n = oSelect.length;
			if(check_unique !== false)
			{
				for(var i=0;i<n;i++)
				{
					if(oSelect[i].value==opt_value)
					{
						return;
					}
				}
			}

			oSelect.options[n] = new Option(opt_name, opt_value, false, false);
		}

		if(do_sort === true)
		{
			this.sortSelect(oSelect);
		}
	},

	deleteOption: function(oSelect, opt_value)
	{
		oSelect = BX(oSelect);
		if(oSelect)
		{
			for(var i=0;i<oSelect.length;i++)
			{
				if(oSelect[i].value==opt_value)
				{
					oSelect.remove(i);
					break;
				}
			}
		}
	},

	deleteSelectedOptions: function(oSelect)
	{
		oSelect = BX(oSelect);
		if(oSelect)
		{
			var i=0;
			while(i<oSelect.length)
			{
				if(oSelect[i].selected)
				{
					oSelect[i].selected=false;
					oSelect.remove(i);
				}
				else
				{
					i++;
				}
			}
		}
	},

	deleteAllOptions: function(oSelect)
	{
		oSelect = BX(oSelect);
		if(oSelect)
		{
			for(var i=oSelect.length-1; i>=0; i--)
			{
				oSelect.remove(i);
			}
		}
	},

	optionCompare: function(record1, record2)
	{
		var value1 = record1.optText.toLowerCase();
		var value2 = record2.optText.toLowerCase();
		if (value1 > value2) return(1);
		if (value1 < value2) return(-1);
		return(0);
	},

	sortSelect: function(oSelect)
	{
		oSelect = BX(oSelect);
		if(oSelect)
		{
			var myOptions = [];
			var n = oSelect.options.length;
			var i;
			for (i=0;i<n;i++)
			{
				myOptions[i] = {
					optText:oSelect[i].text,
					optValue:oSelect[i].value
				};
			}
			myOptions.sort(this.optionCompare);
			oSelect.length=0;
			n = myOptions.length;
			for(i=0;i<n;i++)
			{
				oSelect[i] = new Option(myOptions[i].optText, myOptions[i].optValue, false, false);
			}
		}
	},

	selectAllOptions: function(oSelect)
	{
		oSelect = BX(oSelect);
		if(oSelect)
		{
			var n = oSelect.length;
			for(var i=0;i<n;i++)
			{
				oSelect[i].selected=true;
			}
		}
	},

	selectOption: function(oSelect, opt_value)
	{
		oSelect = BX(oSelect);
		if(oSelect)
		{
			var n = oSelect.length;
			for(var i=0;i<n;i++)
			{
				oSelect[i].selected = (oSelect[i].value == opt_value);
			}
		}
	},

	addSelectedOptions: function(oSelect, to_select_id, check_unique, do_sort)
	{
		oSelect = BX(oSelect);
		if(!oSelect)
			return;
		var n = oSelect.length;
		for(var i=0; i<n; i++)
			if(oSelect[i].selected)
				this.addNewOption(to_select_id, oSelect[i].value, oSelect[i].text, do_sort, check_unique);
	},

	moveOptionsUp: function(oSelect)
	{
		oSelect = BX(oSelect);
		if(!oSelect)
			return;
		var n = oSelect.length;
		for(var i=0; i<n; i++)
		{
			if(oSelect[i].selected && i>0 && oSelect[i-1].selected == false)
			{
				var option = new Option(oSelect[i].text, oSelect[i].value);
				oSelect[i] = new Option(oSelect[i-1].text, oSelect[i-1].value);
				oSelect[i].selected = false;
				oSelect[i-1] = option;
				oSelect[i-1].selected = true;
			}
		}
	},

	moveOptionsDown: function(oSelect)
	{
		oSelect = BX(oSelect);
		if(!oSelect)
			return;
		var n = oSelect.length;
		for(var i=n-1; i>=0; i--)
		{
			if(oSelect[i].selected && i<n-1 && oSelect[i+1].selected == false)
			{
				var option = new Option(oSelect[i].text, oSelect[i].value);
				oSelect[i] = new Option(oSelect[i+1].text, oSelect[i+1].value);
				oSelect[i].selected = false;
				oSelect[i+1] = option;
				oSelect[i+1].selected = true;
			}
		}
	}
};

BX.getEventTarget = function(e)
{
	if(e.target)
	{
		return e.target;
	}
	else if(e.srcElement)
	{
		return e.srcElement;
	}
	return null;
};

/******* HINT ***************/
// if function has 2 params - the 2nd one is hint html. otherwise hint_html is third and hint_title - 2nd;
// '<div onmouseover="BX.hint(this, 'This is &lt;b&gt;Hint&lt;/b&gt;')"'>;
// BX.hint(el, 'This is <b>Hint</b>') - this won't work, use constructor
BX.hint = function(el, hint_title, hint_html, hint_id)
{
	if (null == hint_html)
	{
		hint_html = hint_title;
		hint_title = '';
	}

	if (null == el.BXHINT)
	{
		el.BXHINT = new BX.CHint({
			parent: el, hint: hint_html, title: hint_title, id: hint_id
		});
		el.BXHINT.Show();
	}
};

BX.hint_replace = function(el, hint_title, hint_html)
{
	if (null == hint_html)
	{
		hint_html = hint_title;
		hint_title = '';
	}

	if (!el || !el.parentNode || !hint_html)
			return null;

	var obHint = new BX.CHint({
		hint: hint_html,
		title: hint_title
	});

	obHint.CreateParent();

	el.parentNode.insertBefore(obHint.PARENT, el);
	el.parentNode.removeChild(el);

	obHint.PARENT.style.marginLeft = '5px';

	return el;
};

BX.CHint = function(params)
{
	this.PARENT = BX(params.parent);

	this.HINT = params.hint;
	this.HINT_TITLE = params.title;

	this.PARAMS = {};
	for (var i in this.defaultSettings)
	{
		if (null == params[i])
			this.PARAMS[i] = this.defaultSettings[i];
		else
			this.PARAMS[i] = params[i];
	}

	if (null != params.id)
		this.ID = params.id;

	this.timer = null;
	this.bInited = false;
	this.msover = true;

	if (this.PARAMS.showOnce)
	{
		this.__show();
		this.msover = false;
		this.timer = setTimeout(BX.proxy(this.__hide, this), this.PARAMS.hide_timeout);
	}
	else if (this.PARENT)
	{
		BX.bind(this.PARENT, 'mouseover', BX.proxy(this.Show, this));
		BX.bind(this.PARENT, 'mouseout', BX.proxy(this.Hide, this));
	}

	BX.addCustomEvent('onMenuOpen', BX.delegate(this.disable, this));
	BX.addCustomEvent('onMenuClose', BX.delegate(this.enable, this));
};

BX.CHint.prototype.defaultSettings = {
	show_timeout: 1000,
	hide_timeout: 500,
	dx: 2,
	showOnce: false,
	preventHide: true,
	min_width: 250
};

BX.CHint.prototype.CreateParent = function(element, params)
{
	if (this.PARENT)
	{
		BX.unbind(this.PARENT, 'mouseover', BX.proxy(this.Show, this));
		BX.unbind(this.PARENT, 'mouseout', BX.proxy(this.Hide, this));
	}

	if (!params) params = {};
	var type = 'icon';

	if (params.type && (params.type == "link" || params.type == "icon"))
		type = params.type;

	if (element)
		type = "element";

	if (type == "icon")
	{
		element = BX.create('IMG', {
			props: {
				src: params.iconSrc
					? params.iconSrc
					: "/bitrix/js/main/core/images/hint.gif"
			}
		});
	}
	else if (type == "link")
	{
		element = BX.create("A", {
			props: {href: 'javascript:void(0)'},
			html: '[?]'
		});
	}

	this.PARENT = element;

	BX.bind(this.PARENT, 'mouseover', BX.proxy(this.Show, this));
	BX.bind(this.PARENT, 'mouseout', BX.proxy(this.Hide, this));

	return this.PARENT;
};

BX.CHint.prototype.Show = function()
{
	this.msover = true;

	if (null != this.timer)
		clearTimeout(this.timer);

	this.timer = setTimeout(BX.proxy(this.__show, this), this.PARAMS.show_timeout);
};

BX.CHint.prototype.Hide = function()
{
	this.msover = false;

	if (null != this.timer)
		clearTimeout(this.timer);

	this.timer = setTimeout(BX.proxy(this.__hide, this), this.PARAMS.hide_timeout);
};

BX.CHint.prototype.__show = function()
{
	if (!this.msover || this.disabled) return;
	if (!this.bInited) this.Init();

	if (this.prepareAdjustPos())
	{
		this.DIV.style.display = 'block';
		this.adjustPos();

		BX.bind(window, 'scroll', BX.proxy(this.__onscroll, this));

		if (this.PARAMS.showOnce)
		{
			this.timer = setTimeout(BX.proxy(this.__hide, this), this.PARAMS.hide_timeout);
		}
	}
};

BX.CHint.prototype.__onscroll = function()
{
	if (!BX.admin || !BX.admin.panel || !BX.admin.panel.isFixed()) return;

	if (this.scrollTimer) clearTimeout(this.scrollTimer);

	this.DIV.style.display = 'none';
	this.scrollTimer = setTimeout(BX.proxy(this.Reopen, this), this.PARAMS.show_timeout);
};

BX.CHint.prototype.Reopen = function()
{
	if (null != this.timer) clearTimeout(this.timer);
	this.timer = setTimeout(BX.proxy(this.__show, this), 50);
};

BX.CHint.prototype.__hide = function()
{
	if (this.msover) return;
	if (!this.bInited) return;

	BX.unbind(window, 'scroll', BX.proxy(this.Reopen, this));

	if (this.PARAMS.showOnce)
	{
		this.Destroy();
	}
	else
	{
		this.DIV.style.display = 'none';
	}
};

BX.CHint.prototype.__hide_immediately = function()
{
	this.msover = false;
	this.__hide();
};

BX.CHint.prototype.Init = function()
{
	this.DIV = document.body.appendChild(BX.create('DIV', {
		props: {className: 'bx-panel-tooltip'},
		style: {display: 'none'},
		children: [
			BX.create('DIV', {
				props: {className: 'bx-panel-tooltip-top-border'},
				html: '<div class="bx-panel-tooltip-corner bx-panel-tooltip-left-corner"></div><div class="bx-panel-tooltip-border"></div><div class="bx-panel-tooltip-corner bx-panel-tooltip-right-corner"></div>'
			}),
			(this.CONTENT = BX.create('DIV', {
				props: {className: 'bx-panel-tooltip-content'},
				children: [
					BX.create('DIV', {
						props: {className: 'bx-panel-tooltip-underlay'},
						children: [
							BX.create('DIV', {props: {className: 'bx-panel-tooltip-underlay-bg'}})
						]
					})
				]
			})),

			BX.create('DIV', {
				props: {className: 'bx-panel-tooltip-bottom-border'},
				html: '<div class="bx-panel-tooltip-corner bx-panel-tooltip-left-corner"></div><div class="bx-panel-tooltip-border"></div><div class="bx-panel-tooltip-corner bx-panel-tooltip-right-corner"></div>'
			})
		]
	}));

	if (this.ID)
	{
		this.CONTENT.insertBefore(BX.create('A', {
			attrs: {href: 'javascript:void(0)'},
			props: {className: 'bx-panel-tooltip-close'},
			events: {click: BX.delegate(this.Close, this)}
		}), this.CONTENT.firstChild)
	}

	if (this.HINT_TITLE)
	{
		this.CONTENT.appendChild(
			BX.create('DIV', {
				props: {className: 'bx-panel-tooltip-title'},
				text: this.HINT_TITLE
			})
		)
	}

	if (this.HINT)
	{
		this.CONTENT_TEXT = this.CONTENT.appendChild(BX.create('DIV', {props: {className: 'bx-panel-tooltip-text'}})).appendChild(BX.create('SPAN', {html: this.HINT}));
	}

	if (this.PARAMS.preventHide)
	{
		BX.bind(this.DIV, 'mouseout', BX.proxy(this.Hide, this));
		BX.bind(this.DIV, 'mouseover', BX.proxy(this.Show, this));
	}

	this.bInited = true;
};

BX.CHint.prototype.setContent = function(content)
{
	this.HINT = content;

	if (this.CONTENT_TEXT)
		this.CONTENT_TEXT.innerHTML = this.HINT;
	else
		this.CONTENT_TEXT = this.CONTENT.appendChild(BX.create('DIV', {props: {className: 'bx-panel-tooltip-text'}})).appendChild(BX.create('SPAN', {html: this.HINT}));
};

BX.CHint.prototype.prepareAdjustPos = function()
{
	this._wnd = {scrollPos: BX.GetWindowScrollPos(),scrollSize:BX.GetWindowScrollSize()};
	return BX.style(this.PARENT, 'display') != 'none';
};

BX.CHint.prototype.getAdjustPos = function()
{
	var res = {}, pos = BX.pos(this.PARENT), min_top = 0;

	res.top = pos.bottom + this.PARAMS.dx;

	if (BX.admin && BX.admin.panel.DIV)
	{
		min_top = BX.admin.panel.DIV.offsetHeight + this.PARAMS.dx;

		if (BX.admin.panel.isFixed())
		{
			min_top += this._wnd.scrollPos.scrollTop;
		}
	}

	if (res.top < min_top)
		res.top = min_top;
	else
	{
		if (res.top + this.DIV.offsetHeight > this._wnd.scrollSize.scrollHeight)
			res.top = pos.top - this.PARAMS.dx - this.DIV.offsetHeight;
	}

	res.left = pos.left;
	if (pos.left < this.PARAMS.dx)
		pos.left = this.PARAMS.dx;
	else
	{
		var floatWidth = this.DIV.offsetWidth;

		var max_left = this._wnd.scrollSize.scrollWidth - floatWidth - this.PARAMS.dx;

		if (res.left > max_left)
			res.left = max_left;
	}

	return res;
};

BX.CHint.prototype.adjustWidth = function()
{
	if (this.bWidthAdjusted) return;

	var w = this.DIV.offsetWidth, h = this.DIV.offsetHeight;

	if (w > this.PARAMS.min_width)
		w = Math.round(Math.sqrt(1.618*w*h));

	if (w < this.PARAMS.min_width)
		w = this.PARAMS.min_width;

	this.DIV.style.width = w + "px";

	if (this._adjustWidthInt)
		clearInterval(this._adjustWidthInt);
	this._adjustWidthInt = setInterval(BX.delegate(this._adjustWidthInterval, this), 5);

	this.bWidthAdjusted = true;
};

BX.CHint.prototype._adjustWidthInterval = function()
{
	if (!this.DIV || this.DIV.style.display == 'none')
		clearInterval(this._adjustWidthInt);

	var
		dW = 20,
		maxWidth = 1500,
		w = this.DIV.offsetWidth,
		w1 = this.CONTENT_TEXT.offsetWidth;

	if (w > 0 && w1 > 0 && w - w1 < dW && w < maxWidth)
	{
		this.DIV.style.width = (w + dW) + "px";
		return;
	}

	clearInterval(this._adjustWidthInt);
};

BX.CHint.prototype.adjustPos = function()
{
	this.adjustWidth();

	var pos = this.getAdjustPos();

	this.DIV.style.top = pos.top + 'px';
	this.DIV.style.left = pos.left + 'px';
};

BX.CHint.prototype.Close = function()
{
	if (this.ID && BX.WindowManager)
		BX.WindowManager.saveWindowOptions(this.ID, {display: 'off'});
	this.__hide_immediately();
	this.Destroy();
};

BX.CHint.prototype.Destroy = function()
{
	if (this.PARENT)
	{
		BX.unbind(this.PARENT, 'mouseover', BX.proxy(this.Show, this));
		BX.unbind(this.PARENT, 'mouseout', BX.proxy(this.Hide, this));
	}

	if (this.DIV)
	{
		BX.unbind(this.DIV, 'mouseover', BX.proxy(this.Show, this));
		BX.unbind(this.DIV, 'mouseout', BX.proxy(this.Hide, this));

		BX.cleanNode(this.DIV, true);
	}
};

BX.CHint.prototype.enable = function(){this.disabled = false;};
BX.CHint.prototype.disable = function(){this.__hide_immediately(); this.disabled = true;};

/* ready */
if (document.addEventListener)
{
	__readyHandler = function()
	{
		document.removeEventListener("DOMContentLoaded", __readyHandler, false);
		runReady();
	}
}
else if (document.attachEvent)
{
	__readyHandler = function()
	{
		if (document.readyState === "complete")
		{
			document.detachEvent("onreadystatechange", __readyHandler);
			runReady();
		}
	}
}

function bindReady()
{
	if (!readyBound)
	{
		readyBound = true;

		if (document.readyState === "complete")
		{
			return runReady();
		}

		if (document.addEventListener)
		{
			document.addEventListener("DOMContentLoaded", __readyHandler, false);
			window.addEventListener("load", runReady, false);
		}
		else if (document.attachEvent) // IE
		{
			document.attachEvent("onreadystatechange", __readyHandler);
			window.attachEvent("onload", runReady);

			var toplevel = false;
			try {toplevel = (window.frameElement == null);} catch(e) {}

			if (document.documentElement.doScroll && toplevel)
				doScrollCheck();
		}
	}

	return null;
}


function runReady()
{
	if (!BX.isReady)
	{
		if (!document.body)
			return setTimeout(runReady, 15);

		BX.isReady = true;

		if (readyList && readyList.length > 0)
		{
			var fn, i = 0;
			while (readyList && (fn = readyList[i++]))
			{
				try{
					fn.call(document);
				}
				catch(e){
					BX.debug('BX.ready error: ', e);
				}
			}

			readyList = null;
		}

		// TODO: check ready handlers binded some other way;
	}
	return null;
}

// hack for IE
function doScrollCheck()
{
	if (BX.isReady)
		return;

	try {document.documentElement.doScroll("left");} catch( error ) {setTimeout(doScrollCheck, 1); return;}

	runReady();
}
/* \ready */

function _adjustWait()
{
	if (!this.bxmsg) return;

	var arContainerPos = BX.pos(this),
		div_top = arContainerPos.top;

	if (div_top < BX.GetDocElement().scrollTop)
		div_top = BX.GetDocElement().scrollTop + 5;

	this.bxmsg.style.top = (div_top + 5) + 'px';

	if (this == BX.GetDocElement())
	{
		this.bxmsg.style.right = '5px';
	}
	else
	{
		this.bxmsg.style.left = (arContainerPos.right - this.bxmsg.offsetWidth - 5) + 'px';
	}
}

function _checkDisplay(ob, displayType)
{
	if (typeof displayType != 'undefined')
		ob.BXDISPLAY = displayType;

	var d = ob.style.display || BX.style(ob, 'display');
	if (d != 'none')
	{
		ob.BXDISPLAY = ob.BXDISPLAY || d;
		return true;
	}
	else
	{
		ob.BXDISPLAY = ob.BXDISPLAY || 'block';
		return false;
	}
}

function _processTpl(tplNode, cb, bKillTpl)
{
	if (tplNode)
	{
		if (bKillTpl)
			tplNode.parentNode.removeChild(tplNode);

		var res = {}, nodes = BX.findChildren(tplNode, {attribute: 'data-role'}, true);

		for (var i = 0, l = nodes.length; i < l; i++)
		{
			res[nodes[i].getAttribute('data-role')] = nodes[i];
		}

		cb.apply(tplNode, [res]);
	}
}

function _checkNode(obj, params)
{
	params = params || {};

	if (BX.type.isFunction(params))
		return params.call(window, obj);

	if (!params.allowTextNodes && !BX.type.isElementNode(obj))
		return false;
	var i,j,len;
	for (i in params)
	{
		if(params.hasOwnProperty(i))
		{
			switch(i)
			{
				case 'tag':
				case 'tagName':
					if (BX.type.isString(params[i]))
					{
						if (obj.tagName.toUpperCase() != params[i].toUpperCase())
							return false;
					}
					else if (params[i] instanceof RegExp)
					{
						if (!params[i].test(obj.tagName))
							return false;
					}
				break;

				case 'class':
				case 'className':
					if (BX.type.isString(params[i]))
					{
						if (!BX.hasClass(obj, params[i]))
							return false;
					}
					else if (params[i] instanceof RegExp)
					{
						if (!BX.type.isString(obj.className) || !params[i].test(obj.className))
							return false;
					}
				break;

				case 'attr':
				case 'attrs':
				case 'attribute':
					if (BX.type.isString(params[i]))
					{
						if (!obj.getAttribute(params[i]))
							return false;
					}
					else if (BX.type.isArray(params[i]))
					{
						for (j = 0, len = params[i].length; j < len; j++)
						{
							if (params[i] && !obj.getAttribute(params[i]))
								return false;
						}
					}
					else
					{
						for (j in params[i])
						{
							if(params[i].hasOwnProperty(j))
							{
								var q = obj.getAttribute(j);
								if (params[i][j] instanceof RegExp)
								{
									if (!BX.type.isString(q) || !params[i][j].test(q))
									{
										return false;
									}
								}
								else
								{
									if (q != '' + params[i][j])
									{
										return false;
									}
								}
							}
						}
					}
				break;

				case 'property':
				case 'props':
					if (BX.type.isString(params[i]))
					{
						if (!obj[params[i]])
							return false;
					}
					else if (BX.type.isArray(params[i]))
					{
						for (j = 0, len = params[i].length; j < len; j++)
						{
							if (params[i] && !obj[params[i]])
								return false;
						}
					}
					else
					{
						for (j in params[i])
						{
							if (BX.type.isString(params[i][j]))
							{
								if (obj[j] != params[i][j])
									return false;
							}
							else if (params[i][j] instanceof RegExp)
							{
								if (!BX.type.isString(obj[j]) || !params[i][j].test(obj[j]))
									return false;
							}
						}
					}
				break;

				case 'callback':
					return params[i](obj);
			}
		}
	}

	return true;
}

/* garbage collector */
function Trash()
{
	var i,len;

	for (i = 0, len = garbageCollectors.length; i<len; i++)
	{
		try {
			garbageCollectors[i].callback.apply(garbageCollectors[i].context || window);
			delete garbageCollectors[i];
			garbageCollectors[i] = null;
		} catch (e) {}
	}

	try {BX.unbindAll();} catch(e) {}
/*
	for (i = 0, len = proxyList.length; i < len; i++)
	{
		try {
			delete proxyList[i];
			proxyList[i] = null;
		} catch (e) {}
	}
*/
}

if(window.attachEvent) // IE
	window.attachEvent("onunload", Trash);
else if(window.addEventListener) // Gecko / W3C
	window.addEventListener('unload', Trash, false);
else
	window.onunload = Trash;
/* \garbage collector */

// set empty ready handler
BX(BX.DoNothing);
window.BX = BX;
BX.browser.addGlobalClass();

/* data storage */
BX.data = function(node, key, value)
{
	if(typeof node == 'undefined')
		return undefined;

	if(typeof key == 'undefined')
		return undefined;

	if(typeof value != 'undefined')
	{
		// write to manager
		dataStorage.set(node, key, value);
	}
	else
	{
		var data;

		// from manager
		if((data = dataStorage.get(node, key)) != undefined)
		{
			return data;
		}
		else
		{
			// from attribute data-*
			if('getAttribute' in node)
			{
				data = node.getAttribute('data-'+key.toString());
				if(data === null)
				{
					return undefined;
				}
				return data;
			}
		}

		return undefined;
	}
};

BX.DataStorage = function()
{

	this.keyOffset = 1;
	this.data = {};
	this.uniqueTag = 'BX-'+Math.random();

	this.resolve = function(owner, create){
		if(typeof owner[this.uniqueTag] == 'undefined')
			if(create)
			{
				try
				{
					Object.defineProperty(owner, this.uniqueTag, {
						value: this.keyOffset++
					});
				}
				catch(e)
				{
					owner[this.uniqueTag] = this.keyOffset++;
				}
			}
			else
				return undefined;

		return owner[this.uniqueTag];
	};
	this.get = function(owner, key){
		if((owner != document && !BX.type.isElementNode(owner)) || typeof key == 'undefined')
			return undefined;

		owner = this.resolve(owner, false);

		if(typeof owner == 'undefined' || typeof this.data[owner] == 'undefined')
			return undefined;

		return this.data[owner][key];
	};
	this.set = function(owner, key, value){

		if((owner != document && !BX.type.isElementNode(owner)) || typeof value == 'undefined')
			return;

		var o = this.resolve(owner, true);

		if(typeof this.data[o] == 'undefined')
			this.data[o] = {};

		this.data[o][key] = value;
	};
};

// some internal variables for new logic
var dataStorage = new BX.DataStorage();	// manager which BX.data() uses to keep data

BX.LazyLoad = {
	images: [],
	imageStatus: {
		hidden: -2,
		error: -1,
		"undefined": 0,
		inited: 1,
		loaded: 2
	},
	imageTypes: {
		image: 1,
		background: 2
	},

	registerImage: function(id, isImageVisibleCallback)
	{
		if (BX.type.isNotEmptyString(id))
		{
			this.images.push({
				id: id,
				node: null,
				src: null,
				type: null,
				func: BX.type.isFunction(isImageVisibleCallback) ? isImageVisibleCallback : null,
				status: this.imageStatus.undefined
			});
		}
	},

	registerImages: function(ids, isImageVisibleCallback)
	{
		if (BX.type.isArray(ids))
		{
			for (var i = 0, length = ids.length; i < length; i++)
			{
				this.registerImage(ids[i], isImageVisibleCallback);
			}
		}
	},

	showImages: function(checkOwnVisibility)
	{
		var image = null;
		var isImageVisible = false;

		checkOwnVisibility = (checkOwnVisibility !== false);
		for (var i = 0, length = this.images.length; i < length; i++)
		{
			image = this.images[i];

			if (image.status == this.imageStatus.undefined)
			{
				this.initImage(image);
			}

			if (image.status !== this.imageStatus.inited)
			{
				continue;
			}

			if (
				!image.node
				|| !image.node.parentNode
			)
			{
				image.node = null;
				image.status = this.imageStatus.error;
				continue;
			}

			isImageVisible = true;
			if (checkOwnVisibility && image.func)
			{
				isImageVisible = image.func(image);
			}

			if (
				isImageVisible === true
				&& this.isElementVisibleOnScreen(image.node)
			)
			{
				if (image.type == this.imageTypes.image)
				{
					image.node.src = image.src;
				}
				else
				{
					image.node.style.backgroundImage = "url('" + image.src + "')";
				}

				image.node.setAttribute("data-src", "");
				image.status = this.imageStatus.loaded;
			}
		}
	},

	initImage: function(image)
	{
		image.status = this.imageStatus.error;
		var node = BX(image.id);
		if (node)
		{
			var src = node.getAttribute("data-src");
			if (BX.type.isNotEmptyString(src))
			{
				image.node = node;
				image.src = src;
				image.status = this.imageStatus.inited;
				image.type = (image.node.tagName.toLowerCase() == "img"
					? this.imageTypes.image
					: this.imageTypes.background
				);
			}
		}
	},

	isElementVisibleOnScreen: function (element)
	{
		var coords = this.getElementCoords(element);

		var windowTop = window.pageYOffset || document.documentElement.scrollTop;
		var windowBottom = windowTop + document.documentElement.clientHeight;

		coords.bottom = coords.top + element.offsetHeight;

		var topVisible = coords.top > windowTop && coords.top < windowBottom;
		var bottomVisible = coords.bottom < windowBottom && coords.bottom > windowTop;

		return topVisible || bottomVisible;
	},

	isElementVisibleOn2Screens: function(element)
	{
		var coords = this.getElementCoords(element);

		var windowHeight = document.documentElement.clientHeight;
		var windowTop = window.pageYOffset || document.documentElement.scrollTop;
		var windowBottom = windowTop + windowHeight;

		coords.bottom = coords.top + element.offsetHeight;

		windowTop -= windowHeight;
		windowBottom += windowHeight;

		var topVisible = coords.top > windowTop && coords.top < windowBottom;
		var bottomVisible = coords.bottom < windowBottom && coords.bottom > windowTop;

		return topVisible || bottomVisible;
	},

	getElementCoords: function(element)
	{
		var box = element.getBoundingClientRect();

		return {
			originTop: box.top,
			originLeft: box.left,
			top: box.top + window.pageYOffset,
			left: box.left + window.pageXOffset
		};
	},

	onScroll: function()
	{
		BX.LazyLoad.showImages();
	},

	clearImages: function ()
	{
		this.images = [];
	}

};

BX.getCookie = function (name)
{
	var matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));

	return matches ? decodeURIComponent(matches[1]) : undefined;
};

BX.setCookie = function (name, value, options)
{
	options = options || {};

	var expires = options.expires;
	if (typeof(expires) == "number" && expires)
	{
		var currentDate = new Date();
		currentDate.setTime(currentDate.getTime() + expires * 1000);
		expires = options.expires = currentDate;
	}

	if (expires && expires.toUTCString)
	{
		options.expires = expires.toUTCString();
	}

	value = encodeURIComponent(value);

	var updatedCookie = name + "=" + value;

	for (var propertyName in options)
	{
		if (!options.hasOwnProperty(propertyName))
		{
			continue;
		}
		updatedCookie += "; " + propertyName;
		var propertyValue = options[propertyName];
		if (propertyValue !== true)
		{
			updatedCookie += "=" + propertyValue;
		}
	}

	document.cookie = updatedCookie;

	return true;
};

BX.FixFontSize = function(params)
{
	var widthNode, computedStyles, width;

	this.node = null;
	this.prevWindowSize = 0;
	this.prevWrapperSize = 0;
	this.mainWrapper = null;
	this.textWrapper = null;
	this.objList = params.objList;
	this.minFontSizeList = [];
	this.minFontSize = 0;

	if (params.onresize)
	{
		this.prevWindowSize = window.innerWidth || document.documentElement.clientWidth;
		BX.bind(window, 'resize', BX.proxy(BX.throttle(this.onResize, 350),this));
	}

	if (params.onAdaptiveResize)
	{
		widthNode = this.objList[0].scaleBy || this.objList[0].node;
		computedStyles = getComputedStyle(widthNode);
		this.prevWrapperSize = parseInt(computedStyles["width"]) - parseInt(computedStyles["paddingLeft"]) - parseInt(computedStyles["paddingRight"]);
		BX.bind(window, 'resize', BX.proxy(BX.throttle(this.onAdaptiveResize, 350),this));
	}

	this.createTestNodes();
	this.decrease();
};

BX.FixFontSize.prototype =
{
	createTestNodes: function()
	{
		this.textWrapper = BX.create('div',{
			style : {
				display : 'inline-block',
				whiteSpace : 'nowrap'
			}
		});

		this.mainWrapper = BX.create('div',{
			style : {
				height : 0,
				overflow : 'hidden'
			},
			children : [this.textWrapper]
		});

	},
	insertTestNodes: function()
	{
		document.body.appendChild(this.mainWrapper);
	},
	removeTestNodes: function()
	{
		document.body.removeChild(this.mainWrapper);
	},
	decrease: function()
	{
		var width,
			fontSize,
			widthNode,
			computedStyles;

		this.insertTestNodes();

		for(var i=this.objList.length-1; i>=0; i--)
		{
			widthNode = this.objList[i].scaleBy || this.objList[i].node;
			computedStyles = getComputedStyle(widthNode);
			width  = parseInt(computedStyles["width"]) - parseInt(computedStyles["paddingLeft"]) - parseInt(computedStyles["paddingRight"]);
			fontSize = parseInt(getComputedStyle(this.objList[i].node)["font-size"]);

			this.textWrapperSetStyle(this.objList[i].node);

			if(this.textWrapperInsertText(this.objList[i].node))
			{
				while(this.textWrapper.offsetWidth > width && fontSize > 0)
				{
					this.textWrapper.style.fontSize = --fontSize + 'px';
				}

				if(this.objList[i].smallestValue)
				{
					this.minFontSize = this.minFontSize ? Math.min(this.minFontSize, fontSize) : fontSize;

					this.minFontSizeList.push(this.objList[i].node)
				}
				else
				{
					this.objList[i].node.style.fontSize = fontSize + 'px';
				}
			}
		}

		if(this.minFontSizeList.length > 0)
			this.setMinFont();

		this.removeTestNodes();

	},
	increase: function()
	{
		this.insertTestNodes();
		var width,
			fontSize,
			widthNode,
			computedStyles;

		this.insertTestNodes();

		for(var i=this.objList.length-1; i>=0; i--)
		{
			widthNode = this.objList[i].scaleBy || this.objList[i].node;
			computedStyles = getComputedStyle(widthNode);
			width  = parseInt(computedStyles["width"]) - parseInt(computedStyles["paddingLeft"]) - parseInt(computedStyles["paddingRight"]);
			fontSize = parseInt(getComputedStyle(this.objList[i].node)["font-size"]);

			this.textWrapperSetStyle(this.objList[i].node);

			if(this.textWrapperInsertText(this.objList[i].node))
			{
				while(this.textWrapper.offsetWidth < width && fontSize < this.objList[i].maxFontSize)
				{
					this.textWrapper.style.fontSize = ++fontSize + 'px';
				}

				fontSize--;

				if(this.objList[i].smallestValue)
				{
					this.minFontSize = this.minFontSize ? Math.min(this.minFontSize, fontSize) : fontSize;

					this.minFontSizeList.push(this.objList[i].node)
				}
				else
				{
					this.objList[i].node.style.fontSize = fontSize + 'px';
				}
			}
		}

		if(this.minFontSizeList.length > 0)
			this.setMinFont();

		this.removeTestNodes();
	},
	setMinFont : function()
	{
		for(var i = this.minFontSizeList.length-1; i>=0; i--)
		{
			this.minFontSizeList[i].style.fontSize = this.minFontSize + 'px';
		}

		this.minFontSize = 0;
	},
	onResize : function()
	{
		var width = window.innerWidth || document.documentElement.clientWidth;

		if(this.prevWindowSize > width)
			this.decrease();

		else if (this.prevWindowSize < width)
			this.increase();

		this.prevWindowSize = width;
	},
	onAdaptiveResize : function()
	{
		var widthNode = this.objList[0].scaleBy || this.objList[0].node,
			computedStyles = getComputedStyle(widthNode),
			width = parseInt(computedStyles["width"]) - parseInt(computedStyles["paddingLeft"]) - parseInt(computedStyles["paddingRight"]);

		if (this.prevWrapperSize > width)
			this.decrease();
		else if (this.prevWrapperSize < width)
			this.increase();

		this.prevWrapperSize = width;
	},
	textWrapperInsertText : function(node)
	{
		if(node.textContent){
			this.textWrapper.textContent = node.textContent;
			return true;
		}
		else if(node.innerText)
		{
			this.textWrapper.innerText = node.innerText;
			return true;
		}
		else {
			return false;
		}
	},
	textWrapperSetStyle : function(node)
	{
		this.textWrapper.style.fontFamily = getComputedStyle(node)["font-family"];
		this.textWrapper.style.fontSize = getComputedStyle(node)["font-size"];
		this.textWrapper.style.fontStyle = getComputedStyle(node)["font-style"];
		this.textWrapper.style.fontWeight = getComputedStyle(node)["font-weight"];
		this.textWrapper.style.lineHeight = getComputedStyle(node)["line-height"];
	}
};

BX.FixFontSize.init = function(params)
{
	return new BX.FixFontSize(params);
};

if(typeof(BX.ParamBag) === "undefined")
{
	BX.ParamBag = function()
	{
		this._params = {};
	};

	BX.ParamBag.prototype =
	{
		initialize: function(params)
		{
			this._params = params ? params : {};
		},
		getParam: function(name, defaultvalue)
		{
			var p = this._params;
			return typeof(p[name]) != "undefined" ? p[name] : defaultvalue;
		},
		setParam: function(name, value)
		{
			this._params[name] = value;
		},
		clear: function()
		{
			this._params = {};
		}
	};

	BX.ParamBag.create = function(params)
	{
		var self = new BX.ParamBag();
		self.initialize(params);
		return self;
	}
}

if(typeof(BX.Promise) === "undefined")
{
	BX.Promise = function(fn, ctx) // fn is future-reserved
	{
		this.state = null;
		this.value = null;
		this.reason = null;
		this.next = null;
		this.ctx = ctx || this;

		this.onFulfilled = [];
		this.onRejected = [];
	};
	BX.Promise.prototype.fulfill = function(value)
	{
		this.checkState();

		this.value = value;
		this.state = true;
		this.execute();
	};
	BX.Promise.prototype.reject = function(reason)
	{
		this.checkState();

		this.reason = reason;
		this.state = false;
		this.execute();
	};
	BX.Promise.prototype.then = function(onFulfilled, onRejected)
	{
		if(BX.type.isFunction(onFulfilled))
		{
			this.onFulfilled.push(onFulfilled);
		}
		if(BX.type.isFunction(onRejected))
		{
			this.onRejected.push(onRejected);
		}

		if(this.next === null)
		{
			this.next = new BX.Promise(null, this.ctx);
		}

		if(this.state !== null) // if promise was already resolved, execute immediately
		{
			this.execute();
		}

		return this.next;
	};
	BX.Promise.prototype.setAutoResolve = function(way, ms)
	{
		this.timer = setTimeout(BX.delegate(function(){
			if(this.state === null)
			{
				this[way ? 'fulfill' : 'reject']();
			}
		}, this), ms || 15);
	};
	BX.Promise.prototype.cancelAutoResolve = function()
	{
		clearTimeout(this.timer);
	};
	/**
	 * Resolve function. This function allows promise chaining, like ..then().then()...
	 * Typical usage:
	 *
	 * var p = new Promise();
	 *
	 * p.then(function(value){
	 *  return someValue; // next promise in the chain will be fulfilled with someValue
	 * }).then(function(value){
	 *
	 *  var p1 = new Promise();
	 *  *** some async code here, that eventually resolves p1 ***
	 *
	 *  return p1; // chain will resume when p1 resolved (fulfilled or rejected)
	 * }).then(function(value){
	 *
	 *  // you can also do
	 *  var e = new Error();
	 *  throw e;
	 *  // it will cause next promise to be rejected with e
	 *
	 *  return someOtherValue;
	 * }).then(function(value){
	 *  ...
	 * }, function(reason){
	 *  // promise was rejected with reason
	 * })...;
	 *
	 * p.fulfill('let`s start this chain');
	 *
	 * @param x
	 */
	BX.Promise.prototype.resolve = function(x)
	{
		var this_ = this;

		if(this === x)
		{
			this.reject(new TypeError('Promise cannot fulfill or reject itself')); // avoid recursion
		}
		// allow "pausing" promise chaining until promise x is fulfilled or rejected
		else if(x instanceof BX.Promise)
		{
			x.then(function(value){
				this_.fulfill(value);
			}, function(reason){
				this_.reject(reason);
			});
		}
		else // auto-fulfill this promise
		{
			this.fulfill(x);
		}
	};
	BX.Promise.prototype.execute = function()
	{
		if(this.state === null)
		{
			//then() must not be called before BX.Promise resolve() happens
			return;
		}

		var value = undefined;
		var reason = undefined;
		var x = undefined;
		var k;
		if(this.state === true) // promise was fulfill()-ed
		{
			if(this.onFulfilled.length)
			{
				try
				{
					for(k = 0; k < this.onFulfilled.length; k++)
					{
						x = this.onFulfilled[k].apply(this.ctx, [this.value]);
						if(typeof x != 'undefined')
						{
							value = x;
						}
					}
				}
				catch(e)
				{
					if('console' in window)
					{
						console.dir(e);
					}
					BX.debug(e);

					reason = e; // reject next
				}
			}
			else
			{
				value = this.value; // resolve next
			}
		}
		else if(this.state === false) // promise was reject()-ed
		{
			if(this.onRejected.length)
			{
				try
				{
					for(k = 0; k < this.onRejected.length; k++)
					{
						x = this.onRejected[k].apply(this.ctx, [this.reason]);
						if(typeof x != 'undefined')
						{
							value = x;
						}
					}
				}
				catch(e)
				{
					if('console' in window)
					{
						console.dir(e);
					}
					BX.debug(e);

					reason = e; // reject next
				}
			}
			else
			{
				reason = this.reason; // reject next
			}
		}

		if(this.next !== null)
		{
			if(typeof reason != 'undefined')
			{
				this.next.reject(reason);
			}
			else if(typeof value != 'undefined')
			{
				this.next.resolve(value);
			}
		}
	};
	BX.Promise.prototype.checkState = function()
	{
		if(this.state !== null)
		{
			throw new Error('You can not do fulfill() or reject() multiple times');
		}
	};
}

})(window);


/* End */
;
; /* Start:"a:4:{s:4:"full";s:53:"/bitrix/js/main/core/core_ajax.min.js?149752499521127";s:6:"source";s:33:"/bitrix/js/main/core/core_ajax.js";s:3:"min";s:37:"/bitrix/js/main/core/core_ajax.min.js";s:3:"map";s:37:"/bitrix/js/main/core/core_ajax.map.js";}"*/
(function(e){if(e.BX.ajax)return;var a=e.BX,t={},r={method:"GET",dataType:"html",timeout:0,async:true,processData:true,scriptsRunFirst:false,emulateOnload:true,skipAuthCheck:false,start:true,cache:true,preparePost:true,headers:false,lsTimeout:30,lsForce:false},o=null,s={},n=[],i={url_utf:/[^\034-\254]+/g,script_self:/\/bitrix\/js\/main\/core\/core(_ajax)*.js$/i,script_self_window:/\/bitrix\/js\/main\/core\/core_window.js$/i,script_self_admin:/\/bitrix\/js\/main\/core\/core_admin.js$/i,script_onload:/window.onload/g};a.ajax=function(e){var o,s;if(!e||!e.url||!a.type.isString(e.url)){return false}for(var n in t)if(typeof e[n]=="undefined")e[n]=t[n];t={};for(n in r)if(typeof e[n]=="undefined")e[n]=r[n];e.method=e.method.toUpperCase();if(!a.localStorage)e.lsId=null;if(a.browser.IsIE()){var u=i.url_utf.exec(e.url);if(u){do{e.url=e.url.replace(u,a.util.urlencode(u));u=i.url_utf.exec(e.url)}while(u)}}if(e.dataType=="json")e.emulateOnload=false;if(!e.cache&&e.method=="GET")e.url=a.ajax._uncache(e.url);if(e.method=="POST"&&e.preparePost){e.data=a.ajax.prepareData(e.data)}var l=true;if(e.lsId&&!e.lsForce){var c=a.localStorage.get("ajax-"+e.lsId);if(c!==null){l=false;var f=function(t){if(t.key=="ajax-"+e.lsId&&t.value!="BXAJAXWAIT"){var r=t.value,o=!!t.oldValue&&r==null;if(!o)a.ajax.__run(e,r);else if(e.onfailure)e.onfailure("timeout");a.removeCustomEvent("onLocalStorageChange",f)}};if(c=="BXAJAXWAIT"){a.addCustomEvent("onLocalStorageChange",f)}else{setTimeout(function(){f({key:"ajax-"+e.lsId,value:c})},10)}}}if(l){e.xhr=a.ajax.xhr();if(!e.xhr)return;if(e.lsId){a.localStorage.set("ajax-"+e.lsId,"BXAJAXWAIT",e.lsTimeout)}e.xhr.open(e.method,e.url,e.async);if(!e.skipBxHeader&&!a.ajax.isCrossDomain(e.url)){e.xhr.setRequestHeader("Bx-ajax","true")}if(e.method=="POST"&&e.preparePost){e.xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")}if(typeof e.headers=="object"){for(n=0;n<e.headers.length;n++)e.xhr.setRequestHeader(e.headers[n].name,e.headers[n].value)}if(!!e.onprogress){a.bind(e.xhr,"progress",e.onprogress)}var h=false;var p=e.xhr.onreadystatechange=function(t){if(h)return;if(t==="timeout"){if(e.onfailure){e.onfailure("timeout")}a.onCustomEvent(e.xhr,"onAjaxFailure",["timeout","",e]);e.xhr.onreadystatechange=a.DoNothing;e.xhr.abort();if(e.async){e.xhr=null}}else{if(e.xhr.readyState==4||t=="run"){o=a.ajax.xhrSuccess(e.xhr)?"success":"error";h=true;e.xhr.onreadystatechange=a.DoNothing;if(o=="success"){var r=!!e.skipAuthCheck||a.ajax.isCrossDomain(e.url)?false:e.xhr.getResponseHeader("X-Bitrix-Ajax-Status");if(!!r&&r=="Authorize"){if(e.onfailure){e.onfailure("auth",e.xhr.status)}a.onCustomEvent(e.xhr,"onAjaxFailure",["auth",e.xhr.status,e])}else{var s=e.xhr.responseText;if(e.lsId){a.localStorage.set("ajax-"+e.lsId,s,e.lsTimeout)}a.ajax.__run(e,s)}}else{if(e.onfailure){e.onfailure("status",e.xhr.status)}a.onCustomEvent(e.xhr,"onAjaxFailure",["status",e.xhr.status,e])}if(e.async){e.xhr=null}}}};if(e.async&&e.timeout>0){setTimeout(function(){if(e.xhr&&!h){p("timeout")}},e.timeout*1e3)}if(e.start){e.xhr.send(e.data);if(!e.async){p("run")}}return e.xhr}};a.ajax.xhr=function(){if(e.XMLHttpRequest){try{return new XMLHttpRequest}catch(a){}}else if(e.ActiveXObject){try{return new e.ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(a){}try{return new e.ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(a){}try{return new e.ActiveXObject("Msxml2.XMLHTTP")}catch(a){}try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(a){}throw new Error("This browser does not support XMLHttpRequest.")}return null};a.ajax.isCrossDomain=function(t,r){r=r||e.location;if(t.indexOf("//")===0){t=r.protocol+t}if(t.indexOf("http")!==0){return false}var o=e.document.createElement("a");o.href=t;return o.protocol!==r.protocol||o.hostname!==r.hostname||a.ajax.getHostPort(o.protocol,o.host)!==a.ajax.getHostPort(r.protocol,r.host)};a.ajax.getHostPort=function(e,a){var t=/:(\d+)$/.exec(a);if(t){return t[1]}else{if(e==="http:"){return"80"}else if(e==="https:"){return"443"}}return""};a.ajax.__prepareOnload=function(t){if(t.length>0){a.ajax["onload_"+o]=null;for(var r=0,s=t.length;r<s;r++){if(t[r].isInternal){t[r].JS=t[r].JS.replace(i.script_onload,"BX.ajax.onload_"+o)}}}a.CaptureEventsGet();a.CaptureEvents(e,"load")};a.ajax.__runOnload=function(){if(null!=a.ajax["onload_"+o]){a.ajax["onload_"+o].apply(e);a.ajax["onload_"+o]=null}var t=a.CaptureEventsGet();if(t){for(var r=0;r<t.length;r++)t[r].apply(e)}};a.ajax.__run=function(e,t){if(!e.processData){if(e.onsuccess){e.onsuccess(t)}a.onCustomEvent(e.xhr,"onAjaxSuccess",[t,e])}else{t=a.ajax.processRequestData(t,e)}};a.ajax._onParseJSONFailure=function(e){this.jsonFailure=true;this.jsonResponse=e;this.jsonProactive=/^\[WAF\]/.test(e)};a.ajax.processRequestData=function(e,t){var r,s=[],n=[];switch(t.dataType.toUpperCase()){case"JSON":a.addCustomEvent(t.xhr,"onParseJSONFailure",a.proxy(a.ajax._onParseJSONFailure,t));r=a.parseJSON(e,t.xhr);a.removeCustomEvent(t.xhr,"onParseJSONFailure",a.proxy(a.ajax._onParseJSONFailure,t));if(!!r&&a.type.isArray(r["bxjs"])){for(var i=0;i<r["bxjs"].length;i++){if(a.type.isNotEmptyString(r["bxjs"][i])){s.push({isInternal:false,JS:r["bxjs"][i],bRunFirst:t.scriptsRunFirst})}else{s.push(r["bxjs"][i])}}}if(!!r&&a.type.isArray(r["bxcss"])){n=r["bxcss"]}break;case"SCRIPT":s.push({isInternal:true,JS:e,bRunFirst:t.scriptsRunFirst});r=e;break;default:var u=a.processHTML(e,t.scriptsRunFirst);r=u.HTML;s=u.SCRIPT;n=u.STYLE;break}var l=false;if(null==o){o=parseInt(Math.random()*1e6);l=true}if(n.length>0)a.loadCSS(n);if(t.emulateOnload)a.ajax.__prepareOnload(s);var c=a.DoNothing;if(t.emulateOnload||l){c=a.defer(function(){if(t.emulateOnload)a.ajax.__runOnload();if(l)o=null;a.onCustomEvent(t.xhr,"onAjaxSuccessFinish",[t])})}try{if(!!t.jsonFailure){throw{type:"json_failure",data:t.jsonResponse,bProactive:t.jsonProactive}}t.scripts=s;a.ajax.processScripts(t.scripts,true);if(t.onsuccess){t.onsuccess(r)}a.onCustomEvent(t.xhr,"onAjaxSuccess",[r,t]);a.ajax.processScripts(t.scripts,false,c)}catch(f){if(t.onfailure)t.onfailure("processing",f);a.onCustomEvent(t.xhr,"onAjaxFailure",["processing",f,t])}};a.ajax.processScripts=function(e,t,r){var o=[],s="";r=r||a.DoNothing;for(var n=0,i=e.length;n<i;n++){if(typeof t!="undefined"&&t!=!!e[n].bRunFirst)continue;if(e[n].isInternal)s+=";"+e[n].JS;else o.push(e[n].JS)}o=a.util.array_unique(o);var u=s.length>0?function(){a.evalGlobal(s)}:a.DoNothing;if(o.length>0){a.load(o,function(){u();r()})}else{u();r()}};a.ajax.prepareData=function(e,t){var r="";if(a.type.isString(e))r=e;else if(null!=e){for(var o in e){if(e.hasOwnProperty(o)){if(r.length>0)r+="&";var s=a.util.urlencode(o);if(t)s=t+"["+s+"]";if(typeof e[o]=="object")r+=a.ajax.prepareData(e[o],s);else r+=s+"="+a.util.urlencode(e[o])}}}return r};a.ajax.xhrSuccess=function(e){return e.status>=200&&e.status<300||e.status===304||e.status===1223||e.status===0};a.ajax.Setup=function(e,a){a=!!a;for(var o in e){if(a)t[o]=e[o];else r[o]=e[o]}};a.ajax.replaceLocalStorageValue=function(e,t,r){if(!!a.localStorage)a.localStorage.set("ajax-"+e,t,r)};a.ajax._uncache=function(e){return e+((e.indexOf("?")!==-1?"&":"?")+"_="+(new Date).getTime())};a.ajax.get=function(e,t,r){if(a.type.isFunction(t)){r=t;t=""}t=a.ajax.prepareData(t);if(t){e+=(e.indexOf("?")!==-1?"&":"?")+t;t=""}return a.ajax({method:"GET",dataType:"html",url:e,data:"",onsuccess:r})};a.ajax.getCaptcha=function(e){return a.ajax.loadJSON("/bitrix/tools/ajax_captcha.php",e)};a.ajax.insertToNode=function(e,r){r=a(r);if(!!r){var o={cancel:false};a.onCustomEvent("onAjaxInsertToNode",[{url:e,node:r,eventArgs:o}]);if(o.cancel===true){return}var s=null;if(!t.denyShowWait){s=a.showWait(r);delete t.denyShowWait}return a.ajax.get(e,function(e){r.innerHTML=e;a.closeWait(r,s)})}};a.ajax.post=function(e,t,r){t=a.ajax.prepareData(t);return a.ajax({method:"POST",dataType:"html",url:e,data:t,onsuccess:r})};a.ajax.loadScriptAjax=function(e,t,r){if(a.type.isArray(e)){for(var o=0,n=e.length;o<n;o++){a.ajax.loadScriptAjax(e[o],t,r)}}else{var u=e.replace(/\.js\?.*/,".js");if(i.script_self.test(u))return;if(i.script_self_window.test(u)&&a.CWindow)return;if(i.script_self_admin.test(u)&&a.admin)return;if(typeof s[u]=="undefined"){if(!!r){s[u]="";return a.loadScript(e)}else{return a.ajax({url:e,method:"GET",dataType:"script",processData:true,emulateOnload:false,scriptsRunFirst:true,async:false,start:true,onsuccess:function(e){s[u]=e;if(t)t(e)}})}}else if(t){t(s[u])}}};a.ajax.loadJSON=function(e,t,r,o){if(a.type.isFunction(t)){o=r;r=t;t=""}t=a.ajax.prepareData(t);if(t){e+=(e.indexOf("?")!==-1?"&":"?")+t;t=""}return a.ajax({method:"GET",dataType:"json",url:e,onsuccess:r,onfailure:o})};a.ajax.load=function(e,t){if(!a.type.isArray(e))e=[e];var r=0;if(!a.type.isFunction(t))t=a.DoNothing;var o=function(e){if(a.type.isFunction(this.callback))this.callback(e);if(++r>=n)t()};for(var s=0,n=e.length;s<n;s++){switch(e[s].type.toUpperCase()){case"SCRIPT":a.loadScript([e[s].url],a.proxy(o,e[s]));break;case"CSS":a.loadCSS([e[s].url]);if(++r>=n)t();break;case"JSON":a.ajax.loadJSON(e[s].url,a.proxy(o,e[s]));break;default:a.ajax.get(e[s].url,"",a.proxy(o,e[s]));break}}};a.ajax.submit=function(e,t){if(!e.target){if(null==e.BXFormTarget){var r="formTarget_"+Math.random();e.BXFormTarget=document.body.appendChild(a.create("IFRAME",{props:{name:r,id:r,src:"javascript:void(0)"},style:{display:"none"}}))}e.target=e.BXFormTarget.name}e.BXFormCallback=t;a.bind(e.BXFormTarget,"load",a.proxy(a.ajax._submit_callback,e));a.submit(e);return false};a.ajax.submitComponentForm=function(t,r,o){if(!t.target){if(null==t.BXFormTarget){var s="formTarget_"+Math.random();t.BXFormTarget=document.body.appendChild(a.create("IFRAME",{props:{name:s,id:s,src:"javascript:void(0)"},style:{display:"none"}}))}t.target=t.BXFormTarget.name}if(!!o)var n=a.showWait(r);t.BXFormCallback=function(t){if(!!o)a.closeWait(n);var s=function(){if(!!e.bxcompajaxframeonload){setTimeout(function(){e.bxcompajaxframeonload();e.bxcompajaxframeonload=null},10)}};a(r).innerHTML=t;a.onCustomEvent("onAjaxSuccess",[null,null,s])};a.bind(t.BXFormTarget,"load",a.proxy(a.ajax._submit_callback,t));return true};a.ajax._submit_callback=function(){try{if(this.BXFormTarget.contentWindow.location.href.indexOf("http")!=0)return}catch(e){return}if(this.BXFormCallback)this.BXFormCallback.apply(this,[this.BXFormTarget.contentWindow.document.body.innerHTML]);a.unbindAll(this.BXFormTarget)};a.ajax.prepareForm=function(e,a){a=!!a?a:{};var t,r,o,s=[],n=e.elements.length,i=0,u=0;if(!!e){for(t=0;t<n;t++){o=e.elements[t];if(o.disabled)continue;if(!o.type)continue;switch(o.type.toLowerCase()){case"text":case"textarea":case"password":case"number":case"hidden":case"select-one":s.push({name:o.name,value:o.value});u+=o.name.length+o.value.length;break;case"file":if(!!o.files){for(r=0;r<o.files.length;r++){i++;s.push({name:o.name,value:o.files[r],file:true});u+=o.files[r].size}}break;case"radio":case"checkbox":if(o.checked){s.push({name:o.name,value:o.value});u+=o.name.length+o.value.length}break;case"select-multiple":for(var l=0;l<o.options.length;l++){if(o.options[l].selected){s.push({name:o.name,value:o.options[l].value});u+=o.name.length+o.options[l].length}}break;default:break}}t=0;u=0;var c=a,f,h,p;while(t<s.length){var d=s[t].name.indexOf("[");if(d==-1){c[s[t].name]=s[t].value;c=a;t++}else{f=s[t].name.substring(0,d);h=s[t].name.substring(d+1);p=h.indexOf("]");if(p==-1){if(!c[f])c[f]=[];c=a;t++}else if(p==0){if(!c[f])c[f]=[];c=c[f];s[t].name=""+c.length}else{if(!c[f])c[f]={};c=c[f];s[t].name=h.substring(0,p)+h.substring(p+1)}}}}return{data:a,filesCount:i,roughSize:u}};a.ajax.submitAjax=function(t,r){r=r!==null&&typeof r=="object"?r:{};r.url=r["url"]||t.getAttribute("action");var o=r["data"]||{};r.data=a.ajax.prepareForm(t).data;for(var s in o){if(o.hasOwnProperty(s)){r.data[s]=o[s]}}if(!e["FormData"]){a.ajax(r)}else{var n=function(e){var a=Object.prototype.toString.call(e);return a=="[object File]"||a=="[object Blob]"},i=function(e,a,t){if(!!t&&typeof t=="object"&&!n(t)){for(var r in t){if(t.hasOwnProperty(r)){i(e,a==""?r:a+"["+r+"]",t[r])}}}else e.append(a,!!t?t:"")},u=function(e){var t={};if(null!=e){if(typeof e=="object"){for(var r in e){if(e.hasOwnProperty(r)){var o=a.util.urlencode(r);if(typeof e[r]=="object"&&e[r]["file"]!==true)t[o]=u(e[r]);else if(e[r]["file"]===true)t[o]=e[r]["value"];else t[o]=a.util.urlencode(e[r])}}}else t=a.util.urlencode(e)}return t},l=new e.FormData;if(r.method!=="POST"){r.data=a.ajax.prepareData(r.data);if(r.data){r.url+=(r.url.indexOf("?")!==-1?"&":"?")+r.data;r.data=""}}else{if(r.preparePost===true)r.data=u(r.data);i(l,"",r.data);r.data=l}r.preparePost=false;r.start=false;var c=a.ajax(r);if(!!r["onprogress"])c.upload.addEventListener("progress",function(e){var a=null;if(e.lengthComputable&&(e.total||e["totalSize"])){a=e.loaded*100/(e.total||e["totalSize"])}r["onprogress"](e,a)});c.send(l)}};a.ajax.UpdatePageData=function(e){if(e.TITLE)a.ajax.UpdatePageTitle(e.TITLE);if(e.WINDOW_TITLE||e.TITLE)a.ajax.UpdateWindowTitle(e.WINDOW_TITLE||e.TITLE);if(e.NAV_CHAIN)a.ajax.UpdatePageNavChain(e.NAV_CHAIN);if(e.CSS&&e.CSS.length>0)a.loadCSS(e.CSS);if(e.SCRIPTS&&e.SCRIPTS.length>0){var t=function(r,o,s){if(!!o&&a.type.isArray(o.scripts)){for(var n=0,i=e.SCRIPTS.length;n<i;n++){o.scripts.push({isInternal:false,JS:e.SCRIPTS[n]})}}else{a.loadScript(e.SCRIPTS,s)}a.removeCustomEvent("onAjaxSuccess",t)};a.addCustomEvent("onAjaxSuccess",t)}else{var r=function(e,t,o){if(a.type.isFunction(o)){o()}a.removeCustomEvent("onAjaxSuccess",r)};a.addCustomEvent("onAjaxSuccess",r)}};a.ajax.UpdatePageTitle=function(e){var t=a("pagetitle");if(t){t.removeChild(t.firstChild);if(!t.firstChild)t.appendChild(document.createTextNode(e));else t.insertBefore(document.createTextNode(e),t.firstChild)}};a.ajax.UpdateWindowTitle=function(e){document.title=e};a.ajax.UpdatePageNavChain=function(e){var t=a("navigation");if(t){t.innerHTML=e}};a.userOptions={options:null,bSend:false,delay:5e3,path:"/bitrix/admin/user_options.php?"};a.userOptions.setAjaxPath=function(e){a.userOptions.path=e.indexOf("?")==-1?e+"?":e+"&"};a.userOptions.save=function(e,t,r,o,s){if(null==a.userOptions.options)a.userOptions.options={};s=!!s;a.userOptions.options[e+"."+t+"."+r]=[e,t,r,o,s];var n=a.userOptions.__get();if(n!="")document.cookie=a.message("COOKIE_PREFIX")+"_LAST_SETTINGS="+encodeURIComponent(n)+"&sessid="+a.bitrix_sessid()+"; expires=Thu, 31 Dec 2020 23:59:59 GMT; path=/;";if(!a.userOptions.bSend){a.userOptions.bSend=true;setTimeout(function(){a.userOptions.send(null)},a.userOptions.delay)}};a.userOptions.send=function(e){var t=a.userOptions.__get();a.userOptions.options=null;a.userOptions.bSend=false;if(t!=""){document.cookie=a.message("COOKIE_PREFIX")+"_LAST_SETTINGS=; path=/;";a.ajax({method:"GET",dataType:"html",processData:false,cache:false,url:a.userOptions.path+t+"&sessid="+a.bitrix_sessid(),onsuccess:e})}};a.userOptions.del=function(e,t,r,o){a.ajax.get(a.userOptions.path+"action=delete&c="+e+"&n="+t+(r==true?"&common=Y":"")+"&sessid="+a.bitrix_sessid(),o)};a.userOptions.__get=function(){if(!a.userOptions.options)return"";var e="",t=-1,r="",o,s;for(s in a.userOptions.options){if(a.userOptions.options.hasOwnProperty(s)){o=a.userOptions.options[s];if(r!=o[0]+"."+o[1]){t++;e+="&p["+t+"][c]="+a.util.urlencode(o[0]);e+="&p["+t+"][n]="+a.util.urlencode(o[1]);if(o[4]==true)e+="&p["+t+"][d]=Y";r=o[0]+"."+o[1]}e+="&p["+t+"][v]["+a.util.urlencode(o[2])+"]="+a.util.urlencode(o[3])}}return e.substr(1)};a.ajax.history={expected_hash:"",obParams:null,obFrame:null,obImage:null,obTimer:null,bInited:false,bHashCollision:false,bPushState:!!(history.pushState&&a.type.isFunction(history.pushState)),startState:null,init:function(t){if(a.ajax.history.bInited)return;this.obParams=t;var r=this.obParams.getState();if(a.ajax.history.bPushState){a.ajax.history.expected_hash=e.location.pathname;if(e.location.search)a.ajax.history.expected_hash+=e.location.search;a.ajax.history.put(r,a.ajax.history.expected_hash,"",true);setTimeout(function(){a.bind(e,"popstate",a.ajax.history.__hashListener)},500)}else{a.ajax.history.expected_hash=e.location.hash;if(!a.ajax.history.expected_hash||a.ajax.history.expected_hash=="#")a.ajax.history.expected_hash="__bx_no_hash__";u.put(a.ajax.history.expected_hash,r);a.ajax.history.obTimer=setTimeout(a.ajax.history.__hashListener,500);if(a.browser.IsIE()){a.ajax.history.obFrame=document.createElement("IFRAME");a.hide_object(a.ajax.history.obFrame);document.body.appendChild(a.ajax.history.obFrame);a.ajax.history.obFrame.contentWindow.document.open();a.ajax.history.obFrame.contentWindow.document.write(a.ajax.history.expected_hash);a.ajax.history.obFrame.contentWindow.document.close()}else if(a.browser.IsOpera()){a.ajax.history.obImage=document.createElement("IMG");a.hide_object(a.ajax.history.obImage);document.body.appendChild(a.ajax.history.obImage);a.ajax.history.obImage.setAttribute("src","javascript:location.href = 'javascript:BX.ajax.history.__hashListener();';")}}a.ajax.history.bInited=true},__hashListener:function(t){t=t||e.event||{state:false};if(a.ajax.history.bPushState){a.ajax.history.obParams.setState(t.state||a.ajax.history.startState)}else{if(a.ajax.history.obTimer){e.clearTimeout(a.ajax.history.obTimer);a.ajax.history.obTimer=null}var r;if(null!=a.ajax.history.obFrame)r=a.ajax.history.obFrame.contentWindow.document.body.innerText;else r=e.location.hash;if(!r||r=="#")r="__bx_no_hash__";if(r.indexOf("#")==0)r=r.substring(1);if(r!=a.ajax.history.expected_hash){var o=u.get(r);if(o){a.ajax.history.obParams.setState(o);a.ajax.history.expected_hash=r;if(null!=a.ajax.history.obFrame){var s=r=="__bx_no_hash__"?"":r;if(e.location.hash!=s&&e.location.hash!="#"+s)e.location.hash=s}}}a.ajax.history.obTimer=setTimeout(a.ajax.history.__hashListener,500)}},put:function(t,r,o,s){if(this.bPushState){if(!s){history.pushState(t,"",r)}else{a.ajax.history.startState=t}}else{if(typeof o!="undefined")r=o;else r="view"+r;u.put(r,t);a.ajax.history.expected_hash=r;e.location.hash=a.util.urlencode(r);if(null!=a.ajax.history.obFrame){a.ajax.history.obFrame.contentWindow.document.open();a.ajax.history.obFrame.contentWindow.document.write(r);a.ajax.history.obFrame.contentWindow.document.close()}}},checkRedirectStart:function(t,r){var o=e.location.hash;if(o.substring(0,1)=="#")o=o.substring(1);var s=o.substring(0,5);if(s=="view/"||s=="view%"){a.ajax.history.bHashCollision=true;document.write("<"+'div id="__ajax_hash_collision_'+r+'" style="display: none;">')}},checkRedirectFinish:function(t,r){document.write("</div>");var o=e.location.hash;if(o.substring(0,1)=="#")o=o.substring(1);a.ready(function(){var e=o.substring(0,5);if(e=="view/"||e=="view%"){var s=a("__ajax_hash_collision_"+r);var n=s.firstChild;a.cleanNode(n);s.style.display="block";if(e!="view%")o=a.util.urlencode(o);o+=(o.indexOf("%3F")==-1?"%3F":"%26")+t+"="+r;var i="/bitrix/tools/ajax_redirector.php?hash="+o;a.ajax.insertToNode(i,n)}})}};a.ajax.component=function(e){this.node=e};a.ajax.component.prototype.getState=function(){var t={node:this.node,title:e.document.title,data:a(this.node).innerHTML};var r=a("navigation");if(null!=r)t.nav_chain=r.innerHTML;a.onCustomEvent(a(t.node),"onComponentAjaxHistoryGetState",[t]);return t};a.ajax.component.prototype.setState=function(e){a(e.node).innerHTML=e.data;a.ajax.UpdatePageTitle(e.title);if(e.nav_chain){a.ajax.UpdatePageNavChain(e.nav_chain)}a.onCustomEvent(a(e.node),"onComponentAjaxHistorySetState",[e])};var u={arHistory:{},put:function(e,a){this.arHistory[e]=a},get:function(e){return this.arHistory[e]}};a.ajax.FormData=function(){this.elements=[];this.files=[];this.features={};this.isSupported();this.log("BX FormData init")};a.ajax.FormData.isSupported=function(){var e=new a.ajax.FormData;var t=e.features.supported;e=null;return t};a.ajax.FormData.prototype.log=function(e){if(false){try{if(a.browser.IsIE())e=JSON.stringify(e);console.log(e)}catch(t){}}};a.ajax.FormData.prototype.isSupported=function(){var a={};a.fileReader=e.FileReader&&e.FileReader.prototype.readAsBinaryString;a.readFormData=a.sendFormData=!!e.FormData;a.supported=!!(a.readFormData&&a.sendFormData);this.features=a;this.log("features:");this.log(a);return a.supported};a.ajax.FormData.prototype.append=function(e,a){if(typeof a==="object"){this.files.push({name:e,value:a})}else{this.elements.push({name:e,value:a})}};a.ajax.FormData.prototype.send=function(e,t,r,o){this.log("FD send");this.xhr=a.ajax({method:"POST",dataType:"html",url:e,onsuccess:t,onfailure:o,start:false,preparePost:false});if(r){this.xhr.upload.addEventListener("progress",function(e){if(e.lengthComputable)r(e.loaded/(e.total||e.totalSize))},false)}if(this.features.readFormData&&this.features.sendFormData){var s=new FormData;this.log("use browser formdata");for(var n in this.elements){if(this.elements.hasOwnProperty(n))s.append(this.elements[n].name,this.elements[n].value)}for(n in this.files){if(this.files.hasOwnProperty(n))s.append(this.files[n].name,this.files[n].value)}this.xhr.send(s)}return this.xhr};a.addCustomEvent("onAjaxFailure",a.debug)})(window);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:48:"/bitrix/js/main/json/json2.min.js?14805039293442";s:6:"source";s:33:"/bitrix/js/main/json/json2.min.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/

var JSON;if(!JSON){JSON={};}
(function(){'use strict';function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}}());
/* End */
;
; /* Start:"a:4:{s:4:"full";s:50:"/bitrix/js/main/core/core_ls.min.js?14805039297365";s:6:"source";s:31:"/bitrix/js/main/core/core_ls.js";s:3:"min";s:35:"/bitrix/js/main/core/core_ls.min.js";s:3:"map";s:35:"/bitrix/js/main/core/core_ls.map.js";}"*/
(function(e){if(e.BX.localStorage)return;var t=e.BX,r=null,o=null,a="_bxCurrentKey",i=false;t.localStorage=function(){this.keyChanges={};t.bind(t.browser.IsIE()&&!t.browser.IsIE9()?document:e,"storage",t.proxy(this._onchange,this));setInterval(t.delegate(this._clear,this),5e3)};t.localStorage.checkBrowser=function(){return i};t.localStorage.set=function(e,r,o){return t.localStorage.instance().set(e,r,o)};t.localStorage.get=function(e){return t.localStorage.instance().get(e)};t.localStorage.remove=function(e){return t.localStorage.instance().remove(e)};t.localStorage.instance=function(){if(!r){var e=t.localStorage.checkBrowser();if(e=="native")r=new t.localStorage;else if(e=="ie8")r=new t.localStorageIE8;else if(e=="ie7")r=new t.localStorageIE7;else{r={set:t.DoNothing,get:function(){return null},remove:t.DoNothing}}}return r};t.localStorage.prototype.prefix=function(){if(!o){o="bx"+t.message("USER_ID")+"-"+(t.message.SITE_ID?t.message("SITE_ID"):"admin")+"-"}return o};t.localStorage.prototype._onchange=function(r){r=r||e.event;if(!r.key)return;if(t.browser.DetectIeVersion()>0&&this.keyChanges[r.key]){this.keyChanges[r.key]=false;return}if(!!r.key&&r.key.substring(0,this.prefix().length)==this.prefix()){var o={key:r.key.substring(this.prefix().length,r.key.length),value:!!r.newValue?this._decode(r.newValue.substring(11,r.newValue.length)):null,oldValue:!!r.oldValue?this._decode(r.oldValue.substring(11,r.oldValue.length)):null};switch(o.key){case"BXGCE":if(o.value){t.onCustomEvent(o.value.e,o.value.p)}break;default:if(r.newValue)t.onCustomEvent(e,"onLocalStorageSet",[o]);if(r.oldValue&&!r.newValue)t.onCustomEvent(e,"onLocalStorageRemove",[o]);t.onCustomEvent(e,"onLocalStorageChange",[o]);break}}};t.localStorage.prototype._clear=function(){var e=+new Date,t,r;for(r=0;r<localStorage.length;r++){t=localStorage.key(r);if(t.substring(0,2)=="bx"){var o=localStorage.getItem(t).split(":",1)*1e3;if(e>=o)localStorage.removeItem(t)}}};t.localStorage.prototype._encode=function(e){if(typeof e=="object")e=JSON.stringify(e);else e=e.toString();return e};t.localStorage.prototype._decode=function(e){var t=null;if(!!e){try{t=JSON.parse(e)}catch(r){t=e}}return t};t.localStorage.prototype._trigger_error=function(e,r,o,a){t.onCustomEvent(this,"onLocalStorageError",[e,{key:r,value:o,ttl:a}])};t.localStorage.prototype.set=function(e,t,r){if(!r||r<=0)r=60;if(e==undefined||e==null||t==undefined)return false;this.keyChanges[this.prefix()+e]=true;try{localStorage.setItem(this.prefix()+e,Math.round(+new Date/1e3)+r+":"+this._encode(t))}catch(o){this._trigger_error(o,e,t,r)}};t.localStorage.prototype.get=function(e){var t=localStorage.getItem(this.prefix()+e);if(t){var r=t.split(":",1)*1e3;if(+new Date<=r){t=t.substring(11,t.length);return this._decode(t)}}return null};t.localStorage.prototype.remove=function(e){this.keyChanges[this.prefix()+e]=true;localStorage.removeItem(this.prefix()+e)};t.localStorageIE7=function(){this.NS="BXLocalStorage";this.__current_state={};this.keyChanges={};t.ready(t.delegate(this._Init,this))};t.extend(t.localStorageIE7,t.localStorage);t.localStorageIE7.prototype._Init=function(){this.storage_element=document.body.appendChild(t.create("DIV"));this.storage_element.addBehavior("#default#userData");this.storage_element.load(this.NS);var e=this.storage_element.xmlDocument,r=e.firstChild.attributes.length;for(var o=0;o<r;o++){if(!!e.firstChild.attributes[o]){var a=e.firstChild.attributes[o].nodeName;if(a.substring(0,this.prefix().length)==this.prefix()){this.__current_state[a]=e.firstChild.attributes[o].nodeValue}}}setInterval(t.delegate(this._Listener,this),500);setInterval(t.delegate(this._clear,this),5e3)};t.localStorageIE7.prototype._Listener=function(e){this.storage_element.load(this.NS);var t=this.storage_element.xmlDocument,r=t.firstChild.attributes.length,o,a,i;var l={},s=[];for(o=0;o<r;o++){if(!!t.firstChild.attributes[o]){a=t.firstChild.attributes[o].nodeName;if(a.substring(0,this.prefix().length)==this.prefix()){i=t.firstChild.attributes[o].nodeValue;if(this.__current_state[a]!=i){s.push({key:a,newValue:i,oldValue:this.__current_state[a]})}l[a]=i;delete this.__current_state[a]}}}for(o in this.__current_state){if(this.__current_state.hasOwnProperty(o)){s.push({key:o,newValue:undefined,oldValue:this.__current_state[o]})}}this.__current_state=l;for(o=0;o<s.length;o++){this._onchange(s[o])}};t.localStorageIE7.prototype._clear=function(){this.storage_element.load(this.NS);var e=this.storage_element.xmlDocument,t=e.firstChild.attributes.length,r=+new Date,o,a,i,l;for(o=0;o<t;o++){if(!!e.firstChild.attributes[o]){a=e.firstChild.attributes[o].nodeName;if(a.substring(0,2)=="bx"){i=e.firstChild.attributes[o].nodeValue;l=i.split(":",1)*1e3;if(r>=l){e.firstChild.removeAttribute(a)}}}}this.storage_element.save(this.NS)};t.localStorageIE7.prototype.set=function(e,t,r){if(!r||r<=0)r=60;try{this.storage_element.load(this.NS);var o=this.storage_element.xmlDocument;this.keyChanges[this.prefix()+e]=true;o.firstChild.setAttribute(this.prefix()+e,Math.round(+new Date/1e3)+r+":"+this._encode(t));this.storage_element.save(this.NS)}catch(a){this._trigger_error(a,e,t,r)}};t.localStorageIE7.prototype.get=function(e){this.storage_element.load(this.NS);var t=this.storage_element.xmlDocument;var r=t.firstChild.getAttribute(this.prefix()+e);if(r){var o=r.split(":",1)*1e3;if(+new Date<=o){r=r.substring(11,r.length);return this._decode(r)}}return null};t.localStorageIE7.prototype.remove=function(e){this.storage_element.load(this.NS);var t=this.storage_element.xmlDocument;t.firstChild.removeAttribute(this.prefix()+e);this.keyChanges[this.prefix()+e]=true;this.storage_element.save(this.NS)};t.localStorageIE8=function(){this.key=a;this.currentKey=null;this.currentValue=null;t.localStorageIE8.superclass.constructor.apply(this)};t.extend(t.localStorageIE8,t.localStorage);t.localStorageIE8.prototype._onchange=function(e){if(null==this.currentKey){this.currentKey=localStorage.getItem(this.key);if(this.currentKey){this.currentValue=localStorage.getItem(this.prefix()+this.currentKey)}}else{e={key:this.prefix()+this.currentKey,newValue:localStorage.getItem(this.prefix()+this.currentKey),oldValue:this.currentValue};this.currentKey=null;this.currentValue=null;if(this.keyChanges[e.key]){this.keyChanges[e.key]=false;return}t.localStorageIE8.superclass._onchange.apply(this,[e])}};t.localStorageIE8.prototype.set=function(e,r,o){this.currentKey=null;this.keyChanges[this.prefix()+e]=true;try{localStorage.setItem(this.key,e);t.localStorageIE8.superclass.set.apply(this,arguments)}catch(a){this._trigger_error(a,e,r,o)}};t.localStorageIE8.prototype.remove=function(e){this.currentKey=null;this.keyChanges[this.prefix()+e]=true;localStorage.setItem(this.key,e);t.localStorageIE8.superclass.remove.apply(this,arguments)};t.onGlobalCustomEvent=function(e,r,o){if(!!t.localStorage.checkBrowser())t.localStorage.set("BXGCE",{e:e,p:r},1);if(!o)t.onCustomEvent(e,r)};try{i=!!localStorage.setItem}catch(l){}if(i){i="native";var s=t.browser.IsIE()&&!t.browser.IsIE9()?document:e,n=function(r){if(typeof(r||e.event).key=="undefined")i="ie8";t.unbind(s,"storage",n);t.localStorage.instance()};t.bind(s,"storage",n);try{localStorage.setItem(a,null)}catch(l){i=false;t.localStorage.instance()}}else if(t.browser.IsIE7()){i="ie7";t.localStorage.instance()}})(window);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:50:"/bitrix/js/main/core/core_fx.min.js?14975249959768";s:6:"source";s:31:"/bitrix/js/main/core/core_fx.js";s:3:"min";s:35:"/bitrix/js/main/core/core_fx.min.js";s:3:"map";s:35:"/bitrix/js/main/core/core_fx.map.js";}"*/
(function(t){var i={time:1,step:.05,type:"linear",allowFloat:false};BX.fx=function(t){this.options=t;if(null!=this.options.time)this.options.originalTime=this.options.time;if(null!=this.options.step)this.options.originalStep=this.options.step;if(!this.__checkOptions())return false;this.__go=BX.delegate(this.go,this);this.PARAMS={}};BX.fx.prototype.__checkOptions=function(){if(typeof this.options.start!=typeof this.options.finish)return false;if(null==this.options.time)this.options.time=i.time;if(null==this.options.step)this.options.step=i.step;if(null==this.options.type)this.options.type=i.type;if(null==this.options.allowFloat)this.options.allowFloat=i.allowFloat;this.options.time*=1e3;this.options.step*=1e3;if(typeof this.options.start!="object"){this.options.start={_param:this.options.start};this.options.finish={_param:this.options.finish}}var e;for(e in this.options.start){if(null==this.options.finish[e]){this.options.start[e]=null;delete this.options.start[e]}}if(!BX.type.isFunction(this.options.type)){if(BX.type.isFunction(t[this.options.type]))this.options.type=t[this.options.type];else if(BX.type.isFunction(BX.fx.RULES[this.options.type]))this.options.type=BX.fx.RULES[this.options.type];else this.options.type=BX.fx.RULES[i.type]}return true};BX.fx.prototype.go=function(){var t=(new Date).valueOf();if(t<this.PARAMS.timeFinish){for(var i in this.PARAMS.current){this.PARAMS.current[i][0]=this.options.type.apply(this,[{start_value:this.PARAMS.start[i][0],finish_value:this.PARAMS.finish[i][0],current_value:this.PARAMS.current[i][0],current_time:t-this.PARAMS.timeStart,total_time:this.options.time}])}this._callback(this.options.callback);if(!this.paused)this.PARAMS.timer=setTimeout(this.__go,this.options.step)}else{this.stop()}};BX.fx.prototype._callback=function(t){var i={};t=t||this.options.callback;for(var e in this.PARAMS.current){i[e]=(this.options.allowFloat?this.PARAMS.current[e][0]:Math.round(this.PARAMS.current[e][0]))+this.PARAMS.current[e][1]}return t.apply(this,[null!=i["_param"]?i._param:i])};BX.fx.prototype.start=function(){var t,i,e;this.PARAMS.start={};this.PARAMS.current={};this.PARAMS.finish={};for(t in this.options.start){i=+this.options.start[t];e=(this.options.start[t]+"").substring((i+"").length);this.PARAMS.start[t]=[i,e];this.PARAMS.current[t]=[i,e];this.PARAMS.finish[t]=[+this.options.finish[t],e]}this._callback(this.options.callback_start);this._callback(this.options.callback);this.PARAMS.timeStart=(new Date).valueOf();this.PARAMS.timeFinish=this.PARAMS.timeStart+this.options.time;this.PARAMS.timer=setTimeout(BX.delegate(this.go,this),this.options.step);return this};BX.fx.prototype.pause=function(){if(this.paused){this.PARAMS.timer=setTimeout(this.__go,this.options.step);this.paused=false}else{clearTimeout(this.PARAMS.timer);this.paused=true}};BX.fx.prototype.stop=function(t){t=!!t;if(this.PARAMS.timer)clearTimeout(this.PARAMS.timer);if(null!=this.options.originalTime)this.options.time=this.options.originalTime;if(null!=this.options.originalStep)this.options.step=this.options.originalStep;this.PARAMS.current=this.PARAMS.finish;if(!t){this._callback(this.options.callback);this._callback(this.options.callback_complete)}};BX.fx.RULES={linear:function(t){return t.start_value+t.current_time/t.total_time*(t.finish_value-t.start_value)},decelerated:function(t){return t.start_value+Math.sqrt(t.current_time/t.total_time)*(t.finish_value-t.start_value)},accelerated:function(t){var i=t.current_time/t.total_time;return t.start_value+i*i*(t.finish_value-t.start_value)}};BX.fx.hide=function(t,i,e){t=BX(t);if(typeof i=="object"&&null==e){e=i;i=e.type}if(!e)e={};if(!BX.type.isNotEmptyString(i)){t.style.display="none";return}var s=BX.fx.EFFECTS[i](t,e,0);s.callback_complete=function(){if(e.hide!==false)t.style.display="none";if(e.callback_complete)e.callback_complete.apply(this,arguments)};return new BX.fx(s).start()};BX.fx.show=function(t,i,e){t=BX(t);if(typeof i=="object"&&null==e){e=i;i=e.type}if(!e)e={};if(!BX.type.isNotEmptyString(i)){t.style.display="block";return}var s=BX.fx.EFFECTS[i](t,e,1);s.callback_complete=function(){if(e.show!==false)t.style.display="block";if(e.callback_complete)e.callback_complete.apply(this,arguments)};return new BX.fx(s).start()};BX.fx.EFFECTS={scroll:function(t,e,s){if(!e.direction)e.direction="vertical";var n=e.direction=="horizontal"?"width":"height";var o=parseInt(BX.style(t,n));if(isNaN(o)){o=BX.pos(t)[n]}if(s==0)var a=o,r=e.min_height?parseInt(e.min_height):0;else var r=o,a=e.min_height?parseInt(e.min_height):0;return{start:a,finish:r,time:e.time||i.time,type:"linear",callback_start:function(){if(BX.style(t,"position")=="static")t.style.position="relative";t.style.overflow="hidden";t.style[n]=a+"px";t.style.display="block"},callback:function(i){t.style[n]=i+"px"}}},fade:function(t,e,s){var n={time:e.time||i.time,type:s==0?"decelerated":"linear",start:s==0?1:0,finish:s==0?0:1,allowFloat:true};if(BX.browser.IsIE()&&!BX.browser.IsIE9()){n.start*=100;n.finish*=100;n.allowFloat=false;n.callback_start=function(){t.style.display="block";t.style.filter+="progid:DXImageTransform.Microsoft.Alpha(opacity="+n.start+")"};n.callback=function(i){(t.filters["DXImageTransform.Microsoft.alpha"]||t.filters.alpha).opacity=i}}else{n.callback_start=function(){t.style.display="block"};n.callback=function(i){t.style.opacity=t.style.KhtmlOpacity=t.style.MozOpacity=i}}return n},fold:function(t,e,s){if(s!=0)return;var n=BX.pos(t);var o=n.height/(n.width+n.height);var a={time:e.time||i.time,callback_complete:e.callback_complete,hide:e.hide};e.type="scroll";e.direction="vertical";e.min_height=e.min_height||10;e.hide=false;e.time=o*a.time;e.callback_complete=function(){t.style.whiteSpace="nowrap";e.direction="horizontal";e.min_height=null;e.time=a.time-e.time;e.hide=a.hide;e.callback_complete=a.callback_complete;BX.fx.hide(t,e)};return BX.fx.EFFECTS.scroll(t,e,s)},scale:function(t,e,s){var n={width:parseInt(BX.style(t,"width")),height:parseInt(BX.style(t,"height"))};if(isNaN(n.width)||isNaN(n.height)){var o=BX.pos(t);n={width:o.width,height:o.height}}if(s==0)var a=n,r={width:0,height:0};else var r=n,a={width:0,height:0};return{start:a,finish:r,time:e.time||i.time,type:"linear",callback_start:function(){t.style.position="relative";t.style.overflow="hidden";t.style.display="block";t.style.height=a.height+"px";t.style.width=a.width+"px"},callback:function(i){t.style.height=i.height+"px";t.style.width=i.width+"px"}}}};var e={arStack:{},arRules:{},globalAnimationId:0};BX.fx.colorAnimate=function(t,i,s){if(t==null)return;animationId=t.getAttribute("data-animation-id");if(animationId==null){animationId=e.globalAnimationId;t.setAttribute("data-animation-id",e.globalAnimationId++)}var n=i.split(/\s*,\s*/);for(var o=0;o<n.length;o++){i=n[o];if(!e.arRules[i])continue;var a=0;if(!e.arStack[animationId]){e.arStack[animationId]={}}else if(e.arStack[animationId][i]){a=e.arStack[animationId][i].i;clearInterval(e.arStack[animationId][i].tId)}if(a==0&&s||a==e.arRules[i][3]&&!s)continue;e.arStack[animationId][i]={i:a,element:t,tId:setInterval('BX.fx.colorAnimate.run("'+animationId+'","'+i+'")',e.arRules[i][4]),back:Boolean(s)}}};BX.fx.colorAnimate.addRule=function(t,i,s,n,o,a,r){e.arRules[t]=[BX.util.hex2rgb(i),BX.util.hex2rgb(s),n.replace(/\-(.)/g,function(){return arguments[1].toUpperCase()}),o,a||1,r||false]};BX.fx.colorAnimate.run=function(t,i){element=e.arStack[t][i].element;e.arStack[t][i].i+=e.arStack[t][i].back?-1:1;var s=e.arStack[t][i].i/e.arRules[i][3];var n=1-s;var o=e.arRules[i][0];var a=e.arRules[i][1];element.style[e.arRules[i][2]]="rgb("+Math.floor(o["r"]*n+a["r"]*s)+","+Math.floor(o["g"]*n+a["g"]*s)+","+Math.floor(o["b"]*n+a["b"]*s)+")";if(e.arStack[t][i].i==e.arRules[i][3]||e.arStack[t][i].i==0){clearInterval(e.arStack[t][i].tId);if(e.arRules[i][5])BX.fx.colorAnimate(e.arStack[t][i].element,i,true)}};BX.easing=function(t){this.options=t;this.timer=null};BX.easing.prototype.animate=function(){if(!this.options||!this.options.start||!this.options.finish||typeof this.options.start!="object"||typeof this.options.finish!="object")return null;for(var t in this.options.start){if(typeof this.options.finish[t]=="undefined"){delete this.options.start[t]}}this.options.progress=function(t){var i={};for(var e in this.start)i[e]=Math.round(this.start[e]+(this.finish[e]-this.start[e])*t);if(this.step){this.step(i)}};this.animateProgress()};BX.easing.prototype.stop=function(t){if(this.timer){cancelAnimationFrame(this.timer);this.timer=null;if(t){this.options.complete&&this.options.complete()}}};BX.easing.prototype.animateProgress=function(){if(!t.requestAnimationFrame){this.options.progress(1);this.options.complete&&this.options.complete();return}var i=null;var e=this.options.transition||BX.easing.transitions.linear;var s=this.options.duration||1e3;var n=BX.proxy(function(t){if(i===null){i=t}var o=(t-i)/s;if(o>1){o=1}this.options.progress(e(o));if(o==1){this.stop(true)}else{this.timer=requestAnimationFrame(n)}},this);this.timer=requestAnimationFrame(n)};BX.easing.makeEaseInOut=function(t){return function(i){if(i<.5)return t(2*i)/2;else return(2-t(2*(1-i)))/2}};BX.easing.makeEaseOut=function(t){return function(i){return 1-t(1-i)}};BX.easing.transitions={linear:function(t){return t},quad:function(t){return Math.pow(t,2)},cubic:function(t){return Math.pow(t,3)},quart:function(t){return Math.pow(t,4)},quint:function(t){return Math.pow(t,5)},circ:function(t){return 1-Math.sin(Math.acos(t))},back:function(t){return Math.pow(t,2)*((1.5+1)*t-1.5)},elastic:function(t){return Math.pow(2,10*(t-1))*Math.cos(20*Math.PI*1.5/3*t)},bounce:function(t){for(var i=0,e=1;1;i+=e,e/=2){if(t>=(7-4*i)/11){return-Math.pow((11-6*i-11*t)/4,2)+Math.pow(e,2)}}}}})(window);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:45:"/bitrix/js/main/session.min.js?14805039292511";s:6:"source";s:26:"/bitrix/js/main/session.js";s:3:"min";s:30:"/bitrix/js/main/session.min.js";s:3:"map";s:30:"/bitrix/js/main/session.map.js";}"*/
function CBXSession(){var e=this;this.mess={};this.timeout=null;this.sessid=null;this.bShowMess=true;this.dateStart=new Date;this.dateInput=new Date;this.dateCheck=new Date;this.activityInterval=0;this.notifier=null;this.Expand=function(t,i,s,n){this.timeout=t;this.sessid=i;this.bShowMess=s;this.key=n;BX.ready(function(){BX.bind(document,"keypress",e.OnUserInput);BX.bind(document.body,"mousemove",e.OnUserInput);BX.bind(document.body,"click",e.OnUserInput);setTimeout(e.CheckSession,(e.timeout-60)*1e3)})};this.OnUserInput=function(){var t=new Date;e.dateInput.setTime(t.valueOf())};this.CheckSession=function(){var t=new Date;if(t.valueOf()-e.dateCheck.valueOf()<3e4)return;e.activityInterval=Math.round((e.dateInput.valueOf()-e.dateStart.valueOf())/1e3);e.dateStart.setTime(e.dateInput.valueOf());var i=e.activityInterval>e.timeout?e.timeout-60:e.activityInterval;var s={method:"GET",dataType:"html",url:"/bitrix/tools/public_session.php?sessid="+e.sessid+"&interval="+i+"&k="+e.key,data:"",onsuccess:function(t){e.CheckResult(t)},lsId:"sess_expand",lsTimeout:60};if(i>0){s.lsForce=true}BX.ajax(s)};this.CheckResult=function(t){if(t=="SESSION_EXPIRED"){if(e.bShowMess){if(!e.notifier){e.notifier=document.body.appendChild(BX.create("DIV",{props:{className:"bx-session-message"},style:{top:"0px",backgroundColor:"#FFEB41",border:"1px solid #EDDA3C",width:"630px",fontFamily:"Arial,Helvetica,sans-serif",fontSize:"13px",fontWeight:"bold",textAlign:"center",color:"black",position:"absolute",zIndex:"10000",padding:"10px"},html:'<a class="bx-session-message-close" style="display:block; width:12px; height:12px; background:url(/bitrix/js/main/core/images/close.gif) center no-repeat; float:right;" href="javascript:bxSession.Close()"></a>'+e.mess.messSessExpired}));var i=BX.GetWindowScrollPos();var s=BX.GetWindowInnerSize();e.notifier.style.left=parseInt(i.scrollLeft+s.innerWidth/2-parseInt(e.notifier.clientWidth)/2)+"px";if(BX.browser.IsIE()){e.notifier.style.top=i.scrollTop+"px";BX.bind(window,"scroll",function(){var t=BX.GetWindowScrollPos();e.notifier.style.top=t.scrollTop+"px"})}else{e.notifier.style.position="fixed"}}e.notifier.style.display=""}}else{var n;if(t=="SESSION_CHANGED")n=e.timeout-60;else n=e.activityInterval<60?60:e.activityInterval>e.timeout?e.timeout-60:e.activityInterval;var o=new Date;e.dateCheck.setTime(o.valueOf());setTimeout(e.CheckSession,n*1e3)}};this.Close=function(){this.notifier.style.display="none"}}var bxSession=new CBXSession;
/* End */
;
; /* Start:"a:4:{s:4:"full";s:55:"/bitrix/js/main/core/core_window.min.js?148050392974754";s:6:"source";s:35:"/bitrix/js/main/core/core_window.js";s:3:"min";s:39:"/bitrix/js/main/core/core_window.min.js";s:3:"map";s:39:"/bitrix/js/main/core/core_window.map.js";}"*/
(function(window){if(BX.WindowManager)return;BX.WindowManager={_stack:[],_runtime_resize:{},_delta:2,_delta_start:1e3,currently_loaded:null,settings_category:"BX.WindowManager.9.5",register:function(t){this.currently_loaded=null;var e=t.Get();e.style.zIndex=t.zIndex=this.GetZIndex();t.WM_REG_INDEX=this._stack.length;this._stack.push(t);if(this._stack.length<2){BX.bind(document,"keyup",BX.proxy(this.__checkKeyPress,this))}},unregister:function(t){if(null==t.WM_REG_INDEX)return null;var e;if(this._stack.length>0){while((e=this.__pop_stack())!=t){if(!e){e=null;break}}if(this._stack.length<=0){this.enableKeyCheck()}return e}else{return null}},__pop_stack:function(t){if(this._stack.length>0){var e=this._stack.pop();e.WM_REG_INDEX=null;BX.onCustomEvent(e,"onWindowUnRegister",[t===true]);return e}else return null},clean:function(){while(this.__pop_stack(true)){}this._stack=null;this.disableKeyCheck()},Get:function(){if(this.currently_loaded)return this.currently_loaded;else if(this._stack.length>0)return this._stack[this._stack.length-1];else return null},setStartZIndex:function(t){this._delta_start=t},restoreStartZIndex:function(){this._delta_start=1e3},GetZIndex:function(){var t;return null!=(t=this._stack[this._stack.length-1])?parseInt(t.Get().style.zIndex)+this._delta:this._delta_start},__get_check_url:function(t){var e=t.indexOf("?");return e==-1?t:t.substring(0,e)},saveWindowSize:function(t,e){var i=this.__get_check_url(t);if(BX.userOptions){BX.userOptions.save(this.settings_category,"size_"+i,"width",e.width);BX.userOptions.save(this.settings_category,"size_"+i,"height",e.height)}this._runtime_resize[i]=e},saveWindowOptions:function(t,e){if(BX.userOptions){for(var i in e){if(e.hasOwnProperty(i)){BX.userOptions.save(this.settings_category,"options_"+t,i,e[i])}}}},getRuntimeWindowSize:function(t){return this._runtime_resize[this.__get_check_url(t)]},disableKeyCheck:function(){BX.unbind(document,"keyup",BX.proxy(this.__checkKeyPress,this))},enableKeyCheck:function(){BX.bind(document,"keyup",BX.proxy(this.__checkKeyPress,this))},__checkKeyPress:function(t){if(null==t)t=window.event;if(t.keyCode==27){var e=BX.WindowManager.Get();if(e&&!e.unclosable)e.Close()}}};BX.garbage(BX.WindowManager.clean,BX.WindowManager);BX.CWindowButton=function(t){if(t.btn){this.btn=t.btn;this.parentWindow=t.parentWindow;if(/save|apply/i.test(this.btn.name)){BX.bind(this.btn,"click",BX.delegate(this.disableUntilError,this))}}else{this.title=t.title;this.hint=t.hint;this.id=t.id;this.name=t.name;this.className=t.className;this.action=t.action;this.onclick=t.onclick;if(t.Button&&BX.type.isFunction(t.Button))this.Button=t.Button;this.btn=null}};BX.CWindowButton.prototype.disable=function(){if(this.btn)this.parentWindow.showWait(this.btn)};BX.CWindowButton.prototype.enable=function(){if(this.btn)this.parentWindow.closeWait(this.btn)};BX.CWindowButton.prototype.emulate=function(){if(this.btn&&this.btn.disabled)return;var t=this.action?BX.delegate(this.action,this):this.onclick?this.onclick:this.btn?this.btn.getAttribute("onclick"):"";if(t){setTimeout(t,50);if(this.btn&&/save|apply/i.test(this.btn.name)&&!this.action){this.disableUntilError()}}};BX.CWindowButton.prototype.Button=function(parentWindow){this.parentWindow=parentWindow;var btn={props:{type:"button",name:this.id?this.id:this.name,value:this.title?this.title:this.name,id:this.id}};if(this.hint)btn.props.title=this.hint;if(!!this.className)btn.props.className=this.className;if(this.action){btn.events={click:BX.delegate(this.action,this)}}else if(this.onclick){if(BX.browser.IsIE()){btn.events={click:BX.delegate(function(){eval(this.onclick)},this)}}else{btn.attrs={onclick:this.onclick}}}this.btn=BX.create("INPUT",btn);return this.btn};BX.CWindowButton.prototype.disableUntilError=function(){this.disable();if(!this.__window_error_handler_set){BX.addCustomEvent(this.parentWindow,"onWindowError",BX.delegate(this.enable,this));this.__window_error_handler_set=true}};BX.CWindow=function(t,e){this.DIV=t||document.createElement("DIV");this.SETTINGS={resizable:false,min_height:0,min_width:0,top:0,left:0,draggable:false,drag_restrict:true,resize_restrict:true};this.ELEMENTS={draggable:[],resizer:[],close:[]};this.type=e=="float"?"float":"dialog";BX.adjust(this.DIV,{props:{className:"bx-core-window"},style:{zIndex:0,position:"absolute",display:"none",top:this.SETTINGS.top+"px",left:this.SETTINGS.left+"px",height:"100px",width:"100px"}});this.isOpen=false;BX.addCustomEvent(this,"onWindowRegister",BX.delegate(this.onRegister,this));BX.addCustomEvent(this,"onWindowUnRegister",BX.delegate(this.onUnRegister,this));this.MOUSEOVER=null;BX.bind(this.DIV,"mouseover",BX.delegate(this.__set_msover,this));BX.bind(this.DIV,"mouseout",BX.delegate(this.__unset_msover,this));BX.ready(BX.delegate(function(){document.body.appendChild(this.DIV)},this))};BX.CWindow.prototype.Get=function(){return this.DIV};BX.CWindow.prototype.visible=function(){return this.isOpen};BX.CWindow.prototype.Show=function(t){this.DIV.style.display="block";if(!t){BX.WindowManager.register(this);BX.onCustomEvent(this,"onWindowRegister")}};BX.CWindow.prototype.Hide=function(){BX.WindowManager.unregister(this);this.DIV.style.display="none"};BX.CWindow.prototype.onRegister=function(){this.isOpen=true};BX.CWindow.prototype.onUnRegister=function(t){this.isOpen=false;if(t||this.PARAMS&&this.PARAMS.content_url){if(t){BX.onCustomEvent(this,"onWindowClose",[this,true])}if(this.DIV.parentNode)this.DIV.parentNode.removeChild(this.DIV)}else{this.DIV.style.display="none"}};BX.CWindow.prototype.CloseDialog=BX.CWindow.prototype.Close=function(t){BX.onCustomEvent(this,"onBeforeWindowClose",[this]);if(t!==true){if(this.denyClose)return false}BX.onCustomEvent(this,"onWindowClose",[this]);if(this.bExpanded){var e=BX.GetDocElement();BX.unbind(window,"resize",BX.proxy(this.__expand_onresize,this));e.style.overflow=this.__expand_settings.overflow}BX.WindowManager.unregister(this);return true};BX.CWindow.prototype.SetResize=function(t){t.style.cursor="se-resize";BX.bind(t,"mousedown",BX.proxy(this.__startResize,this));this.ELEMENTS.resizer.push(t);this.SETTINGS.resizable=true};BX.CWindow.prototype.SetExpand=function(t,e){e=e||"click";BX.bind(t,e,BX.proxy(this.__expand,this))};BX.CWindow.prototype.__expand_onresize=function(){var t=BX.GetWindowInnerSize();this.DIV.style.width=t.innerWidth+"px";this.DIV.style.height=t.innerHeight+"px";BX.onCustomEvent(this,"onWindowResize")};BX.CWindow.prototype.__expand=function(){var t=BX.GetDocElement();if(!this.bExpanded){var e=BX.GetWindowScrollPos(),i=BX.GetWindowInnerSize();this.__expand_settings={resizable:this.SETTINGS.resizable,draggable:this.SETTINGS.draggable,width:this.DIV.style.width,height:this.DIV.style.height,left:this.DIV.style.left,top:this.DIV.style.top,scrollTop:e.scrollTop,scrollLeft:e.scrollLeft,overflow:BX.style(t,"overflow")};this.SETTINGS.resizable=false;this.SETTINGS.draggable=false;window.scrollTo(0,0);t.style.overflow="hidden";this.DIV.style.top="0px";this.DIV.style.left="0px";this.DIV.style.width=i.innerWidth+"px";this.DIV.style.height=i.innerHeight+"px";this.bExpanded=true;BX.onCustomEvent(this,"onWindowExpand");BX.onCustomEvent(this,"onWindowResize");BX.bind(window,"resize",BX.proxy(this.__expand_onresize,this))}else{BX.unbind(window,"resize",BX.proxy(this.__expand_onresize,this));this.SETTINGS.resizable=this.__expand_settings.resizable;this.SETTINGS.draggable=this.__expand_settings.draggable;t.style.overflow=this.__expand_settings.overflow;this.DIV.style.top=this.__expand_settings.top;this.DIV.style.left=this.__expand_settings.left;this.DIV.style.width=this.__expand_settings.width;this.DIV.style.height=this.__expand_settings.height;window.scrollTo(this.__expand_settings.scrollLeft,this.__expand_settings.scrollTop);this.bExpanded=false;BX.onCustomEvent(this,"onWindowNarrow");BX.onCustomEvent(this,"onWindowResize")}};BX.CWindow.prototype.Resize=function(t,e){var i=Math.max(t-this.pos.left+this.dx,this.SETTINGS.min_width);var s=Math.max(e-this.pos.top+this.dy,this.SETTINGS.min_height);if(this.SETTINGS.resize_restrict){var o=BX.GetWindowScrollSize();if(this.pos.left+i>o.scrollWidth-this.dw)i=o.scrollWidth-this.pos.left-this.dw}this.DIV.style.width=i+"px";this.DIV.style.height=s+"px";BX.onCustomEvent(this,"onWindowResize")};BX.CWindow.prototype.__startResize=function(t){if(!this.SETTINGS.resizable)return false;if(!t)t=window.event;this.wndSize=BX.GetWindowScrollPos();this.wndSize.innerWidth=BX.GetWindowInnerSize().innerWidth;this.pos=BX.pos(this.DIV);this.x=t.clientX+this.wndSize.scrollLeft;this.y=t.clientY+this.wndSize.scrollTop;this.dx=this.pos.left+this.pos.width-this.x;this.dy=this.pos.top+this.pos.height-this.y;this.dw=this.pos.width-parseInt(this.DIV.style.width);BX.bind(document,"mousemove",BX.proxy(this.__moveResize,this));BX.bind(document,"mouseup",BX.proxy(this.__stopResize,this));if(document.body.setCapture)document.body.setCapture();document.onmousedown=BX.False;var e=document.body;e.ondrag=e.onselectstart=BX.False;e.style.MozUserSelect=this.DIV.style.MozUserSelect="none";e.style.cursor="se-resize";BX.onCustomEvent(this,"onWindowResizeStart");return true};BX.CWindow.prototype.__moveResize=function(t){if(!t)t=window.event;var e=BX.GetWindowScrollPos();var i=t.clientX+e.scrollLeft;var s=t.clientY+e.scrollTop;if(this.x==i&&this.y==s)return;this.Resize(i,s);this.x=i;this.y=s};BX.CWindow.prototype.__stopResize=function(){if(document.body.releaseCapture)document.body.releaseCapture();BX.unbind(document,"mousemove",BX.proxy(this.__moveResize,this));BX.unbind(document,"mouseup",BX.proxy(this.__stopResize,this));document.onmousedown=null;var t=document.body;t.ondrag=t.onselectstart=null;t.style.MozUserSelect=this.DIV.style.MozUserSelect="";t.style.cursor="";BX.onCustomEvent(this,"onWindowResizeFinished")};BX.CWindow.prototype.SetClose=function(t){BX.bind(t,"click",BX.proxy(this.Close,this));this.ELEMENTS.close.push(t)};BX.CWindow.prototype.SetDraggable=function(t){BX.bind(t,"mousedown",BX.proxy(this.__startDrag,this));t.style.cursor="move";this.ELEMENTS.draggable.push(t);this.SETTINGS.draggable=true};BX.CWindow.prototype.Move=function(t,e){var i=1;var s=parseInt(this.DIV.style.left)+t;var o=parseInt(this.DIV.style.top)+e;if(this.SETTINGS.drag_restrict){if(s<0)s=0;var n=BX.GetWindowScrollSize();var r=this.DIV.offsetWidth;var a=this.DIV.offsetHeight;if(s>n.scrollWidth-r-i)s=n.scrollWidth-r-i;if(o>n.scrollHeight-a-i)o=n.scrollHeight-a-i;if(o<0)o=0}this.DIV.style.left=s+"px";this.DIV.style.top=o+"px"};BX.CWindow.prototype.__startDrag=function(t){if(!this.SETTINGS.draggable)return false;if(!t)t=window.event;this.x=t.clientX+document.body.scrollLeft;this.y=t.clientY+document.body.scrollTop;this.__bWasDragged=false;BX.bind(document,"mousemove",BX.proxy(this.__moveDrag,this));BX.bind(document,"mouseup",BX.proxy(this.__stopDrag,this));if(document.body.setCapture)document.body.setCapture();document.onmousedown=BX.False;var e=document.body;e.ondrag=e.onselectstart=BX.False;e.style.MozUserSelect=this.DIV.style.MozUserSelect="none";e.style.cursor="move";return BX.PreventDefault(t)};BX.CWindow.prototype.__moveDrag=function(t){if(!t)t=window.event;var e=t.clientX+document.body.scrollLeft;var i=t.clientY+document.body.scrollTop;if(this.x==e&&this.y==i)return;this.Move(e-this.x,i-this.y);this.x=e;this.y=i;if(!this.__bWasDragged){BX.onCustomEvent(this,"onWindowDragStart");this.__bWasDragged=true;BX.bind(BX.proxy_context,"click",BX.PreventDefault)}BX.onCustomEvent(this,"onWindowDrag")};BX.CWindow.prototype.__stopDrag=function(t){if(document.body.releaseCapture)document.body.releaseCapture();BX.unbind(document,"mousemove",BX.proxy(this.__moveDrag,this));BX.unbind(document,"mouseup",BX.proxy(this.__stopDrag,this));document.onmousedown=null;var e=document.body;e.ondrag=e.onselectstart=null;e.style.MozUserSelect=this.DIV.style.MozUserSelect="";e.style.cursor="";if(this.__bWasDragged){BX.onCustomEvent(this,"onWindowDragFinished");var i=BX.proxy_context;setTimeout(function(){BX.unbind(i,"click",BX.PreventDefault)},100);this.__bWasDragged=false}return BX.PreventDefault(t)};BX.CWindow.prototype.DenyClose=function(){this.denyClose=true};BX.CWindow.prototype.AllowClose=function(){this.denyClose=false};BX.CWindow.prototype.ShowError=function(t){BX.onCustomEvent(this,"onWindowError",[t]);if(this._wait)BX.closeWait(this._wait);window.alert(t)};BX.CWindow.prototype.__set_msover=function(){this.MOUSEOVER=true};BX.CWindow.prototype.__unset_msover=function(){this.MOUSEOVER=false};BX.CWindowDialog=function(){var t=arguments;t[1]="dialog";BX.CWindowDialog.superclass.constructor.apply(this,t);this.DIV.style.top="10px";this.OVERLAY=null};BX.extend(BX.CWindowDialog,BX.CWindow);BX.CWindowDialog.prototype.__resizeOverlay=function(){var t=BX.GetWindowScrollSize();this.OVERLAY.style.width=t.scrollWidth+"px"};BX.CWindowDialog.prototype.CreateOverlay=function(t){if(null==this.OVERLAY){var e=BX.GetWindowScrollSize();this.OVERLAY=document.body.appendChild(BX.create("DIV",{style:{position:"absolute",top:"0px",left:"0px",zIndex:t||parseInt(this.DIV.style.zIndex)-2,width:e.scrollWidth+"px",height:e.scrollHeight+"px"}}))}return this.OVERLAY};BX.CWindowDialog.prototype.Show=function(){BX.CWindowDialog.superclass.Show.apply(this,arguments);this.CreateOverlay();this.OVERLAY.style.display="block";this.OVERLAY.style.zIndex=parseInt(this.DIV.style.zIndex)-2;BX.unbind(window,"resize",BX.proxy(this.__resizeOverlay,this));BX.bind(window,"resize",BX.proxy(this.__resizeOverlay,this))};BX.CWindowDialog.prototype.onUnRegister=function(t){BX.CWindowDialog.superclass.onUnRegister.apply(this,arguments);if(this.clean){if(this.OVERLAY.parentNode)this.OVERLAY.parentNode.removeChild(this.OVERLAY)}else{this.OVERLAY.style.display="none"}BX.unbind(window,"resize",BX.proxy(this.__resizeOverlay,this))};BX.CDialog=function(t){BX.CDialog.superclass.constructor.apply(this);this._sender="core_window_cdialog";this.PARAMS=t||{};for(var e in this.defaultParams){if(typeof this.PARAMS[e]=="undefined")this.PARAMS[e]=this.defaultParams[e]}this.PARAMS.width=!isNaN(parseInt(this.PARAMS.width))?this.PARAMS.width:this.defaultParams["width"];this.PARAMS.height=!isNaN(parseInt(this.PARAMS.height))?this.PARAMS.height:this.defaultParams["height"];if(this.PARAMS.resize_id||this.PARAMS.content_url){var i=BX.WindowManager.getRuntimeWindowSize(this.PARAMS.resize_id||this.PARAMS.content_url);if(i){this.PARAMS.width=i.width;this.PARAMS.height=i.height}}BX.addClass(this.DIV,"bx-core-adm-dialog");this.DIV.id="bx-admin-prefix";this.PARTS={};this.DIV.style.height=null;this.DIV.style.width=null;this.PARTS.TITLEBAR=this.DIV.appendChild(BX.create("DIV",{props:{className:"bx-core-adm-dialog-head"}}));this.PARTS.TITLE_CONTAINER=this.PARTS.TITLEBAR.appendChild(BX.create("SPAN",{props:{className:"bx-core-adm-dialog-head-inner"},text:this.PARAMS.title}));this.PARTS.TITLEBAR_ICONS=this.PARTS.TITLEBAR.appendChild(BX.create("DIV",{props:{className:"bx-core-adm-dialog-head-icons"},children:this.PARAMS.resizable?[BX.create("SPAN",{props:{className:"bx-core-adm-icon-expand",title:BX.message("JS_CORE_WINDOW_EXPAND")}}),BX.create("SPAN",{props:{className:"bx-core-adm-icon-close",title:BX.message("JS_CORE_WINDOW_CLOSE")}})]:[BX.create("SPAN",{props:{className:"bx-core-adm-icon-close",title:BX.message("JS_CORE_WINDOW_CLOSE")}})]}));this.PARTS.CONTENT=this.DIV.appendChild(BX.create("DIV",{props:{className:"bx-core-adm-dialog-content-wrap adm-workarea"}}));this.PARTS.CONTENT_DATA=this.PARTS.CONTENT.appendChild(BX.create("DIV",{props:{className:"bx-core-adm-dialog-content"},style:{height:this.PARAMS.height+"px",width:this.PARAMS.width+"px"}}));this.PARTS.HEAD=this.PARTS.CONTENT_DATA.appendChild(BX.create("DIV",{props:{className:"bx-core-adm-dialog-head-block"+(this.PARAMS.icon?" "+this.PARAMS.icon:"")}}));this.SetHead(this.PARAMS.head);this.SetContent(this.PARAMS.content);this.SetTitle(this.PARAMS.title);this.SetClose(this.PARTS.TITLEBAR_ICONS.lastChild);if(this.PARAMS.resizable){this.SetExpand(this.PARTS.TITLEBAR_ICONS.firstChild);this.SetExpand(this.PARTS.TITLEBAR,"dblclick");BX.addCustomEvent(this,"onWindowExpand",BX.proxy(this.__onexpand,this));BX.addCustomEvent(this,"onWindowNarrow",BX.proxy(this.__onexpand,this))}this.PARTS.FOOT=this.PARTS.BUTTONS_CONTAINER=this.PARTS.CONTENT.appendChild(BX.create("DIV",{props:{className:"bx-core-adm-dialog-buttons"},children:this.ShowButtons()}));if(this.PARAMS.draggable)this.SetDraggable(this.PARTS.TITLEBAR);if(this.PARAMS.resizable){this.PARTS.RESIZER=this.DIV.appendChild(BX.create("DIV",{props:{className:"bx-core-resizer"}}));this.SetResize(this.PARTS.RESIZER);this.SETTINGS.min_width=this.PARAMS.min_width;this.SETTINGS.min_height=this.PARAMS.min_height}this.auth_callback=BX.delegate(function(){this.PARAMS.content="";this.hideNotify();this.Show()},this)};BX.extend(BX.CDialog,BX.CWindowDialog);BX.CDialog.prototype.defaultParams={width:700,height:400,min_width:500,min_height:300,resizable:true,draggable:true,title:"",icon:""};BX.CDialog.prototype.showWait=function(t){if(BX.type.isElementNode(t)&&(t.type=="button"||t.type=="submit")){BX.defer(function(){t.disabled=true})();var e=BX.hasClass(t,"adm-btn-save")||BX.hasClass(t,"adm-btn-save"),i=BX.pos(t,true);t.bxwaiter=this.PARTS.FOOT.appendChild(BX.create("DIV",{props:{className:"adm-btn-load-img"+(e?"-green":"")},style:{top:parseInt((i.bottom+i.top)/2-10)+"px",left:parseInt((i.right+i.left)/2-10)+"px"}}));BX.addClass(t,"adm-btn-load");this.lastWaitElement=t;return t.bxwaiter}return null};BX.CDialog.prototype.closeWait=function(t){t=t||this.lastWaitElement;if(BX.type.isElementNode(t)){if(t.bxwaiter){if(t.bxwaiter.parentNode){t.bxwaiter.parentNode.removeChild(t.bxwaiter)}t.bxwaiter=null}t.disabled=false;BX.removeClass(t,"adm-btn-load");if(this.lastWaitElement==t)this.lastWaitElement=null}};BX.CDialog.prototype.Authorize=function(t){this.bSkipReplaceContent=true;this.ShowError(BX.message("JSADM_AUTH_REQ"));BX.onCustomEvent(this,"onWindowError",[]);BX.closeWait();new BX.CAuthDialog({content_url:this.PARAMS.content_url,auth_result:t,callback:BX.delegate(function(){if(this.auth_callback)this.auth_callback()},this)}).Show()};BX.CDialog.prototype.ShowError=function(t){BX.onCustomEvent(this,"onWindowError",[t]);this.closeWait();if(this._wait)BX.closeWait(this._wait);this.Notify(t,true)};BX.CDialog.prototype.__expandGetSize=function(){var t=BX.GetDocElement();t.style.overflow="hidden";var e=BX.GetWindowInnerSize();t.scrollTop=0;this.DIV.style.top="-"+this.dxShadow+"px";this.DIV.style.left="-"+this.dxShadow+"px";return{width:e.innerWidth-parseInt(BX.style(this.PARTS.CONTENT,"padding-right"))-parseInt(BX.style(this.PARTS.CONTENT,"padding-left"))+this.dxShadow,height:e.innerHeight-this.PARTS.TITLEBAR.offsetHeight-this.PARTS.FOOT.offsetHeight-parseInt(BX.style(this.PARTS.CONTENT,"padding-top"))-parseInt(BX.style(this.PARTS.CONTENT,"padding-bottom"))+this.dxShadow}};BX.CDialog.prototype.__expand=function(){var t=BX.GetDocElement();this.dxShadow=2;if(!this.bExpanded){var e=BX.GetWindowScrollPos();this.__expand_settings={resizable:this.SETTINGS.resizable,draggable:this.SETTINGS.draggable,width:this.PARTS.CONTENT_DATA.style.width,height:this.PARTS.CONTENT_DATA.style.height,left:this.DIV.style.left,top:this.DIV.style.top,scrollTop:e.scrollTop,scrollLeft:e.scrollLeft,overflow:BX.style(t,"overflow")};this.SETTINGS.resizable=false;this.SETTINGS.draggable=false;var i=this.__expandGetSize();this.PARTS.CONTENT_DATA.style.width=i.width+"px";this.PARTS.CONTENT_DATA.style.height=i.height+"px";window.scrollTo(0,0);t.style.overflow="hidden";this.bExpanded=true;BX.onCustomEvent(this,"onWindowExpand");BX.onCustomEvent(this,"onWindowResize");BX.onCustomEvent(this,"onWindowResizeExt",[{width:i.width,height:i.height}]);BX.bind(window,"resize",BX.proxy(this.__expand_onresize,this))}else{BX.unbind(window,"resize",BX.proxy(this.__expand_onresize,this));this.SETTINGS.resizable=this.__expand_settings.resizable;this.SETTINGS.draggable=this.__expand_settings.draggable;t.style.overflow=this.__expand_settings.overflow;this.DIV.style.top=this.__expand_settings.top;this.DIV.style.left=this.__expand_settings.left;this.PARTS.CONTENT_DATA.style.width=this.__expand_settings.width;this.PARTS.CONTENT_DATA.style.height=this.__expand_settings.height;window.scrollTo(this.__expand_settings.scrollLeft,this.__expand_settings.scrollTop);this.bExpanded=false;BX.onCustomEvent(this,"onWindowNarrow");BX.onCustomEvent(this,"onWindowResize");BX.onCustomEvent(this,"onWindowResizeExt",[{width:parseInt(this.__expand_settings.width),height:parseInt(this.__expand_settings.height)}])}};BX.CDialog.prototype.__expand_onresize=function(){var t=this.__expandGetSize();this.PARTS.CONTENT_DATA.style.width=t.width+"px";this.PARTS.CONTENT_DATA.style.height=t.height+"px";BX.onCustomEvent(this,"onWindowResize");BX.onCustomEvent(this,"onWindowResizeExt",[t])};BX.CDialog.prototype.__onexpand=function(){var t=this.PARTS.TITLEBAR_ICONS.firstChild;t.className=BX.toggle(t.className,["bx-core-adm-icon-expand","bx-core-adm-icon-narrow"]);t.title=BX.toggle(t.title,[BX.message("JS_CORE_WINDOW_EXPAND"),BX.message("JS_CORE_WINDOW_NARROW")]);if(this.PARTS.RESIZER){this.PARTS.RESIZER.style.display=this.bExpanded?"none":"block"}};BX.CDialog.prototype.__startResize=function(t){if(!this.SETTINGS.resizable)return false;if(!t)t=window.event;this.wndSize=BX.GetWindowScrollPos();this.wndSize.innerWidth=BX.GetWindowInnerSize().innerWidth;this.pos=BX.pos(this.PARTS.CONTENT_DATA);this.x=t.clientX+this.wndSize.scrollLeft;this.y=t.clientY+this.wndSize.scrollTop;this.dx=this.pos.left+this.pos.width-this.x;this.dy=this.pos.top+this.pos.height-this.y;this.dw=this.pos.width-parseInt(this.PARTS.CONTENT_DATA.style.width)+parseInt(BX.style(this.PARTS.CONTENT,"padding-right"));BX.bind(document,"mousemove",BX.proxy(this.__moveResize,this));BX.bind(document,"mouseup",BX.proxy(this.__stopResize,this));if(document.body.setCapture)document.body.setCapture();document.onmousedown=BX.False;var e=document.body;e.ondrag=e.onselectstart=BX.False;e.style.MozUserSelect=this.DIV.style.MozUserSelect="none";e.style.cursor="se-resize";BX.onCustomEvent(this,"onWindowResizeStart");return true};BX.CDialog.prototype.Resize=function(t,e){var i=Math.max(t-this.pos.left+this.dx,this.SETTINGS.min_width);var s=Math.max(e-this.pos.top+this.dy,this.SETTINGS.min_height);if(this.SETTINGS.resize_restrict){var o=BX.GetWindowScrollSize();if(this.pos.left+i>o.scrollWidth-this.dw)i=o.scrollWidth-this.pos.left-this.dw}this.PARTS.CONTENT_DATA.style.width=i+"px";this.PARTS.CONTENT_DATA.style.height=s+"px";BX.onCustomEvent(this,"onWindowResize");BX.onCustomEvent(this,"onWindowResizeExt",[{height:s,width:i}])};BX.CDialog.prototype.SetSize=function(t){this.PARTS.CONTENT_DATA.style.width=t.width+"px";this.PARTS.CONTENT_DATA.style.height=t.height+"px";BX.onCustomEvent(this,"onWindowResize");BX.onCustomEvent(this,"onWindowResizeExt",[t])};BX.CDialog.prototype.GetParameters=function(t){var e=this.GetForm();if(!e)return"";var i,s="";var o=e.elements.length;var n="";for(i=0;i<o;i++){if(s!="")n="&";var r=e.elements[i];if(r.disabled)continue;switch(r.type.toLowerCase()){case"text":case"textarea":case"password":case"hidden":if(null==t&&r.name.substr(r.name.length-4)=="_alt"&&e.elements[r.name.substr(0,r.name.length-4)])break;s+=n+r.name+"="+BX.util.urlencode(r.value);break;case"radio":if(r.checked)s+=n+r.name+"="+BX.util.urlencode(r.value);break;case"checkbox":s+=n+r.name+"="+BX.util.urlencode(r.checked?"Y":"N");break;case"select-one":var a="";if(null==t&&e.elements[r.name+"_alt"]&&r.selectedIndex==0)a=e.elements[r.name+"_alt"].value;else a=r.value;s+=n+r.name+"="+BX.util.urlencode(a);break;case"select-multiple":var h,l=false;var p=r.options.length;for(h=0;h<p;h++){if(r.options[h].selected){s+=n+r.name+"="+BX.util.urlencode(r.options[h].value);l=true}}if(!l)s+=n+r.name+"=";break;default:break}}return s};BX.CDialog.prototype.PostParameters=function(t){var e=this.PARAMS.content_url;if(null==t)t="";t+=(t==""?"":"&")+"bxsender="+this._sender;var i=e.indexOf("?");if(i==-1)e+="?"+t;else e=e.substring(0,i)+"?"+t+"&"+e.substring(i+1);BX.showWait();this.auth_callback=BX.delegate(function(){this.hideNotify();this.PostParameters(t)},this);BX.ajax.Setup({skipAuthCheck:true},true);BX.ajax.post(e,this.GetParameters(),BX.delegate(function(t){BX.closeWait();if(!this.bSkipReplaceContent){this.ClearButtons();this.SetContent(t);this.Show(true)}this.bSkipReplaceContent=false},this))};BX.CDialog.prototype.Submit=function(t,e){var i=this.GetForm();if(i){i.onsubmit=null;i.method="POST";if(!i.action||e){e=e||this.PARAMS.content_url;if(null!=t){var s=e.indexOf("?");if(s==-1)e+="?"+t;else e=e.substring(0,s)+"?"+t+"&"+e.substring(s+1)}i.action=e}if(!i._bxsender){i._bxsender=i.appendChild(BX.create("INPUT",{attrs:{type:"hidden",name:"bxsender",value:this._sender}}))}this._wait=BX.showWait();this.auth_callback=BX.delegate(function(){this.hideNotify();this.Submit(t)},this);BX.ajax.submit(i,BX.delegate(function(){this.closeWait()},this))}else{window.alert("no form registered!")}};BX.CDialog.prototype.GetForm=function(){if(null==this.__form){var t=this.PARTS.CONTENT_DATA.getElementsByTagName("FORM");this.__form=t[0]?t[0]:null}return this.__form};BX.CDialog.prototype.GetRealForm=function(){if(null==this.__rform){var t=this.PARTS.CONTENT_DATA.getElementsByTagName("FORM");this.__rform=t[1]?t[1]:t[0]?t[0]:null}return this.__rform};BX.CDialog.prototype._checkButton=function(t){var e=["btnSave","btnCancel","btnClose"];for(var i=0;i<e.length;i++){if(this[e[i]]&&t==this[e[i]])return e[i]}return false};BX.CDialog.prototype.ShowButtons=function(){var t=[];if(this.PARAMS.buttons){if(this.PARAMS.buttons.title)this.PARAMS.buttons=[this.PARAMS.buttons];for(var e=0,i=this.PARAMS.buttons.length;e<i;e++){if(BX.type.isNotEmptyString(this.PARAMS.buttons[e])){t.push(this.PARAMS.buttons[e])}else if(BX.type.isElementNode(this.PARAMS.buttons[e])){t.push(this.PARAMS.buttons[e])}else if(this.PARAMS.buttons[e]){if(!BX.is_subclass_of(this.PARAMS.buttons[e],BX.CWindowButton)){var s=this._checkButton(this.PARAMS.buttons[e]);this.PARAMS.buttons[e]=new BX.CWindowButton(this.PARAMS.buttons[e]);if(s)this[s]=this.PARAMS.buttons[e]}t.push(this.PARAMS.buttons[e].Button(this))}}}return t};BX.CDialog.prototype.setAutosave=function(){if(!this.bSetAutosaveDelay){this.bSetAutosaveDelay=true;setTimeout(BX.proxy(this.setAutosave,this),10)}};BX.CDialog.prototype.SetTitle=function(t){this.PARAMS.title=t;BX.cleanNode(this.PARTS.TITLE_CONTAINER).appendChild(document.createTextNode(this.PARAMS.title))};BX.CDialog.prototype.SetHead=function(t){this.PARAMS.head=BX.util.trim(t);this.PARTS.HEAD.innerHTML=this.PARAMS.head||"&nbsp;";this.PARTS.HEAD.style.display=this.PARAMS.head?"block":"none";this.adjustSize()};BX.CDialog.prototype.Notify=function(t,e){if(!this.PARTS.NOTIFY){this.PARTS.NOTIFY=this.DIV.insertBefore(BX.create("DIV",{props:{className:"adm-warning-block"},children:[BX.create("SPAN",{props:{className:"adm-warning-text"}}),BX.create("SPAN",{props:{className:"adm-warning-icon"}}),BX.create("SPAN",{props:{className:"adm-warning-close"},events:{click:BX.proxy(this.hideNotify,this)}})]}),this.DIV.firstChild)}if(e)BX.addClass(this.PARTS.NOTIFY,"adm-warning-block-red");else BX.removeClass(this.PARTS.NOTIFY,"adm-warning-block-red");this.PARTS.NOTIFY.firstChild.innerHTML=t||"&nbsp;";this.PARTS.NOTIFY.firstChild.style.width=this.PARAMS.width-50+"px";BX.removeClass(this.PARTS.NOTIFY,"adm-warning-animate")};BX.CDialog.prototype.hideNotify=function(){BX.addClass(this.PARTS.NOTIFY,"adm-warning-animate")};BX.CDialog.prototype.__adjustHeadToIcon=function(){if(!this.PARTS.HEAD.offsetHeight){setTimeout(BX.delegate(this.__adjustHeadToIcon,this),50)}else{if(this.icon_image&&this.icon_image.height&&this.icon_image.height>this.PARTS.HEAD.offsetHeight-5){this.PARTS.HEAD.style.height=this.icon_image.height+5+"px";this.adjustSize()}this.icon_image.onload=null;this.icon_image=null}};BX.CDialog.prototype.SetIcon=function(t){if(this.PARAMS.icon!=t){if(this.PARAMS.icon)BX.removeClass(this.PARTS.HEAD,this.PARAMS.icon);this.PARAMS.icon=t;if(this.PARAMS.icon){BX.addClass(this.PARTS.HEAD,this.PARAMS.icon);var e=BX.style(this.PARTS.HEAD,"background-image")||BX.style(this.PARTS.HEAD,"backgroundImage");if(BX.type.isNotEmptyString(e)&&e!="none"){var i=e.match(new RegExp("url\\s*\\(\\s*('|\"|)(.+?)(\\1)\\s*\\)"));if(i){e=i[2];if(BX.type.isNotEmptyString(e)){this.icon_image=new Image;this.icon_image.onload=BX.delegate(this.__adjustHeadToIcon,this);this.icon_image.src=e}}}}}this.adjustSize()};BX.CDialog.prototype.SetIconFile=function(t){this.icon_image=new Image;this.icon_image.onload=BX.delegate(this.__adjustHeadToIcon,this);this.icon_image.src=t;BX.adjust(this.PARTS.HEAD,{style:{backgroundImage:"url("+t+")",backgroundPosition:"right 9px"}});this.adjustSize()};BX.CDialog.prototype.SetButtons=function(t){if(BX.type.isString(t)){if(t.length>0){this.PARTS.BUTTONS_CONTAINER.innerHTML+=t;var e=this.PARTS.BUTTONS_CONTAINER.getElementsByTagName("INPUT");if(e.length>0){this.PARAMS.buttons=[];for(var i=0;i<e.length;i++){this.PARAMS.buttons.push(new BX.CWindowButton({btn:e[i],parentWindow:this}))}}}}else{this.PARAMS.buttons=t;BX.adjust(this.PARTS.BUTTONS_CONTAINER,{children:this.ShowButtons()})}this.adjustSize()};BX.CDialog.prototype.ClearButtons=function(){BX.cleanNode(this.PARTS.BUTTONS_CONTAINER);this.adjustSize()};BX.CDialog.prototype.SetContent=function(t){this.__form=null;if(BX.type.isElementNode(t)){if(t.parentNode)t.parentNode.removeChild(t)}else if(BX.type.isString(t)){t=BX.create("DIV",{html:t})}this.PARAMS.content=t;BX.cleanNode(this.PARTS.CONTENT_DATA);BX.adjust(this.PARTS.CONTENT_DATA,{children:[this.PARTS.HEAD,BX.create("DIV",{props:{className:"bx-core-adm-dialog-content-wrap-inner"},children:[this.PARAMS.content]})]});if(this.PARAMS.content_url&&this.GetForm()){this.__form.submitbtn=this.__form.appendChild(BX.create("INPUT",{props:{type:"submit"},style:{display:"none"}}));this.__form.onsubmit=BX.delegate(this.__submit,this)}};BX.CDialog.prototype.__submit=function(t){for(var e=0,i=this.PARAMS.buttons.length;e<i;e++){if(this.PARAMS.buttons[e]&&(this.PARAMS.buttons[e].name&&/save|apply/i.test(this.PARAMS.buttons[e].name)||this.PARAMS.buttons[e].btn&&this.PARAMS.buttons[e].btn.name&&/save|apply/i.test(this.PARAMS.buttons[e].btn.name))){this.PARAMS.buttons[e].emulate();break}}return BX.PreventDefault(t)};BX.CDialog.prototype.SwapContent=function(t){t=BX(t);BX.cleanNode(this.PARTS.CONTENT_DATA);t.parentNode.removeChild(t);this.PARTS.CONTENT_DATA.appendChild(t);t.style.display="block";this.SetContent(t.innerHTML)};BX.CDialog.prototype.adjustSize=function(){};BX.CDialog.prototype.__adjustSize=function(){};BX.CDialog.prototype.adjustSizeEx=function(){BX.defer(this.__adjustSizeEx,this)()};BX.CDialog.prototype.__adjustSizeEx=function(){var t=this.PARTS.CONTENT_DATA.firstChild,e=0,i,s;while(t){if(BX.type.isElementNode(t)){i=parseInt(BX.style(t,"margin-top"),10);if(isNaN(i))i=0;s=parseInt(BX.style(t,"margin-bottom"),10);if(isNaN(s))s=0;e+=t.offsetHeight+i+s}t=BX.nextSibling(t)}if(e)this.PARTS.CONTENT_DATA.style.height=e+"px"};BX.CDialog.prototype.__onResizeFinished=function(){BX.WindowManager.saveWindowSize(this.PARAMS.resize_id||this.PARAMS.content_url,{height:parseInt(this.PARTS.CONTENT_DATA.style.height),width:parseInt(this.PARTS.CONTENT_DATA.style.width)})};BX.CDialog.prototype.Show=function(t){if(!this.PARAMS.content&&this.PARAMS.content_url&&BX.ajax&&!t){var e=BX.showWait();BX.WindowManager.currently_loaded=this;this.CreateOverlay(parseInt(BX.style(e,"z-index"))-1);this.OVERLAY.style.display="block";this.OVERLAY.className="bx-core-dialog-overlay";var i="",s="GET";if(this.PARAMS.content_post){i=this.PARAMS.content_post;s="POST"}var o=this.PARAMS.content_url+(this.PARAMS.content_url.indexOf("?")<0?"?":"&")+"bxsender="+this._sender;this.auth_callback=BX.delegate(function(){this.PARAMS.content="";this.hideNotify();this.Show()},this);BX.ajax({method:s,dataType:"html",url:o,data:i,skipAuthCheck:true,
onsuccess:BX.delegate(function(t){BX.closeWait(null,e);this.SetContent(t||"&nbsp;");this.Show()},this)})}else{BX.WindowManager.currently_loaded=null;BX.CDialog.superclass.Show.apply(this,arguments);this.adjustPos();this.OVERLAY.className="bx-core-dialog-overlay";this.__adjustSize();BX.addCustomEvent(this,"onWindowResize",BX.proxy(this.__adjustSize,this));if(this.PARAMS.resizable&&(this.PARAMS.content_url||this.PARAMS.resize_id))BX.addCustomEvent(this,"onWindowResizeFinished",BX.delegate(this.__onResizeFinished,this))}};BX.CDialog.prototype.GetInnerPos=function(){return{width:parseInt(this.PARTS.CONTENT_DATA.style.width),height:parseInt(this.PARTS.CONTENT_DATA.style.height)}};BX.CDialog.prototype.adjustPos=function(){if(!this.bExpanded){var t=BX.GetWindowInnerSize();var e=BX.GetWindowScrollPos();BX.adjust(this.DIV,{style:{left:parseInt(e.scrollLeft+t.innerWidth/2-parseInt(this.DIV.offsetWidth)/2)+"px",top:Math.max(parseInt(e.scrollTop+t.innerHeight/2-parseInt(this.DIV.offsetHeight)/2),0)+"px"}})}};BX.CDialog.prototype.GetContent=function(){return this.PARTS.CONTENT_DATA};BX.CDialog.prototype.btnSave=BX.CDialog.btnSave={title:BX.message("JS_CORE_WINDOW_SAVE"),id:"savebtn",name:"savebtn",className:BX.browser.IsIE()&&BX.browser.IsDoctype()&&!BX.browser.IsIE10()?"":"adm-btn-save",action:function(){this.disableUntilError();this.parentWindow.PostParameters()}};BX.CDialog.prototype.btnCancel=BX.CDialog.btnCancel={title:BX.message("JS_CORE_WINDOW_CANCEL"),id:"cancel",name:"cancel",action:function(){this.parentWindow.Close()}};BX.CDialog.prototype.btnClose=BX.CDialog.btnClose={title:BX.message("JS_CORE_WINDOW_CLOSE"),id:"close",name:"close",action:function(){this.parentWindow.Close()}};BX.CAdminDialog=function(t){BX.CAdminDialog.superclass.constructor.apply(this,arguments);this._sender="core_window_cadmindialog";BX.addClass(this.DIV,"bx-core-adm-admin-dialog");this.PARTS.CONTENT.insertBefore(this.PARTS.HEAD,this.PARTS.CONTENT.firstChild);this.PARTS.HEAD.className="bx-core-adm-dialog-tabs"};BX.extend(BX.CAdminDialog,BX.CDialog);BX.CAdminDialog.prototype.SetHead=function(){BX.CAdminDialog.superclass.SetHead.apply(this,arguments);if(this.PARTS.HEAD.firstChild&&BX.type.isElementNode(this.PARTS.HEAD.firstChild)){var t=this.PARTS.HEAD.firstChild,e=0,i=0,s=0;while(t){if(BX.type.isElementNode(t)){i=parseInt(BX.style(t,"margin-left"),10);if(isNaN(i))i=0;s=parseInt(BX.style(t,"margin-right"),10);if(isNaN(s))s=0;e+=t.offsetWidth+i+s}t=BX.nextSibling(t)}this.SETTINGS.min_width=Math.max(e,this.SETTINGS.min_width)-2;if(this.PARAMS.width<this.SETTINGS.min_width){BX.adjust(this.PARTS.CONTENT_DATA,{style:{width:this.SETTINGS.min_width+"px"}})}}};BX.CAdminDialog.prototype.SetContent=function(t){this.__form=null;if(BX.type.isElementNode(t)){if(t.parentNode)t.parentNode.removeChild(t)}this.PARAMS.content=t;BX.cleanNode(this.PARTS.CONTENT_DATA);BX.adjust(this.PARTS.CONTENT_DATA,{children:[this.PARAMS.content||"&nbsp;"]});if(this.PARAMS.content_url&&this.GetForm()){this.__form.appendChild(BX.create("INPUT",{props:{type:"submit"},style:{display:"none"}}));this.__form.onsubmit=BX.delegate(this.__submit,this)}};BX.CAdminDialog.prototype.__expandGetSize=function(){var t=BX.CAdminDialog.superclass.__expandGetSize.apply(this,arguments);t.width-=parseInt(BX.style(this.PARTS.CONTENT_DATA,"padding-right"))+parseInt(BX.style(this.PARTS.CONTENT_DATA,"padding-left"));t.height-=parseInt(BX.style(this.PARTS.CONTENT_DATA,"padding-top"))+parseInt(BX.style(this.PARTS.CONTENT_DATA,"padding-bottom"));t.height-=this.PARTS.HEAD.offsetHeight;return t};BX.CAdminDialog.prototype.Submit=function(){var t=this.GetForm();if(t&&!t["bxpublic"]&&!/bxpublic=/.test(t.action)){t.appendChild(BX.create("INPUT",{props:{type:"hidden",name:"bxpublic",value:"Y"}}))}return BX.CAdminDialog.superclass.Submit.apply(this,arguments)};BX.CAdminDialog.prototype.btnSave=BX.CAdminDialog.btnSave={title:BX.message("JS_CORE_WINDOW_SAVE"),id:"savebtn",name:"savebtn",className:"adm-btn-save",action:function(){this.disableUntilError();this.parentWindow.Submit()}};BX.CAdminDialog.btnCancel=BX.CAdminDialog.superclass.btnCancel;BX.CAdminDialog.btnClose=BX.CAdminDialog.superclass.btnClose;BX.CDebugDialog=function(t){BX.CDebugDialog.superclass.constructor.apply(this,arguments)};BX.extend(BX.CDebugDialog,BX.CDialog);BX.CDebugDialog.prototype.ShowDetails=function(t){var e=BX(t);if(e){if(this.div_detail_current)this.div_detail_current.style.display="none";e.style.display="block";this.div_detail_current=e}};BX.CDebugDialog.prototype.SetContent=function(t){if(!t)return;var e=t.split("#DIVIDER#");if(e.length>1){this.PARAMS.content=e[1];this.PARTS.CONTENT_DATA.style.overflow="hidden";BX.CDebugDialog.superclass.SetContent.apply(this,[e[1]]);this.PARTS.CONTENT_INNER=this.PARTS.CONTENT_DATA.firstChild.nextSibling;this.PARTS.CONTENT_TOP=this.PARTS.CONTENT_DATA.insertBefore(BX.create("DIV",{props:{className:"bx-debug-content-top"},html:e[0]}),this.PARTS.CONTENT_INNER);this.PARTS.CONTENT_INNER.style.overflow="auto"}else{BX.CDebugDialog.superclass.SetContent.apply(this,arguments)}};BX.CDebugDialog.prototype.__adjustSize=function(){BX.CDebugDialog.superclass.__adjustSize.apply(this,arguments);if(this.PARTS.CONTENT_TOP){var t=this.PARTS.CONTENT_DATA.offsetHeight-this.PARTS.HEAD.offsetHeight-this.PARTS.CONTENT_TOP.offsetHeight-38;if(t>0){this.PARTS.CONTENT_INNER.style.height=t+"px"}}};BX.CEditorDialog=function(t){BX.CEditorDialog.superclass.constructor.apply(this,arguments);BX.removeClass(this.PARTS.CONTENT,"bx-core-adm-dialog-content-wrap");BX.removeClass(this.PARTS.CONTENT_DATA,"bx-core-adm-dialog-content");BX.removeClass(this.PARTS.CONTENT_DATA.lastChild,"bx-core-adm-dialog-content-wrap-inner");BX.removeClass(this.PARTS.BUTTONS_CONTAINER,"bx-core-adm-dialog-buttons");BX.addClass(this.PARTS.CONTENT,"bx-core-editor-dialog-content-wrap");BX.addClass(this.PARTS.CONTENT_DATA,"bx-core-editor-dialog-content");BX.addClass(this.PARTS.BUTTONS_CONTAINER,"bx-core-editor-dialog-buttons")};BX.extend(BX.CEditorDialog,BX.CDialog);BX.CEditorDialog.prototype.SetContent=function(){BX.CEditorDialog.superclass.SetContent.apply(this,arguments);BX.removeClass(this.PARTS.CONTENT_DATA.lastChild,"bx-core-adm-dialog-content-wrap-inner")};BX.CWizardDialog=function(t){BX.CWizardDialog.superclass.constructor.apply(this,arguments);BX.removeClass(this.PARTS.CONTENT,"bx-core-adm-dialog-content-wrap");BX.removeClass(this.PARTS.CONTENT_DATA,"bx-core-adm-dialog-content");BX.removeClass(this.PARTS.CONTENT_DATA.lastChild,"bx-core-adm-dialog-content-wrap-inner");BX.removeClass(this.PARTS.BUTTONS_CONTAINER,"bx-core-adm-dialog-buttons");BX.addClass(this.PARTS.CONTENT,"bx-core-wizard-dialog-content-wrap")};BX.extend(BX.CWizardDialog,BX.CDialog);BX.CAuthDialog=function(t){t.resizable=false;t.width=350;t.height=200;t.buttons=[this.btnSave];BX.CAuthDialog.superclass.constructor.apply(this,arguments);this._sender="core_window_cauthdialog";BX.addClass(this.DIV,"bx-core-auth-dialog");BX.AUTHAGENT=this};BX.extend(BX.CAuthDialog,BX.CDialog);BX.CAuthDialog.prototype.btnSave=BX.CAuthDialog.btnSave={title:BX.message("JS_CORE_WINDOW_AUTH"),id:"savebtn",name:"savebtn",className:"adm-btn-save",action:function(){this.disableUntilError();this.parentWindow.Submit("",this.parentWindow.PARAMS.content_url)}};BX.CAuthDialog.prototype.SetError=function(t){BX.closeWait();if(!!t)this.ShowError(t.MESSAGE||t)};BX.CAuthDialog.prototype.setAuthResult=function(t){BX.closeWait();if(t===false){this.Close();if(this.PARAMS.callback)this.PARAMS.callback()}else{this.SetError(t)}};BX.CWindowFloat=function(t){BX.CWindowFloat.superclass.constructor.apply(this,[t,"float"]);this.SETTINGS.resizable=false};BX.extend(BX.CWindowFloat,BX.CWindow);BX.CWindowFloat.prototype.adjustPos=function(){if(this.PARAMS.parent)this.adjustToNode();else if(this.PARAMS.x&&this.PARAMS.y)this.adjustToPos([this.PARAMS.x,this.PARAMS.y])};BX.CWindowFloat.prototype.adjustToPos=function(t){this.DIV.style.left=parseInt(t[0])+"px";this.DIV.style.top=parseInt(t[1])+"px"};BX.CWindowFloat.prototype.adjustToNodeGetPos=function(){return BX.pos(this.PARAMS.parent)};BX.CWindowFloat.prototype.adjustToNode=function(t){t=t||this.PARAMS.parent;this.PARAMS.parent=BX(t);if(this.PARAMS.parent){var e=this.adjustToNodeGetPos();this.DIV.style.top=e.top+"px";this.DIV.style.left=e.left+"px";this.PARAMS.parent.OPENER=this}};BX.CWindowFloat.prototype.Show=function(){this.adjustToPos([-1e3,-1e3]);BX.CWindowFloat.superclass.Show.apply(this,arguments);this.adjustPos()};BX.COpener=function(t){this.PARAMS=t||{};this.MENU=t.MENU||[];this.DIV=t.DIV;this.ATTACH=t.ATTACH||t.DIV;this.ATTACH_MODE=t.ATTACH_MODE||"bottom";this.ACTIVE_CLASS=t.ACTIVE_CLASS||"";this.LEVEL=t.LEVEL||0;this.CLOSE_ON_CLICK=typeof t.CLOSE_ON_CLICK!="undefined"?!!t.CLOSE_ON_CLICK:true;this.ADJUST_ON_CLICK=typeof t.ADJUST_ON_CLICK!="undefined"?!!t.ADJUST_ON_CLICK:true;this.TYPE=this.PARAMS.TYPE=="hover"?"hover":"click";this._openTimeout=null;if(this.PARAMS.TYPE=="hover"&&t.TIMEOUT!==0)this.TIMEOUT=t.TIMEOUT||1e3;else this.TIMEOUT=0;if(!!this.PARAMS.MENU_URL){this.bMenuLoaded=false;this.bMenuLoading=false;this.MENU=[{TEXT:BX.message("JS_CORE_LOADING"),CLOSE_ON_CLICK:false}];if(this.PARAMS.MENU_PRELOAD){BX.defer(this.Load,this)()}}BX.ready(BX.defer(this.Init,this))};BX.COpener.prototype.Init=function(){this.DIV=BX(this.DIV);switch(this.TYPE){case"hover":BX.bind(this.DIV,"mouseover",BX.proxy(this.Open,this));BX.bind(this.DIV,"click",BX.proxy(this.Toggle,this));break;case"click":BX.bind(this.DIV,"click",BX.proxy(this.Toggle,this));break}this.bMenuInit=false};BX.COpener.prototype.Load=function(){if(this.PARAMS.MENU_URL&&!this.bMenuLoaded){if(!this.bMenuLoading){var t=this.PARAMS.MENU_URL;if(t.indexOf("sessid=")<=0)t+=(t.indexOf("?")>0?"&":"?")+"sessid="+BX.bitrix_sessid();this.bMenuLoading=true;BX.ajax.loadJSON(t,BX.proxy(this.SetMenu,this),BX.proxy(this.LoadFailed,this))}}};BX.COpener.prototype.SetMenu=function(t){this.bMenuLoaded=true;this.bMenuLoading=false;if(this.bMenuInit){this.MENU.setItems(t)}else{this.MENU=t}};BX.COpener.prototype.LoadFailed=function(t,e){this.bMenuLoading=false;this.SetMenu([{TEXT:BX.message("JS_CORE_NO_DATA"),CLOSE_ON_CLICK:true}]);BX.debug(arguments)};BX.COpener.prototype.checkAdminMenu=function(){if(document.documentElement.id=="bx-admin-prefix")return true;return!!BX.findParent(this.DIV,{property:{id:"bx-admin-prefix"}})};BX.COpener.prototype.Toggle=function(t){this.__clear_timeout();if(!this.bMenuInit||!this.MENU.visible()){var e=this.TIMEOUT;this.TIMEOUT=0;this.Open(t);this.TIMEOUT=e}else{this.MENU.Close()}return!!(t||window.event)&&BX.PreventDefault(t)};BX.COpener.prototype.GetMenu=function(){if(!this.bMenuInit){if(BX.type.isArray(this.MENU)){this.MENU=new BX.CMenu({ITEMS:this.MENU,ATTACH_MODE:this.ATTACH_MODE,SET_ID:this.checkAdminMenu()?"bx-admin-prefix":"",CLOSE_ON_CLICK:!!this.CLOSE_ON_CLICK,ADJUST_ON_CLICK:!!this.ADJUST_ON_CLICK,LEVEL:this.LEVEL,parent:BX(this.DIV),parent_attach:BX(this.ATTACH)});if(this.LEVEL>0){BX.bind(this.MENU.DIV,"mouseover",BX.proxy(this._on_menu_hover,this));BX.bind(this.MENU.DIV,"mouseout",BX.proxy(this._on_menu_hout,this))}}BX.addCustomEvent(this.MENU,"onMenuOpen",BX.proxy(this.handler_onopen,this));BX.addCustomEvent(this.MENU,"onMenuClose",BX.proxy(this.handler_onclose,this));BX.addCustomEvent("onMenuItemHover",BX.proxy(this.handler_onover,this));this.bMenuInit=true}return this.MENU};BX.COpener.prototype.Open=function(){this.GetMenu();this.bOpen=true;this.__clear_timeout();if(this.TIMEOUT>0){BX.bind(this.DIV,"mouseout",BX.proxy(this.__clear_timeout,this));this._openTimeout=setTimeout(BX.proxy(this.__open,this),this.TIMEOUT)}else{this.__open()}if(!!this.PARAMS.MENU_URL&&!this.bMenuLoaded){this._loadTimeout=setTimeout(BX.proxy(this.Load,this),parseInt(this.TIMEOUT/2))}return true};BX.COpener.prototype.__clear_timeout=function(){if(!!this._openTimeout)clearTimeout(this._openTimeout);if(!!this._loadTimeout)clearTimeout(this._loadTimeout);BX.unbind(this.DIV,"mouseout",BX.proxy(this.__clear_timeout,this))};BX.COpener.prototype._on_menu_hover=function(){this.bMenuHover=true;this.__clear_timeout();if(this.ACTIVE_CLASS)BX.addClass(this.DIV,this.ACTIVE_CLASS)};BX.COpener.prototype._on_menu_hout=function(){this.bMenuHover=false};BX.COpener.prototype.handler_onover=function(t,e){if(this.bMenuHover)return;if(e!=this&&t==this.LEVEL-1&&this.ACTIVE_CLASS){BX.removeClass(this.DIV,this.ACTIVE_CLASS)}if(this.bMenuInit&&t<=this.LEVEL-1&&this.MENU.visible()){if(e!=this){this.__clear_timeout();this._openTimeout=setTimeout(BX.proxy(this.Close,this),this.TIMEOUT)}}};BX.COpener.prototype.handler_onopen=function(){this.bOpen=true;if(this.ACTIVE_CLASS)BX.addClass(this.DIV,this.ACTIVE_CLASS);BX.defer(function(){BX.onCustomEvent(this,"onOpenerMenuOpen")},this)()};BX.COpener.prototype.handler_onclose=function(){this.bOpen=false;BX.onCustomEvent(this,"onOpenerMenuClose");if(this.ACTIVE_CLASS)BX.removeClass(this.DIV,this.ACTIVE_CLASS)};BX.COpener.prototype.Close=function(){if(!this.bMenuInit)return;if(!!this._openTimeout)clearTimeout(this._openTimeout);this.bOpen=false;this.__close()};BX.COpener.prototype.__open=function(){this.__clear_timeout();if(this.bMenuInit&&this.bOpen&&!this.MENU.visible())this.MENU.Show()};BX.COpener.prototype.__close=function(){if(this.bMenuInit&&!this.bOpen&&this.MENU.visible())this.MENU.Hide()};BX.COpener.prototype.__close_immediately=function(){this.bOpen=false;this.__close()};BX.COpener.prototype.isMenuVisible=function(){return null!=this.MENU.visible&&this.MENU.visible()};BX.CMenu=function(t){BX.CMenu.superclass.constructor.apply(this);this.DIV.style.width="auto";this.DIV.style.height="auto";this.PARAMS=t||{};this.PARTS={};this.PARAMS.ATTACH_MODE=this.PARAMS.ATTACH_MODE||"bottom";this.PARAMS.CLOSE_ON_CLICK=typeof this.PARAMS.CLOSE_ON_CLICK=="undefined"?true:this.PARAMS.CLOSE_ON_CLICK;this.PARAMS.ADJUST_ON_CLICK=typeof this.PARAMS.ADJUST_ON_CLICK=="undefined"?true:this.PARAMS.ADJUST_ON_CLICK;this.PARAMS.LEVEL=this.PARAMS.LEVEL||0;this.DIV.className="bx-core-popup-menu bx-core-popup-menu-"+this.PARAMS.ATTACH_MODE+" bx-core-popup-menu-level"+this.PARAMS.LEVEL+(typeof this.PARAMS.ADDITIONAL_CLASS!="undefined"?" "+this.PARAMS.ADDITIONAL_CLASS:"");if(!!this.PARAMS.SET_ID)this.DIV.id=this.PARAMS.SET_ID;if(this.PARAMS.LEVEL==0){this.ARROW=this.DIV.appendChild(BX.create("SPAN",{props:{className:"bx-core-popup-menu-angle"},style:{left:"15px"}}))}if(!!this.PARAMS.CLASS_NAME)this.DIV.className+=" "+this.PARAMS.CLASS_NAME;BX.bind(this.DIV,"click",BX.eventCancelBubble);this.ITEMS=[];this.setItems(this.PARAMS.ITEMS);BX.addCustomEvent("onMenuOpen",BX.proxy(this._onMenuOpen,this));BX.addCustomEvent("onMenuItemSelected",BX.proxy(this.Hide,this))};BX.extend(BX.CMenu,BX.CWindowFloat);BX.CMenu.broadcastCloseEvent=function(){BX.onCustomEvent("onMenuItemSelected")};BX.CMenu._toggleChecked=function(){BX.toggleClass(this,"bx-core-popup-menu-item-checked")};BX.CMenu._itemDblClick=function(){window.location.href=this.href};BX.CMenu.prototype.toggleArrow=function(t){if(!!this.ARROW){if(typeof t=="undefined"){t=this.ARROW.style.visibility=="hidden"}this.ARROW.style.visibility=!!t?"visible":"hidden"}};BX.CMenu.prototype.visible=function(){return this.DIV.style.display!=="none"};BX.CMenu.prototype._onMenuOpen=function(t,e){if(this.visible()){if(e==this.PARAMS.LEVEL&&t!=this){this.Hide()}}};BX.CMenu.prototype.onUnRegister=function(){if(!this.visible())return;this.Hide()};BX.CMenu.prototype.setItems=function(t){this.PARAMS.ITEMS=t;BX.cleanNode(this.DIV);if(!!this.ARROW)this.DIV.appendChild(this.ARROW);if(this.PARAMS.ITEMS){this.PARAMS.ITEMS=BX.util.array_values(this.PARAMS.ITEMS);var e=false;var i=0;for(var s=0,o=this.PARAMS.ITEMS.length;s<o;s++){if((s==0||s==o-1)&&this.PARAMS.ITEMS[s].SEPARATOR)continue;i++;if(!e)e=!!this.PARAMS.ITEMS[s].GLOBAL_ICON;this.addItem(this.PARAMS.ITEMS[s],s)}if(i===1)BX.addClass(this.DIV,"bx-core-popup-menu-single-item");else BX.removeClass(this.DIV,"bx-core-popup-menu-single-item");if(!e)BX.addClass(this.DIV,"bx-core-popup-menu-no-icons");else BX.removeClass(this.DIV,"bx-core-popup-menu-no-icons")}};BX.CMenu.prototype.addItem=function(t){this.ITEMS.push(t);if(t.SEPARATOR){t.NODE=BX.create("DIV",{props:{className:"bx-core-popup-menu-separator"}})}else{var e=!!t.MENU&&(BX.type.isArray(t.MENU)&&t.MENU.length>0||t.MENU instanceof BX.CMenu)||!!t.MENU_URL;if(t.DISABLED){t.CLOSE_ON_CLICK=false;t.LINK=null;t.ONCLICK=null;t.ACTION=null}t.NODE=BX.create(!!t.LINK||BX.browser.IsIE()&&!BX.browser.IsDoctype()?"A":"SPAN",{props:{className:"bx-core-popup-menu-item"+(e?" bx-core-popup-menu-item-opener":"")+(!!t.DEFAULT?" bx-core-popup-menu-item-default":"")+(!!t.DISABLED?" bx-core-popup-menu-item-disabled":"")+(!!t.CHECKED?" bx-core-popup-menu-item-checked":""),title:!!BX.message["MENU_ENABLE_TOOLTIP"]||!!t.SHOW_TITLE?t.TITLE||"":"",BXMENULEVEL:this.PARAMS.LEVEL},attrs:!!t.LINK||BX.browser.IsIE()&&!BX.browser.IsDoctype()?{href:t.LINK||"javascript:void(0)"}:{},events:{mouseover:function(){BX.onCustomEvent("onMenuItemHover",[this.BXMENULEVEL,this.OPENER])}},html:'<span class="bx-core-popup-menu-item-icon'+(t.GLOBAL_ICON?" "+t.GLOBAL_ICON:"")+'"></span><span class="bx-core-popup-menu-item-text">'+t.TEXT+"</span>"});if(e&&!t.DISABLED){t.NODE.OPENER=new BX.COpener({DIV:t.NODE,ACTIVE_CLASS:"bx-core-popup-menu-item-opened",TYPE:"hover",MENU:t.MENU,MENU_URL:t.MENU_URL,MENU_PRELOAD:!!t.MENU_PRELOAD,LEVEL:this.PARAMS.LEVEL+1,ATTACH_MODE:"right",TIMEOUT:500})}else if(this.PARAMS.CLOSE_ON_CLICK&&(typeof t.CLOSE_ON_CLICK=="undefined"||!!t.CLOSE_ON_CLICK)){BX.bind(t.NODE,"click",BX.CMenu.broadcastCloseEvent)}else if(this.PARAMS.ADJUST_ON_CLICK&&(typeof t.ADJUST_ON_CLICK=="undefined"||!!t.ADJUST_ON_CLICK)){BX.bind(t.NODE,"click",BX.defer(this.adjustPos,this))}if(e&&!!t.LINK){BX.bind(t.NODE,"dblclick",BX.CMenu._itemDblClick)}if(typeof t.CHECKED!="undefined"){BX.bind(t.NODE,"click",BX.CMenu._toggleChecked)}t.ONCLICK=t.ACTION||t.ONCLICK;if(!!t.ONCLICK){if(BX.type.isString(t.ONCLICK)){t.ONCLICK=new Function("event",t.ONCLICK)}BX.bind(t.NODE,"click",t.ONCLICK)}}this.DIV.appendChild(t.NODE)};BX.CMenu.prototype._documentClickBind=function(){this._documentClickUnBind();BX.bind(document,"click",BX.proxy(this._documentClick,this))};BX.CMenu.prototype._documentClickUnBind=function(){BX.unbind(document,"click",BX.proxy(this._documentClick,this))};BX.CMenu.prototype._documentClick=function(t){t=t||window.event;if(!!t&&!(BX.getEventButton(t)&BX.MSLEFT))return;this.Close()};BX.CMenu.prototype.Show=function(){BX.onCustomEvent(this,"onMenuOpen",[this,this.PARAMS.LEVEL]);BX.CMenu.superclass.Show.apply(this,[]);this.bCloseEventFired=false;BX.addCustomEvent(this.PARAMS.parent_attach,"onChangeNodePosition",BX.proxy(this.adjustToNode,this));BX.defer(this._documentClickBind,this)()};BX.CMenu.prototype.Close=BX.CMenu.prototype.Hide=function(){if(!this.visible())return;BX.removeCustomEvent(this.PARAMS.parent_attach,"onChangeNodePosition",BX.proxy(this.adjustToNode,this));this._documentClickUnBind();if(!this.bCloseEventFired){BX.onCustomEvent(this,"onMenuClose",[this,this.PARAMS.LEVEL]);this.bCloseEventFired=true}BX.CMenu.superclass.Hide.apply(this,arguments)};BX.CMenu.prototype.__adjustMenuToNode=function(){var t=BX.pos(this.PARAMS.parent_attach),e=!!BX.findParent(this.PARAMS.parent_attach,BX.is_fixed);if(e)this.DIV.style.position="fixed";else this.DIV.style.position="absolute";if(!t.top){this.DIV.style.top="-1000px";this.DIV.style.left="-1000px"}if(this.bTimeoutSet)return;var i=this.DIV.offsetWidth,s=this.DIV.offsetHeight;if(!i){setTimeout(BX.delegate(function(){this.bTimeoutSet=false;this.__adjustMenuToNode()},this),100);this.bTimeoutSet=true;return}var o={},n=BX.GetWindowSize();switch(this.PARAMS.ATTACH_MODE){case"bottom":o.top=t.bottom+9;o.left=t.left;var r=0;if(!!this.ARROW){if(t.width>i)r=parseInt(i/2-7);else r=parseInt(Math.min(i,t.width)/2-7);if(r<7){o.left-=15;r+=15}}if(o.left>n.scrollWidth-i-10){var a=o.left;o.left=n.scrollWidth-i-10;if(!!this.ARROW)r+=a-o.left}if(e){o.left-=n.scrollLeft}if(!!this.ARROW)this.ARROW.style.left=r+"px";break;case"right":o.top=t.top-1;o.left=t.right;if(o.left>n.scrollWidth-i-10){o.left=t.left-i-1}break}if(e){o.top-=n.scrollTop}if(!!this.ARROW)this.ARROW.className="bx-core-popup-menu-angle";if(o.top+s>n.scrollTop+n.innerHeight||o.top+s>n.scrollHeight){var h=this.PARAMS.ATTACH_MODE=="bottom"?t.top-s-9:t.bottom-s+1;if(h>n.scrollTop||o.top+s>n.scrollHeight){if(o.top+s>n.scrollHeight){o.top=Math.max(0,n.scrollHeight-s);this.toggleArrow(false)}else{o.top=h;if(!!this.ARROW)this.ARROW.className="bx-core-popup-menu-angle-bottom"}}}if(o.top+o.left==0){this.Hide()}else{this.DIV.style.top=o.top+"px";this.DIV.style.left=o.left+"px"}};BX.CMenu.prototype.adjustToNode=function(t){this.PARAMS.parent_attach=BX(t)||this.PARAMS.parent_attach||this.PARAMS.parent;this.__adjustMenuToNode()};BX.CMenuOpener=function(t){BX.CMenuOpener.superclass.constructor.apply(this);this.PARAMS=t||{};this.setParent(this.PARAMS.parent);this.PARTS={};this.SETTINGS.drag_restrict=true;this.defaultAction=null;this.timeout=500;this.DIV.className="bx-component-opener";this.DIV.ondblclick=BX.PreventDefault;if(this.PARAMS.component_id){this.PARAMS.transform=!!this.PARAMS.transform}this.OPENERS=[];this.DIV.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar"+(this.PARAMS.transform?" bx-context-toolbar-vertical-mode":"")}}));this.PARTS.INNER=this.DIV.firstChild.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar-inner"},html:'<span class="bx-context-toolbar-drag-icon"></span><span class="bx-context-toolbar-vertical-line"></span><br>'}));this.EXTRA_BUTTONS={};var e=0;for(var i=0,s=this.PARAMS.menu.length;i<s;i++){var o=this.addItem(this.PARAMS.menu[i]);if(null!=o){e++;this.PARTS.INNER.appendChild(o);this.PARTS.INNER.appendChild(BX.create("BR"))}}var n=e>0;this.PARTS.ICONS=this.PARTS.INNER.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar-icons"}}));if(this.PARAMS.component_id){this.PARAMS.pin=!!this.PARAMS.pin;if(n)this.PARTS.ICONS.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar-separator"}}));this.PARTS.ICON_PIN=this.PARTS.ICONS.appendChild(BX.create("A",{attrs:{href:"javascript:void(0)"},props:{className:this.PARAMS.pin?"bx-context-toolbar-pin-fixed":"bx-context-toolbar-pin"},events:{click:BX.delegate(this.__pin_btn_clicked,this)}}))}if(this.EXTRA_BUTTONS["components2_props"]){var r=this.EXTRA_BUTTONS["components2_props"]||{URL:"javascript:void(0)"};if(null==this.defaultAction){this.defaultAction=r.ONCLICK;this.defaultActionTitle=r.TITLE||r.TEXT}r.URL="javascript:"+BX.util.urlencode(r.ONCLICK);this.ATTACH=this.PARTS.ICONS.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar-button bx-context-toolbar-button-settings"},children:[BX.create("SPAN",{props:{className:"bx-context-toolbar-button-inner"},children:[BX.create("A",{attrs:{href:r.URL},events:{mouseover:BX.proxy(this.__msover_text,this),mouseout:BX.proxy(this.__msout_text,this),mousedown:BX.proxy(this.__msdown_text,this)},html:'<span class="bx-context-toolbar-button-icon bx-context-toolbar-settings-icon"></span>'}),BX.create("A",{attrs:{href:"javascript: void(0)"},props:{className:"bx-context-toolbar-button-arrow"},events:{mouseover:BX.proxy(this.__msover_arrow,this),mouseout:BX.proxy(this.__msout_arrow,this),mousedown:BX.proxy(this.__msdown_arrow,this)},html:'<span class="bx-context-toolbar-button-arrow"></span>'})]})]}));this.OPENER=this.ATTACH.firstChild.lastChild;var a=this.attachMenu(this.EXTRA_BUTTONS["components2_submenu"]["MENU"]);BX.addCustomEvent(a,"onOpenerMenuOpen",BX.proxy(this.__menu_open,this));BX.addCustomEvent(a,"onOpenerMenuClose",BX.proxy(this.__menu_close,this))}if(e>1){this.PARTS.ICONS.appendChild(BX.create("span",{props:{className:"bx-context-toolbar-separator bx-context-toolbar-separator-switcher"}}));this.ICON_TRANSFORM=this.PARTS.ICONS.appendChild(BX.create("A",{attrs:{href:"javascript: void(0)"},props:{className:"bx-context-toolbar-switcher"},events:{click:BX.delegate(this.__trf_btn_clicked,this)}}))}if(this.PARAMS.HINT){this.DIV.BXHINT=this.HINT=new BX.CHint({parent:this.DIV,hint:this.PARAMS.HINT.TEXT||"",title:this.PARAMS.HINT.TITLE||"",hide_timeout:this.timeout/2,preventHide:false})}BX.addCustomEvent(this,"onWindowDragFinished",BX.delegate(this.__onMoveFinished,this));BX.addCustomEvent("onDynamicModeChange",BX.delegate(this.__onDynamicModeChange,this));BX.addCustomEvent("onTopPanelCollapse",BX.delegate(this.__onPanelCollapse,this));BX.addCustomEvent("onMenuOpenerMoved",BX.delegate(this.checkPosition,this));BX.addCustomEvent("onMenuOpenerUnhide",BX.delegate(this.checkPosition,this));if(this.OPENERS){for(i=0,s=this.OPENERS.length;i<s;i++){BX.addCustomEvent(this.OPENERS[i],"onOpenerMenuOpen",BX.proxy(this.__hide_hint,this))}}};BX.extend(BX.CMenuOpener,BX.CWindowFloat);BX.CMenuOpener.prototype.setParent=function(t){t=BX(t);if(t.OPENER&&t.OPENER!=this){t.OPENER.Close();t.OPENER.clearHoverHoutEvents()}if(this.PARAMS.parent&&this.PARAMS.parent!=t){this.clearHoverHoutEvents();this.PARAMS.parent.OPENER=null}this.PARAMS.parent=t;this.PARAMS.parent.OPENER=this};BX.CMenuOpener.prototype.setHoverHoutEvents=function(t,e){if(!this.__opener_events_set){BX.bind(this.Get(),"mouseover",t);BX.bind(this.Get(),"mouseout",e);this.__opener_events_set=true}};BX.CMenuOpener.prototype.clearHoverHoutEvents=function(){if(this.Get()){BX.unbindAll(this.Get());this.__opener_events_set=false}};BX.CMenuOpener.prototype.unclosable=true;BX.CMenuOpener.prototype.__check_intersection=function(t,e){return!(e.right<=t.left||e.left>=t.right||e.bottom<=t.top||e.top>=t.bottom)};BX.CMenuOpener.prototype.__msover_text=function(){this.bx_hover=true;if(!this._menu_open)BX.addClass(this.ATTACH,"bx-context-toolbar-button-text-hover")};BX.CMenuOpener.prototype.__msout_text=function(){this.bx_hover=false;if(!this._menu_open)BX.removeClass(this.ATTACH,"bx-context-toolbar-button-text-hover bx-context-toolbar-button-text-active")};BX.CMenuOpener.prototype.__msover_arrow=function(){this.bx_hover=true;if(!this._menu_open)BX.addClass(this.ATTACH,"bx-context-toolbar-button-arrow-hover")};BX.CMenuOpener.prototype.__msout_arrow=function(){this.bx_hover=false;if(!this._menu_open)BX.removeClass(this.ATTACH,"bx-context-toolbar-button-arrow-hover bx-context-toolbar-button-arrow-active")};BX.CMenuOpener.prototype.__msdown_text=function(){this.bx_active=true;if(!this._menu_open)BX.addClass(this.ATTACH,"bx-context-toolbar-button-text-active")};BX.CMenuOpener.prototype.__msdown_arrow=function(){this.bx_active=true;if(!this._menu_open)BX.addClass(this.ATTACH,"bx-context-toolbar-button-arrow-active")};BX.CMenuOpener.prototype.__menu_close=function(){this._menu_open=false;this.bx_active=false;BX.removeClass(this.ATTACH,"bx-context-toolbar-button-active bx-context-toolbar-button-text-active bx-context-toolbar-button-arrow-active");if(!this.bx_hover){BX.removeClass(this.ATTACH,"bx-context-toolbar-button-hover bx-context-toolbar-button-text-hover bx-context-toolbar-button-arrow-hover");this.bx_hover=false}};BX.CMenuOpener.prototype.__menu_open=function(){this._menu_open=true};BX.CMenuOpener.prototype.checkPosition=function(){if(this.isMenuVisible()||this.DIV.style.display=="none"||this==BX.proxy_context||BX.proxy_context.zIndex>this.zIndex)return;this.correctPosition(BX.proxy_context)};BX.CMenuOpener.prototype.correctPosition=function(t){var e=BX.pos(this.DIV),i=BX.pos(t.Get());if(this.__check_intersection(e,i)){var s=i.top-e.height;if(s<0)s=i.bottom;this.DIV.style.top=s+"px";BX.addCustomEvent(t,"onMenuOpenerHide",BX.proxy(this.restorePosition,this));BX.onCustomEvent(this,"onMenuOpenerMoved")}};BX.CMenuOpener.prototype.restorePosition=function(){if(!this.MOUSEOVER&&!this.isMenuVisible()){if(this.originalPos)this.DIV.style.top=this.originalPos.top+"px";BX.removeCustomEvent(BX.proxy_context,"onMenuOpenerHide",BX.proxy(this.restorePosition,this));if(this.restore_pos_timeout)clearTimeout(this.restore_pos_timeout)}else{this.restore_pos_timeout=setTimeout(BX.proxy(this.restorePosition,this),this.timeout)}};BX.CMenuOpener.prototype.Show=function(){BX.CMenuOpener.superclass.Show.apply(this,arguments);this.SetDraggable(this.PARTS.INNER.firstChild);this.DIV.style.width="auto";this.DIV.style.height="auto";if(!this.PARAMS.pin){this.DIV.style.left="-1000px";this.DIV.style.top="-1000px";this.Hide()}else{this.bPosAdjusted=true;this.bMoved=true;if(this.PARAMS.top)this.DIV.style.top=this.PARAMS.top+"px";if(this.PARAMS.left)this.DIV.style.left=this.PARAMS.left+"px";this.DIV.style.display=!BX.admin.dynamic_mode||BX.admin.dynamic_mode_show_borders?"block":"none";if(this.DIV.style.display=="block"){setTimeout(BX.delegate(function(){BX.onCustomEvent(this,"onMenuOpenerUnhide")},this),50)}}};BX.CMenuOpener.prototype.executeDefaultAction=function(){if(this.defaultAction){if(BX.type.isFunction(this.defaultAction))this.defaultAction();else if(BX.type.isString(this.defaultAction))BX.evalGlobal(this.defaultAction)}};BX.CMenuOpener.prototype.__onDynamicModeChange=function(t){this.DIV.style.display=t?"block":"none"};BX.CMenuOpener.prototype.__onPanelCollapse=function(t,e){this.DIV.style.top=parseInt(this.DIV.style.top)+e+"px";if(this.PARAMS.pin){this.__savePosition()}};BX.CMenuOpener.prototype.__onMoveFinished=function(){BX.onCustomEvent(this,"onMenuOpenerMoved");this.bMoved=true;if(this.PARAMS.pin)this.__savePosition()};BX.CMenuOpener.prototype.__savePosition=function(){var t={};t.pin=this.PARAMS.pin;if(!this.PARAMS.pin){t.top=false;t.left=false;t.transform=false}else{t.transform=this.PARAMS.transform;if(this.bMoved){t.left=parseInt(this.DIV.style.left);t.top=parseInt(this.DIV.style.top)}}BX.WindowManager.saveWindowOptions(this.PARAMS.component_id,t)};BX.CMenuOpener.prototype.__pin_btn_clicked=function(){this.Pin()};BX.CMenuOpener.prototype.Pin=function(t){if(null==t)this.PARAMS.pin=!this.PARAMS.pin;else this.PARAMS.pin=!!t;this.PARTS.ICON_PIN.className=this.PARAMS.pin?"bx-context-toolbar-pin-fixed":"bx-context-toolbar-pin";this.__savePosition()};BX.CMenuOpener.prototype.__trf_btn_clicked=function(){this.Transform()};BX.CMenuOpener.prototype.Transform=function(t){var e={};if(null==t)this.PARAMS.transform=!this.PARAMS.transform;else this.PARAMS.transform=!!t;if(this.bMoved){e=BX.pos(this.DIV)}if(this.PARAMS.transform)BX.addClass(this.DIV.firstChild,"bx-context-toolbar-vertical-mode");else BX.removeClass(this.DIV.firstChild,"bx-context-toolbar-vertical-mode");if(!this.bMoved){this.adjustPos()}else{this.DIV.style.left=e.right-this.DIV.offsetWidth-(BX.browser.IsIE()&&!BX.browser.IsDoctype()?2:0)+"px"}this.__savePosition()};BX.CMenuOpener.prototype.adjustToNodeGetPos=function(){var t=BX.pos(this.PARAMS.parent);var e=BX.GetWindowScrollSize();var i=this.DIV.offsetWidth;t.left-=BX.admin.__border_dx;t.top-=BX.admin.__border_dx;if(true||!this.PARAMS.transform){t.top-=45}if(t.left>e.scrollWidth-i){t.left=e.scrollWidth-i}return t};BX.CMenuOpener.prototype.addItem=function(t){if(t.TYPE){this.EXTRA_BUTTONS[t.TYPE]=t;return null}else{var e=new BX.CMenuOpenerItem(t);if(null==this.defaultAction){if(e.item.ONCLICK){this.defaultAction=t.ONCLICK}else if(e.item.MENU){this.defaultAction=BX.delegate(function(){this.Open()},e.item.OPENER)}this.defaultActionTitle=t.TITLE||t.TEXT;BX.addClass(e.Get(),"bx-content-toolbar-default")}if(e.item.OPENER)this.OPENERS[this.OPENERS.length]=e.item.OPENER;return e.Get()}};BX.CMenuOpener.prototype.attachMenu=function(t){var e=new BX.COpener({DIV:this.OPENER,ATTACH:this.ATTACH,MENU:t,TYPE:"click"});this.OPENERS[this.OPENERS.length]=e;return e};BX.CMenuOpener.prototype.__hide_hint=function(){if(this.HINT)this.HINT.__hide_immediately()};BX.CMenuOpener.prototype.isMenuVisible=function(){for(var t=0,e=this.OPENERS.length;t<e;t++){if(this.OPENERS[t].isMenuVisible())return true}return false};BX.CMenuOpener.prototype.Hide=function(){if(!this.PARAMS.pin){this.DIV.style.display="none";BX.onCustomEvent(this,"onMenuOpenerHide")}};BX.CMenuOpener.prototype.UnHide=function(){this.DIV.style.display="block";if(!this.bPosAdjusted&&!this.PARAMS.pin){
this.adjustPos();this.bPosAdjusted=true}if(null==this.originalPos&&!this.bMoved){this.originalPos=BX.pos(this.DIV)}BX.onCustomEvent(this,"onMenuOpenerUnhide")};BX.CMenuOpenerItem=function(t){this.item=t;if(this.item.ACTION&&!this.item.ONCLICK){this.item.ONCLICK=this.item.ACTION}this.DIV=BX.create("SPAN");this.DIV.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar-button-underlay"}}));this.WRAPPER=this.DIV.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar-button-wrapper"},children:[BX.create("SPAN",{props:{className:"bx-context-toolbar-button",title:t.TITLE},children:[BX.create("SPAN",{props:{className:"bx-context-toolbar-button-inner"}})]})]}));var e=BX.create("SPAN",{props:{className:"bx-context-toolbar-button-icon"+(this.item.ICON||this.item.ICONCLASS?" "+(this.item.ICON||this.item.ICONCLASS):"")},attrs:!(this.item.ICON||this.item.ICONCLASS)&&(this.item.SRC||this.item.IMAGE)?{style:"background: scroll transparent url("+(this.item.SRC||this.item.IMAGE)+") no-repeat center center !important;"}:{}}),i=BX.create("SPAN",{props:{className:"bx-context-toolbar-button-text"},text:this.item.TEXT});if(this.item.ACTION&&!this.item.ONCLICK){this.item.ONCLICK=this.item.ACTION}this.bHasMenu=!!this.item.MENU;this.bHasAction=!!this.item.ONCLICK;if(this.bHasAction){this.LINK=this.WRAPPER.firstChild.firstChild.appendChild(BX.create("A",{attrs:{href:"javascript: void(0)"},events:{mouseover:this.bHasMenu?BX.proxy(this.__msover_text,this):BX.proxy(this.__msover,this),mouseout:this.bHasMenu?BX.proxy(this.__msout_text,this):BX.proxy(this.__msout,this),mousedown:this.bHasMenu?BX.proxy(this.__msdown_text,this):BX.proxy(this.__msdown,this)},children:[e,i]}));if(this.bHasMenu){this.LINK_MENU=this.WRAPPER.firstChild.firstChild.appendChild(BX.create("A",{props:{className:"bx-context-toolbar-button-arrow"},attrs:{href:"javascript: void(0)"},events:{mouseover:BX.proxy(this.__msover_arrow,this),mouseout:BX.proxy(this.__msout_arrow,this),mousedown:BX.proxy(this.__msdown_arrow,this)},children:[BX.create("SPAN",{props:{className:"bx-context-toolbar-button-arrow"}})]}))}}else if(this.bHasMenu){this.item.ONCLICK=null;this.LINK=this.LINK_MENU=this.WRAPPER.firstChild.firstChild.appendChild(BX.create("A",{attrs:{href:"javascript: void(0)"},events:{mouseover:BX.proxy(this.__msover,this),mouseout:BX.proxy(this.__msout,this),mousedown:BX.proxy(this.__msdown,this)},children:[e,i]}));this.LINK.appendChild(BX.create("SPAN",{props:{className:"bx-context-toolbar-single-button-arrow"}}))}if(this.bHasMenu){this.item.SUBMENU=new BX.CMenu({ATTACH_MODE:"bottom",ITEMS:this.item["MENU"],parent:this.LINK_MENU,parent_attach:this.WRAPPER.firstChild});this.item.OPENER=new BX.COpener({DIV:this.LINK_MENU,TYPE:"click",MENU:this.item.SUBMENU});BX.addCustomEvent(this.item.OPENER,"onOpenerMenuOpen",BX.proxy(this.__menu_open,this));BX.addCustomEvent(this.item.OPENER,"onOpenerMenuClose",BX.proxy(this.__menu_close,this))}if(this.bHasAction){BX.bind(this.LINK,"click",BX.delegate(this.__click,this))}};BX.CMenuOpenerItem.prototype.Get=function(){return this.DIV};BX.CMenuOpenerItem.prototype.__msover=function(){this.bx_hover=true;if(!this._menu_open)BX.addClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-hover")};BX.CMenuOpenerItem.prototype.__msout=function(){this.bx_hover=false;if(!this._menu_open)BX.removeClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-hover bx-context-toolbar-button-active")};BX.CMenuOpenerItem.prototype.__msover_text=function(){this.bx_hover=true;if(!this._menu_open)BX.addClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-text-hover")};BX.CMenuOpenerItem.prototype.__msout_text=function(){this.bx_hover=false;if(!this._menu_open)BX.removeClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-text-hover bx-context-toolbar-button-text-active")};BX.CMenuOpenerItem.prototype.__msover_arrow=function(){this.bx_hover=true;if(!this._menu_open)BX.addClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-arrow-hover")};BX.CMenuOpenerItem.prototype.__msout_arrow=function(){this.bx_hover=false;if(!this._menu_open)BX.removeClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-arrow-hover bx-context-toolbar-button-arrow-active")};BX.CMenuOpenerItem.prototype.__msdown=function(){this.bx_active=true;if(!this._menu_open)BX.addClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-active")};BX.CMenuOpenerItem.prototype.__msdown_text=function(){this.bx_active=true;if(!this._menu_open)BX.addClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-text-active")};BX.CMenuOpenerItem.prototype.__msdown_arrow=function(){this.bx_active=true;if(!this._menu_open)BX.addClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-arrow-active")};BX.CMenuOpenerItem.prototype.__menu_close=function(){this._menu_open=false;this.bx_active=false;BX.removeClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-active bx-context-toolbar-button-text-active bx-context-toolbar-button-arrow-active");if(!this.bx_hover){BX.removeClass(this.LINK.parentNode.parentNode,"bx-context-toolbar-button-hover bx-context-toolbar-button-text-hover bx-context-toolbar-button-arrow-hover");this.bx_hover=false}};BX.CMenuOpenerItem.prototype.__menu_open=function(){this._menu_open=true};BX.CMenuOpenerItem.prototype.__click=function(){BX.evalGlobal(this.item.ONCLICK)};BX.CPageOpener=function(t){BX.CPageOpener.superclass.constructor.apply(this,arguments);this.timeout=505;window.PAGE_EDIT_CONTROL=this};BX.extend(BX.CPageOpener,BX.CMenuOpener);BX.CPageOpener.prototype.checkPosition=function(){if(this==BX.proxy_context)return;this.correctPosition(BX.proxy_context)};BX.CPageOpener.prototype.correctPosition=function(t){if(this.bPosCorrected)return;var e;if(this.DIV.style.display=="none"){e=this.adjustToNodeGetPos();e.bottom=e.top+30;e.right=e.left+300}else{e=BX.pos(this.DIV)}var i=BX.pos(t.Get());if(this.__check_intersection(e,i)){this.DIV.style.display="none";BX.addCustomEvent(t,"onMenuOpenerHide",BX.proxy(this.restorePosition,this));this.bPosCorrected=true}};BX.CPageOpener.prototype.restorePosition=function(){if(BX.proxy_context&&BX.proxy_context.Get().style.display=="none"){this.bPosCorrected=false;if(this.PARAMS.parent.bx_over||this.PARAMS.pin)this.UnHide();BX.removeCustomEvent("onMenuOpenerHide",BX.proxy(this.restorePosition,this))}};BX.CPageOpener.prototype.UnHide=function(){if(!this.bPosCorrected)BX.CPageOpener.superclass.UnHide.apply(this,arguments)};BX.CPageOpener.prototype.Remove=function(){BX.admin.removeComponentBorder(this.PARAMS.parent);BX.userOptions.save("global","settings","page_edit_control_enable","N");this.DIV.style.display="none"};BX.CHintSimple=function(){BX.CHintSimple.superclass.constructor.apply(this,arguments)};BX.extend(BX.CHintSimple,BX.CHint);BX.CHintSimple.prototype.Init=function(){this.DIV=document.body.appendChild(BX.create("DIV",{props:{className:"bx-tooltip-simple"},style:{display:"none"},children:[this.CONTENT=BX.create("DIV")]}));if(this.HINT_TITLE)this.CONTENT.appendChild(BX.create("B",{text:this.HINT_TITLE}));if(this.HINT)this.CONTENT_TEXT=this.CONTENT.appendChild(BX.create("DIV")).appendChild(BX.create("SPAN",{html:this.HINT}));if(this.PARAMS.preventHide){BX.bind(this.DIV,"mouseout",BX.proxy(this.Hide,this));BX.bind(this.DIV,"mouseover",BX.proxy(this.Show,this))}this.bInited=true};BX.adminInformer={itemsShow:3,Init:function(t){if(t)BX.adminInformer.itemsShow=t;var e=BX("admin-informer");if(e)document.body.appendChild(e);BX.addCustomEvent("onTopPanelCollapse",BX.proxy(BX.adminInformer.Close,BX.adminInformer))},Toggle:function(t){var e=BX("admin-informer");if(!e)return false;var i=BX.pos(t);e.style.top=parseInt(i.top)+parseInt(i.height)+7+"px";e.style.left=i.left+"px";if(!BX.hasClass(e,"adm-informer-active"))BX.adminInformer.Show(e);else BX.adminInformer.Hide(e);return false},Close:function(){BX.adminInformer.Hide(BX("admin-informer"))},OnInnerClick:function(t){var e=t.target||t.srcElement;if(e.nodeName.toLowerCase()!="a"||BX.hasClass(e,"adm-informer-footer")){return BX.PreventDefault(t)}return true},ToggleExtra:function(){var t=BX("adm-informer-footer");if(BX.hasClass(t,"adm-informer-footer-collapsed"))this.ShowAll();else this.HideExtra();return false},ShowAll:function(){var t=BX("admin-informer");for(var e=0;e<t.children.length;e++)if(BX.hasClass(t.children[e],"adm-informer-item")&&t.children[e].style.display=="none"){t.children[e].style.display="block"}var i=BX("adm-informer-footer");if(i.textContent!==undefined)i.textContent=BX.message("JSADM_AI_HIDE_EXTRA");else i.innerText=BX.message("JSADM_AI_HIDE_EXTRA");BX.removeClass(i,"adm-informer-footer-collapsed");return false},HideExtra:function(){var t=BX("admin-informer");var e=0;for(var i=BX.adminInformer.itemsShow+1;i<t.children.length;i++){if(BX.hasClass(t.children[i],"adm-informer-item")&&t.children[i].style.display=="block"){t.children[i].style.display="none";e++}}var s=BX("adm-informer-footer");var o=BX.message("JSADM_AI_ALL_NOTIF")+" ("+(BX.adminInformer.itemsShow+parseInt(e))+")";if(s.textContent!==undefined)s.textContent=o;else s.innerText=o;BX.addClass(s,"adm-informer-footer-collapsed");return false},Show:function(t){var e=BX("adm-header-notif-block");if(e)BX.addClass(e,"adm-header-notif-block-active");BX.onCustomEvent(t,"onBeforeAdminInformerShow");setTimeout(BX.proxy(function(){BX.bind(document,"click",BX.proxy(BX.adminInformer.Close,BX.adminInformer))},BX.adminInformer),0);BX.addClass(t,"adm-informer-active");setTimeout(function(){BX.addClass(t,"adm-informer-animate")},0)},Hide:function(t){var e=BX("adm-header-notif-block");if(e)BX.removeClass(e,"adm-header-notif-block-active");BX.unbind(document,"click",BX.proxy(BX.adminInformer.Close,BX.adminInformer));BX.removeClass(t,"adm-informer-animate");if(this.IsAnimationSupported())setTimeout(function(){BX.removeClass(t,"adm-informer-active")},300);else BX.removeClass(t,"adm-informer-active");BX.onCustomEvent(t,"onAdminInformerHide")},IsAnimationSupported:function(){var t=document.body||document.documentElement;if(typeof t.style.transition=="string")return true;else if(typeof t.style.MozTransition=="string")return true;else if(typeof t.style.OTransition=="string")return true;else if(typeof t.style.WebkitTransition=="string")return true;else if(typeof t.style.msTransition=="string")return true;return false},SetItemHtml:function(t,e){var i=BX("adm-informer-item-html-"+t);if(!i)return false;i.innerHTML=e;return true},SetItemFooter:function(t,e){var i=BX("adm-informer-item-footer-"+t);if(!i)return false;i.innerHTML=e;if(e)i.style.display="block";else i.style.display="none";return true}}})(window);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:54:"/bitrix/js/main/core/core_popup.min.js?149752499539932";s:6:"source";s:34:"/bitrix/js/main/core/core_popup.js";s:3:"min";s:38:"/bitrix/js/main/core/core_popup.min.js";s:3:"map";s:38:"/bitrix/js/main/core/core_popup.map.js";}"*/
(function(t){"use strict";if(BX.PopupWindowManager){return}BX.PopupWindowManager={_popups:[],_currentPopup:null,create:function(t,e,i){var o=-1;if((o=this._getPopupIndex(t))!==-1){return this._popups[o]}var n=new BX.PopupWindow(t,e,i);BX.addCustomEvent(n,"onPopupShow",BX.delegate(this.onPopupShow,this));BX.addCustomEvent(n,"onPopupClose",BX.delegate(this.onPopupClose,this));return n},onPopupWindowIsInitialized:function(t,e){BX.addCustomEvent(e,"onPopupDestroy",BX.delegate(this.onPopupDestroy,this));this._popups.push(e)},onPopupShow:function(t){if(this._currentPopup!==null){this._currentPopup.close()}this._currentPopup=t},onPopupClose:function(t){this._currentPopup=null},onPopupDestroy:function(t){var e;if((e=this._getPopupIndex(t.uniquePopupId))!==-1){this._popups=BX.util.deleteFromArray(this._popups,e)}},getCurrentPopup:function(){return this._currentPopup},isPopupExists:function(t){return this._getPopupIndex(t)!==-1},_getPopupIndex:function(t){var e=-1;for(var i=0;i<this._popups.length;i++){if(this._popups[i].uniquePopupId===t){return i}}return e},getMaxZIndex:function(){var t=0,e;for(e=0;e<this._popups.length;e++){t=Math.max(t,this._popups[e].params.zIndex)}return t}};BX.addCustomEvent("onPopupWindowIsInitialized",BX.proxy(BX.PopupWindowManager.onPopupWindowIsInitialized,BX.PopupWindowManager));BX.PopupWindow=function(e,i,o){o=o||{};this.params=o;BX.onCustomEvent("onPopupWindowInit",[e,i,o]);this.uniquePopupId=e;this.params.zIndex=parseInt(o.zIndex);this.params.zIndex=isNaN(o.zIndex)?0:o.zIndex;this.buttons=o.buttons&&BX.type.isArray(o.buttons)?o.buttons:[];this.offsetTop=BX.PopupWindow.getOption("offsetTop");this.offsetLeft=BX.PopupWindow.getOption("offsetLeft");this.firstShow=false;this.bordersWidth=20;this.bindElementPos=null;this.closeIcon=null;this.resizeIcon=null;this.angle=null;this.overlay=null;this.titleBar=null;this.bindOptions=typeof o.bindOptions==="object"?o.bindOptions:{};this.autoHide=o.autoHide===true;this.isAutoHideBinded=false;this.closeByEsc=o.closeByEsc===true;this.isCloseByEscBinded=false;this.width=null;this.height=null;this.minWidth=0;this.minHeight=0;if(o.parentPopup instanceof BX.PopupWindow){this.parentPopup=o.parentPopup;this.appendContainer=o.parentPopup.contentContainer;o.offsetTop=(o.offsetTop?o.offsetTop:0)-(BX.PopupWindow.fullscreenStatus?0:this.parentPopup.popupContainer.offsetTop);o.offsetLeft=(o.offsetLeft?o.offsetLeft:0)-(BX.PopupWindow.fullscreenStatus?0:this.parentPopup.popupContainer.offsetLeft)}else{this.parentPopup=null;this.appendContainer=document.body}this.dragOptions={cursor:"",callback:BX.DoNothing,eventName:""};this.dragged=false;this.dragPageX=0;this.dragPageY=0;if(o.events){for(var n in o.events){BX.addCustomEvent(this,n,o.events[n])}}var s="popup-window";if(o.contentColor&&BX.type.isNotEmptyString(o.contentColor)){s+=" popup-window-content-"+o.contentColor}if(o.contentNoPaddings){s+=" popup-window-content-no-paddings"}if(o.noAllPaddings){s+=" popup-window-no-paddings"}if(o.titleBar){s+=" popup-window-with-titlebar"}if(o.className&&BX.type.isNotEmptyString(o.className)){s+=" "+o.className}if(o.darkMode){s+=" popup-window-dark"}this.popupContainer=document.createElement("div");var p="popup-window-titlebar-"+e;if(o.titleBar){this.titleBar=BX.create("div",{props:{className:"popup-window-titlebar",id:p}})}if(o.closeIcon){this.closeIcon=BX.create("span",{props:{className:"popup-window-close-icon"+(o.titleBar?" popup-window-titlebar-close-icon":"")},style:typeof o.closeIcon==="object"?o.closeIcon:{},events:{click:BX.proxy(this._onCloseIconClick,this)}});if(BX.browser.IsIE()){BX.adjust(this.closeIcon,{attrs:{hidefocus:"true"}})}}this.contentContainer=BX.create("div",{props:{id:"popup-window-content-"+e,className:"popup-window-content"}});BX.adjust(this.popupContainer,{props:{id:e,className:s},style:{zIndex:this.getZindex(),position:"absolute",display:"none",top:"0px",left:"0px"},children:[this.titleBar,this.contentContainer,this.closeIcon]});this.appendContainer.appendChild(this.popupContainer);this.buttonsContainer=null;if(o.angle){this.setAngle(o.angle)}if(o.overlay){this.setOverlay(o.overlay)}this.setOffset(o);this.setBindElement(i);this.setTitleBar(o.titleBar);this.setContent(o.content);this.setButtons(o.buttons);this.setWidth(o.width);this.setHeight(o.height);this.setResizeMode(o.resizable);if(o.bindOnResize!==false){BX.bind(t,"resize",BX.proxy(this._onResizeWindow,this))}BX.onCustomEvent("onPopupWindowIsInitialized",[e,this])};BX.PopupWindow.prototype.setContent=function(t){if(!this.contentContainer||!t){return}if(BX.type.isElementNode(t)){BX.cleanNode(this.contentContainer);this.contentContainer.appendChild(t.parentNode?t.parentNode.removeChild(t):t);t.style.display="block"}else if(BX.type.isString(t)){this.contentContainer.innerHTML=t}else{this.contentContainer.innerHTML="&nbsp;"}};BX.PopupWindow.prototype.setButtons=function(t){this.buttons=t&&BX.type.isArray(t)?t:[];if(this.buttonsContainer){BX.remove(this.buttonsContainer)}if(this.buttons.length>0&&this.contentContainer){var e=[];for(var i=0;i<this.buttons.length;i++){var o=this.buttons[i];if(o===null||!BX.is_subclass_of(o,BX.PopupWindowButton)){continue}o.popupWindow=this;e.push(o.render())}this.buttonsContainer=this.contentContainer.parentNode.appendChild(BX.create("div",{props:{className:"popup-window-buttons"},children:e}))}};BX.PopupWindow.prototype.getButtons=function(){return this.buttons};BX.PopupWindow.prototype.getButton=function(t){for(var e=0;e<this.buttons.length;e++){var i=this.buttons[e];if(i.getId()===t){return i}}return null};BX.PopupWindow.prototype.setBindElement=function(t){if(!t||typeof t!=="object"){return}if(BX.type.isDomNode(t)||BX.type.isNumber(t.top)&&BX.type.isNumber(t.left)){this.bindElement=t}else if(BX.type.isNumber(t.clientX)&&BX.type.isNumber(t.clientY)){BX.fixEventPageXY(t);this.bindElement={left:t.pageX,top:t.pageY,bottom:t.pageY}}};BX.PopupWindow.prototype.getBindElementPos=function(t){if(BX.type.isDomNode(t)){return BX.pos(t,false)}else if(t&&typeof t==="object"){if(!BX.type.isNumber(t.bottom)){t.bottom=t.top}return t}else{var e=BX.GetWindowInnerSize();var i=BX.GetWindowScrollPos();var o=this.popupContainer.offsetWidth;var n=this.popupContainer.offsetHeight;this.bindOptions.forceTop=true;return{left:e.innerWidth/2-o/2+i.scrollLeft,top:e.innerHeight/2-n/2+i.scrollTop,bottom:e.innerHeight/2-n/2+i.scrollTop,windowSize:e,windowScroll:i,popupWidth:o,popupHeight:n}}};BX.PopupWindow.prototype.setAngle=function(t){if(t===false&&this.angle!==null){BX.remove(this.angle.element);this.angle=null;return}var e="popup-window-angly";if(this.angle===null){var i=this.bindOptions.position&&this.bindOptions.position==="top"?"bottom":"top";var o=BX.PopupWindow.getOption(i==="top"?"angleMinTop":"angleMinBottom");var n=BX.type.isNumber(t.offset)?t.offset:0;var s=BX.PopupWindow.getOption("angleLeftOffset",null);if(n>0&&BX.type.isNumber(s)){n+=s-BX.PopupWindow.defaultOptions.angleLeftOffset}this.angle={element:BX.create("div",{props:{className:e+" "+e+"-"+i}}),position:i,offset:0,defaultOffset:Math.max(n,o)};this.popupContainer.appendChild(this.angle.element)}if(typeof t==="object"&&t.position&&BX.util.in_array(t.position,["top","right","bottom","left","hide"])){BX.removeClass(this.angle.element,e+"-"+this.angle.position);BX.addClass(this.angle.element,e+"-"+t.position);this.angle.position=t.position}if(typeof t==="object"&&BX.type.isNumber(t.offset)){var p=t.offset;var u,r;if(this.angle.position==="top"){u=BX.PopupWindow.getOption("angleMinTop");r=this.popupContainer.offsetWidth-BX.PopupWindow.getOption("angleMaxTop");r=r<u?Math.max(u,p):r;this.angle.offset=Math.min(Math.max(u,p),r);this.angle.element.style.left=this.angle.offset+"px";this.angle.element.style.marginLeft=0}else if(this.angle.position==="bottom"){u=BX.PopupWindow.getOption("angleMinBottom");r=this.popupContainer.offsetWidth-BX.PopupWindow.getOption("angleMaxBottom");r=r<u?Math.max(u,p):r;this.angle.offset=Math.min(Math.max(u,p),r);this.angle.element.style.marginLeft=this.angle.offset+"px";this.angle.element.style.left=0}else if(this.angle.position==="right"){u=BX.PopupWindow.getOption("angleMinRight");r=this.popupContainer.offsetHeight-BX.PopupWindow.getOption("angleMaxRight");r=r<u?Math.max(u,p):r;this.angle.offset=Math.min(Math.max(u,p),r);this.angle.element.style.top=this.angle.offset+"px"}else if(this.angle.position==="left"){u=BX.PopupWindow.getOption("angleMinLeft");r=this.popupContainer.offsetHeight-BX.PopupWindow.getOption("angleMaxLeft");r=r<u?Math.max(u,p):r;this.angle.offset=Math.min(Math.max(u,p),r);this.angle.element.style.top=this.angle.offset+"px"}}};BX.PopupWindow.prototype.setWidth=function(t){if(BX.type.isNumber(t)&&t>=0){this.width=t;this.contentContainer.style.width=t+"px";this.contentContainer.style.overflowX="auto";if(this.titleBar){this.titleBar.style.width=t+"px"}}else if(t===false){this.width=null;this.contentContainer.style.removeProperty("width");this.contentContainer.style.removeProperty("overflowX");if(this.titleBar){this.titleBar.style.removeProperty("width")}}};BX.PopupWindow.prototype.setHeight=function(t){if(BX.type.isNumber(t)&&t>=0){this.height=t;this.contentContainer.style.height=t+"px";this.contentContainer.style.overflowY="auto"}else if(t===false){this.height=null;this.contentContainer.style.removeProperty("height");this.contentContainer.style.removeProperty("overflowY")}};BX.PopupWindow.prototype.setResizeMode=function(t){if(t===true||BX.type.isPlainObject(t)){if(!this.resizeIcon){this.resizeIcon=BX.create("div",{props:{className:"popup-window-resize"},events:{mousedown:BX.proxy(this.onResizeMouseDown,this)}});this.popupContainer.appendChild(this.resizeIcon)}if(BX.type.isNumber(t.minWidth)&&t.minWidth>0){this.minWidth=t.minWidth}if(BX.type.isNumber(t.minHeight)&&t.minHeight>0){this.minHeight=t.minHeight}}else if(t===false&&this.resizeIcon){BX.remove(this.resizeIcon);this.resizeIcon=null}};BX.PopupWindow.prototype.getWidth=function(){return this.width};BX.PopupWindow.prototype.getHeight=function(){return this.height};BX.PopupWindow.prototype.onTitleMouseDown=function(t){this._startDrag(t,{cursor:"move",callback:BX.proxy(this.move,this),eventName:"Drag"})};BX.PopupWindow.prototype.onResizeMouseDown=function(t){this._startDrag(t,{cursor:"nwse-resize",eventName:"Resize",callback:BX.proxy(this._resize,this)});this.resizeContentPos=BX.pos(this.contentContainer);this.resizeContentOffset=this.resizeContentPos.left-BX.pos(this.popupContainer).left};BX.PopupWindow.prototype._resize=function(t,e,i,o){var n=i-this.resizeContentPos.left;var s=o-this.resizeContentPos.top;var p=BX.GetWindowScrollSize().scrollWidth;if(this.resizeContentPos.left+n+this.resizeContentOffset>=p){n=p-this.resizeContentPos.left-this.resizeContentOffset}this.setWidth(Math.max(n,this.minWidth));this.setHeight(Math.max(s,this.minHeight))};BX.PopupWindow.prototype.isTopAngle=function(){return this.angle!==null&&this.angle.position==="top"};BX.PopupWindow.prototype.isBottomAngle=function(){return this.angle!==null&&this.angle.position==="bottom"};BX.PopupWindow.prototype.isTopOrBottomAngle=function(){return this.angle!==null&&BX.util.in_array(this.angle.position,["top","bottom"])};BX.PopupWindow.prototype.getAngleHeight=function(){return this.isTopOrBottomAngle()?BX.PopupWindow.getOption("angleTopOffset"):0};BX.PopupWindow.prototype.setOffset=function(t){if(!BX.type.isPlainObject(t)){return}if(t.offsetLeft&&BX.type.isNumber(t.offsetLeft)){this.offsetLeft=t.offsetLeft+BX.PopupWindow.getOption("offsetLeft")}if(t.offsetTop&&BX.type.isNumber(t.offsetTop)){this.offsetTop=t.offsetTop+BX.PopupWindow.getOption("offsetTop")}};BX.PopupWindow.prototype.setTitleBar=function(t){if(!this.titleBar){return}if(typeof t==="object"&&BX.type.isDomNode(t.content)){this.titleBar.innerHTML="";this.titleBar.appendChild(t.content)}else if(typeof t==="string"){this.titleBar.innerHTML="";this.titleBar.appendChild(BX.create("span",{props:{className:"popup-window-titlebar-text"},text:t}))}if(this.params.draggable){this.titleBar.style.cursor="move";BX.bind(this.titleBar,"mousedown",BX.proxy(this.onTitleMouseDown,this))}};BX.PopupWindow.prototype.setClosingByEsc=function(t){t=BX.type.isBoolean(t)?t:true;if(t){this.closeByEsc=true;if(!this.isCloseByEscBinded){BX.bind(document,"keyup",BX.proxy(this._onKeyUp,this));this.isCloseByEscBinded=true}}else{this.closeByEsc=false;if(this.isCloseByEscBinded){BX.unbind(document,"keyup",BX.proxy(this._onKeyUp,this));this.isCloseByEscBinded=false}}};BX.PopupWindow.prototype.setAutoHide=function(t){t=BX.type.isBoolean(t)?t:true;if(t){this.autoHide=true;if(this.isShown()){this.bindAutoHide()}}else{this.autoHide=false;this.unbindAutoHide()}};BX.PopupWindow.prototype.bindAutoHide=function(){if(!this.isAutoHideBinded){this.isAutoHideBinded=true;BX.bind(this.popupContainer,"click",this.cancelBubble);BX.bind(document,"click",BX.proxy(this.close,this))}};BX.PopupWindow.prototype.unbindAutoHide=function(){if(this.isAutoHideBinded){this.isAutoHideBinded=false;BX.unbind(this.popupContainer,"click",this.cancelBubble);BX.unbind(document,"click",BX.proxy(this.close,this))}};BX.PopupWindow.prototype.setOverlay=function(t){if(this.overlay===null){this.overlay={element:BX.create("div",{props:{className:"popup-window-overlay",id:"popup-window-overlay-"+this.uniquePopupId}})};this.adjustOverlayZindex();this.resizeOverlay();this.appendContainer.appendChild(this.overlay.element)}if(t&&t.hasOwnProperty("opacity")&&BX.type.isNumber(t.opacity)&&t.opacity>=0&&t.opacity<=100){if(BX.browser.IsIE()&&!BX.browser.IsIE9()){this.overlay.element.style.filter="alpha(opacity="+t.opacity+")"}else{this.overlay.element.style.filter="none";this.overlay.element.style.opacity=parseFloat(t.opacity/100).toPrecision(3)}}if(t&&t.backgroundColor){this.overlay.element.style.backgroundColor=t.backgroundColor}};BX.PopupWindow.prototype.removeOverlay=function(){if(this.overlay!==null&&this.overlay.element!==null){BX.remove(this.overlay.element)}if(this.overlayTimeout){clearInterval(this.overlayTimeout);this.overlayTimeout=null}this.overlay=null};BX.PopupWindow.prototype.hideOverlay=function(){if(this.overlay!==null&&this.overlay.element!==null){if(this.overlayTimeout){clearInterval(this.overlayTimeout);this.overlayTimeout=null}this.overlay.element.style.display="none"}};BX.PopupWindow.prototype.showOverlay=function(){if(this.overlay!==null&&this.overlay.element!==null){this.overlay.element.style.display="block";var t=this.popupContainer.offsetHeight;this.overlayTimeout=setInterval(function(){if(t!==this.popupContainer.offsetHeight){this.resizeOverlay();t=this.popupContainer.offsetHeight}}.bind(this),1e3)}};BX.PopupWindow.prototype.resizeOverlay=function(){if(this.overlay!==null&&this.overlay.element!==null){if(this.parentPopup){this.overlay.element.style.width=this.parentPopup.popupContainer.offsetWidth+"px";this.overlay.element.style.height=this.parentPopup.popupContainer.offsetHeight+"px"}else{var t=BX.GetWindowScrollSize();var e=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight);this.overlay.element.style.width=t.scrollWidth+"px";this.overlay.element.style.height=e+"px"}}};BX.PopupWindow.prototype.getZindex=function(){if(this.overlay!==null){return BX.PopupWindow.getOption("popupOverlayZindex")+this.params.zIndex}else{return BX.PopupWindow.getOption("popupZindex")+this.params.zIndex}};BX.PopupWindow.prototype.adjustOverlayZindex=function(){if(this.overlay!==null&&this.overlay.element!==null){this.overlay.element.style.zIndex=parseInt(this.popupContainer.style.zIndex)-1}};BX.PopupWindow.prototype.show=function(){if(!this.firstShow){BX.onCustomEvent(this,"onPopupFirstShow",[this]);this.firstShow=true}BX.onCustomEvent(this,"onPopupShow",[this]);this.showOverlay();this.popupContainer.style.display="block";this.adjustPosition();BX.onCustomEvent(this,"onAfterPopupShow",[this]);if(this.closeByEsc&&!this.isCloseByEscBinded){BX.bind(document,"keyup",BX.proxy(this._onKeyUp,this));this.isCloseByEscBinded=true}if(this.autoHide&&!this.isAutoHideBinded){setTimeout(BX.proxy(function(){if(this.isShown()){this.bindAutoHide()}},this),100)}};BX.PopupWindow.prototype.isShown=function(){return this.popupContainer.style.display==="block"};BX.PopupWindow.prototype.cancelBubble=function(e){e=e||t.event;if(e.stopPropagation){e.stopPropagation()}else{e.cancelBubble=true}};BX.PopupWindow.prototype.close=function(t){if(!this.isShown()){return}if(t&&!(BX.getEventButton(t)&BX.MSLEFT)){return true}BX.onCustomEvent(this,"onPopupClose",[this,t]);this.hideOverlay();this.popupContainer.style.display="none";if(this.isCloseByEscBinded){BX.unbind(document,"keyup",BX.proxy(this._onKeyUp,this));this.isCloseByEscBinded=false}setTimeout(BX.proxy(this._close,this),0)};BX.PopupWindow.prototype._close=function(){if(this.autoHide){this.unbindAutoHide()}};BX.PopupWindow.prototype._onCloseIconClick=function(e){e=e||t.event;this.close(e);BX.PreventDefault(e)};BX.PopupWindow.prototype._onKeyUp=function(e){e=e||t.event;if(e.keyCode===27){o(this.getZindex(),BX.proxy(this.close,this))}};BX.PopupWindow.prototype.destroy=function(){BX.onCustomEvent(this,"onPopupDestroy",[this]);BX.unbindAll(this);BX.unbind(document,"keyup",BX.proxy(this._onKeyUp,this));BX.unbind(document,"click",BX.proxy(this.close,this));BX.unbind(document,"mousemove",BX.proxy(this._moveDrag,this));BX.unbind(document,"mouseup",BX.proxy(this._stopDrag,this));BX.unbind(t,"resize",BX.proxy(this._onResizeWindow,this));BX.remove(this.popupContainer);this.removeOverlay()};BX.PopupWindow.prototype.enterFullScreen=function(){if(BX.PopupWindow.fullscreenStatus){if(document.cancelFullScreen){document.cancelFullScreen()}else if(document.mozCancelFullScreen){document.mozCancelFullScreen()}else if(document.webkitCancelFullScreen){document.webkitCancelFullScreen()}}else{if(BX.browser.IsChrome()||BX.browser.IsSafari()){this.contentContainer.webkitRequestFullScreen(this.contentContainer.ALLOW_KEYBOARD_INPUT);BX.bind(t,"webkitfullscreenchange",this.fullscreenBind=BX.proxy(this.eventFullScreen,this))}else if(BX.browser.IsFirefox()){this.contentContainer.mozRequestFullScreen(this.contentContainer.ALLOW_KEYBOARD_INPUT);BX.bind(t,"mozfullscreenchange",this.fullscreenBind=BX.proxy(this.eventFullScreen,this))}}};BX.PopupWindow.prototype.eventFullScreen=function(e){if(BX.PopupWindow.fullscreenStatus){if(BX.browser.IsChrome()||BX.browser.IsSafari()){BX.unbind(t,"webkitfullscreenchange",this.fullscreenBind)}else if(BX.browser.IsFirefox()){BX.unbind(t,"mozfullscreenchange",this.fullscreenBind)}BX.removeClass(this.contentContainer,"popup-window-fullscreen",[this.contentContainer]);BX.PopupWindow.fullscreenStatus=false;BX.onCustomEvent(this,"onPopupFullscreenLeave");this.adjustPosition()}else{BX.addClass(this.contentContainer,"popup-window-fullscreen");BX.PopupWindow.fullscreenStatus=true;BX.onCustomEvent(this,"onPopupFullscreenEnter",[this.contentContainer]);this.adjustPosition()}};BX.PopupWindow.prototype.adjustPosition=function(t){if(t&&typeof t==="object"){this.bindOptions=t}var e=this.getBindElementPos(this.bindElement);if(!this.bindOptions.forceBindPosition&&this.bindElementPos!==null&&e.top===this.bindElementPos.top&&e.left===this.bindElementPos.left){return}this.bindElementPos=e;var i=e.windowSize?e.windowSize:BX.GetWindowInnerSize();var o=e.windowScroll?e.windowScroll:BX.GetWindowScrollPos();var n=e.popupWidth?e.popupWidth:this.popupContainer.offsetWidth;var s=e.popupHeight?e.popupHeight:this.popupContainer.offsetHeight;var p=BX.PopupWindow.getOption("angleTopOffset");var u=this.bindElementPos.left+this.offsetLeft-(this.isTopOrBottomAngle()?BX.PopupWindow.getOption("angleLeftOffset"):0);if(!this.bindOptions.forceLeft&&u+n+this.bordersWidth>=i.innerWidth+o.scrollLeft&&i.innerWidth+o.scrollLeft-n-this.bordersWidth>0){var r=u;u=i.innerWidth+o.scrollLeft-n-this.bordersWidth;if(this.isTopOrBottomAngle()){this.setAngle({offset:r-u+this.angle.defaultOffset})}}else if(this.isTopOrBottomAngle()){this.setAngle({offset:this.angle.defaultOffset+(u<0?u:0)})}if(u<0){u=0}var a=0;if(this.bindOptions.position&&this.bindOptions.position==="top"){a=this.bindElementPos.top-s-this.offsetTop-(this.isBottomAngle()?p:0);if(a<0||!this.bindOptions.forceTop&&a<o.scrollTop){a=this.bindElementPos.bottom+this.offsetTop;if(this.angle!==null){a+=p;this.setAngle({position:"top"})}}else if(this.isTopAngle()){a=a-p+BX.PopupWindow.getOption("positionTopXOffset");this.setAngle({position:"bottom"})}else{a+=BX.PopupWindow.getOption("positionTopXOffset")}}else{a=this.bindElementPos.bottom+this.offsetTop+this.getAngleHeight();if(!this.bindOptions.forceTop&&a+s>i.innerHeight+o.scrollTop&&this.bindElementPos.top-s-this.getAngleHeight()>=0){a=this.bindElementPos.top-s;if(this.isTopOrBottomAngle()){a-=p;this.setAngle({position:"bottom"})}a+=BX.PopupWindow.getOption("positionTopXOffset")}else if(this.isBottomAngle()){a+=p;this.setAngle({position:"top"})}}if(!this.parentPopup&&a<0){a=0}BX.adjust(this.popupContainer,{style:{top:a+"px",left:u+"px",zIndex:this.getZindex()}});this.adjustOverlayZindex()};BX.PopupWindow.prototype._onResizeWindow=function(t){if(this.isShown()){this.adjustPosition();if(this.overlay!==null){this.resizeOverlay()}}};BX.PopupWindow.prototype.move=function(t,e,i,o){var n=parseInt(this.popupContainer.style.left)+t;var s=parseInt(this.popupContainer.style.top)+e;if(typeof this.params.draggable==="object"&&this.params.draggable.restrict){if(!this.parentPopup&&n<0){n=0}var p=BX.GetWindowScrollSize();var u=this.popupContainer.offsetWidth;var r=this.popupContainer.offsetHeight;if(n>p.scrollWidth-u){n=p.scrollWidth-u}if(s>p.scrollHeight-r){s=p.scrollHeight-r}if(!this.parentPopup&&s<0){s=0}}this.popupContainer.style.left=n+"px";this.popupContainer.style.top=s+"px"};BX.PopupWindow.prototype._startDrag=function(e,i){e=e||t.event;BX.fixEventPageXY(e);i=i||{};if(BX.type.isNotEmptyString(i.cursor)){this.dragOptions.cursor=i.cursor}if(BX.type.isNotEmptyString(i.eventName)){this.dragOptions.eventName=i.eventName}if(BX.type.isFunction(i.callback)){this.dragOptions.callback=i.callback}this.dragPageX=e.pageX;this.dragPageY=e.pageY;this.dragged=false;BX.bind(document,"mousemove",BX.proxy(this._moveDrag,this));BX.bind(document,"mouseup",BX.proxy(this._stopDrag,this));if(document.body.setCapture){document.body.setCapture()}document.body.ondrag=BX.False;document.body.onselectstart=BX.False;document.body.style.cursor=this.dragOptions.cursor;document.body.style.MozUserSelect="none";this.popupContainer.style.MozUserSelect="none";return BX.PreventDefault(e)};BX.PopupWindow.prototype._moveDrag=function(e){e=e||t.event;BX.fixEventPageXY(e);if(this.dragPageX===e.pageX&&this.dragPageY===e.pageY){return}this.dragOptions.callback(e.pageX-this.dragPageX,e.pageY-this.dragPageY,e.pageX,e.pageY);this.dragPageX=e.pageX;this.dragPageY=e.pageY;if(!this.dragged){BX.onCustomEvent(this,"onPopup"+this.dragOptions.eventName+"Start",[this]);this.dragged=true}BX.onCustomEvent(this,"onPopup"+this.dragOptions.eventName,[this])};BX.PopupWindow.prototype._stopDrag=function(t){if(document.body.releaseCapture){document.body.releaseCapture()}BX.unbind(document,"mousemove",BX.proxy(this._moveDrag,this));BX.unbind(document,"mouseup",BX.proxy(this._stopDrag,this));document.body.ondrag=null;document.body.onselectstart=null;document.body.style.cursor="";document.body.style.MozUserSelect="";this.popupContainer.style.MozUserSelect="";BX.onCustomEvent(this,"onPopup"+this.dragOptions.eventName+"End",[this]);this.dragged=false;return BX.PreventDefault(t)};BX.PopupWindow.options={};BX.PopupWindow.defaultOptions={angleLeftOffset:40,positionTopXOffset:-11,angleTopOffset:10,popupZindex:1e3,popupOverlayZindex:1100,angleMinLeft:10,angleMaxLeft:10,angleMinRight:10,angleMaxRight:10,angleMinBottom:23,angleMaxBottom:25,angleMinTop:23,angleMaxTop:25,offsetLeft:0,offsetTop:0};BX.PopupWindow.setOptions=function(t){if(!t||typeof t!=="object"){return}for(var e in t){BX.PopupWindow.options[e]=t[e]}};BX.PopupWindow.getOption=function(t,e){if(typeof BX.PopupWindow.options[t]!=="undefined"){return BX.PopupWindow.options[t]}else if(typeof e!=="undefined"){return e}else{return BX.PopupWindow.defaultOptions[t]}};BX.PopupWindowButton=function(t){this.popupWindow=null;this.params=t||{};this.text=this.params.text||"";this.id=this.params.id||"";this.className=this.params.className||"";this.events=this.params.events||{};this.contextEvents={};for(var e in this.events){this.contextEvents[e]=BX.proxy(this.events[e],this)}this.buttonNode=BX.create("span",{props:{className:"popup-window-button"+(this.className.length>0?" "+this.className:""),id:this.id},events:this.contextEvents,text:this.text})};BX.PopupWindowButton.prototype.render=function(){return this.buttonNode};BX.PopupWindowButton.prototype.getId=function(){return this.id};BX.PopupWindowButton.prototype.getName=function(){return this.name};BX.PopupWindowButton.prototype.getContainer=function(){return this.buttonNode};BX.PopupWindowButton.prototype.setName=function(t){this.text=t||"";if(this.buttonNode){BX.cleanNode(this.buttonNode);BX.adjust(this.buttonNode,{text:this.text})}};BX.PopupWindowButton.prototype.setClassName=function(t){if(this.buttonNode){if(BX.type.isString(this.className)&&this.className!==""){BX.removeClass(this.buttonNode,this.className)}BX.addClass(this.buttonNode,t)}this.className=t};BX.PopupWindowButton.prototype.addClassName=function(t){if(this.buttonNode){BX.addClass(this.buttonNode,t);this.className=this.buttonNode.className}};BX.PopupWindowButton.prototype.removeClassName=function(t){if(this.buttonNode){BX.removeClass(this.buttonNode,t);this.className=this.buttonNode.className}};BX.PopupWindowButtonLink=function(t){BX.PopupWindowButtonLink.superclass.constructor.apply(this,arguments);this.buttonNode=BX.create("span",{props:{className:"popup-window-button popup-window-button-link"+(this.className.length>0?" "+this.className:""),id:this.id},text:this.text,events:this.contextEvents})};BX.extend(BX.PopupWindowButtonLink,BX.PopupWindowButton);BX.PopupMenu={Data:{},currentItem:null,show:function(t,e,i,o){if(this.currentItem!==null){this.currentItem.popupWindow.close()}this.currentItem=this.create(t,e,i,o);this.currentItem.popupWindow.show()},create:function(t,e,i,o){if(!this.Data[t]){this.Data[t]=new BX.PopupMenuWindow(t,e,i,o)}return this.Data[t]},getCurrentMenu:function(){return this.currentItem},getMenuById:function(t){return this.Data[t]?this.Data[t]:null},destroy:function(t){var e=this.getMenuById(t);if(e){if(this.currentItem===e){this.currentItem=null}e.popupWindow.destroy();delete this.Data[t]}}};BX.PopupMenuWindow=function(t,e,i,o){this.id=t;this.bindElement=e;this.menuItems=[];this.itemsContainer=null;this.params=o&&typeof o==="object"?o:{};this.parentMenuWindow=null;this.parentMenuItem=null;if(i&&BX.type.isArray(i)){for(var n=0;n<i.length;n++){this.addMenuItemInternal(i[n],null)}}this.layout={menuContainer:null,itemsContainer:null};this.popupWindow=this.__createPopup()};BX.PopupMenuWindow.prototype.__createPopup=function(){var t=[];for(var e=0;e<this.menuItems.length;e++){var i=this.menuItems[e];var o=i.getLayout();t.push(o.item)}var n=new BX.PopupWindow("menu-popup-"+this.id,this.bindElement,{closeByEsc:typeof this.params.closeByEsc!=="undefined"?this.params.closeByEsc:false,bindOptions:typeof this.params.bindOptions==="object"?this.params.bindOptions:{},angle:typeof this.params.angle!=="undefined"?this.params.angle:false,zIndex:this.params.zIndex?this.params.zIndex:0,overlay:typeof this.params.overlay==="object"?this.params.overlay:null,autoHide:typeof this.params.autoHide!=="undefined"?this.params.autoHide:true,offsetTop:this.params.offsetTop?this.params.offsetTop:1,offsetLeft:this.params.offsetLeft?this.params.offsetLeft:0,className:BX.type.isNotEmptyString(this.params.className)?this.params.className:"",noAllPaddings:true,content:this.layout.menuContainer=BX.create("div",{props:{className:"menu-popup"},children:[this.layout.itemsContainer=this.itemsContainer=BX.create("div",{props:{className:"menu-popup-items"},children:t})]}),events:{onPopupClose:this.onMenuWindowClose.bind(this),onPopupDestroy:this.onMenuWindowDestroy.bind(this)}});if(this.params&&this.params.events){for(var s in this.params.events){if(this.params.events.hasOwnProperty(s)){BX.addCustomEvent(n,s,this.params.events[s])}}}return n};BX.PopupMenuWindow.prototype.getPopupWindow=function(){return this.popupWindow};BX.PopupMenuWindow.prototype.show=function(){this.popupWindow.show()};BX.PopupMenuWindow.prototype.close=function(){this.popupWindow.close()};BX.PopupMenuWindow.prototype.destroy=function(){this.popupWindow.destroy()};BX.PopupMenuWindow.prototype.onMenuWindowClose=function(){for(var t=0;t<this.menuItems.length;t++){var e=this.menuItems[t];e.closeSubMenu()}};BX.PopupMenuWindow.prototype.onMenuWindowDestroy=function(){for(var t=0;t<this.menuItems.length;t++){var e=this.menuItems[t];e.destroySubMenu()}};BX.PopupMenuWindow.prototype.setParentMenuWindow=function(t){if(t instanceof BX.PopupMenuWindow){this.parentMenuWindow=t}};BX.PopupMenuWindow.prototype.getParentMenuWindow=function(){return this.parentMenuWindow};BX.PopupMenuWindow.prototype.setParentMenuItem=function(t){if(t instanceof BX.PopupMenuItem){this.parentMenuItem=t}};BX.PopupMenuWindow.prototype.getParentMenuItem=function(){return this.parentMenuItem};BX.PopupMenuWindow.prototype.addMenuItem=function(t,e){var i=this.addMenuItemInternal(t,e);if(!i){return null}var o=i.getLayout();var n=this.getMenuItem(e);if(n!==null){var s=n.getLayout();this.itemsContainer.insertBefore(o.item,s.item)}else{this.itemsContainer.appendChild(o.item)}return i};BX.PopupMenuWindow.prototype.addMenuItemInternal=function(t,e){if(!t||!t.delimiter&&!BX.type.isNotEmptyString(t.text)||t.id&&this.getMenuItem(t.id)!==null){return null}if(BX.type.isNumber(this.params.menuShowDelay)){t.menuShowDelay=this.params.menuShowDelay}var i=new BX.PopupMenuItem(t);i.setMenuWindow(this);var o=this.getMenuItemPosition(e);if(o>=0){this.menuItems=BX.util.insertIntoArray(this.menuItems,o,i)}else{this.menuItems.push(i)}return i};BX.PopupMenuWindow.prototype.removeMenuItem=function(t){var e=this.getMenuItem(t);if(!e){return}for(var i=0;i<this.menuItems.length;i++){if(this.menuItems[i]===e){e.destroySubMenu();this.menuItems=BX.util.deleteFromArray(this.menuItems,i);break}}if(!this.menuItems.length){var o=e.getMenuWindow();if(o){var n=o.getParentMenuItem();if(n){n.destroySubMenu()}else{o.destroy()}}}e.layout.item.parentNode.removeChild(e.layout.item);e.layout={item:null,text:null}};BX.PopupMenuWindow.prototype.getMenuItem=function(t){for(var e=0;e<this.menuItems.length;e++){if(this.menuItems[e].id&&this.menuItems[e].id===t){return this.menuItems[e]}}return null};BX.PopupMenuWindow.prototype.getMenuItems=function(){return this.menuItems};BX.PopupMenuWindow.prototype.getMenuItemPosition=function(t){if(t){for(var e=0;e<this.menuItems.length;e++){if(this.menuItems[e].id&&this.menuItems[e].id===t){return e}}}return-1};BX.PopupMenuItem=function(t){t=t||{};this.options=t;this.id=t.id||BX.util.getRandomString().toLowerCase();this.text=BX.type.isNotEmptyString(t.text)?t.text:"";this.title=BX.type.isNotEmptyString(t.title)?t.title:"";this.delimiter=t.delimiter===true;this.href=BX.type.isNotEmptyString(t.href)?t.href:null;this.target=BX.type.isNotEmptyString(t.target)?t.target:null;this.className=BX.type.isNotEmptyString(t.className)?t.className:null;this.menuShowDelay=BX.type.isNumber(t.menuShowDelay)?t.menuShowDelay:300;this.subMenuOffsetX=BX.type.isNumber(t.subMenuOffsetX)?t.subMenuOffsetX:4;this._items=BX.type.isArray(t.items)?t.items:[];this.onclick=BX.type.isNotEmptyString(t.onclick)||BX.type.isFunction(t.onclick)?t.onclick:null;if(BX.type.isPlainObject(t.events)){for(var e in t.events){BX.addCustomEvent(this,e,t.events[e])}}this.menuWindow=null;this.subMenuWindow=null;this.layout={item:null,text:null};this.getLayout();this.events={};this.items=[];for(var i in t){
if(t.hasOwnProperty(i)&&typeof this[i]==="undefined"){this[i]=t[i]}}};BX.PopupMenuItem.prototype={getLayout:function(){if(this.layout.item){return this.layout}if(this.delimiter){this.layout.item=BX.create("span",{props:{className:"popup-window-delimiter"}})}else{this.layout.item=BX.create(this.href?"a":"span",{props:{className:["menu-popup-item",this.className?this.className:"menu-popup-no-icon",this.hasSubMenu()?"menu-popup-item-submenu":""].join(" ")},attrs:{title:this.title,onclick:BX.type.isString(this.onclick)?this.onclick:"",target:this.target?this.target:""},events:BX.type.isFunction(this.onclick)?{click:BX.delegate(this.onItemClick,this)}:null,children:[BX.create("span",{props:{className:"menu-popup-item-icon"}}),this.layout.text=BX.create("span",{props:{className:"menu-popup-item-text"},html:this.text})]});if(this.href){this.layout.item.href=this.href}BX.bind(this.layout.item,"mouseenter",this.onItemMouseEnter.bind(this));BX.bind(this.layout.item,"mouseleave",this.onItemMouseLeave.bind(this))}return this.layout},onItemClick:function(t){this.onclick.call(this.menuWindow,t,this)},onItemMouseEnter:function(t){BX.onCustomEvent(this,"onMouseEnter");if(this.subMenuTimeout){clearTimeout(this.subMenuTimeout)}if(this.hasSubMenu()){this.subMenuTimeout=setTimeout(function(){this.showSubMenu()}.bind(this),this.menuShowDelay)}else{this.subMenuTimeout=setTimeout(function(){this.closeSiblings()}.bind(this),this.menuShowDelay)}},onItemMouseLeave:function(t){BX.onCustomEvent(this,"onMouseLeave");if(this.subMenuTimeout){clearTimeout(this.subMenuTimeout)}},hasSubMenu:function(){return this.subMenuWindow!==null||this._items.length},showSubMenu:function(){this.addSubMenu(this._items);if(this.subMenuWindow){BX.addClass(this.layout.item,"menu-popup-item-open");this.closeSiblings();this.closeChildren();var t=this.subMenuWindow.getPopupWindow();if(!t.isShown()){BX.onCustomEvent(this,"onSubMenuShow");t.show()}this.adjustSubMenu()}},addSubMenu:function(t){if(this.subMenuWindow!==null||!BX.type.isArray(t)||!t.length){return}this.subMenuWindow=new BX.PopupMenuWindow("popup-submenu-"+this.id,null,t,{autoHide:false,menuShowDelay:this.menuShowDelay,bindOptions:{forceTop:true,forceLeft:true,forceBindPosition:true}});this.subMenuWindow.setParentMenuWindow(this.menuWindow);this.subMenuWindow.setParentMenuItem(this);BX.addClass(this.layout.item,"menu-popup-item-submenu")},closeSubMenu:function(){if(this.subMenuWindow){BX.removeClass(this.layout.item,"menu-popup-item-open");this.closeChildren();var t=this.subMenuWindow.getPopupWindow();if(t.isShown()){BX.onCustomEvent(this,"onSubMenuClose");t.close()}this.subMenuWindow.close()}},closeSiblings:function(){var t=this.menuWindow.getMenuItems();for(var e=0;e<t.length;e++){if(t[e]!==this){t[e].closeSubMenu()}}},closeChildren:function(){if(this.subMenuWindow){var t=this.subMenuWindow.getMenuItems();for(var e=0;e<t.length;e++){t[e].closeSubMenu()}}},destroySubMenu:function(){if(this.subMenuWindow){BX.removeClass(this.layout.item,"menu-popup-item-open menu-popup-item-submenu");this.destroyChildren();this.subMenuWindow.destroy();this.subMenuWindow=null;this._items=[]}},destroyChildren:function(){if(this.subMenuWindow){var t=this.subMenuWindow.getMenuItems();for(var e=0;e<t.length;e++){t[e].destroySubMenu()}}},adjustSubMenu:function(){if(!this.subMenuWindow||!this.layout.item){return}var t=this.subMenuWindow.getPopupWindow();var e=BX.pos(this.layout.item);var i=e.width+this.subMenuOffsetX;var o="left";var n=t.popupContainer.offsetWidth;var s=document.documentElement.clientWidth;if(e.left+i+n>s){var p=e.left-n-this.subMenuOffsetX;if(p>0){i=-n-this.subMenuOffsetX;o="right"}}t.setBindElement(this.layout.item);t.setOffset({offsetLeft:i,offsetTop:-(e.height+this.getPopupPadding())});t.setAngle({position:o,offset:e.height/2-this.getPopupPadding()});t.adjustPosition()},getPopupPadding:function(){if(!BX.type.isNumber(this.popupPadding)){if(this.subMenuWindow){var t=this.subMenuWindow.layout.menuContainer;this.popupPadding=parseInt(BX.style(t,"paddingTop"),10)}else{this.popupPadding=0}}return this.popupPadding},getSubMenu:function(){return this.subMenuWindow},getId:function(){return this.id},setMenuWindow:function(t){this.menuWindow=t},getMenuWindow:function(){return this.menuWindow},getMenuShowDelay:function(){return this.menuShowDelay}};t.BXInputPopup=function(t){this.id=t.id||"bx-inp-popup-"+Math.round(Math.random()*1e6);this.handler=t.handler||false;this.values=t.values||false;this.pInput=t.input;this.bValues=!!this.values;this.defaultValue=t.defaultValue||"";this.openTitle=t.openTitle||"";this.className=t.className||"";this.noMRclassName=t.noMRclassName||"ec-no-rm";this.emptyClassName=t.noMRclassName||"ec-label";var e=this;this.curInd=false;if(this.bValues){this.pInput.onfocus=this.pInput.onclick=function(t){if(this.value==e.defaultValue){this.value="";this.className=e.className}e.ShowPopup();return BX.PreventDefault(t)};this.pInput.onblur=function(){if(e.bShowed)setTimeout(function(){e.ClosePopup(true)},200);e.OnChange()}}else{this.pInput.className=this.noMRclassName;this.pInput.onblur=BX.proxy(this.OnChange,this)}};BXInputPopup.prototype={ShowPopup:function(){if(this.bShowed)return;var t=this;if(!this.oPopup){var e,i=BX.create("DIV",{props:{className:"bxecpl-loc-popup "+this.className}});for(var o=0,n=this.values.length;o<n;o++){e=i.appendChild(BX.create("DIV",{props:{id:"bxecmr_"+o},text:this.values[o].NAME,events:{mouseover:function(){BX.addClass(this,"bxecplloc-over")},mouseout:function(){BX.removeClass(this,"bxecplloc-over")},click:function(){var e=this.id.substr("bxecmr_".length);t.pInput.value=t.values[e].NAME;t.curInd=e;t.OnChange();t.ClosePopup(true)}}}));if(this.values[o].DESCRIPTION)e.title=this.values[o].DESCRIPTION;if(this.values[o].CLASS_NAME)BX.addClass(e,this.values[o].CLASS_NAME);if(this.values[o].URL)e.appendChild(BX.create("A",{props:{href:this.values[o].URL,className:"bxecplloc-view",target:"_blank",title:this.openTitle}}))}this.oPopup=new BX.PopupWindow(this.id,this.pInput,{autoHide:true,offsetTop:1,offsetLeft:0,lightShadow:true,closeByEsc:true,content:i});BX.addCustomEvent(this.oPopup,"onPopupClose",BX.proxy(this.ClosePopup,this))}this.oPopup.show();this.pInput.select();this.bShowed=true;BX.onCustomEvent(this,"onInputPopupShow",[this])},ClosePopup:function(t){this.bShowed=false;if(this.pInput.value=="")this.OnChange();BX.onCustomEvent(this,"onInputPopupClose",[this]);if(t===true)this.oPopup.close()},OnChange:function(){var t=this.pInput.value;if(this.bValues){if(this.pInput.value==""||this.pInput.value==this.defaultValue){this.pInput.value=this.defaultValue;this.pInput.className=this.emptyClassName;t=""}else{this.pInput.className=""}}if(isNaN(parseInt(this.curInd))||this.curInd!==false&&t!=this.values[this.curInd].NAME)this.curInd=false;else this.curInd=parseInt(this.curInd);BX.onCustomEvent(this,"onInputPopupChanged",[this,this.curInd,t]);if(this.handler&&typeof this.handler=="function")this.handler({ind:this.curInd,value:t})},Set:function(t,e,i){this.curInd=t;if(this.curInd!==false)this.pInput.value=this.values[this.curInd].NAME;else this.pInput.value=e;if(i!==false)this.OnChange()},Get:function(t){var e=false;if(typeof t=="undefined")t=this.curInd;if(t!==false&&this.values[t])e=this.values[t].ID;return e},GetIndex:function(t){for(var e=0,i=this.values.length;e<i;e++)if(this.values[e].ID==t)return e;return false},Deactivate:function(t){if(this.pInput.value==""||this.pInput.value==this.defaultValue){if(t){this.pInput.value="";this.pInput.className=this.noMRclassName}else if(this.oEC.bUseMR){this.pInput.value=this.defaultValue;this.pInput.className=this.emptyClassName}}this.pInput.disabled=t}};var e=-1,i=null;function o(t,n){if(t===false){if(i&&i.length>0){for(var s=0;s<i.length;s++){i[s]()}i=null;e=-1}}else{if(i===null){i=[];e=-1;BX.defer(o)(false)}if(t>e){e=t;i=[n]}else if(t==e){i.push(n)}}}})(window);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:53:"/bitrix/js/main/core/core_date.min.js?148050392934241";s:6:"source";s:33:"/bitrix/js/main/core/core_date.js";s:3:"min";s:37:"/bitrix/js/main/core/core_date.min.js";s:3:"map";s:37:"/bitrix/js/main/core/core_date.map.js";}"*/
(function(){if(BX.date)return;BX.date={};BX.date.format=function(e,t,a,i){var s=BX.type.isDate(t)?new Date(t.getTime()):BX.type.isNumber(t)?new Date(t*1e3):new Date;var r=BX.type.isDate(a)?new Date(a.getTime()):BX.type.isNumber(a)?new Date(a*1e3):new Date;var n=!!i;if(BX.type.isArray(e))return c(e,s,r,n);else if(!BX.type.isNotEmptyString(e))return"";var o=/\\?(sago|iago|isago|Hago|dago|mago|Yago|sdiff|idiff|Hdiff|ddiff|mdiff|Ydiff|yesterday|today|tommorow|[a-z])/gi;var l={d:function(){return BX.util.str_pad_left(p(s).toString(),2,"0")},D:function(){return BX.message("DOW_"+v(s))},j:function(){return p(s)},l:function(){return BX.message("DAY_OF_WEEK_"+v(s))},N:function(){return v(s)||7},S:function(){if(p(s)%10==1&&p(s)!=11)return"st";else if(p(s)%10==2&&p(s)!=12)return"nd";else if(p(s)%10==3&&p(s)!=13)return"rd";else return"th"},w:function(){return v(s)},z:function(){var e=new Date(d(s),0,1);var t=new Date(d(s),h(s),p(s));return Math.ceil((t-e)/(24*3600*1e3))},W:function(){var e=new Date(s.getTime());var t=(v(s)+6)%7;B(e,p(e)-t+3);var a=e.getTime();M(e,0,1);if(v(e)!=4)M(e,0,1+(4-v(e)+7)%7);var i=1+Math.ceil((a-e)/(7*24*3600*1e3));return BX.util.str_pad_left(i.toString(),2,"0")},F:function(){return BX.message("MONTH_"+(h(s)+1)+"_S")},f:function(){return BX.message("MONTH_"+(h(s)+1))},m:function(){return BX.util.str_pad_left((h(s)+1).toString(),2,"0")},M:function(){return BX.message("MON_"+(h(s)+1))},n:function(){return h(s)+1},t:function(){var e=n?new Date(Date.UTC(d(s),h(s)+1,0)):new Date(d(s),h(s)+1,0);return p(e)},L:function(){var e=d(s);return e%4==0&&e%100!=0||e%400==0?1:0},o:function(){var e=new Date(s.getTime());B(e,p(e)-(v(s)+6)%7+3);return d(e)},Y:function(){return d(s)},y:function(){return d(s).toString().slice(2)},a:function(){return f(s)>11?"pm":"am"},A:function(){return f(s)>11?"PM":"AM"},B:function(){var e=(s.getUTCHours()+1)%24+s.getUTCMinutes()/60+s.getUTCSeconds()/3600;return BX.util.str_pad_left(Math.floor(e*1e3/24).toString(),3,"0")},g:function(){return f(s)%12||12},G:function(){return f(s)},h:function(){return BX.util.str_pad_left((f(s)%12||12).toString(),2,"0")},H:function(){return BX.util.str_pad_left(f(s).toString(),2,"0")},i:function(){return BX.util.str_pad_left(m(s).toString(),2,"0")},s:function(){return BX.util.str_pad_left(D(s).toString(),2,"0")},u:function(){return BX.util.str_pad_left((T(s)*1e3).toString(),6,"0")},e:function(){if(n)return"UTC";return""},I:function(){if(n)return 0;var e=new Date(d(s),0,1);var t=Date.UTC(d(s),0,1);var a=new Date(d(s),6,0);var i=Date.UTC(d(s),6,0);return 0+(e-t!==a-i)},O:function(){if(n)return"+0000";var e=s.getTimezoneOffset();var t=Math.abs(e);return(e>0?"-":"+")+BX.util.str_pad_left((Math.floor(t/60)*100+t%60).toString(),4,"0")},P:function(){if(n)return"+00:00";var e=this.O();return e.substr(0,3)+":"+e.substr(3)},Z:function(){if(n)return 0;return-s.getTimezoneOffset()*60},c:function(){return"Y-m-d\\TH:i:sP".replace(o,C)},r:function(){return"D, d M Y H:i:s O".replace(o,C)},U:function(){return Math.floor(s.getTime()/1e3)},sago:function(){return X(O((r-s)/1e3),{0:"FD_SECOND_AGO_0",1:"FD_SECOND_AGO_1","10_20":"FD_SECOND_AGO_10_20",MOD_1:"FD_SECOND_AGO_MOD_1",MOD_2_4:"FD_SECOND_AGO_MOD_2_4",MOD_OTHER:"FD_SECOND_AGO_MOD_OTHER"})},sdiff:function(){return X(O((r-s)/1e3),{0:"FD_SECOND_DIFF_0",1:"FD_SECOND_DIFF_1","10_20":"FD_SECOND_DIFF_10_20",MOD_1:"FD_SECOND_DIFF_MOD_1",MOD_2_4:"FD_SECOND_DIFF_MOD_2_4",MOD_OTHER:"FD_SECOND_DIFF_MOD_OTHER"})},iago:function(){return X(O((r-s)/60/1e3),{0:"FD_MINUTE_AGO_0",1:"FD_MINUTE_AGO_1","10_20":"FD_MINUTE_AGO_10_20",MOD_1:"FD_MINUTE_AGO_MOD_1",MOD_2_4:"FD_MINUTE_AGO_MOD_2_4",MOD_OTHER:"FD_MINUTE_AGO_MOD_OTHER"})},idiff:function(){return X(O((r-s)/60/1e3),{0:"FD_MINUTE_DIFF_0",1:"FD_MINUTE_DIFF_1","10_20":"FD_MINUTE_DIFF_10_20",MOD_1:"FD_MINUTE_DIFF_MOD_1",MOD_2_4:"FD_MINUTE_DIFF_MOD_2_4",MOD_OTHER:"FD_MINUTE_DIFF_MOD_OTHER"})},isago:function(){var e=O((r-s)/60/1e3);var t=X(e,{0:"FD_MINUTE_0",1:"FD_MINUTE_1","10_20":"FD_MINUTE_10_20",MOD_1:"FD_MINUTE_MOD_1",MOD_2_4:"FD_MINUTE_MOD_2_4",MOD_OTHER:"FD_MINUTE_MOD_OTHER"});t+=" ";var a=O((r-s)/1e3)-e*60;t+=X(a,{0:"FD_SECOND_AGO_0",1:"FD_SECOND_AGO_1","10_20":"FD_SECOND_AGO_10_20",MOD_1:"FD_SECOND_AGO_MOD_1",MOD_2_4:"FD_SECOND_AGO_MOD_2_4",MOD_OTHER:"FD_SECOND_AGO_MOD_OTHER"});return t},Hago:function(){return X(O((r-s)/60/60/1e3),{0:"FD_HOUR_AGO_0",1:"FD_HOUR_AGO_1","10_20":"FD_HOUR_AGO_10_20",MOD_1:"FD_HOUR_AGO_MOD_1",MOD_2_4:"FD_HOUR_AGO_MOD_2_4",MOD_OTHER:"FD_HOUR_AGO_MOD_OTHER"})},Hdiff:function(){return X(O((r-s)/60/60/1e3),{0:"FD_HOUR_DIFF_0",1:"FD_HOUR_DIFF_1","10_20":"FD_HOUR_DIFF_10_20",MOD_1:"FD_HOUR_DIFF_MOD_1",MOD_2_4:"FD_HOUR_DIFF_MOD_2_4",MOD_OTHER:"FD_HOUR_DIFF_MOD_OTHER"})},yesterday:function(){return BX.message("FD_YESTERDAY")},today:function(){return BX.message("FD_TODAY")},tommorow:function(){return BX.message("FD_TOMORROW")},dago:function(){return X(O((r-s)/60/60/24/1e3),{0:"FD_DAY_AGO_0",1:"FD_DAY_AGO_1","10_20":"FD_DAY_AGO_10_20",MOD_1:"FD_DAY_AGO_MOD_1",MOD_2_4:"FD_DAY_AGO_MOD_2_4",MOD_OTHER:"FD_DAY_AGO_MOD_OTHER"})},ddiff:function(){return X(O((r-s)/60/60/24/1e3),{0:"FD_DAY_DIFF_0",1:"FD_DAY_DIFF_1","10_20":"FD_DAY_DIFF_10_20",MOD_1:"FD_DAY_DIFF_MOD_1",MOD_2_4:"FD_DAY_DIFF_MOD_2_4",MOD_OTHER:"FD_DAY_DIFF_MOD_OTHER"})},mago:function(){return X(O((r-s)/60/60/24/31/1e3),{0:"FD_MONTH_AGO_0",1:"FD_MONTH_AGO_1","10_20":"FD_MONTH_AGO_10_20",MOD_1:"FD_MONTH_AGO_MOD_1",MOD_2_4:"FD_MONTH_AGO_MOD_2_4",MOD_OTHER:"FD_MONTH_AGO_MOD_OTHER"})},mdiff:function(){return X(O((r-s)/60/60/24/31/1e3),{0:"FD_MONTH_DIFF_0",1:"FD_MONTH_DIFF_1","10_20":"FD_MONTH_DIFF_10_20",MOD_1:"FD_MONTH_DIFF_MOD_1",MOD_2_4:"FD_MONTH_DIFF_MOD_2_4",MOD_OTHER:"FD_MONTH_DIFF_MOD_OTHER"})},Yago:function(){return X(O((r-s)/60/60/24/365/1e3),{0:"FD_YEARS_AGO_0",1:"FD_YEARS_AGO_1","10_20":"FD_YEARS_AGO_10_20",MOD_1:"FD_YEARS_AGO_MOD_1",MOD_2_4:"FD_YEARS_AGO_MOD_2_4",MOD_OTHER:"FD_YEARS_AGO_MOD_OTHER"})},Ydiff:function(){return X(O((r-s)/60/60/24/365/1e3),{0:"FD_YEARS_DIFF_0",1:"FD_YEARS_DIFF_1","10_20":"FD_YEARS_DIFF_10_20",MOD_1:"FD_YEARS_DIFF_MOD_1",MOD_2_4:"FD_YEARS_DIFF_MOD_2_4",MOD_OTHER:"FD_YEARS_DIFF_MOD_OTHER"})},x:function(){return BX.date.format([["tommorow","tommorow, H:i"],["-",BX.date.convertBitrixFormat(BX.message("FORMAT_DATETIME")).replace(/:s$/g,"")],["s","sago"],["i","iago"],["today","today, H:i"],["yesterday","yesterday, H:i"],["",BX.date.convertBitrixFormat(BX.message("FORMAT_DATETIME")).replace(/:s$/g,"")]],s,r,n)},X:function(){var e=BX.date.format([["tommorow","tommorow"],["-",BX.date.convertBitrixFormat(BX.message("FORMAT_DATE"))],["today","today"],["yesterday","yesterday"],["",BX.date.convertBitrixFormat(BX.message("FORMAT_DATE"))]],s,r,n);var t=BX.date.format([["tommorow","H:i"],["today","H:i"],["yesterday","H:i"],["",""]],s,r,n);if(t.length>0)return BX.message("FD_DAY_AT_TIME").replace(/#DAY#/g,e).replace(/#TIME#/g,t);else return e},Q:function(){var e=O((r-s)/60/60/24/1e3);if(e==0)return BX.message("FD_DAY_DIFF_1").replace(/#VALUE#/g,1);else return BX.date.format([["d","ddiff"],["m","mdiff"],["","Ydiff"]],s,r)}};var u=false;if(e[0]&&e[0]=="^"){u=true;e=e.substr(1)}var _=e.replace(o,C);if(u){_=_.replace(/\s*00:00:00\s*/g,"").replace(/(\d\d:\d\d)(:00)/g,"$1").replace(/(\s*00:00\s*)(?!:)/g,"")}return _;function c(e,t,a,i){var s=O((a-t)/1e3);for(var r=0;r<e.length;r++){var n=e[r][0];var o=e[r][1];var l=null;if(n=="s"){if(s<60)return BX.date.format(o,t,a,i)}else if((l=/^s(\d+)/.exec(n))!=null){if(s<l[1])return BX.date.format(o,t,a,i)}else if(n=="i"){if(s<60*60)return BX.date.format(o,t,a,i)}else if((l=/^i(\d+)/.exec(n))!=null){if(s<l[1]*60)return BX.date.format(o,t,a,i)}else if(n=="H"){if(s<24*60*60)return BX.date.format(o,t,a,i)}else if((l=/^H(\d+)/.exec(n))!=null){if(s<l[1]*60*60)return BX.date.format(o,t,a,i)}else if(n=="d"){if(s<31*24*60*60)return BX.date.format(o,t,a,i)}else if((l=/^d(\d+)/.exec(n))!=null){if(s<l[1]*60*60)return BX.date.format(o,t,a,i)}else if(n=="m"){if(s<365*24*60*60)return BX.date.format(o,t,a,i)}else if((l=/^m(\d+)/.exec(n))!=null){if(s<l[1]*31*24*60*60)return BX.date.format(o,t,a,i)}else if(n=="today"){var u=d(a),_=h(a),c=p(a);var f=i?new Date(Date.UTC(u,_,c,0,0,0,0)):new Date(u,_,c,0,0,0,0);var m=i?new Date(Date.UTC(u,_,c+1,0,0,0,0)):new Date(u,_,c+1,0,0,0,0);if(t>=f&&t<m)return BX.date.format(o,t,a,i)}else if(n=="yesterday"){u=d(a);_=h(a);c=p(a);var D=i?new Date(Date.UTC(u,_,c-1,0,0,0,0)):new Date(u,_,c-1,0,0,0,0);var T=i?new Date(Date.UTC(u,_,c,0,0,0,0)):new Date(u,_,c,0,0,0,0);if(t>=D&&t<T)return BX.date.format(o,t,a,i)}else if(n=="tommorow"){u=d(a);_=h(a);c=p(a);var v=i?new Date(Date.UTC(u,_,c+1,0,0,0,0)):new Date(u,_,c+1,0,0,0,0);var B=i?new Date(Date.UTC(u,_,c+2,0,0,0,0)):new Date(u,_,c+2,0,0,0,0);if(t>=v&&t<B)return BX.date.format(o,t,a,i)}else if(n=="-"){if(s<0)return BX.date.format(o,t,a,i)}}return e.length>0?BX.date.format(e.pop()[1],t,a,i):""}function d(e){return n?e.getUTCFullYear():e.getFullYear()}function p(e){return n?e.getUTCDate():e.getDate()}function h(e){return n?e.getUTCMonth():e.getMonth()}function f(e){return n?e.getUTCHours():e.getHours()}function m(e){return n?e.getUTCMinutes():e.getMinutes()}function D(e){return n?e.getUTCSeconds():e.getSeconds()}function T(e){return n?e.getUTCMilliseconds():e.getMilliseconds()}function v(e){return n?e.getUTCDay():e.getDay()}function B(e,t){return n?e.setUTCDate(t):e.setDate(t)}function M(e,t,a){return n?e.setUTCMonth(t,a):e.setMonth(t,a)}function X(e,t){var a=e<100?Math.abs(e):Math.abs(e%100);var i=a%10;var s="";if(a==0)s=BX.message(t["0"]);else if(a==1)s=BX.message(t["1"]);else if(a>=10&&a<=20)s=BX.message(t["10_20"]);else if(i==1)s=BX.message(t["MOD_1"]);else if(2<=i&&i<=4)s=BX.message(t["MOD_2_4"]);else s=BX.message(t["MOD_OTHER"]);return s.replace(/#VALUE#/g,e)}function C(e,t){if(l[e])return l[e]();else return t}function O(e){return e>=0?Math.floor(e):Math.ceil(e)}};BX.date.convertBitrixFormat=function(e){if(!BX.type.isNotEmptyString(e))return"";return e.replace("YYYY","Y").replace("MMMM","F").replace("MM","m").replace("M","M").replace("DD","d").replace("G","g").replace(/GG/i,"G").replace("H","h").replace(/HH/i,"H").replace("MI","i").replace("SS","s").replace("TT","A").replace("T","a")};BX.date.convertToUTC=function(e){if(!BX.type.isDate(e))return null;return new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()))};BX.date.getNewDate=function(e){return new Date(BX.date.getBrowserTimestamp(e))};BX.date.getBrowserTimestamp=function(e){e=parseInt(e,10);var t=new Date(e*1e3).getTimezoneOffset()*60;return(parseInt(e,10)+parseInt(BX.message("SERVER_TZ_OFFSET"))+t)*1e3};BX.date.getServerTimestamp=function(e){e=parseInt(e,10);var t=new Date(e).getTimezoneOffset()*60;return Math.round(e/1e3-(parseInt(BX.message("SERVER_TZ_OFFSET"),10)+parseInt(t,10)))};var e=null;BX.calendar=function(e){return BX.calendar.get().Show(e)};BX.calendar.get=function(){if(!e)e=new BX.JCCalendar;return e};BX.calendar.InsertDaysBack=function(e,t){if(t!=""){var a=new Date;if(t>0){a.setTime(a.valueOf()-t*864e5)}e.value=BX.date.format(BX.date.convertBitrixFormat(BX.message("FORMAT_DATE")),a,null)}else{e.value=""}};BX.calendar.ValueToString=function(e,t,a){return BX.date.format(BX.date.convertBitrixFormat(BX.message(t?"FORMAT_DATETIME":"FORMAT_DATE")),e,null,!!a)};BX.CalendarPeriod={Init:function(e,t,a){if((e.value!=""||t.value!="")&&a.value=="")a.value="interval";a.onchange()},ChangeDirectOpts:function(e,t){var a=BX.findChild(t,{className:"adm-select adm-calendar-direction"},true);if(e=="week"){a.options[0].text=BX.message("JSADM_CALEND_PREV_WEEK");a.options[1].text=BX.message("JSADM_CALEND_CURR_WEEK");a.options[2].text=BX.message("JSADM_CALEND_NEXT_WEEK")}else{a.options[0].text=BX.message("JSADM_CALEND_PREV");a.options[1].text=BX.message("JSADM_CALEND_CURR");a.options[2].text=BX.message("JSADM_CALEND_NEXT")}},SaveAndClearInput:function(e){if(!window.SavedPeriodValues)window.SavedPeriodValues={};window.SavedPeriodValues[e.id]=e.value;e.value=""},RestoreInput:function(e){if(!window.SavedPeriodValues||!window.SavedPeriodValues[e.id])return;e.value=window.SavedPeriodValues[e.id];delete window.SavedPeriodValues[e.id]},OnChangeP:function(e){var t=e.parentNode.parentNode;var a,i,s,r;a=i=s=r=false;var n=BX.findChild(t,{className:"adm-input-wrap adm-calendar-inp adm-calendar-first"});var o=BX.findChild(t,{className:"adm-input-wrap adm-calendar-second"});var l=BX.findChild(t,{className:"adm-select-wrap adm-calendar-direction"});var u=BX.findChild(t,{className:"adm-calendar-separate"});var _=BX.findChild(t,{className:"adm-input adm-calendar-from"},true);var c=BX.findChild(t,{className:"adm-input adm-calendar-to"},true);switch(e.value){case"day":case"week":case"month":case"quarter":case"year":s=true;BX.CalendarPeriod.OnChangeD(l.children[0]);break;case"before":i=true;break;case"after":a=true;break;case"exact":a=true;break;case"interval":a=i=r=true;BX.CalendarPeriod.RestoreInput(_);BX.CalendarPeriod.RestoreInput(c);break;case"":BX.CalendarPeriod.SaveAndClearInput(_);BX.CalendarPeriod.SaveAndClearInput(c);break;default:break}BX.CalendarPeriod.ChangeDirectOpts(e.value,t);n.style.display=a?"inline-block":"none";o.style.display=i?"inline-block":"none";l.style.display=s?"inline-block":"none";u.style.display=r?"inline-block":"none"},OnChangeD:function(e){var t=e.parentNode.parentNode;var a=BX.findChild(t,{className:"adm-input adm-calendar-from"},true);var i=BX.findChild(t,{className:"adm-input adm-calendar-to"},true);var s=BX.findChild(t,{className:"adm-select adm-calendar-period"},true);var r=0;switch(e.value){case"previous":r=-1;break;case"next":r=1;break;case"current":default:break}var n=false;var o=false;var l=new Date;var u=l.getFullYear();var _=l.getMonth();var c=l.getDate();var d=l.getDay();if(d==0)d=7;switch(s.value){case"day":n=new Date(u,_,c+r,0,0,0);o=new Date(u,_,c+r,23,59,59);break;case"week":n=new Date(u,_,c-d+1+r*7,0,0,0);o=new Date(u,_,c+(7-d)+r*7,23,59,59);break;case"month":n=new Date(u,_+r,1,0,0,0);o=new Date(u,_+1+r,0,23,59,59);break;case"quarter":var p=Math.floor(_/3)+r;n=new Date(u,3*p,1,0,0,0);o=new Date(u,3*(p+1),0,23,59,59);break;case"year":n=new Date(u+r,0,1,0,0,0);o=new Date(u+1+r,0,0,23,59,59);break;default:break}var h=window[a.name+"_bTime"]?BX.message("FORMAT_DATETIME"):BX.message("FORMAT_DATE");if(n){a.value=BX.formatDate(n,h);BX.addClass(a,"adm-calendar-inp-setted")}if(o){i.value=BX.formatDate(o,h);BX.addClass(i,"adm-calendar-inp-setted")}}};BX.JCCalendar=function(){this.params={};this.bAmPm=BX.isAmPmMode();this.popup=null;this.popup_month=null;this.popup_year=null;this.value=null;this.control_id=Math.random();this._layers={};this._current_layer=null;this.DIV=null;this.PARTS={};this.weekStart=0;this.numRows=6;this._create=function(e){this.popup=new BX.PopupWindow("calendar_popup_"+this.control_id,e.node,{closeByEsc:true,autoHide:false,content:this._get_content(),zIndex:3e3,bindOptions:{forceBindPosition:true}});BX.bind(this.popup.popupContainer,"click",this.popup.cancelBubble)};this._auto_hide_disable=function(){BX.unbind(document,"click",BX.proxy(this._auto_hide,this))};this._auto_hide_enable=function(){BX.bind(document,"click",BX.proxy(this._auto_hide,this))};this._auto_hide=function(e){this._auto_hide_disable();this.popup.close()};this._get_content=function(){var e=BX.delegate(function(e){e=e||window.event;this.SetDate(new Date(parseInt(BX.proxy_context.getAttribute("data-date"))),e.type=="dblclick")},this);this.DIV=BX.create("DIV",{props:{className:"bx-calendar"},children:[BX.create("DIV",{props:{className:"bx-calendar-header"},children:[BX.create("A",{attrs:{href:"javascript:void(0)"},props:{className:"bx-calendar-left-arrow"},events:{click:BX.proxy(this._prev,this)}}),BX.create("SPAN",{props:{className:"bx-calendar-header-content"},children:[this.PARTS.MONTH=BX.create("A",{attrs:{href:"javascript:void(0)"},props:{className:"bx-calendar-top-month"},events:{click:BX.proxy(this._menu_month,this)}}),this.PARTS.YEAR=BX.create("A",{attrs:{href:"javascript:void(0)"},props:{className:"bx-calendar-top-year"},events:{click:BX.proxy(this._menu_year,this)}})]}),BX.create("A",{attrs:{href:"javascript:void(0)"},props:{className:"bx-calendar-right-arrow"},events:{click:BX.proxy(this._next,this)}})]}),this.PARTS.WEEK=BX.create("DIV",{props:{className:"bx-calendar-name-day-wrap"}}),this.PARTS.LAYERS=BX.create("DIV",{props:{className:"bx-calendar-cell-block"},events:{click:BX.delegateEvent({className:"bx-calendar-cell"},e),dblclick:BX.delegateEvent({className:"bx-calendar-cell"},e)}}),this.PARTS.TIME=BX.create("DIV",{props:{className:"bx-calendar-set-time-wrap"},events:{click:BX.delegateEvent({attr:"data-action"},BX.delegate(this._time_actions,this))},html:'<a href="javascript:void(0)" data-action="time_show" class="bx-calendar-set-time"><i></i>'+BX.message("CAL_TIME_SET")+'</a><div class="bx-calendar-form-block"><span class="bx-calendar-form-text">'+BX.message("CAL_TIME")+'</span><span class="bx-calendar-form"><input type="text" class="bx-calendar-form-input" maxwidth="2" onkeyup="BX.calendar.get()._check_time()" /><span class="bx-calendar-form-separator"></span><input type="text" class="bx-calendar-form-input" maxwidth="2" onkeyup="BX.calendar.get()._check_time()" />'+(this.bAmPm?'<span class="bx-calendar-AM-PM-block"><span class="bx-calendar-AM-PM-text" data-action="time_ampm"></span><span class="bx-calendar-form-arrow-r"><a href="javascript:void(0)" class="bx-calendar-form-arrow-top" data-action="time_ampm_up"><i></i></a><a href="javascript:void(0)" class="bx-calendar-form-arrow-bottom" data-action="time_ampm_down"><i></i></a></span></span>':"")+'</span><a href="javascript:void(0)" data-action="time_hide" class="bx-calendar-form-close"><i></i></a></div>'}),BX.create("DIV",{props:{className:"bx-calendar-button-block"},events:{click:BX.delegateEvent({attr:"data-action"},BX.delegate(this._button_actions,this))},html:'<a href="javascript:void(0)" class="bx-calendar-button bx-calendar-button-select" data-action="submit"><span class="bx-calendar-button-left"></span><span class="bx-calendar-button-text">'+BX.message("CAL_BUTTON")+'</span><span class="bx-calendar-button-right"></span></a><a href="javascript:void(0)" class="bx-calendar-button bx-calendar-button-cancel" data-action="cancel"><span class="bx-calendar-button-left"></span><span class="bx-calendar-button-text">'+BX.message("JS_CORE_WINDOW_CLOSE")+'</span><span class="bx-calendar-button-right"></span></a>'})]});this.PARTS.TIME_INPUT_H=BX.findChild(this.PARTS.TIME,{tag:"INPUT"},true);this.PARTS.TIME_INPUT_M=this.PARTS.TIME_INPUT_H.nextSibling.nextSibling;if(this.bAmPm)this.PARTS.TIME_AMPM=this.PARTS.TIME_INPUT_M.nextSibling.firstChild;var t=new BX.JCSpinner({input:this.PARTS.TIME_INPUT_H,callback_change:BX.proxy(this._check_time,this),bSaveValue:false}).Show();t.className="bx-calendar-form-arrow-l";this.PARTS.TIME_INPUT_H.parentNode.insertBefore(t,this.PARTS.TIME_INPUT_H);t=new BX.JCSpinner({input:this.PARTS.TIME_INPUT_M,callback_change:BX.proxy(this._check_time,this),bSaveValue:true}).Show();t.className="bx-calendar-form-arrow-r";if(!this.PARTS.TIME_INPUT_M.nextSibling)this.PARTS.TIME_INPUT_M.parentNode.appendChild(t);else this.PARTS.TIME_INPUT_M.parentNode.insertBefore(t,this.PARTS.TIME_INPUT_M.nextSibling);for(var a=0;a<7;a++){this.PARTS.WEEK.appendChild(BX.create("SPAN",{props:{className:"bx-calendar-name-day"},text:BX.message("DOW_"+(a+this.weekStart)%7)}))}return this.DIV};this._time_actions=function(){switch(BX.proxy_context.getAttribute("data-action")){case"time_show":BX.addClass(this.PARTS.TIME,"bx-calendar-set-time-opened");this.popup.adjustPosition();break;case"time_hide":BX.removeClass(this.PARTS.TIME,"bx-calendar-set-time-opened");this.popup.adjustPosition();break;case"time_ampm":this.PARTS.TIME_AMPM.innerHTML=this.PARTS.TIME_AMPM.innerHTML=="AM"?"PM":"AM";break;case"time_ampm_up":this._check_time({bSaveValue:false},null,12);return;break;case"time_ampm_down":this._check_time({bSaveValue:false},null,-12);return;break}this._check_time()};this._button_actions=function(){switch(BX.proxy_context.getAttribute("data-action")){case"submit":this.SaveValue();break;case"cancel":this.Close();break}};this._check_time=function(e,t,a){var i=parseInt(this.PARTS.TIME_INPUT_H.value.substring(0,5),10)||0,s=parseInt(this.PARTS.TIME_INPUT_M.value.substring(0,5),10)||0,r=false;if(!!e&&!e.bSaveValue){this.value.setUTCHours(this.value.getUTCHours()+a)}else if(!isNaN(i)){if(this.bAmPm){if(i!=12&&this.PARTS.TIME_AMPM.innerHTML=="PM"){i+=12}}r=true;this.value.setUTCHours(i%24)}if(!isNaN(s)){r=true;this.value.setUTCMinutes(s%60)}if(r){this.SetValue(this.value)}};this._set_layer=function(){var e=parseInt(this.value.getUTCFullYear()+""+BX.util.str_pad_left(this.value.getUTCMonth()+"",2,"0"));if(!this._layers[e]){this._layers[e]=this._create_layer();this._layers[e].BXLAYERID=e}if(this._current_layer){var t=new Date(this.value.valueOf());t.setUTCHours(0);t.setUTCMinutes(0);var a=BX.findChild(this._layers[e],{tag:"A",className:"bx-calendar-active"},true),i=BX.findChild(this._layers[e],{tag:"A",attr:{"data-date":t.valueOf()+""}},true);if(a){BX.removeClass(a,"bx-calendar-active")}if(i){BX.addClass(i,"bx-calendar-active")}this._replace_layer(this._current_layer,this._layers[e])}else{this.PARTS.LAYERS.appendChild(this._layers[e])}this._current_layer=this._layers[e]};this._replace_layer=function(e,t){if(e!=t){if(!BX.browser.IsIE()||BX.browser.IsDoctype()){var a=e.BXLAYERID>t.BXLAYERID?1:-1;var i=0;var s=-a*e.offsetHeight;e.style.position="relative";e.style.top="0px";e.style.zIndex=5;t.style.position="absolute";t.style.top=s+"px";t.style.zIndex=6;this.PARTS.LAYERS.appendChild(t);var r=15;var n;(n=function(){s+=a*r;i+=a*r;if(a*s<0){e.style.top=i+"px";t.style.top=s+"px";setTimeout(n,10)}else{e.parentNode.removeChild(e);t.style.top="0px";t.style.position="static";t.style.zIndex=0}})()}else{this.PARTS.LAYERS.replaceChild(t,e)}}};this._create_layer=function(){var e=BX.create("DIV",{props:{className:"bx-calendar-layer"}});var t=new Date(this.value);t.setUTCHours(0);t.setUTCMinutes(0);t.setUTCDate(1);if(t.getUTCDay()!=this.weekStart){var a=t.getUTCDay()-this.weekStart;a+=a<0?7:0;t.setUTCDate(t.getUTCDate()-a)}var i=this.value.getUTCMonth(),s=this.value.getUTCDate(),r="";for(var n=0;n<this.numRows;n++){r+='<div class="bx-calendar-range'+(n==this.numRows-1?" bx-calendar-range-noline":"")+'">';for(var o=0;o<7;o++){a=t.getUTCDate();var l=t.getUTCDay();var u="bx-calendar-cell";if(i!=t.getUTCMonth())u+=" bx-calendar-date-hidden";else if(s==a)u+=" bx-calendar-active";if(l==0||l==6)u+=" bx-calendar-weekend";r+='<a href="javascript:void(0)" class="'+u+'" data-date="'+t.valueOf()+'">'+a+"</a>";t.setUTCDate(t.getUTCDate()+1)}r+="</div>"}e.innerHTML=r;return e};this._prev=function(){this.SetMonth(this.value.getUTCMonth()-1)};this._next=function(){this.SetMonth(this.value.getUTCMonth()+1)};this._menu_month_content=function(){var e="",t=this.value.getMonth(),a;for(a=0;a<12;a++){e+='<a href="javascript:void(0)" class="bx-calendar-month'+(a==t?" bx-calendar-month-active":"")+'" onclick="BX.calendar.get().SetMonth('+a+')">'+BX.message("MONTH_"+(a+1))+"</a>"}return'<div class="bx-calendar-month-popup"><div class="bx-calendar-month-title" onclick="BX.calendar.get().popup_month.close();">'+BX.message("MONTH_"+(this.value.getUTCMonth()+1))+'</div><div class="bx-calendar-month-content">'+e+"</div></div>"};this._menu_month=function(){if(!this.popup_month){this.popup_month=new BX.PopupWindow("calendar_popup_month_"+this.control_id,this.PARTS.MONTH,{content:this._menu_month_content(),zIndex:3001,closeByEsc:true,autoHide:true,offsetTop:-29,offsetLeft:-1,events:{onPopupShow:BX.delegate(function(){if(this.popup_year){this.popup_year.close()}},this)}});this.popup_month.BXMONTH=this.value.getUTCMonth()}else if(this.popup_month.BXMONTH!=this.value.getUTCMonth()){this.popup_month.setContent(this._menu_month_content());this.popup_month.BXMONTH=this.value.getUTCMonth()}this.popup_month.show()};this._menu_year_content=function(){var e='<div class="bx-calendar-year-popup"><div class="bx-calendar-year-title" onclick="BX.calendar.get().popup_year.close();">'+this.value.getUTCFullYear()+'</div><div class="bx-calendar-year-content" id="bx-calendar-year-content">';for(var t=-3;t<=3;t++){e+='<a href="javascript:void(0)" class="bx-calendar-year-number'+(t==0?" bx-calendar-year-active":"")+'" onclick="BX.calendar.get().SetYear('+(this.value.getUTCFullYear()-t)+')">'+(this.value.getUTCFullYear()-t)+"</a>"}e+='</div><input type="text" class="bx-calendar-year-input" onkeyup="if(this.value>=1900&&this.value<=2100)BX.calendar.get().SetYear(this.value);" maxlength="4" /></div>';return e};this._menu_year=function(){if(!this.popup_year){this.popup_year=new BX.PopupWindow("calendar_popup_year_"+this.control_id,this.PARTS.YEAR,{content:this._menu_year_content(),zIndex:3001,closeByEsc:true,autoHide:true,offsetTop:-29,offsetLeft:-1,events:{onPopupShow:BX.delegate(function(){if(this.popup_month){this.popup_month.close()}},this)}});this.popup_year.BXYEAR=this.value.getUTCFullYear()}else if(this.popup_year.BXYEAR!=this.value.getUTCFullYear()){this.popup_year.setContent(this._menu_year_content());this.popup_year.BXYEAR=this.value.getUTCFullYear()}this.popup_year.show()};this._check_date=function(e){var t=e;if(BX.type.isString(e)){t=BX.parseDate(e,true)}if(!BX.type.isDate(t)||isNaN(t.valueOf())){t=BX.date.convertToUTC(new Date);if(this.params.bHideTime){t.setUTCHours(0);t.setUTCMinutes(0)}}t.setUTCMilliseconds(0);t.setUTCSeconds(0);t.BXCHECKED=true;return t}};BX.JCCalendar.prototype.Show=function(e){if(!BX.isReady){BX.ready(BX.delegate(function(){this.Show(e)},this));return}e.node=e.node||document.body;if(BX.type.isNotEmptyString(e.node)){var t=BX(e.node);if(!t){t=document.getElementsByName(e.node);if(t&&t.length>0){t=t[0]}}e.node=t}if(!e.node)return;if(!!e.field){if(BX.type.isString(e.field)){t=BX(e.field);if(!!t){e.field=t}else{if(e.form){if(BX.type.isString(e.form)){e.form=document.forms[e.form]}}if(BX.type.isDomNode(e.form)&&!!e.form[e.field]){e.field=e.form[e.field]}else{t=document.getElementsByName(e.field);if(t&&t.length>0){t=t[0];e.field=t}}}if(BX.type.isString(e.field)){e.field=BX(e.field)}}}var a=!this.popup||!this.popup.isShown()||this.params.node!=e.node;this.params=e;this.params.bTime=typeof this.params.bTime=="undefined"?true:!!this.params.bTime;this.params.bHideTime=typeof this.params.bHideTime=="undefined"?true:!!this.params.bHideTime;this.weekStart=parseInt(this.params.weekStart||this.params.weekStart||BX.message("WEEK_START"));if(isNaN(this.weekStart))this.weekStart=1;if(!this.popup){this._create(this.params)}else{this.popup.setBindElement(this.params.node)}var i=!!this.params.bHideTime;if(this.params.value){this.SetValue(this.params.value);i=this.value.getUTCHours()<=0&&this.value.getUTCMinutes()<=0}else if(this.params.field){this.SetValue(this.params.field.value);i=this.value.getUTCHours()<=0&&this.value.getUTCMinutes()<=0}else if(!!this.params.currentTime){this.SetValue(this.params.currentTime)}else{this.SetValue()}if(!!this.params.bTime)BX.removeClass(this.DIV,"bx-calendar-time-disabled");else BX.addClass(this.DIV,"bx-calendar-time-disabled");if(!!i)BX.removeClass(this.PARTS.TIME,"bx-calendar-set-time-opened");else BX.addClass(this.PARTS.TIME,"bx-calendar-set-time-opened");if(a){this._auto_hide_disable();this.popup.show();setTimeout(BX.proxy(this._auto_hide_enable,this),0)}this.params.bSetFocus=typeof this.params.bSetFocus=="undefined"?true:!!this.params.bSetFocus;if(this.params.bSetFocus)e.node.blur();return this};BX.JCCalendar.prototype.SetDay=function(e){this.value.setUTCDate(e);return this.SetValue(this.value)};BX.JCCalendar.prototype.SetMonth=function(e){if(this.popup_month)this.popup_month.close();this.value.setUTCMonth(e);if(e<0)e+=12;else if(e>=12)e-=12;while(this.value.getUTCMonth()>e){this.value.setUTCDate(this.value.getUTCDate()-1)}return this.SetValue(this.value)};BX.JCCalendar.prototype.SetYear=function(e){if(this.popup_year)this.popup_year.close();this.value.setUTCFullYear(e);return this.SetValue(this.value)};BX.JCCalendar.prototype.SetDate=function(e,t){e=this._check_date(e);e.setUTCHours(this.value.getUTCHours());e.setUTCMinutes(this.value.getUTCMinutes());e.setUTCSeconds(this.value.getUTCSeconds());if(this.params.bTime&&!t){return this.SetValue(e)}else{this.SetValue(e);this.SaveValue()}};BX.JCCalendar.prototype.SetValue=function(e){this.value=e&&e.BXCHECKED?e:this._check_date(e);this.PARTS.MONTH.innerHTML=BX.message("MONTH_"+(this.value.getUTCMonth()+1));this.PARTS.YEAR.innerHTML=this.value.getUTCFullYear();if(!!this.params.bTime){var t=this.value.getUTCHours();if(this.bAmPm){if(t>=12){this.PARTS.TIME_AMPM.innerHTML="PM";if(t!=12)t-=12}else{this.PARTS.TIME_AMPM.innerHTML="AM";if(t==0)t=12}}this.PARTS.TIME_INPUT_H.value=BX.util.str_pad_left(t.toString(),2,"0");this.PARTS.TIME_INPUT_M.value=BX.util.str_pad_left(this.value.getUTCMinutes().toString(),2,"0")}this._set_layer();return this};BX.JCCalendar.prototype.SaveValue=function(){if(this.popup_month)this.popup_month.close();if(this.popup_year)this.popup_year.close();var e=true;if(!!this.params.callback){var t=this.params.callback.apply(this,[new Date(this.value.valueOf()+this.value.getTimezoneOffset()*6e4)]);if(t===false)e=false}if(e){var a=!!this.params.bTime&&BX.hasClass(this.PARTS.TIME,"bx-calendar-set-time-opened");if(this.params.field){this.params.field.value=BX.calendar.ValueToString(this.value,a,true);BX.fireEvent(this.params.field,"change")}this.popup.close();if(!!this.params.callback_after){this.params.callback_after.apply(this,[new Date(this.value.valueOf()+this.value.getTimezoneOffset()*6e4),a])}}return this};BX.JCCalendar.prototype.Close=function(){if(!!this.popup)this.popup.close();return this};BX.JCSpinner=function(e){e=e||{};this.params={input:e.input||null,delta:e.delta||1,timeout_start:e.timeout_start||1e3,timeout_cont:e.timeout_cont||150,callback_start:e.callback_start||null,callback_change:e.callback_change||null,callback_finish:e.callback_finish||null,bSaveValue:typeof e.bSaveValue=="undefined"?!!e.input:!!e.bSaveValue};this.mousedown=false;this.direction=1};BX.JCSpinner.prototype.Show=function(){this.node=BX.create("span",{events:{mousedown:BX.delegateEvent({attr:"data-dir"},BX.delegate(this.Start,this))},html:'<a href="javascript:void(0)" class="bx-calendar-form-arrow bx-calendar-form-arrow-top" data-dir="1"><i></i></a><a href="javascript:void(0)" class="bx-calendar-form-arrow bx-calendar-form-arrow-bottom" data-dir="-1"><i></i></a>'});return this.node};BX.JCSpinner.prototype.Start=function(){this.mousedown=true;this.direction=BX.proxy_context.getAttribute("data-dir")>0?1:-1;BX.bind(document,"mouseup",BX.proxy(this.MouseUp,this));this.ChangeValue(true)};BX.JCSpinner.prototype.ChangeValue=function(e){if(!this.mousedown)return;if(this.params.input){var t=parseInt(this.params.input.value,10)+this.params.delta*this.direction;if(this.params.bSaveValue)this.params.input.value=t;if(!!e&&this.params.callback_start)this.params.callback_start(this.params,t,this.direction);if(this.params.callback_change)this.params.callback_change(this.params,t,this.direction);setTimeout(BX.proxy(this.ChangeValue,this),!!e?this.params.timeout_start:this.params.timeout_cont)}};BX.JCSpinner.prototype.MouseUp=function(){this.mousedown=false;BX.unbind(document,"mouseup",BX.proxy(this.MouseUp,this));if(this.params.callback_finish)this.params.callback_finish(this.params,this.params.input.value)};window.jsCalendar={Show:function(e,t,a,i,s,r,n,o){return BX.calendar({node:e,field:t,form:n,bTime:!!s,currentTime:r,bHideTimebar:!!o})},ValueToString:BX.calendar.ValueToString};BX.CClockSelector=function(e){this.params=e;this.params.popup_buttons=this.params.popup_buttons||[new BX.PopupWindowButton({text:BX.message("CAL_BUTTON"),className:"popup-window-button-create",events:{click:BX.proxy(this.setValue,this)}})];this.isReady=false;this.WND=new BX.PopupWindow(this.params.popup_id||"clock_selector_popup",this.params.node,this.params.popup_config||{
titleBar:BX.message("CAL_TIME"),offsetLeft:-45,offsetTop:-135,autoHide:true,closeIcon:true,closeByEsc:true,zIndex:this.params.zIndex});this.SHOW=false;BX.addCustomEvent(this.WND,"onPopupClose",BX.delegate(this.onPopupClose,this));this.obClocks={};this.CLOCK_ID=this.params.clock_id||"clock_selector"};BX.CClockSelector.prototype.Show=function(){if(!this.isReady){BX.addCustomEvent("onClockRegister",BX.proxy(this.onClockRegister,this));return BX.ajax.get("/bitrix/tools/clock_selector.php",{start_time:this.params.start_time,clock_id:this.CLOCK_ID,sessid:BX.bitrix_sessid()},BX.delegate(this.Ready,this))}this.WND.setButtons(this.params.popup_buttons);this.WND.show();this.SHOW=true;if(window["bxClock_"+this.obClocks[this.CLOCK_ID]]){setTimeout("window['bxClock_"+this.obClocks[this.CLOCK_ID]+"'].CalculateCoordinates()",40)}return true};BX.CClockSelector.prototype.onClockRegister=function(e){if(e[this.CLOCK_ID]){this.obClocks[this.CLOCK_ID]=e[this.CLOCK_ID];BX.removeCustomEvent("onClockRegister",BX.proxy(this.onClockRegister,this))}};BX.CClockSelector.prototype.Ready=function(e){this.content=this.CreateContent(e);this.WND.setContent(this.content);this.isReady=true;setTimeout(BX.proxy(this.Show,this),30)};BX.CClockSelector.prototype.CreateContent=function(e){return BX.create("DIV",{events:{click:BX.PreventDefault},html:'<div class="bx-tm-popup-clock">'+e+"</div>"})};BX.CClockSelector.prototype.setValue=function(e){if(this.params.callback){var t=BX.findChild(this.content,{tagName:"INPUT"},true);this.params.callback.apply(this.params.node,[t.value])}return BX.PreventDefault(e)};BX.CClockSelector.prototype.closeWnd=function(e){this.WND.close();return e||window.event?BX.PreventDefault(e):true};BX.CClockSelector.prototype.setNode=function(e){this.WND.setBindElement(e)};BX.CClockSelector.prototype.setTime=function(e){this.params.start_time=e;if(window["bxClock_"+this.obClocks[this.CLOCK_ID]]){window["bxClock_"+this.obClocks[this.CLOCK_ID]].SetTime(parseInt(e/3600),parseInt(e%3600/60))}};BX.CClockSelector.prototype.setCallback=function(e){this.params.callback=e};BX.CClockSelector.prototype.onPopupClose=function(){this.SHOW=false}})();
/* End */
;
; /* Start:"a:4:{s:4:"full";s:44:"/bitrix/js/main/utils.min.js?148050392919858";s:6:"source";s:24:"/bitrix/js/main/utils.js";s:3:"min";s:28:"/bitrix/js/main/utils.min.js";s:3:"map";s:28:"/bitrix/js/main/utils.map.js";}"*/
var phpVars;if(!phpVars){phpVars={ADMIN_THEME_ID:".default",LANGUAGE_ID:"en",FORMAT_DATE:"DD.MM.YYYY",FORMAT_DATETIME:"DD.MM.YYYY HH:MI:SS",opt_context_ctrl:false,cookiePrefix:"BITRIX_SM",titlePrefix:"",bitrix_sessid:"",messHideMenu:"",messShowMenu:"",messHideButtons:"",messShowButtons:"",messFilterInactive:"",messFilterActive:"",messFilterLess:"",messLoading:"Loading...",messMenuLoading:"",messMenuLoadingTitle:"",messNoData:"",messExpandTabs:"",messCollapseTabs:"",messPanelFixOn:"",messPanelFixOff:"",messPanelCollapse:"",messPanelExpand:""}}var jsUtils={arEvents:Array(),addEvent:function(e,t,n,i){if(e.attachEvent)e.attachEvent("on"+t,n);else if(e.addEventListener)e.addEventListener(t,n,false);else e["on"+t]=n;this.arEvents[this.arEvents.length]={element:e,event:t,fn:n}},removeEvent:function(e,t,n){if(e.detachEvent)e.detachEvent("on"+t,n);else if(e.removeEventListener)e.removeEventListener(t,n,false);else e["on"+t]=null},removeAllEvents:function(e){var t;for(t=0;t<this.arEvents.length;t++){if(this.arEvents[t]&&(e==false||e==this.arEvents[t].element)){jsUtils.removeEvent(this.arEvents[t].element,this.arEvents[t].event,this.arEvents[t].fn);this.arEvents[t]=null}}if(e==false)this.arEvents.length=0},IsDoctype:function(){if(document.compatMode)return document.compatMode=="CSS1Compat";if(document.documentElement&&document.documentElement.clientHeight)return true;return false},GetRealPos:function(e){if(window.BX)return BX.pos(e);if(!e||!e.offsetParent)return false;var t=Array();t["left"]=e.offsetLeft;t["top"]=e.offsetTop;var n=e.offsetParent;while(n&&n.tagName!="BODY"){t["left"]+=n.offsetLeft;t["top"]+=n.offsetTop;n=n.offsetParent}t["right"]=t["left"]+e.offsetWidth;t["bottom"]=t["top"]+e.offsetHeight;return t},FindChildObject:function(e,t,n,i){if(!e)return null;var o=t.toUpperCase();var s=n?n.toLowerCase():null;var r=e.childNodes.length;for(var l=0;l<r;l++){var a=e.childNodes[l];if(a.tagName&&a.tagName.toUpperCase()==o)if(!n||a.className.toLowerCase()==s)return a;if(i==true){var d;if(d=jsUtils.FindChildObject(a,t,n,true))return d}}return null},FindParentObject:function(e,t,n){if(!e)return null;var i=e;var o=t.toUpperCase();var s=n?n.toLowerCase():null;while(i.parentNode){var r=i.parentNode;if(r.tagName&&r.tagName.toUpperCase()==o)if(!n||r.className.toLowerCase()==s)return r;i=r}return null},FindNextSibling:function(e,t){if(!e)return null;var n=e;var i=t.toUpperCase();while(n.nextSibling){var o=n.nextSibling;if(o.tagName&&o.tagName.toUpperCase()==i)return o;n=o}return null},FindPreviousSibling:function(e,t){if(!e)return null;var n=e;var i=t.toUpperCase();while(n.previousSibling){var o=n.previousSibling;if(o.tagName&&o.tagName.toUpperCase()==i)return o;n=o}return null},bOpera:navigator.userAgent.toLowerCase().indexOf("opera")!=-1,bIsIE:document.attachEvent&&navigator.userAgent.toLowerCase().indexOf("opera")==-1,IsIE:function(){return this.bIsIE},IsOpera:function(){return this.bOpera},IsSafari:function(){var e=navigator.userAgent.toLowerCase();return/webkit/.test(e)},IsEditor:function(){var e=navigator.userAgent.toLowerCase();var t=(e.match(/.+(msie)[\/: ]([\d.]+)/)||[])[2];var n=/webkit/.test(e);if(this.IsOpera()||document.all&&!document.compatMode&&t<6||n)return false;return true},ToggleDiv:function(e){var t=document.getElementById(e).style;if(t.display!="none")t.display="none";else t.display="block";return t.display!="none"},urlencode:function(e){return escape(e).replace(new RegExp("\\+","g"),"%2B")},OpenWindow:function(e,t,n){var i=screen.width,o=screen.height;if(this.IsOpera()){i=document.body.offsetWidth;o=document.body.offsetHeight}window.open(e,"","status=no,scrollbars=yes,resizable=yes,width="+t+",height="+n+",top="+Math.floor((o-n)/2-14)+",left="+Math.floor((i-t)/2-5))},SetPageTitle:function(e){document.title=phpVars.titlePrefix+e;var t=document.getElementsByTagName("H1");if(t)t[0].innerHTML=e},LoadPageToDiv:function(e,t){var n=document.getElementById(t);if(!n)return;CHttpRequest.Action=function(e){CloseWaitWindow();document.getElementById(t).innerHTML=e};ShowWaitWindow();CHttpRequest.Send(e)},trim:function(e){if(typeof e=="string"||typeof e=="object"&&e.constructor==String){var t,n;n=/^[\s\r\n]+/g;t=e.replace(n,"");n=/[\s\r\n]+$/g;t=t.replace(n,"");return t}else return e},Redirect:function(e,t){var n=null,i=false;if(e&&e.length>0)n=e[0];if(!n)n=window.event;if(n)i=n.shiftKey;if(i)window.open(t);else{window.location.href=t}},False:function(){return false},AlignToPos:function(e,t,n){var i=e["left"],o=e["bottom"];var s=jsUtils.GetWindowScrollPos();var r=jsUtils.GetWindowInnerSize();if(r.innerWidth+s.scrollLeft-(e["left"]+t)<0){if(e["right"]-t>=0)i=e["right"]-t;else i=s.scrollLeft}if(r.innerHeight+s.scrollTop-(e["bottom"]+n)<0){if(e["top"]-n>=0)o=e["top"]-n;else o=s.scrollTop}return{left:i,top:o}},EvalGlobal:function(e){try{if(window.execScript)window.execScript(e,"javascript");else if(jsUtils.IsSafari())window.setTimeout(e,0);else window.eval(e)}catch(t){}},GetStyleValue:function(e,t){var n;if(e.currentStyle)n=e.currentStyle[t];else if(window.getComputedStyle)n=document.defaultView.getComputedStyle(e,null).getPropertyValue(t);if(!n)n="";return n},GetWindowInnerSize:function(e){var t,n;if(!e)e=document;if(self.innerHeight){t=self.innerWidth;n=self.innerHeight}else if(e.documentElement&&(e.documentElement.clientHeight||e.documentElement.clientWidth)){t=e.documentElement.clientWidth;n=e.documentElement.clientHeight}else if(e.body){t=e.body.clientWidth;n=e.body.clientHeight}return{innerWidth:t,innerHeight:n}},GetWindowScrollPos:function(e){var t,n;if(!e)e=document;if(self.pageYOffset){t=self.pageXOffset;n=self.pageYOffset}else if(e.documentElement&&(e.documentElement.scrollTop||e.documentElement.scrollLeft)){t=document.documentElement.scrollLeft;n=document.documentElement.scrollTop}else if(e.body){t=e.body.scrollLeft;n=e.body.scrollTop}return{scrollLeft:t,scrollTop:n}},GetWindowScrollSize:function(e){var t,n;if(!e)e=document;if(e.compatMode&&e.compatMode=="CSS1Compat"){t=e.documentElement.scrollWidth;n=e.documentElement.scrollHeight}else{if(e.body.scrollHeight>e.body.offsetHeight)n=e.body.scrollHeight;else n=e.body.offsetHeight;if(e.body.scrollWidth>e.body.offsetWidth||e.compatMode&&e.compatMode=="BackCompat"||e.documentElement&&!e.documentElement.clientWidth)t=e.body.scrollWidth;else t=e.body.offsetWidth}return{scrollWidth:t,scrollHeight:n}},GetWindowSize:function(){var e=jsUtils.GetWindowInnerSize();var t=jsUtils.GetWindowScrollPos();var n=jsUtils.GetWindowScrollSize();return{innerWidth:e.innerWidth,innerHeight:e.innerHeight,scrollLeft:t.scrollLeft,scrollTop:t.scrollTop,scrollWidth:n.scrollWidth,scrollHeight:n.scrollHeight}},arCustomEvents:{},addCustomEvent:function(e,t,n,i){if(!this.arCustomEvents[e])this.arCustomEvents[e]=[];if(!n)n=[];if(!i)i=false;this.arCustomEvents[e].push({handler:t,arParams:n,obj:i})},removeCustomEvent:function(e,t){if(!this.arCustomEvents[e])return;var n=this.arCustomEvents[e].length;if(n==1){delete this.arCustomEvents[e];return}for(var i=0;i<n;i++){if(!this.arCustomEvents[e][i])continue;if(this.arCustomEvents[e][i].handler==t){delete this.arCustomEvents[e][i];return}}},onCustomEvent:function(e,t){if(!this.arCustomEvents[e])return;if(!t)t=[];var n;for(var i=0,o=this.arCustomEvents[e].length;i<o;i++){n=this.arCustomEvents[e][i];if(!n||!n.handler)continue;if(n.obj)n.handler.call(n.obj,n.arParams,t);else n.handler(n.arParams,t)}},loadJSFile:function(e,t,n){if(!n)n=document;if(typeof e=="string")e=[e];var i=function(){if(!t)return;if(typeof t=="function")return t();if(typeof t!="object"||!t.func)return;var e=t.params||{};if(t.obj)t.func.apply(t.obj,e);else t.func(e)};var o=function(t){if(t>=e.length)return i();var s=n.body.appendChild(n.createElement("script"));s.src=e[t];var r=false;s.onload=s.onreadystatechange=function(){if(!r&&(!s.readyState||s.readyState=="loaded"||s.readyState=="complete")){r=true;setTimeout(function(){o(++t)},50)}}};o(0)},loadCSSFile:function(e,t,n){if(typeof e=="string"){var i=true;e=[e]}var o,s=e.length,r=[];if(s==0)return;if(!t)t=document;if(!n)n=window;if(!n.bxhead){var l=t.getElementsByTagName("HEAD");n.bxhead=l[0]}if(!n.bxhead)return;for(o=0;o<s;o++){var a=document.createElement("LINK");a.href=e[o];a.rel="stylesheet";a.type="text/css";n.bxhead.appendChild(a);r.push(a)}if(i)return a;return r},appendBXHint:function(e,t){if(!e||!e.parentNode||!t)return;var n=new BXHint(t);e.parentNode.insertBefore(n.oIcon,e);e.parentNode.removeChild(e);n.oIcon.style.marginLeft="5px"},PreventDefault:function(e){if(!e)e=window.event;if(e.stopPropagation){e.preventDefault();e.stopPropagation()}else{e.cancelBubble=true;e.returnValue=false}return false},CreateElement:function(e,t,n,i){if(!i)i=document;var o=i.createElement(e),s;if(t){for(s in t){if(s=="className"||s=="class"){o.setAttribute("class",t[s]);if(jsUtils.IsIE())o.setAttribute("className",t[s]);continue}if(t[s]!=undefined&&t[s]!=null)o.setAttribute(s,t[s])}}if(n){for(s in n)o.style[s]=n[s]}return o},in_array:function(e,t){for(var n=0;n<t.length;n++){if(t[n]==e)return true}return false},htmlspecialchars:function(e){if(!e.replace)return e;return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}};function JCFloatDiv(){var e=this;this.floatDiv=null;this.x=this.y=0;this.Create=function(e){var t=document.body.appendChild(document.createElement("DIV"));t.id=e.id;t.style.position="absolute";t.style.left="-10000px";t.style.top="-10000px";if(e.className)t.className=e.className;if(e.zIndex)t.style.zIndex=e.zIndex;if(e.width)t.style.width=e.width+"px";if(e.height)t.style.height=e.height+"px";return t};this.Show=function(e,t,n,i,o,s){if(s!==false)s=true;var r=parseInt(e.style.zIndex);if(r<=0||isNaN(r))r=100;e.style.zIndex=r;if(t<0)t=0;if(n<0)n=0;e.style.left=parseInt(t)+"px";e.style.top=parseInt(n)+"px";if(jsUtils.IsIE()&&s===true){var l=document.getElementById(e.id+"_frame");if(!l){l=document.createElement("IFRAME");l.src="javascript:''";l.id=e.id+"_frame";l.style.position="absolute";l.style.borderWidth="0px";l.style.zIndex=r-1;document.body.appendChild(l)}l.style.width=e.offsetWidth+"px";l.style.height=e.offsetHeight+"px";l.style.left=e.style.left;l.style.top=e.style.top;l.style.visibility="visible"}e.restrictDrag=o||false;if(isNaN(i))i=5;if(i>0){var a=document.getElementById(e.id+"_shadow");if(!a){if(jsUtils.IsIE()){a=document.createElement("DIV");a.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='/bitrix/themes/"+phpVars.ADMIN_THEME_ID+"/images/shadow.png',sizingMethod='scale')"}else{a=document.createElement("IMG");a.src="/bitrix/themes/"+phpVars.ADMIN_THEME_ID+"/images/shadow.png"}a.id=e.id+"_shadow";a.style.position="absolute";a.style.zIndex=r-2;a.style.left="-1000px";a.style.top="-1000px";a.style.lineHeight="normal";a.className="bx-js-float-shadow";document.body.appendChild(a)}a.style.width=e.offsetWidth+"px";a.style.height=e.offsetHeight+"px";a.style.left=parseInt(e.style.left)+i+"px";a.style.top=parseInt(e.style.top)+i+"px";a.style.visibility="visible"}e.dxShadow=i};this.Close=function(e){if(!e)return;var t=document.getElementById(e.id+"_shadow");if(t)t.style.visibility="hidden";var n=document.getElementById(e.id+"_frame");if(n)n.style.visibility="hidden"};this.Move=function(e,t,n){if(!e)return;var i=e.dxShadow;var o=parseInt(e.style.left)+t;var s=parseInt(e.style.top)+n;if(e.restrictDrag){if(o<0)o=0;if(document.compatMode&&document.compatMode=="CSS1Compat")windowWidth=document.documentElement.scrollWidth;else{if(document.body.scrollWidth>document.body.offsetWidth||document.compatMode&&document.compatMode=="BackCompat"||document.documentElement&&!document.documentElement.clientWidth)windowWidth=document.body.scrollWidth;else windowWidth=document.body.offsetWidth}var r=e.offsetWidth;if(o>windowWidth-r-i)o=windowWidth-r-i;if(s<0)s=0}e.style.left=o+"px";e.style.top=s+"px";this.AdjustShadow(e)};this.HideShadow=function(e){var t=document.getElementById(e.id+"_shadow");t.style.visibility="hidden"};this.UnhideShadow=function(e){var t=document.getElementById(e.id+"_shadow");t.style.visibility="visible"};this.AdjustShadow=function(e){var t=document.getElementById(e.id+"_shadow");if(t&&t.style.visibility!="hidden"){var n=e.dxShadow;t.style.width=e.offsetWidth+"px";t.style.height=e.offsetHeight+"px";t.style.left=parseInt(e.style.left)+n+"px";t.style.top=parseInt(e.style.top)+n+"px"}var i=document.getElementById(e.id+"_frame");if(i){i.style.width=e.offsetWidth+"px";i.style.height=e.offsetHeight+"px";i.style.left=e.style.left;i.style.top=e.style.top}};this.StartDrag=function(t,n){if(!t)t=window.event;this.x=t.clientX+document.body.scrollLeft;this.y=t.clientY+document.body.scrollTop;this.floatDiv=n;jsUtils.addEvent(document,"mousemove",this.MoveDrag);document.onmouseup=this.StopDrag;if(document.body.setCapture)document.body.setCapture();document.onmousedown=jsUtils.False;var i=document.body;i.ondrag=jsUtils.False;i.onselectstart=jsUtils.False;i.style.MozUserSelect=e.floatDiv.style.MozUserSelect="none";i.style.cursor="move"};this.StopDrag=function(t){if(document.body.releaseCapture)document.body.releaseCapture();jsUtils.removeEvent(document,"mousemove",e.MoveDrag);document.onmouseup=null;this.floatDiv=null;document.onmousedown=null;var n=document.body;n.ondrag=null;n.onselectstart=null;n.style.MozUserSelect=e.floatDiv.style.MozUserSelect="";n.style.cursor=""};this.MoveDrag=function(t){var n=t.clientX+document.body.scrollLeft;var i=t.clientY+document.body.scrollTop;if(e.x==n&&e.y==i)return;e.Move(e.floatDiv,n-e.x,i-e.y);e.x=n;e.y=i}}var jsFloatDiv=new JCFloatDiv;var BXHint=function(e,t,n){this.oDivOver=false;this.timeOutID=null;this.oIcon=null;this.freeze=false;this.x=0;this.y=0;this.time=700;if(!e)e="";this.Create(e,t,n)};BXHint.prototype.Create=function(e,t,n){var i=this,o=0,s=0,r=null,l="icon";this.bWidth=true;if(n){if(n.width===false)this.bWidth=false;else if(n.width)o=n.width;if(n.height)s=n.height;if(n.className)r=n.className;if(n.type&&(n.type=="link"||n.type=="icon"))l=n.type;if(n.time>0)this.time=n.time}if(t)l="element";if(l=="icon"){var t=document.createElement("IMG");t.src=n&&n.iconSrc?n.iconSrc:"/bitrix/themes/"+phpVars.ADMIN_THEME_ID+"/public/popup/hint.gif";t.ondrag=jsUtils.False}else if(l=="link"){var t=document.createElement("A");t.href="";t.onclick=function(e){return false};t.innerHTML="[?]"}this.element=t;if(l=="element"){if(n&&n.show_on_click){jsUtils.addEvent(t,"click",function(t){if(!t)t=window.event;i.GetMouseXY(t);i.timeOutID=setTimeout(function(){i.Show(e,o,s,r)},10)})}else{jsUtils.addEvent(t,"mouseover",function(t){if(!t)t=window.event;i.GetMouseXY(t);i.timeOutID=setTimeout(function(){i.Show(e,o,s,r)},750)})}jsUtils.addEvent(t,"mouseout",function(e){if(i.timeOutID)clearTimeout(i.timeOutID);i.SmartHide(i)})}else{this.oIcon=t;t.onmouseover=function(t){if(!t)t=window.event;i.GetMouseXY(t);i.Show(e,o,s,r)};t.onmouseout=function(){i.SmartHide(i)}}};BXHint.prototype.IsFrozen=function(){return this.freeze};BXHint.prototype.Freeze=function(){this.freeze=true;this.Hide()};BXHint.prototype.UnFreeze=function(){this.freeze=false};BXHint.prototype.GetMouseXY=function(e){if(e.pageX||e.pageY){this.x=e.pageX;this.y=e.pageY}else if(e.clientX||e.clientY){this.x=e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft)-document.documentElement.clientLeft;this.y=e.clientY+(document.documentElement.scrollTop||document.body.scrollTop)-document.documentElement.clientTop}};BXHint.prototype.Show=function(e,t,n,i){var o=document.getElementById("__BXHint_div");if(o)this.Hide();if(this.freeze)return;var s=this;var r=document.body.appendChild(document.createElement("DIV"));r.onmouseover=function(){s.oDivOver=true};r.onmouseout=function(){s.oDivOver=false;s.SmartHide(s)};r.id="__BXHint_div";r.className=i?i:"bxhint";r.style.position="absolute";if(t&&this.bWidth)r.style.width=t+"px";if(n)r.style.height=n+"px";r.innerHTML=e;var l=r.offsetWidth;var a=r.offsetHeight;if(this.bWidth){if(!t&&l>200)l=Math.round(Math.sqrt(1.618*l*a));r.style.width=l+"px";a=r.offsetHeight}var d={left:this.x+10,right:this.x+l,top:this.y,bottom:this.y+a};d=this.AlignToPos(d,l,a);r.style.zIndex=2100;jsFloatDiv.Show(r,d.left,d.top,3);r=null};BXHint.prototype.AlignToPos=function(e,t,n){var i=document.body;if(i.clientWidth+i.scrollLeft<e.left+t)e.left=e.left-t>=0?e.left-t:i.scrollLeft;if(i.clientHeight+i.scrollTop-e["bottom"]<0)e.top=e.top-n>=0?e.top-n:i.scrollTop;return e};BXHint.prototype.Hide=function(){var e=document.getElementById("__BXHint_div");if(!e)return;jsFloatDiv.Close(e);e.parentNode.removeChild(e);e=null};BXHint.prototype.SmartHide=function(e){setTimeout(function(){if(!e.oDivOver)e.Hide()},100)};function WaitOnKeyPress(e){if(!e)e=window.event;if(!e)return;if(e.keyCode==27)CloseWaitWindow()}function ShowWaitWindow(){CloseWaitWindow();var e=jsUtils.GetWindowSize();var t=document.body.appendChild(document.createElement("DIV"));t.id="wait_window_div";t.innerHTML=phpVars.messLoading;t.className="waitwindow";t.style.right=5-e.scrollLeft+"px";t.style.top=e.scrollTop+5+"px";if(jsUtils.IsIE()){var n=document.createElement("IFRAME");n.src="javascript:''";n.id="wait_window_frame";n.className="waitwindow";n.style.width=t.offsetWidth+"px";n.style.height=t.offsetHeight+"px";n.style.right=t.style.right;n.style.top=t.style.top;document.body.appendChild(n)}jsUtils.addEvent(document,"keypress",WaitOnKeyPress)}function CloseWaitWindow(){jsUtils.removeEvent(document,"keypress",WaitOnKeyPress);var e=document.getElementById("wait_window_frame");if(e)e.parentNode.removeChild(e);var t=document.getElementById("wait_window_div");if(t)t.parentNode.removeChild(t)}var jsSelectUtils={addNewOption:function(e,t,n,i,o){var s=typeof e=="string"||e instanceof String?document.getElementById(e):e;if(s){var r=s.length;if(o!==false){for(var l=0;l<r;l++)if(s[l].value==t)return}var a=new Option(n,t,false,false);s.options[r]=a}if(i===true)this.sortSelect(e)},deleteOption:function(e,t){var n=typeof e=="string"||e instanceof String?document.getElementById(e):e;if(n){for(var i=0;i<n.length;i++)if(n[i].value==t){n.remove(i);break}}},deleteSelectedOptions:function(e){var t=typeof e=="string"||e instanceof String?document.getElementById(e):e;if(t){var n=0;while(n<t.length)if(t[n].selected){t[n].selected=false;t.remove(n)}else n++}},deleteAllOptions:function(e){if(e){for(var t=e.length-1;t>=0;t--)e.remove(t)}},optionCompare:function(e,t){var n=e.optText.toLowerCase();var i=t.optText.toLowerCase();if(n>i)return 1;if(n<i)return-1;return 0},sortSelect:function(e){var t=typeof e=="string"||e instanceof String?document.getElementById(e):e;if(t){var n=[];var i=t.options.length;for(var o=0;o<i;o++){n[o]={optText:t[o].text,optValue:t[o].value}}n.sort(this.optionCompare);t.length=0;i=n.length;for(var o=0;o<i;o++){var s=new Option(n[o].optText,n[o].optValue,false,false);t[o]=s}}},selectAllOptions:function(e){var t=typeof e=="string"||e instanceof String?document.getElementById(e):e;if(t){var n=t.length;for(var i=0;i<n;i++)t[i].selected=true}},selectOption:function(e,t){var n=typeof e=="string"||e instanceof String?document.getElementById(e):e;if(n){var i=n.length;for(var o=0;o<i;o++)n[o].selected=n[o].value==t}},addSelectedOptions:function(e,t,n,i){if(!e)return;var o=e.length;for(var s=0;s<o;s++)if(e[s].selected)this.addNewOption(t,e[s].value,e[s].text,i,n)},moveOptionsUp:function(e){if(!e)return;var t=e.length;for(var n=0;n<t;n++){if(e[n].selected&&n>0&&e[n-1].selected==false){var i=new Option(e[n].text,e[n].value);var o=new Option(e[n-1].text,e[n-1].value);e[n]=o;e[n].selected=false;e[n-1]=i;e[n-1].selected=true}}},moveOptionsDown:function(e){if(!e)return;var t=e.length;for(var n=t-1;n>=0;n--){if(e[n].selected&&n<t-1&&e[n+1].selected==false){var i=new Option(e[n].text,e[n].value);var o=new Option(e[n+1].text,e[n+1].value);e[n]=o;e[n].selected=false;e[n+1]=i;e[n+1].selected=true}}}};
/* End */
;
//# sourceMappingURL=kernel_main.map.js