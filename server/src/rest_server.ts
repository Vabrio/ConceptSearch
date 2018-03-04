// Path to root directory
const ROOT_DIR = __dirname + '/';
export { ROOT_DIR };

// Const
import { LOG_FILE } from "./const/local";
// Db 
import {createTables} from "./managers/config/mysql/init_db";
// Rest_api
import { checkToken } from "./routes/token";
import { conceptRoutes } from "./routes/concepts.route";
import { userRoutes } from "./routes/users.route";
import { writingRoutes } from "./routes/writings.route";
import { startServer } from "./routes/server_start";
// Libs
let fs = require('fs');
let bodyParser  = require('body-parser');
let express = require('express');

// Starting filed log depending on LOG_FILE const
if (LOG_FILE){
	let util = require('util');
	var logFile = fs.createWriteStream(ROOT_DIR+'log.txt', { flags: 'a' });
  	// Or 'w' to truncate the file every time the process starts.
	var logStdout = process.stdout;

	console.log = function() { //
	  logFile.write((new Date()).toJSON() + " --- "  + util.format.apply(null, arguments) + '\n');
	  logStdout.write(util.format.apply(null, arguments) + '\n');	
	};
	console.error=console.log;
}

// Initializing db
createTables();


// STARTING REST SERVER
let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// WE MAY USE A TOKEN (authentication system)
app.use(checkToken);

app.all('/*', function(req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Initialize routes
app.use('/concepts', conceptRoutes);
app.use('/users', userRoutes);
app.use('/writings', writingRoutes);

// Start rest server
startServer(app);
