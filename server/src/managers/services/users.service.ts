//=========================================================================
// Le service contient le code métier, il doit traiter des données (si besoin)
// et les rendre au controller.
//=========================================================================

import { UsersDAO } from '../dao/users.dao.mysql';
import { UserModel } from '../models/user.model';
import {NAMES_UNAVAILABLE} from "../../const/const";


class UsersService
{
	static create(user: UserModel , res: any) {
		
    }

	static update(user: UserModel, cb: any) {
        UsersDAO.update(user, cb);
    }

	static delete(id: string, cb: any) {
		return UsersDAO.delete(id, cb);
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
