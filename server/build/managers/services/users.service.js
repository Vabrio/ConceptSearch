"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users_dao_mysql_1 = require("../dao/users.dao.mysql");
var UsersService = (function () {
    function UsersService() {
    }
    UsersService.create = function (user, res) {
        users_dao_mysql_1.UsersDAO.findByName(user.name, function (err, userF) {
            if (err) {
                res.status(500).json({ success: false, message: 'db_error', type: 0 });
            }
            else if (userF) {
                res.json({ success: false, message: 'Login already token !', type: 1 });
            }
            else {
                users_dao_mysql_1.UsersDAO.create(user, function (err, user2) {
                    res.json({ 'success': 'User created !', 'user': user2 });
                });
            }
        });
    };
    UsersService.update = function (user, cb) {
        users_dao_mysql_1.UsersDAO.update(user, cb);
    };
    UsersService.delete = function (id, cb) {
        return users_dao_mysql_1.UsersDAO.delete(id, function (err, user) {
            cb(err, user);
        });
    };
    UsersService.find = function (id, cb) {
        return users_dao_mysql_1.UsersDAO.find(id, cb);
    };
    UsersService.findByName = function (name, cb) {
        return users_dao_mysql_1.UsersDAO.findByName(name, cb);
    };
    UsersService.list = function (cb) {
        return users_dao_mysql_1.UsersDAO.list(cb);
    };
    return UsersService;
}());
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map