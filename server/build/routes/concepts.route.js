"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const concept_model_1 = require("../managers/models/concept.model");
const manager_1 = require("../managers/manager");
let express = require('express');
var conceptRoutes = express.Router();
exports.conceptRoutes = conceptRoutes;
conceptRoutes.post('/add', function (req, res) {
    let query = req.query;
    let concept = new concept_model_1.ConceptModel({
        'name': query.name,
        'writingid': query.idWri,
        'begin': query.begin,
        'end': query.end,
        'extract': JSON.parse(query.extract),
        'userid': req.decoded.username,
        'strength': query.strength
    });
    manager_1.Manager.addConcept(concept, res);
});
conceptRoutes.get('/list', function (req, res) {
    if (req.decoded.status < 1) {
        res.json({ success: false, message: "you don't have the privileges" });
    }
    else {
        manager_1.Manager.getConceptList(res);
    }
});
//# sourceMappingURL=concepts.route.js.map