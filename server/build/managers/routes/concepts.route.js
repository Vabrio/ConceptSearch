"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
exports.routerConcept = router;
var concepts_controller_1 = require("../controllers/concepts.controller");
router.route('/')
    .get(concepts_controller_1.ConceptsController.list)
    .post(concepts_controller_1.ConceptsController.create);
router.route('/:idConcept')
    .get(concepts_controller_1.ConceptsController.read)
    .delete(concepts_controller_1.ConceptsController.deletion);
//# sourceMappingURL=concepts.route.js.map