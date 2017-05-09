/*
	Everything DOM-related. Find an element, get the index of an element, ...
*/

var DOM = { };

const DROP = "div.droppable";
const ELEM = "div.element";
const LIST = "ul.items";
const BTN  = "a.button"
const ROW  = "tr";

DOM.rowFrom = function(elem){
	return $(elem).closest (ROW);
}
DOM.listFrom = function(r){
	return $(LIST, r);
}
DOM.buttonsFrom = function(r){
	return $(BTN, r);
}
DOM.elementsFrom = function(r){
	return $(ELEM, r);
}
DOM.droppersFrom = function(r){
	return $(DROP, r);
}

DOM.indexOf = function (elem){
	var r = DOM.rowFrom (elem);
	return r.data("index");
}

DOM.rowFromIndex = function (index){
	return $("#row" + index);
}
DOM.getReset = function (index){
	return $("#reset" + index);
}

DOM.rows = function(){
	return $(ROW);
}
DOM.elements = function(){
	return $(ELEM);
}
DOM.droppers = function(){
	return $(DROP);
}

DOM.isChildOf = function(parent, child){
	var dom1, dom2;
	dom1 = parent instanceof jQuery ? parent[0] : parent;
	dom2 = child instanceof jQuery ? child[0] : child;

	return ($.contains(dom1, dom2))
}
DOM.contains = function(elem){
	return DOM.isChildOf (document, elem);
}

DOM.pushOnTop = function(div, t){
	div.position({
	  my:        "left center",
	  at:        "left center",
	  of:        t,
	  collision: "fit"
	})
}