/*
	Main code... implements the three array elements and functions that use all three together.

	NTS:
		Copying from row to next row needs to be added;
		Array resizing needs to be added.
*/

var Rows, Elements, Droppers;

$(function(){
	Rows     = new ElementArray(DOM.rows(), Row);
	Elements = new ElementArray(DOM.elements(), Element);
	Droppers = new DropArray();

// ???
});

function makeCopy (element){
	var newElement = $(element).clone();

}

function addNewElements (elements) {
	Rows.cleanup();
	Elements.cleanup();
	Droppers.cleanup();

	// Add the new elements. Split these up into row, element, and droppers, and add individually
	Rows.add (DOM.rowFrom (elements)); // if there are any!
	Elements.add (DOM.elementsFrom (elements)); // elements from elements. hmm
	Droppers.add (DOM.droppersFrom (elements)); // k
}