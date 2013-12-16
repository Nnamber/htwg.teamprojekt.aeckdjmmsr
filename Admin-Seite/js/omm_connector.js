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
	
	
	
}
