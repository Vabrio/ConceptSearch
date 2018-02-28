declare function require(name:string): any;
declare const Buffer: any;
var fs = require('fs');

import {WritingsService} from "./services/writings.service";
import {ConceptsService} from "./services/concepts.service";
import {UsersService} from "./services/users.service";
import {WritingModel} from "./models/writing.model";
import {ConceptModel} from "./models/concept.model";
import {UserModel} from "./models/user.model";

class Manager {
	
	// Giving a concept id, returns the writing and its associated concepts
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
				
				// Then look for the list of concepts associated
				ConceptsService.listFromWritingId(id, (err: any, concepts:any) => {
					if (err){
						console.log("test");
						res(err, {"writing": writingText,"concepts":[] });
					} else{
						res(err, {"writing": writingText,"concepts":concepts});
					}
				})
			}
		})
    }
    
	// Return the writings table
	static getWritingList(res: any){
		WritingsService.list(res);
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