import {db} from "./mysql.db";

	
function createTables(){
	// Setting up the tables

	// Creating the writings table
	db.query("SHOW TABLES LIKE 'wri_writings'", (err: any, result: any) => {
		// If the table is yet absent in db
		if (result.length==0){

			// Creating the table
			db.query("CREATE TABLE wri_writings (id integer primary key auto_increment, address text, name text, writer text);");
			initialize_writings();

			console.log("WRITINGS TABLE INITIALIZED");

		}else if(err){
			console.log("error while accessing wri_writings table : " + err);
		}
	});

	// Creating the concept table
	db.query("SHOW TABLES LIKE 'con_concepts'", (err: any, result: any) => {
		if (result.length==0){
			db.query("CREATE TABLE con_concepts (id integer primary key auto_increment, name text, writingid integer, begin integer, end integer, extract text, userid text, strength integer, created_at datetime default current_timestamp);");
			console.log("CONCEPTS TABLE INITIALIZED");
		}else if(err){
			console.log("error while accessing con_concepts table : " + err);
		}
	});

	// Creating the users table
	db.query("SHOW TABLES LIKE 'use_users'", (err: any, result: any) => {
		if (result.length==0){
			db.query("CREATE TABLE use_users (id integer primary key auto_increment, name text, password text, firstname text, lastname text, email text, birth_date datetime, status integer default 1, created_at datetime default current_timestamp);");
			console.log("USERS TABLE INITIALIZED");
		}else if(err){
			console.log("error while accessing use_users table : " + err);
		}
	});

	// Creating the users table
	db.query("SHOW TABLES LIKE 'use_users_temp'", (err: any, result: any) => {
		if (result.length==0){
			db.query("CREATE TABLE use_users_temp (id integer primary key auto_increment, name text, password text, email text, uuid text, created_at datetime default current_timestamp);");
			console.log("USERS_TEMP TABLE INITIALIZED");
		}else if(err){
			console.log("error while accessing use_users table : " + err);
		}
	});
}


// Needed importation
import {WritingModel} from "../../models/writing.model";
import {WritingsService} from "../../services/writings.service";
declare function require(name:string): any;
let fs = require('fs');

// A subfonction used to initialize the wri_writings table
function initialize_writings(){
	
	// INITIALIZING THE TABLE WITH THE WRITINGS

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
				
				let params = {address: p, name: splittedText[0], writer: splittedData[4]};
				let writing = new WritingModel(params);
				
				WritingsService.create(writing, (err: any, writing: WritingModel) => {
					if(err){
						console.log("error while cretating writing in db : " + err);
					}
				});
			}
		}
	}	
}

export {createTables}