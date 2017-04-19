/**
 * Dependencies installed
 */
const express = require('express'),
port = 70000,
app = express(),
bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('./api', require('./routes/api'))
app.listen(port);

console.log(`API is running on port ${port}`);



