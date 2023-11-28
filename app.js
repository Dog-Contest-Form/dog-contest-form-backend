var express = require('express');
var app = express();
var router = require('./src/routes');

app.use(router());

module.exports = app;
