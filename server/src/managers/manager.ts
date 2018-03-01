declare const Buffer: any;
let fs = require('fs');

import {WritingsService} from "./services/writings.service";
import {ConceptsService} from "./services/concepts.service";
import {UsersService} from "./services/users.service";
import {WritingModel} from "./models/writing.model";
import {ConceptModel} from "./models/concept.model";
import {UserModel} from "./models/user.model";

class Manager {
    
	// Return the writings table
	static getWritingList(res: any){
		WritingsService.list(res);
    }
	
	// Giving a writing id, returns the writing
	static getWriting(id: number, res: any){
		// Getting the writing in plain text
		WritingsService.find(id, (err: any, writing: WritingModel) => {
			if(err){
				res(err, null);
			}else{
				
				//We extract the writing
				let iconvlite = require('iconv-lite');
				let filebuffer = fs.readFileSync(writing.address);
				let writingText = iconvlite.decode(filebuffer, 'ISO-8859-1');
				res(err, writingText);
			}
		})
    }
	
	// Giver writingid, returns associated concepts
	static getConcepts(id: number, token: any, res: any) {
		ConceptsService.listFromWritingId(id, token.username, (err: any, concepts:any) => {
			if (err){
				res(err, []);
			} else{
				res(err, concepts);
			}
		})
	}
	
	// Giver writingid, returns associated concepts
	static getConceptList(res: any) {
		ConceptsService.list((err: any, concepts:any) => {
			if (err){
				res.json({succes: false, message: "error occured while getting concepts"});
			} else{
				res.json({success: true, message: "succesfully retrived concepts", concepts: concepts});
			}
		})
	}
    
	// Adds a concept to the DB
	static addConcept(concept: ConceptModel, res: any){
		ConceptsService.create(concept, (err: any, conceptR: ConceptModel) => {
			if (err) {
				res.status(500).json({ 'error': 'Failed to create concept !' });
			} else {
				res.json({ 'success': 'Concept created !', 'concept': conceptR });
			}
		});
    }
	
	
	// Add a user in the DB
	static addUser(user: UserModel, res: any){
		UsersService.create(user, res);
	}
	
	// Get a list of all users
	static getUsers(res: any){
		UsersService.list(res);
	}
	
	// Find a user by its name
	static findUserByName(name : string, res: any){
		UsersService.findByName(name, res);
	}
	
	// Find a user by its name
	static findConceptsByUser(name : string, res: any){
		ConceptsService.listFromUserName(name, res);
	}
}

export {Manager}