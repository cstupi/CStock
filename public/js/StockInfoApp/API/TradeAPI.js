'use strict'
function TradeAPI(){
	var api = {};
	
	api.PlaceTrade = function(gameid, symbol, quantity, price, orderType, transactionType) {
		var url = "/api/market/";
		if(orderType == 1)
			url += "marketorder";
		else if(orderType == 2)
			url += "limitorder";
		else if(orderType == 3)
			url += "stoporder"; //not yet supported...

		return axios.put(url, { gameid: gameid, symbol: symbol, count: quantity, transactiontype: transactionType }).then(function(res){
			return res.data;
		}).catch(function(err){
			return err;
		});
	};

	return api;
}