"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = require("../managers/manager");
const user_model_1 = require("../managers/models/user.model");
const token_1 = require("./token");
let fs = require('fs');
let bcrypt = require('bcrypt');
const saltRounds = 10;
let express = require('express');
let userRoutes = express.Router();
exports.userRoutes = userRoutes;
userRoutes.post('/subscribe', function (req, res) {
    let query = req.query;
    bcrypt.hash(query.password, saltRounds).then(function (hash) {
        let user = new user_model_1.UserModel({
            'name': query.name,
            'password': hash,
            'firstname': query.firstname,
            'lastname': query.lastname,
            'email': query.email,
            'birth_date': new Date(query.birthdate)
        });
        manager_1.Manager.addUser(user, res);
    });
});
userRoutes.post('/authenticate', function (req, res) {
    manager_1.Manager.findUserByName(req.query.name, (err, user) => {
        if (err)
            throw err;
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.', type: 0 });
        }
        else if (user) {
            bcrypt.compare(req.query.password, user.password).then(function (cond) {
                if (!cond) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.', type: 1 });
                }
                else {
                    var token = token_1.signToken(user);
                    manager_1.Manager.findConceptsByUser(user.name, (err, rows) => {
                        if (err)
                            throw err;
                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token,
                            concepts: rows,
                            user: user.toJSON()
                        });
                    });
                }
            });
        }
    });
});
userRoutes.get('/', function (req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});
userRoutes.get('/list', function (req, res) {
    if (req.decoded.status < 1) {
        res.json({ success: false, message: "you don't have the privileges" });
    }
    else {
        manager_1.Manager.getUsers((err, users) => {
            res.json(users);
        });
    }
});
//# sourceMappingURL=users.route.js.map