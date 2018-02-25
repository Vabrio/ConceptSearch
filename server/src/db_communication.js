"use strict";
exports.__esModule = true;
var fs = require('fs');
var SQL = require('sql.js');
var filebuffer = fs.readFileSync('../db/CS.sqlite');
var db = new SQL.Database(filebuffer);
var Manager = (function () {
    function Manager() {
    }
    Manager.getWriting = function (id) {
        var writing = db.exec("SELECT address FROM wri_writings WHERE id=" + id);
        var concepts = db.exec("SELECT name, id FROM cod_concepts_draft WHERE writingid=" + id);
        var address = writing[0].values[0][0];
        var iconvlite = require('iconv-lite');
        var filebuffer = fs.readFileSync(address);
        var writingText = iconvlite.decode(filebuffer, 'ISO-8859-1');
        var conceptList = concepts[0].values[0];
        var response = [writingText, conceptList];
        return response;
    };
    Manager.getWritingList = function () {
        var res = db.exec("SELECT id, name, writer, address FROM wri_writings");
        var list = res[0].values;
        return JSON.stringify(list);
    };
    Manager.addConcept = function (concept, writingId, firstCh, lastCh) {
        db.run('INSERT INTO cod_concepts_draft (name, writingid, begin, end) VALUES (?,?,?,?)', [concept, writingId, firstCh, lastCh]);
        var data = db["export"]();
        var buffer = new Buffer(data);
        fs.writeFileSync("../db/CS.sqlite", buffer);
        return true;
    };
    return Manager;
}());
exports.Manager = Manager;
//# sourceMappingURL=db_communication.js.map