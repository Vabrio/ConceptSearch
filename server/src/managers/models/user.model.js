let moment = require(__base + 'config/moment')


class UserModel
{
    constructor (row) {
        this.row = row;
    }

    get id() {
        return this.row.id;
    }
    set id(val) {
        this.row.id = val;
    }

    get firstname() {
        return this.row.firstname;
    }
    set firstname(val) {
        this.row.firstname = val;
    }

    get lastname() {
        return this.row.lastname;
    }
    set lastname(val) {
        this.row.lastname = val;
    }

    get age() {
        return this.row.age;
    }
    set age(val) {
        this.row.age = val;
    }

    get created_at() {
        return moment(this.row.created_at);
    }
    set created_at(val) {
        this.row.created_at = val;
    }

    //== conversion "automatique" dans le controlleur, Cf. ##1
    toJSON() {
        return {
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname,
            age : this.age,
            created_at: this.create_at
        };
    }

    isValid() {
        return !(isNaN(this.age) ||
            this.firstname === '' ||
            this.firstname === undefined ||
            this.lastname === '' ||
            this.lastname === undefined);
    }
}

module.exports = UserModel
