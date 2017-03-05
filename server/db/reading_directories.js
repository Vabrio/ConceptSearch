var fs = require('fs');

// Defines the path to the library
paths = ["../Library/French/Baha'i"];
// Paths to files
filePaths=[];

// While there is still a path not read
while (paths.length>0){
    // Get and remove first element of FILE (FIFO)
    p = paths.shift();
    // Check if path is directory
    if(fs.lstatSync(p).isDirectory()){
        // Get the elements in directory
        elems = fs.readdirSync(p);
        // For each element in directory, store it in paths
        for (k=0; k<elems.length; k++){
            paths.push(p+"/"+elems[k])
        }
    }else if (fs.lstatSync(p).isFile()){ // If path is file
        // Put it in the results
        filePaths.push(p);
    }
}
console.log(filePaths);