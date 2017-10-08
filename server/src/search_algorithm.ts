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
	
	/*
	// Split the text according to the separator wanted
	let splittedText = text.split(EXTRACT_SEPARATOR);
	// Array of the cummulative sum
	let sumSize = [splittedText[0].length];
	
	// Order the list of index and start a counter
	indexes.sort(function(a: any, b:any){return a[1]-b[1];});
	let currentId = 0;
	while (currentId < indexes.length && indexes[currentId][1] < sumSize[0]){
		let s = "";
		for (let k=0; k < EXTRACT_SIZE; k++){
			if (splittedText.length > k){
				s = s + splittedText[k] + EXTRACT_SEPARATOR;
			}
		}
		result.push([s,indexes[currentId][0], indexes[currentId][1]]);
		currentId += 1;
	}
		
	// Loop on the splitted array
	let currentSize = sumSize[0];
	for (let k=1; k<splittedText.length; k++){
		currentSize = currentSize + splittedText[k].length + EXTRACT_SEPARATOR.length;
		sumSize.push(currentSize);
		while (currentId < indexes.length && indexes[currentId][1] < currentSize){
			let s = "";
			for (let l=0; l < EXTRACT_SIZE; l++){
				if (splittedText.length > k+l){
					s = s + splittedText[k+l] + EXTRACT_SEPARATOR;
				}
			}
			result.push([s,indexes[currentId][0], indexes[currentId][1] -  currentSize + splittedText[k].length]);
			
			currentId += 1;
		}
	}
	*/
	for (let k=0; k<indexes.length; k++){
		let n = indexes[k][1];
		let w = indexes[k][0];
		result.push([text.substring(n - EXTRACT_SIZE, n + EXTRACT_SIZE + w.length), w, n]);
	}
	return result;
}



export {simpleSearch};