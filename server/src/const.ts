// DB communication
const DB_LOCATION = '../db/CS.sqlite';


// Extracting parameters
//var result = str.match( /[^\.!\?]+[\.!\?]+/g );
//const EXTRACT_SEPARATOR = ". "; // 2 sentences are separated with "."
const EXTRACT_SIZE = 40; // number of characters before and after the word found

const MAX_PER_WRITING = 100; // number of extracts per writing
const MAX_PER_AUTHOR = 100; // Number of writinges per author


export{DB_LOCATION, EXTRACT_SIZE, MAX_PER_WRITING, MAX_PER_AUTHOR}