"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_db_1 = require("../config/mysql/mysql.db");
var concept_model_1 = require("../models/concept.model");
var ConceptsDAO = (function () {
    function ConceptsDAO() {
    }
    ConceptsDAO.create = function (concept, cb) {
        mysql_db_1.db.query('INSERT INTO con_concepts SET name = ?, writingid = ?, begin = ?, end = ?, extract= ?, userid = ?, strength = ?', [concept.name, concept.writingid, concept.begin, concept.end, concept.extract, concept.userid, concept.strength], function (err, result) {
            concept.id = result.insertId;
            cb(err, concept);
        });
    };
    ConceptsDAO.find = function (id, cb) {
        mysql_db_1.db.query('SELECT * FROM con_concepts WHERE id = ? LIMIT 1', [id], function (err, rows) {
            cb(err, new concept_model_1.ConceptModel(rows[0]));
        });
    };
    ConceptsDAO.deletion = function (id, cb) {
        mysql_db_1.db.query('DELETE FROM con_concepts WHERE id = ?', [id], function (err) {
            cb(err);
        });
    };
    ConceptsDAO.list = function (cb) {
        mysql_db_1.db.query('SELECT * FROM con_concepts', function (err, rows) {
            cb(err, rows.map(function (row) {
                return new concept_model_1.ConceptModel(row);
            }));
        });
    };
    ConceptsDAO.listFromWritingId = function (writingid, cb) {
        mysql_db_1.db.query('SELECT * FROM con_concepts WHERE writingid = ?', [writingid], function (err, rows) {
            cb(err, rows.map(function (row) {
                return new concept_model_1.ConceptModel(row);
            }));
        });
    };
    ConceptsDAO.listFromUserName = function (name, cb) {
        mysql_db_1.db.query('SELECT * FROM con_concepts WHERE userid = ?', [name], function (err, rows) {
            cb(err, rows.map(function (row) {
                return new concept_model_1.ConceptModel(row).toJSON();
            }));
        });
    };
    return ConceptsDAO;
}());
exports.ConceptsDAO = ConceptsDAO;
//# sourceMappingURL=concepts.dao.mysql.js.map