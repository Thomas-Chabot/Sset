function Save (){
	this.nodes = new NodesArray([], false);
}

Save.prototype.update = function (){
	if (this.nodes) this.nodes.removeAll ();
	this.nodes = Nodes.clone ();
}

Save.prototype.reload = function (){
	// remove the old nodes ...
	Nodes.removeAll ();
	Nodes = this.nodes;
	this.nodes = null;
	Nodes.setMain (true);

	Nodes.each (function (node){
		node.attach ();
	});

	Nodes.each(function(n){ n.applyConnections(); });
	reloadPlumbs();
	updateMainPointers ();

	this.update ();

	update ();
}