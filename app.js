const express = require('express');

// instance of express
const app = express();

const port = 8080;

app.get('/', (req, res) => {
    res.send('root');
})



// listening to port
app.listen(port, () => {
    console.log('server started at port', port)
})
