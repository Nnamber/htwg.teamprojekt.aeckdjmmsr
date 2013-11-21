function omm_styler() {

	/**
	 * Get question body wihtout unnecessary html elements 
	 *  
	 */
	this.getWellFormedQuestionBody = function(question) {
		return cleanElements($(question).attr('body'));
	};
	
	function cleanElements(questionBody) {
		var result;
		result = questionBody.replace(/<pre>\s*<br\s*\/>\s*<\/pre>/g, "");
		result = result.replace(/<\/pre>\s*<pre>/g, "<br/>");
		return result;
	}

}
