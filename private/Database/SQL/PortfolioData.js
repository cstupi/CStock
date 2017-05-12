var connection = require('../DatabaseConnection');

var portfoliodata = {};
portfoliodata.AddToPortfolio = function(userid, asset, count, gameid, costbasis, callback, failure){
	connection.query('INSERT INTO Portfolio (UserId, Asset,Count, GameId, costbasis) VALUES (?,?,?,?,?)', [userid,asset,count, gameid, costbasis], function(error,result){
		if(error)
			if(failure)
				failure(error)
			else
				throw error;
		else 
			callback();
	});
};
portfoliodata.DeleteFromPortfolio = function(portfolioId, callback, failure) {
	connection.query('DELETE FROM Portfolio WHERE PortfolioId = ?', portfolioId, function(error){
		if(error)
			if(failure)
				failure(error)
			else
				throw error;
		else 
			callback();
	});
};
portfoliodata.GetPortfolioForGame = function(userid,gameid, callback,failure){
	connection.query('SELECT PortfolioId, Asset, Count, CostBasis FROM Portfolio WHERE UserId = ? AND gameid = ?', [userid,gameid], function (error, results, fields){
		if(error)
			if(failure)
				failure(error)
			else
				throw error;
		callback(results);
	});
};
portfoliodata.GetAllPortfoliosForUser = function(userid, callback,failure){
	connection.query('SELECT PortfolioId, Asset, Count, CostBasis FROM Portfolio WHERE UserId = ?', [userid], function (error, results, fields){
		if(error)
			if(failure)
				failure(error)
			else
				throw error;
		callback(results);
	});
};
portfoliodata.UpdatePortfolio = function(userid, portfolioid, count, costbasis,callback,failure){
	connection.query('UPDATE Portfolio SET COUNT = ?, CostBasis = ? WHERE portfolioid = ? AND userid = ?',[count,costbasis,portfolioid,userid],
		function(error,res){
			if(error)
				if(failure)
					failure(error)
				else
					throw error;
			if(res){
				if(callback)
					callback();
			} else {
				if(failure)
					failure("Failed to update portfolio");
			}
		});
};
portfoliodata.GetAssetFromPortfolio = function(userid, gameid, asset, callback, failure){
	connection.query('SELECT PortfolioId, Asset, Count, CostBasis FROM Portfolio WHERE UserId = ? AND Asset = ?', [userid, asset], function (error, results, fields){
		if(error)
			if(failure)
				failure()
			else
				throw error;
		callback(results);
	});
}
module.exports = portfoliodata;