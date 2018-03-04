declare const Buffer: any;
let fs = require('fs');

import { WritingsService } from "./services/writings.service";
import { ConceptsService } from "./services/concepts.service";
import { UsersService } from "./services/users.service";
import { WritingModel } from "./models/writing.model";
import { ConceptModel } from "./models/concept.model";
import { UserModel } from "./models/user.model";
import { ROOT_DIR } from "../rest_server"

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
				let filebuffer = fs.readFileSync(ROOT_DIR+writing.address);
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
		ConceptsService.list(res)
	}
    
	// Adds a concept to the DB
	static addConcept(concept: ConceptModel, res: any){
		ConceptsService.create(concept, res);
    }
	
	
	// Add a user in the DB
	static addUser(user: UserModel, res: any){
		UsersService.create(user, res);
	}
	
	// Update userinfo in the DB
	static updateUser(user: UserModel, res: any){
		UsersService.update(user, res);
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