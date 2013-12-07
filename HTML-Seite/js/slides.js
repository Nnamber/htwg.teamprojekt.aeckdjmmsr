/*
 Google I/O 2011 HTML slides template
 s
 Authors: Luke Mahé (code)
 Marcin Wichary (code and design)
 Dominic Mazzoni (browser compatibility)
 Charles Chen (ChromeVox support)

 URL: http://code.google.com/p/io-2011-slides/
 */

var PERMANENT_URL_PREFIX = './';

var SLIDE_CLASSES = ['far-past', 'past', 'current', 'next', 'far-next'];

var curSlide;

/* ---------------------------------------------------------------------- */
/* classList polyfill by Eli Grey
 * (http://purl.eligrey.com/github/classList.js/blob/master/classList.js) */

if ( typeof document !== "undefined" && !("classList" in document.createElement("a"))) {( function(view) {

			var classListProp = "classList", protoProp = "prototype", elemCtrProto = (view.HTMLElement || view.Element)[protoProp], objCtr = Object;
			strTrim = String[protoProp].trim ||
			function() {
				return this.replace(/^\s+|\s+$/g, "");
			}, arrIndexOf = Array[protoProp].indexOf ||
			function(item) {
				for (var i = 0, len = this.length; i < len; i++) {
					if ( i in this && this[i] === item) {
						return i;
					}
				}
				return -1;
			}

			// Vendors: please allow content code to instantiate DOMExceptions
			, DOMEx = function(type, message) {
				this.name = type;
				this.code = DOMException[type];
				this.message = message;
			}, checkTokenAndGetIndex = function(classList, token) {
				if (token === "") {
					throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
				}
				if (/\s/.test(token)) {
					throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
				}
				return arrIndexOf.call(classList, token);
			}, ClassList = function(elem) {
				var trimmedClasses = strTrim.call(elem.className), classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [];
				for (var i = 0, len = classes.length; i < len; i++) {
					this.push(classes[i]);
				}
				this._updateClassName = function() {
					elem.className = this.toString();
				};
			}, classListProto = ClassList[protoProp] = [], classListGetter = function() {
				return new ClassList(this);
			};
			// Most DOMException implementations don't allow calling DOMException's toString()
			// on non-DOMExceptions. Error's toString() is sufficient here.
			DOMEx[protoProp] = Error[protoProp];
			classListProto.item = function(i) {
				return this[i] || null;
			};
			classListProto.contains = function(token) {
				token += "";
				return checkTokenAndGetIndex(this, token) !== -1;
			};
			classListProto.add = function(token) {
				token += "";
				if (checkTokenAndGetIndex(this, token) === -1) {
					this.push(token);
					this._updateClassName();
				}
			};
			classListProto.remove = function(token) {
				token += "";
				var index = checkTokenAndGetIndex(this, token);
				if (index !== -1) {
					this.splice(index, 1);
					this._updateClassName();
				}
			};
			classListProto.toggle = function(token) {
				token += "";
				if (checkTokenAndGetIndex(this, token) === -1) {
					this.add(token);
				} else {
					this.remove(token);
				}
			};
			classListProto.toString = function() {
				return this.join(" ");
			};

			if (objCtr.defineProperty) {
				var classListPropDesc = {
					get : classListGetter,
					enumerable : true,
					configurable : true
				};
				try {
					objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
				} catch (ex) {// IE 8 doesn't support enumerable:true
					if (ex.number === -0x7FF5EC54) {
						classListPropDesc.enumerable = false;
						objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
					}
				}
			} else if (objCtr[protoProp].__defineGetter__) {
				elemCtrProto.__defineGetter__(classListProp, classListGetter);
			}

		}(self));

}
/* ---------------------------------------------------------------------- */

/* Slide movement */

function getSlideEl(no) {
	if ((no < 0) || (no >= slideEls.length)) {
		return null;
	} else {
		return slideEls[no];
	}
};

function updateSlideClass(slideNo, className) {
	var el = getSlideEl(slideNo);

	if (!el) {
		return;
	}

	if (className) {
		el.classList.add(className);
	}

	for (var i in SLIDE_CLASSES) {
		if (className != SLIDE_CLASSES[i]) {
			el.classList.remove(SLIDE_CLASSES[i]);
		}
	}
};

