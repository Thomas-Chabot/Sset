function Activation (node){
	if (!node) return false;

	this.n = node;
	this.ele = $(node.getElem());

	this.addConnections();
}

Activation.prototype.addConnections = function(){
	if (!this.ele || this.ele.length === 0) return;
	var me = this;

	this.ele.mouseenter(function(){
		me.mousedOver();
	})
}

Activation.prototype.mousedOver = function(){
	if (!this.n) return;
	if (!this.n.isEnabled()) return;

	var newNode = newN.getNext();
	if (newNode === this.n && !newNode.getPrev() && !newNode.getNext()) return;

	var next = this.n.getNext();
	if (next) next = DOM.domify(next.getElem());

	setActiveNode (this.n, next);
}

function setActiveNode (n, ex){
	cur.connectTo (n);
	updateActive();
}
function getActiveNodes (e){
	if (!e) e = getNextElemFrom (cur);
	if (!e) return [];
	return [e];
}

function getNextElemFrom (root){
	if (!root || !root.getNext) return null;

	var r = root && root.getNext();
	var e = r && r.getElem();
	return e && DOM.from(e);
}

function pushToFrom (arr, node){
	var el = getNextElemFrom (node);
	if (el) arr.push (el);
}

function updateActive(){
	var n = getNextElemFrom (cur);
	var activeNodes = getActiveNodes (n);

	pushToFrom (activeNodes, cur.getNext());
	pushToFrom (activeNodes, newN);
	pushToFrom (activeNodes, head);
	pushToFrom (activeNodes, tail);

	Nodes.setActiveNodes (activeNodes);
}