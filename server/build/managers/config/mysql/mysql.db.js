"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'conceptsearch',
    password: 'password',
    database: 'cs'
});
exports.db = connection;
connection.connect();
//# sourceMappingURL=mysql.db.js.map