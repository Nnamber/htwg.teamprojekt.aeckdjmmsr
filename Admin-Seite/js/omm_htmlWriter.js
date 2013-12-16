function omm_saveHtml() {

	this.saveHtml = function() {
		var fileName = $(omm_cssSelector_htmlFileName).val();
		if (fileName == (" " | "" | null)) {
			fileName = "Mindmailer";
		}
		var blob = new Blob([omm_readSelected.readSelectedQuestions()], {
			type : "application/html;charset=utf-8"
		});
		saveAs(blob, fileName + ".html");
	};
}