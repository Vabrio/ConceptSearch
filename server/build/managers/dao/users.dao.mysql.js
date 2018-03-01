"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_db_1 = require("../config/mysql/mysql.db");
const user_model_1 = require("../models/user.model");
class UsersDAO {
    static create(user, cb) {
        mysql_db_1.db.query('INSERT INTO use_users SET name = ?, password = ?', [user.name, user.password], (err, result) => {
            user.id = result.insertId;
            cb(err, user);
        });
    }
    static update(user, cb) {
        mysql_db_1.db.query('UPDATE use_users SET firstname = ?, lastname = ?, email = ?, birth_date = ?, status = ? WHERE id = ?', [user.firstname, user.lastname, user.email, user.birth_date, user.status, user.id], (err) => {
            cb(err, user);
        });
    }
    static delete(id, cb) {
        mysql_db_1.db.query('DELETE FROM use_users WHERE id = ?', [id], (err) => {
            cb(err);
        });
    }
    static list(cb) {
        mysql_db_1.db.query('SELECT * FROM use_users', (err, rows) => {
            cb(err, rows.map((row) => {
                return new user_model_1.UserModel(row);
            }));
        });
    }
    static find(id, cb) {
        mysql_db_1.db.query('SELECT * FROM use_users WHERE id = ? LIMIT 1', [id], (err, rows) => {
            cb(err, new user_model_1.UserModel(rows[0]));
        });
    }
    static findByName(name, cb) {
        mysql_db_1.db.query('SELECT * FROM use_users WHERE name = ? LIMIT 1', [name], (err, rows) => {
            if (rows.length > 0)
                cb(err, new user_model_1.UserModel(rows[0]));
            else
                cb(err, null);
        });
    }
}
exports.UsersDAO = UsersDAO;
//# sourceMappingURL=users.dao.mysql.js.map