var nodeCtr = 0;

function Node(e, data, isListNode){
	if (!e) e = makeNewNode();
	e = $(e);

	e.attr("id", "Node" + nodeCtr++);

	this.node = e;
	this.isListNode = isListNode !== false;

	console.log(isListNode, this.isListNode);

	if (isListNode !== false) {
		this.targ = new Plumbify (this, "target").draggable();

		// Allow the node to be activated & deactivated
		this.a = new Activation(this);
	}

	this.ptr = new Pointer(this.node);

	this.setData (data);

	return this;
}

Node.prototype.getData = function(){ return this.data; }
Node.prototype.getPtr = function(){ return this.ptr; }
Node.prototype.getElem = function(){ return this.node; }
Node.prototype.getSrc = function(){ return this.ptr.getSrc(); }
Node.prototype.getSrcEndpoint = function(){ return this.ptr.getEndpoint(); }
Node.prototype.getTargEndpoint = function(){ return this.targ && this.targ.endpoint; }
Node.prototype.getTarg = function(){ return this.targ && this.targ.getSource(); }
Node.prototype.getNext = function(){ return this.ptr.getNext(); }
Node.prototype.getPrev = function(){ return this.ptr.getPrev(); }
Node.prototype.isPlaceholder = function(){ return !this.isListNode; }
Node.prototype.isEnabled = function(){ return !this.node.hasClass ("disabled"); }

Node.prototype.setData = function(value){
	if (!value) value = "";
	this.data = value;

	// update the DOM element
	var data = DOM.dataFrom (this.node);
	if (!data || data.length === 0) return;

	$(data).text(value);
}

Node.prototype.setNext = function(el){
	this.ptr.setNext (el);
}
Node.prototype.setPrev = function(el){
	this.ptr.setPrev (el);
}

Node.prototype.disable = function(){
	// check if the node can be disabled
	// can't if:
	//    1) node is HEAD or TAIL
    //    2) node is HEAD's next or TAIL's previous
    //    3) node is the current node ... would be impossible to do the exercise otherwise.
    if (this.isPlaceholder()) return;
    if (head.getNext() === this) return;
    if (tail.getNext() === this) return;
    if (currentNode === this) return;

    // past all that, it can be disabled, so go do that
	var srcEndpoint = this.getSrcEndpoint();
	var targEndpoint = this.getTargEndpoint();

	if (!srcEndpoint || !targEndpoint) return;
	srcEndpoint.setEnabled (false);
	targEndpoint.setEnabled (false);

	// this is terrible. should think of a better way to do this
	srcEndpoint.addClass ("disabled");
	targEndpoint.addClass ("disabled");
	this.node.addClass ("disabled");
}

Node.prototype.enable = function(){
	var srcEndpoint = this.getSrcEndpoint();
	var targEndpoint = this.getTargEndpoint();

	if (!srcEndpoint || !targEndpoint) return;
	srcEndpoint.setEnabled (true);
	targEndpoint.setEnabled (true);

	// this is terrible. should think of a better way to do this [2]
	srcEndpoint.removeClass ("disabled");
	targEndpoint.removeClass ("disabled");
	this.node.removeClass ("disabled");
}

// make a new node
function makeNewNode (){
	var n = DOM.newNode();
	n.appendTo ($("#question"));
	return n;
}