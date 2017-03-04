var fs = require('fs');
var SQL = require('sql.js');

// Create the database
var filebuffer = fs.readFileSync('../CS.sqlite');
var db = new SQL.Database(filebuffer);

// Giving a concept id, returns the adresss of the writing
function getAdress(id){
    // Prepare a statement
    var stmt = db.prepare("SELECT adress FROM wri_writings WHERE id="+id);
    var res = stmt.getAsObject(); // {col1:1, col2:111}
    var adresse;
    // Bind new values
    stmt.step()
    var row = stmt.getAsObject();
    return row.adress;
}

// Given an adress and the passage of the writing gives the extract
function getExtract(adress, begin, end){
    var iconvlite = require('iconv-lite');
    var filebuffer = fs.readFileSync("../"+adress);
    var result = iconvlite.decode(filebuffer,"latin1");

    return result.substring(begin, end);
}
console.log(getExtract(adress, 50,1000));