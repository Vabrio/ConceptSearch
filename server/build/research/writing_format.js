"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function textFormatting(writingText, list, concepts) {
    let htmlFormatting = [], found;
    for (let c of concepts) {
        let request = c.extract;
        request = request.replace(new RegExp("\n", 'g'), "(\n|\r|\r\n)+");
        let regExp = new RegExp(request, 'im');
        if (found = regExp.exec(writingText)) {
            htmlFormatting.push([found.index, '<span class="hoverItem"><span class="hiddenText">' + c.name + '</span>']);
            htmlFormatting.push([found.index + (found[0]).length, '</span>']);
        }
    }
    let n = list.length, index, pattern;
    for (let k = n - 1; k >= 0; k--) {
        pattern = list[k].pattern;
        index = list[k].index;
        htmlFormatting.push([index, "<a class='extract' name='" + index.toString() + "'><b>"]);
        htmlFormatting.push([index + pattern.length, '</b></a>']);
    }
    htmlFormatting.sort(customSortFunction);
    let m = htmlFormatting.length;
    for (let form of htmlFormatting) {
        writingText = writingText.substring(0, form[0]) + form[1] + writingText.substring(form[0]);
    }
    return writingText;
}
exports.textFormatting = textFormatting;
let customSortFunction = function (a, b) {
    return b[0] - a[0];
};
//# sourceMappingURL=writing_format.js.map