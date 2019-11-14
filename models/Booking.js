const mongoose = require('mongoose');

const environment = process.env.NODE_ENV;

const Schema = mongoose.Schema;

// booking schema
const bookingSchema = new Schema({
    id: {
        type: 'String',
        required: true,
    },
    date: {
        type: 'String',
        required: true,
        trim: true,
    },
    duration: {
        type: 'Number',
        required: true,
        trim: true,
    },
    startTime: {
        type: 'String',
        required: true,
        trim: true
    },
    endTime: {
        type: 'String',
        required: true,
        trim: true
    },
    createdAt: {
        type: 'String',
        required: true,
        trim: true
    },
});

module.exports = mongoose.model('Booking', bookingSchema);