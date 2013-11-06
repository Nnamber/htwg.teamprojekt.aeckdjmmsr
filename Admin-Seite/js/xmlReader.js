$(document).ready(function() {
	var omm_DefaultPath = "Mindmailer.xml";
	readXml();

	function parse(document) {
		var topicCounter = 1;
		$(document).find("course").find("lesson").each(function() {
			$("#omm_thema-table").append('<div class="panel panel-default omm_thema-row"><div class="panel-heading">' + '<div class="panel-title"><input type="checkbox"/><a data-toggle="collapse" data-parent="#omm_thema-table" href="#collapse'+topicCounter+'">' + ' Thema ' + topicCounter + ': <span class="omm_lesson-title">' + $(this).attr("name") + '</span></a></div></div></div>');
			topicCounter++;
		});
	}

	function readXml() {
		$.ajax({
			//Pfad ueberarbeiten, z.b. mit relativem Pfad, evt Johner fragen
			url : './js/Mindmailer.xml', // name of file you want to parse
			dataType : "xml",
			success : parse,
			error : function() {
				// $("#omm_notice-panel").addClass("omm_notice-panel-error");
				$("#omm_notice-panel").addClass("alert alert-danger");
				$("#omm_notice-panel").append('<p>Es wurde keine XML-Datei unter dem Default-Pfad gefunden</p>');

			}
		});
	}

});
