var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();

var DeviceData = require('../models/device-data');

router.use(bodyParser.json());

router.route('/')
.get(function(req, res, next) {
  DeviceData.find({}, function(err, deviceData) {
    if(err) throw err;
    if (deviceData.length == 0) {
      res.json({result: 0})
      return
    }

    console.log(deviceData[0].petHasAteCount)
    res.json({result: deviceData[0].petHasAteCount})
  });
})

module.exports = router;
