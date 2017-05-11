'use strict'
function UserAPI(){
	var API = {};
	API.GetToken = function() {
		return axios.get('/api/xignite/token').then(function(res){
			return res.data;
		}).catch(function(err){
			console.log(err);
			return '';
		});
	};
	API.GetXigniteUserId = function() {
		return axios.get('/api/xignite/userid').then(function(res){
			return res.data;
		}).catch(function(err){
			console.log(err);
			return '';
		});
	};
	return API;
}