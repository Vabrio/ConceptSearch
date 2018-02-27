import { DB_LOCATION } from "../const/const";

declare function require(name:string): any;
declare const Buffer: any;
import fs = require('fs');
let SQL = require('sql.js');

// Read the database
const filebuffer = fs.readFileSync('../db/CS.sqlite');
let db = new SQL.Database(filebuffer);

class Manager {

    // Giving a concept id, returns the adresss of the writing
    static getWriting(id: number){
        // Prepare a statement
        let writing = db.exec("SELECT address FROM wri_writings WHERE id="+id);
        let concepts = db.exec("SELECT id, name, begin, end, extract, userid, strength FROM cod_concepts_draft WHERE writingid="+id);
        
        let address = writing[0].values[0][0]
        let iconvlite = require('iconv-lite');
        let filebuffer = fs.readFileSync(address);
        let writingText = iconvlite.decode(filebuffer, 'ISO-8859-1');
    
	let conceptList : any[] = [];
		if (concepts[0]){
        	conceptList = concepts[0].values;
		}
        
        let response = [writingText, conceptList];
        return response;
    }
    
	// Return the writings table
    static getWritingList(){
        let res = db.exec("SELECT id, name, writer, address FROM wri_writings;");
        let list =res[0].values;
		return JSON.stringify(list);
    }
    
	// Adds a concept to the DB
    static addConcept(concept: string, writingId: string, firstCh: number, lastCh: number, extract: string, userId: string, strength: number){
		
        db.run('INSERT INTO cod_concepts_draft (name, writingid, begin, end, extract, userid, strength) VALUES (?,?,?,?,?,?,?)', [concept, writingId, firstCh, lastCh, extract, userId, strength]);
        
        let data = db.export();
        let buffer = new Buffer(data);
        fs.writeFileSync("../db/CS.sqlite", buffer);
        
        return true;
    }
}


export {Manager};