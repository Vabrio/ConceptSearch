// Research Function
import { globalSearch } from "./search_algorithm";
// DB communication
import { Manager } from "./db_communication";
// Const
import { PORT, LOG_FILE } from "./const";

declare function require(name:string): any;
declare const Buffer: any;
declare const process: any;
const fs = require('fs');

// Starting filed log depending on LOG_FILE const
if (LOG_FILE){
	let util = require('util');
	var logFile = fs.createWriteStream('log.txt', { flags: 'a' });
  	// Or 'w' to truncate the file every time the process starts.
	var logStdout = process.stdout;

	console.log = function() { //
	  logFile.write(util.format.apply(null, arguments) + '\n');
	  logStdout.write(util.format.apply(null, arguments) + '\n');	
	};
	console.error=console.log;
}



// STARTING REST SERVER
let express = require('express');
let app = express();




app.all('/*', function(req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});



// SEARCH IN DATABASE FOR THE REQUEST
// Return the list of extracts matching request
app.get('/search', function (req: any, res: any) {
    let request = req.query.request;
	let list = JSON.parse(Manager.getWritingList());
	let research = globalSearch(request, list);
	
    // String sent to client, header is necessary to get the accents
    res.header("Content-Type", "text/plain; charset=utf-8");
    
	// Send answer
	res.status(200).send(research);
	
	// Show in console or log in file
	console.log("Research requested : " + request)
})

//LIST ALL WRITINGS (in JSON format)
app.get('/list', function (req: any, res: any) {
    // Return a JSON list of all writings, to be used afterwards
    res.header("Content-Type", "text/plain; charset=utf-8");
	//
	res.send(Manager.getWritingList());
	
	console.log("List requested and sent \n");
})

//ADD A CONCEPT IN DB
app.post('/concept', function(req: any, res: any){
    let query = req.query;
   	let name = query.name;
	let idWri = query.idWri;
	let extract = JSON.parse(query.extract);
   	let userId = query.userId;
   	let strength = query.strength;
	
	// TODO : Getting begin and end index with a regexp.
	// not done yet because we have to define if the beginning is in HTML or in text...
    let begin = -1, end = -1;
    let response = Manager.addConcept(name, idWri, begin, end, extract, userId, strength);
	
	res.send(response);
	console.log("Concept added : " + name + "\n\tIN : " + idWri);
})

// GET A SPECIFIED WRITING
app.get('/read', function(req:any, res: any){
	// Params
   	let idWri = req.query.idWri;
	let list = JSON.parse(req.query.list);
	let author = req.query.author;
	let title = req.query.title;
	
	// Getting text and associated concepts 
	let response = Manager.getWriting(idWri);
	
	let writingText = response[0], concepts = response[1];
	
	// Getting the index for every concept that can be found
	let htmlFormatting: any[] = [], found: any;
	for (let c of concepts){
		let regExp = new RegExp(c[4], 'ig');
		if (found = regExp.exec(writingText)){
			console.log(found[0]);
			console.log("Index : " +found.index);
			htmlFormatting.push([found.index, '<span class="hoverItem"><span class="hiddenText">'+c[1]+'</span>']);
			htmlFormatting.push([found.index + (found[0]).length, '</span>']);
		}
	}


	console.log(htmlFormatting);
	
	
	// Change text to put the extract in bold
	let n = list.length,
		index: number,
		pattern: string;
	for (let k=n-1; k>=0; k--){
		pattern = list[k][1];
		index = list[k][2];
		htmlFormatting.push([index, "<a class='extract' name='" + index.toString() +  "'><b>"]);
		htmlFormatting.push([index+pattern.length, '</b></a>']);
	}
	// Order from bigger index to smaller
	let customSortFunction = function(a: any, b: any){
		return b[0] - a[0];
	}
    htmlFormatting.sort(customSortFunction);

	let m= htmlFormatting.length;
	for (let form of htmlFormatting){
		writingText = writingText.substring(0, form[0]) + form[1] +  writingText.substring(form[0]);
	}
	
	/* OLD WAY
	let n = list.length,
		index: number,
		pattern: string;
	for (let k=n-1; k>=0; k--){
		pattern = list[k][1];
		index = list[k][2];
		writingText = writingText.substring(0, index) + "<a class='extract' name='" + index.toString() +  "'><b>" +  writingText.substring(index, index + pattern.length) + "</b></a>" + writingText.substring(index+pattern.length); 	
	}*/

	
	let result =writingText
	// Return the text + the author + the name of the writing
	res.end(JSON.stringify([result, author, title, idWri]));
})


// START LISTENING TO A SPECIFIED PORT
var server = app.listen(PORT, function () {
	var port = server.address().port
	console.log("Server listening on port : %s", port)

})
