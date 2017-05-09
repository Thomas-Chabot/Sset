// NTS: droppers contains 

function Row(elem){
	this.element = $(elem);
	this.ans     = new Answer(this);
}

Row.prototype.getAnswer = function (){
	var answer = "";
	Droppers.eachWithin(DOM.rowFrom(this.element), function(elem){
		answer  += elem.val();
	})
	return answer.replace(/[ ]+$/, "");
}

Row.prototype.check = function(){
	var a = this.getAnswer();
	return this.ans.check (a);
}

Row.prototype.getElem = function(){
	return this.element;
}

Row.prototype.reset = function(){
	var resetId  = this.element.attr("id").replace("row", "reset");
	var resetRow = $("#" + resetId);

	var newChildren = resetRow.children().clone();
	this.element.empty().append(newChildren);
	addNewElements (newChildren);
}