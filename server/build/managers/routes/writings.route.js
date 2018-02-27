"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
exports.routerWriting = router;
var writings_controller_1 = require("../controllers/writings.controller");
router.route('/')
    .get(writings_controller_1.WritingsController.list)
    .post(writings_controller_1.WritingsController.create);
router.route('/:idWriting')
    .get(writings_controller_1.WritingsController.read);
//# sourceMappingURL=writings.route.js.map