'use strict';
var express     = require('express');
var path        = require('path');
var favicon     = require('serve-favicon');
var logger      = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser  = require('body-parser');
var helmet      = require('helmet');
var session     = require('express-session');
var MySQLStore  = require('express-mysql-session')(session);
var passport    = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt      = require('bcrypt');
var UserData    = require('./private/Database/SQL/UserData');

var Market      =  require('./private/Market/Market');

var webport = 3001;

const allowed_origins = [
'localhost:8080',
'localhost:3001',
'localhost:3000'
];

passport.use(new LocalStrategy(
  function(username, password, done) {
    UserData.GetUser(username, function (err, user) {
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
});

passport.deserializeUser(function(id, done) {
  UserData.GetUserById(id, function(err, user) {
    done(err, user);
  });
});


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
app.use(function(req, res, next) {
  let origin = allowed_origins.indexOf(req.header('host').toLowerCase()) != -1 ? req.headers.origin : '-';
  res.header("Access-Control-Allow-Origin", origin);
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header("Access-Control-Allow-Credentials", true);
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(helmet());
//app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', express.static(__dirname + '/views'));


app.use('/api/user', require('./routes/api/user'));
app.use('/api/portfolio', require('./routes/api/portfolio'));
app.use('/api/xignite', require('./routes/api/xignite'));
app.use('/api/orders', require('./routes/api/orders'));
app.use('/api/transactions',require('./routes/api/transactions'));
app.use('/api/game',require('./routes/api/game'));
app.use('/api/market', require('./routes/api/market'));
app.use('/api/watchlist', require('./routes/api/watchlist'));

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
    res.redirect('/error');
});


module.exports = app;
Market.Start();
app.listen(webport, function () {
  console.log(`Example app listening on port ${webport}!`);
  console.log(new Date());
});