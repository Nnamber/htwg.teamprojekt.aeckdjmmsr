function omm_answerGenerator() {

	/**
	 * Appends styled answer options into question body.
	 *
	 * @param {jQuery} question Checkbox from admin side
	 * @param {jQuery} questionBody Generated question body to write into
	 *
	 */
	this.addStyledAnswers = function(question, questionBody) {
		var answersContainer = document.createElement("div");
		jQuery(answersContainer).addClass("omm_question-answers-html");

		console.log($(question).parent().parent().find(omm_cssSelector_hiddenQuestion + " .omm_question-type-html").text());

		answerDespatcher(question, jQuery(answersContainer), questionBody);

		questionBody.append(answersContainer);
	};

	function answerDespatcher(question, answersContainer, questionBody) {
		var questionTyp = $(question).parent().parent().find(omm_cssSelector_hiddenQuestion + " .omm_question-type-html").text();
		switch (questionTyp) {

			case "MultipleChoice":
				answersContainer.append(multipleChoiceGenerator(question));
				break;
			case "ClozeText":
				//Dont return elements, set them into question body
				colzeTextGenerator(questionBody);
				break;
			case "OpenQuestion":
				answersContainer.append(openQuestionGenerator(question));
				break;
			case "MatchTask":
				answersContainer.append(matchTaskGenerator(question));
				break;
			case "SingleChoice":
				answersContainer.append(singleChoiceGenerator(question));
				break;
		}
	}

	function multipleChoiceGenerator(question) {
		var x = "";
		$(question).parent().parent().find(omm_cssSelector_hiddenQuestion + " .omm_question-answers-html").children().each(function(index, element) {
			var correct = $(element).find('.omm_answer-correct-html').text();
			var answer = $(element)[0].childNodes[0].nodeValue.trim();
			x += '<div class="checkbox"><label><input type="checkbox"  value="' + correct + '">' + answer + '</label></div>';
		});
		return x;
	}

	function singleChoiceGenerator(question) {
		var x = "";
		//name for the radio buttons has to be the same but should be unique site wise
		//need to find a better solution
		var answerName = Math.random();
		$(question).parent().parent().find(omm_cssSelector_hiddenQuestion + " .omm_question-answers-html").children().each(function(index, element) {
			var correct = $(element).find('.omm_answer-correct-html').text();
			var answer = $(element)[0].childNodes[0].nodeValue.trim();
			x += '<div class="radio"><label><input type="radio"  name="' + answerName + '" value="' + correct + '">' + answer + '</label></div>';
		});
		return x;
	}

	function openQuestionGenerator(question) {
		var x = "";
		var answer = $(question).parent().parent().find(omm_cssSelector_hiddenQuestion + " .omm_question-pattern-html").text();
		console.log(answer);
		x += '<div class="form-group"><label><input type="text" pattern="' + answer + '" class="form-control"></label></div>';
		console.log(x);

		return x;
	}
        /* Generates a MatchTask question. Has a counter to make answerfields unique.
         *  @param {jQuery} question Checkbox from admin side
         *  
         */
	function matchTaskGenerator(question) {
		var x = "";
                var questionTitle = $(question).parent().parent().find(" .omm_question-title").text();
                questionTitle = questionTitle.replace(/\s/g, "");
		//name for the radio buttons has to be the same but should be unique site wise
		//need to find a better solution
		$(question).parent().parent().find(omm_cssSelector_hiddenQuestion + " .omm_question-answers-html").children().each(function(index, element) {
			var nameVariable = $(element)[0].childNodes[0].nodeValue.trim();
                        var nameVariableId = nameVariable.replace(/\s/g, "");
			x += '<div class="omm_answer-field row"><div class="omm_droppable-answer" ><span>' + nameVariable + '</span></div>';
			x += '<div id="' + index + nameVariableId + '" class="omm_droppable" name="' + nameVariable + '" ondrop="drop(event)" ondragover="allowDrop(event)" title="Richtige Antwort hier her ziehen."></div></div>';
		});

		x += '<div ondrop="drop(event)" id="answerField'+questionTitle+'" ondragover="allowDrop(event)" class="omm_answer-field-big">';
		$(question).parent().parent().find(omm_cssSelector_hiddenQuestion + " .omm_question-answers-html").children().each(function(index, element) {
			var answerName = Math.random();
			var nameVariable = $(element)[0].childNodes[0].nodeValue.trim();
			var dragNDropAnswer = $(element).find('.omm_answer-notice-html').text();

			x += '<div class="omm_draggable btn-default" id="' + answerName + '" draggable="true" ondragstart="drag(event)"name="' + nameVariable + '" title="Antwort ins richtige Feld ziehen.">';
			x += dragNDropAnswer;
			x += '</div>';
		});
		x += '</div>';
		return x;
	}

	function colzeTextGenerator(questionBody) {
		//Set PlainObject with attributes
		var attributes = {
			type : "text"
		};
		//Find placeholder div-elements for input fields
		questionBody.find(omm_cssSelector_clozeTextInput).each(function(index, element) {
			var pattern = jQuery(element).find(omm_cssSelector_ommClozeTextHiddenAnswer).text();
			//TODO: Eckige Klammern in Pattern n�tig? Check htmlQuestionBodyClozeText() in xmlReader
			pattern = pattern.replace(/(\[\[|\]\])/g, "");
			var inputField = document.createElement("input");
			//Set pattern
			attributes.patter = pattern;
			jQuery(inputField).attr(attributes);
			jQuery(element).after(inputField);
			jQuery(element).remove();
		});
	}

}
