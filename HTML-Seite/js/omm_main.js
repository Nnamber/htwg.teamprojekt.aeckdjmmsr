var omm_validateQuestions = new omm_validateQuestions();
var omm_cssSelector_checkAnswer = "#checkAnswer";

jQuery(document).ready(function() {

	$(omm_cssSelector_checkAnswer).click(omm_validateQuestions.validate);


});