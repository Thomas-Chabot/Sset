function Dropper (e){
	this.elem = $(e);
	this.drop = new Droppable (e);
}

Dropper.prototype.connectTo = function(d){
	this.elem.data("connected", d);
}
Dropper.prototype.getConnect = function(){
	return this.elem.data("connected");
}

Dropper.prototype.val = function(){
	var elem = this.getConnect();
	if (elem) return elem.text();
	else return " ";
}
Dropper.prototype.index = function() {
	return this.elem.data("index");
}

Dropper.prototype.getElem = function(){
	return this.elem;
}