function Answer (correct){
	this.correctAnswer = correct;
}

Answer.prototype.getAnswer = function (){
	var a = "";

	// its possible to have a loop. check if it starts looping, and if it does, return false
	var nodesPassed = [ ];
	var curNode = head;
	while (curNode){
		if (nodesPassed.indexOf (curNode) != -1)
			return false;
		nodesPassed.push (curNode);

		if (!curNode.isPlaceholder())
			a += curNode.getData ();
		curNode = curNode.getNext();
	}

	// tail should point at last element. make sure it does ...
	if (!tail.getNext()) return "";
	if (tail.getNext().getData() != lastChar (a)) return false;

	return a;
}

Answer.prototype.check = function (){
	return this.correctAnswer === this.getAnswer();
}

function lastChar (str){
	return str.charAt (str.length - 1);
}
