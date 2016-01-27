var express = require('express');
var router = express.Router();
var Host = require('../models/hosts');

/* GET Host info. */
router.get('/', function(req, res, next) {
  Host.find({_id: {$exists: true}}, function(err, data) {
    res.send(data);
  });
});