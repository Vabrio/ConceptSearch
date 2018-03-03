"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = require("../managers/manager");
const search_algorithm_1 = require("../research/search_algorithm");
const writing_format_1 = require("../research/writing_format");
let express = require('express');
var writingRoutes = express.Router();
exports.writingRoutes = writingRoutes;
writingRoutes.get('/search', function (req, res) {
    let request = req.query.request;
    manager_1.Manager.getWritingList((err, rows) => {
        if (err) {
            console.log("Error while searching : " + err);
        }
        else {
            let research = search_algorithm_1.globalSearch(request, rows);
            res.header("Content-Type", "text/plain; charset=utf-8");
            res.status(200).json(research);
        }
    });
});
writingRoutes.get('/read', function (req, res) {
    let idWri = req.query.idWri;
    let list = JSON.parse(req.query.list);
    let author = req.query.author;
    let title = req.query.title;
    manager_1.Manager.getWriting(idWri, (err, writingText) => {
        if (err) {
            console.log("couldn't access writing with error : " + err);
            res.status(500).json({ 'error': 'Failed to access writing !' });
        }
        else {
            manager_1.Manager.getConcepts(idWri, req.decoded, (err, concepts) => {
                if (err) {
                    console.log("couldn't access associated concepts with error : " + err);
                    res.json({ text: writing_format_1.textFormatting(writingText, list, []),
                        author: author, title: title, id: idWri });
                }
                else {
                    res.json({ text: writing_format_1.textFormatting(writingText, list, concepts),
                        author: author,
                        title: title,
                        id: idWri });
                }
            });
        }
    });
});
//# sourceMappingURL=writings.route.js.map