"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var writings_dao_mysql_1 = require("../dao/writings.dao.mysql");
var WritingsService = (function () {
    function WritingsService() {
    }
    WritingsService.create = function (writing, cb) {
        writings_dao_mysql_1.WritingsDAO.create(writing, cb);
    };
    WritingsService.find = function (id, cb) {
        return writings_dao_mysql_1.WritingsDAO.find(id, cb);
    };
    WritingsService.list = function (cb) {
        return writings_dao_mysql_1.WritingsDAO.list(cb);
    };
    return WritingsService;
}());
exports.WritingsService = WritingsService;
//# sourceMappingURL=writings.service.js.map