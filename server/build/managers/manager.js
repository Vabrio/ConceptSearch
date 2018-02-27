"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var writings_service_1 = require("./services/writings.service");
var concepts_service_1 = require("./services/concepts.service");
var Manager = (function () {
    function Manager() {
    }
    Manager.getWriting = function (id, res) {
        writings_service_1.WritingsService.find(id, function (err, writing) {
            if (err) {
                res(err, null);
            }
            else {
                var iconvlite = require('iconv-lite');
                var filebuffer = fs.readFileSync(writing.address);
                var writingText_1 = iconvlite.decode(filebuffer, 'ISO-8859-1');
                concepts_service_1.ConceptsService.listFromWritingId(id, function (err, concepts) {
                    if (err) {
                        console.log("test");
                        res(err, { "writing": writingText_1, "concepts": [] });
                    }
                    else {
                        res(err, { "writing": writingText_1, "concepts": concepts });
                    }
                });
            }
        });
    };
    Manager.getWritingList = function (res) {
        writings_service_1.WritingsService.list(res);
    };
    Manager.addConcept = function (concept, res) {
        concepts_service_1.ConceptsService.create(concept, function (err, conceptR) {
            if (err) {
                res.status(500).json({ 'error': 'Failed to create concept !' });
            }
            else {
                res.json({ 'success': 'Concept created !', 'concept': conceptR });
            }
        });
    };
    return Manager;
}());
exports.Manager = Manager;
//# sourceMappingURL=manager.js.map