"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConceptModel = (function () {
    function ConceptModel(row) {
        this.row = row;
    }
    Object.defineProperty(ConceptModel.prototype, "id", {
        get: function () {
            return this.row.id;
        },
        set: function (val) {
            this.row.id = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConceptModel.prototype, "name", {
        get: function () {
            return this.row.name;
        },
        set: function (val) {
            this.row.name = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConceptModel.prototype, "writingid", {
        get: function () {
            return this.row.writingid;
        },
        set: function (val) {
            this.row.writingid = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConceptModel.prototype, "begin", {
        get: function () {
            return this.row.begin;
        },
        set: function (val) {
            this.row.begin = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConceptModel.prototype, "end", {
        get: function () {
            return this.row.end;
        },
        set: function (val) {
            this.row.end = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConceptModel.prototype, "extract", {
        get: function () {
            return this.row.extract;
        },
        set: function (val) {
            this.row.extract = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConceptModel.prototype, "userid", {
        get: function () {
            return this.row.userid;
        },
        set: function (val) {
            this.row.userid = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConceptModel.prototype, "strength", {
        get: function () {
            return this.row.strength;
        },
        set: function (val) {
            this.row.strength = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConceptModel.prototype, "created_at", {
        get: function () {
            return this.row.created_at;
        },
        set: function (val) {
            this.row.created_at = val;
        },
        enumerable: true,
        configurable: true
    });
    ConceptModel.prototype.toJSON = function () {
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
    };
    ConceptModel.prototype.isValid = function () {
        return !(this.row.extract === '' ||
            (this.row.begin === undefined && this.row.end === undefined));
    };
    return ConceptModel;
}());
exports.ConceptModel = ConceptModel;
//# sourceMappingURL=concept.model.js.map