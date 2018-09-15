var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();

var User = require('../models/user');

router.use(bodyParser.json());

router.route('/')
  .get(function (req, res, next) {
    User.find({}, function (err, user) {
      if (err) throw err;
      res.json(user);
    });
  })

  .post(function (req, res, next) {
    User.create(req.body, function (err, user) {
      if (err) throw err;
      console.log('User Created!');
      
      res.json({id: user._id });
    });
  });

router.route('/get/:name')
  .get(function (req, res, next) {
    User.find({ name: req.params.name }, function (err, user) {
      if (err) throw err;

      if (user.length > 0) {
        res.json({ id: user[0]._id, password: user[0].password });
      }
      else {
        res.json({});
      }
    });
  });

router.route('/:userId/')
  .get(function (req, res, next) {
    User.findById(req.params.userId, function (err, user) {
      if (err) throw err;
      res.json(user);
    });
  })

  .put(function (req, res, next) {
    User.findByIdAndUpdate(req.params.userId, { $set: req.body }, { new: true }, function (err, user) {
      if (err) throw err;
      res.json(user);
    });
  });

module.exports = router;
