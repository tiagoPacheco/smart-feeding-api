var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();

var Stock = require('../models/stock');

 router.use(bodyParser.json());

router.route('/')
.get(function(req, res, next) {
  Stock.find({}, function(err, stock){
    if(err) throw err;  
    res.json(stock);
  }); 
})

.post(function (req, res, next){
  Stock.create(req.body, function(err, stock){
    if(err) throw err;
    console.log('Stock data Created!');
    var id = stock._id;

    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end(String(id));
  });
});

router.route('/:userId/')
.get(function(req, res, next) {
  Stock.find({ userId: req.params.userId}, function(err, stock){
    if(err) throw err;  
    res.json(stock);
  }); 
});

router.route('/stock/:stockId/')
.put(function(req, res, next) {
  Stock.findByIdAndUpdate(req.params.stockId, { $set: req.body }, { new: true }, function(err, stock){
    if(err) throw err;  
    res.json(stock);
  }); 
});
;

module.exports = router;
