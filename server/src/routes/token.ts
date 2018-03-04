import { SECRET } from "../const/const";
import { UserModel } from "../managers/models/user.model";

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

function checkToken (req: any, res: any, next: any) {
	
	// check header or url parameters or post parameters for token
  	var token = req.body.token || req.query.token || req.headers['x-access-token'];

  	// decode token
  	if (token) {
    	// verifies secret and checks exp
    	jwt.verify(token, SECRET, function(err: any, decoded: any) {      
      		if (err) {
        		console.log('Failed to authenticate token with error : '+ err);    
				req.decoded = {status: 0, username: "default"};
				next();
      		} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				next();
      		}
    	});

  	} else {
		// if there is no token req.decoded is changed as though
		req.decoded = {status: 0, username: "default"};
		next();

  }
}

function signToken (user: UserModel) {
	
	const payload = {
		status: user.status,
		username: user.name,
		userid: user.id
		//addconcepttype: TO BE ADDED TO KNOW IF WE MAKE CONCEPTS PUBLIC OR PRIVATE
	};
	const options = {
		expiresIn: "1d" // expires in 24 hours
	}
	
	return jwt.sign(payload, SECRET, options);
}

export {checkToken, signToken}