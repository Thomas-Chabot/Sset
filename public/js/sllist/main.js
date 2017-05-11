var Nodes;

var head, tail;

$(function(){
	Nodes = new NodesArray();

	head = new Node($("div.node.head"), "HEAD", false);
	tail = new Node($("div.node.tail"), "TAIL", false);

	Nodes.push (head);
	Nodes.push (tail);
});