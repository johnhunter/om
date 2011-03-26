/**
	om.js - some general dom sugar used when a framework is ovekill.
	Assumes support for DOM Selector API

	@author       John Hunter for johnhunter.info
	@version      1.0 (2011-03-26)
	Created       2011-03-19
	Licence       CC-BSD (2011) <http://creativecommons.org/licenses/BSD/>
	
	@dependency   none
	
	qAll(selector [,context])    returns an array of dom elements for the css selector
	qOne(selector [,context])    returns first dom element for the css selector
	qId(id)                      returns dom element for id
	qTag(name [,context])        returns an array of dom elements for the given tagname
	hasClass(el, name)           returns true if el has a class of name
	addClass(el, name)           adds class name to el
	removeClass(el, name)        removes class name from el
	toggleClass(el, name)        toggles class name on el and returns true if class added
	css(el, styles)              apply the styles object properties to el
	toArray(o)                   converts o to an array
	extend(target, source)       add source object properties to target, returning target
	
	Note: if you need futher functionality for iOS consider using http://xuijs.com
	
	TODO: add an each iterator
	TODO: allow some methods to take an array of elements.
	
**/
(function (doc, win) {
	
	var moduleName = 'om',
		undef,
		k = function(){},
		cons = win.console,
		ua = navigator.userAgent;
	
	
	win.isiPad = (/iPad/i.test(ua));
	win.isiPod = (/iPod/i.test(ua));
	win.isiPhone = (/iPhone/i.test(ua));
	
	if (!cons) cons = { log:k, warn:k, error:k };
	
	if (!doc.querySelectorAll || !doc.querySelector) {
		cons.error('Selector API is not supported by this browser.');
	}
	
	if (win[moduleName] !== undef) {
		moduleName = 'jhi_om';
		cons.warn('om already defined, fallback to ' + moduleName);
	}
	
	function qAll (selector, context) {
		context = context || doc;
		return toArray(context.querySelectorAll(selector));
	}
	
	function qOne (selector, context) {
		context = context || doc;
		return context.querySelector(selector);
	}
	
	function qId (id) {
		return doc.getElementById(id);
	}
	
	function qTag (name, context) {
		context = context || doc;
		return toArray(context.getElementsByTagName(name));
	}
	
	function hasClass (el, name) {
		return (el.className.indexOf(name) !== -1);
	}
	
	function addClass (el, name) {
		el.className += el.className ? ' ' + name : name;
	}
	
	function removeClass (el, name) {
		el.className = el.className.replace(RegExp('\\s+' + name), '');
	}
	
	function toggleClass (el, name) {
		var has = hasClass(el, name);
		if (has) removeClass(el, name);
		else addClass(el, name);
		return !has;
	}
	
	function css (el, styles) {
		extend(el.style, styles);
	}
	
	function extend (/*target, source[, sourceN]*/) {
		var i,
			source,
			args = toArray(arguments),
			target = args.shift();
		
		while (source = args.shift()) {
			for (i in source) {
				if (source.hasOwnProperty(i)) {
					target[i] = source[i];
				}
			}
		}
		return target;
	}
	
	function toArray (o) {
		var a = [], i = o.length;
		
		while (i--) {
			a[i] = o[i];
		}
		return a;
	}
	
	
	win[moduleName] = {
		qAll: qAll,
		qOne: qOne,
		qId: qId,
		qTag: qTag,
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		toggleClass: toggleClass,
		css: css,
		toArray: toArray,
		extend: extend
	};
	
}(document, window));


