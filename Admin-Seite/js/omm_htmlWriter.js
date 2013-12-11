function omm_saveHtml() {

	var readSelected = new omm_readSelected();

	this.saveHtml = function() {
		var fileName = $(omm_cssSelector_htmlFileName).val();
		if (fileName == (" " | "" | null)) {
			fileName = "Mindmailer";
		}
		var blob = new Blob([readSelected.readSelectedQuestions()], {
			type : "application/html;charset=utf-8"
		});
		saveAs(blob, fileName + ".html");
	};
}