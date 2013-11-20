function omm_xmlParser() {
	var omm_DefaultPath = "./js/Mindmailer.xml";
	var that = this;
	var xmlFile;
	var xmlString;

	function parse(document) {
		var topicCounter = 1;
		$(omm_cssSelector_themaTable).html("");
		$(document).find("course").find("lesson").each(function() {
			$(omm_cssSelector_themaTable).append(htmlLesson(topicCounter, $(this).attr("name")) + questionDivHtml($(this), topicCounter) + '</div>');
			topicCounter++;
		});
		omm_display.initEventHanlder();
	}

	//schreibt die Fragen mit benoetigten Antworten, Hinweisen, etc. in ein div Element welches durch die CSS-Klasse "hidden" versteckt wird
	function questionDivHtml(xmlLessonObject, topicCounter) {
		var x = '<div id="collapse' + topicCounter + '" class="panel-collapse collapse">';
		x += '<div class="omm_panel-body">';
		x += '<table class="table table-striped table-hover">';
		var questionCounter = 1;

		//fuer jede Frage im XML-Dokument
		$(xmlLessonObject).find("question").each(function() {
			x += '<tr>';
			//Geruest fuer Frage bereitstellen, so wie Fragennummer, Titel, Tabelle und Checkbox
			x += htmlQuestion(questionCounter, $(this).attr("name"));

			//DIV-Element fuer Details der Frage
			x += '<td><div class="hidden omm_question">';

			var questionBody;
			if ($(this).attr("type") != 'ClozeText') {
				questionBody = $(this).attr('body');
				x += htmlQuestionBody($(this).attr('body'));
				//div fuer Antworten erzeugen
				x += '<div class="omm_question-answers-html">';
				$(this).find('answer').each(function() {
					x += htmlQuestionAnswers($(this));
				});

				//div fuer Antworten schließen
				x += '</div>';
			} else {
				questionBody = $(this).attr('body');
				x += htmlQuestionBodyClozeText($(this).attr('body'));
			}

			x += htmlQuestionNoticeOnWrong($(this).attr('notice_on_wrong'));
			x += htmlQuestionType($(this).attr('type'));
			x += htmlQuestionNoticeOnCorrect($(this).attr('notice_on_correct'));
			x += htmlQuestionPattern($(this).attr('pattern'));

			//div fuer Fragendetails schließen
			x += '</div></td>';

			x += htmlQuestionInfoContent(questionBody);
			x += '</tr>';
			questionCounter++;
		});
		x += '</table></div></div>';
		return x;
	}

	function htmlQuestionBodyClozeText(clozeString) {
		var patternG = /\[\[.+?]]*?/g;
		var patternF = /\[\[.+?]]*?/;
		var patternBracket = /(\[|])/g;

		var answers = clozeString.match(patternG);
		var body = '<div class="omm_question-body-html">';
		for (answer in answers) {
			var a = answers[answer].replace(patternBracket, "");
			// eckige Klammern zur besseren Kennzeichnung eingefügt. Optional. Allerdings mehrere Antworten möglich [[xxx | yyy]]. Take care!
			body += clozeString.replace(patternF, "<div class='omm_cloze-text-input'><div class='omm-cloze-text-hidden-answer'>[[" + a + "]]</div><input type='text' value='STUPID TEXTFIELD, TODO'/></div>");
			console.log(body);
		}
		body += '</div>';

		return body;
	}

	function htmlLesson(lessonCounter, lessonTitle) {
		var lessonHtml = '<div class="panel panel-default omm_thema-row"><div class="panel-heading"><div class="panel-title"><input type="checkbox"/><a data-toggle="collapse" data-parent="#omm_thema-table" href="#collapse' + lessonCounter + '"> Thema ' + lessonCounter + ': <span class="omm_lesson-title">' + lessonTitle + '</span></a></div></div>';
		return lessonHtml;
	}

	function htmlQuestion(questionCounter, questionTitle) {
		var questionHtml = '<td><input type="checkbox" class="pull-right"/></td><td>Frage ' + questionCounter + ': <span class="omm_question-title">' + questionTitle + '</span></td>';
		return questionHtml;
	}

	function htmlQuestionBody(questionBody) {
		var questionBodyHtml = '<div class="omm_question-body-html">' + questionBody + '</div>';
		return questionBodyHtml;
	}

	function htmlQuestionAnswers(questionAnswers) {
		var questionAnswerHtml = "";

		$(questionAnswers).each(function() {
			questionAnswerHtml += '<div class="omm_answer-body-html">';
			questionAnswerHtml += $(this).attr('body');
			questionAnswerHtml += '<div class="omm_answer-correct-html">';
			questionAnswerHtml += $(this).attr('correct');
			questionAnswerHtml += '</div></div>';
		});

		return questionAnswerHtml;

	}

	function htmlQuestionNoticeOnWrong(questionNoticeOnWrong) {
		var questionNoticeOnWrongHtml = "";
		questionNoticeOnWrongHtml = '<div class="omm_question-notice-on-wrong-html">' + questionNoticeOnWrong + '</div>';

		return questionNoticeOnWrongHtml;
	}

	function htmlQuestionType(questionType) {
		var questionTypeHtml = "";
		questionTypeHtml = '<div class="omm_question-type-html">' + questionType + '</div>';

		return questionTypeHtml;
	}

	function htmlQuestionNoticeOnCorrect(questionNoticeOnCorrect) {
		var questionNoticeOnCorrectHtml = "";

		questionNoticeOnCorrectHtml = '<div class="omm_question-notice-on-correct-html">' + questionNoticeOnCorrect + '</div>';
		return questionNoticeOnCorrectHtml;
	}

	function htmlQuestionPattern(questionPattern) {
		var questionPatternHtml = "";
		questionPatternHtml = '<div class="omm_question-pattern-html">' + questionPattern + '</div>';

		return questionPatternHtml;
	}

	function htmlQuestionInfoContent(questionBody, questionAnswers) {
		var questionInfoContent = '<td><span class="omm_question-info" rel="popover" data-content=\'' + questionBody;
		questionInfoContent += '\'><i class="fa fa-info fa-lg"></i></span></td>';
		return questionInfoContent;
	}


	this.readXml = function() {
		$.ajax({
			//Pfad ueberarbeiten, z.b. mit relativem Pfad, evt Johner fragen
			url : omm_DefaultPath, // name of file you want to parse
			dataType : "xml",
			success : parse,
			error : function() {
				omm_display.showMessage("Es wurde keine XML-Datei unter dem Default-Pfad gefunden", true);
			}
		});
	};

	this.validateXml = function(input) {
		var val = input.target.files[0];
		var res = val.name.substr(val.name.lastIndexOf('.')) == '.xml';
		console.log("validateXML");
		if (!res) {
			//ToDO: Fehlernachricht überarbeiten
			omm_display.showMessage("Wrong Type", true);
		} else {
			$("#omm_xml-dialog-uebernehmen").removeAttr("disabled");
			xmlFile = val;
		}
	};

	//Liest XML aus uns speichert das Ergbenis zunächst als String, dann parsen auf XML-String
	this.parseXMLToVariable = function() {
		var r = new FileReader();
		r.onload = function(e) {
			var xmlString;
			var contents = e.target.result;
			xmlString = contents;
			//console.log(xmlString);
			xmlString = $.parseXML(xmlString);
			parse(xmlString);
		};

		r.readAsText(xmlFile);
	};
}