function omm_readSelected() {

    var htmlPageContent;

    this.readSelectedQuestions = function() {
        generateHtmlPageScaffold();



        insertQuestionSlides();

        var htmlPageContentString = jQuery(htmlPageContent).html();
        return htmlPageContentString;
    };

    function generateHtmlPageScaffold() {
        htmlPageContent = document.createElement("html");
        jQuery(htmlPageContent).html("<head></head><body></body>");
        var head = jQuery(htmlPageContent).find("head");
        head.html("<title>Presentation</title><meta charset='utf-8'><!-- Bootstrap core CSS --><link href='css/bootstrap.min.css' rel='stylesheet'><!-- Icons--><link href='css/font-awesome.min.css' rel='stylesheet'><!-- Bootstrap core JavaScript --><script src='js/jquery-2.0.3.js'></script><script src='js/bootstrap.min.js'></script><!-- OMM JavaScript--><script src='./js/slides.js'></script><script src='js/omm_validateQuestions.js'></script><script src='js/omm_main.js'></script>");
        var body = jQuery(htmlPageContent).find("body");
        //hide body until goolge script.js is loaded
        body.style = "display: none";
        body.append("<section class='slides layout-regular'></section>")
    }

    function insertQuestionSlides() {
        jQuery(omm_cssSelector_themaTable + " " + omm_cssSelector_panelBody + " :checked").each(function(index, element) {
            jQuery(htmlPageContent).find(".slides").append(function() {
                var article = document.createElement("article");
                jQuery(article).append(function() {
                    var articleContent = jQuery(element).parent().parent().find(omm_cssSelector_hiddenQuestion).children().clone();
                    return articleContent;
                });
                return article;
            });
        });
    }
}