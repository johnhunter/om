/**
	om-test.js

	@author       John Hunter for johnhunter.info
	Created       2011-03-26
**/


test('Module loaded in global context', function() {
	expect(1);
	ok(typeof window.om === 'object' || typeof window.jhi_om === 'object',
	'Module defined as `om` or `jhi_om`.');
});

test('Module has expected public methods.', function() {
	expect(13);
	
	function isFunc (ref) {
		return typeof ref === 'function';
	} 
	
	ok(isFunc(om.qAll), 'qAll method exists.');
	ok(isFunc(om.qOne), 'qFirst method exists.');
	ok(isFunc(om.qId), 'qId method exists.');
	ok(isFunc(om.qTag), 'qTag method exists.');
	ok(isFunc(om.hasClass), 'hasClass method exists.');
	ok(isFunc(om.addClass), 'addClass method exists.');
	ok(isFunc(om.removeClass), 'removeClass method exists.');
	ok(isFunc(om.toggleClass), 'toggleClass method exists.');
	ok(isFunc(om.css), 'css method exists.');
	ok(isFunc(om.toArray), 'toArray method exists.');
	ok(isFunc(om.extend), 'extend method exists.');
	ok(isFunc(om.each), 'each method exists.');
	ok(isFunc(om.subs), 'subs method exists.');
});

test('Test utility methods', function() {
	expect(3);
	
	var testArray = (function () { return om.toArray(arguments); }(1,2,3,4));
	
	deepEqual(
		[1,2,3,4], testArray,
		'toArray returns an Array instance with correct values');
	
	var target = { 
		name: 'target',
		state: 'default'
	};
	
	var targetRef = om.extend(target, {
		state: 'extended',
		extendor: true
	});
	
	var expected = { name: 'target', state: 'extended', extendor: true };
	
	deepEqual(target, expected,
		'extend correctly extended object properties.');
	
	ok(target === targetRef, 'extend modifies target and returns target ref');
	
});

test('Test each method', function() {
	expect(1);
	
	var arr = [1,2,3,4];
	var result = [];
	
	om.each(arr, function (val, i, thisp) {
		if (thisp === this) result[i] = val;
	});
	
	deepEqual(arr, result, 'each iterates over an array like list.');
	
});

test('Test dom queries', function() {
	expect(6);
	
	var link = document.getElementById('content-item3-a');
	var listItems = document.getElementById('content').getElementsByTagName('li');
	
	
	equal(
		listItems.length,
		om.qAll('#content li').length,
		'qAll result count.');
		
	equal(
		'content-item3-a',
		 om.qAll('#content li.item3 a')[0].id, 
		'qAll with single result.');
		
	equal(
		link, 
		om.qAll('#content li a')[2], 
		'qAll array item result.');
		
	equal(
		listItems[0], 
		om.qOne('#content li'), 
		'qFirst result');
		
	equal(
		'content-item3-a', 
		om.qId('content-item3-a').id, 
		'qId result.');
		
	equal(
		listItems[4], 
		om.qTag('li', om.qId('content'))[4], 
		'qTag result with a context element.');
	
});

test('Test class manipulation', function() {
	expect(4);
	
	var item3 = om.qOne('#content li:nth-child(3)');
	
	ok(om.hasClass(item3, 'item3'),
		'Correctly detect class');
		
	om.addClass(item3, 'test-class');
	
	equal(
		item3,
		om.qOne('#content li.test-class'),
		'Correctly added class to element');
		
	om.removeClass(item3, 'test-class');
	
	ok(!om.qOne('#content li.test-class'),
	'Correctly removed class from element');
	
	om.toggleClass(item3, 'toggled');
	var toggleCount = om.qAll('#content li.toggled').length;
	om.toggleClass(item3, 'toggled');
	
	ok(
		toggleCount === 1 && om.qAll('#content li.toggled').length === 0,
		'Correctly toggled class on element');
	
	
	
});

test('Test css styles', function() {
	expect(3);
	
	var el = om.qOne('li.item2');
	
	om.css(el, {
		backgroundColor: 'red',
		overflow: 'hidden',
		position: 'relative',
		left: '200px'
	});
	
	equal(el.style.backgroundColor, 'red', 'Element background-color style set');
	equal(el.style.left, '200px', 'Element left style set');
	
	om.css(el, {
		backgroundColor: ''
	});
	
	ok(!el.style.backgroundColor, 'Element background-color style removed');
	
});

test('Test iterative dom methods', function () {
	expect(3);
	
	var before, after;
	
	before = om.qAll('#content li');
	om.addClass(before, 'active');
	after = om.qAll('#content li.active');
	
	deepEqual(after, before,
		'Correctly adding class on a collection of elements.');
		
	om.removeClass(before, 'active');
	
	after = om.qAll('#content li.active');
	
	ok(after.length === 0,
		'Correctly removing class on a collection of elements.');
	
	om.css(before, { backgroundColor: 'green' });
	after = om.qAll('#content li[style^=background-color]')
	
	deepEqual(after, before,
		'Correctly adding css styles on a collection of elements.');
	
});

test('Test template subs method', function () {
	expect(1);
	
	var template = '<a href="{$url}">{$text}</a>',
		expected = '<a href="#foo">this is foo</a>',
		output = om.subs(template, {
			url: '#foo',
			text: 'this is foo'
		});
		
	equal(
		output,
		expected,
		'Correctly substituting text from properties object.'
	);
	
});
