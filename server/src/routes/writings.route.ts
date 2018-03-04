import { checkToken } from "./token"
import { ConceptModel } from "../managers/models/concept.model";
import { WritingModel } from "../managers/models/writing.model";
import { Manager} from "../managers/manager";
import { globalSearch } from "../research/search_algorithm";
import { textFormatting } from "../research/writing_format";

// ROUTES FOR THE WRITING MANAGEMENT
let express = require('express');
var writingRoutes = express.Router();

// SEARCH IN DATABASE FOR THE REQUEST
// Return the list of extracts matching request
writingRoutes.get('/search', function (req: any, res: any) {
	try {	
		let request = req.query.request;
		Manager.getWritingList((err: any, rows: any) => {

			if (err){
				console.log("Error while searching : " + err);
			}else{
				let research = globalSearch(request,rows);
				res.header("Content-Type", "text/plain; charset=utf-8");

				// Send answer
				res.status(200).json(research);
				//console.log("Research requested : " + request);
			}
		});
		
	}catch (e){
		console.log("Error in searching : "+e);
		res.status(500).json({success: false, message: "Server encountered a problem with the research. Problem might come from the data sent."});
	}
})

// GET A SPECIFIED WRITING
writingRoutes.get('/read', function(req:any, res: any){
	try{
		// Params
		let idWri = req.query.idWri;
		let list = JSON.parse(req.query.list);
		let author = req.query.author;
		let title = req.query.title;

		// Getting text and associated concepts 
		Manager.getWriting(idWri, (err: any, writingText: any) =>{
			if (err){
				console.log("couldn't access writing with error : "+ err);
				res.status(500).json({ 'error': 'Failed to access writing !' });
			}else{

				Manager.getConcepts(idWri, req.decoded, (err: any, concepts: any) =>{
					if (err){
						console.log("couldn't access associated concepts with error : "+ err);
						res.json({text: textFormatting(writingText, list, []), 
								  author: author, title: title, id: idWri})
					}else{
						res.json({text: textFormatting(writingText, list, concepts),
								  author: author,
								  title: title,
								  id: idWri});
					}
				})
			}
		});
	} catch(e){
		console.log("error when reading a writing : " + e);
		res.status(500).json({ success: false, message: 'Failed to access writing !' });
	}
	
})

export {writingRoutes}