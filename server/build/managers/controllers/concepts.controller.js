"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var concepts_service_1 = require("../services/concepts.service");
var ConceptsController = (function () {
    function ConceptsController() {
    }
    ConceptsController.create = function (req, res) {
        var conceptModel = req.body;
        if (!conceptModel.isValid()) {
            return res.status(500).json({ 'error': 'Failed to create concept, missing fields !' });
        }
        concepts_service_1.ConceptsService.create(conceptModel, function (err, concept) {
            if (err) {
                res.status(500).json({ 'error': 'Failed to create concept !' });
            }
            else {
                res.json({ 'success': 'Concept created !', 'concept': concept });
            }
        });
    };
    ConceptsController.read = function (req, res) {
        if (isNaN(req.params.idConcept)) {
            res.status(500).json({ 'error': 'You did not enter a correct id' });
        }
        else {
            concepts_service_1.ConceptsService.find(req.params.idConcept, function (err, concept) {
                res.json(concept);
            });
        }
    };
    ConceptsController.deletion = function (req, res) {
        if (isNaN(req.params.idConcept)) {
            res.status(500).json({ 'error': 'You did not enter a correct id' });
        }
        else {
            concepts_service_1.ConceptsService.deletion(req.params.idConcept, function (err, concept) {
                if (err) {
                    res.status(500).json({ 'error': 'Failed to delete concept !' });
                }
                else {
                    res.json({ 'success': 'User concept !', 'concept': concept });
                }
            });
        }
    };
    ConceptsController.list = function (req, res) {
        concepts_service_1.ConceptsService.list(function (err, concepts) {
            res.json(concepts);
        });
    };
    ConceptsController.listFromWritingId = function (writingid, res) {
        concepts_service_1.ConceptsService.listFromWritingId(writingid, res);
    };
    return ConceptsController;
}());
exports.ConceptsController = ConceptsController;
//# sourceMappingURL=concepts.controller.js.map