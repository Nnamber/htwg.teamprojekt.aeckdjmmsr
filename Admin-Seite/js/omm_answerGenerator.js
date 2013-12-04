function omm_answerGenerator() {

    this.getStyledAnswers = function(question) {
        var x = "";
        x += '<div class="omm_question-answers-html">';
        console.log($(question).parent().parent().find(omm_cssSelector_hiddenQuestion + " .omm_question-type-html").text());

        x += answerDespatcher(question);
        //div fuer Antworten schließen
        x += '</div>';
        return x;
    };

    function answerDespatcher(question) {
        var questionTyp = $(question).parent().parent().find(omm_cssSelector_hiddenQuestion + " .omm_question-type-html").text();
        var x = "";
        switch (questionTyp) {
            case "MultipleChoice":
                x += multipleChoiceGenerator(question);
                break;
            case "ClozeText":
                alert("Sie sind ein aufrichtiger Zweibeiner");
                break;
            case "OpenQuestion":
                x += openQuestionGenerator(question);
                break;
            case "MatchTask":
                x += matchTaskGenerator(question);
                break;
            case "SingleChoice":
                x += singleChoiceGenerator(question);
                break;
        }
        return x;
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

    function matchTaskGenerator(question) {
        var x = "";
        //name for the radio buttons has to be the same but should be unique site wise
        //need to find a better solution
        var i = 0;
        $(question).parent().parent().find(omm_cssSelector_hiddenQuestion + " .omm_question-answers-html").children().each(function(index, element) {
            var nameVariable = $(element)[0].childNodes[0].nodeValue.trim();

            x += '<div class="omm_answer-field"><div class="omm_droppable-answer">' + nameVariable + '</div>';
            x += '<div id="' + i + '" class="omm_droppable" name="' + nameVariable + '" ondrop="drop(event)" ondragover="allowDrop(event)"></div></div>';
            i += 1;
        });
        
        x += '<div ondrop="drop(event)" id="answerField" ondragover="allowDrop(event)" class="omm_answer-field-big">';
        $(question).parent().parent().find(omm_cssSelector_hiddenQuestion + " .omm_question-answers-html").children().each(function(index, element) {
            var answerName = Math.random();
            var nameVariable = $(element)[0].childNodes[0].nodeValue.trim();
            var dragNDropAnswer = $(element).find('.omm_answer-notice-html').text();

            x += '<div class="omm_draggable btn-default" id="'+ answerName +'" draggable="true" ondragstart="drag(event)"name="'+nameVariable+'">';
            x += dragNDropAnswer;
            x += '</div>';
        });
        x += '</div>';
        return x;
    }

}