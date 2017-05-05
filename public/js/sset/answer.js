function getAnswer(t){
   	return $(".element", t).text();
}
function getCorrectAnswer(t){
	return $("#c", t).text();
}

function check(corr, act){
	return corr === act;
}

function markAsCorrect (p){
	var ul = $("ul.items", p);
	var btn = $("a.button", p);
	var tr = $(p).closest("tr");

	ul.addClass("correct");
	btn.addClass("correct");
	tr.data("correct", 1);
}

function markAsIncorrect (p){
	var ul = $("ul.items", p);
	var btn = $("a.button", p);
	var tr = $(p).closest("tr");

	ul.removeClass("correct");
	btn.removeClass("correct");
	tr.data("correct", 0);
}

function correctAnswer(p){
	var corr = getCorrectAnswer(p);
	var act  = getAnswer(p);

	return check(corr, act);
}

function checkIncor (p){
	if (!correctAnswer(p))
		markAsIncorrect(p);
}