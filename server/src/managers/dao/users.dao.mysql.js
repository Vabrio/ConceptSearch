//=========================================================================
// Le module DAO contient les requetes pour une base de donnée spécifique.
// Il peut y avoir une DAO MySQL, une DAO PostgreSQL, une DAO Oracle, etc...
// Par la suite il sera facile de switcher de l'une à l'autre sans toucher
// au reste du code de l'application.
//=========================================================================

import {db} from "../config/mysql.db.ts"
let UserModel = require('../models/user.model');


class UsersDAO
{
    static create(user, cb) {
        db.query('INSERT INTO user SET firstname = ?, lastname = ?, age = ?, created_at = ?', [user.firstname, user.lastname, user.age, new Date()], (err, result) => {
            user.id = result.insertId;
            cb(err, user);
        });
    }

    static update(user, cb) {
        db.query('UPDATE user SET firstname = ?, lastname = ?, age = ? WHERE id = ?', [user.firstname, user.lastname, user.age, user.id], (err) => {
            cb(err, user);
        });
    }

    static delete(id, cb) {
        db.query('DELETE FROM user WHERE id = ?', [id], (err) => {
            cb(err);
        });
    }

    static list(cb) {
        db.query('SELECT * FROM user', (err, rows) => {
            cb(err, rows.map((row) => {
                return new UserModel(row)
            }));
        });
    }

    static find(id, cb) {
        db.query('SELECT * FROM user WHERE id = ? LIMIT 1', [id], (err, rows) => {
            cb(err, new UserModel(rows[0]));
        });
    }
}

module.exports = UsersDAO;
