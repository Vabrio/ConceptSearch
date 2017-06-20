// Research Function
import { simpleSearch } from "./search_algorithm";
// DB communication
import { Manager } from "./db_communication";

// STARTING REST SERVER
declare function require(name:string): any;
let express = require('express');
let app = express();

app.get('/search/', function (req: any, res: any) {
    let id = req.query.id;
    // String sent to client, header is necessary to get the accents
    res.header("Content-Type", "text/plain; charset=utf-8");
    
    let resp = Manager.getWriting(id);
    res.end(resp);
})
app.get('/list', function (req: any, res: any) {
    // Return a JSON list of all writings, to be used afterwards
    res.header("Content-Type", "text/plain; charset=utf-8");
    res.end(Manager.getWritingList());
})
app.post('/concept/', function(req: any, res: any){
    let query = req.query;
    let id = query.id;
    let name = query.name;
    let begin = query.begin;
    let end = query.end;
    let response = Manager.addConcept(name, id, begin, end);
    res.end(response);
    
})

let list = JSON.parse(Manager.getWritingList());
let addressList: string[] = [];
for (let l of list){
    addressList.push(l[3]);
}

let regE = new RegExp('justice','ig');
simpleSearch(regE, addressList);

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Server listening at http://%s:%s", host, port)

})