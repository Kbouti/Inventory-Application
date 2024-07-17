var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


const dotenv = require("dotenv").config();


var app = express();



// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mode = process.env.MODE;
console.log(`mode is ${mode}`);


const mongoDB = "mongodb+srv://kevinfboutilier:bKI3lS10W9aFwvRc@locallibrary.o1xynnt.mongodb.net/inventoryApplication?retryWrites=true&w=majority&appName=localLibrary";
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log(`main function has run, should be connected to mongodb`)
}





// ******************************************************************************************************************************************************
// We have created some models for objects we want in our inventory application.
// Our current error is likely due to the incorrect connection string, or URI, provided to connect to mongoose. 

// In order to connect to our database and start storing documents we first need to do two things:
// -Get our updated connection string
// -Name the database and collections in which we will store this data in mongo
// -Install any modules required to use a .env file
// -store our connection string in .env and access it in the project

// ******************************************************************************************************************************************************








// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;




// Un-altered connection string from mongodb: 
// mongodb+srv://kevinfboutilier:<password>@locallibrary.o1xynnt.mongodb.net/?retryWrites=true&w=majority&appName=localLibrary

// Production connection string:
// mongodb+srv://kevinfboutilier:bKI3lS10W9aFwvRc@locallibrary.o1xynnt.mongodb.net/inventoryApplication?retryWrites=true&w=majority&appName=localLibrary

// Pa$$W: bKI3lS10W9aFwvRc
