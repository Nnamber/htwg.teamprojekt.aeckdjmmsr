function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("dragId", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();

	//ziel darf nicht die Klasse "dragable" haben, also kein drag und drop objekt (Antwort) sein
	//ziel darf keine Kinder haben oder muss das große Antwortfeld sein
	var data = ev.dataTransfer.getData("dragId");
	if (!$(ev.target).hasClass("dragable") && ($(ev.target).children().length == 0 || $(ev.target).attr('id') == 'answerField')) {
		ev.target.appendChild(document.getElementById(data));
	} else {
		if ($(ev.target).hasClass("dragable")) {
			//get parent und caste es zu DOM objekt
			var parent = $(ev.target).parent().get(0);
			$("#answerField").append(ev.target);
			parent.appendChild(document.getElementById(data));
		}
	}

}