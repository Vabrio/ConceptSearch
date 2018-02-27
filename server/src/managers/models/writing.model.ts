interface Row {
	id?: number;
	address: string;
	name?: string;
	writer?: string;
}


class WritingModel{
	
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

    get address() {
        return this.row.address;
    }
	set address(val: string) {
        this.row.address = val;
    }

    get name() {
        return this.row.name;
    }
	set name(val: string) {
        this.row.name = val;
    }

    get writer() {
        return this.row.writer;
    }
	set writer(val: string) {
        this.row.writer = val;
    }

    //== conversion "automatique" dans le controlleur, Cf. ##1
    toJSON() {
        return {
            id: this.row.id,
            address: this.row.address,
            name: this.row.name,
            writer : this.row.writer
        };
    }

    isValid() {
		return !(this.row.address === '' ||
			this.row.address === undefined);
    }
}

export {WritingModel}
