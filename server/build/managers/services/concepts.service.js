"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var concepts_dao_mysql_1 = require("../dao/concepts.dao.mysql");
var ConceptsService = (function () {
    function ConceptsService() {
    }
    ConceptsService.create = function (concept, cb) {
        concepts_dao_mysql_1.ConceptsDAO.create(concept, cb);
    };
    ConceptsService.deletion = function (id, cb) {
        return concepts_dao_mysql_1.ConceptsDAO.deletion(id, function (err, concept) {
            cb(err, concept);
        });
    };
    ConceptsService.find = function (id, cb) {
        return concepts_dao_mysql_1.ConceptsDAO.find(id, cb);
    };
    ConceptsService.list = function (cb) {
        return concepts_dao_mysql_1.ConceptsDAO.list(cb);
    };
    ConceptsService.listFromWritingId = function (writingid, cb) {
        return concepts_dao_mysql_1.ConceptsDAO.listFromWritingId(writingid, cb);
    };
    ConceptsService.listFromUserName = function (name, cb) {
        return concepts_dao_mysql_1.ConceptsDAO.listFromUserName(name, cb);
    };
    return ConceptsService;
}());
exports.ConceptsService = ConceptsService;
//# sourceMappingURL=concepts.service.js.map