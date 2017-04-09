var connection = require('../DatabaseConnection');

var watchlist = {};
watchlist.AddToWatchList = function(userid, asset){
	connection.query('INSERT INTO Watchlist (UserId, Asset) VALUES (?,?)', [userid,asset], function(error,result){
		if(error) throw error;
	})
};
watchlist.DeleteFromWatchList = function(watchlistid) {
	connection.query('DELETE FROM Watchlist WHERE watchlistid = ?', watchlistid, function(error){
		if(error) throw error;
	});
};
watchlist.GetWatchList = function(userid, callback,failure){
	connection.query('SELECT WatchlistId, Asset FROM Watchlist WHERE UserId = ?', userid, function (error, results, fields){
		if(error) {
			if(failure)
				failure();
			throw error;
		}
		callback(results);
	});
};
watchlist.UpdateWatchlist = function(userid, watchlistId, asset,callback,failure){
	connection.query('UPDATE Watchlist SET asset = ? WHERE watchlistid = ? AND userid = ?',[asset,watchlistid,userid],
		function(error,res){
			if(error) {
				if(failure) failure();
				throw error;
			}
			if(res.affectedRows > 0){
				if(callback)
					callback();
			} else {
				if(failure)
					failure();
			}
		});
};
module.exports = watchlist;