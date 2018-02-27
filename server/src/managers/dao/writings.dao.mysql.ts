//=========================================================================
// Le module DAO contient les requetes pour une base de donnée spécifique.
// Il peut y avoir une DAO MySQL, une DAO PostgreSQL, une DAO Oracle, etc...
// Par la suite il sera facile de switcher de l'une à l'autre sans toucher
// au reste du code de l'application.
//=========================================================================

import {db} from "../config/mysql/mysql.db";
import {WritingModel} from '../models/writing.model';


class WritingsDAO
{
	static create(writing: WritingModel, cb: any) {
        db.query('INSERT INTO wri_writings SET address = ?, name = ?, writer = ?', [writing.address, writing.name, writing.writer], (err: any, result: any) => {
			writing.id = result.insertId;
			cb(err, writing);
	    });
    }

    /*static update(user, cb) {
        db.query('UPDATE user SET firstname = ?, lastname = ?, age = ? WHERE id = ?', [user.firstname, user.lastname, user.age, user.id], (err) => {
            cb(err, user);
        });
    }

    static delete(id, cb) {
        db.query('DELETE FROM user WHERE id = ?', [id], (err) => {
            cb(err);
        });
    }*/

	static list(cb:any) {
		db.query('SELECT * FROM wri_writings', (err: any, rows: any) => {
			cb(err, rows.map((row: any) => {
				return new WritingModel(row)
            }));
        });
    }

	static find(id: number, cb: any) {
		db.query('SELECT * FROM wri_writings WHERE id = ? LIMIT 1', [id], (err: any, rows: any) => {
            cb(err, new WritingModel(rows[0]));
        });
    }
}

export {WritingsDAO};
