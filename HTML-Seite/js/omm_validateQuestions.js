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
					//alert("MultipleChoice");
					break;
				case "omm_question-type-OpenQuestion":
					//alert("OpenQuestion");
					validateOpenQuestion(this);
					break;
				case "omm_question-type-MatchTask":
					//alert("Matschtask");
					break;
				case "omm_question-type-ClozeText":
					//alert("ClozeText");
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

	}

	function validateOpenQuestion(currentquestion) {
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

	function validateMatchTask() {
	}

}
