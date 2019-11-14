const mongoose = require('mongoose');
const Bookings = require('../models/Booking');

const connectionUri = process.env.MONGO_CONNECTION_STRING;

module.exports = {
    // book a new slot
    book: (req, res) => {
        mongoose.connect(connectionUri, { useNewUrlParser: true }, (err) => {
            let result = {};
            let status = 201;
            if (!err) {
                const { id, date, startTime, endTime, duration, createdAt } = req.body;
                const booking = new Bookings({ id, date, startTime, endTime, duration, createdAt });
                // save booking in db
                booking.save((err, user) => {
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
    // get all bookings
    getBookings: (req, res) => {
        mongoose.connect(connectionUri, { useNewUrlParser: true }, (err) => {
            let result = {};
            let status = 200;
            if (!err) {
                const payload = req.decoded;
                Bookings.find({}, (err, bookings) => {
                    if (!err) {
                        result.status = status;
                        result.error = err;
                        result.result = bookings;
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
    }
}