"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let fs = require('fs');
const writings_service_1 = require("./services/writings.service");
const concepts_service_1 = require("./services/concepts.service");
const users_service_1 = require("./services/users.service");
class Manager {
    static getWritingList(res) {
        writings_service_1.WritingsService.list(res);
    }
    static getWriting(id, res) {
        writings_service_1.WritingsService.find(id, (err, writing) => {
            if (err) {
                res(err, null);
            }
            else {
                let iconvlite = require('iconv-lite');
                let filebuffer = fs.readFileSync(writing.address);
                let writingText = iconvlite.decode(filebuffer, 'ISO-8859-1');
                res(err, writingText);
            }
        });
    }
    static getConcepts(id, token, res) {
        concepts_service_1.ConceptsService.listFromWritingId(id, token.username, (err, concepts) => {
            if (err) {
                res(err, []);
            }
            else {
                res(err, concepts);
            }
        });
    }
    static getConceptList(res) {
        concepts_service_1.ConceptsService.list((err, concepts) => {
            if (err) {
                res.json({ succes: false, message: "error occured while getting concepts" });
            }
            else {
                res.json({ success: true, message: "succesfully retrived concepts", concepts: concepts });
            }
        });
    }
    static addConcept(concept, res) {
        concepts_service_1.ConceptsService.create(concept, (err, conceptR) => {
            if (err) {
                res.status(500).json({ 'error': 'Failed to create concept !' });
            }
            else {
                res.json({ 'success': 'Concept created !', 'concept': conceptR });
            }
        });
    }
    static addUser(user, res) {
        users_service_1.UsersService.create(user, res);
    }
    static getUsers(res) {
        users_service_1.UsersService.list(res);
    }
    static findUserByName(name, res) {
        users_service_1.UsersService.findByName(name, res);
    }
    static findConceptsByUser(name, res) {
        concepts_service_1.ConceptsService.listFromUserName(name, res);
    }
}
exports.Manager = Manager;
//# sourceMappingURL=manager.js.map