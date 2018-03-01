"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const concepts_dao_mysql_1 = require("../dao/concepts.dao.mysql");
class ConceptsService {
    static create(concept, cb) {
        concepts_dao_mysql_1.ConceptsDAO.create(concept, cb);
    }
    static deletion(id, cb) {
        return concepts_dao_mysql_1.ConceptsDAO.deletion(id, (err, concept) => {
            cb(err, concept);
        });
    }
    static find(id, cb) {
        return concepts_dao_mysql_1.ConceptsDAO.find(id, cb);
    }
    static list(cb) {
        return concepts_dao_mysql_1.ConceptsDAO.list(cb);
    }
    static listFromWritingId(writingid, name, cb) {
        return concepts_dao_mysql_1.ConceptsDAO.listFromWritingId(writingid, name, cb);
    }
    static listFromUserName(name, cb) {
        return concepts_dao_mysql_1.ConceptsDAO.listFromUserName(name, cb);
    }
}
exports.ConceptsService = ConceptsService;
//# sourceMappingURL=concepts.service.js.map