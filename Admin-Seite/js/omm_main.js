var omm_parser = new omm_xmlParser();
var omm_display = new omm_display();
var omm_save = new omm_saveHtml();
var omm_connector = new omm_connector();
var omm_readSelected = new omm_readSelected();
var omm_url_xmlFileList = "php/readfilesdir.php";
var omm_applicationTitle = "Mindmailer";
var omm_DefaultPath = "./xmlFiles/Mindmailer.xml";
var omm_serverFileRadioButtonName = "serverFileName";

//Selectors
var omm_cssSelector_uploadHTML = "#omm_upload-html";
var omm_cssSelector_uploadFormHTML = "#omm_upload-form";
var omm_cssSelector_uploadedFile = "#omm_uploaded-file";
var omm_cssSelector_saveAsDownload = "#omm_radio-download";
var omm_cssSelector_htmlFileName = "#omm_file-name";
var omm_cssSelector_sourcePath = "#omm_source-path";
var omm_cssSelector_themaRow = ".omm_thema-row";
var omm_cssSelector_panelBody = ".omm_panel-body";
var omm_cssSelector_noticePanel = "#omm_notice-panel";
var omm_cssSelector_themaTable = "#omm_thema-table";
var omm_cssSelector_selectAll = "#omm_select-all";
var omm_cssSelector_fileInput = "#omm_fileinput";
var omm_cssSelector_saveHTML = "#omm_save-html";
var omm_cssSelector_hiddenQuestion = ".omm_question";
var omm_cssSelector_questionTitle = ".omm_question-title";
var omm_cssSelector_clozeTextInput = ".omm_cloze-text-input";
var omm_cssSelector_ommClozeTextHiddenAnswer = ".omm-cloze-text-hidden-answer";
var omm_cssSelector_saveDialog = "#omm_xml-save-dialog";
var omm_cssSelector_readDialog = "#omm_xml-read-dialog";
var omm_cssSelector_modalXMLFileListTabel = "#xml-file-list tbody";


jQuery(document).ready(function() {
	$(':checkbox:checked').prop('checked', false);
	initPopovers();
	omm_display.init();
	$(omm_cssSelector_fileInput).change(omm_parser.validateXml);
	omm_parser.readXml();
});

function initPopovers() {
	jQuery("body").popover({
		selector : '[rel=popover]',
		trigger : 'hover',
		placement : getPlacementFunction('left', 500, 500),
		html : true
	});
}

var getPlacementFunction = function(defaultPosition, width, height) {
	return function(tip, element) {
		var position, top, bottom, left, right;

		var $element = $(element);
		var boundTop = $(document).scrollTop();
		var boundLeft = $(document).scrollLeft();
		var boundRight = boundLeft + $(window).width();
		var boundBottom = boundTop + $(window).height();

		var pos = $.extend({}, $element.offset(), {
			width : element.offsetWidth,
			height : element.offsetHeight
		});

		var isWithinBounds = function(elPos) {
			return boundTop < elPos.top && boundLeft < elPos.left && boundRight > (elPos.left + width) && boundBottom > (elPos.top + height);
		};

		var testTop = function() {
			if (top === false)
				return false;
			top = isWithinBounds({
				top : pos.top - height,
				left : pos.left + pos.width / 2 - width / 2
			});
			return top ? "top" : false;
		};

		var testBottom = function() {
			if (bottom === false)
				return false;
			bottom = isWithinBounds({
				top : pos.top + pos.height,
				left : pos.left + pos.width / 2 - width / 2
			});
			return bottom ? "bottom" : false;
		};

		var testLeft = function() {
			if (left === false)
				return false;
			left = isWithinBounds({
				top : pos.top + pos.height / 2 - height / 2,
				left : pos.left - width
			});
			return left ? "left" : false;
		};

		var testRight = function() {
			if (right === false)
				return false;
			right = isWithinBounds({
				top : pos.top + pos.height / 2 - height / 2,
				left : pos.left + pos.width
			});
			return right ? "right" : false;
		};

		switch (defaultPosition) {
			case "top":
				if ( position = testTop())
					return position;
			case "bottom":
				if ( position = testBottom())
					return position;
			case "left":
				if ( position = testLeft())
					return position;
			case "right":
				if ( position = testRight())
					return position;
			default:
				if ( position = testTop())
					return position;
				if ( position = testBottom())
					return position;
				if ( position = testLeft())
					return position;
				if ( position = testRight())
					return position;
				return defaultPosition;
		}
	};
};
