function Activation (node){
	if (!node) return false;

	this.n = node;
	this.ele = $(node.getElem());

	this.addConnections();
}

Activation.prototype.addConnections = function(){
	if (!this.ele || this.ele.length === 0) return;
	var me = this;

	this.ele.mouseover(function(){
		me.mousedOver();
	})
}

Activation.prototype.mousedOver = function(){
	if (!this.n) return;
	if (!this.n.isEnabled()) return;

	var activeNodes = this.active();
	Nodes.setActiveNodes (activeNodes);
}

Activation.prototype.active = function(){
	var me = DOM.from(this.n.getElem());
	var n = this.n.getNext();
	var ne = DOM.from(n && n.getElem());

	return [me, ne].filter(function(e){ return e !== null; });
}