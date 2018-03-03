"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_dao_mysql_1 = require("../dao/users.dao.mysql");
const const_1 = require("../../const/const");
class UsersService {
    static create(user, res) {
        if (const_1.NAMES_UNAVAILABLE.includes(user.name)) {
            res.json({ success: false, message: 'Login already token !', type: 1 });
        }
        users_dao_mysql_1.UsersDAO.findByName(user.name, (err, userF) => {
            if (err) {
                res.status(500).json({ success: false, message: 'db_error', type: 0 });
            }
            else if (userF) {
                res.json({ success: false, message: 'Login already token !', type: 1 });
            }
            else {
                users_dao_mysql_1.UsersDAO.create(user, (err, user2) => {
                    res.json({ 'success': 'User created !', 'user': user2 });
                });
            }
        });
    }
    static update(user, cb) {
        users_dao_mysql_1.UsersDAO.update(user, cb);
    }
    static delete(id, cb) {
        return users_dao_mysql_1.UsersDAO.delete(id, (err, user) => {
            cb(err, user);
        });
    }
    static find(id, cb) {
        return users_dao_mysql_1.UsersDAO.find(id, cb);
    }
    static findByName(name, cb) {
        return users_dao_mysql_1.UsersDAO.findByName(name, cb);
    }
    static list(cb) {
        return users_dao_mysql_1.UsersDAO.list(cb);
    }
}
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map