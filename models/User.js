const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// internal imports and variables
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];


const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
    name: {
        type: 'String',
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: 'String',
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: 'String',
        required: true,
        trim: true
    }
});

// encrypt password before saving to DB
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified || !user.isNew) {
        next();
    } else {
        bcrypt.hash(user.password, stage.saltingRounds, function (err, hash) {
            if (err) {
                console.log('Error while hashing password for user', user.user);
                next(err);
            } else {
                user.password = hash;
                next();
            }
        });
    }
});

module.exports = mongoose.model('User', userSchema);