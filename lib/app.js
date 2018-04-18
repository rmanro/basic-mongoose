const express = require('express');
const app = express();
const bands = require('./routes/bands');

app.use(express.json());

app.use('/bands', bands);

module.exports = app;