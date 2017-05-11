var NEXT_ID = 0;
function Pointer (element){
	var pointer = DOM.pointerFrom (element);
	pointer.attr("id", "pointer" + NEXT_ID++);

	this.elem = pointer;
	this.plumb = new Plumbify (this, "source");

	this.next = null;

	// stores prev for use with enable/disable. its a singly linked list based on a doubly linked one. sue me.
	this.prev = null;
}

Pointer.prototype.getElem = function(){ return this.elem; }
Pointer.prototype.getPlumb = function(){ return this.plumb; }
Pointer.prototype.getSrc = function(){ return this.plumb.getSource(); }
Pointer.prototype.getEndpoint = function(){ return this.plumb.endpoint; }
Pointer.prototype.getPrev = function(){ return this.prev; }
Pointer.prototype.getNext = function(){ return this.next; }
Pointer.prototype.setNext = function(n){
	var newNext = findNodeFromTarg (n);
	this.next = newNext;

	// set the previous node
	if (newNext){
		// only if not HEAD/TAIL ...
		var myNode = findNodeFromPointer (this);
		if (myNode.isPlaceholder()) return;

		newNext.setPrev (myNode);
	}
}
Pointer.prototype.setPrev = function(n){
	this.prev = findNodeFromTarg (n);
	console.log("prev is now ", this.prev);
}

function findNodeFromPointer (t){
	if (t === null) return null;
	else{
		return Nodes.find (function (el){
			return (el.getPtr() === t);
		})
	}
}
function findNodeFromTarg (n){
	if (n === null) return null;
	else if (!DOM.contains(n)) return n;
	else{
		n = $(n);
		return Nodes.find (function (el){
			if (!el.getTarg()) return false;
			return n.is(el.getTarg())
		});
	}
}