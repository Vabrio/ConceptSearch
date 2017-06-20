declare function require(name:string): any;
declare const Buffer: any;
const fs = require('fs');
const SQL = require('sql.js');

// Read the database
const filebuffer = fs.readFileSync('../db/CS.sqlite');
let db = new SQL.Database(filebuffer);

class Manager {

    // Giving a concept id, returns the adresss of the writing
    static getWriting(id: number){
        // Prepare a statement
        let writing = db.exec("SELECT address FROM wri_writings WHERE id="+id);
        let concepts = db.exec("SELECT name, id FROM cod_concepts_draft WHERE writingid="+id);
        
        let address = writing[0].values[0][0]
        let iconvlite = require('iconv-lite');
        let filebuffer = fs.readFileSync(address);
        let writingText = iconvlite.decode(filebuffer, 'ISO-8859-1');
        
        let conceptList = concepts[0].values[0]
        
        let response = [writingText, conceptList];
        return response;
    }
    
    static getWritingList(){
        let res = db.exec("SELECT id, name, writer, address FROM wri_writings");
        let list =res[0].values;
        
        return JSON.stringify(list);
    }
    
    static addConcept(concept: string, writingId: string, firstCh: string, lastCh: string){
        
        db.run('INSERT INTO cod_concepts_draft (name, writingid, begin, end) VALUES (?,?,?,?)', [concept, writingId, firstCh, lastCh]);
        
        let data = db.export();
        let buffer = new Buffer(data);
        fs.writeFileSync("../db/CS.sqlite", buffer);
        
        return true;
    }
}

export {Manager};