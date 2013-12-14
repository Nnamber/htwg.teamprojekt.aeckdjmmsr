function omm_readSelected() {

	var generateAnswers = new omm_answerGenerator();
	var student_questionNumberArea = "omm_question-number-area";

	var htmlPage;
	var stylesheets = ['css/bootstrap.css', 'css/font-awesome.min.css', 'css/omm_slideStyle.css', 'css/styles.css'];
	var scriptSources = ['js/jquery-2.0.3.js', 'js/jquery.mobile.custom.js', 'js/iscroll-lite.js', 'js/bootstrap.min.js', 'js/slides.js', 'js/omm_validateQuestions.js', 'js/omm_dragAndDrop.js', 'js/omm_navigation.js', 'js/omm_main.js'];

	this.readSelectedQuestions = function() {
		generateHtmlPageScaffold();
		var totalQuestionNumber = insertQuestionSlides();
		insertValidationSlide(totalQuestionNumber);

		//Get browser build in serializer to serialize document element
		var htmlPageString = new XMLSerializer().serializeToString(htmlPage);
		return htmlPageString;
	};


	function generateHtmlPageScaffold() {

		//Create doucument
		htmlPage = document.implementation.createHTMLDocument(omm_applicationTitle);
		var htmlPageContent = htmlPage.documentElement;

		var head = jQuery(htmlPageContent).find("head");

		//Set meta
		var charsetMeta = document.createElement("meta");
		jQuery(charsetMeta).attr("charset", "utf-8");
		
		var viewportMeta = document.createElement("meta");
		jQuery(viewportMeta).attr({
			name: "viewport",
			content: "width=device-width, initial-scale=1.0, user-scalable=no"
			
		});
		head.append(charsetMeta, viewportMeta);
		
		//Add scripts and stylesheets
		addStylesheetLinks(head, stylesheets);
		addScriptSources(head, scriptSources);
		addFavicon(head);

		var body = jQuery(htmlPageContent).find("body");

		//hide body until goolge script.js is loaded
		body.attr("style", "visibility: hidden");
		body.append(createSection);

		//Add bottom fixed navbar
		addFooter(body);
	}

	function insertQuestionSlides() {
		var selectedQuestions = jQuery(omm_cssSelector_themaTable + " " + omm_cssSelector_panelBody + " :checked");
		var totalQuestionNumber = selectedQuestions.length;
		selectedQuestions.each(function(index, element) {
			jQuery(htmlPage.documentElement).find(".slides").append(function() {
				var article = document.createElement("article");
				//Append Question Number Area and Question titel
				jQuery(article).append(function() {
					
					return appendQuerstionNumberArea(index, element, totalQuestionNumber);
				});

				//Append Content
				jQuery(article).append(function() {
					
					//Create wrapper for iScroll
					var wrapper = document.createElement("div");
					jQuery(wrapper).addClass("wrapper");

					//Create container
					var container = document.createElement("div");
					var questionType = jQuery(element).parent().parent().find(omm_cssSelector_hiddenQuestion + " .omm_question-type-html").text();
					$(container).addClass(questionType);
					jQuery(container).addClass("container");

					var noticeOnWrong = document.createElement("div");
					var noticeOnWrongText = $(element).parent().parent().find(omm_cssSelector_hiddenQuestion + " .omm_question-notice-on-wrong-html").text();
					$(noticeOnWrong).text(noticeOnWrongText);
					$(noticeOnWrong).addClass("omm_question-notice-on-wrong-html");
					$(noticeOnWrong).addClass("hidden");

					var noticeOnRight = document.createElement("div");
					var noticeOnRightText = $(element).parent().parent().find(omm_cssSelector_hiddenQuestion + " .omm_question-notice-on-right-html").text();
					$(noticeOnRight).text(noticeOnRightText);
					$(noticeOnRight).addClass("omm_question-notice-on-right-html");
					$(noticeOnRight).addClass("hidden");

					var notice = document.createElement("div");
					var noticeText = $(element).parent().parent().find(omm_cssSelector_hiddenQuestion + " .omm_question-notice-html").text();
					$(notice).text(noticeText);
					$(notice).addClass("omm_question-notice-html");
					$(notice).addClass("hidden");

					//Create form
					//necessary for 'novalidate' attr.
					var form = document.createElement("form");
					jQuery(form).attr("novalidate", "novalidate");
					jQuery(form).attr("role", "form");
					jQuery(container).append(notice);
					jQuery(container).append(noticeOnRight);
					jQuery(container).append(noticeOnWrong);
					jQuery(container).append(form);

					var body = document.createElement("div");
					jQuery(body).addClass("form-group");
					//Append content
					//Check '.contents().clone();' instead of 'clone()' in case of failures // do not use 'children()' as it ignores TextNodes!
					jQuery(body).append(jQuery(element).parent().parent().find(omm_cssSelector_hiddenQuestion + " .omm_question-body-html").clone()); 

					generateAnswers.addStyledAnswers($(element), $(body));
					$(form).append(body);
					jQuery(wrapper).append(container)
					return wrapper;
				});
				return article;
			});
		});
		return totalQuestionNumber;
	}
	
	function appendQuerstionNumberArea (index, element, totalQuestionNumber){
		var questionTitel = jQuery(element).parent().parent().find(omm_cssSelector_questionTitle).text();

		var questionNumberArea = document.createElement("div");
		jQuery(questionNumberArea).addClass(student_questionNumberArea);
		var p = document.createElement("p");
		jQuery(p).append("Frage #<span class='omm_current-question-number'></span>/<span class='omm_total-question-number'></span>: ");
		jQuery(p).append("<span class='omm_current-question-name'>" + questionTitel + "</span>");
		jQuery(questionNumberArea).append(p);
		jQuery(questionNumberArea).find(".omm_current-question-number").append(index + 1);
		jQuery(questionNumberArea).find(".omm_total-question-number").append(totalQuestionNumber);

		return questionNumberArea;
	}

	function insertValidationSlide(totalQuestionNumber) {
		jQuery(htmlPage.documentElement).find(".slides").append(function() {
			var article = document.createElement("article");
			jQuery(article).append(function() {

				var validationTitle = "Auswertung";

				var questionNumberArea = document.createElement("div");
				jQuery(questionNumberArea).addClass(student_questionNumberArea);
				var p = document.createElement("p");
				jQuery(p).append(validationTitle, "<span class='hidden omm_current-question-number'>" + (totalQuestionNumber + 1 )+ "</span>");
				jQuery(questionNumberArea).append(p);
				return questionNumberArea;
			});

			jQuery(article).append(function() {

				//Create container
				var container = document.createElement("div");
				jQuery(container).addClass("container");

				//Create form
				//necessary for 'novalidate' attr.
				var form = document.createElement("form");
				jQuery(form).attr({
					role: "form",
					class: "validationSlide",
				});
				jQuery(container).append(form);
				jQuery(form).append("<button type='button' class='btn btn-primary btn-lg' id='checkAnswer'>Auswertung starten</button>");

				return container;
			});

			return article;
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
	
	function addFavicon(head){
		var link = document.createElement("link");
		link.rel = 'shortcut icon';
		link.type = 'image/x-icon';
		link.href = 'favicon.ico';
		head.append(link);
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
		var centerBlock = document.createElement("div");
		jQuery(centerBlock).addClass("center-block omm_navbar");
		jQuery(centerBlock).append("<span class='pull-left'><a href='#'><i class='fa fa-angle-double-left omm_arrow-first-page'></i></a><a href='#'><i class='fa fa-angle-left omm_arrow-left'></i></a></span><span class='pull-right'><a href='#'><i class='fa fa-angle-right omm_arrow-right'></i></a><a href='#'><i class='fa fa-angle-double-right omm_arrow-last-page'></i></a></span>");

		jQuery(nav).append(centerBlock);
		jQuery(footer).append(nav);
		body.append(footer);
	}

}
