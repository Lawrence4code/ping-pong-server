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
    console.log('res', req.body);
    user.register();

    if (user.errors.length) {
        res.send(user.errors);
    } else {
        res.send('Congrats, registeration success');
    }
}

exports.home = function (res, res) {
    res.send('Home Page');
}