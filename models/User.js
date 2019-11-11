const bcrypt = require('bcryptjs');
const userCollection = require('../db').collection('users');
const validator = require('validator');
const uuidv1 = require('uuid/v1');
let User = function (data) {
    this.data = data;
    this.errors = [];
};

// clean up function
User.prototype.cleanUp = function () {
    if (typeof (this.data.username) != "string") {
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
}

// validate user input
User.prototype.validate = function () {
    return new Promise(async (resolve, reject) => {
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
        if (this.data.password.length > 0 && this.data.password.length < 6) {
            this.errors.push('Password must be between 6 t0 ');
        }
        if (this.data.password.length > 25) {
            this.errors.push('Password cannot exceed 25 characters');
        }
        if (this.data.username.length > 0 && this.data.username.length < 4) {
            this.errors.push('username must be atleast 4 character long!');
        }
        if (this.data.username.length > 16) {
            this.errors.push('username cannot exceed 16 characters');
        }

        // only if username is valid then check to see if its already exist
        if (this.data.username.length > 4 && this.data.username.length < 17 && validator.isAlphanumeric(this.data.username)) {
            let usernameExists = await userCollection.findOne({ username: this.data.username })
            if (usernameExists) {
                this.errors.push('Username is already taken.')
            }
        }

        // if email exist in the db
        if (validator.isEmail(this.data.email)) {
            let emailExists = await userCollection.findOne({ email: this.data.email })
            if (emailExists) {
                this.errors.push('Email is already with us, please login to continue.')
            }
        }
        resolve();
    }
    )
}

User.prototype.login = function () {
    return new Promise((resolve, reject) => {
        this.cleanUp();
        userCollection.findOne({ username: this.data.username })
            .then((attemptedUser) => {
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
    return new Promise(async (resolve, reject) => {
        // step 1: Validate data
        this.cleanUp()
        await this.validate()
        // step 2: Only if no validation error, save to db
        if (!this.errors.length) {
            // hash user password
            let salt = bcrypt.genSaltSync(10);
            this.data.password = bcrypt.hashSync(this.data.password, salt)
            this.data.id = uuidv1();
            await userCollection.insertOne(this.data);
            resolve();
        } else {
            reject(this.errors);
        }
        // step 3: 
    })
}



module.exports = User;