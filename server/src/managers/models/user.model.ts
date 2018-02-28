interface Row {
	id?: number;
	name: string;
	password: string;
	firstname?: string;
	lastname?: string;
	email?: string;
	birth_date?: Date;
	status?: number;
	created_at?: Date;
}

class UserModel
{
	row: Row;
	
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

    get password() {
        return this.row.password;
    }
	set password(val: string) {
        this.row.password = val;
    }

    get firstname() {
        return this.row.firstname;
    }
    set firstname(val: string) {
        this.row.firstname = val;
    }

    get lastname() {
        return this.row.lastname;
    }
	set lastname(val: string) {
        this.row.lastname = val;
    }
	
    get email() {
        return this.row.email;
    }
	set email(val: string) {
        this.row.email = val;
    }

    get birth_date() {
        return this.row.birth_date;
    }
	set birth_date(val: Date) {
        this.row.birth_date = val;
    }
	
    get status() {
        return this.row.status;
    }
	set status(val: number) {
        this.row.status = val;
    }

    get created_at() {
        return this.row.created_at;
    }
	set created_at(val: Date) {
        this.row.created_at = val;
    }

    //== conversion "automatique" dans le controlleur, Cf. ##1
    toJSON() {
        return this.row;
    }

    isValid() {
        return !(this.row.name === '' || 
			this.row.name === undefined ||
			this.row.password === '' ||
            this.row.password === undefined);
    }
}

export {UserModel}
