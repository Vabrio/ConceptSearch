"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_db_1 = require("../config/mysql/mysql.db");
var writing_model_1 = require("../models/writing.model");
var WritingsDAO = (function () {
    function WritingsDAO() {
    }
    WritingsDAO.create = function (writing, cb) {
        mysql_db_1.db.query('INSERT INTO wri_writings SET address = ?, name = ?, writer = ?', [writing.address, writing.name, writing.writer], function (err, result) {
            writing.id = result.insertId;
            cb(err, writing);
        });
    };
    WritingsDAO.list = function (cb) {
        mysql_db_1.db.query('SELECT * FROM wri_writings', function (err, rows) {
            cb(err, rows.map(function (row) {
                return new writing_model_1.WritingModel(row);
            }));
        });
    };
    WritingsDAO.find = function (id, cb) {
        mysql_db_1.db.query('SELECT * FROM wri_writings WHERE id = ? LIMIT 1', [id], function (err, rows) {
            cb(err, new writing_model_1.WritingModel(rows[0]));
        });
    };
    return WritingsDAO;
}());
exports.WritingsDAO = WritingsDAO;
//# sourceMappingURL=writings.dao.mysql.js.map