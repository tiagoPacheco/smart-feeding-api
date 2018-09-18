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
var foodRouter = require('./routes/food');

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
app.use('/food', foodRouter)

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
  'knot-test.cesar.org.br',
  3000,
  '31a2e44e-b9cb-445a-a894-4bb0faad0000',
  '86651ee2fb69801ae7c246c3c7b32a6f9e962b24',
);
var deviceID = require("./utils/knot-cloud")
var DeviceData = require('./models/device-data')
var Food = require('./models/food')
let maxFood = 20

async function petRoutine() {
  function checkPetAte() {
    DeviceData.find({}, function(err, deviceData) {
      if(err) throw err;

      if (deviceData.length == 0) {
        DeviceData.create({petHasAteCount : 0})
      } else {
        let foundEntry = deviceData[0]
        var currentCount = parseInt(foundEntry.petHasAteCount);
  
        foundEntry.petHasAteCount = currentCount + 1;
        console.log(`found entry count: ${foundEntry.petHasAteCount}`)
        foundEntry.save(function(err, foundEntry){
          if(err) throw err;  
        });  
      }
    });
  }

  function checkRemainingMeals(value) {
    Food.find({}, function(error, result) {
      if(error) throw error;

      if (result.length == 0) {
        // this is empty
        Food.create({amountOfFood : maxFood})
      } else {
        let foundEntry = result[0]
        foundEntry.amountOfFood = value
        
        foundEntry.save(function(err, foundEntry){
          if(err) throw err;  
        });
      }
    })
  }

  try {
    await cloud.connect()
    await cloud.subscribe(deviceID.toLowerCase())

    var lastDogAteUpdate = false

    cloud.on((data) => {
      let result = data.data

      if (result.sensor_id == 3) {
        if (result.value == false && lastDogAteUpdate == true) {
          checkPetAte()
        }

        lastDogAteUpdate = result.value
      }

      if (result.sensor_id == 5) {
        checkRemainingMeals(result.value)
      }
    })
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

petRoutine()

module.exports = app;
