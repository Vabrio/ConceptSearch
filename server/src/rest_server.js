"use strict";
exports.__esModule = true;
var search_algorithm_1 = require("./search_algorithm");
var db_communication_1 = require("./db_communication");
var fs = require('fs');
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
    var regE = new RegExp(request, 'ig');
    var research = search_algorithm_1.simpleSearch(regE, list);
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
    var pattern = req.query.pattern;
    var index = parseInt(req.query.index);
    var author = req.query.author;
    var title = req.query.title;
    var iconvlite = require('iconv-lite');
    var filebuffer = fs.readFileSync(address);
    var writingText = iconvlite.decode(filebuffer, "latin1");
    var result = writingText.substring(0, index) + "<span id='extract'><b>" + writingText.substring(index, index + pattern.length) + "</b></span>" + writingText.substring(index + pattern.length);
    res.end(JSON.stringify([result, author, title]));
});
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server listening at http://%s:%s", host, port);
});
//# sourceMappingURL=rest_server.js.map