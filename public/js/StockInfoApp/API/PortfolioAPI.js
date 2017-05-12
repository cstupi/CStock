'use strict'
function PortfolioAPI(){
	var API = {};
	API.Get = function() {
		return axios.get('/api/portfolio').then(function(res){
			return res.data;
		}).catch(function(err){
			return err;
		});
	};

	return API;
}