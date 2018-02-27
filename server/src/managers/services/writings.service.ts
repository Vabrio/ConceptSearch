//=========================================================================
// Le service contient le code métier, il doit traiter des données (si besoin)
// et les rendre au controller.
//=========================================================================

import {WritingsDAO} from "../dao/writings.dao.mysql";
import {WritingModel} from '../models/writing.model';


class WritingsService
{
	static create(writing: WritingModel, cb: any) {
        WritingsDAO.create(writing, cb);
    }
/*
    static update(user, cb) {
        UsersDAO.update(user, cb);
    }

    static delete(id, cb) {
        return UsersDAO.delete(id, (err, user) => {
          cb(err, user);
        });
    }*/

	static find(id: number, cb: any) {
        return WritingsDAO.find(id, cb);
    }

    static list(cb: any) {
        return WritingsDAO.list(cb);
    }
}

export {WritingsService};
