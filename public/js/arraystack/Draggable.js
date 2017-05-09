/*
	Controls Dragging elements
*/

const CLONE_DRAG = {
  axis: 'x',
  revert: 'invalid',
  helper: Draggable.clone
};
const NON_CLONE_DRAG = {
  axis: 'x',
  revert: 'invalid'
}

function Draggable (elem, isAClone, contained){
	var dragOpts = isAClone && CLONE_DRAG || NON_CLONE_DRAG;
	$(elem).draggable(dragOpts);

	if (contained)
		Draggable.setContainment (elem, contained);
}

// this is weird since its not an object but
Draggable.clone = function(elem){
	if (!elem) elem = this;
	else if (elem.toElement) elem = elem.toElement;
	
	var newDiv = $(elem).clone()
	                    .css("position", "relative")
	                    .data("isClone", true);

	Elements.pushFromDOM (newDiv);
	return newDiv;
}

// this is weird since its not an object but [2]
Draggable.setContainment = function (elem, c){
	$(elem).draggable("option", "containment", c);
	return this;
}

Draggable.setToClone = function(elem){
	$(elem).draggable("option", "helper", Draggable.clone);
	return this;
}