declare const Buffer: any;
declare function require(name:string): any;
let fs = require('fs');
let SQL = require('sql.js');

//Create the database
let db = new SQL.Database();
// Run a query without reading the results
db.run("CREATE TABLE wri_writings (id integer primary key, address text, name text, writer text);");
db.run("CREATE TABLE cod_concepts_draft (id integer primary key, name text, writingid integer, begin integer, end integer, userid text, strength integer);");
db.run("CREATE TABLE coo_concepts_ordered (id integer primary key, name text, writingid integer, begin integer, end integer, force integer);");
db.run("CREATE TABLE gra_graphe_concepts (conceptname text, neighbors text[]);");


// Defines the path to the library
let paths: string[] = ["../Library/French/Baha'i"];
// Paths to files
let filePaths: string[]=[];

// While there is still a path not read
while (paths.length>0){
    // Get and remove first element of FILE (FIFO)
    let p: string = paths.shift();
    // Check if path is directory
    if(fs.lstatSync(p).isDirectory()){
        // Get the elements in directory
        let elems: string[] = fs.readdirSync(p);
        // For each element in directory, store it in paths
        for (let k=0; k<elems.length; k++){
            paths.push(p+"/"+elems[k])
        }
    }else if (fs.lstatSync(p).isFile()){ // If path is file
        // Put it in the results
        filePaths.push(p);
        
        // Putting writing address in db
        let splittedData: string[] = p.split("/");
        let n: number = splittedData.length;
        let splittedText: string[] = splittedData[n-1].split('.');
        
        if (splittedText[splittedText.length -1] == 'txt'){  
            db.run("INSERT INTO wri_writings (address, name, writer) VALUES (?,?,?)", [p,splittedText[0],splittedData[4]]);
        }
    }
}


let data = db.export();
let buffer = new Buffer(data);
fs.writeFileSync("CS.sqlite", buffer);