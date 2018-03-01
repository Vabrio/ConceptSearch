"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_db_1 = require("./mysql.db");
function createTables() {
    mysql_db_1.db.query("SHOW TABLES LIKE 'wri_writings'", (err, result) => {
        if (result.length == 0) {
            mysql_db_1.db.query("CREATE TABLE wri_writings (id integer primary key auto_increment, address text, name text, writer text);");
            initialize_writings();
            console.log("WRITINGS TABLE INITIALIZED");
        }
        else if (err) {
            console.log("error while accessing wri_writings table : " + err);
        }
    });
    mysql_db_1.db.query("SHOW TABLES LIKE 'con_concepts'", (err, result) => {
        if (result.length == 0) {
            mysql_db_1.db.query("CREATE TABLE con_concepts (id integer primary key auto_increment, name text, writingid integer, begin integer, end integer, extract text, userid text, strength integer, created_at datetime default current_timestamp);");
            console.log("CONCEPTS TABLE INITIALIZED");
        }
        else if (err) {
            console.log("error while accessing con_concepts table : " + err);
        }
    });
    mysql_db_1.db.query("SHOW TABLES LIKE 'use_users'", (err, result) => {
        if (result.length == 0) {
            mysql_db_1.db.query("CREATE TABLE use_users (id integer primary key auto_increment, name text, password text, firstname text, lastname text, email text, birth_date datetime, status integer default 1, created_at datetime default current_timestamp);");
            console.log("USERS TABLE INITIALIZED");
        }
        else if (err) {
            console.log("error while accessing use_users table : " + err);
        }
    });
}
exports.createTables = createTables;
const writing_model_1 = require("../../models/writing.model");
const writings_service_1 = require("../../services/writings.service");
let fs = require('fs');
function initialize_writings() {
    let paths = ["../Library/French/Baha'i"];
    let filePaths = [];
    while (paths.length > 0) {
        let p = paths.shift();
        if (fs.lstatSync(p).isDirectory()) {
            let elems = fs.readdirSync(p);
            for (let k = 0; k < elems.length; k++) {
                paths.push(p + "/" + elems[k]);
            }
        }
        else if (fs.lstatSync(p).isFile()) {
            filePaths.push(p);
            let splittedData = p.split("/");
            let n = splittedData.length;
            let splittedText = splittedData[n - 1].split('.');
            if (splittedText[splittedText.length - 1] == 'txt') {
                let params = { address: p, name: splittedText[0], writer: splittedData[4] };
                let writing = new writing_model_1.WritingModel(params);
                writings_service_1.WritingsService.create(writing, (err, writing) => {
                    if (err) {
                        console.log("error while cretating writing in db : " + err);
                    }
                });
            }
        }
    }
}
//# sourceMappingURL=init_db.js.map