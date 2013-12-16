function omm_connector (){
	
	this.getXMLFileListAjax = function (){
		jQuery.ajax({
			url: omm_url_xmlFileList,
			type: 'GET',
			dataType: 'json',
			error: function(jqXHR, textStatus, errorThrown) {
				omm_display.showMessage("Verbindung zum Server konnte nicht hergestellt werden", true);
			},
			success: function(data, textStatus, jqXHR) {
				omm_display.insertXMLFileList(data);
			}
		});
	};
	
	this.uploadFileAjax = function (formData){
		$.ajax({
			url: "php/fileupload.php",
			type: "post",
			data: formData,
			cache: false,
			contentType: false,
			processData: false,
			success: function(data) {
				var message = $.parseJSON(data).message;
				omm_display.showMessage("Datei erfolgreich hochgeladen: " + message, false);
			},
			error: function() {
				omm_display.showMessage("Fehler beim Upload, nochmals versuchen!", true);
			}
		}); 
	};
	
	
	
}
