import { EXTRACT_SIZE, MAX_PER_WRITING, MAX_PER_AUTHOR } from "./const";

declare function require(name:string): any;
const fs = require('fs');


/* Deals with the research 
* @param request : RegExp of the request
* @param writingList : list of writing addresses to be searched on

* @return : [writer, [name,address,id,[extract, pattern, index]]]
*/
let simpleSearch = function(request: RegExp, writingList: Array<[number, string, string, string]>){
	
	let authorDict : {[id: string]: number} = {};
let response: Array<[string, any[]]> = [];
    for (let link of writingList){
		let idAuthor: number;
		// Do count by author
		if (authorDict[link[2]] != undefined){
			idAuthor = authorDict[link[2]];
		}
		else{
			idAuthor = response.length;
			authorDict[link[2]] = idAuthor;
			let arr: any[] = [];
			response.push([link[2], arr]);
		}
		
		if (link != undefined && idAuthor != -1 && response[idAuthor][1].length <= MAX_PER_AUTHOR){
			// Get the writing as text
            let iconvlite = require('iconv-lite');
            let filebuffer = fs.readFileSync(link[3]);
            let writingText = iconvlite.decode(filebuffer,"latin1");
			
			// Find the pattern
			let found: any,
				result: any[] = [];
			while ((found = request.exec(writingText)) != null && result.length < MAX_PER_WRITING){
				result.push([found[0] , found.index]);
			}
			
			// Add the data found 
			if (result.length != 0){
				response[idAuthor][1].push([link[1], link[3], link[0], getExtracts(result, writingText)]);
           }
        }
    }
    response.sort(sortFunction);
    return response;
};

// Compare two texts from the number of occurence of the pattern found
let sortFunction = function(a: any, b: any){
	return b[0] - a[0];
}


/**
* Get the extracts according to the indexes entered and the text
*
* @return : Array<[extract, pattern, index]>
*/
let getExtracts = function(indexes: Array<[string, number]>, text: string) : Array<[string, string, number]>{
	// Create the result array
	let result: Array<[string, string, number]> = [];
	
	for (let k=0; k<indexes.length; k++){
		// The extract index
		let n = indexes[k][1];
		// The word wanted
		let w = indexes[k][0];
		
		let swap_left = 0;
		while (text[n - EXTRACT_SIZE - swap_left] != ' ') {swap_left ++;}
		let swap_right = 0;
		while (text[n + EXTRACT_SIZE + swap_right + w.length] != ' ') {swap_right ++;}
		
		// Add a result
		result.push([text.substring(n - EXTRACT_SIZE - swap_left, n + EXTRACT_SIZE + w.length + swap_right), w, n]);
	}
	return result;
}



export {simpleSearch};