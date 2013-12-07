var omm_selector_divDropAnswer = "div.omm_droppable";
var omm_selector_divDragable = "div.omm_draggable";
var omm_selector_attrName = "name";

function omm_validateQuestions() {

	this.validate = function() {
		//Dispach-Function: redirect to matching function
		$('article').each(function(index) {
			var container = $(this).find(".container");
			var classNames = $(container).attr("class");
			var currentQuestionType = classNames.split(" ")[0];
			var articleFormGroup = $(this).find(".form-group");
			switch (currentQuestionType) {
				case "SingleChoice":
					validateSingleChoice(articleFormGroup);
					break;
				case "MultipleChoice":
					validateMultipleChoice(articleFormGroup);
					break;
				case "OpenQuestion":
					validateOpenQuestion(articleFormGroup);
					break;
				case "MatchTask":
					validateMatchTask(articleFormGroup);
					break;
				case "ClozeText":
					validateClozeText(articleFormGroup);
					break;
			}
		});
	};

	function validateMultipleChoice(currentquestion) {
		var iscorrect = true;
		$(currentquestion).find('input:checkbox').each(function(index, element) {
			$(element).parent().parent(".checkbox").addClass("omm_callout-answer");
			if ($(element).is(":checked")) {
				if ($(element).attr("value") == "true") {
					$(element).parent().parent(".checkbox").addClass("omm_callout-answer-right");
				} else {
					$(element).parent().parent(".checkbox").addClass("omm_callout-answer-wrong");
					iscorrect = false;
				}
			} else {
				if ($(element).attr("value") == "true") {
					iscorrect = false;
					$(element).parent().parent(".checkbox").addClass("omm_callout-answer-wrong");
				} else {
					$(element).parent().parent(".checkbox").addClass("omm_callout-answer-right");
				}
			}
		});
		$(currentquestion).addClass("omm_callout");
		if (iscorrect) {
			$(currentquestion).addClass("omm_callout-right");
			$(currentquestion).find(".checkbox").each(function(index,element) {
				$(element).removeAttr("class");
				$(element).attr("class", "checkbox");
			});
		}else {
			$(currentquestion).addClass("omm_callout-wrong");
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
				$(element).addClass("omm_callout-text-right");
			} else {
				$(element).addClass("omm_callout-text-wrong");
				iscorrect = false;
			}
		});
		$(currentquestion).addClass("omm_callout");
		if(iscorrect){
			$(currentquestion).addClass("omm_callout-right");
		}else{
			$(currentquestion).addClass("omm_callout-wrong");
		}
	}

}
