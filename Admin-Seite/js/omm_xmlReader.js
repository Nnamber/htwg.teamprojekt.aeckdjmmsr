function omm_xmlParser() {
    var that = this;
    var xmlFile;
    var xmlString;
    var styler = new omm_styler();

    function parse(document) {
        var topicCounter = 1;
        $(omm_cssSelector_themaTable).html("");

        //wenn versteckt, dann wiederherstellen des "Alles auswählen" Button
        $("#omm_select-all").removeClass('hidden');

        $(document).find("course").find("lesson").each(function() {
            $(omm_cssSelector_themaTable).append(htmlLesson(topicCounter, $(this).attr("name")) + questionDivHtml($(this), topicCounter) + '</div>');
            topicCounter++;
        });
        omm_display.initEventHanlder();
        omm_display.removeMessage();
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

            var wellFormedQuestionBody;
            var questionAnswers = new Array();
            if ($(this).attr("type") !== 'ClozeText') {
                wellFormedQuestionBody = styler.getWellFormedQuestionBody($(this));
                x += htmlQuestionBody(wellFormedQuestionBody);
                //div fuer Antworten erzeugen
                x += '<div class="omm_question-answers-html">';
                $(this).find('answer').each(function() {
                    questionAnswers.push($(this));
                    x += htmlQuestionAnswers($(this));
                });

                //div fuer Antworten schließen
                x += '</div>';
            } else {
                wellFormedQuestionBody = styler.getWellFormedQuestionBody($(this));
                x += htmlQuestionBodyClozeText(wellFormedQuestionBody);
            }

			x += htmlQuestionNotice($(this).attr('notice'));
            x += htmlQuestionNoticeOnWrong($(this).attr('notice_on_wrong'));
            x += htmlQuestionType($(this).attr('type'));
            x += htmlQuestionNoticeOnCorrect($(this).attr('notice_on_correct'));
            x += htmlQuestionPattern($(this).attr('pattern'));

            //div fuer Fragendetails schließen
            x += '</div></td>';

            x += htmlQuestionInfoContent(wellFormedQuestionBody, questionAnswers);
            x += '</tr>';
            questionCounter++;
        });
        x += '</table></div></div>';
        return x;
    }

    function htmlQuestionBodyClozeText(clozeString) {
        var patternG = /\[\[.+?]]+?/g;
        var patternF = /\[\[.+?]]+?/;
        var patternBracket = /(\[|])/g;

        var answers = clozeString.match(patternG);
        var body = '<div class="omm_question-body-html">';
        
        for (answer in answers) {
            var a = answers[answer].replace(patternBracket, "");
            // mehrere Antworten moeglich [[xxx | yyy]]. Take care!
            clozeString = clozeString.replace(patternF, "<div class='omm_cloze-text-input'><div class='omm-cloze-text-hidden-answer'>" + a + "</div></div>");
        }
        body += clozeString;
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
            questionAnswerHtml += '</div>';
            if ($(this).attr('notice') !== "") {
                questionAnswerHtml += '<div class="omm_answer-notice-html">';
                questionAnswerHtml += $(this).attr('notice');
                questionAnswerHtml += '</div>';
            }
            questionAnswerHtml += '</div>';
        });

        return questionAnswerHtml;

    }
    
    function htmlQuestionNotice(questionNotice){
    	var questionNoticeHtml = "";
    	questionNoticeHtml = '<div class="omm_question-notice-html">' + questionNotice + '</div>';
    	
    	return questionNoticeHtml;
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
        questionInfoContent += '<div class="omm_question-info-answer"><ol>';
        jQuery(questionAnswers).each(function(index) {
            questionInfoContent += '<li>';
            questionInfoContent += $(questionAnswers[index]).attr('body');
            questionInfoContent += '</li>';
        });
        questionInfoContent += '</ol></div>\'><i class="fa fa-info-circle fa-lg"></i></span></td>';
        return questionInfoContent;
    }


    this.readXml = function(path) {
        $.ajax({
            url: path, // name of file you want to parse
            dataType: "xml",
            success: parse,
            error: function() {
                //"Alles auswählen" Button ausblenden
                $("#omm_select-all").addClass('hidden');
                omm_display.showMessage("Die XML-Datei wurde nicht gefunden", true);
            }
        });
    };

    this.validateXml = function(input) {
        var val = input.target.files[0];
        var res = val.name.substr(val.name.lastIndexOf('.')) == '.xml';
        console.log("validateXML");
        if (!res) {
            omm_display.showMessage("Die ausgewählte Datei ist keine XML-Datei", true);
        } else {
            $(omm_cssSelector_xmlDialogForwardButton).removeAttr("disabled");
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
            xmlString = $.parseXML(xmlString);
            parse(xmlString);
        };

        r.readAsText(xmlFile);
    };
}