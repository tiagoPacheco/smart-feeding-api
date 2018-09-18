var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();

var Food = require('../models/food');

router.use(bodyParser.json());
let maxFood = 20
let maxWeigh = 1000
let portion = 200

router.route('/')
.get(function(req, res, next) {
  Food.find({}, function(err, foods) {
    if(err) throw err;

    if (foods.length == 0) {
      res.json({result: maxFood})
      return
    }

    let calculatedValue = (maxWeigh - ((foods[0].amountOfFood / maxFood) * maxWeigh)) / portion

    if (calculatedValue < 0) {
        calculatedValue = 1
    }

    console.log(calculatedValue)
    res.json({result: calculatedValue | 0})
  });
})

module.exports = router;