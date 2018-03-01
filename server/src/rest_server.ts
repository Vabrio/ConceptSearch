// Const
import { PORT, LOG_FILE } from "./const/const";

// Initiailize db if needed (creation + adding of writing info)
import {createTables} from "./managers/config/mysql/init_db";
createTables();

let fs = require('fs');
let bodyParser  = require('body-parser');

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// WE MAY USE A TOKEN
import { checkToken } from "./routes/token";
app.use(checkToken);

app.all('/*', function(req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


import {conceptRoutes} from "./routes/concepts.route";
import {userRoutes} from "./routes/users.route";
import {writingRoutes} from "./routes/writings.route";
app.use('/concepts', conceptRoutes);
app.use('/users', userRoutes);
app.use('/writings', writingRoutes);


// START LISTENING TO A SPECIFIED PORT
var server = app.listen(PORT, function () {
	var port = server.address().port
	console.log("Server listening on port : %s", port)

})
