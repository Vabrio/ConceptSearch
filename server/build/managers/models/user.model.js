"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserModel {
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
    get password() {
        return this.row.password;
    }
    set password(val) {
        this.row.password = val;
    }
    get firstname() {
        return this.row.firstname;
    }
    set firstname(val) {
        this.row.firstname = val;
    }
    get lastname() {
        return this.row.lastname;
    }
    set lastname(val) {
        this.row.lastname = val;
    }
    get email() {
        return this.row.email;
    }
    set email(val) {
        this.row.email = val;
    }
    get birth_date() {
        return this.row.birth_date;
    }
    set birth_date(val) {
        this.row.birth_date = val;
    }
    get status() {
        return this.row.status;
    }
    set status(val) {
        this.row.status = val;
    }
    get created_at() {
        return this.row.created_at;
    }
    set created_at(val) {
        this.row.created_at = val;
    }
    toJSON() {
        return this.row;
    }
    isValid() {
        return !(this.row.name === '' ||
            this.row.name === undefined ||
            this.row.password === '' ||
            this.row.password === undefined);
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map