const express = require('express');
const cors = require('cors')

// instance of express
const app = express();

// port
const port = 8080;

// middlewares
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// route
app.get('/', (req, res) => {
    res.send('root');
})

// listening to port
app.listen(port, () => {
    console.log('server started at port', port)
})
