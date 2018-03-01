"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("./const/const");
const init_db_1 = require("./managers/config/mysql/init_db");
init_db_1.createTables();
let fs = require('fs');
let bodyParser = require('body-parser');
if (const_1.LOG_FILE) {
    let util = require('util');
    var logFile = fs.createWriteStream('log.txt', { flags: 'a' });
    var logStdout = process.stdout;
    console.log = function () {
        logFile.write(util.format.apply(null, arguments) + '\n');
        logStdout.write(util.format.apply(null, arguments) + '\n');
    };
    console.error = console.log;
}
let express = require('express');
let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const token_1 = require("./routes/token");
app.use(token_1.checkToken);
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
const concepts_route_1 = require("./routes/concepts.route");
const users_route_1 = require("./routes/users.route");
const writings_route_1 = require("./routes/writings.route");
app.use('/concepts', concepts_route_1.conceptRoutes);
app.use('/users', users_route_1.userRoutes);
app.use('/writings', writings_route_1.writingRoutes);
var server = app.listen(const_1.PORT, function () {
    var port = server.address().port;
    console.log("Server listening on port : %s", port);
});
//# sourceMappingURL=rest_server.js.map