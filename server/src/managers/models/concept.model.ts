interface Row {
	id?: number;
	name: string;
	writingid?: number;
	begin?: number;
	end?: number;
	extract?: string;
	userid?: string;
	strength?: number;
	created_at?: Date;
}


class ConceptModel{
	
	row : Row;
	
	constructor (row: Row) {
        this.row = row;
    }

    get id() {
        return this.row.id;
    }
	set id(val: number) {
        this.row.id = val;
    }

    get name() {
        return this.row.name;
    }
	set name(val: string) {
        this.row.name = val;
    }

    get writingid() {
        return this.row.writingid;
    }
	set writingid(val: number) {
        this.row.writingid = val;
    }

    get begin() {
        return this.row.begin;
    }
	set begin(val: number) {
        this.row.begin = val;
    }

    get end() {
        return this.row.end;
    }
	set end(val: number) {
        this.row.end = val;
    }

    get extract() {
        return this.row.extract;
    }
	set extract(val: string) {
        this.row.extract = val;
    }

    get userid() {
        return this.row.userid;
    }
	set userid(val: string) {
        this.row.userid = val;
    }

    get strength() {
        return this.row.strength;
    }
	set strength(val: number) {
        this.row.strength = val;
    }

    get created_at() {
        return this.row.created_at;
    }
	set created_at(val: Date) {
        this.row.created_at = val;
    }

    //== conversion "automatique" dans le controlleur, Cf. ##1
    toJSON() {
        return {
            id: this.row.id,
            name: this.row.name,
            writingid: this.row.writingid,
			begin: this.row.begin,
			end: this.row.end,
            extract: this.row.extract,
            userid: this.row.userid,
			strength: this.row.strength,
            created_at: this.created_at
        };
    }

    isValid() {
	return !(this.row.extract === '' || 
		(this.row.begin === undefined && this.row.end === undefined ));
    }
}

export {ConceptModel}
