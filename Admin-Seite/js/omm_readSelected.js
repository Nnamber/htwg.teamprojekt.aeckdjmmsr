function omm_readSelected() {

	var htmlPageContent;
	var stylesheets = ['css/bootstrap.css', 'css/font-awesome.min.css', 'css/omm_slideStyle.css'];
	var scriptSources = ['js/jquery-2.0.3.js', 'js/bootstrap.min.js', 'js/slides.js', 'js/omm_validateQuestions.js', 'js/omm_main.js'];

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
		head.append("<title>Presentation</title><meta charset='utf-8'>");

		//Add scripts and stylesheets
		addStylesheetLinks(head, stylesheets);
		addScriptSources(head, scriptSources);

		var body = jQuery(htmlPageContent).find("body");

		//hide body until goolge script.js is loaded
		body.attr("style", "display: none");
		body.append(createSection);

		//Add bottom fixed navbar
		addFooter(body);
	}

	function insertQuestionSlides() {

		jQuery(omm_cssSelector_themaTable + " " + omm_cssSelector_panelBody + " :checked").each(function(index, element) {
			jQuery(htmlPageContent).find(".slides").append(function() {
				var article = document.createElement("article");
				jQuery(article).append(function() {

					//Create container
					var container = document.createElement("div");
					jQuery(container).addClass("container");

					//Create form
					//necessary for 'novalidate' attr.
					var form = document.createElement("form");
					jQuery(form).attr("novalidate", "novalidate");
					jQuery(form).attr("role", "form");
					jQuery(container).append(form);

					var body = document.createElement("div");
					jQuery(body).attr("class", "form-group");
					//Append content
					jQuery(body).append(jQuery(element).parent().parent().find(omm_cssSelector_hiddenQuestion + " .omm_question-body-html").children().clone());
					$(form).append(omm_generateAnswers.getStyledAnswers($(element)));
					return container;
				});
				return article;
			});
		});
	}

	function createSection() {
		var section = document.createElement("section");
		section.className = "slides layout-regular";
		return section;
	}

	function addStylesheetLinks(head, stylesheets) {
		jQuery(stylesheets).each(function(index) {
			var link = document.createElement("link");
			link.rel = 'stylesheet';
			link.href = stylesheets[index];
			head.append(link);
		});
	}

	function addScriptSources(head, sources) {
		jQuery(sources).each(function(index) {
			var script = document.createElement("script");
			script.src = sources[index];
			head.append(script);
		});
	}

	function addFooter(body) {
		var footer = document.createElement("div");
		jQuery(footer).attr("id", "footer");
		jQuery(footer).addClass("container");
		var nav = document.createElement("nav");
		jQuery(nav).addClass("navbar navbar-fixed-bottom");
		var inner = document.createElement("div");
		jQuery(inner).addClass("navbar-inner navbar-content-center");

		jQuery(nav).append(inner);
		jQuery(footer).append(nav);
		body.append(footer);
	}

}