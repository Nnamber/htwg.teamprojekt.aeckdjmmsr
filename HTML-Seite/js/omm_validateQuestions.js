var omm_selector_divDropAnswer = "div.omm_drop-answer";
var omm_selector_divDragable = "div.dragable";
var omm_selector_attrName = "name";

function omm_validateQuestions() {

	this.validate = function() {
		//Dispach-Function: redirect to matching function
		$('article').each(function(index) {
			var currentQuestionType = this.className.split(" ")[0];
			switch (currentQuestionType) {
				case "omm_question-type-SingleChoice":
					validateSingleChoice(this);
					break;
				case "omm_question-type-MultipleChoice":
					validateMultipleChoice(this);
					break;
				case "omm_question-type-OpenQuestion":
					validateOpenQuestion(this);
					break;
				case "omm_question-type-MatchTask":
					validateMatchTask(this);
					break;
				case "omm_question-type-ClozeText":
					validateClozeText(this);
					break;
			}
		});
	};

	function validateMultipleChoice(currentquestion) {
		var iscorrect = true;
		// $( "input:checkbox:checked" ).val();
		$(currentquestion).find('input:checkbox').each(function(index, element) {
			if ($(element).is(":checked")) {
				if ($(element).attr("value") == "true") {
					// do nothing
				} else {
					iscorrect = false;
				}
			} else {
				if ($(element).attr("value") == "true") {
					iscorrect = false;
				} else {
					// do nothing
				}
			}
		});
		if (iscorrect) {
			$(currentquestion).html("richtig");
		}
	}

	function validateSingleChoice(currentquestion) {
		var rightAnswer = $(currentquestion).find('input[type=radio][value=true]:checked');
		if (rightAnswer.length > 0) {
			$(currentquestion).html("richtig");
		}
	}

	function validateClozeText(currentquestion) {
		commonValidation(currentquestion);
	}

	function validateOpenQuestion(currentquestion) {
		commonValidation(currentquestion);
	}

	function validateMatchTask(currentquestion) {
		var iscorrect = true;
		$(currentquestion).find(omm_selector_divDropAnswer).each(function(index,element) {
			if($(element).attr(omm_selector_attrName) == $(element).find(omm_selector_divDragable).attr(omm_selector_attrName)){
				//Do nothing
			}else{
				iscorrect = false;
			}
		});
		if(iscorrect){
			$(currentquestion).html("richtig");
		}
	}
	
	//call in case of clozetext and openquestion
	function commonValidation(currentquestion){
		var iscorrect = true;
		$(currentquestion).find('input:text').each(function(index, element) {
			if ($(element).val() == $(element).attr('pattern')) {
				// do nothing
			} else {
				iscorrect = false;
			}
		});
		if(iscorrect){
			$(currentquestion).html("richtig");
		}
	}

}
