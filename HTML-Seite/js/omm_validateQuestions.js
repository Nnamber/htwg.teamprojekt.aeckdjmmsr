var omm_selector_divDropAnswer = "div.omm_droppable";
var omm_selector_divDragable = "div.omm_draggable";
var omm_selector_attrName = "name";

function omm_validateQuestions() {
	var lastSlide;
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
			lastArticle = this;
		});
		
		createStatisticTable(lastArticle);
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
		var answer = $(currentquestion).find('input[type=radio][value=true]:checked');
		var correctAnswerDiv = $(currentquestion).find("input[type=radio][value=true]").parent().parent(".radio");		
		if (answer.length > 0) {
			// $(currentquestion).html("richtig");
			$(currentquestion).addClass("omm_callout omm_callout-right");
			// $(correctAnswerDiv).addClass("omm_callout-answer omm_callout-answer-right"); // unnötig
		} else{
			$(currentquestion).addClass("omm_callout omm_callout-wrong");
			$(correctAnswerDiv).addClass("omm_callout-answer omm_callout-answer-right");
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

	function createStatisticTable(slide){
		//Remove 'Auserwerten' button
		$(omm_cssSelector_checkAnswer).remove();
		//Create table with answered questions
		var table = document.createElement("table");
		var tableBody = document.createElement("tbody");
		$(table).addClass("table");
		$(table).append("<thead><tr><th>#</th><th>Frage</th><th>Antwort</th></tr></thead>");	
		$(table).append(tableBody);
		$('article').each(function(index, element){
			if($(element).find("form-group") != null ){
			var questionNr = $(element).find(".omm_current-question-number").text();
			var questionName = $(element).find(".omm_current-question-name").text();
			$(tableBody).append("<tr><td>"+questionNr+"</td><td>"+ questionName +"</td></tr>");
			
			}
		});
		$(slide).find(".validationSlide").append(table);
	}
}
