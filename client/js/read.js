
document.addEventListener('copy', function(e){
    e.clipboardData.setData('text/plain', window.getSelection()+'\n\n\t('+completeText.author+', '+completeText.title+')');
    e.preventDefault();
	// We want our data, not data from any selection, to be written to the clipboard
});


document.addEventListener('selectionchange', changeSelection);
var text_chosen = document.getElementById('text_chosen');
text_chosen.addEventListener('click', onClick);

function changeSelection(e){
	addConcept.extract = $.selection("html");
}
function onClick(e){
	searchRes.dataReceived = false;
}

//
///* Add concept system */
//
//function findClickedWord(targetE, x, y) {
//    
//    var range = document.createRange();
//	var start = 0;
//	var end = 0;
//	var words = targetE.textContent.split(' ');
//	for (var k=0; k < words.length; k++){
//		word = words[k];
//		end = start+word.length;
//		if (end != start){
//			range.setStart(targetE, start);
//			range.setEnd(targetE, end);
//			// not getBoundingClientRect as word could wrap
//			var rects = range.getClientRects();
//			var clickedRect = isClickInRects(rects);
//			if (clickedRect) {
//				return [word, start, clickedRect];
//			}
//		}
//		start = end +1;
//	}/*
//	if (c.textContent.length == 0){
//		if (previous){
//			currentL += 1;
//		}
//		previous = true;
//	}else{
//		currentL +=  c.textContent.length;
//		previous = false;
//	}*/
//    
//    function isClickInRects(rects) {
//		
//        for (var i = 0; i < rects.length; ++i) {
//            var r = rects[i]; 
//            if (r.left<x && r.right>x && r.top<y && r.bottom>y) {        
//                return r;
//            }
//        }
//        return false;
//    }
//	
//    return null;
//}
//function onClick(e) {
//	e.target.
//    var clicked = findClickedWord(e.target, e.clientX, e.clientY);
//    if (clicked) {
//        var word = clicked[0];
//        var start = clicked[1];
//        var r = clicked[2];
//        alert('word:'+word+' at offset '+start);
//		alert(completeText.$data.initialText.substr(start,word.length));
//		searchRes.$data.dataReceived=false;
//    }
//}
//
/*function(e) {
    s = window.getSelection();
    var range = s.getRangeAt(0);
    var node = s.anchorNode;
	range.setStart(node, Math.max(0, range.startOffset - 100));
	range.setEnd(node, range.endOffset + 100);
    var str = range.toString().trim();
    alert(str);
}*/