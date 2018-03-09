//------------------------------------------------------------------
// Const that allows fast changing of some systems
//------------------------------------------------------------------
const NAMES_UNAVAILABLE = ["default", "Alice"];

// Extracting parameters
//var result = str.match( /[^\.!\?]+[\.!\?]+/g );
//const EXTRACT_SEPARATOR = ". "; // 2 sentences are separated with "."
const EXTRACT_SIZE = 20; // number of characters before and after the word found

const MAX_PER_WRITING = -1; // number of extracts per writing
const MAX_PER_AUTHOR = -1; // Number of writinges per author

// Default boolean expression
const DEFAULT_BOOLEAN = 'AND';

// Secret to be kept
const SECRET = "ABIGSECRET";

export{ NAMES_UNAVAILABLE, EXTRACT_SIZE, MAX_PER_WRITING, MAX_PER_AUTHOR, DEFAULT_BOOLEAN, SECRET}