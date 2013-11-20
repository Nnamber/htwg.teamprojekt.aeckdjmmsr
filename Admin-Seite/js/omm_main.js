var omm_parser = new omm_xmlParser();
var omm_display = new omm_display();
var omm_save = new omm_saveHtml();
var omm_cssSelector_themaRow = ".omm_thema-row";
var omm_cssSelector_noticePanel = "#omm_notice-panel";
var omm_cssSelector_themaTable = "#omm_thema-table";
var omm_cssSelector_selectAll = "#omm_select-all";
var omm_cssSelector_fileInput = "#omm_fileinput";
var omm_cssSelector_saveHTML = "#omm_save-html";

jQuery(document).ready(function() {
	initPopovers();
	omm_display.init();
	$(omm_cssSelector_fileInput).change(omm_parser.validateXml);
	omm_parser.readXml();
	$(omm_cssSelector_saveHTML).click(omm_save.saveHtm);
});

function initPopovers() {
	jQuery("body").popover({
		selector : '[rel=popover]',
		trigger : 'hover',
		placement : 'left'
	});
}