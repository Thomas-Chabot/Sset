function Answer(row){
	this.correctAnswer = $("#c", row.getElem()).text();
	this.list          = $("ul.items", row.getElem());
	this.row           = row;
}

Answer.prototype.check = function (){
	return (this.row.getAnswer() === this.correctAnswer);
}