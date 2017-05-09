function Elements(row);
	this.elements = [ ];
	this.domElems = DOM.elementsFrom (row);

	this.init ();
}

Elements.prototype.init = function(){
	$(this.domElems).each(function(i, d){
		var e = new Element(d);
		this.push (e);
	})
}

Elements.prototype.from = function (e){
	var elems = $(this.elements);
	elems.each(function(i, r){
		if (r.getElem().is(e))
		  return r;
	});
	return null;
}

Elements.prototype.push = function(newElem){
	this.elements.push (newElem);
}

Elements.prototype.each = function(f){
	$(this.elements).each(f);
}