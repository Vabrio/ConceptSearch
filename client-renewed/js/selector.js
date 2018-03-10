/*document.addEventListener('mouseup', changeSelection);

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
	
}*/


document.addEventListener('copy', function(e){
    e.clipboardData.setData('text/plain', window.getSelection()+'\n\n\t('+researchPage.completetext.author+', '+researchPage.completetext.title+')');
    e.preventDefault();
});

$('#text_chosen').mouseup(onClick);

function onClick(e){
    var offset = $(this).offset();
    var left = e.pageX;
    var top = e.pageY;
    var theHeight = $('.popover').height();
    $('.popover').show();
    $('.popover').css('left', (left+10) + 'px');
    $('.popover').css('top', (top-(theHeight/2)-10) + 'px');
	/*addConcept.extract = $.selection("html");
	addConcept.wordSelected = $.selection("text");*/
}