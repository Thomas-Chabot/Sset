var DOM = { };

DOM.all = function(selector, from){
	return $(selector, from).add($(from).filter(selector));
}

DOM.pointerFrom = function (r){
	return DOM.all(".pointer", r);
}
DOM.dataFrom = function(r){
	return DOM.all(".data", r);
}

DOM.nodes = function(){ return $(".node"); }

DOM.within = function(parent, child){
	var dom1, dom2;
	dom1 = parent instanceof jQuery ? parent[0] : parent;
	dom2 = child instanceof jQuery ? child[0] : child;

	return ($.contains(dom1, dom2))
}
DOM.contains = function(elem){
	return DOM.within (document, elem);
}

// turns a possible JQuery object into DOM element
DOM.from = function (obj){
	return $(obj)[0];
}

DOM.newData = function (){
	return $("<div class='data'></div>");	
}
DOM.newNext = function() {
	return $("<div class='pointer'></div>")
}
DOM.newNodeP = function() {
	return $("<div class='node'></div");
}
DOM.newNode = function (){
	var d = DOM.newNodeP();
	var data = DOM.newData();
	var next = DOM.newNext();

	return d.append(data).append(next)
}