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
    var name = query.name;
    var idWri = query.idWri;
    var extract = query.extract;
    var userId = query.userId;
    var strength = query.strength;
    var begin = -1, end = -1;
    var response = db_communication_1.Manager.addConcept(name, idWri, begin, end, extract, userId, strength);
    res.send(response);
    console.log("Concept added : " + name);
});
app.get('/read', function (req, res) {
    var idWri = req.query.idWri;
    var list = JSON.parse(req.query.list);
    var author = req.query.author;
    var title = req.query.title;
    var response = db_communication_1.Manager.getWriting(idWri);
    var writingText = response[0], concepts = response[1];
    var htmlFormatting = [], found;
    for (var _i = 0, concepts_1 = concepts; _i < concepts_1.length; _i++) {
        var c = concepts_1[_i];
        htmlFormatting.push([c[2], '<span class="hoverItem"><span class="hiddenText">' + c[1] + '</span>']);
        htmlFormatting.push([c[3], '</span>']);
    }
    var n = list.length, index, pattern;
    for (var k = n - 1; k >= 0; k--) {
        pattern = list[k][1];
        index = list[k][2];
        htmlFormatting.push([index, "<a class='extract' name='" + index.toString() + "'><b>"]);
        htmlFormatting.push([index + pattern.length, '</b></a>']);
    }
    var customSortFunction = function (a, b) {
        return b[0] - a[0];
    };
    htmlFormatting.sort(customSortFunction);
    console.log(htmlFormatting);
    var m = htmlFormatting.length;
    for (var _a = 0, htmlFormatting_1 = htmlFormatting; _a < htmlFormatting_1.length; _a++) {
        var form = htmlFormatting_1[_a];
        writingText = writingText.substring(0, form[0]) + form[1] + writingText.substring(form[0]);
    }
    var result = writingText;
    res.end(JSON.stringify([result, author, title, idWri]));
});
var server = app.listen(const_1.PORT, function () {
    var port = server.address().port;
    console.log("Server listening on port : %s", port);
});
//# sourceMappingURL=rest_server.js.map