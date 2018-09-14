var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();

var DeviceData = require('../models/device-data');

 router.use(bodyParser.json());

router.route('/')
.get(function(req, res, next) {
  DeviceData.find({}, function(err, deviceData){
    if(err) throw err;
    res.json(deviceData);
  }); 
})

.post(function (req, res, next){
  DeviceData.create(req.body, function(err, deviceData){
    if(err) throw err;
    console.log('Device data Created!');
    var id = deviceData._id;

    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end(String(id));
  });
});

router.route('/:thingId/')
.get(function(req, res, next) {
  DeviceData.find({ thingId: req.params.thingId}, function(err, deviceData){
    if(err) throw err;  
    res.json(deviceData);
  }); 
});

router.route('/addcountdogeat/:deviceDataId/')
.put(function(req, res, next) {
  DeviceData.findById(req.params.deviceDataId, function(err, deviceData){
    if(err) throw err;  
    var currentCount = parseInt(deviceData.petHasAteCount);
    deviceData.petHasAteCount = currentCount + 1;
    
    deviceData.save(function(err, deviceData){
      if(err) throw err;  
      console.log('Updated Device!');
      res.json(deviceData);
    });
  });

  //TODO: Do a requisition to the thing, to know how many of food are still there.
  var remainingFoodOnCanister = 300;
});

module.exports = router;
