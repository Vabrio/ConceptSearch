var fs = require('fs');
var SQL = require('sql.js');
var db = new SQL.Database();
db.run("CREATE TABLE wri_writings (id integer primary key, address text, name text, writer text);");
db.run("CREATE TABLE cod_concepts_draft (id integer primary key, name text, writingid integer, begin integer, end integer, userid text, strength integer);");
db.run("CREATE TABLE coo_concepts_ordered (id integer primary key, name text, writingid integer, begin integer, end integer, force integer);");
db.run("CREATE TABLE gra_graphe_concepts (conceptname text, neighbors text[]);");
var paths = ["../Library/French/Baha'i"];
var filePaths = [];
while (paths.length > 0) {
    var p = paths.shift();
    if (fs.lstatSync(p).isDirectory()) {
        var elems = fs.readdirSync(p);
        for (var k = 0; k < elems.length; k++) {
            paths.push(p + "/" + elems[k]);
        }
    }
    else if (fs.lstatSync(p).isFile()) {
        filePaths.push(p);
        var splittedData = p.split("/");
        var n = splittedData.length;
        var splittedText = splittedData[n - 1].split('.');
        if (splittedText[splittedText.length - 1] == 'txt') {
            db.run("INSERT INTO wri_writings (address, name, writer) VALUES (?,?,?)", [p, splittedText[0], splittedData[4]]);
        }
    }
}
var data = db.export();
var buffer = new Buffer(data);
fs.writeFileSync("CS.sqlite", buffer);
//# sourceMappingURL=db_creation.js.map