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
        var concepts = db.exec("SELECT id, name, begin, end, extract, userid, strength FROM cod_concepts_draft WHERE writingid=" + id);
        var address = writing[0].values[0][0];
        var iconvlite = require('iconv-lite');
        var filebuffer = fs.readFileSync(address);
        var writingText = iconvlite.decode(filebuffer, 'ISO-8859-1');
        var conceptList = [];
        if (concepts[0]) {
            conceptList = concepts[0].values;
        }
        var response = [writingText, conceptList];
        return response;
    };
    Manager.getWritingList = function () {
        var res = db.exec("SELECT id, name, writer, address FROM wri_writings;");
        var list = res[0].values;
        return JSON.stringify(list);
    };
    Manager.getWritingsIdOnCondition = function (addr, wri_name, author) {
        var addrS = "", wriS = "", authorS = "";
        if (addr != "") {
            addrS = 'address="' + addr + '"';
        }
        ;
        if (wri_name != "") {
            wriS = " AND name='" + wri_name + "'";
        }
        ;
        if (author != "") {
            authorS = " AND writer='" + author + "'";
        }
        ;
        var req = "SELECT id, address FROM wri_writings WHERE " + addrS + wriS + authorS;
        var res = db.exec(req);
        var list = res[0].values;
        return JSON.stringify(list);
    };
    Manager.addConcept = function (concept, writingId, firstCh, lastCh, extract, userId, strength) {
        db.run('INSERT INTO cod_concepts_draft (name, writingid, begin, end, extract, userid, strength) VALUES (?,?,?,?,?,?,?)', [concept, writingId, firstCh, lastCh, extract, userId, strength]);
        var data = db["export"]();
        var buffer = new Buffer(data);
        fs.writeFileSync("../db/CS.sqlite", buffer);
        return true;
    };
    return Manager;
}());
exports.Manager = Manager;
//# sourceMappingURL=db_communication.js.map