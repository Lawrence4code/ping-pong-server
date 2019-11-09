const bcrypt = require('bcryptjs');
const userCollection = require('../db').collection('users');
const validator = require('validator');
let User = function (data) {
    this.data = data;
    this.errors = [];
};

// clean up function
User.prototype.cleanUp = function () {
    console.log('data.username', typeof (this.data.username
    ))
    if (typeof (this.data.username) != "string") {
        console.log('if case met')
        this.data.username = "";
    }
    if (typeof (this.data.email) != "string") {
        this.data.email = "";
    }
    if (typeof (this.data.password) != "string") {
        this.data.password = "";
    }

    // get rid of extra property if any // override
    this.data = {
        username: this.data.username.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password
    }
    console.log('this.data', this.data)
}

// validate user input
User.prototype.validate = function () {
    console.log('data', this.data);
    if (this.data.username == "") {
        this.errors.push("You must provide a username");
    }
    if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {
        this.errors.push("User name can only contain letters and numbers");
    }
    if (!validator.isEmail(this.data.email)) {
        this.errors.push("You must provide a valid email address");
    }
    if (this.data.password == "") {
        this.errors.push("You must provide a password");
    }
    if (this.data.password.length > 0 && this.data.password.length < 12) {
        this.errors.push('Password must be atleast 12 letter long!');
    }
    if (this.data.password.length > 25) {
        this.errors.push('Password cannot exceed 25 characters');
    }
    if (this.data.username.length > 0 && this.data.username.length < 4) {
        this.errors.push('username must be atleast 4 character long!');
    }
    if (this.data.username.length > 30) {
        this.errors.push('username cannot exceed 30 characters');
    }
}

User.prototype.login = function () {
    return new Promise((resolve, reject) => {
        this.cleanUp();
        userCollection.findOne({ username: this.data.username })
            .then((attemptedUser) => {
                console.log(bcrypt.compareSync(this.data.password, attemptedUser.password))
                console.log(this.data.password)
                console.log(attemptedUser.password)

                if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
                    resolve('login success');
                } else {
                    reject('Invalid username or password.');
                }
            })
            .catch((err) => {
                reject('User does not exist, if new to the site please register and create new User');
            })
    })
}

User.prototype.register = function () {
    console.log('data', this.data)
    // step 1: Validate data
    this.cleanUp()
    this.validate()
    // step 2: Only if no validation error, save to db
    if (!this.errors.length) {
        // hash user password
        let salt = bcrypt.genSaltSync(10);
        console.log('salt', salt);
        this.data.password = bcrypt.hashSync(this.data.password, salt)
        console.log(this.data);
        userCollection.insertOne(this.data);
    }
    // step 3: 
};



module.exports = User;