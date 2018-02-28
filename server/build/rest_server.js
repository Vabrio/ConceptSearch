"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("./const/const");
var search_algorithm_1 = require("./research/search_algorithm");
var manager_1 = require("./managers/manager");
var init_db_1 = require("./managers/config/mysql/init_db");
init_db_1.createTables();
var concept_model_1 = require("./managers/models/concept.model");
var user_model_1 = require("./managers/models/user.model");
var fs = require('fs');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var saltRounds = 10;
if (const_1.LOG_FILE) {
    var util_1 = require('util');
    var logFile = fs.createWriteStream('log.txt', { flags: 'a' });
    var logStdout = process.stdout;
    console.log = function () {
        logFile.write(util_1.format.apply(null, arguments) + '\n');
        logStdout.write(util_1.format.apply(null, arguments) + '\n');
    };
    console.error = console.log;
}
var express = require('express');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.get('/search', function (req, res) {
    var request = req.query.request;
    manager_1.Manager.getWritingList(function (err, rows) {
        if (err) {
            console.log("Error while searching : " + err);
        }
        else {
            var research = search_algorithm_1.globalSearch(request, rows);
            res.header("Content-Type", "text/plain; charset=utf-8");
            res.status(200).send(research);
        }
    });
});
app.get('/read', function (req, res) {
    var idWri = req.query.idWri;
    var list = JSON.parse(req.query.list);
    var author = req.query.author;
    var title = req.query.title;
    manager_1.Manager.getWriting(idWri, function (err, wri) {
        if (err) {
            console.log("couldn't access writing with error : " + err);
        }
        else {
            var writingText = wri.writing, concepts = wri.concepts;
            var htmlFormatting = [], found = void 0;
            for (var _i = 0, concepts_1 = concepts; _i < concepts_1.length; _i++) {
                var c = concepts_1[_i];
                var request = c.extract;
                request = request.replace(new RegExp("\n", 'g'), "(\n|\r|\r\n)+");
                var regExp = new RegExp(request, 'im');
                if (found = regExp.exec(writingText)) {
                    htmlFormatting.push([found.index, '<span class="hoverItem"><span class="hiddenText">' + c.name + '</span>']);
                    htmlFormatting.push([found.index + (found[0]).length, '</span>']);
                }
            }
            var n = list.length, index = void 0, pattern = void 0;
            for (var k = n - 1; k >= 0; k--) {
                pattern = list[k][1];
                index = list[k][2];
                htmlFormatting.push([index, "<a class='extract' name='" + index.toString() + "'><b>"]);
                htmlFormatting.push([index + pattern.length, '</b></a>']);
            }
            var customSortFunction = function (a, b) {
                return b[0] - a[0];
            };
            htmlFormatting.sort(customSortFunction);
            var m = htmlFormatting.length;
            for (var _a = 0, htmlFormatting_1 = htmlFormatting; _a < htmlFormatting_1.length; _a++) {
                var form = htmlFormatting_1[_a];
                writingText = writingText.substring(0, form[0]) + form[1] + writingText.substring(form[0]);
            }
            var result = writingText;
            res.end(JSON.stringify([result, author, title, idWri]));
        }
    });
});
app.post('/concept', function (req, res) {
    var query = req.query;
    var concept = new concept_model_1.ConceptModel({
        'name': query.name,
        'writingid': query.idWri,
        'begin': query.begin,
        'end': query.end,
        'extract': JSON.parse(query.extract),
        'userid': query.userId,
        'strength': query.strength
    });
    manager_1.Manager.addConcept(concept, res);
});
var userRoutes = express.Router();
userRoutes.post('/subscribe', function (req, res) {
    var query = req.query;
    bcrypt.hash(query.password, saltRounds).then(function (hash) {
        var user = new user_model_1.UserModel({
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
    manager_1.Manager.findUserByName(req.query.name, function (err, user) {
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
                    var payload = {
                        status: user.status
                    };
                    var token = jwt.sign(payload, const_1.SECRET, {
                        expiresIn: "1d"
                    });
                    manager_1.Manager.findConceptsByUser(user.name, function (err, rows) {
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
userRoutes.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, const_1.SECRET, function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});
userRoutes.get('/list', function (req, res) {
    manager_1.Manager.getUsers(function (err, users) {
        res.json(users);
    });
});
app.use('/users', userRoutes);
var server = app.listen(const_1.PORT, function () {
    var port = server.address().port;
    console.log("Server listening on port : %s", port);
});
//# sourceMappingURL=rest_server.js.map