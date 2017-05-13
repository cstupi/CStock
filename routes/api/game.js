'use strict';
var express = require('express');
var router = express.Router();

var config = require('../../private.config')

var Game 	= require('../../private/Database/SQL/GameData');
var portfolio = require('../../private/Database/SQL/PortfolioData');

var starting_cash = 100000;
function error(error){
	console.log(error);
	req.status(500).send();
}
router.get('/Members/:gameid/', function (req, res) {
	if(req.params.gameid == null || typeof(req.params.gameid) !== "number"){
		res.status(400).send();
		return;
	}
	Game.GetMembersForGame(gameid, function(results){
		res.send(results);
	}, function(error){
		console.log(error);
		res.status(500).send();
});
});
router.get('/GamesForUser', function(req, res){
	if(req.session.passport.user == null){
		res.status(401).send();
		return;
	}
	Game.GetGamesForUser(req.session.passport.user.userid,function(results){
		res.send(results);
	}, error);
});
router.get('/All', function(req,res){
	Game.GetAllGames(function(results){
		res.send(results);
	}, error);
});

router.post('/Create', function(req,res){
	var response = res;
	if(req.body.gamename == null){
		res.status(403).send();
		return;
	} else if(req.session.passport.user == null){
		res.status(401).send();
		return;
	}
	Game.CreateGame(req.body.gamename, req.body.gamepassword, req.session.passport.user.userid,req.body.startdate,req.body.enddate,function(){
		Game.GetGameByName(req.body.gamename, function(result){
			Game.AddUser(req.session.passport.user.userid, result[0].GameId, new Date(), function(){
				portfolio.AddToPortfolio(req.session.passport.user.userid, "USD", starting_cash, result[0].GameId, starting_cash,function(){ response.status(200).send(); },function(error){
					console.log(error);
					res.status(500).send();
				});
			}, function(error){
				console.log(error);
				res.status(500).send();
			});
		}, function(error){
			console.log(error);
			response.status(400).send();
		});
		
	} ,function(error){
		console.log(error);
		response.status(500).send();
	});
});

router.put('/Join/:gameid',function(req, res){
	Game.GetGame(req.params.gameid, function(game){
		if(!req.session.passport.user){
			res.status(401).send();
			return;
		}
		if(game.length !== 1){
			res.status(403).send();
			return;
		}
		// check password and end date
		if((game[0].EndDate == null || game[0].EndDate > new Date()) &&
		 (game[0].GamePassword == null || game[0].GamePassword == req.body.gamepassword)){
			Game.AddUser(req.session.passport.user.userid, req.params.gameid, new Date(), function(){
				portfolio.AddToPortfolio(req.session.passport.user.userid, "USD", starting_cash, req.params.gameid, starting_cash,function(){ 
					res.status(200).send(); 
				},function(error){
					console.log(error);
					res.status(500).send();
				});
			}, error);
		} else {
			res.status(401).send();
			return;
		}
	},function(error){
	console.log(error);
	res.status(500).send();
});
});

module.exports = router;
