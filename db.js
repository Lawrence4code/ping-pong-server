const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

// variables
const port = process.env.PORT;

// mongo db connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
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

// to remote deprecated warning
mongoose.set('useCreateIndex', true);

module.exports = db;