function updateSlides() {
	for (var i = 0; i < slideEls.length; i++) {
		switch (i) {
			case curSlide - 2:
				updateSlideClass(i, 'far-past');
				break;
			case curSlide - 1:
				updateSlideClass(i, 'past');
				break;
			case curSlide:
				updateSlideClass(i, 'current');
				break;
			case curSlide + 1:
				updateSlideClass(i, 'next');
				break;
			case curSlide + 2:
				updateSlideClass(i, 'far-next');
				break;
			default:
				updateSlideClass(i);
				break;
		}
	}

	triggerLeaveEvent(curSlide - 1);
	triggerEnterEvent(curSlide);

	window.setTimeout(function() {
		// Hide after the slide
		disableSlideFrames(curSlide - 2);
	}, 301);

	enableSlideFrames(curSlide - 1);
	enableSlideFrames(curSlide + 2);

	if (isChromeVoxActive()) {
		speakAndSyncToNode(slideEls[curSlide]);
	}

	updateHash();
};

function buildNextItem() {
	var toBuild = slideEls[curSlide].querySelectorAll('.to-build');

	if (!toBuild.length) {
		return false;
	}

	toBuild[0].classList.remove('to-build', '');

	if (isChromeVoxActive()) {
		speakAndSyncToNode(toBuild[0]);
	}

	return true;
};

function prevSlide() {
	//update slide height
	setSlideSize();
	if (curSlide > 0) {

		curSlide--;
		//jump to top of page
		$('html,body').scrollTop(0);
		updateSlides();
	}
};

function nextSlide() {
	//update slide height
	setSlideSize();
	if (buildNextItem()) {
		return;
	}

	if (curSlide < slideEls.length - 1) {
		curSlide++;
		//jump to top of page
		$('html,body').scrollTop(0);
		updateSlides();
	}
};

/* Slide events */

function triggerEnterEvent(no) {
	var el = getSlideEl(no);
	if (!el) {
		return;
	}

	var onEnter = el.getAttribute('onslideenter');
	if (onEnter) {
		new Function(onEnter).call(el);
	}

	var evt = document.createEvent('Event');
	evt.initEvent('slideenter', true, true);
	evt.slideNumber = no + 1;
	// Make it readable

	el.dispatchEvent(evt);
};

function triggerLeaveEvent(no) {
	var el = getSlideEl(no);
	if (!el) {
		return;
	}

	var onLeave = el.getAttribute('onslideleave');
	if (onLeave) {
		new Function(onLeave).call(el);
	}

	var evt = document.createEvent('Event');
	evt.initEvent('slideleave', true, true);
	evt.slideNumber = no + 1;
	// Make it readable

	el.dispatchEvent(evt);
};

/* Preloading frames */

function disableSlideFrames(no) {
	var el = getSlideEl(no);
	if (!el) {
		return;
	}

	var frames = el.getElementsByTagName('iframe');
	for (var i = 0, frame; frame = frames[i]; i++) {
		disableFrame(frame);
	}
};

function enableSlideFrames(no) {
	var el = getSlideEl(no);
	if (!el) {
		return;
	}

	var frames = el.getElementsByTagName('iframe');
	for (var i = 0, frame; frame = frames[i]; i++) {
		enableFrame(frame);
	}
};

function disableFrame(frame) {
	frame.src = 'about:blank';
};

function enableFrame(frame) {
	var src = frame._src;

	if (frame.src != src && src != 'about:blank') {
		frame.src = src;
	}
};

function setupFrames() {
	var frames = document.querySelectorAll('iframe');
	for (var i = 0, frame; frame = frames[i]; i++) {
		frame._src = frame.src;
		disableFrame(frame);
	}

	enableSlideFrames(curSlide);
	enableSlideFrames(curSlide + 1);
	enableSlideFrames(curSlide + 2);
};

function handleGestureStart(event) {
	document.title = 's' + event.rotation + ' ' + event.scale;
}

function handleGestureChange(event) {
	document.title = 'c' + event.rotation + ' ' + event.scale;
}

function handleGestureEnd(event) {
	document.title = 'e' + event.rotation + ' ' + event.scale;
}

