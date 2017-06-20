declare function require(name:string): any;
const fs = require('fs');
const SQL = require('sql.js');

// Read the database
const filebuffer = fs.readFileSync('../db/CS.sqlite');
let db = new SQL.Database(filebuffer);


// Giving a concept id, returns the adresss of the writing
function getAddress(id: number){
    // Prepare a statement
    let stmt = db.prepare("SELECT address FROM wri_writings WHERE id="+id);
    let res = stmt.getAsObject();
    
    // Bind new values
    stmt.step()
    var row = stmt.getAsObject();
    return row.address;
}

// Given an adress and the passage of the writing gives the extract
function getExtract(address: string, begin?: number, end?: number){
    var iconvlite = require('iconv-lite');
    var filebuffer = fs.readFileSync(address);
    var result = iconvlite.decode(filebuffer,"latin1");
    
    // Check parameters
    if (begin && end){ return result.substring(begin, end); }
    else if (begin){ return result.substring(begin); }
    else if (end){ return result.substring(0, end); }
    else { return result; }
}
// Example of use : console.log(getExtract(getAddress(20), undefined, 150));
// To get full extract, put last two param at undefined


/* Deals with the research 
* @param request : RegExp of the request
* @param writingList : list of writing addresses to be searched on

* TODO : currently, it only find the occurence, we need to use these data to recover correct text
*/
let simpleSearch = function(request: object, writingList: string[]){
    let results: Array<[number[], string]> = [];
    for (let link of writingList){
        console.log(link);
        if (link != undefined){
            var iconvlite = require('iconv-lite');
            var filebuffer = fs.readFileSync(link);
            var result = iconvlite.decode(filebuffer,"latin1");

            var found: number[];
            found = result.match(request);
            
            if (found != null){
                console.log(found.length);
                results.push([found, link]);
           }
        }
    }
    
    return results;
};


export {simpleSearch};