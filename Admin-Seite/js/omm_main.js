var omm_parser = new omm_xmlParser();
var omm_display = new display();
var omm_cssSelector_themaRow = ".omm_thema-row";
var omm_cssSelector_noticePanel = "#omm_notice-panel";
var omm_cssSelector_themaTable = "#omm_thema-table";
var omm_cssSelector_selectAll = "#omm_select-all";

jQuery(document).ready(function(){
	document.getElementById('fileinput').addEventListener('change', omm_parser.validateXml, false);
	omm_parser.readXml();
	// omm_display.showMessage("Bier", true);
	// omm_display.showMessage("mehr Bier", false);
	
});
