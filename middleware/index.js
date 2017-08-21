module.exports = (app, express) => {

  const path = require('path'),
        logger = require('morgan'),
        favicon = require('serve-favicon'),
        expressValidator = require('express-validator'),
        cookieParser = require('cookie-parser'),
        session = require('express-session'),
        bodyParser = require('body-parser'),
        flash = require("connect-flash"),

        config = require('../config'),
        mongoose = require('../core/db'),
        // Подключим и настроим стратегию авторизации. 
        passport = require('passport'),

        MongoStore = require('connect-mongo')(session);

  const index = require('../routes/index');
  const admin = require('../routes/admin');
  
  // Page Rendering
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'pug');

  // Favicon
  app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));

  // Logger
  if (app.get('env') == 'development') {
    app.use(logger('dev'));
  }

  // Session
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(expressValidator());

  app.use(flash());

  app.use(cookieParser());

  app.use(session({
          secret: config.get('session:secret'),
          key: config.get('session:key'),
          cookie: config.get('session:cookie'),
          resave: false,
          saveUninitialized: false,
          // Место хранения можно выбрать из множества вариантов, это и БД и файлы и Memcached.
          store: new MongoStore({ 
            url: config.get('db:connection') + '/' + config.get('db:name'),
          })
  }));

  // Passport:
  app.use(passport.initialize());
  app.use(passport.session());
  
  require('../core/auth')(passport);
  
  // Public directory
  app.use(express.static(path.join(__dirname, '../public')));

  // Routing

  app.use('/', index);
  app.use('/admin', admin);

  // Error handing
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

};
