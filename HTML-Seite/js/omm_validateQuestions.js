function omm_validateQuestions() {

	this.validate = function() {
		//Dispach-Function: redirect to matching function
		$('article').each(function(index) {
			var currentQuestionType = this.className.split(" ")[0];
			switch (currentQuestionType) {
				case "omm_question-type-SingleChoice":
					alert("SingleChoice");
					break;
				case "omm_question-type-MultipleChoice":
					alert("MultipleChoice");
					break;
				case "omm_question-type-OpenQuestion":
					alert("OpenQuestion");
					break;
				case "omm_question-type-MatchTask":
					alert("Matschtask");
					break;
				case "omm_question-type-ClozeText":
					alert("ClozeText");
					break;
			}
		});
	};

	function validateMultipleChoice() {
	}

	function validateSingleChoice() {
	}

	function validateClozeText() {
	}

	function validateOpenQuestion() {
	}

	function validateMatchTask() {
	}

}
