
import { Manager} from "../managers/manager";
import { UserModel } from "../managers/models/user.model";
import { signToken } from "./token";
import { NAMES_UNAVAILABLE } from "../const/const";
import { userinitmail } from "../resources/sendmail";

declare const Buffer: any;
declare const process: any;

let fs = require('fs');
let bcrypt = require('bcrypt');
let uuidv4 = require('uuid/v4');
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
		
		if (NAMES_UNAVAILABLE.includes(user.name)){
			res.json({ success: false, message: 'Login already token !', type: 1});
		}else{
		Manager.findUserByName(user.name, (err: any, userF: UserModel)=>{
			if (err) {
				res.status(500).json({ success: false, message: 'db_error', type: 0 });
			} else if (userF) {
					res.json({ success: false, message: 'Login already token !', type: 1});
			} else {
				var uuid = uuidv4();
				userinitmail(uuid, user.email);
        		Manager.addTempUser(user, uuid, (err: any, user2: UserModel) =>{
					if(!err){
						res.json({ 'success': 'User created !', 'user': user2 });
					}
				});
			}
		})
		
		}
	}).catch((error: any) =>{
		console.log("error in hashing pwd " + error);
		res.status(500).json({ success: false, message: 'db_error', type: 0 });
	});
	
	//console.log("Concept added : " + name + "\tIn writing with id : " + idWri);
});


// authenticate and give the token back
userRoutes.post('/authenticate', function(req: any, res: any) {

  	// find the user
  	Manager.findUserByName(req.query.name, (err: any, user: any)=> {
		
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

userRoutes.get('/userindb', function(req: any, res: any){
	Manager.findUserByName(req.query.name, (err: any, user: UserModel) => {
		if (user == null) {
			res.json({success: true, message: "Did not find any user"});
		}else{
			res.json({success: false, message: "Login already token"});
		}
   	})
})

userRoutes.get('/verify', function(req: any, res: any){
	//console.log(req.query.secret);
	if (!req.query.secret){
		res.cookie('success', false);
		res.redirect("http://localhost/dev-CS");
	}
	Manager.findUserByUUID(req.query.secret, (err: any,user: any)=>{
		if (err) {
			console.log("error while looking for temp user : " +err);
			res.cookie('verified_mail', false);
			res.redirect("http://localhost/dev-CS");
	 	}else {
			res.cookie('verified_mail', true);
			res.cookie('user', JSON.stringify(user));
			res.redirect("http://localhost/dev-CS");
		}
	})
})

userRoutes.get('/resend', function(req: any, res: any){
	Manager.updateTemp(req.query.id, (err: any, user: any) =>{
		if (err) {
			console.log("error resending email");
			res.json({success: false, message: "server pb"})
		}else {
			userinitmail(user.uuid, user.email);
			res.json({success: true, message: "mail sent"})
		}
	})
})

export {userRoutes}