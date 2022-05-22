const express = require('express');
const app = express();
const { port } = require('./config');
const apiRouter = require('./routes/api');
const bodyParser = require('body-parser');

// add mongoose conneciton
require('./db/mongoose');


// paresery
// Content-type: application/json
app.use(bodyParser.json())
// used routes
app.use('/api/', apiRouter);

// server working
app.listen(port, function() {
    console.log("Serwer słucha... http://localhost:" + port);
})