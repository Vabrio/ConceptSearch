//=========================================================================
// Le service contient le code métier, il doit traiter des données (si besoin)
// et les rendre au controller.
//=========================================================================

import { UsersDAO } from '../dao/users.dao.mysql';
import { UserModel } from '../models/user.model';


class UsersService
{
	static create(user: UserModel , res: any) {
		UsersDAO.findByName(user.name, (err: any, userF: UserModel)=>{
			if (err) {
				res.status(500).json({ success: false, message: 'db_error', type: 0 });
			} else if (userF) {
					res.json({ success: false, message: 'Login already token !', type: 1});
			} else {
        		UsersDAO.create(user, (err: any, user2: UserModel) =>{
					res.json({ 'success': 'User created !', 'user': user2 });
				});
			}
		})
    }

	static update(user: UserModel, cb: any) {
        UsersDAO.update(user, cb);
    }

	static delete(id: string, cb: any) {
		return UsersDAO.delete(id, (err: any, user: UserModel) => {
          cb(err, user);
        });
    }

    static find(id: number, cb: any) {
        return UsersDAO.find(id, cb);
    }

    static findByName(name: string, cb: any) {
        return UsersDAO.findByName(name, cb);
    }

	static list(cb: any) {
        return UsersDAO.list(cb);
    }
}

export { UsersService };
