'use strict'
function GameAPI(){
	var API = {};
	API.GetAll = function() {
		return axios.get('/api/game/all').then(function(res){
			return res.data;
		}).catch(function(err){
			return err;
		});
	};
	API.GetAllForUser = function() {
		return axios.get('/api/game/GamesForUser').then(function(res){
			return res.data;
		}).catch(function(err){
			return err;
		});
	};
	API.JoinGame = function(gameid, password){
		return axios.put('/api/game/join/'+ gameid, { gamepassword: password }).then(function(res){
			return res.data;
		}).catch(function(err){
			return err;
		});
	}
	return API;
}