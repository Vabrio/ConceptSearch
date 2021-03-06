import { EXTRACT_SIZE, MAX_PER_WRITING, MAX_PER_AUTHOR, DEFAULT_BOOLEAN } from "../const/const";
import { ROOT_DIR } from "../rest_server"

declare function require(name:string): any;
const fs = require('fs');


/* Deals with the research  with a correct format for writingList
* @param request : RegExp of the request
* @param writingList : list of writing addresses to be searched on

* @return :  [{author: string, books: [{name: string, address: string, id: number,
										extracts: [{extract: string, 
												 	pattern: string,
												 	index: number}]}]}]>
*/
let globalSearch = function(request: string, writingList: Array<{id: number, address: string, name: string, writer: string}>)  {
	// A dictionay associating the number of writing for each author
	let authorDict : {[id: string]: number} = {};
	let idAuthor = 0;
	
	// Data sent in request
	let request_data = JSON.parse(request);	
	// The returned data
	let response: Array<{author: string, 
						  books: Array<{name: string, address: string, id: number,
								extracts: Array<{extract: string, 
												 pattern: string,
												 index: number}>}>}> = [];

	for (let link of writingList){
		if ((request_data['author_research'] == "" || request_data['author_research'] == link.writer) && (request_data['title_research'] == "" || request_data['title_research'] == link.name)){
			// Do count by author
			if (authorDict[link.writer] != undefined){
				idAuthor = authorDict[link.writer];
			}
			else{
				idAuthor = response.length;
			}
				
	
			if (link != undefined && (idAuthor == response.length ||  (response[idAuthor].books.length <= MAX_PER_AUTHOR ||  MAX_PER_AUTHOR == -1))){
				// Get the writing as text
				let iconvlite = require('iconv-lite');
				let filebuffer = fs.readFileSync(ROOT_DIR + link.address);
				let writingText = iconvlite.decode(filebuffer,"latin1");
				// Find the pattern
				let result = doTheSearch(writingText, request_data['research']);
				// Add the data found 
				if (result.length != 0){
					let extr = getExtracts(result, writingText);
					
					if (idAuthor == response.length){
						authorDict[link.writer] = idAuthor;
						response.push({author: link.writer,
										books : [{name : link.name,
												  address : link.address,
												  id : link.id,
												  extracts : extr}]});
					}else{
						response[idAuthor].books.push({name : link.name,
														address : link.address,
														id : link.id,
														extracts : extr});

					}
				}
			}
		}
	}
	response.sort(sortFunction);
	return response;
};


/* Deals with the research  REMOVED BECAUSE NEW VERSION
* @param request : RegExp of the request
* @param writingList : list of writing addresses to be searched on

* @return : [writer, [name,address,id,[extract, pattern, index]]]

let globalSearch = function(request: string, writingList: Array<[number, string, string, string]>){
	// A dictionay associating the number of writing for each author
	let authorDict : {[id: string]: number} = {};
	
	// Data sent in request
	let request_data = JSON.parse(request);
	
	// The returned data
	let response: Array<[string, any[]]> = [];
    
	for (let link of writingList){
		if ((request_data['author_research'] == "" || request_data['author_research'] == link[2]) && (request_data['title_research'] == "" || request_data['title_research'] == link[1])){
			let idAuthor: number;
			// Do count by author
			if (authorDict[link[2]] != undefined){
				idAuthor = authorDict[link[2]];
			}
			else{
				idAuthor = response.length;
			}

			if (link != undefined && (idAuthor == response.length ||  (response[idAuthor][1].length <= MAX_PER_AUTHOR ||  MAX_PER_AUTHOR == -1))){
				// Get the writing as text
				let iconvlite = require('iconv-lite');
				let filebuffer = fs.readFileSync(link[3]);
				let writingText = iconvlite.decode(filebuffer,"latin1");
				// Find the pattern
				let result = doTheSearch(writingText, request_data['research']);
				// Add the data found 
				if (result.length != 0){
					let extr = getExtracts(result, writingText);
					if (idAuthor == response.length){
						authorDict[link[2]] = idAuthor;
						response.push([link[2], [[link[1], link[3], link[0], extr]]]);
					}else{
						response[idAuthor][1].push([link[1], link[3], link[0], extr]);
	
					}
				}
			}
		}
    }
    response.sort(sortFunction);
    return response;
};
*/


// Compare two texts from the number of occurence of the pattern found
let sortFunction = function(a: any, b: any){
	return b.name - a.name;
}

// From a text, return the result found
let doTheSearch = function(text: string, request: string){
	request = request.replace("?","\\w");
	request = request.replace("*","\\w*")
	let req: any[];
	if (request[0] == '('){
		req = exprToArray(request);
	}else{
		req = stringToArray(request);
	}
	let regE = new RegExp(array_to_regExp(req),'ig');
	let found: any,
		result: any[] = [];
	while ((found = regE.exec(text)) != null && (result.length < MAX_PER_WRITING || MAX_PER_WRITING == -1)){
		result.push([found[0] , found.index]);
	}
	return result;
}

