var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();

var Things = require('../models/thing');

 router.use(bodyParser.json());

router.route('/')
.get(function(req, res, next) {
  Things.find({}, function(err, thing){
    if(err) throw err;  
    res.json(thing);
  }); 
})

.post(function (req, res, next){
  Things.create(req.body, function(err, thing){
    if(err) throw err;
    console.log('Thing Created!');
    var id = thing._id;

    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('Added thing with id: ' + id);
  });
})

module.exports = router;
