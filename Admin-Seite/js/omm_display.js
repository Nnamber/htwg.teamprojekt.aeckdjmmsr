function omm_display() {
	//private variables
	var themaTable;
	var noticePanel;

	//public
	this.init = function() {
		themaTable = jQuery(omm_cssSelector_themaTable);
		noticePanel = jQuery(omm_cssSelector_noticePanel);
	};
	this.initEventHanlder = function() {
		initCheckAllEventHandler();
		initCheckThemaEventHandler();
		initGeneratehtmlFromCheckedEventHandler();
		initIndeterminateCheckboxesEventHandler();
	};

	this.showMessage = function(message, isError) {
		//Ersetzt Inhalt des noticePanels
		jQuery(noticePanel).html(message);
		if (isError) {
			noticePanel.addClass("alert alert-danger");
		} else {
			noticePanel.addClass("alert alert-success");
		}
	};

	this.removeMessage = function() {
		//Alert löschen
		jQuery(noticePanel).html(" ");
		noticePanel.removeClass();
	};

	//private
	function initCheckThemaEventHandler() {
		var themaCheckboxes = jQuery(themaTable).find(omm_cssSelector_themaRow + " .panel-heading :checkbox");
		jQuery(themaCheckboxes).change(function(eventObject) {
			var checkboxes = jQuery(this).parents(omm_cssSelector_themaRow).find(":checkbox");

			if (jQuery(this).prop('checked') === true) {
				checkboxes.prop("checked", true);
			} else {
				checkboxes.prop("checked", false);
			}
		});
	}

	function initCheckAllEventHandler() {
		jQuery(omm_cssSelector_selectAll + " :checkbox").change(function(eventObject) {
			var allCheckboxes = jQuery(themaTable).find(":checkbox");
			if (jQuery(this).prop('checked') === true) {
				allCheckboxes.prop("checked", true);
			} else {
				allCheckboxes.prop("checked", false);
			}
		});
	}

	function initGeneratehtmlFromCheckedEventHandler() {
		jQuery(omm_cssSelector_saveHTML).click(omm_save.saveHtml);
	}

	function initIndeterminateCheckboxesEventHandler() {

		jQuery(".omm_panel-body").find('input[type="checkbox"]').change(function(element) {
			var isChecked = $(this).prop('checked');
			// var parentBox = $(this).parent().parent(".omm_thema-row").find("div.panel-title > :input");
			var container = $(this).parent("td").parent("tr").parent("tbody");

			function checkSiblings(container) {
				var parentCheckBox = $(container).parent("table").parent(".omm_panel-body").parent(".panel-collapse").parent(".omm_thema-row").find("div.panel-title > :input");
				var allChecked = true;
				
				container.children().each(function() {
				  return allChecked = ($(this).find('input[type="checkbox"]').prop('checked') === isChecked);
				});
				
				if(allChecked && isChecked){
					$(parentCheckBox).prop({indeterminate: false, checked: true});
				}else if(allChecked && !isChecked){
					$(parentCheckBox).prop({checked: isChecked, indeterminate: false});
					// $(parentCheckBox).prop("indeterminate", false);//(parent.find('.panel-title input[type="checkbox"]').length > 0));
				}else{
					$(parentCheckBox).prop({indeterminate: true, checked: false});
				}
			}

			checkSiblings(container);
		});

	}

};;