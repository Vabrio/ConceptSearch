var const_1 = require("./const");
var fs = require('fs');
var simpleSearch = function (request, writingList) {
    var authorDict = {};
    var response = [];
    for (var _i = 0; _i < writingList.length; _i++) {
        var link = writingList[_i];
        var idAuthor = void 0;
        if (authorDict[link[2]] != undefined) {
            idAuthor = authorDict[link[2]];
        }
        else {
            idAuthor = response.length;
            authorDict[link[2]] = idAuthor;
            var arr = [];
            response.push([link[2], arr]);
        }
        if (link != undefined && idAuthor != -1 && response[idAuthor][1].length <= const_1.MAX_PER_AUTHOR) {
            var iconvlite = require('iconv-lite');
            var filebuffer = fs.readFileSync(link[3]);
            var writingText = iconvlite.decode(filebuffer, "latin1");
            var found = void 0, result = [];
            while ((found = request.exec(writingText)) != null && result.length < const_1.MAX_PER_WRITING) {
                result.push([found[0], found.index]);
            }
            if (result.length != 0) {
                response[idAuthor][1].push([link[1], link[3], link[0], getExtracts(result, writingText)]);
            }
        }
    }
    response.sort(sortFunction);
    return response;
};
exports.simpleSearch = simpleSearch;
var sortFunction = function (a, b) {
    return b[0] - a[0];
};
var getExtracts = function (indexes, text) {
    var result = [];
    for (var k = 0; k < indexes.length; k++) {
        var n = indexes[k][1];
        var w = indexes[k][0];
        result.push([text.substring(n - const_1.EXTRACT_SIZE, n + const_1.EXTRACT_SIZE + w.length), w, n]);
    }
    return result;
};
//# sourceMappingURL=search_algorithm.js.map