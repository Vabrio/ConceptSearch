import {ConceptModel} from "../managers/models/concept.model";
import { Manager} from "../managers/manager";

// ROUTES FOR THE CONCEPTS MANAGEMENT
let express = require('express');
var conceptRoutes = express.Router();

//ADD A CONCEPT IN DB
conceptRoutes.post('/add', function(req: any, res: any){
    
	let query = req.query;
	
	if (req.decoded.status < 1 ){
		res.status(500).json({ success: false, message: 'You have to log in !' });
	}else {
		let concept = new ConceptModel({
			'name': query.name,
			'writingid': query.idWri,
			'begin': query.begin,
			'end': query.end,
			'extract': JSON.parse(query.extract),
			'userid': req.decoded.username,
			'strength': query.strength
		});

		Manager.addConcept(concept, (err: any, conceptR: ConceptModel) => {
			if (err) {
				res.status(500).json({ success: false, message: 'Failed to create concept !' });
			} else {
				res.json({ success: true, 'concept': conceptR });
			}
		});
	}
})


// LIST ALL CONCEPTS ADDED IN DB
conceptRoutes.get('/list', function(req: any, res: any){
	if (req.decoded.status <1){
		res.json({success: false, message: "you don't have the privileges"})
	}else {
    	Manager.getConceptList((err: any, concepts:any) => {
			if (err){
				res.json({succes: false, message: "error occured while getting concepts"});
			} else{
				res.json({success: true, message: "succesfully retrived concepts", concepts: concepts});
			}
		});
	}
})



export {conceptRoutes}