"use strict";
exports.__esModule = true;
var db_communication_1 = require("./db_communication");
var myManager = new db_communication_1.Manager();
console.log(db_communication_1.Manager.getWriting("oh"));
var express = require('express');
var app = express();
app.get('/:id', function (req, res) {
    console.log(req.params.id);
    res.end("COUCOU");
});
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server listening at http://%s:%s", host, port);
});
//# sourceMappingURL=rest_server.js.map