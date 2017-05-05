/*
	Code for checking if a given answer is correct.
	Also handles the coloring & tracking of if a given row has been completed or not
*/

function getAnswer(t){
   	return $(".element", t).text();
}
function getCorrectAnswer(t){
	return $("#c", t).text();
}

// checks that given answer is correct
function check(corr, act){
	return corr === act;
}

// Marks a row as being completed
function markAsCorrect (p){
	// find everything
	var ul = $("ul.items", p);
	var btn = $("a.button", p);
	var tr = $(p).closest("tr");

	// add the classes so they show up as green
	ul.addClass("correct");
	btn.addClass("correct");

	// mark the row as completed - this will be checked later
	// by some of the other scripts
	tr.data("correct", 1);
}

// Marks a row as not yet being completed
function markAsIncorrect (p){
	var ul = $("ul.items", p);
	var btn = $("a.button", p);
	var tr = $(p).closest("tr");

    // basically reverse of markAsCorrect above
	ul.removeClass("correct");
	btn.removeClass("correct");
	tr.data("correct", 0);
}

// Given a row, checks if answer is correct
function correctAnswer(p){
	var corr = getCorrectAnswer(p);
	var act  = getAnswer(p);

	return check(corr, act);
}

// If answer is not correct for a row, marks it as incorrect ...
// Done here so it can be referenced more easily
function checkIncor (p){
	if (!correctAnswer(p))
		markAsIncorrect(p);
}