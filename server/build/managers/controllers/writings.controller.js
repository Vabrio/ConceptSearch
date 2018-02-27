"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var writings_service_1 = require("../services/writings.service");
var WritingsController = (function () {
    function WritingsController() {
    }
    WritingsController.create = function (req, res) {
        var writingModel = req.body;
        if (!writingModel.isValid()) {
            return res.status(500).json({ 'error': 'Failed to create writing, missing fields !' });
        }
        writings_service_1.WritingsService.create(writingModel, function (err, writing) {
            if (err) {
                res.status(500).json({ 'error': 'Failed to create writing !' });
            }
            else {
                res.json({ 'success': 'Writing created !', 'writing': writing });
            }
        });
    };
    WritingsController.find = function (idWriting, res) {
        if (isNaN(idWriting)) {
            res.status(500).json({ 'error': 'You did not enter a correct id' });
        }
        else {
            writings_service_1.WritingsService.find(idWriting, res);
        }
    };
    WritingsController.list = function (res) {
        writings_service_1.WritingsService.list(res);
    };
    return WritingsController;
}());
exports.WritingsController = WritingsController;
//# sourceMappingURL=writings.controller.js.map