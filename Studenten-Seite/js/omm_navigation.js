function omm_navigation() {
	var that = this;

	this.initNavbarEventHandler = function() {
		jQuery(omm_selector_navbarArrowLeft).click(function() {
			prevSlide();
		});
		jQuery(omm_selector_navbarArrowRight).click(function() {
			nextSlide();
		});
		jQuery(omm_selector_navbarArrowFirstPage).click(function() {
			that.goToSlide(1);
		});
		jQuery(omm_selector_navbarArrowLastPage).click(function() {
			that.goToSlide(jQuery(".slides > article").length);
		});

	};

	this.goToSlide = function(slideNumberToGoTo) {
		var currentSlideNumber = jQuery(".slides > article.current " + omm_selector_currentQuestionNumber).text();
		//Check direction
		if (currentSlideNumber > slideNumberToGoTo) {
			//Go back
			for (var i = 0; i < currentSlideNumber - slideNumberToGoTo; i++) {
				prevSlide();
			}
		} else {
			//Go forward
			for (var i = 0; i < slideNumberToGoTo - currentSlideNumber; i++) {
				nextSlide();
			}
		}

	};

	this.initSlideEnterEventHandler = function(element) {

		jQuery(".slides > article").on("slideenter", function(event) {
			var wrapper = jQuery(event.target).children('.wrapper');
			
			if (jQuery(event.target).parent().width() <= 900) {
				//Set wrapper heigth on article height minus navbar height and height header 
				var headerAndNavbarHeight = 50 + jQuery(event.target).find(omm_selector_questionNumberArea).outerHeight(true);
				jQuery(wrapper).height(jQuery(event.target).height() - headerAndNavbarHeight);
				initScrolling(wrapper);
			}
		});
	};

	this.initTouchEventHandler = function() {
		jQuery(document).on("touchmove", function(event) {
			event.preventDefault();
		});

		jQuery(window).on("swipeleft", function(event) {
			nextSlide();
		});
		jQuery(window).on("swiperight", function(event) {
			prevSlide();
		});
	};
	
	function initScrolling(element) {
		if (omm_scroller !== null) {
			omm_scroller.destroy();
			omm_scroller = null;
		}

		omm_scroller = new iScroll(element.get(0), {
			hScroll: false,
			vScroll: true,
			hScrollbar: false,
			vScrollbar: false
		});
	}
}