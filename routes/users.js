var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();

var User = require('../models/user');

 router.use(bodyParser.json());

router.route('/')
.get(function(req, res, next) {
  User.find({}, function(err, user){
    if(err) throw err;  
    res.json(user);
  }); 
})

.post(function (req, res, next){
  User.create(req.body, function(err, user){
    if(err) throw err;
    console.log('User Created!');
    var id = user._id;

    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end(String(id));
  });
});

router.route('/:userId/')
.get(function(req, res, next) {
  User.findById(req.params.userId, function(err, user){
    if(err) throw err;  
    res.json(user);
  }); 
})

.put(function(req, res, next) {
  User.findByIdAndUpdate(req.params.userId, { $set: req.body }, { new: true }, function(err, user){
    if(err) throw err;  
    res.json(user);
  }); 
});

router.route('/:userId/thing')
.get(function(req, res, next) {
  User.findById(req.params.userId, function(err, user){
    if(err) throw err;  
    res.json(user.thing);
  }); 
})

.post(function(req, res, next) {
  User.findById(req.params.userId, function(err, user){
    if(err) throw err;  
    user.thing.push(req.body);

    user.save(function(err, user){
      if (err) throw err;
      res.json(user);
    });
  }); 
});

router.route('/:userId/pet')
.get(function(req, res, next) {
  User.findById(req.params.userId, function(err, user){
    if(err) throw err;  
    res.json(user.pet);
  }); 
})

.post(function(req, res, next) {
  User.findById(req.params.userId, function(err, user){
    if(err) throw err;  
    user.pet.push(req.body);

    user.save(function(err, user){
      if (err) throw err;
      res.json(user);
    });
  }); 
});

module.exports = router;
