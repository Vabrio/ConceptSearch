"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../const/const");
var jwt = require('jsonwebtoken');
function checkToken(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, const_1.SECRET, function (err, decoded) {
            if (err) {
                console.log('Failed to authenticate token with error : ' + err);
                req.decoded = { status: 0, username: "default" };
                next();
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        req.decoded = { status: 0, username: "default" };
        next();
    }
}
exports.checkToken = checkToken;
function signToken(user) {
    const payload = {
        status: user.status,
        username: user.name,
        userid: user.id
    };
    const options = {
        expiresIn: "1d"
    };
    return jwt.sign(payload, const_1.SECRET, options);
}
exports.signToken = signToken;
//# sourceMappingURL=token.js.map