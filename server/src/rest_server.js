"use strict";
exports.__esModule = true;
// Research Function
var search_algorithm_1 = require("./search_algorithm");
// DB communication
var db_communication_1 = require("./db_communication");
var express = require('express');
var app = express();
app.get('/search/', function (req, res) {
    var id = req.query.id;
    // String sent to client, header is necessary to get the accents
    res.header("Content-Type", "text/plain; charset=utf-8");
    var resp = db_communication_1.Manager.getWriting(id);
    res.end(resp);
});
app.get('/list', function (req, res) {
    // Return a JSON list of all writings, to be used afterwards
    res.header("Content-Type", "text/plain; charset=utf-8");
    res.end(db_communication_1.Manager.getWritingList());
});
app.post('/concept/', function (req, res) {
    var query = req.query;
    var id = query.id;
    var name = query.name;
    var begin = query.begin;
    var end = query.end;
    var response = db_communication_1.Manager.addConcept(name, id, begin, end);
    res.end(response);
});
var list = JSON.parse(db_communication_1.Manager.getWritingList());
var addressList = [];
for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
    var l = list_1[_i];
    addressList.push(l[3]);
}
var regE = new RegExp('justice', 'ig');
search_algorithm_1.simpleSearch(regE, addressList);
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server listening at http://%s:%s", host, port);
});
