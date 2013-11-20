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

	function questionDivHtml(xmlLessonObject, topicCounter) {
		var x = '<div id="collapse' + topicCounter + '" class="panel-collapse collapse">';
		x += '<div class="omm_panel-body">';
		x += '<table class="table table-striped table-hover">';
		var questionCounter = 1;
		$(xmlLessonObject).find("question").each(function() {
			x += '<tr>';
			x += htmlQuestion(questionCounter, $(this).attr("name"));

			if ($(this).attr("type") != 'ClozeText') {
				x += htmlQuestionBody($(this).attr('body'));
			} else {
				// bodyMap = arminFunktion($(this).attr('body'));
				// x += htmlQuestionBody(bodyMap[body]);
			}
			x += htmlQuestionInfoContent();
			x += '</tr>';
			questionCounter++;
		});
		x += '</table></div></div>';
		return x;
	}

	function htmlLesson(lessonCounter, lessonTitle) {
		var lessonHtml = '<div class="panel panel-default omm_thema-row"><div class="panel-heading"><div class="panel-title"><input type="checkbox"/><a data-toggle="collapse" data-parent="#omm_thema-table" href="#collapse' + lessonCounter + '"> Thema ' + lessonCounter + ': <span class="omm_lesson-title">' + lessonTitle + '</span></a></div></div>';
		return lessonHtml;
	}

	function htmlQuestion(questionCounter, questionTitle) {
		var questionHtml = '<td><input type="checkbox" class="pull-right"/></td><td>Frage ' + questionCounter + ': <span class="omm_question-title">' + questionTitle + '</span></td>';
		return questionHtml;
	}

	function htmlQuestionBody(questionBody, questionCounter) {
		var questionBodyHtml = '<td><div class="hidden omm_question_body_html">' + questionBody + '</div></td>';
		return questionBodyHtml;
	}

	function htmlQuestionInfoContent() {
		var questionInfoContent = '<td><span class="omm_question-info" rel="popover" data-content="This button was added dynamically by JavaScript"><i class="fa fa-info fa-lg"></i></span></td>';
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