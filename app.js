'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('./private/Database/MySQL');
var bcrypt      = require('bcrypt');
var User = require('./private/User/User')

passport.use(new LocalStrategy(
  function(username, password, done) {
    mysql.GetUser(username, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!bcrypt.compareSync(password, user.Password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, {userid: user.UserId,username: user.Username});
    // if you use Model.id as your idAttribute maybe you'd want
    // done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  new User().GetUserById(id, function(err, user) {
    done(err, user);
  }, mysql);
});



var users = require('./routes/users');
var tokenapi = require('./routes/api/token');
var userapi = require('./routes/api/user');
var config = require('./private.config.js')
var app = express();
var options = {
      host     : config.DBHost,
      user     : config.DBUser,
      password : config.DBPass,
      port     : config.DBPort,
      database : config.DBName
};
 
var sessionStore = new MySQLStore(options);
 
app.use(session({
    key: 'CStockSesh',
    secret: 's3cr3t4g3ntM4n!',
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(__dirname + '/views'));

app.use('/users', users);
app.use('/api/token', tokenapi);
app.use('/api/user', userapi);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        console.log(err.message);
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})