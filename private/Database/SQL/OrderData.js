var connection = require('../DatabaseConnection');

var order = {};
order.GetAllPendingMarketOrders = function(callback, failure){
	connection.query('SELECT o.OrderId, o.UserId, t.TransactionType, ot.OrderType, m.Status, o.ExpirationDate, o.ExecutionDate, o.CreationDate, o.Asset, o.Count, o.Price, o.GameId' +
		' FROM `Order` as o JOIN Status m ON m.StatusId = o.Status JOIN TransactionType t ON o.TransactionType = t.TransactionTypeId' + 
		' JOIN OrderType ot ON ot.OrderTypeId = o.OrderType WHERE m.StatusId = ? AND o.OrderType = ?',[1,1],function(error, results, fields){
			if(error){
				if(failure)
					failure();
				throw error;
			}
			callback(results);
	});
}
order.GetOrder = function(orderid, callback, failure){
	connection.query('SELECT o.OrderId, o.UserId, t.TransactionType, ot.OrderType, m.Status, o.ExpirationDate, o.ExecutionDate, o.CreationDate, o.Asset, o.Count, o.Price, o.GameId' +
		' FROM `Order` as o JOIN Status m ON m.StatusId = o.Status JOIN TransactionType t ON o.TransactionType = t.TransactionTypeId' + 
		' JOIN OrderType ot ON ot.OrderTypeId = o.OrderType WHERE o.OrderId = ?',[orderid],function(error, results, fields){
			if(error){
				if(failure)
					failure();
				throw error;
			}
			callback(results);
	});
}

order.GetAllOrdersForGame = function(gameid, callback, failure){
	connection.query('SELECT o.OrderId, t.TransactionType, ot.OrderType, m.Status, o.ExpirationDate, o.ExecutionDate, o.CreationDate, o.Asset, o.Count, o.Price, o.GameId' +
		' FROM `Order` as o JOIN Status m ON m.StatusId = o.Status JOIN TransactionType t ON o.TransactionType = t.TransactionTypeId' + 
		' JOIN OrderType ot ON ot.OrderTypeId = o.OrderType' +
		' JOIN MarketStatus m.MarketStatusId = o.Status WHERE o.gameid = ?', gameid, function(error, results, fields){
			if(error){
				if(failure)
					failure();
				throw error;
			}
			callback(results);
	});
}
order.GetAllOrdersForUser = function(userid, callback, failure){
	connection.query('SELECT o.OrderId, t.TransactionType, ot.OrderType, m.Status, o.ExpirationDate, o.ExecutionDate, o.CreationDate, o.Asset, o.Count, o.Price, o.GameId' +
		' FROM `Order` as o JOIN Status m ON m.StatusId = o.Status JOIN TransactionType t ON o.TransactionType = t.TransactionTypeId' + 
		' JOIN OrderType ot ON ot.OrderTypeId = o.OrderType' +
		' JOIN MarketStatus m.MarketStatusId = o.Status WHERE o.userid = ?', userid, function(error, results, fields){
			if(error){
				if(failure)
					failure();
				throw error;
			}
			callback(results);
	});
}
order.GetAllOrdersForUserGame = function(userid,gameid, callback, failure){
	connection.query('SELECT o.OrderId, t.TransactionType, ot.OrderType, m.Status, o.ExpirationDate, o.ExecutionDate, o.CreationDate, o.Asset, o.Count, o.Price, o.GameId' +
		' FROM `Order` as o JOIN Status m ON m.StatusId = o.Status JOIN TransactionType t ON o.TransactionType = t.TransactionTypeId' + 
		' JOIN OrderType ot ON ot.OrderTypeId = o.OrderType' +
		' JOIN MarketStatus m.MarketStatusId = o.Status WHERE o.userid = ? AND o.gameid = ?', [userid,gameid], function(error, results, fields){
			if(error){
				if(failure)
					failure();
				throw error;
			}
			callback(results);
	});
}

order.UpdateStatus = function(orderid,userid,status, ExecutionDate,  callback, failure){
	connection.query('Update `Order` SET Status = ?, ExecutionDate = ? WHERE orderid = ? AND userid = ?',[status,ExecutionDate ,orderid, userid],function(error){
		if(error){
			if(failure)
				failure();
			throw error;
		}
		callback();
	});
}

order.AddOrder = function(transactiontype, ordertype, status, expirationdate, executiondate, creationdate, asset, count, price, gameid, userid, callback, failure){
	connection.query('INSERT INTO `Order` (TransactionType, OrderType, Status, ExpirationDate, ExecutionDate, CreationDate, Asset, Count, Price, GameId, UserId) VALUES (?,?,?,?,?,?,?,?,?,?,?); ' +
		'SELECT LAST_INSERT_ID();',
		[transactiontype, ordertype, status, expirationdate, executiondate, creationdate, asset, count, price, gameid, userid],function(error, results, fields){
			if(error){
				if(failure)
					failure();
				throw error;
			}
			callback(results);
	});
};
module.exports = order;