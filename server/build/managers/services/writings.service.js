"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const writings_dao_mysql_1 = require("../dao/writings.dao.mysql");
class WritingsService {
    static create(writing, cb) {
        writings_dao_mysql_1.WritingsDAO.create(writing, cb);
    }
    static find(id, cb) {
        return writings_dao_mysql_1.WritingsDAO.find(id, cb);
    }
    static list(cb) {
        return writings_dao_mysql_1.WritingsDAO.list(cb);
    }
}
exports.WritingsService = WritingsService;
//# sourceMappingURL=writings.service.js.map