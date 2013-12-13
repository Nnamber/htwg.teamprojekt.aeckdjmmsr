function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    //set the id of the parent of the event who triggered the "drag" event
   // ev.dataTransfer.setData("parentId", $(ev.target).parent().attr('id'));
        
    //set the id of the element who triggered the event
    ev.dataTransfer.setData("text", ev.target.id+"/"+$(ev.target).parent().attr('id'));
}

function drop(ev) {
    ev.preventDefault();
    var dataAll = ev.dataTransfer.getData("text").split("/");
    //get the id of the element who triggered the event
    var data = dataAll[0];
     //get the answer field in which the dragable answer is located
     var dragParent = dataAll[1];

    //Dropable target is not a draggable object, is not a dropable targt with an answer already or is the big answer field
    if (!$(ev.target).hasClass("omm_draggable") && ($(ev.target).children().length === 0 || $(ev.target).hasClass('omm_answer-field-big'))) {
        if(!$(ev.target).hasClass('omm_answer-field-big')){
        	$(ev.target).css('border', 'none');
            /*$(ev.target).css('border', '1px solid rgb(227, 227, 227)');*/
        }else{
            $(ev.target).css('border', '1px solid rgb(204, 204, 204)');
        }
        ev.target.appendChild(document.getElementById(data));
        //Dropable target is either an answer or an answer field with an answer already
    } else {  
        //Dropable target is a dragable answer
        if ($(ev.target).hasClass("omm_draggable")) {
           

            //get parent und caste es zu DOM objekt
            var parent = $(ev.target).parent().get(0);

            
            //append the element who triggered the event to its target
            parent.appendChild(document.getElementById(data));
            
            //append the element located in the answer field to the parent of the element who triggered the event
            $("#" + dragParent).append(ev.target);
            
        //Dropable target is a dropable answer field
        } else if (!$(ev.target).hasClass("omm_draggable") &&  $(ev.target).children().length === 1){
            //get child of the answer field and cast to DOM object
            var child = $(ev.target).children().first().get(0);
            //get parent of the element who triggered the event
            var dragParent = ev.dataTransfer.getData("parentId");
            
            //append the element who triggered the event to its target
            ev.target.appendChild(document.getElementById(data));
            
            //append the element located in the answer field to the parent of the element who triggered the event
            $("#" + dragParent).append(child);
        }
    }
    if($("#" + dragParent).children().length === 0){
               

        $("#" + dragParent).css('border', 'dashed 1px midnightblue');
        //$("#" + dragParent).attr('data-content', 'Antwort hier her ziehen.');
    }

}