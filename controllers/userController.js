const User = require('../models/User');

exports.login = function (req, res) {
    let user = new User(req.body);
    user.login()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
}

exports.logout = function () {

}

exports.register = function (req, res) {
    let user = new User(req.body);
    user.register()
        .then(() => {
            res.send('Congrats, registeration success');
        })
        .catch((err) => {
            res.status(409).send(err);
        })
}

exports.home = function (res, res) {
    res.send('Home Page');
}