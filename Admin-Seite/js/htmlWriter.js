function omm_saveHtml() {
	this.saveHtm = function() {

		
		var blob = new Blob(["Hello, world!"], {
		type : "text/plain;charset=utf-8"
		});
		saveAs(blob, "hello world.html");
	};
}