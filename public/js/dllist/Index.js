/*
	NOTE: Its very possible to break the indices.
	However, because this should only happen when there's already an error in your graph,
		I'll say this is more by design than actual error.
*/
function Index (node, opts){
	if (!node) return false;
	this.mainNode = node;
	this.elem     = DOM.indexFrom (node.getElem ());
	this.index    = undefined

	if (!opts.index && opts.isDummy) opts.index = -1;
	this.setIndex (opts.index);
}

Index.prototype.getIndex = function(){ return this.index; }

Index.prototype.setIndex = function(n){
	if (n === undefined) return;
	if (this.index === n) return;

	$(this.elem).text (n);
	this.index = n;
}

Index.prototype.onPrevChanged = function (p){
	if (!p) return;
	this.updateIndices (p.getIndex() + 1);	
}

Index.prototype.onNextChanged = function (p){
	if (!p) return;
	this.updateIndices (this.getIndex ())
}

Index.prototype.updateIndices = function (index){
	var nodes = [dummyNode];
	var curNode = this.mainNode;

	while (curNode && nodes.indexOf(curNode) === -1){
		nodes.push (curNode);
		curNode.setIndex (index ++);
		curNode = curNode.getNext();
	}
}