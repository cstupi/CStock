	
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

	connection.connect();
	connection.query('SELECT * FROM CStock.MarketStatus WHERE Status = ?',['PENDING'], function (error, results, fields) {
	  if (error) throw error;
	  console.log('The solution is: ', results[0].Status);
	});
	connection.end();
}

MySQL.GetUser = function(username){
		connection.connect();
	connection.query('SELECT UserId, Username, Password, Locked, JoinDate, ConfirmKey, ConfirmDate FROM CStock.User WHERE Locked = ?',['false'], function (error, results, fields) {
	  var user = new User(results);
	  if (error) throw error;
	  console.log(user);
	  console.log('Got User: ', results[0].Username);
	});
	connection.end();
}
MySQL.CreateUser = function(username, password){
	connection.connect();

	connection.query('INSERT INTO User SET ?', { Username: username, Password: password, JoinDate: new Date() }, function(error, results,fields){
		if (error) throw error;
		console.log("User Added: " + username);
	});
	connection.end();
}

module.exports = MySQL;