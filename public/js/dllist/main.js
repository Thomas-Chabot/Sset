var Nodes;

var checkmark;

var save = new Save();

var curNode, newNode, dummyNode;

$(function(){
	jsPlumb.ready(function(){
		Nodes = new NodesArray();

		dummyNode = new Node(undefined, "", {big: true, isDummy: true});
		Nodes.push (dummyNode);
		
		checkmark = new Checkmark(DOM.checkmark ());

		save.update ();

		restart ();
	});
});

function updateMainPointers (){
	Nodes.each (function (el){
		// this is really weird. switch on an object
		switch (el.getClonedFrom ()){
			case dummyNode:
				dummyNode = el;
				break;
			case newNode:
				newNode = el;
				break;
		}
	});
}