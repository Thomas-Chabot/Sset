var currentNode = null;

function NodesArray (){
}

NodesArray.prototype = new ElementArray([], Node)
NodesArray.prototype.setActiveNodes = function(nodes){
	this.each (function (n){
		if (nodes.indexOf (DOM.from(n.getElem())) === -1)
			n.disable ();
		else
			n.enable ();
	})
}
NodesArray.prototype.push = function(n){
	currentNode = n;
	this.elements.push (n);
}