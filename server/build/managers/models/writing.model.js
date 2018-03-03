"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WritingModel {
    constructor(row) {
        this.row = row;
    }
    get id() {
        return this.row.id;
    }
    set id(val) {
        this.row.id = val;
    }
    get address() {
        return this.row.address;
    }
    set address(val) {
        this.row.address = val;
    }
    get name() {
        return this.row.name;
    }
    set name(val) {
        this.row.name = val;
    }
    get writer() {
        return this.row.writer;
    }
    set writer(val) {
        this.row.writer = val;
    }
    toJSON() {
        return {
            id: this.row.id,
            address: this.row.address,
            name: this.row.name,
            writer: this.row.writer
        };
    }
    isValid() {
        return !(this.row.address === '' ||
            this.row.address === undefined);
    }
}
exports.WritingModel = WritingModel;
//# sourceMappingURL=writing.model.js.map