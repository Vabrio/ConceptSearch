// Show the console (true) or put in a file  (false)
const LOG_FILE = false;

const NAMES_UNAVAILABLE = ["default", "Alice"];

// Extracting parameters
//var result = str.match( /[^\.!\?]+[\.!\?]+/g );
//const EXTRACT_SEPARATOR = ". "; // 2 sentences are separated with "."
const EXTRACT_SIZE = 40; // number of characters before and after the word found

const MAX_PER_WRITING = -1; // number of extracts per writing
const MAX_PER_AUTHOR = -1; // Number of writinges per author

// Default boolean expression
const DEFAULT_BOOLEAN = 'AND';

// Secret to be kept
const SECRET = "ABIGSECRET";

export{LOG_FILE, NAMES_UNAVAILABLE, EXTRACT_SIZE, MAX_PER_WRITING, MAX_PER_AUTHOR, DEFAULT_BOOLEAN, SECRET}