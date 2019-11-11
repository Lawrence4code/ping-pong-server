const bookingCollection = require('../db').collection('bookings');
const validator = require('validator');
let Booking = function (data) {
    this.data = data;
    this.errors = [];
};


// validate user input
Booking.prototype.validate = function () {
    return new Promise(async (resolve, reject) => {
        // // only if username is valid then check to see if its already exist
        // if (this.data.username.length > 4 && this.data.username.length < 17 && validator.isAlphanumeric(this.data.username)) {
        //     let usernameExists = await userCollection.findOne({ username: this.data.username })
        //     if (usernameExists) {
        //         this.errors.push('Username is already taken.')
        //     }
        // }

        // // if email exist in the db
        // if (validator.isEmail(this.data.email)) {
        //     let emailExists = await userCollection.findOne({ email: this.data.email })
        //     if (emailExists) {
        //         this.errors.push('Email is already with us, please login to continue.')
        //     }
        // }
        resolve();
    }
    )
}

// reserve booking
Booking.prototype.reserve = function () {
    return new Promise(async (resolve, reject) => {
        await this.validate()
        // step 2: Only if no validation error, save to db
        if (!this.errors.length) {
            await bookingCollection.insertOne(this.data);
            resolve();
        } else {
            reject(this.errors);
        }
    })
}

// edit booking yet to be created

// cancel booking yet to be created

module.exports = Booking;