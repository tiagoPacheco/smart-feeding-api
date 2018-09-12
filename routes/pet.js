var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();

var Pet = require('../models/pet');

 router.use(bodyParser.json());

router.route('/')
.get(function(req, res, next) {
  Pet.find({}, function(err, pet){
    if(err) throw err;
    res.json(pet);
  }); 
})

.post(function (req, res, next){
  Pet.create(req.body, function(err, pet){
    if(err) throw err;
    console.log('Pet Created!');
    var id = pet._id;

    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end(String(id));
  });
});

router.route('/:userId/')
.get(function(req, res, next) {
  Pet.find({ userId: req.params.userId}, function(err, pet){
    if(err) throw err;  
    res.json(pet);
  }); 
});

router.route('/pet/:petId/')
.put(function(req, res, next) {
  Pet.findByIdAndUpdate(req.params.petId, { $set: req.body }, { new: true }, function(err, pet){
    if(err) throw err;  
    res.json(pet);
  }); 
});
;

module.exports = router;
