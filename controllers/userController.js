const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const connectionUri = process.env.MONGO_CONNECTION_STRING;

module.exports = {
    // Register Logic
    register: (req, res) => {
        mongoose.connect(connectionUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            let result = {};
            let status = 201;
            if (!err) {
                const { name, email, password } = req.body;
                const user = new User({ name, email, password });
                // save user with payload information
                user.save((err, user) => {
                    if (!err) {
                        result.status = status;
                        result.result = user;
                    } else {
                        status = 500;
                        result.status = status;
                        result.error = err;
                    }
                    res.status(status).send(result);
                });
            } else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        });
    },
    // Login Logic
    login: (req, res) => {
        const { name, password } = req.body;
        mongoose.connect(connectionUri, { useNewUrlParser: true }, (err) => {
            let result = {};
            let status = 200;
            if (!err) {
                User.findOne({ name }, (err, user) => {
                    if (!err && user) {
                        bcrypt.compare(password, user.password).then(match => {
                            if (match) {
                                status = 200;
                                // Token config and generation
                                const payload = { user: user.name };
                                const options = { expiresIn: '2d', issuer: 'pingpongLLC' };
                                const secret = process.env.JWT_SECRET;
                                const token = jwt.sign(payload, secret, options);

                                user = {
                                    token: token,
                                    userId: user._id,
                                    username: name
                                }
                                result.status = status;
                                result.result = user;
                            } else {
                                status = 401;
                                result.status = status;
                                result.error = `Authentication error`;
                            }
                            res.status(status).send(result);
                        }).catch(err => {
                            status = 500;
                            result.status = status;
                            result.error = err;
                            res.status(status).send(result);
                        });
                    } else {
                        status = 404;
                        result.status = status;
                        result.error = err;
                        res.status(status).send(result);
                    }
                });
            } else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        });
    }
}