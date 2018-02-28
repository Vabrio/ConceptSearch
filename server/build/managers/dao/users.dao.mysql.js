"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_db_1 = require("../config/mysql/mysql.db");
var user_model_1 = require("../models/user.model");
var UsersDAO = (function () {
    function UsersDAO() {
    }
    UsersDAO.create = function (user, cb) {
        mysql_db_1.db.query('INSERT INTO use_users SET name = ?, password = ?', [user.name, user.password], function (err, result) {
            user.id = result.insertId;
            cb(err, user);
        });
    };
    UsersDAO.update = function (user, cb) {
        mysql_db_1.db.query('UPDATE use_users SET firstname = ?, lastname = ?, email = ?, birth_date = ?, status = ? WHERE id = ?', [user.firstname, user.lastname, user.email, user.birth_date, user.status, user.id], function (err) {
            cb(err, user);
        });
    };
    UsersDAO.delete = function (id, cb) {
        mysql_db_1.db.query('DELETE FROM use_users WHERE id = ?', [id], function (err) {
            cb(err);
        });
    };
    UsersDAO.list = function (cb) {
        mysql_db_1.db.query('SELECT * FROM use_users', function (err, rows) {
            cb(err, rows.map(function (row) {
                return new user_model_1.UserModel(row);
            }));
        });
    };
    UsersDAO.find = function (id, cb) {
        mysql_db_1.db.query('SELECT * FROM use_users WHERE id = ? LIMIT 1', [id], function (err, rows) {
            cb(err, new user_model_1.UserModel(rows[0]));
        });
    };
    UsersDAO.findByName = function (name, cb) {
        mysql_db_1.db.query('SELECT * FROM use_users WHERE name = ? LIMIT 1', [name], function (err, rows) {
            if (rows.length > 0)
                cb(err, new user_model_1.UserModel(rows[0]));
            else
                cb(err, null);
        });
    };
    return UsersDAO;
}());
exports.UsersDAO = UsersDAO;
//# sourceMappingURL=users.dao.mysql.js.map