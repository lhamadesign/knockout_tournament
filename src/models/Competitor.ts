export class Competitor {
    
    _fullName: string;
    _phone: string;
    _email: string;

    constructor(fullName: string, phone: string, email: string) {
        this._fullName = fullName;
        this._phone = phone;
        this._email = email;
    }

    get fullName() {
        return this._fullName;
    };

    get phone() {
        return this._phone;
    };

    get email() {
        return this._email;
    };

    set fullName(fullName) {
        this._fullName = fullName;
    };

    set phone(phone) {
        this._phone = phone;
    };

    set email(email) {
        this._email = email;
    }

    public updateCompetitor = (fullName: string, phone: string, email: string) => {
        this._fullName = fullName;
        this._phone = phone;
        this._email = email;
    }
};