var omm_validateQuestions = new omm_validateQuestions();
var omm_navigation = new omm_navigation();
var omm_cssSelector_checkAnswer = "#checkAnswer";
var omm_selector_navbarArrowLeft = ".omm_arrow-left";
var omm_selector_navbarArrowRight = ".omm_arrow-right";
var omm_selector_navbarArrowFirstPage = ".omm_arrow-first-page";
var omm_selector_navbarArrowLastPage = ".omm_arrow-last-page";
var omm_selector_currentQuestionNumber = ".omm_current-question-number";
var omm_selector_questionNumberArea = ".omm_question-number-area";

//scroller to init in initScrolling() 
var omm_scroller = null;

jQuery(document).ready(function() {

	$(omm_cssSelector_checkAnswer).click(function(event){
		omm_validateQuestions.validate();
		triggerEnterEvent(jQuery(".slides > article").length - 1);
	});
	omm_navigation.initNavbarEventHandler();
	omm_navigation.initTouchEventHandler();
	omm_navigation.initSlideEnterEventHandler();
});

