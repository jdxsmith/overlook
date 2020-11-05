class Customer {
    constructor(username) {
        this.username = username;
        this.password = 'overlook2020';
        if (username.includes('customer')) {
            this.id = parseInt(username.slice(8));
        } else {
            this.id = 0;
        }
    }
};

export { Customer };