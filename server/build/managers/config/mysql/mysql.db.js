"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'conceptsearch',
    password: 'password',
    database: 'cs'
});
exports.db = connection;
connection.connect();
//# sourceMappingURL=mysql.db.js.map