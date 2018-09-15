var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var thingRouter = require('./routes/thing');
var petRouter = require('./routes/pet');
var deviceDataRouter = require('./routes/device-data');

var url = 'mongodb://localhost:27017/db_smart-feeding';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function(){
  console.log('Connected correctly to server');
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/thing', thingRouter);
app.use('/pet', petRouter);
app.use('/device-data', deviceDataRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// routine

var KNoTCloud = require('knot-cloud');
let cloud = new KNoTCloud(
  '192.168.0.102',
  3000,
  'c9e57ca2-1a7d-4321-9d33-83156dc80000',
  '82b3253a5bc61df911ed081885c2f4d82fd84662',
);
var deviceID = require("./utils/knot-cloud")
var DeviceData = require('./models/device-data');

async function petRoutine() {
  try {
    await cloud.connect()
    await cloud.subscribe(deviceID.toLowerCase())

    var lastDogAteUpdate = false

    cloud.on((data) => {
      let result = data.data

      if (result.sensor_id == 3) {
        if (result.value == false && lastDogAteUpdate == true) {
          console.log("testing the foca")
          DeviceData.find({}, function(err, deviceData) {
            if(err) throw err;
  
            if (deviceData.length == 0) {
              DeviceData.create({petHasAteCount : 0})
              console.log("created for the first time")
            } else {
              let foundEntry = deviceData[0]
              var currentCount = parseInt(foundEntry.petHasAteCount);
        
              foundEntry.petHasAteCount = currentCount + 1;
              console.log(`found entry count: ${foundEntry.petHasAteCount}`)
              foundEntry.save(function(err, foundEntry){
                if(err) throw err;  
                console.log('Updated Device!');
              });  
            }
          });  
        }

        lastDogAteUpdate = result.value
      }

      if (result.sensor_id == 5) {
        
      }
    })
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

petRoutine()

module.exports = app;
