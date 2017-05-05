function resetBtn (b){
	var set = getSetFromBtn (b);
	doReset (set);
}

function btnClick(b){
	var p = $(b).parent();
	if (correctAnswer(p)){
		markAsCorrect(p);
		shiftToNext(getElements(p), getIndex(p))
	}
	else
		markAsIncorrect(p);
}

function doReset (set, arg){
	$(set).trigger("reset", arg);
}

function getElements(p){
	var set = $("ul.items", p);
	return set.children();
}

function getIndex(p){
	var tr = $(p).closest("tr");
	return tr.data("index");
}

function getSetFromBtn (btn){
	var p = $(btn).parent();
	return $("ul.items", p);
}
function getSetWithIndex (id){
	return $("#set" + id);
}

function getRowWithIndex (id){
	return $("#row" + id);
}

function shiftToNext(elements, index){
	var next = index + 1;
	var nextSet = getSetWithIndex(next);
	var nextRow = getRowWithIndex(next);

	// is the next row already completed? if so, this shouldn't overwrite it ...
	console.log(next, nextRow, nextRow.data("correct"));
	if (nextRow.data("correct") === 1) return;

    // reset the contents of the next set ....
    // this will require regrabbing the set afterwards
    doReset (nextSet, true);

    // regrab the set & add the children
	var newSet  = getSetWithIndex(next);
	newSet.append(elements.clone());
}