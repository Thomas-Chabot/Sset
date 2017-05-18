/*
	Let's say the skip list looks like:



                    4
        1           4
        1           4       6
	0 - 1 - 2 - 3 - 4 - 5 - 6 - 7 - 8

    Nodes should be spaced out by:
      node.width[shown] + some offset value
    Node pointers would be on the right side of this:
      node position + node.data.width
    Height offsets should be exactly node.height.
*/

function Build (rows, opts){
	if (!opts) opts = { };
	
	//this.skiplist = skiplist;

	var elem = $(DOM.newNode ()).appendTo (question);

	this.height = elem.height ();
	this.width  = elem.width ();
	this.widthOffset = opts.widthOffset || 10;

	var data = DOM.dataFrom (elem);
	this.dataWidth = $(data).width ();

	elem.remove ();
	this.build (rows);
}

Build.prototype.getRowHeight = function (rowNum, n){
	return (n - rowNum) * this.height;
}

Build.prototype.calcWidth = function (){
	return this.width + this.widthOffset;
}
Build.prototype.getPtrOffset = function (){
	return this.dataWidth;
}

Build.prototype.getElPosition = function (i, n){
	return (i + 1) * (this.calcWidth ()) + this.widthOffset;
}

Build.prototype.makeSentinel = function (rowNum, n, height){
	var position = {
		top: height,
		left: this.getElPosition (-1, n)
	}

	var n = new Node(undefined, true, {parent: DOM.question(), position: position, enabled: true})
	this.sentinel.push (n);

	return n;
}

Build.prototype.getElements = function(){ return this.elems; }

Build.prototype.build = function (rows){
	var question = DOM.question ();

	Nodes = new NodesArray ();
	var towers = new ElementArray ();
	var elements = [ ];

	var prevNode;

	this.sentinel = new Tower();

	for (var rowNum = 0; rowNum < rows.length; rowNum ++){
		var height = this.getRowHeight (rowNum, rows.length);
		var row = rows[rowNum];
		var newNodes = new ElementArray ();

		prevNode = this.makeSentinel (rowNum, rows[rowNum].length, height);
		Nodes.push (prevNode);

		for (var i = 0; i < row.length; i++){
			if (!row[i]) continue;
			if (!towers.get (i)) towers.set(i, new Tower(row[i]));

			var position = {
				top: height,
				left: this.getElPosition (i, row[i].length)
			}

			// add a new node for the element
			var n = new Node (undefined, row[i], {parent: question, position: position, enabled: true});
			towers.get(i).push (n);
			newNodes.push (n);

			if (rowNum === 0)
				elements.push (n);
			
			Nodes.push (n);

			if (prevNode)
				prevNode.connectTo (n);
			prevNode = n;
		}

		//this.skiplist.addRow (newRow);
	}

	this.towers = towers;
	this.elems  = elements;
	sentinel = this.sentinel;

	Nodes.setActive ([this.sentinel.getTopNode()])
}

Build.prototype.rebuild = function (rows){
	this.towers.removeAll ();
	this.sentinel.remove ();

	this.build (rows);
}