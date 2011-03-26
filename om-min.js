/*
	Compressed from: om.js v1.0
	On: 26/03/2011 14:10
	CC-BSD (2011) <http://creativecommons.org/licenses/BSD/>
*/

(function(s,f){var l="om",b,n=function(){},d=f.console,p=navigator.userAgent;f.isiPad=(/iPad/i.test(p));f.isiPod=(/iPod/i.test(p));f.isiPhone=(/iPhone/i.test(p));if(!d){d={log:n,warn:n,error:n}}if(!s.querySelectorAll||!s.querySelector){d.error("Selector API is not supported by this browser.")}if(f[l]!==b){l="jhi_om";d.warn("om already defined, fallback to "+l)}function g(k,t){t=t||s;return m(t.querySelectorAll(k))}function q(k,t){t=t||s;return t.querySelector(k)}function e(k){return s.getElementById(k)}function c(k,t){t=t||s;return m(t.getElementsByTagName(k))}function a(t,k){return(t.className.indexOf(k)!==-1)}function i(t,k){t.className+=t.className?" "+k:k}function j(t,k){t.className=t.className.replace(RegExp("\\s+"+k),"")}function o(u,t){var k=a(u,t);if(k){j(u,t)}else{i(u,t)}return !k}function h(k,t){r(k.style,t)}function r(){var t,u,k=m(arguments),v=k.shift();while(u=k.shift()){for(t in u){if(u.hasOwnProperty(t)){v[t]=u[t]}}}return v}function m(u){var k=[],t=u.length;while(t--){k[t]=u[t]}return k}f[l]={qAll:g,qOne:q,qId:e,qTag:c,hasClass:a,addClass:i,removeClass:j,toggleClass:o,css:h,toArray:m,extend:r}}(document,window));

