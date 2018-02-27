declare const global: any;
global.__base = __dirname + '/';

// Const
import { PORT, LOG_FILE } from "./const/const";

// Research Function
import { globalSearch } from "./research/search_algorithm";

// DB communication
//import { Manager } from "./managers/db_communication";
import { Manager} from "./managers/manager";
// Initiailize db if needed
import {createTables} from "./managers/config/mysql/init_db";
createTables();

// Models
import {ConceptModel} from "./managers/models/concept.model";


declare function require(name:string): any;
declare const Buffer: any;
declare const process: any;

import fs = require('fs');

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
	Manager.getWritingList((err: any, rows: any) => {
		
		if (err){
			console.log("Error while searching : " + err);
		}else{
			let research = globalSearch(request,rows);
			res.header("Content-Type", "text/plain; charset=utf-8");

			// Send answer
			res.status(200).send(research);
			//console.log("Research requested : " + request);
		}
	});
})


//ADD A CONCEPT IN DB
app.post('/concept', function(req: any, res: any){
    
	let query = req.query;
	
	let concept = new ConceptModel({
		'name': query.name,
		'writingid': query.idWri,
		'begin': query.begin,
		'end': query.end,
		'extract': JSON.parse(query.extract),
		'userid': query.userId,
		'strength': query.strength
	});
	
	Manager.addConcept(concept, res);
	
	//console.log("Concept added : " + name + "\tIn writing with id : " + idWri);
})

// GET A SPECIFIED WRITING
app.get('/read', function(req:any, res: any){
	// Params
   	let idWri = req.query.idWri;
	let list = JSON.parse(req.query.list);
	let author = req.query.author;
	let title = req.query.title;
	
	// Getting text and associated concepts 
	Manager.getWriting(idWri, (err: any, wri: any) =>{
		if (err){
			console.log("couldn't access writing with error : "+ err);
		}else{
			let writingText = wri.writing, concepts = wri.concepts;
			// Getting the index for every concept that can be found
			let htmlFormatting: any[] = [], found: any;
			for (let c of concepts){
				let request = c.extract;

				request = request.replace(new RegExp("\n", 'g'), "(\n|\r|\r\n)+");
				let regExp = new RegExp(request, 'im');
				if (found = regExp.exec(writingText)){
					htmlFormatting.push([found.index, '<span class="hoverItem"><span class="hiddenText">'+c.name+'</span>']);
					htmlFormatting.push([found.index + (found[0]).length, '</span>']);
				}
			}
			
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
			
			let result =writingText;
			// Return the text + the author + the name of the writing
			res.end(JSON.stringify([result, author, title, idWri]));
		}
	});
	
})

// START LISTENING TO A SPECIFIED PORT
var server = app.listen(PORT, function () {
	var port = server.address().port
	console.log("Server listening on port : %s", port)

})
