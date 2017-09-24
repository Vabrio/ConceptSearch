// Research Function
import { simpleSearch } from "./search_algorithm";
// DB communication
import { Manager } from "./db_communication";

declare function require(name:string): any;
declare const Buffer: any;
const fs = require('fs');

// STARTING REST SERVER
declare function require(name:string): any;
let express = require('express');
let app = express();

app.all('/*', function(req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/search', function (req: any, res: any) {
	// Return the list of extracts matching request
    let request = req.query.request;

	let list = JSON.parse(Manager.getWritingList());
	let regE = new RegExp(request,'ig');
	let research = simpleSearch(regE, list);
	
    // String sent to client, header is necessary to get the accents
    res.header("Content-Type", "text/plain; charset=utf-8");
    
	res.status(200).send(research);
	
	console.log("Research requested : " + request)
})
app.get('/list', function (req: any, res: any) {
    // Return a JSON list of all writings, to be used afterwards
    res.header("Content-Type", "text/plain; charset=utf-8");
	//
	res.send(Manager.getWritingList());
	
	console.log("List requested and sent \n");
})
app.post('/concept', function(req: any, res: any){
    let query = req.query;
    let id = query.id;
   	let name = query.name;
	console.log(req.body)
    /*let begin = query.begin;
    let end = query.end;
    let response = Manager.addConcept(name, id, begin, end);*/
	res.end(/*response*/name);
    
	console.log("Concept added : " + name)
})
app.get('/read', function(req:any, res: any){
   	let address = req.query.address;
	console.log(address);
	let iconvlite = require('iconv-lite');
	let filebuffer = fs.readFileSync(address);
	let writingText = iconvlite.decode(filebuffer,"latin1");
	res.end(writingText);
})


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Server listening at http://%s:%s", host, port)

})
