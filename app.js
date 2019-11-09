const express = require('express');
const cors = require('cors')

const db = require('./db');

// internal imports
const router = require('./router');

// variables
const app = express();

// middlewares
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// route middleware
app.use('/', router);

module.exports = app;