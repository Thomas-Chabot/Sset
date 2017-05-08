/*
	Generate a random SortedSet to use with the SSet Exercise.

	SSet exercise supports:
		- add (element)
		- remove (element)
	If adding an element that is already in the set, no action is performed
	If removing an element that is not in the set, no action is performed

	Going to be using Collections/SortedSet for this but this can be changed if needed
*/
var SortedSet = require("collections/sorted-set");

// values representing the operation to be performed
const ADD = 'add';
const REM = 'remove';

// where to start & end random values that may be added, removed from the set
const A_CODE = 97;
const Z_CODE = 122;

// number of operations that should be performed. each represents one row in the page
const NUM_OPS = 20;

// some values for adding, removing for use with the getRandOp
const ADD_OP = 1;
const REM_OP = 0;

// maximum number of elements that can be in the set ... makes it easier to work with the HTML
const MAX_LENGTH = 6;


// Find a random number between min & max
function randBetween (min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Returns the letter to be added or removed from the set, given operation & set (for removal, so value exists)
function getALetter (op, set){
	switch (op){
		case ADD:
			return String.fromCharCode(randBetween(A_CODE, Z_CODE));
		case REM:
			// this is a bit of extra work but seems to be only way to get a random value
			var values = set.toArray();
			return values[randBetween(0, values.length-1)];
		default:
			return "?";
	}
}

// Determines a random operation to be performed.
// Checks if set is empty and should be added to;
// set is full (based on MAX_LENGTH) and something should be removed;
// or a random number
function getRandOp (set){
	switch (set.length){
		case 0:
			return ADD_OP;
		case MAX_LENGTH:
			return REM_OP;
		default:
			return randBetween(0, 3);
	}
}

// Determines next operation to perform on the set
function getOperation (set){
	var l = getRandOp(set);
	switch(l){
		case REM_OP:
			return REM;
		default:
			return ADD;
	}
}

// Actually performs the operation, changing the set
function performOperation (op, set, value){
	switch (op) {
		case ADD:
			set.add (value);
			break;
		case REM:
			set.remove (value);
			break;
		default:
			break;
	};
}

// Returns what a user should answer for the operation
function getCorrectAnswer (set){
	return set.join("");
}

// Renders the HTML for the given operation
function getPugValues (op, val, ans, i){
	switch (op) {
		case ADD:
			return {addElem: val, answer: ans, index: i};
		case REM:
			return {removeElem: val, answer: ans, index: i};
		default:
			return {removeElem: val, answer: ans, index: i}; // should never happen, but if it does, this probably results in the right answer
	}
}


// Main function to actually create the exercise
function SetExercise(f){
	var set = new SortedSet();
	var result = "";
	for (var i = 0; i < NUM_OPS; i++){
		var op      = getOperation(set);
		var val     = getALetter (op, set);

		performOperation (op, set, val);
		var corrAns = getCorrectAnswer(set);

		result += f(getPugValues(op, val, corrAns, i));
	}

	return result;
}

module.exports.create = SetExercise;