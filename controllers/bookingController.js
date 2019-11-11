const Booking = require('../models/Booking');

exports.reserve = function (req, res) {
    let user = new Booking(req.body);
    user.reserve()
        .then(() => {
            res.send('Booking saved');
        })
        .catch((err) => {
            res.status(409).send(err);
        })
}