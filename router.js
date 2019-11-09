const express = require('express');

// internal imports
const userController = require('./controllers/userController')

// instance of router from express
const router = express.Router();

// home route
router.get('/', userController.home);

// register route
router.post('/register', userController.register);
router.post('/login', userController.login);


module.exports = router;