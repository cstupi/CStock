var connection = require('../DatabaseConnection');
xignitealert = {};
xignitealert.AddAlert = function(AlertIdentifier, orderid, callback, faillure){
	connection.query('INSERT INTO XigniteAlerts (XigniteId, OrderId) VALUES (?,?)',[AlertIdentifier, orderid],function(error){
		if(error){
			if(failure)
				failure();
			throw error;
		}
		callback();
	});
}
xignitealert.GetAlert = function(AlertIdentifier, callback, failure){
		connection.query('SELECT XigniteId, OrderId FROM XigniteAlerts WHERE XigniteId = ?',[AlertIdentifier],function(error, results, fields){
		if(error){
			if(failure)
				failure();
			throw error;
		}
		callback(results);
	});
}
module.exports = xignitealert;