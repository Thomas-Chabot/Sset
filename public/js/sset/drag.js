$(function(){
	applyDraggingSorting();
});

/*
	Applies dragging & sorting for elements.
	Optional t indicates where to implement the grabbing & sorting for:
		- If given, only applies to children of t
		- Otherwise applies to every element in the DOM
*/
function applyDraggingSorting (t){
	$(".items", t).each(function(j,q){
		var el = $(q);
		el.sortable({
			containment: el.parent(), // would be the div above the ul element
			axis: "x",
			revert: true,
		 	stop: function(ev, ui){
		 		var p = $(this).parent().parent();
		 		checkIncor(p);
		 	},
		 	connectWith: ".droppable"
		});
	});
	$(".newItem", t).each(function(){
		var btn = $(this);
		var id = btn.attr("id");
		var sortable = id.replace("new", "set");
		btn.draggable({
			connectToSortable: "#" + sortable,
			axis: "x",
	 		revert: "invalid"
		})
	})
	$(".droppable").droppable({
		drop: function(ev, ui){
			var parentRow = ui.helper.closest("tr");
			ui.helper.remove();
			checkIncor(parentRow);
		},
		tolerance: "touch",

	});

	$("#set,.newItem,.element", t).disableSelection();

	$("ul.items", t).on("reset", reset);
}

/*
	Resets the next line of an sset to its default values
*/
function reset(ev, ignorePrev){
	var main = $(this).closest("tr");
	var resetId   = main.attr("id").replace("row", "reset");
	var reset     = $("#" + resetId);

	var newChildren = reset.children().clone();
	main.empty().append(newChildren);
	applyDraggingSorting (newChildren);

	// mark the row as being incorrect so items can be copied from previous rows
	markAsIncorrect (main);

	// if this wasn't called from check button, test the check button
	// if it should have elements for this row
	if (!ignorePrev){
		var prevId = main.data("index") - 1;
		var prevRow = $("#row" + prevId);
		var checkBtn = $("#check", prevRow);
		checkBtn.click();
	}
}