function setupInteraction() {
	/* Clicking and tapping */

	var el = document.createElement('div');
	el.className = 'slide-area';
	el.id = 'prev-slide-area';
	el.addEventListener('click', prevSlide, false);
	document.querySelector('section.slides').appendChild(el);

	var el = document.createElement('div');
	el.className = 'slide-area';
	el.id = 'next-slide-area';
	el.addEventListener('click', nextSlide, false);
	document.querySelector('section.slides').appendChild(el);

	/* Swiping */

	document.body.addEventListener('gesturestart', handleGestureStart, false);
	document.body.addEventListener('gesturechange', handleGestureChange, false);
	document.body.addEventListener('gestureend', handleGestureEnd, false);
}

/* ChromeVox support */

function isChromeVoxActive() {
	if ( typeof (cvox) == 'undefined') {
		return false;
	} else {
		return true;
	}
};

function speakAndSyncToNode(node) {
	if (!isChromeVoxActive()) {
		return;
	}

	cvox.ChromeVox.navigationManager.switchToStrategy(cvox.ChromeVoxNavigationManager.STRATEGIES.LINEARDOM, 0, true);
	cvox.ChromeVox.navigationManager.syncToNode(node);
	cvox.ChromeVoxUserCommands.finishNavCommand('');
	var target = node;
	while (target.firstChild) {
		target = target.firstChild;
	}
	cvox.ChromeVox.navigationManager.syncToNode(target);
};

function speakNextItem() {
	if (!isChromeVoxActive()) {
		return;
	}

	cvox.ChromeVox.navigationManager.switchToStrategy(cvox.ChromeVoxNavigationManager.STRATEGIES.LINEARDOM, 0, true);
	cvox.ChromeVox.navigationManager.next(true);
	if (!cvox.DomUtil.isDescendantOfNode(cvox.ChromeVox.navigationManager.getCurrentNode(), slideEls[curSlide])) {
		var target = slideEls[curSlide];
		while (target.firstChild) {
			target = target.firstChild;
		}
		cvox.ChromeVox.navigationManager.syncToNode(target);
		cvox.ChromeVox.navigationManager.next(true);
	}
	cvox.ChromeVoxUserCommands.finishNavCommand('');
};

function speakPrevItem() {
	if (!isChromeVoxActive()) {
		return;
	}

	cvox.ChromeVox.navigationManager.switchToStrategy(cvox.ChromeVoxNavigationManager.STRATEGIES.LINEARDOM, 0, true);
	cvox.ChromeVox.navigationManager.previous(true);
	if (!cvox.DomUtil.isDescendantOfNode(cvox.ChromeVox.navigationManager.getCurrentNode(), slideEls[curSlide])) {
		var target = slideEls[curSlide];
		while (target.lastChild) {
			target = target.lastChild;
		}
		cvox.ChromeVox.navigationManager.syncToNode(target);
		cvox.ChromeVox.navigationManager.previous(true);
	}
	cvox.ChromeVoxUserCommands.finishNavCommand('');
};

/* Hash functions */

function getCurSlideFromHash() {
	var slideNo = parseInt(location.hash.substr(1));

	if (slideNo) {
		curSlide = slideNo - 1;
	} else {
		curSlide = 0;
	}
};

function updateHash() {
	location.replace('#' + (curSlide + 1));
};

/* Event listeners */

function handleBodyKeyDown(event) {
	/* get current slide height */
	var eventTargetContainerParent = $(getSlideEl(curSlide)).height();
	switch (event.keyCode) {
		case 39:
		// right arrow
		case 13:
		// Enter
		case 32:
		// space
		case 34:
			// PgDn
			nextSlide();
			event.preventDefault();
			break;

		case 37:
		// left arrow
		//case 8:
		// Backspace
		case 33:
			// PgUp
			prevSlide();
			event.preventDefault();
			break;

		case 40:
			if (eventTargetContainerParent.height() <= 700) {
				// down arrow
				if (isChromeVoxActive()) {
					speakNextItem();
				} else {
					nextSlide();
				}
				event.preventDefault();
				break;
			}
		case 38:
			if (eventTargetContainerParent.height() <= 700) {
				// up arrow
				if (isChromeVoxActive()) {
					speakPrevItem();
				} else {
					prevSlide();
				}
				event.preventDefault();
				break;
			}
	}
};

