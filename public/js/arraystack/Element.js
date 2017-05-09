function Element (e){
	console.log(e);
	this.elem = $(e);
	Draggable (e);
}

Element.prototype.val = function(){
	var elem = this.getConnect();
	if (elem) return elem.val();
}

Element.prototype.getElem = function(){
	return this.elem;
}

Element.prototype.isClone = function(){
	return this.elem.data("isClone") === true;
}