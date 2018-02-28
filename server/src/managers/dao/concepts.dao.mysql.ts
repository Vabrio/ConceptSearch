//=========================================================================
// Le module DAO contient les requetes pour une base de donnée spécifique.
// Il peut y avoir une DAO MySQL, une DAO PostgreSQL, une DAO Oracle, etc...
// Par la suite il sera facile de switcher de l'une à l'autre sans toucher
// au reste du code de l'application.
//=========================================================================

import {db} from "../config/mysql/mysql.db";
import {ConceptModel} from '../models/concept.model';


class ConceptsDAO
{
	static create(concept: ConceptModel, cb: any) {
		db.query('INSERT INTO con_concepts SET name = ?, writingid = ?, begin = ?, end = ?, extract= ?, userid = ?, strength = ?', [concept.name, concept.writingid, concept.begin, concept.end, concept.extract, concept.userid, concept.strength], (err: any, result: any) => {
			concept.id = result.insertId;
			cb(err, concept);
	    });
    }

    /*static update(user, cb) {
        db.query('UPDATE user SET firstname = ?, lastname = ?, age = ? WHERE id = ?', [user.firstname, user.lastname, user.age, user.id], (err) => {
            cb(err, user);
        });
    }
	*/

	static find(id: number, cb: any) {
		db.query('SELECT * FROM con_concepts WHERE id = ? LIMIT 1', [id], (err: any, rows: any) => {
            cb(err, new ConceptModel(rows[0]));
        });
    }
	
	
	static deletion(id: number, cb: any) {
		db.query('DELETE FROM con_concepts WHERE id = ?', [id], (err: any) => {
            cb(err);
        });
    }

	static list(cb:any) {
		db.query('SELECT * FROM con_concepts', (err: any, rows: any) => {
			cb(err, rows.map((row: any) => {
                return new ConceptModel(row)
            }));
        });
    }
	
	static listFromWritingId(writingid: number, cb:any) {
		db.query('SELECT * FROM con_concepts WHERE writingid = ?', [writingid], (err: any, rows: any) => {
			cb(err, rows.map((row: any) => {
                return new ConceptModel(row)
            }));
        });
    }
	
	static listFromUserName(name: string, cb:any) {
		db.query('SELECT * FROM con_concepts WHERE userid = ?', [name], (err: any, rows: any) => {
			cb(err, rows.map((row: any) => {
                return new ConceptModel(row).toJSON();
            }));
        });
    }
}

export {ConceptsDAO};
