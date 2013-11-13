function omm_xmlParser() {
	var omm_DefaultPath = "./js/Mindmailer.xml";

	function parse(document) {
		var topicCounter = 1;
		$(document).find("course").find("lesson").each(function() {
			$("#omm_thema-table").append(htmlLesson(topicCounter, $(this).attr("name")) + questionDivHtml($(this), topicCounter) + '</div>');
			topicCounter++;
		});
		omm_display.init();

	}

	function questionDivHtml(xmlLessonObject, topicCounter) {
		var x = '<div id="collapse' + topicCounter + '" class="panel-collapse collapse">';
		x += '<div class="omm_panel-body">';
		x += '<table class="table table-striped table-hover">';
		var questionCounter = 1;

		$(xmlLessonObject).find("question").each(function() {
			// alert($(this).attr("name"));

			x += htmlQuestion(questionCounter, $(this).attr("name"));
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
		var questionHtml = '<tr ><td><input type="checkbox" class="pull-right"/></td><td>Frage ' + questionCounter + ': <span class="omm_question-title">' + questionTitle + '</span></td></tr>';
		return questionHtml;
	}


	this.readXml = function(omm_specificPath) {
		path = omm_specificPath != null ? omm_specificPath : omm_DefaultPath;
		$.ajax({
			//Pfad ueberarbeiten, z.b. mit relativem Pfad, evt Johner fragen
			url : path, // name of file you want to parse
			dataType : "xml",
			success : parse,
			error : function() {
				// $("#omm_notice-panel").addClass("omm_notice-panel-error");
				$("#omm_notice-panel").addClass("alert alert-danger");
				$("#omm_notice-panel").append('<p>Es wurde keine XML-Datei unter dem Default-Pfad gefunden</p>');
			}
		});
	};

	this.validateXml = function(input) {
		
		var val = input.val;
		var res = val.substr(val.lastIndexOf('.')) == '.xml';
		if (!res) {
			alert("wrong file");
			input.val = 'wrong file';
			return res;
		}
		
	};
	
	function 
}