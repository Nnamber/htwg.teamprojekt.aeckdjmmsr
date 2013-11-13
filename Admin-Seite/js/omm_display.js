function display() {
	//private variables
	var themaTable;
	var noticePanel;

	//pulbic
	this.init = function() {
		themaTable = jQuery(omm_cssSelector_themaTable);
		noticePanel = jQuery(omm_cssSelector_noticePanel);

		initCheckThemaEventHandler();
		initCheckAllEventHandler();
	};
	this.showMessage = function(message, isError) {
		//Ersetzt
		jQuery(noticePanel).html("<div>" + message + "</div>");
		var alertBox = jQuery(noticePanel).find("div");
		if (isError) {
			alertBox.addClass("alert alert-danger");
		} else {
			alertBox.addClass("alert alert-success");
		}

	};

	//private
	function initCheckThemaEventHandler() {
		var themaCheckboxes = jQuery(themaTable).find(omm_cssSelector_themaRow + " .panel-heading :checkbox");
		jQuery(themaCheckboxes).change(function(eventObject) {
			var checkboxes = jQuery(this).parents(omm_cssSelector_themaRow).find(":checkbox");

			if (jQuery(this).prop('checked') == true) {
				checkboxes.prop("checked", true);
			} else {
				checkboxes.prop("checked", false);
			}
		});
	}

	function initCheckAllEventHandler() {
		jQuery(omm_cssSelector_selectAll + " :checkbox").change(function(eventObject) {
			var allCheckboxes = jQuery(themaTable).find(":checkbox");
			if (jQuery(this).prop('checked') == true) {
				allCheckboxes.prop("checked", true);
			} else {
				allCheckboxes.prop("checked", false);
			}
		});

	}

};