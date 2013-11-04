function display() {
	//private variables
	var themaTable;

	//pulbic
	this.init = function(table) {
		themaTable = table;

		initCheckThemaEventHandler();
	};

	//private
	function initCheckThemaEventHandler() {
		var themaCheckboxes = jQuery(themaTable).find(omm_cssSelector_themaRow + " .panel-heading :checkbox");
		jQuery(themaCheckboxes).change(function(eventObject) {
			var checkboxes = jQuery(this).parents(omm_cssSelector_themaRow).find(":checkbox");
			
			if (jQuery(this).prop('checked') == true) {
				checkboxes.prop("checked", true);
			}else{
				checkboxes.prop("checked", false);
			}
		});
	}

};