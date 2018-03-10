document.addEventListener('mouseup', changeSelection);

function changeSelection()
{              
	var fullString = document.getElementById("fulltext").textContent;
	
	//var range = window.getSelection().getRangeAt(0); 
    var range = window.getSelection (); 

    var startPosition = fullString.search(range);

    var getPosition = range.toString();

    var endPosition = parseInt(getPosition.length) + parseInt(startPosition);

    console.log("Start position is : " + startPosition + " and End position : " + endPosition);

    start_position = startPosition;

    end_position = endPosition;
	
}
/*


document.addEventListener('copy', function(e){
    e.clipboardData.setData('text/plain', window.getSelection()+'\n\n\t('+completeText.author+', '+completeText.title+')');
    e.preventDefault();
	// We want our data, not data from any selection, to be written to the clipboard
});

//document.addEventListener('selectionchange', changeSelection);
var text_chosen = document.getElementById('text_chosen');
text_chosen.addEventListener('mouseup', onClick);

//function changeSelection(e){}

function onClick(e){
	searchRes.dataReceived = false;
	addConcept.extract = $.selection("html");
	addConcept.wordSelected = $.selection("text");
}


*/
