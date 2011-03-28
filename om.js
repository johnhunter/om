/**
	om.js - a really simple DOM framework 
	<https://github.com/johnhunter/om>

	@author       John Hunter for johnhunter.info
	@version      1.2 (2011-03-28)
	Created       2011-03-19
	Licence       CC-BSD (2011) <http://creativecommons.org/licenses/BSD/>
	
	@dependency   none. Assumes support for DOM Selector API
	
	
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
		if (!isArray(el)) {
			el.className += el.className ? ' ' + name : name;
		}
		else {
			each(el, function (v) { addClass(v, name); });
		}
	}
	
	function removeClass (el, name) {
		if (!isArray(el)) {
			el.className = el.className.replace(RegExp('\\s+' + name), '');
		}
		else {
			each(el, function (v) { removeClass(v, name); });
		}
	}
	
	function toggleClass (el, name) {
		if (hasClass(el, name)) removeClass(el, name);
		else addClass(el, name);
	}
	
	function css (el, styles) {
		if (!isArray(el)) {
			extend(el.style, styles);
		}
		else {
			each(el, function (v) {
				css(v, styles);
			});
		}	
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
	
	function isArray (o) {
		// NOTE fallback is not always accurate:
		// see: <https://developer.mozilla.org/web-tech/2010/07/26/determining-with-absolute-accuracy-whether-or-not-a-javascript-object-is-an-array>
		if (Array.isArray) return Array.isArray(o);
		return Object.prototype.toString.call(o) === '[object Array]';
	}
	
	function each (list, fn) {
		// NOTE: does not iterate over objects
		var forEach = Array.prototype.forEach,
			i, len;
		
		if (forEach) {
			return forEach.call(list, fn, list);
		}
		
		list = Object(list);
		len = list.length || 0;
		if (typeof fn !== 'function') throw new TypeError();
		
		for (i = 0; i < len; i++) {
			if (list.hasOwnProperty(i)) {
				fn.call(list, list[i], i, list);
			}
		}	
	}
	
	function subs (str, props) {
		return str.replace(/{\$([^{}]*)}/g,
	        function (a, b) {
	            var r = props[b];
	            return typeof r === 'string' || typeof r === 'number' ? r : a;
	        }
	    );
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
		isArray: isArray,
		extend: extend,
		each: each,
		subs: subs
	};
	
}(document, window));


