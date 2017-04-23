'use strict';
var express = require('express');
var router = express.Router();

var config = require('../private.config')

var GameData 	= require('../../private/Database/SQL/GameData');
function error(error){
	console.log(error);
	res.status(500).send();
}
router.get('/Members/:gameid/', function (req, res) {
	if(req.params.gameid == null || typeof(req.params.gameid) !== "number")
		res.status(400).send();
	Game.GetMembersForGame(gameid, function(results){
		res.send(results);
	}, error);
});

router.get('/All', function(req,res){
	Game.GetAllGames(function(results){
		res.send(results);
	}, error);
});

router.post('/Create', function(req,res){
	if(req.body.gamename == null){
		res.status(400).send();
	} else if req.session.passport.user == null){
		res.status(401).send();
	}
	Game.CreateGame(req.body.gamename, req.body.gamepassword, req.session.passport.user,req.body.startdate,req.body.enddate,function(){
		Game.GetGameByName(GameName, function(result){
			res.send(result[0].GameId);
		}, function(error){
			console.log(error);
			res.status(400).send();
		});
		
	} ,error);
});

router.put('/Join/:gameid/:userid',function(req, res){
	Game.GetGame(gameid, function(game){
		if(game.length !== 1)
			res.status(400).send();
		// check password and end date
		if((game[0].EndDate == null || game[0].EndDate > new Date()) &&
		 (game[0].GamePassword == null || game[0].GamePassword == req.body.gamepassword)){
			Game.AddUser(req.params.userid, req.params.gameid, new Date(), function(){
				res.send(true);
			}, error);
		} else {
			res.status(401).send();
		}
	},error);
});

module.exports = router;
