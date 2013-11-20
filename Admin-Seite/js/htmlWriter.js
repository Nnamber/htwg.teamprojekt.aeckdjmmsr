function omm_saveHtml() {
	this.saveHtml = function() {
		var fileName = $(omm_cssSelector_htmlFileName).val();
		if(fileName == (" " | "" | null)){
			fileName = "Mindmailer";
		}
		var blob = new Blob(["Hello, world!"], {
		type : "text/plain;charset=utf-8"
		});
		saveAs(blob, fileName+".html");
	};
}