'use strict'
function PortfolioAPI(){
	var API = {};
	API.Get = function(gameid) {
		return axios.get('/api/portfolio/' + gameid).then(function(res){
			return res.data;
		}).catch(function(err){
			return err;
		});
	};

	return API;
}