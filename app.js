const express = require('express');
const cors = require('cors')
const routes = require('./routes/index');

const db = require('./db');

// internal imports
// const router = require('./router');
const router = express.Router();

// variables
const app = express();

// middlewares
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', routes(router));

module.exports = app;