var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var router = express.Router();
var dogContestForm = require('./dogContestForm');

module.exports = () => {
  router.use(
    cors({ origin: "*" }),
    bodyParser.json({ limit: "50mb" }),
    bodyParser.urlencoded({ limit: "50mb", extended: true }),
    express.json()
  );

  router.get('/', (req, res) => {
    res.send("Connected!");
  })

  router.use(dogContestForm());

  return router;
};
