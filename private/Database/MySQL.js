	
var config	= require('../../private.config')
var mysql   = require('mysql');
var User 	= require('../User/User')
var MySQL = {};
var connection = mysql.createConnection({
  host     : config.DBHost,
  user     : config.DBUser,
  password : config.DBPass,
  port     : config.DBPort,
  database : config.DBName
});
MySQL.Test = function(){

	connection.query('SELECT * FROM CStock.MarketStatus WHERE Status = ?',['PENDING'], function (error, results, fields) {
	  if (error) throw error;
	  console.log('The solution is: ', results[0].Status);
	});
	
}

MySQL.GetUser = function(username, callback){

	var user;
	connection.query('SELECT UserId, Username,Password, Locked, JoinDate, ConfirmKey, ConfirmDate FROM CStock.User WHERE Locked = ? AND username = ?',['false', username], function (error, results, fields) {
	  user = new User(results[0].UserId, results[0].Username, results[0].Password, results[0].Locked,
	  	results[0].JoinDate, results[0].ConfirmKey, results[0].ConfirmDate);

	  callback(error, user);

	});
	
}
MySQL.GetUserById = function(userid, callback){

	var user;
	connection.query('SELECT UserId, Username,Password, Locked, JoinDate, ConfirmKey, ConfirmDate FROM CStock.User WHERE Locked = ? AND UserId = ?',['false', userid], function (error, results, fields) {
	  user = new User(results[0].UserId, results[0].Username, results[0].Password, results[0].Locked,
	  	results[0].JoinDate, results[0].ConfirmKey, results[0].ConfirmDate);

	  callback(error, user);
	});
}
MySQL.CreateUser = function(username, password){
	connection.connect();

	connection.query('INSERT INTO User SET ?', { Username: username, Password: password, JoinDate: new Date() }, function(error, results,fields){
		if (error) throw error;
		console.log("User Added: " + username);
		connection.end();
	});
}

module.exports = MySQL;