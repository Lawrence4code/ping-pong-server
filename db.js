const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// variables
const port = process.env.PORT;

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {

    })
    .catch(err => {
        console.error('Database connection error', err);
    })

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database connection successful');
    // listening to port
    const app = require('./app');
    app.listen(port, () => {
        console.log('server started at port', port)
    })
});

module.exports = db;