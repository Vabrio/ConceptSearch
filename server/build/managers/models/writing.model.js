"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WritingModel = (function () {
    function WritingModel(row) {
        this.row = row;
    }
    Object.defineProperty(WritingModel.prototype, "id", {
        get: function () {
            return this.row.id;
        },
        set: function (val) {
            this.row.id = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WritingModel.prototype, "address", {
        get: function () {
            return this.row.address;
        },
        set: function (val) {
            this.row.address = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WritingModel.prototype, "name", {
        get: function () {
            return this.row.name;
        },
        set: function (val) {
            this.row.name = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WritingModel.prototype, "writer", {
        get: function () {
            return this.row.writer;
        },
        set: function (val) {
            this.row.writer = val;
        },
        enumerable: true,
        configurable: true
    });
    WritingModel.prototype.toJSON = function () {
        return {
            id: this.row.id,
            address: this.row.address,
            name: this.row.name,
            writer: this.row.writer
        };
    };
    WritingModel.prototype.isValid = function () {
        return !(this.row.address === '' ||
            this.row.address === undefined);
    };
    return WritingModel;
}());
exports.WritingModel = WritingModel;
//# sourceMappingURL=writing.model.js.map