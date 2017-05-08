function loadExercise(){
	$.get("/ssetExercise", function(res){
		var tbody = $("tbody");
		tbody.empty().append(res);
		applyDraggingSorting();
	})
}