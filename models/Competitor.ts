class Competitor {
    
    _fullName: String;
    _phone: String;
    _email: String;

    constructor(fullName: String, phone: String, email: String) {
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
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
};