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
	
	this.initTouchEventHandler = function(){
		jQuery(window).on("swipeleft", function(event){
			event.preventDefault();
			nextSlide();
		});
		jQuery(window).on("swiperight", function(event){
			event.preventDefault();
			prevSlide();
		});
	};
}