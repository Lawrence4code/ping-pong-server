const mongoose = require('mongoose');
const Bookings = require('../models/Booking');

const connectionUri = process.env.MONGO_CONNECTION_STRING;

module.exports = {
    // booking a new slot
    createBooking: (req, res) => {
        mongoose.connect(connectionUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
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
        mongoose.connect(connectionUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
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
    },
    // cancel booking
    cancelBooking: (req, res) => {
        const { bookingId } = req.body;
        mongoose.connect(connectionUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            let result = {};
            let status = 200;

            if (!err) {
                Bookings.findOneAndRemove({ "_id": bookingId }, (err, booking) => {
                    if (!err && booking) {
                        status = 200;
                        result.bookingId = bookingId;
                        result.status = status;
                        res.status(status).send({ bookingId, message: "Booking delete as requested" });
                    } else {
                        status = 404;
                        result.status = status;
                        result.error = err;
                        res.status(status).send("Unable to find Requested Resource");
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