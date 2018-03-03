"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_db_1 = require("../config/mysql/mysql.db");
const writing_model_1 = require("../models/writing.model");
class WritingsDAO {
    static create(writing, cb) {
        mysql_db_1.db.query('INSERT INTO wri_writings SET address = ?, name = ?, writer = ?', [writing.address, writing.name, writing.writer], (err, result) => {
            writing.id = result.insertId;
            cb(err, writing);
        });
    }
    static list(cb) {
        mysql_db_1.db.query('SELECT * FROM wri_writings', (err, rows) => {
            cb(err, rows.map((row) => {
                return new writing_model_1.WritingModel(row);
            }));
        });
    }
    static find(id, cb) {
        mysql_db_1.db.query('SELECT * FROM wri_writings WHERE id = ? LIMIT 1', [id], (err, rows) => {
            cb(err, new writing_model_1.WritingModel(rows[0]));
        });
    }
}
exports.WritingsDAO = WritingsDAO;
//# sourceMappingURL=writings.dao.mysql.js.map