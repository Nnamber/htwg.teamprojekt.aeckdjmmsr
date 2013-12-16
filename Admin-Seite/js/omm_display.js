function omm_display() {
	//private variables
	var themaTable;
	var noticePanel;

	//public
	this.init = function() {
		themaTable = jQuery(omm_cssSelector_themaTable);
		noticePanel = jQuery(omm_cssSelector_noticePanel);
		initCloseModalEventHandler();
		initUploadHTMLEventHandler();
		initGeneratehtmlFromCheckedEventHandler();
		initReadXmlModalButtonEventHandler();
		initReadXmlModalCheckboxEventHandler();
		initShowReadXMLModalEventHandler();
	};
	this.initEventHanlder = function() {
		initCheckAllEventHandler();
		initCheckThemaEventHandler();
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
	
	this.insertXMLFileList = function(fileNameList) {
		var tableBody = jQuery(omm_cssSelector_xmlDialogFileListTabel);
		//Remove all child elements of the table
		jQuery(tableBody).empty();
		jQuery(fileNameList).each(function(index, element) {
			var tr = document.createElement("tr");
			jQuery(tr).append(
					"<td><input type='radio' name='" + omm_serverFileRadioButtonName + "' value='"+ element +"'></td>",
					"<td>" + element + "</td>"
					);
			jQuery(tableBody).append(tr);
		});
	};
	
	function initReadXmlModalButtonEventHandler (){
		jQuery(omm_cssSelector_xmlDialogForwardButton).click(function(){
			if (jQuery(omm_cssSelector_chooseFromFileListCheckbox).is(" :checked")) {
				var form = jQuery(omm_cssSelector_xmlDialogTableForm).serializeArray();
				omm_parser.readXml("./xmlFiles/" + form[0].value);
			}else{
				omm_parser.parseXMLToVariable();
			}
		});
	}
	
	function initReadXmlModalCheckboxEventHandler (){
		jQuery(omm_cssSelector_chooseFromFileListCheckbox).click(function(event){
			if (jQuery(omm_cssSelector_chooseFromFileListCheckbox).is(" :checked")){
				jQuery(omm_cssSelector_xmlDialogForwardButton).prop("disabled", false);
				jQuery(omm_cssSelector_xmlDialogModalHide).slideToggle();
				
			}else{
				jQuery(omm_cssSelector_xmlDialogForwardButton).prop("disabled", true);
				jQuery(omm_cssSelector_xmlDialogModalHide).slideToggle();
			}
		});
	}
	
	function initShowReadXMLModalEventHandler (){
		jQuery(omm_cssSelector_readDialog).on("show.bs.modal", function(event){
			omm_connector.getXMLFileListAjax();
		});
	}
	
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

	function initUploadHTMLEventHandler(){
		$(omm_cssSelector_uploadHTML).click(function() {
			var formData = new FormData($(omm_cssSelector_uploadFormHTML)[0]);
			omm_connector.uploadFileAjax(formData);
		});
	}

	function initCheckAllEventHandler() {
		jQuery(omm_cssSelector_selectAll + " :checkbox").change(function(eventObject) {
			var allCheckboxes = jQuery(themaTable).find(":checkbox");
			allCheckboxes.prop("indeterminate", false);
			if (jQuery(this).prop('checked') === true) {
				allCheckboxes.prop("checked", true);
			} else {
				allCheckboxes.prop("checked", false);
			}
		});
	}

	function initGeneratehtmlFromCheckedEventHandler() {
		jQuery(omm_cssSelector_saveHTML).click(function(){
			if($(omm_cssSelector_saveAsDownload).is(':checked')){
				omm_save.saveHtml();
			}else{
				var fileName = $(omm_cssSelector_htmlFileName).val();
				if (fileName == (" " | "" | null)) {
					fileName = "Mindmailer";
				}
				var filenameAndHtmlString = {htmlString: omm_readSelected.readSelectedQuestions(), filename: fileName };
				$.ajax({
				      url: "php/savemodel.php",
				      type: "post",
				      data: filenameAndHtmlString,
				      success: function(data){
				      	var message = $.parseJSON(data).message;
	          			omm_display.showMessage("Datei erfolgreich hochgeladen: " + message, false);
				      },
				      error:function(){
              			  omm_display.showMessage("Fehler beim Upload, nochmals versuchen!", true);
				      }   
				    }); 
			}
		});
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
	
	function initCloseModalEventHandler() {
		jQuery(omm_cssSelector_saveDialog).on('hidden.bs.modal', function(eventObject) {
			clearModalButtons(eventObject.target);
			clearModalFormInputValues(eventObject.target);
		});
		jQuery(omm_cssSelector_readDialog).on('hidden.bs.modal', function(eventObject) {
			clearModalButtons(eventObject.target);
			clearModalFormInputValues(eventObject.target);
			jQuery(omm_cssSelector_xmlDialogModalHidden).hide();
			jQuery(omm_cssSelector_xmlDialogModalShown).show();
		});
		jQuery(omm_cssSelector_uploadDialog).on('hidden.bs.modal', function(eventObject) {
			clearModalButtons(eventObject.target);
			clearModalFormInputValues(eventObject.target);
		});
	}

	function clearModalFormInputValues(modal) {
		jQuery(modal).find(":input").each(function(index, element) {
			switch (element.type) {
				case 'password':
				case 'select-multiple':
				case 'select-one':
				case 'text':
				case 'textarea':
					jQuery(element).val('');
					break;
				case 'checkbox':
					this.checked = false;
					break;
				case 'file':
					resetFileInputField(element);
			}
		});

		//inner funktion
		function resetFileInputField(element){
			jQuery(element).wrap(document.createElement("form"));
			jQuery(element).parent().get(0).reset();
			jQuery(element).unwrap();
		}
	}

	function clearModalButtons(modal) {
		jQuery(modal).find(".omm_modal-enabled").prop("disabled", false);
		jQuery(modal).find(".omm_modal-disabled").prop("disabled", true);
	}
}