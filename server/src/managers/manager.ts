import { WritingsService } from "./services/writings.service";
import { ConceptsService } from "./services/concepts.service";
import { UsersService } from "./services/users.service";
import { WritingModel } from "./models/writing.model";
import { ConceptModel } from "./models/concept.model";
import { UserModel } from "./models/user.model";

class Manager {
    
	//-----------------------------
	// WRITINGS MANAGER
	//-----------------------------
	
	// Return the writings table
	static getWritingList(res: any){
		WritingsService.list(res);
    }
	// Giving a writing id, returns the writing
	static getWriting(id: number, res: any){
		// Getting the writing in plain text
		WritingsService.find(id, res)
    }
	
	
	//-----------------------------
	// CONCEPTS MANAGER
	//-----------------------------
	// Giver writingid, returns associated concepts
	static getConcepts(id: number, token: any, res: any) {
		ConceptsService.listFromWritingId(id, token.username, res);
	}
	// Returns list of all concepts
	static getConceptList(res: any) {
		ConceptsService.list(res)
	}
	// Adds a concept to the DB
	static addConcept(concept: ConceptModel, res: any){
		ConceptsService.create(concept, res);
    }
	// Find a user by its name
	static findConceptsByUser(name : string, res: any){
		ConceptsService.listFromUserName(name, res);
	}
	
	
	//-----------------------------
	// USERS MANAGER
	//-----------------------------
	// Add a user in the DB
	//++++++++++++++++++++++++++++++++++++++++
	// Users in verified db
	//++++++++++++++++++++++++++++++++++++++++
	static addUser(user: UserModel, res: any){
		UsersService.create(user, res);
	}
	static updateUserPwd(id: number, hash: string, cb: any){
		UsersService.udpateUserPwd(id, hash, cb);
	}
	// Get a list of all users
	static getUsers(res: any){
		UsersService.list(res);
	}
	// Get a user with specified id and name
	static getUser(id: number, name: string, res: any){
		UsersService.find(id, name, res);
	}
	// Find a user by its name
	static findVerifiedUserByName(name : string, res: any){
		UsersService.findVerifByName(name, res);
	}
	// Find a user by its name
	static findUserByEmail(email : string, res: any){
		UsersService.findByEmail(email, res);
	}
	//++++++++++++++++++++++++++++++++++++++++
	// Users in both temp and verified db
	//++++++++++++++++++++++++++++++++++++++++
	// Find a user by its name in both temp and normal db
	static findUserByName(name : string, res: any){
		UsersService.findByName(name, res);
	}
	//++++++++++++++++++++++++++++++++++++++++
	// Users in temp db
	//++++++++++++++++++++++++++++++++++++++++
	// Find a user by its name
	static findTempUserByEmail(email : string, res: any){
		UsersService.findTempByEmail(email, res);
	}
	static findUserByUUID(uuid : string, res: any){
		UsersService.findByUUID(uuid, res);
	}
	// Add a user in the db to be verified
	static addTempUser(user: UserModel, uuid: string, res: any){
		UsersService.createTemp(user, uuid, res);
	}
	// Reset time in temp user
	static updateTemp(id: number, res: any){
		UsersService.updateTemp(id, res);
	}
	
}

export {Manager}