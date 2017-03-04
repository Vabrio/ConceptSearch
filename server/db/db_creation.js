var fs = require('fs');
var SQL = require('sql.js');

//Create the database
var db = new SQL.Database();
// Run a query without reading the results
db.run("CREATE TABLE wri_writings (id integer primary key, adress text, name text, writer text);");
db.run("CREATE TABLE con_concepts (id integer primary key, conceptname text, writingid integer, begin integer, end integer, verse integer, userids integer[], strength integer);");
db.run("CREATE TABLE gra_graphe_concepts (conceptname text, neighbors text[]);");

/*db.run("INSERT INTO wri_writings (adress, name, writer) VALUES (?,?,?)", 
       ["Library/French/Baha'i/Baha'u'llah/Paroles Cachees.txt","Paroles Cachées","Baha'u'llah"]);*/

var data = db.export();
var buffer = new Buffer(data);
fs.writeFileSync("../CS.sqlite", buffer);
