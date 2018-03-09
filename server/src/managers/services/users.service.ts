//=========================================================================
// Le service contient le code métier, il doit traiter des données (si besoin)
// et les rendre au controller.
//=========================================================================

import { UsersDAO } from '../dao/users.dao.mysql';
import { UserModel } from '../models/user.model';
import {NAMES_UNAVAILABLE} from "../../const/const";


class UsersService
{
	static create(user: UserModel , cb: any) {
        UsersDAO.create(user, cb);
    }
	static createTemp(user: UserModel, uuid: string , cb: any) {
        UsersDAO.createTemp(user, uuid, cb);
    }

	static udpateUserPwd(id: number, hash: string, cb: any){
		UsersDAO.udpateUserPwd(id, hash, cb);
	}
	static updateTemp(id: number, cb: any){
		UsersDAO.updateTemp(id, cb);
	}

	static delete(id: string, cb: any) {
		return UsersDAO.delete(id, cb);
    }

    static find(id: number, name: string, cb: any) {
        return UsersDAO.find(id, name, cb);
    }

    static findByName(name: string, cb: any) {
        return UsersDAO.findByName(name, cb);
    }
    static findVerifByName(name: string, cb: any) {
        return UsersDAO.findVerifByName(name, cb);
    }
    static findByEmail(email: string, cb: any) {
        return UsersDAO.findByEmail(email, cb);
    }
    static findTempByEmail(email: string, cb: any) {
        return UsersDAO.findTempByEmail(email, cb);
    }


    static findByUUID(uuid: string, cb: any) {
        return UsersDAO.findByUUID(uuid, cb);
    }

	static list(cb: any) {
        return UsersDAO.list(cb);
    }
}

export { UsersService };
