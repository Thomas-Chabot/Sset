/*
	Controls the Reset and Check buttons
*/

var Button = { };

Button.reset = function(btn){
	var row = DOM.rowFrom (btn);
	Rows.from (row).reset ();
}

Button.check = function (btn){
	var rowElem = DOM.rowFrom (btn);
	var row     = Rows.from (rowElem);

	if (row.check())
		Colors.correct (row);
	else
		Colors.incorrect (row);
}