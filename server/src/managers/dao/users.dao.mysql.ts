
import {db} from "../config/mysql/mysql.db"
import {UserModel} from '../models/user.model';


class UsersDAO
{
	//--------------------
	// VERIFIED USER DB
	//--------------------
	static create(user: UserModel, cb: any) {
        db.query('INSERT INTO use_users SET name = ?, password = ?, email = ?', [user.name, user.password, user.email], (err: any, result: any) => {
            user.id = result.insertId;
            cb(err, user);
        });
    }
	static udpateUserPwd(id: number, hash: string, cb: any) {
        db.query('UPDATE use_users SET password = ? WHERE id = ?', [hash,id], (err: any, rows:any) => {
            cb(err, rows);
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
	static find(id: number, name: string, cb: any) {
		db.query('SELECT * FROM use_users WHERE id = ? AND name= ? LIMIT 1', [id, name], (err: any, rows: any) => {
			if (err) {cb(err, null); return 0;}
            cb(err, new UserModel(rows[0]));
        });
    }
	static findVerifByName(name: string, cb: any) {
		db.query('SELECT * FROM use_users WHERE name = ? LIMIT 1', [name], (err: any, rows: any) => {
			if (rows.length > 0) cb(err, new UserModel(rows[0]));
			else {cb(err,null)}
        });
    }
	static findByEmail(email: string, cb: any) {
		db.query('SELECT * FROM use_users WHERE email = ? LIMIT 1', [email], (err: any, rows: any) => {
			if (rows.length > 0) cb(err, new UserModel(rows[0]));
			else cb(err, null);
        });
    }
	
	//-------------------------
	// BOTH TEMP AND VERIFIED
	//-------------------------
	static findByName(name: string, cb: any) {
		db.query('SELECT * FROM use_users WHERE name = ? LIMIT 1', [name], (err: any, rows: any) => {
			if (rows.length > 0) cb(err, new UserModel(rows[0]));
			else {
				db.query('SELECT id, name, password, email, created_at FROM use_users_temp WHERE name = ? LIMIT 1', [name], (err: any, rows: any) => {
					if (rows.length > 0){
						var d = Date.parse((new Date()).toString())- 3600000;
						var d2: any;
						for (let r of rows){
							d2 = Date.parse((new Date(r.created_at)).toString());
							if (d2>d){
								cb(err, new UserModel(r));
								return 1;
							}else {
								cb(err, null);
							}
						}
					} 
					else cb(err, null);
				});
			}
        });
    }
	
	
	//------------------
	// TEMP USER DB
	//------------------
	static createTemp(user: UserModel, uuid: string, cb: any) {
        db.query('INSERT INTO use_users_temp SET name = ?, password = ?, email = ?, uuid = ?', [user.name, user.password, user.email, uuid], (err: any, result: any) => {
			user.id = result.insertId;
            cb(err, user);
        });
    }
	static updateTemp(id: number, cb:any){
		db.query('UPDATE use_users_temp SET created_at = ? WHERE id = ?', [new Date() ,id], (err: any) => {
			db.query('SELECT * FROM use_users_temp WHERE id = ? LIMIT 1', [id], (err: any, rows: any) => {
				if (rows.length > 0 ){
					cb(err, rows[0]);
				}else {
					cb(err, null);	
				}
			})
        });
	}
	// Find in temp with uuid
	static findByUUID(uuid: string, cb: any) {
		db.query('SELECT * FROM use_users_temp WHERE uuid = ? LIMIT 1', [uuid], (err: any, rows: any) => {
			if (rows.length > 0 ){
				this.create(new UserModel(rows[0]), cb);
				db.query('DELETE FROM use_users_temp WHERE id = ?', [rows[0].id], (err: any) => {
					if (err) console.log("ERROR DELETING FROM TEMP USERS : "+ err);
				});
			} else {
				cb(null, null);
			}
        });
    }
	static findTempByEmail(email: string, cb: any) {
		db.query('SELECT id, name, password, email, created_at FROM use_users_temp WHERE email = ? LIMIT 1', [email], (err: any, rows: any) => {
			if (rows.length > 0) {cb(err, rows[0])} 
			else cb(err, null);
		});
    }
}

export {UsersDAO};
