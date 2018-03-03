"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../const/const");
const fs = require('fs');
let globalSearch = function (request, writingList) {
    let authorDict = {};
    let idAuthor = 0;
    let request_data = JSON.parse(request);
    let response = [];
    for (let link of writingList) {
        if ((request_data['author_research'] == "" || request_data['author_research'] == link.writer) && (request_data['title_research'] == "" || request_data['title_research'] == link.name)) {
            if (authorDict[link.writer] != undefined) {
                idAuthor = authorDict[link.writer];
            }
            else {
                idAuthor = response.length;
            }
            if (link != undefined && (idAuthor == response.length || (response[idAuthor].books.length <= const_1.MAX_PER_AUTHOR || const_1.MAX_PER_AUTHOR == -1))) {
                let iconvlite = require('iconv-lite');
                let filebuffer = fs.readFileSync(link.address);
                let writingText = iconvlite.decode(filebuffer, "latin1");
                let result = doTheSearch(writingText, request_data['research']);
                if (result.length != 0) {
                    let extr = getExtracts(result, writingText);
                    if (idAuthor == response.length) {
                        authorDict[link.writer] = idAuthor;
                        response.push({ author: link.writer,
                            books: [{ name: link.name,
                                    address: link.address,
                                    id: link.id,
                                    extracts: extr }] });
                    }
                    else {
                        response[idAuthor].books.push({ name: link.name,
                            address: link.address,
                            id: link.id,
                            extracts: extr });
                    }
                }
            }
        }
    }
    response.sort(sortFunction);
    return response;
};
exports.globalSearch = globalSearch;
let sortFunction = function (a, b) {
    return b.name - a.name;
};
let doTheSearch = function (text, request) {
    request = request.replace("?", "\\w");
    request = request.replace("*", "\\w*");
    let req;
    if (request[0] == '(') {
        req = exprToArray(request);
    }
    else {
        req = stringToArray(request);
    }
    let regE = new RegExp(array_to_regExp(req), 'ig');
    let found, result = [];
    while ((found = regE.exec(text)) != null && (result.length < const_1.MAX_PER_WRITING || const_1.MAX_PER_WRITING == -1)) {
        result.push([found[0], found.index]);
    }
    return result;
};
let exprToArray = function myself(text) {
    let id = 0, id0 = 0, id1 = 0, count = -1, result = [];
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
let stringToArray = function myself(text) {
    let index = text.search(" ");
    if (index == -1) {
        return [text];
    }
    else {
        return [myself(text.substring(0, index)), const_1.DEFAULT_BOOLEAN, text.substring(index + 1)];
    }
};
let array_to_regExp = function myself(arr) {
    let res = "";
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
            let a = myself(arr[1]);
            let regE = new RegExp("not", 'ig');
            if (regE.exec(arr[0]) != null) {
                res += "^" + a;
            }
        }
        if (arr.length == 3 && (typeof arr[1] == 'string')) {
            let a = myself([arr[0]]), b = myself([arr[2]]);
            let regE = new RegExp("and", 'ig');
            let regEx = new RegExp("or", 'ig');
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
let getExtracts = function (indexes, text) {
    let result = [];
    for (let k = 0; k < indexes.length; k++) {
        let n = indexes[k][1];
        let w = indexes[k][0];
        let swap_left = const_1.EXTRACT_SIZE;
        if (n - swap_left < 0) {
            swap_left = 0;
        }
        else {
            while (text[n - swap_left] != ' ' && n - swap_left > 0) {
                swap_left++;
            }
        }
        let swap_right = const_1.EXTRACT_SIZE;
        if (n + swap_right + w.length > text.length) {
            swap_right = text.length - n - w.length;
        }
        else {
            while (text[n + swap_right + w.length] != ' ' && n + swap_right + w.length < text.length) {
                swap_right++;
            }
        }
        result.push({ extract: text.substring(n - swap_left, n + w.length + swap_right), pattern: w, index: n });
    }
    return result;
};
//# sourceMappingURL=search_algorithm.js.map