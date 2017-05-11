'use strict';
var config	= require('../../private.config');
var mysql   = require('mysql');
var MySQL = {};
var connection = mysql.createConnection({
  host     : config.DBHost,
  user     : config.DBUser,
  password : config.DBPass,
  port     : config.DBPort,
  database : config.DBName
});

module.exports = connection;