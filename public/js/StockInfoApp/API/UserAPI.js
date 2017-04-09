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
	API.GetXigniteUserId = function() {
		return axios.get('/api/xignite').then(function(res){
			return res.data;
		}).catch(function(err){
			console.log(err);
			return '';
		});
	};
	return API;
}