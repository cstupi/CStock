var connection = require('../DatabaseConnection');

var transaction = {};

transaction.GetAllTransactionsForGame = function(gameid, callback, failure){
	connection.query('SELECT TransactionId, tran.UserId, t.TransactionType, Count, Price, Date, m.Status, Order' +
		' FROM Transaction tran JOIN TransactionType t ON tran.TransactionType = t.TransactionTypeId' +
		' JOIN MarketStatus m.MarketStatusId = tran.Status WHERE tran.gameid = ?', gameid, function(error, results, fields){
			if(error){
				if(failure)
					failure();
				throw error;
			}
			callback(results);
	});
}
transaction.GetTransactionsForOrder = function(orderid, callback, failure){
		connection.query('SELECT TransactionId, tran.UserId, t.TransactionType,  Count, Price, Date, m.Status, Order' +
		' FROM Transaction tran JOIN TransactionType t ON tran.TransactionType = t.TransactionTypeId' +
		' JOIN MarketStatus m.MarketStatusId = tran.Status WHERE tran.orderid = ?', orderid, function(error, results, fields){
			if(error){
				if(failure)
					failure();
				throw error;
			}
			callback(results);
	});
}
transaction.GetAllTransactionsForUser = function(userid, callback, failure){
	connection.query('SELECT TransactionId, tran.UserId, t.TransactionType, Count, Price, Date, m.Status, Order' +
		' FROM Transaction tran JOIN TransactionType t ON tran.TransactionType = t.TransactionTypeId' +
		' JOIN MarketStatus m.MarketStatusId = tran.Status WHERE tran.userid = ?', userid, function(error, results, fields){
			if(error){
				if(failure)
					failure();
				throw error;
			}
			callback(results);
	});
}
transaction.GetAllTransactionsForUserGame = function(userid, gameid, callback, failure){
	connection.query('SELECT TransactionId, UserId, t.TransactionType, Count, Price, Date, m.Status, Order' +
		' FROM Transaction tran JOIN TransactionType t ON tran.TransactionType = t.TransactionTypeId' +
		' JOIN MarketStatus m.MarketStatusId = tran.Status WHERE tran.userid = ? AND tran.gameid = ?', [userid, gameid], function(error, results, fields){
			if(error){
				if(failure)
					failure(error);
				throw error;
			}
			callback(results);
	});
}


transaction.AddTransaction = function(userid, type, count,price,date, status,order, gameid, callback, failure){
	connection.query('INSERT INTO Transaction (userid, transactiontype,count,price, date,status,`order`,gameid)'+
		' VALUES (?,?,?,?,?,?,?,?)', [userid,type,count,price,date,status,order,gameid], function(error){
		if(error){
			if(failure)
				failure(error);
			throw error;
		}
		callback();
	});
}

module.exports = transaction;

