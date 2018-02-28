//=========================================================================
// Le service contient le code métier, il doit traiter des données (si besoin)
// et les rendre au controller.
//=========================================================================

import {ConceptsDAO} from "../dao/concepts.dao.mysql";
import {ConceptModel} from '../models/concept.model';


class ConceptsService
{
	static create(concept: ConceptModel, cb: any) {
        ConceptsDAO.create(concept, cb);
    }
/*
    static update(user, cb) {
        UsersDAO.update(user, cb);
    }
	*/
	static deletion(id: number, cb: any) {
		return ConceptsDAO.deletion(id, (err:any, concept: ConceptModel) => {
          cb(err, concept);
        });
    }

	static find(id: number, cb: any) {
        return ConceptsDAO.find(id, cb);
    }

    static list(cb: any) {
        return ConceptsDAO.list(cb);
    }
	
	static listFromWritingId(writingid: number, cb: any) {
        return ConceptsDAO.listFromWritingId(writingid, cb);
    }
	
	static listFromUserName(name: string, cb: any) {
        return ConceptsDAO.listFromUserName(name, cb);
    }
}

export {ConceptsService};
