
import { Manager} from "../managers/manager";
import { UserModel } from "../managers/models/user.model";
import { signToken } from "./token";
import { NAMES_UNAVAILABLE } from "../const/const";
import { Mailer } from "../resources/sendmail";

declare const Buffer: any;
declare const process: any;

let fs = require('fs');
let bcrypt = require('bcrypt');
let uuidv4 = require('uuid/v4');
let crypto = require('crypto')
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
			'email': query.email
		});	
		
		if (NAMES_UNAVAILABLE.includes(user.name)){
			res.json({ success: false, message: 'Login already token !', type: 1});
		}else{
		Manager.findUserByName(user.name, (err: any, userF: UserModel)=>{
			if (err) {
				res.status(500).json({ success: false, message: 'db_error', type: 0 });
				return 0;
			} else if (userF) {
				res.json({ success: false, message: 'Login already token !', type: 1});
				return 0;
			} 
			Manager.findUserByEmail(user.email, (err: any, userF2: UserModel)=>{
				if (err) {
					res.status(500).json({ success: false, message: 'db_error', type: 0 });
					return 0;
				} else if (userF2) {
					res.json({ success: false, message: 'Email already token !', type: 2});
					return 0;
				} 
				Manager.findTempUserByEmail(user.email, (err: any, userF3: UserModel)=>{
					if (err) {
						res.status(500).json({ success: false, message: 'db_error', type: 0 });
						return 0;
					} else if (userF2) {
						res.json({ success: false, message: 'Email already token !', type: 2});
						return 0;
					} 
					var uuid = uuidv4();
					Mailer.userinitmail(uuid, user.email);
					Manager.addTempUser(user, uuid, (err: any, user2: UserModel) =>{
						if(!err){
							user2.status=-1;
							res.json({ 'success': 'User created !', 'user': user2 });
						}
					});
					
				})
			});
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
  	Manager.findVerifiedUserByName(req.query.name, (err: any, user: any)=> {
		
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

userRoutes.post('/updatepwd', function(req: any, res: any) {
	let query = req.query;
  	if (req.decoded.username != req.query.name || req.decoded.status < 1){
		res.json({success: false, message:"You don't have that power dude", type: 0});
		return 0;
	}
	Manager.getUser(query.id, query.name, (err: any, user: UserModel) => {
		if (err || user==null){
			res.json({success: false, message:"User not found", type:0});
			return 0;
		}
		bcrypt.compare(query.oldpwd, user.password).then(function(cond : boolean) {
			if (!cond){
				res.json({ success: false, message: 'Not a correct password', type: 1 });
				return 0;
			}
			bcrypt.hash(query.newpwd, saltRounds).then(function(hash: string) {
				Manager.updateUserPwd(query.id, hash, (err: any, updateAns: any) => {
					if (err || updateAns.changedRows == 0) { 
						res.json({success: false, message: "server pb"})
					} else{
						res.json({success: true, message: "successfully updated user !"});
						Mailer.pwdChanged(user.name, user.email);
					}
				});
			})
		});
	})
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
			res.redirect("https://concept-search.org/CS_dev");
	}
	Manager.findUserByUUID(req.query.secret, (err: any,user: any)=>{
		if (err) {
			console.log("error while looking for temp user : " +err);
			res.cookie('verified_mail', false);
			res.redirect("https://concept-search.org/CS_dev");
	 	}else {
			res.cookie('verified_mail', true);
			res.cookie('user', JSON.stringify(user));
			res.redirect("https://concept-search.org/CS_dev");
		}
	})
})
/* Re-send verification email */
userRoutes.get('/resend', function(req: any, res: any){
	Manager.updateTemp(req.query.id, (err: any, user: any) =>{
		if (err) {
			console.log("error resending email");
			res.json({success: false, message: "server pb"})
		}else {
			Mailer.userinitmail(user.uuid, user.email);
			res.json({success: true, message: "mail sent"})
		}
	})
})

/* New password */
userRoutes.get('/forgot', function(req:any, res:any){
	Manager.findUserByEmail(req.query.email, (err: any, user: any)=>{
		if (err || user==null){
			res.json({success: false, message: "email not found", type: 1});
			return 0;
		}
		crypto.randomBytes(20, function(err: any, buf: any) {
			if (err || user==null){
				console.log("problem crypto generator");
				res.json({success: false, message: "crypto pb", type: 0});
				return 0;
			}
			var pwd = buf.toString('hex');
			bcrypt.hash(pwd, saltRounds).then(function(hash: string) {
				Manager.updateUserPwd(user.id, hash, (err: any, updateAns: any) => {
					if (err || updateAns.changedRows == 0) { 
						res.json({success: false, message: "server pb", type: 0})
					} else{
						res.json({success: true, message: "email sent with new pwd"});
						Mailer.forgotChanged(user.name, pwd, user.email);
					}
				});
			})
		});
		
	})
})

export {userRoutes}