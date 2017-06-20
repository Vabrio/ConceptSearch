"use strict";
exports.__esModule = true;
var fs = require('fs');
var SQL = require('sql.js');
// Read the database
var filebuffer = fs.readFileSync('../db/CS.sqlite');
var db = new SQL.Database(filebuffer);
// Giving a concept id, returns the adresss of the writing
function getAddress(id) {
    // Prepare a statement
    var stmt = db.prepare("SELECT address FROM wri_writings WHERE id=" + id);
    var res = stmt.getAsObject();
    // Bind new values
    stmt.step();
    var row = stmt.getAsObject();
    return row.address;
}
// Given an adress and the passage of the writing gives the extract
function getExtract(address, begin, end) {
    var iconvlite = require('iconv-lite');
    var filebuffer = fs.readFileSync(address);
    var result = iconvlite.decode(filebuffer, "latin1");
    // Check parameters
    if (begin && end) {
        return result.substring(begin, end);
    }
    else if (begin) {
        return result.substring(begin);
    }
    else if (end) {
        return result.substring(0, end);
    }
    else {
        return result;
    }
}
// Example of use : console.log(getExtract(getAddress(20), undefined, 150));
// To get full extract, put last two param at undefined
/* Deals with the research
* @param request : RegExp of the request
* @param writingList : list of writing addresses to be searched on
*/
var simpleSearch = function (request, writingList) {
    var results = [];
    for (var _i = 0, writingList_1 = writingList; _i < writingList_1.length; _i++) {
        var link = writingList_1[_i];
        console.log(link);
        if (link != undefined) {
            var iconvlite = require('iconv-lite');
            var filebuffer = fs.readFileSync(link);
            var result = iconvlite.decode(filebuffer, "latin1");
            var found;
            found = result.match(request);
            if (found != null) {
                console.log(found.length);
                results.push([found, link]);
            }
        }
    }
    return results;
};
exports.simpleSearch = simpleSearch;