// From a boolean string, return the correct array definition
let exprToArray = function myself(text: string): any[]{
	let id=0, id0=0, id1=0, count=-1, result: any[] = [];

	while (id<text.length){
		if (text[id]=='(' && count==-1){
			id0=id;
			count++;
			if (id1<id0){
				result.push(text.substring(id1+1, id0))
			}
		}
		else if (text[id]=='('){count++}
		else if (text[id]==')' && count==0){
			count--; 
			id1=id;
			result.push(myself(text.substring(id0+1, id)))
		}
		else if (text[id]==')'){count--}
		id++;
	}

	if (id1<id-1){
		result.push(text.substring(id1, id))
	}

	return result
}
// From a simple string to array
let stringToArray = function myself(text: string): any[]{
	let index = text.search(" ");
	if (index == -1){
		return [text];
	}else{
		return [myself(text.substring(0,index)), DEFAULT_BOOLEAN, text.substring(index+1)];
	}
}

/* Convert the array given to a regexp. The array has format
* [ * ]
* ["not", *] or
* [*, 'and', *] or
* [*, 'or', *]
*/
let array_to_regExp = function myself(arr: any[]): string{
	let res="";
	if (arr.length<4){
		if (arr.length == 1){
			if (typeof arr[0] == 'string'){
				res += arr[0];
			}else{
				res += myself(arr[0]);
			}
		}
		if (arr.length==2 && (typeof arr[0] == 'string')){
			let a = myself(arr[1]);
			let regE = new RegExp("not",'ig');
			if(regE.exec(arr[0]) != null ){
				res += "^"+a;
			}
		}
		if (arr.length==3 &&  (typeof arr[1] == 'string')){
			let a = myself([arr[0]]),
				b = myself([arr[2]]);
			let regE = new RegExp("and",'ig');
			let regEx = new RegExp("or",'ig');
			if(regE.exec(arr[1]) != null ){
				res += "(("+a+"\.*" + b +")|("+b+"\.*"+a+"))";
			}else if(regEx.exec(arr[1]) != null ){
				res += '('+ a+ '|' + b +')';
			}
		}
	}
	return res;
}

/**
* Get the extracts according to the indexes entered and the text
*
* @return : Array<[extract, pattern, index]>
*/
let getExtracts = function(indexes: Array<[string, number]>, text: string) : Array<{extract: string, pattern: string, index: number}>{
	// Create the result array
	let result: Array<{extract: string, pattern:  string, index: number}> = [];
	
	for (let k=0; k<indexes.length; k++){
		// The extract index
		let n = indexes[k][1];
		// The word wanted
		let w = indexes[k][0];
		
		let swap_left= EXTRACT_SIZE, swap_right=EXTRACT_SIZE*2;
		if (n- swap_left <0){
			swap_right += swap_left - n+1;
			swap_left =n-1;
		}else if (n+swap_right > text.length){
			swap_right = text.length - n-1;
			swap_left += swap_right - n + -text.length+1;
		}
		let index_left = n, index_right = n;
		while (swap_left > 0 || swap_right >0){
			if (swap_left > 0 && (text[index_left] == "." || text[index_left] == "!" || text[index_left] == "?")){
				if (swap_right > 0){
					swap_right += swap_left;
				};
				swap_left = 0;
				index_left +=2;
				index_right ++;
				swap_right --;
			}else if (swap_right> 0 && (text[index_right] == "." || text[index_right] == "!" || text[index_right] == "?" )){
				if (swap_left > 0){
					swap_left += swap_right;
				};
				swap_right = 0;
				index_left --;
				swap_left --;
			}else if (swap_right == 0 && swap_left >0){
				index_left --;
				swap_left --;
			}else if (swap_left == 0 && swap_right >0){
				index_right ++;
				swap_right --;
			}else {
				index_right ++;
				swap_right --;
				index_left --;
				swap_left --;
			}
		}
		while (index_left > 0 && index_left<text.length && text[index_left-1] != ' ') {index_left ++;}
		while (index_right < text.length -1 && text[index_right+1] != ' ') {index_right --;}
		
		var pre_text ="", post_text ="";
		if (index_left>0 && !(text[index_left-2] == "." || text[index_left-2] == "!" || text[index_left-2] == "?")){
			pre_text = "...";	
		}
		/*if (index_right<text.length && !(text[index_right] == "." || text[index_right] == "!" || text[index_right] == "?" )){
			post_text="...";
		}*/
		
		// Add a result
		result.push({extract: pre_text + text.substring(index_left, index_right+1)+ post_text, pattern : w, index : n});
	}
	return result;
}



export {globalSearch};