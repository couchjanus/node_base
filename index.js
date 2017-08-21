const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const index = require('./routes/index');
const admin = require('./routes/admin');

const app = express();

// view engine setup
// views корневая директория представлений. По умолчанию текущая_папка/views

app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser());


// Use native Node promises
mongoose.Promise = global.Promise;

// connect to MongoDB

const configDB = require('./config/db');

mongoose.connect(configDB.url)
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


// view engine - шаблонизатор по умолчанию для представлений, вызываемых без расширения файла.
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
