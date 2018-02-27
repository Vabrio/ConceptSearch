"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("./const/const");
var search_algorithm_1 = require("./research/search_algorithm");
var manager_1 = require("./managers/manager");
var init_db_1 = require("./managers/config/mysql/init_db");
init_db_1.createTables();
var concept_model_1 = require("./managers/models/concept.model");
var fs = require("fs");
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
    manager_1.Manager.getWritingList(function (err, rows) {
        if (err) {
            console.log("Error while searching : " + err);
        }
        else {
            var research = search_algorithm_1.globalSearch(request, rows);
            res.header("Content-Type", "text/plain; charset=utf-8");
            res.status(200).send(research);
        }
    });
});
app.post('/concept', function (req, res) {
    var query = req.query;
    var concept = new concept_model_1.ConceptModel({
        'name': query.name,
        'writingid': query.idWri,
        'begin': query.begin,
        'end': query.end,
        'extract': JSON.parse(query.extract),
        'userid': query.userId,
        'strength': query.strength
    });
    manager_1.Manager.addConcept(concept, res);
});
app.get('/read', function (req, res) {
    var idWri = req.query.idWri;
    var list = JSON.parse(req.query.list);
    var author = req.query.author;
    var title = req.query.title;
    manager_1.Manager.getWriting(idWri, function (err, wri) {
        if (err) {
            console.log("couldn't access writing with error : " + err);
        }
        else {
            var writingText = wri.writing, concepts = wri.concepts;
            var htmlFormatting = [], found = void 0;
            for (var _i = 0, concepts_1 = concepts; _i < concepts_1.length; _i++) {
                var c = concepts_1[_i];
                var request = c.extract;
                request = request.replace(new RegExp("\n", 'g'), "(\n|\r|\r\n)+");
                var regExp = new RegExp(request, 'im');
                if (found = regExp.exec(writingText)) {
                    htmlFormatting.push([found.index, '<span class="hoverItem"><span class="hiddenText">' + c.name + '</span>']);
                    htmlFormatting.push([found.index + (found[0]).length, '</span>']);
                }
            }
            var n = list.length, index = void 0, pattern = void 0;
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
            var m = htmlFormatting.length;
            for (var _a = 0, htmlFormatting_1 = htmlFormatting; _a < htmlFormatting_1.length; _a++) {
                var form = htmlFormatting_1[_a];
                writingText = writingText.substring(0, form[0]) + form[1] + writingText.substring(form[0]);
            }
            var result = writingText;
            res.end(JSON.stringify([result, author, title, idWri]));
        }
    });
});
var server = app.listen(const_1.PORT, function () {
    var port = server.address().port;
    console.log("Server listening on port : %s", port);
});
//# sourceMappingURL=rest_server.js.map