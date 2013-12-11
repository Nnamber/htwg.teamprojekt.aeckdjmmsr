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
				clozeTextGenerator(questionBody);
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
		var multipleChoiceAnswerArray = [];

		$(question).parent().parent().find(omm_cssSelector_hiddenQuestion + " .omm_question-answers-html").children().each(function(index, element) {
			var correct = $(element).find('.omm_answer-correct-html').text();
			var answer = $(element)[0].childNodes[0].nodeValue.trim();
			var tempMultipleChoiceAnswer = "";

			tempMultipleChoiceAnswer += '<div class="checkbox"><label><input type="checkbox"  value="' + correct + '">' + answer + '</label></div>';
			multipleChoiceAnswerArray.push(tempMultipleChoiceAnswer);
		});
		//shuffle the answers
		x += shuffleAnswers(multipleChoiceAnswerArray);

		return x;
	}

	function singleChoiceGenerator(question) {
		var x = "";
		var singleChoiceAnswerArray = [];
		//name for the radio buttons has to be the same but should be unique site wise
		//need to find a better solution
		var answerName = Math.random();
		$(question).parent().parent().find(omm_cssSelector_hiddenQuestion + " .omm_question-answers-html").children().each(function(index, element) {
			var correct = $(element).find('.omm_answer-correct-html').text();
			var answer = $(element)[0].childNodes[0].nodeValue.trim();
			var tempSingleChoiceAnswer = "";
			tempSingleChoiceAnswer += '<div class="radio"><label><input type="radio"  name="' + answerName + '" value="' + correct + '">' + answer + '</label></div>';
			singleChoiceAnswerArray.push(tempSingleChoiceAnswer);
		});
		//shuffle the answers
		x += shuffleAnswers(singleChoiceAnswerArray);

		return x;
	}

	function openQuestionGenerator(question) {
		var x = "";
		var answer = $(question).parent().parent().find(omm_cssSelector_hiddenQuestion + " .omm_question-pattern-html").text();
		x += '<div><label><input type="text" pattern="' + answer + '" class="form-control"></label></div>';

		return x;
	}
        /* Generates a MatchTask question. Has a counter to make answerfields unique.
         *  @param {jQuery} question Checkbox from admin side
         *  
         */
	function matchTaskGenerator(question) {
		var x = "";
                var questionTitle = $(question).parent().parent().find(" .omm_question-title").text();
		var matchTaskAnswerArray = [];
                questionTitle = questionTitle.replace(/\s/g, "");
		//name for the radio buttons has to be the same but should be unique site wise
		//need to find a better solution
		$(question).parent().parent().find(omm_cssSelector_hiddenQuestion + " .omm_question-answers-html").children().each(function(index, element) {
			var nameVariable = $(element)[0].childNodes[0].nodeValue.trim();
                        var nameVariableId = nameVariable.replace(/\s/g, "");
			var tempMatchTaskSingleAnswer = "";

			tempMatchTaskSingleAnswer += '<div class="omm_answer-field row"><div class="omm_droppable-answer col-md-5 col-sm-5" ><p>' + nameVariable + '</p></div>';
			tempMatchTaskSingleAnswer += '<div id="' + index + nameVariableId + '" class="omm_droppable col-md-7 well col-sm-7 row" name="' + nameVariable + '" ondrop="drop(event)" ondragover="allowDrop(event)" title="Richtige Antwort hier her ziehen."></div></div>';
			matchTaskAnswerArray.push(tempMatchTaskSingleAnswer);
		});
		//shuffle the answers
		x += shuffleAnswers(matchTaskAnswerArray);

		x += '<div ondrop="drop(event)" id="answerField'+questionTitle+'" ondragover="allowDrop(event)" class="omm_answer-field-big  row well well-lg">';
		var matchTaskAnswerArray = [];
		$(question).parent().parent().find(omm_cssSelector_hiddenQuestion + " .omm_question-answers-html").children().each(function(index, element) {
			var answerName = Math.random();
			var nameVariable = $(element)[0].childNodes[0].nodeValue.trim();
			var dragNDropAnswer = $(element).find('.omm_answer-notice-html').text();
			var tempMatchTaskSingleAnswer = "";
			tempMatchTaskSingleAnswer += '<div class="omm_draggable btn-default col-md-3 col-sm-3 col-xs-5" id="' + answerName + '" draggable="true" ondragstart="drag(event)"name="' + nameVariable + '" title="Antwort ins richtige Feld ziehen.">';
			tempMatchTaskSingleAnswer += dragNDropAnswer;
			tempMatchTaskSingleAnswer += '</div>';
			matchTaskAnswerArray.push(tempMatchTaskSingleAnswer);
		});
		//shuffle the answers
		x += shuffleAnswers(matchTaskAnswerArray);
		x += '</div>';
		return x;
	}

	function shuffleAnswers(answerArray){
	    var allAnswersString = "";
	    var generatedNumbers = [];
	    for(var i = 0; i < answerArray.length-1;){
		var randomNumber = getRandomInt(0, answerArray.length);
		randomNumber -= 1;
		alert(randomNumber);
		if($.inArray(randomNumber, generatedNumbers) === -1){
		    generatedNumbers.push(randomNumber);
		    allAnswersString += answerArray[randomNumber];
		    i++;
		}
	    }
	    return allAnswersString;
	}
	
	function getRandomInt (min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	function clozeTextGenerator(questionBody) {
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
			attributes.pattern = pattern;
			jQuery(inputField).attr(attributes);
			jQuery(inputField).addClass('omm_clozetext');
			jQuery(element).after(inputField);
			jQuery(element).remove();
		});
	}

}