function handleBodyScrollWheel(event) {
	//get the parent container of the event.target
	var eventTargetContainerParent = $(event.target).parents(".container").parent();

	//test the height of the parent, if below 700 scrolling to next slide is ok
	if (eventTargetContainerParent.height() <= 700) {
		//jump to the top of the page in case the previous page was scrollable
		$('html,body').scrollTop(0);
		var delta = event.originalEvent.detail < 0 || event.originalEvent.wheelDelta > 0 ? 1 : -1;
		if (delta < 0) {
			// scroll down
			nextSlide();
			event.preventDefault();
		} else {
			// scroll up
			prevSlide();
			event.preventDefault();
		}
	}
}

function addEventListeners() {
	document.addEventListener('keydown', handleBodyKeyDown, false);
	$(document).unbind('mousewheel DOMMouseScroll').on('mousewheel DOMMouseScroll', handleBodyScrollWheel);
};

/* Initialization */

function addPrettify() {
	var els = document.querySelectorAll('pre');
	for (var i = 0, el; el = els[i]; i++) {
		if (!el.classList.contains('noprettyprint')) {
			el.classList.add('prettyprint');
		}
	}

	var el = document.createElement('script');
	el.type = 'text/javascript';
	el.src = PERMANENT_URL_PREFIX + './js/prettify.js';
	el.onload = function() {
		prettyPrint();
	};
	document.body.appendChild(el);
};

function addFontStyle() {
	var el = document.createElement('link');
	el.rel = 'stylesheet';
	el.type = 'text/css';
	//	el.href = 'http://fonts.googleapis.com/css?family=' + 'Open+Sans:regular,semibold,italic,italicsemibold|Droid+Sans+Mono';
	el.href = PERMANENT_URL_PREFIX + './css/fonts';
	;

	document.body.appendChild(el);
};

function addGeneralStyle() {
	// Set stylesheets in omm_readSelected
	//	var el = document.createElement('link');
	//	el.rel = 'stylesheet';
	//	el.type = 'text/css';
	//	el.href = PERMANENT_URL_PREFIX + './css/styles.css';
	//	document.body.appendChild(el);

	var el = document.createElement('meta');
	el.name = 'viewport';
	el.content = 'width=1100,height=750';
	document.querySelector('head').appendChild(el);

	var el = document.createElement('meta');
	el.name = 'apple-mobile-web-app-capable';
	el.content = 'yes';
	document.querySelector('head').appendChild(el);
};

function makeBuildLists() {
	for (var i = curSlide, slide; slide = slideEls[i]; i++) {
		var items = slide.querySelectorAll('.build > *');
		for (var j = 0, item; item = items[j]; j++) {
			if (item.classList) {
				item.classList.add('to-build');
			}
		}
	}
};

function setSlideSize() {

	//make slides scrollable in height if necessary
	$(".container").each(function(i, elementInitial) {
		var containerHeight = $(elementInitial).height();
		if (containerHeight > $('.article').height()) {
			$(elementInitial).parent().css('min-height', containerHeight + 105);
			$(elementInitial).parent().css('margin-bottom', "20px !important");
		}
	});

	if ($(getSlideEl(curSlide + 1)).height() > 700) {
		var height = $(getSlideEl(curSlide + 1)).height();
		$("#next-slide-area").css('height', height);
		console.log(height);

	}
	if ($(getSlideEl(curSlide - 1)).height() > 700) {
		var height = $(getSlideEl(curSlide - 1)).height();
		$("#prev-slide-area").css('height', height);
	}
}

function handleDomLoaded() {
	slideEls = document.querySelectorAll('section.slides > article');

	addFontStyle();
	addGeneralStyle();
	addPrettify();
	addEventListeners();

	updateSlides();

	setupInteraction();
	setupFrames();
	makeBuildLists();
	document.body.classList.add('loaded');
	setSlideSize();
};

function initialize() {
	getCurSlideFromHash();

	document.addEventListener('DOMContentLoaded', handleDomLoaded, false);

}

initialize();
