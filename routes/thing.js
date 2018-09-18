var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();

var KNoTCloud = require('knot-cloud');
let cloud = new KNoTCloud(
  '192.168.0.102',
  3000,
  'c9e57ca2-1a7d-4321-9d33-83156dc80000',
  '82b3253a5bc61df911ed081885c2f4d82fd84662',
);

var Thing = require('../models/thing');

router.use(bodyParser.json());

router.route('/')
  .get(function (req, res, next) {
    Thing.find({}, function (err, thing) {
      if (err) throw err;
      res.json(thing);
    });
  })

  .post(function (req, res, next) {
    Thing.create(req.body, function (err, thing) {
      if (err) throw err;
      console.log('Thing Created!');
      var id = thing._id;

      res.json({ id: id });
    });
  });

router.route('/feed_pet')
  .post(function (req, res, next) {

    async function test() {
      try {
        await cloud.connect()
        await cloud.setData("713B679E104024A6", [{ sensorId: 1, value: 500 }])
      } catch (err) {
        console.error(`Error: ${err}`);
      }

      await cloud.close();
    }

    test()
    res.json({})
  });

router.route('/:userId/')
  .get(function (req, res, next) {
    Thing.find({ userId: req.params.userId }, function (err, thing) {
      if (err) throw err;
      res.json(thing);
    });
  });

router.route('/update/:thingId/')
  .put(function (req, res, next) {
    Thing.findByIdAndUpdate(req.params.thingId, { $set: req.body }, { new: true }, function (err, thing) {
      if (err) throw err;
      res.json(thing);
    });
  });
;

module.exports = router;
