
import { Manager} from "../managers/manager";
import { UserModel } from "../managers/models/user.model";
import { signToken } from "./token";

declare const Buffer: any;
declare const process: any;

let fs = require('fs');
let bcrypt = require('bcrypt');
const saltRounds = 10;

// ROUTES FOR THE USER MANAGEMENT
let express = require('express');
let userRoutes = express.Router();


//add a user in db
userRoutes.post('/subscribe', function(req: any, res: any){
	let query = req.query;
	
	bcrypt.hash(query.password, saltRounds).then(function(hash: string) {
		let user = new UserModel({
			'name': query.name,
			'password': hash,
			'firstname': query.firstname,
			'lastname': query.lastname,
			'email': query.email,
			'birth_date': new Date(query.birthdate)
		});	
		Manager.addUser(user, res);
	});
	
	//console.log("Concept added : " + name + "\tIn writing with id : " + idWri);
});


// authenticate and give the token back
userRoutes.post('/authenticate', function(req: any, res: any) {

  	// find the user
  	Manager.findUserByName(req.query.name, (err: any, user: UserModel)=> {
		
		if (err) throw err;
		
		if (!user) {
		  	res.json({ success: false, message: 'Authentication failed. User not found.', type: 0 });
		} else if (user) {
			
			// check if password matches
			bcrypt.compare(req.query.password, user.password).then(function(cond : boolean) {
				if (!cond){
					res.json({ success: false, message: 'Authentication failed. Wrong password.', type: 1});
				}else {

					var token = signToken(user);
					
					Manager.findConceptsByUser(user.name, (err: any, rows: any) =>{
						if (err) throw err;
						// return the information including token as JSON
						res.json({
							success: true,
							message: 'Enjoy your token!',
							token: token,
							concepts: rows,
							user: user.toJSON()
						});
					})
				}
			});
		}
  	});
});

userRoutes.post('/update', function(req: any, res: any) {
  	if (req.decoded.username != req.query.name || req.decoded.status < 1){
		res.json({success: false, message:"You don't have that power dude"});
	} else{
		let user = new UserModel(req.query);
		Manager.updateUser(user, (err: any, userUpdated: UserModel) => {
			console.log(JSON.stringify(userUpdated));
			if (err) { 
				res.json({success: false, message: "server pb"})
		 	} else{
				res.json({success: true, message: "successfully updated user !"});
			}
		});
	}
});

// route to return all users (GET http://localhost:8080/api/users)
userRoutes.get('/list', function(req: any, res: any) {
	if (req.decoded.status <1){
		res.json({success: false, message: "you don't have the privileges"})
	}else{
		Manager.getUsers((err: any, users: any) => {
			if (err) {
				res.json({success: false, message: "pb in getting list"})
			}
			res.json({success: true, users : users});
		});
	}
});   

export {userRoutes}