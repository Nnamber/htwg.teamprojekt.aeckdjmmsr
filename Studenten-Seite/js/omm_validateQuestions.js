var omm_selector_divDropAnswer = "div.omm_droppable";
var omm_selector_divDragable = "div.omm_draggable";
var omm_selector_container = ".container";
var omm_selector_formGroup = ".form-group";
var omm_selector_answerField = ".omm_answer-field";

/*validation classes(styling right and wrong answers): */
var omm_class_callout = "omm_callout";
var omm_class_calloutAnswer = "omm_callout-answer";
var omm_class_calloutAnswerRight = "omm_callout-answer-right";
var omm_class_calloutAnswerWrong = "omm_callout-answer-wrong";
var omm_class_calloutWrong = "omm_callout-wrong";
var omm_class_calloutRight = "omm_callout-right";
var omm_class_calloutTextRight = "omm_callout-text-right";
var omm_class_calloutTextWrong = "omm_callout-text-wrong";

function omm_validateQuestions() {
	var lastSlide;
	this.validate = function() {
		//Dispatch-Function: redirect to matching function
		$('article').each(function(index) {
			var container = $(this).find(omm_selector_container);
			var classNames = $(container).attr("class");
			var currentQuestionType = classNames.split(" ")[0];
			var articleFormGroup = $(this).find(omm_selector_formGroup);
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
		//make slide scrollable in height if necessary
		setSlideSize(null);
	};

	function validateMultipleChoice(currentquestion) {
		var iscorrect = true;
		$(currentquestion).find('input:checkbox').each(function(index, element) {
			var checkboxGrandparentDiv = $(element).parent().parent(".checkbox");
			$(checkboxGrandparentDiv).addClass(omm_class_calloutAnswer);
			if ($(element).is(":checked")) {
				if ($(element).attr("value") == "true") {
					$(checkboxGrandparentDiv).addClass(omm_class_calloutAnswerRight);
					$(checkboxGrandparentDiv).append("<input class='omm_multipleChoiseXtra' type='checkbox' checked='checked'>");
				} else {
					$(checkboxGrandparentDiv).addClass(omm_class_calloutAnswerWrong);
					$(checkboxGrandparentDiv).append("<input class='omm_multipleChoiseXtra' type='checkbox'>");
					iscorrect = false;
				}
			} else {
				if ($(element).attr("value") == "true") {
					iscorrect = false;
					$(checkboxGrandparentDiv).addClass(omm_class_calloutAnswerWrong);
					$(checkboxGrandparentDiv).append("<input class='omm_multipleChoiseXtra' type='checkbox' checked='checked'>");
				} else {
					/*$(checkboxGrandparentDiv).addClass(omm_class_calloutAnswerRight);*/
					$(checkboxGrandparentDiv).append("<input class='omm_multipleChoiseXtra' type='checkbox' >");
				}
			}
		});

		$(currentquestion).addClass(omm_class_callout);
		if (iscorrect) {
			$(currentquestion).addClass(omm_class_calloutRight);
			$(currentquestion).find(".checkbox").each(function(index, element) {
				$(element).removeAttr("class");
				$(element).attr("class", "checkbox");
				$(currentquestion).find(".omm_multipleChoiseXtra").remove();
			});
		} else {
			$(currentquestion).addClass(omm_class_calloutWrong);
			$(currentquestion).find('.omm_question-answers-html:last').append("<i id='omm_right-answer-info' class='fa fa-sort-desc fa-2x'> Richtige Antwort</i>");
		}
		appendNoticesToQuestion(currentquestion, iscorrect);
	}

	function validateSingleChoice(currentquestion) {
		var iscorrect;
		var answer = $(currentquestion).find('input[type=radio][value=true]:checked');
		var correctAnswerDiv = $(currentquestion).find("input[type=radio][value=true]").parent().parent(".radio");
		if (answer.length > 0) {
			iscorrect = true;
			$(currentquestion).addClass(omm_class_callout);
			$(currentquestion).addClass(omm_class_calloutRight);
		} else {
			iscorrect = false;
			$(currentquestion).addClass(omm_class_calloutWrong);
			$(currentquestion).addClass(omm_class_callout);
			$(correctAnswerDiv).addClass(omm_class_calloutAnswer);
			$(correctAnswerDiv).addClass(omm_class_calloutAnswerRight);
		}
		appendNoticesToQuestion(currentquestion, iscorrect);
	}

	function validateClozeText(currentquestion) {
		commonValidation(currentquestion);
	}

	function validateOpenQuestion(currentquestion) {
		commonValidation(currentquestion);
	}

	function validateMatchTask(currentquestion) {
		var iscorrect = true;
		//No draggable elements allowed after validation
		$(currentquestion).find(omm_selector_divDragable).removeAttr("draggable");
		$(currentquestion).find(omm_selector_divDragable).removeAttr("ondragstart");
		var answers = $.map($(currentquestion).find(omm_selector_divDragable), function(a) {
			return a;
		});
		$(currentquestion).find(omm_selector_divDropAnswer).each(function(index, element) {
			if ($(element).attr("name") == $(element).find(omm_selector_divDragable).attr("name")) {
				$(element).parent(omm_selector_answerField).addClass(omm_class_calloutAnswerRight);
			} else {
				iscorrect = false;

				$(element).parent(omm_selector_answerField).addClass(omm_class_calloutAnswerWrong);
				$(answers).each(function(index) {
					if ($(element).attr("name") == $(this).attr("name")) {
						$(element).append("<span>(" + $(this).text() + ")</span>");

					}
				});
			}
		});
		$(currentquestion).addClass(omm_class_callout);
		/*$("#answerFieldRetentionPolicy").remove();*/
		if (iscorrect) {
			$(currentquestion).addClass(omm_class_calloutRight);
			$(currentquestion).find(omm_selector_answerField).each(function(index, element) {
				$(element).removeClass(omm_class_calloutAnswerRight);
			});
		} else {
			$(currentquestion).addClass(omm_class_calloutWrong);
		}
		$(currentquestion).find("div.omm_answer-field-big").remove();
		appendNoticesToQuestion(currentquestion, iscorrect);
	}

	//call in case of clozetext and openquestion
	function commonValidation(currentquestion) {
		var iscorrect = true;
		$(currentquestion).find('input:text').each(function(index, element) {
			var pattern = $(element).attr('pattern');
			//pattern could contain a regEx, seperated by |  --> construct of pattern=(RexEx*|Lösung)
			var regEx = pattern.split("|").length > 1 ? true : false;
			// regEx = true --> so kick ~ ([~] is not a valid Javascript regex)
			if (regEx && $(element).val().match(pattern.replace("~", ""))) {
				$(element).addClass(omm_class_calloutTextRight);
			} else if($(element).val() == pattern){
				$(element).addClass(omm_class_calloutTextRight);
			}else {
				$(element).addClass(omm_class_calloutTextWrong);
				$(element).after("<span class='omm_callout-answer omm_callout-answer-wrong'>&nbsp;"+extractPattern(pattern)+"&nbsp;</span>");
				iscorrect = false;
			}
		});
		$(currentquestion).addClass(omm_class_callout);
		if (iscorrect) {
			$(currentquestion).addClass(omm_class_calloutRight);
		} else {
			$(currentquestion).addClass(omm_class_calloutWrong);
		}
		appendNoticesToQuestion(currentquestion, iscorrect);
	}

	function appendNoticesToQuestion(currentquestion, iscorrect) {
		var container = $(currentquestion).parent().parent();
		var notice = $(container).find(".omm_question-notice-html").text();
		if (notice.length !== 0) {
			var alertBox = "<div class='alert alert-info omm_alert-info'><p> <i class='fa fa-quote-left omm_notice'></i>&nbsp;&nbsp;<em>" + notice + "</em>&nbsp;&nbsp;<i class='fa fa-quote-right omm_notice'></i></p></div>";
			$(container).find("form").prepend(alertBox);
		}
		if (iscorrect) {
			var noticeOnRight = $(container).find(".omm_question-notice-on-right-html").text();
			if (noticeOnRight.length == 0) {
				noticeOnRight = "You rock, man!";
			};
			var alertBox = "<div class='alert alert-success omm-alert-success'><p> <i class='fa fa-check-circle fa-2x omm_notice'></i>&nbsp;&nbsp;<em>" + noticeOnRight + "</em></p></div>";
			$(container).find("form").prepend(alertBox);
		} else {
			var noticeOnWrong = $(container).find(".omm_question-notice-on-wrong-html").text();
			if (noticeOnWrong.length == 0) {
				noticeOnWrong = "Das geht besser.";
			};
			var alertBox = "<div class='alert alert-danger omm_alert-danger'><p> <i class='fa fa-times-circle fa-2x omm_notice'></i>&nbsp;&nbsp;<em>" + noticeOnWrong + "</em></p></div>";
			$(container).find("form").prepend(alertBox);
		}

	}

	function createStatisticTable(slide) {
		//Remove 'Auswerten' button
		$(omm_cssSelector_checkAnswer).remove();
		//Create table with answered questions
		var table = document.createElement("table");
		var tableBody = document.createElement("tbody");
		$(table).addClass("table");
		$(table).addClass("table-hover");
		$(table).append("<thead><tr><th>#</th><th>Frage</th><th>Antwort</th></tr></thead>");
		$(table).append(tableBody);
		var totalQuestions = $(".omm_total-question-number:first").text();
		var rightAnswers = 0;
		$('article').each(function(index, element) {
			var formgroup = $(element).find(omm_selector_formGroup);
			if (formgroup.length !== 0) {
				var questionNr = $(element).find(".omm_current-question-number").text();
				var questionName = $(element).find(".omm_current-question-name").text();
				var questionAnswer = $(formgroup).hasClass(omm_class_calloutWrong) ? "falsch" : "richtig";
				if (questionAnswer == "richtig") {
					rightAnswers++;
					questionAnswer = "<i class='fa fa-check-circle fa-2x omm_notice'></i>&nbsp;&nbsp;richtig";
				} else {
					questionAnswer = "<i class='fa fa-times-circle fa-2x omm_notice'></i>&nbsp;&nbsp;falsch";
				}
				var tableRow = document.createElement("tr");
				$(tableRow).addClass("omm_statistic-table");
				$(tableRow).append("<td>" + questionNr + "</td><td><a href='#'>" + questionName + "</a></td><td>" + questionAnswer + "</td>");
				$(tableRow).click('click', function() {
					for (var i = 0; i < $('article').length - questionNr; i++) {
						prevSlide();
					}
				}, false);
				$(table).append(tableRow);

			}
		});
		var form = $(slide).find(".validationSlide");
		$(form).append(table);
		//Display the amount of right answers
		if (rightAnswers != totalQuestions) {
			$(form).append("<div class='alert alert-danger omm_alert-danger'>Sie haben " + rightAnswers + " von " + totalQuestions + " Fragen richtig beantwortet. Das schaffen Sie sicher besser!</div>");
		} else {
			$(form).append("<div class='alert alert-success omm_alert-success'>Herzlichen Glückwunsch, Sie haben alle Fragen richtig beantwortet. Weiter so! <i class='fa fa-thumbs-o-up'></i></div>");
		}
		var percentCorrect = Math.round((rightAnswers / totalQuestions) * 100);
		var progressbar = document.createElement("div");
		$(progressbar).addClass('progress');
		var progressbarCorrect = document.createElement("div");
		$(progressbarCorrect).addClass('progress-bar');
		$(progressbarCorrect).addClass('progress-bar-success');
		$(progressbarCorrect).attr("style", ("width:" + percentCorrect + "%"));
		var captionCorrect = document.createElement("span");
		$(captionCorrect).html(percentCorrect + '% richtig');
		$(progressbarCorrect).append(captionCorrect);
		var progressbarWrong = document.createElement("div");
		$(progressbarWrong).addClass('progress-bar');
		$(progressbarWrong).addClass('progress-bar-danger');
		$(progressbarWrong).attr("style", ("width:" + (100 - percentCorrect) + "%"));
		var captionWrong = document.createElement("span");
		$(captionWrong).html((100 - percentCorrect) + '% falsch');
		$(progressbarWrong).append(captionWrong);
		$(progressbar).append(progressbarCorrect);
		$(progressbar).append(progressbarWrong);
		$(form).append(progressbar);
		//add reset button
		var btn=document.createElement("BUTTON");
		var t=document.createTextNode("Nochmal!");
		btn.appendChild(t);
		$(btn).addClass("btn btn-primary btn-lg omm_reset-button");
		$(form).append(btn);
		$(btn).click(function(){
		    $("body").find("form").each(function(index, element){
			$(element)[0].reset();
		    });
                    history.pushState("", document.title, window.location.pathname + window.location.search);
                    });
	}
	
	
	function extractPattern(pattern) {
		var answer = pattern.split('|');
		if (answer.length > 1) {
		    var answerTemp;
		    for (var i = 0; i < answer.length; i++) {
				answerTemp = answer[i];
			var positionStar = answer[i].indexOf('*');
			if (positionStar === -1) {
			    return answerTemp;
			}
		    };
		} else {
		    return answer[0];
		}
	}

}
