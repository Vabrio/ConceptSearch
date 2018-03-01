import {ConceptModel} from "../managers/models/concept.model";
import { Manager} from "../managers/manager";

// ROUTES FOR THE CONCEPTS MANAGEMENT
let express = require('express');
var conceptRoutes = express.Router();

//ADD A CONCEPT IN DB
conceptRoutes.post('/add', function(req: any, res: any){
    
	let query = req.query;
	
	let concept = new ConceptModel({
		'name': query.name,
		'writingid': query.idWri,
		'begin': query.begin,
		'end': query.end,
		'extract': JSON.parse(query.extract),
		'userid': req.decoded.username,
		'strength': query.strength
	});
	
	Manager.addConcept(concept, res);
	
	//console.log("Concept added : " + name + "\tIn writing with id : " + idWri);
})


// LIST ALL CONCEPTS ADDED IN DB
conceptRoutes.get('/list', function(req: any, res: any){
	if (req.decoded.status <1){
		res.json({success: false, message: "you don't have the privileges"})
	}else {
    	Manager.getConceptList(res);
	}
})



export {conceptRoutes}