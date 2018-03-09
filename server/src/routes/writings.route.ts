import { checkToken } from "./token"
import { ConceptModel } from "../managers/models/concept.model";
import { WritingModel } from "../managers/models/writing.model";
import { Manager } from "../managers/manager";
import { globalSearch } from "../research/search_algorithm";
import { textFormatting } from "../research/writing_format";
import { ROOT_DIR } from "../rest_server"

// Reading from writing
declare const Buffer: any;
let fs = require('fs');
// ROUTES FOR THE WRITING MANAGEMENT
let express = require('express');
var writingRoutes = express.Router();

// SEARCH IN DATABASE FOR THE REQUEST
// Return the list of extracts matching request
writingRoutes.get('/search', function (req: any, res: any) {
	try {	
		let request = req.query.request;
		if (request == "" || request == undefined || request == null){
			res.status(500).json({success: false, message: "Not a valid request"});
		}else{
			Manager.getWritingList((err: any, rows: any) => {
				if (err){
					console.log("Error while searching : " + err);
				}else{
					let research = globalSearch(request,rows);
					res.header("Content-Type", "text/plain; charset=utf-8");
					// Send answer
					res.json(research);
					//console.log("Research requested : " + request);
				}
			});
		}
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
		Manager.getWriting(idWri, (err: any, writing: WritingModel) =>{
			if (err){
				console.log("couldn't access writing with error : "+ err);
				res.status(500).json({ 'error': 'Failed to access writing !' });
				return 0;
			}
			//We extract the writing
			let iconvlite = require('iconv-lite');
			let filebuffer = fs.readFileSync(ROOT_DIR+writing.address);
			let writingText = iconvlite.decode(filebuffer, 'ISO-8859-1');
			
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
		});
	} catch(e){
		console.log("error when reading a writing : " + e);
		res.status(500).json({ success: false, message: 'Failed to access writing !' });
	}
	
})

export {writingRoutes}