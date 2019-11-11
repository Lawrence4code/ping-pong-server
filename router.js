const express = require('express');

// internal imports
const userController = require('./controllers/userController')
const bookingController = require('./controllers/bookingController')

// instance of router from express
const router = express.Router();

// home route
router.get('/', userController.home);

// register Routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// booking Routes
router.post('/book', bookingController.reserve);


module.exports = router;