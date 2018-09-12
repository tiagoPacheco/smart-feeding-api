var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();

var Thing = require('../models/thing');

 router.use(bodyParser.json());

router.route('/')
.get(function(req, res, next) {
  Thing.find({}, function(err, thing){
    if(err) throw err;  
    res.json(thing);
  }); 
})

.post(function (req, res, next){
  Thing.create(req.body, function(err, thing){
    if(err) throw err;
    console.log('Thing Created!');
    var id = thing._id;

    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end(String(id));
  });
});

router.route('/:userId/')
.get(function(req, res, next) {
  Thing.find({ userId: req.params.userId}, function(err, thing){
    if(err) throw err;  
    res.json(thing);
  }); 
});

router.route('/thing/:thingId/')
.put(function(req, res, next) {
  Thing.findByIdAndUpdate(req.params.thingId, { $set: req.body }, { new: true }, function(err, thing){
    if(err) throw err;  
    res.json(thing);
  }); 
});
;

module.exports = router;
