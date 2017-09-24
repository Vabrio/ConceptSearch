"use strict";
exports.__esModule = true;
var const_1 = require("./const");
var fs = require('fs');
var simpleSearch = function (request, writingList) {
    var authorCount = {};
    var response = [];
    for (var _i = 0, writingList_1 = writingList; _i < writingList_1.length; _i++) {
        var link = writingList_1[_i];
        if (authorCount[link[2]] != undefined) {
            authorCount[link[2]] += 1;
        }
        else {
            authorCount[link[2]] = 1;
        }
        if (link != undefined && authorCount[link[2]] <= const_1.MAX_PER_AUTHOR) {
            var iconvlite = require('iconv-lite');
            var filebuffer = fs.readFileSync(link[3]);
            var writingText = iconvlite.decode(filebuffer, "latin1");
            var found = void 0, result = [];
            while ((found = request.exec(writingText)) != null && result.length < const_1.MAX_PER_WRITING) {
                result.push([found[0], found.index]);
            }
            if (result.length != 0) {
                response.push([getExtracts(result, writingText), link]);
            }
        }
    }
    response.sort(sortFunction);
    return response;
};
exports.simpleSearch = simpleSearch;
var sortFunction = function (a, b) {
    return b[0].length - a[0].length;
};
var getExtracts = function (indexes, text) {
    var result = [];
    var splittedText = text.split(const_1.EXTRACT_SEPARATOR);
    var sumSize = [splittedText[0].length];
    indexes.sort(function (a, b) { return a[1] - b[1]; });
    var currentId = 0;
    while (currentId < indexes.length && indexes[currentId][1] < sumSize[0]) {
        var s = "";
        for (var k = 0; k < const_1.EXTRACT_SIZE; k++) {
            if (splittedText.length > k) {
                s = s + splittedText[k] + ".";
            }
        }
        result.push([s, indexes[currentId][0], indexes[currentId][1]]);
        currentId += 1;
    }
    var currentSize = sumSize[0];
    for (var k = 1; k < splittedText.length; k++) {
        currentSize = currentSize + splittedText[k].length + 1;
        sumSize.push(currentSize);
        while (currentId < indexes.length && indexes[currentId][1] < currentSize) {
            var s = "";
            for (var l = 0; l < const_1.EXTRACT_SIZE; l++) {
                if (splittedText.length > k + l) {
                    s = s + splittedText[k + l] + ".";
                }
            }
            result.push([s, indexes[currentId][0], indexes[currentId][1] - currentSize + splittedText[k].length]);
            currentId += 1;
        }
    }
    return result;
};
//# sourceMappingURL=search_algorithm.js.map