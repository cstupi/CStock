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
	API.LoginUser = function(username, password){
		return axios.post('/api/user/login', { username :username, password: password}).then(function(res){
			return res.data;
		}).catch(function(err){
			console.log(err);
			return '';
		});
	}
	API.RegisterUser = function(username, password){
		return axios.post('/api/user/register', { username :username, password: password}).then(function(res){
			return res.data;
		}).catch(function(err){
			console.log(err);
			return '';
		});
	}
	return API;
}