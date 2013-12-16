var omm_url_xmlFileList = "php/readfilesdir.php";

function omm_connector (){
	
	this.getXMLFileListAjax = function (){
		var response;
		jQuery.ajax({
			url: omm_url_xmlFileList,
			type: 'GET',
			error: function(jqXHR, textStatus, errorThrown) {
				omm_display.showMessage("Verbindung zum Server konnte nicht hergestellt werden", true);
			},
			success: function(data, textStatus, jqXHR) {
				response = data;
			}
		});
		return response;
	};
	
	
	
}
