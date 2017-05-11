function Answer(row){
	this.correctAnswer = $("#c", row.getElem()).text();
	this.list          = $("ul.items", row.getElem());
	this.row           = row;
}

Answer.prototype.check = function (givenAns, ign){
	var corrAns  = this.correctAnswer;

	if (givenAns === corrAns) return true;
	if (ign) return false;
	
	if (givenAns.length < corrAns.length)
		Colors.highlight (DOM.noteDoubled());
	else if (givenAns.length > corrAns.length)
		Colors.highlight (DOM.noteHalved())

	return false;
}