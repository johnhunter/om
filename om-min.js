/*
	Compressed from: om.js v1.1
	On: 26/03/2011 18:22
	CC-BSD (2011) <http://creativecommons.org/licenses/BSD/>
*/

(function(u,g){var n="om",b,p=function(){},d=g.console,r=navigator.userAgent;g.isiPad=(/iPad/i.test(r));g.isiPod=(/iPod/i.test(r));g.isiPhone=(/iPhone/i.test(r));if(!d){d={log:p,warn:p,error:p}}if(!u.querySelectorAll||!u.querySelector){d.error("Selector API is not supported by this browser.")}if(g[n]!==b){n="jhi_om";d.warn("om already defined, fallback to "+n)}function h(k,v){v=v||u;return o(v.querySelectorAll(k))}function s(k,v){v=v||u;return v.querySelector(k)}function f(k){return u.getElementById(k)}function c(k,v){v=v||u;return o(v.getElementsByTagName(k))}function a(v,k){return(v.className.indexOf(k)!==-1)}function l(v,k){if(!i(v)){v.className+=v.className?" "+k:k}else{e(v,function(w){l(w,k)})}}function m(v,k){if(!i(v)){v.className=v.className.replace(RegExp("\\s+"+k),"")}else{e(v,function(w){m(w,k)})}}function q(v,k){if(a(v,k)){m(v,k)}else{l(v,k)}}function j(k,v){if(!i(k)){t(k.style,v)}else{e(k,function(w){j(w,v)})}}function t(){var v,w,k=o(arguments),x=k.shift();while(w=k.shift()){for(v in w){if(w.hasOwnProperty(v)){x[v]=w[v]}}}return x}function o(w){var k=[],v=w.length;while(v--){k[v]=w[v]}return k}function i(k){if(Array.isArray){return Array.isArray(k)}return Object.prototype.toString.call(k)==="[object Array]"}function e(x,w){var y=Array.prototype.forEach,v,k;if(y){return y.call(x,w,x)}x=Object(x);k=x.length||0;if(typeof w!=="function"){throw new TypeError()}for(v=0;v<k;v++){if(x.hasOwnProperty(v)){w.call(x,x[v],v,x)}}}g[n]={qAll:h,qOne:s,qId:f,qTag:c,hasClass:a,addClass:l,removeClass:m,toggleClass:q,css:j,toArray:o,isArray:i,extend:t,each:e}}(document,window));
