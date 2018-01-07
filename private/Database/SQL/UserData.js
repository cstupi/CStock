var User 	= require('../../User/User');
var connection = require('../DatabaseConnection');

var userdata = {};
userdata.GetUser = function(username, callback){

	var user;
	connection.query('SELECT UserId, Username,Password, Locked, JoinDate, ConfirmKey, ConfirmDate FROM CStock.User WHERE Locked = ? AND username = ?',['false', username], function (error, results, fields) {
	  if(!results || results.length == 0)
	  	return callback(error, null);
	  user = new User(results[0].UserId, results[0].Username, results[0].Password, results[0].Locked,
	  	results[0].JoinDate, results[0].ConfirmKey, results[0].ConfirmDate);

	  callback(error, user);

	});
	
};
userdata.GetUserById = function(user, callback){
	connection.query('SELECT UserId, Username,Password, Locked, JoinDate, ConfirmKey, ConfirmDate FROM CStock.User WHERE Locked = ? AND UserId = ?',['false', user.userid], function (error, results, fields) {
	  if(!results)
	  	return callback(error, null);
	  return callback(error, new User(results[0].UserId, results[0].Username, results[0].Password, results[0].Locked,
	  	results[0].JoinDate, results[0].ConfirmKey, results[0].ConfirmDate));
	});
};
userdata.CreateUser = function(username, password){
	connection.query('INSERT INTO User SET ?', { Username: username, Password: password, JoinDate: new Date() }, function(error, results,fields){
		if (error) throw error;
	});
};
module.exports = userdata;