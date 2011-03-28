# om.js - Really simple DOM framework #

## Description ##

om.js is a simple framework for working with the DOM. It is primarily intended for modern browsers and Mobile Webkit in particular. Functionality is currently focused on two areas:

* Recursive methods to access element classname and style properties.
* Aliasing existing DOM query methods (makes no attempt to normalise browsers)

If the framework does not provide the functionality you need then you should consider using fuller featured frameworks such as [jQuery](http://jquery.com/) or [XUI](http://xuijs.com/).

## Use ##

	// get an array of <li> elements within content.
	var items = om.qAll('#content li');
	
	
	// add a class to each <li>
	om.addClass(items, 'my-items');
	
	
	// change the position of each <li> 
	om.css(items, {
		'position': 'relative',
		'left': '50px'
	});


## Methods ##

* `qAll(selector [,context])`   - returns an array of dom elements for the css selector
* `qOne(selector [,context])`   - returns first dom element for the css selector
* `qId(id)`                     - returns dom element for id
* `qTag(name [,context])`       - returns an array of dom elements for the given tagname
* `hasClass(el, name)`          - returns true if el has a class of name
* `addClass(el, name)`          - adds class name to el (or el array)
* `removeClass(el, name)`       - removes class name from el (or el array)
* `toggleClass(el, name)`       - toggles class name on el (or el array)
* `css(el, styles)`             - apply the styles object properties to el (or el array)
* `toArray(o)`                  - converts o to an array
* `isArray(o)`                  - test if o is an array
* `extend(target, source)`      - add source object properties to target, returning target
* `each(list, callback)`        - an iterator for arrays
* `subs(str, props)`            - substitute properties of props object into template str `"{$prop}"`


## Properties ##

The framework will set the following boolean properties (flags) on the window object:

* `isiPad` 
* `isiPod` 
* `isiPhone` 

These are based on the browser user-agent string. Note that some platforms may have more than one flag. E.g. iPod Touch is flagged as bother isiPod and isiPhone.


## License ##

CC-BSD (2011) <http://creativecommons.org/licenses/BSD/>

