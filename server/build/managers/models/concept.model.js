"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConceptModel {
    constructor(row) {
        this.row = row;
    }
    get id() {
        return this.row.id;
    }
    set id(val) {
        this.row.id = val;
    }
    get name() {
        return this.row.name;
    }
    set name(val) {
        this.row.name = val;
    }
    get writingid() {
        return this.row.writingid;
    }
    set writingid(val) {
        this.row.writingid = val;
    }
    get begin() {
        return this.row.begin;
    }
    set begin(val) {
        this.row.begin = val;
    }
    get end() {
        return this.row.end;
    }
    set end(val) {
        this.row.end = val;
    }
    get extract() {
        return this.row.extract;
    }
    set extract(val) {
        this.row.extract = val;
    }
    get userid() {
        return this.row.userid;
    }
    set userid(val) {
        this.row.userid = val;
    }
    get strength() {
        return this.row.strength;
    }
    set strength(val) {
        this.row.strength = val;
    }
    get created_at() {
        return this.row.created_at;
    }
    set created_at(val) {
        this.row.created_at = val;
    }
    toJSON() {
        return {
            id: this.row.id,
            name: this.row.name,
            writingid: this.row.writingid,
            begin: this.row.begin,
            end: this.row.end,
            extract: this.row.extract,
            userid: this.row.userid,
            strength: this.row.strength,
            created_at: this.created_at
        };
    }
    isValid() {
        return !(this.row.extract === '' ||
            (this.row.begin === undefined && this.row.end === undefined));
    }
}
exports.ConceptModel = ConceptModel;
//# sourceMappingURL=concept.model.js.map