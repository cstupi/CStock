'use strict'
function UserAPI(){
	var API = {};
	API.GetToken = function() {
		return axios.get('/api/token').then(function(res){
			return res.data;
		}).catch(function(err){
			console.log(err);
			return '';
		});
	};
	API.GetUserId = function() {
		return axios.get('/api/user').then(function(res){
			return res.data;
		}).catch(function(err){
			console.log(err);
			return '';
		});
	};
	return API;
}