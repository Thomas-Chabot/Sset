function DropArray (){
	this.add (DOM.droppers());
}

DropArray.prototype = new ElementArray([], Dropper)
DropArray.prototype.reposition = function(){
	this.each (function(drop){
		console.log(drop);
		var c = drop.getConnect();
		if (c)
			DOM.pushOnTop(c, drop.getElem());
	});
}