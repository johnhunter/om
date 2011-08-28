/**
	om.js - a really simple DOM framework 
	<https://github.com/johnhunter/om>

	@author       John Hunter for johnhunter.info
	@version      1.3 (2011-03-30)
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
			var s = ' ',
				classes = s + el.className + s;
			
			classes = classes.replace(s + name + s, s);
			el.className = trim(classes);
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
		if (Array.isArray) return Array.isArray(o);
		return type(o) === 'array';
	}
	
	function type (val) {
	    if (typeof val === 'undefined') return 'undefined';
	    if (typeof val === 'object' && !val) return 'null';
	    return ({}).toString.call(val).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
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
	
	function trim (str) {
		str += '';
		if (String.prototype.trim) {
			return str.trim();
		}
		return str.replace(/^\s+/, '').replace(/\s+$/, '');
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
		type: type,
		isArray: isArray,
		extend: extend,
		each: each,
		subs: subs,
		trim: trim
	};
	
}(document, window));


