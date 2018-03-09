//------------------------------------------------------------------
// Mysql parameter and connection
//------------------------------------------------------------------
declare function require(name:string): any;

let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'conceptsearch',
  password : 'password',
  database : 'cs'
});

connection.connect();

export {connection as db};