import { EXTRACT_SEPARATOR, EXTRACT_SIZE, MAX_PER_WRITING, MAX_PER_AUTHOR } from "./const";

declare function require(name:string): any;
const fs = require('fs');


/* Deals with the research 
* @param request : RegExp of the request
* @param writingList : list of writing addresses to be searched on

* @return : [[extract, pattern, index],
			[id, name, writer, address]]
*/
let simpleSearch = function(request: RegExp, writingList: Array<[number, string, string, string]>){
	
	let authorCount : {[id: string]: number} = {};
    let response: Array<[any[], [number, string, string, string]]> = [];
    for (let link of writingList){
		
		// Do count by author
		if (authorCount[link[2]] != undefined){
			authorCount[link[2]] += 1;
		}
		else{
			authorCount[link[2]] = 1;
		}
		
		if (link != undefined && authorCount[link[2]] <= MAX_PER_AUTHOR){
			// Get the writing as text
            let iconvlite = require('iconv-lite');
            let filebuffer = fs.readFileSync(link[3]);
            let writingText = iconvlite.decode(filebuffer,"latin1");
			
			// Find the pattern
			let found: any,
				result: any[] = [];
			while ((found = request.exec(writingText)) != null && result.length < MAX_PER_WRITING){
				result.push([found[0], found.index]);
			}
			
			// Add the data found 
			if (result.length != 0){
                response.push([getExtracts(result, writingText), link]);
           }
        }
    }
    response.sort(sortFunction);
    return response;
};

// Compare two texts from the number of occurence of the pattern found
let sortFunction = function(a: any, b: any){
	return b[0].length - a[0].length;
}


/**
* Get the extracts according to the indexes entered and the text
*
* @return an array with each element containing the extract, the pattern found and where in the extract to find it
*/
let getExtracts = function(indexes: Array<[string, number]>, text: string) : Array<[string, string, number]>{
	// Create the result array
	let result: Array<[string, string, number]> = [];
	
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
	
	return result;
}



export {simpleSearch};