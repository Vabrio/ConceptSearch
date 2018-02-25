"use strict";
exports.__esModule = true;
var search_algorithm_1 = require("./search_algorithm");
var db_communication_1 = require("./db_communication");
var const_1 = require("./const");
var fs = require('fs');
if (const_1.LOG_FILE) {
    var util_1 = require('util');
    var logFile = fs.createWriteStream('log.txt', { flags: 'a' });
    var logStdout = process.stdout;
    console.log = function () {
        logFile.write(util_1.format.apply(null, arguments) + '\n');
        logStdout.write(util_1.format.apply(null, arguments) + '\n');
    };
    console.error = console.log;
}
var express = require('express');
var app = express();
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.get('/search', function (req, res) {
    var request = req.query.request;
    var list = JSON.parse(db_communication_1.Manager.getWritingList());
    var research = search_algorithm_1.globalSearch(request, list);
    res.header("Content-Type", "text/plain; charset=utf-8");
    res.status(200).send(research);
    console.log("Research requested : " + request);
});
app.get('/list', function (req, res) {
    res.header("Content-Type", "text/plain; charset=utf-8");
    res.send(db_communication_1.Manager.getWritingList());
    console.log("List requested and sent \n");
});
app.post('/concept', function (req, res) {
    var query = req.query;
    var id = query.id;
    var name = query.name;
    console.log(req.body);
    res.end(name);
    console.log("Concept added : " + name);
});
app.get('/read', function (req, res) {
    var address = req.query.address;
    var list = JSON.parse(req.query.list);
    var author = req.query.author;
    var title = req.query.title;
    var iconvlite = require('iconv-lite');
    var filebuffer = fs.readFileSync(address);
    var writingText = iconvlite.decode(filebuffer, "latin1");
    var n = list.length, index, pattern;
    for (var k = n - 1; k >= 0; k--) {
        pattern = list[k][1];
        index = list[k][2];
        writingText = writingText.substring(0, index) + "<a class='extract' name='" + index.toString() + "'><b>" + writingText.substring(index, index + pattern.length) + "</b></a>" + writingText.substring(index + pattern.length);
    }
    var result = writingText;
    res.end(JSON.stringify([result, author, title]));
});
var server = app.listen(const_1.PORT, function () {
    var port = server.address().port;
    console.log("Server listening on port : %s", port);
});
//# sourceMappingURL=rest_server.js.map