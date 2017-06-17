// Research Function
import { simpleSearch } from "./search_algorithm";
// DB communication
import { Manager } from "./db_communication";

// STARTING REST SERVER
declare function require(name:string): any;
let express = require('express');
let app = express();

app.get('/:id', function (req: any, res: any) {
    // Data written in console
    console.log(req.params.id);
    // String sent to client
    res.end("COUCOU");
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Server listening at http://%s:%s", host, port)

})