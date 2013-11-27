function omm_readSelected() {

    var htmlPageContent;

    this.readSelectedQuestions = function() {
        generateHtmlPageSkeleton();



        insertQuestionSlides();

        var htmlPageContentString = jQuery(htmlPageContent).html();
        return htmlPageContentString;
    };

    function generateHtmlPageSkeleton() {
        htmlPageContent = document.createElement("html");
        jQuery(htmlPageContent).html("<head></head><body></body>");
    }

    function insertQuestionSlides() {
        jQuery(omm_cssSelector_themaTable + " " + omm_cssSelector_panelBody + " :checked").each(function(index, element) {
            jQuery(htmlPageContent).find("body").append(function() {
                var article = document.createElement("article");
                jQuery(article).append(function(){
                    return jQuery(element).parent().parent().find(omm_cssSelector_hiddenQuestion);
                });
                return article;
            });
        });
    }
}