"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_db_1 = require("../config/mysql/mysql.db");
const concept_model_1 = require("../models/concept.model");
const const_1 = require("../../const/const");
class ConceptsDAO {
    static create(concept, cb) {
        mysql_db_1.db.query('INSERT INTO con_concepts SET name = ?, writingid = ?, begin = ?, end = ?, extract= ?, userid = ?, strength = ?', [concept.name, concept.writingid, concept.begin, concept.end, concept.extract, concept.userid, concept.strength], (err, result) => {
            concept.id = result.insertId;
            cb(err, concept);
        });
    }
    static find(id, cb) {
        mysql_db_1.db.query('SELECT * FROM con_concepts WHERE id = ? LIMIT 1', [id], (err, rows) => {
            cb(err, new concept_model_1.ConceptModel(rows[0]));
        });
    }
    static deletion(id, cb) {
        mysql_db_1.db.query('DELETE FROM con_concepts WHERE id = ?', [id], (err) => {
            cb(err);
        });
    }
    static list(cb) {
        mysql_db_1.db.query('SELECT * FROM con_concepts', (err, rows) => {
            cb(err, rows.map((row) => {
                return new concept_model_1.ConceptModel(row);
            }));
        });
    }
    static listFromWritingId(writingid, name, cb) {
        let names = " '" + name + "' ";
        for (let n of const_1.NAMES_UNAVAILABLE) {
            names = names + " , '" + n + "' ";
        }
        ;
        mysql_db_1.db.query('SELECT * FROM con_concepts WHERE writingid = ? AND userid in ( ' + names + ' )', [writingid], (err, rows) => {
            cb(err, rows.map((row) => {
                return new concept_model_1.ConceptModel(row);
            }));
        });
    }
    static listFromUserName(name, cb) {
        mysql_db_1.db.query('SELECT * FROM con_concepts WHERE userid = ?', [name], (err, rows) => {
            cb(err, rows.map((row) => {
                return new concept_model_1.ConceptModel(row).toJSON();
            }));
        });
    }
}
exports.ConceptsDAO = ConceptsDAO;
//# sourceMappingURL=concepts.dao.mysql.js.map