"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserModel = (function () {
    function UserModel(row) {
        this.row = row;
    }
    Object.defineProperty(UserModel.prototype, "id", {
        get: function () {
            return this.row.id;
        },
        set: function (val) {
            this.row.id = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "name", {
        get: function () {
            return this.row.name;
        },
        set: function (val) {
            this.row.name = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "password", {
        get: function () {
            return this.row.password;
        },
        set: function (val) {
            this.row.password = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "firstname", {
        get: function () {
            return this.row.firstname;
        },
        set: function (val) {
            this.row.firstname = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "lastname", {
        get: function () {
            return this.row.lastname;
        },
        set: function (val) {
            this.row.lastname = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "email", {
        get: function () {
            return this.row.email;
        },
        set: function (val) {
            this.row.email = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "birth_date", {
        get: function () {
            return this.row.birth_date;
        },
        set: function (val) {
            this.row.birth_date = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "status", {
        get: function () {
            return this.row.status;
        },
        set: function (val) {
            this.row.status = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserModel.prototype, "created_at", {
        get: function () {
            return this.row.created_at;
        },
        set: function (val) {
            this.row.created_at = val;
        },
        enumerable: true,
        configurable: true
    });
    UserModel.prototype.toJSON = function () {
        return this.row;
    };
    UserModel.prototype.isValid = function () {
        return !(this.row.name === '' ||
            this.row.name === undefined ||
            this.row.password === '' ||
            this.row.password === undefined);
    };
    return UserModel;
}());
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map