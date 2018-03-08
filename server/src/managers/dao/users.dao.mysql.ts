
import {db} from "../config/mysql/mysql.db"
import {UserModel} from '../models/user.model';


class UsersDAO
{
	static create(user: UserModel, cb: any) {
        db.query('INSERT INTO use_users SET name = ?, password = ?, email = ?', [user.name, user.password, user.email], (err: any, result: any) => {
            user.id = result.insertId;
            cb(err, user);
        });
    }

	static update(user: UserModel, cb: any) {
        db.query('UPDATE use_users SET firstname = ?, lastname = ?, email = ?, birth_date = ?, status = ? WHERE id = ?', [user.firstname, user.lastname, user.email, user.birth_date, user.status ,user.id], (err: any) => {
            cb(err, user);
        });
    }

	static delete(id: string, cb: any) {
	db.query('DELETE FROM use_users WHERE id = ?', [id], (err: any) => {
            cb(err);
        });
    }

	static list(cb: any) {
	db.query('SELECT * FROM use_users', (err: any, rows: any) => {
		cb(err, rows.map((row: any) => {
                return new UserModel(row)
            }));
        });
    }
	static find(id: number, cb: any) {
		db.query('SELECT * FROM use_users WHERE id = ? LIMIT 1', [id], (err: any, rows: any) => {
            cb(err, new UserModel(rows[0]));
        });
    }
	
	
	static findByName(name: string, cb: any) {
		db.query('SELECT * FROM use_users WHERE name = ? LIMIT 1', [name], (err: any, rows: any) => {
			if (rows.length > 0) cb(err, new UserModel(rows[0]));
			else cb(err, null);
        });
    }
}

export {UsersDAO};
