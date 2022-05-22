const express = require('express');
const app = express();
const { port } = require('./config');
const apiRouter = require('./routes/api');

// used routes
app.use('/api/', apiRouter);

// server working
app.listen(port, function() {
    console.log("Serwer słucha... http://localhost:" + port);
})