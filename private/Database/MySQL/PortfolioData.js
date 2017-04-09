var connection	= require('../MySQL');

var portfoliodata = {};
portfoliodata.AddToPortfolio = function(userid, asset, count){
	connection.query('INSERT INTO Portfolio (UserId, Asset,Count) VALUES (?,?,?)', [userid,asset,count], function(error,result){
		if(error) throw error;
	})
};
portfoliodata.DeleteFromPortfolio = function(portfolioId) {
	connection.query('DELETE FROM Portfolio WHERE PortfolioId = ?', portfolioId, function(error){
		if(error) throw error;
	});
};
portfoliodata.GetPortfolio = function(userid, callback,failure){
	connection.query('SELECT PortfolioId, Asset, Count FROM Portfolio WHERE UserId = ?', userid, function (error, results, fields){
		if(error) {
			if(failure)
				failure();
			throw error;
		}
		callback(results);
	});
};
portfoliodata.UpdatePortfolio = function(userid, portfolioid, asset, count,callback,failure){
	connection.query('UPDATE Portfolio SET asset = ?, COUNT = ? WHERE portfolioid = ? AND userid = ?',[asset,count,portfolioid,userid],
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
module.exports = portfoliodata;