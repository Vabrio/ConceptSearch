var const_1 = require("./const");
var fs = require('fs');
var globalSearch = function (request, writingList) {
    var authorDict = {};
    var request_data = JSON.parse(request);
    var response = [];
    for (var _i = 0; _i < writingList.length; _i++) {
        var link = writingList[_i];
        if ((request_data['author_research'] == "" || request_data['author_research'] == link[2]) && (request_data['title_research'] == "" || request_data['title_research'] == link[1])) {
            var idAuthor = void 0;
            if (authorDict[link[2]] != undefined) {
                idAuthor = authorDict[link[2]];
            }
            else {
                idAuthor = response.length;
            }
            if (link != undefined && (idAuthor == response.length || (response[idAuthor][1].length <= const_1.MAX_PER_AUTHOR || const_1.MAX_PER_AUTHOR == -1))) {
                var iconvlite = require('iconv-lite');
                var filebuffer = fs.readFileSync(link[3]);
                var writingText = iconvlite.decode(filebuffer, "latin1");
                var result = doTheSearch(writingText, request_data['research']);
                if (result.length != 0) {
                    var extr = getExtracts(result, writingText);
                    if (idAuthor == response.length) {
                        authorDict[link[2]] = idAuthor;
                        response.push([link[2], [[link[1], link[3], link[0], extr]]]);
                    }
                    else {
                        response[idAuthor][1].push([link[1], link[3], link[0], extr]);
                    }
                }
            }
        }
    }
    response.sort(sortFunction);
    return response;
};
exports.globalSearch = globalSearch;
var sortFunction = function (a, b) {
    return b[0] - a[0];
};
var doTheSearch = function (text, request) {
    request = request.replace("?", "\\w");
    request = request.replace("*", "\\w*");
    var req;
    if (request[0] == '(') {
        req = exprToArray(request);
    }
    else {
        req = stringToArray(request);
    }
    var regE = new RegExp(array_to_regExp(req), 'ig');
    var found, result = [];
    while ((found = regE.exec(text)) != null && (result.length < const_1.MAX_PER_WRITING || const_1.MAX_PER_WRITING == -1)) {
        result.push([found[0], found.index]);
    }
    return result;
};
var exprToArray = function myself(text) {
    var id = 0, id0 = 0, id1 = 0, count = -1, result = [];
    while (id < text.length) {
        if (text[id] == '(' && count == -1) {
            id0 = id;
            count++;
            if (id1 < id0) {
                result.push(text.substring(id1 + 1, id0));
            }
        }
        else if (text[id] == '(') {
            count++;
        }
        else if (text[id] == ')' && count == 0) {
            count--;
            id1 = id;
            result.push(myself(text.substring(id0 + 1, id)));
        }
        else if (text[id] == ')') {
            count--;
        }
        id++;
    }
    if (id1 < id - 1) {
        result.push(text.substring(id1, id));
    }
    return result;
};
var stringToArray = function myself(text) {
    var index = text.search(" ");
    if (index == -1) {
        return [text];
    }
    else {
        return [myself(text.substring(0, index)), const_1.DEFAULT_BOOLEAN, text.substring(index + 1)];
    }
};
var array_to_regExp = function myself(arr) {
    var res = "";
    if (arr.length < 4) {
        if (arr.length == 1) {
            if (typeof arr[0] == 'string') {
                res += arr[0];
            }
            else {
                res += myself(arr[0]);
            }
        }
        if (arr.length == 2 && (typeof arr[0] == 'string')) {
            var a = myself(arr[1]);
            var regE = new RegExp("not", 'ig');
            if (regE.exec(arr[0]) != null) {
                res += "^" + a;
            }
        }
        if (arr.length == 3 && (typeof arr[1] == 'string')) {
            var a = myself([arr[0]]), b = myself([arr[2]]);
            var regE = new RegExp("and", 'ig');
            var regEx = new RegExp("or", 'ig');
            if (regE.exec(arr[1]) != null) {
                res += "((" + a + "\.*" + b + ")|(" + b + "\.*" + a + "))";
            }
            else if (regEx.exec(arr[1]) != null) {
                res += '(' + a + '|' + b + ')';
            }
        }
    }
    return res;
};
var getExtracts = function (indexes, text) {
    var result = [];
    for (var k = 0; k < indexes.length; k++) {
        var n = indexes[k][1];
        var w = indexes[k][0];
        var swap_left = const_1.EXTRACT_SIZE;
        if (n - swap_left < 0) {
            swap_left = 0;
        }
        else {
            while (text[n - swap_left] != ' ' && n - swap_left > 0) {
                swap_left++;
            }
        }
        var swap_right = const_1.EXTRACT_SIZE;
        if (n + swap_right + w.length > text.length) {
            swap_right = text.length - n - w.length;
        }
        else {
            while (text[n + swap_right + w.length] != ' ' && n + swap_right + w.length < text.length) {
                swap_right++;
            }
        }
        result.push([text.substring(n - swap_left, n + w.length + swap_right), w, n]);
    }
    return result;
};
//# sourceMappingURL=search_algorithm.js.map