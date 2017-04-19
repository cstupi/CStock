'use strict';
var express = require('express');
var router = express.Router();

var config = require('../private.config')

var GameData 	= require('../../private/Database/SQL/GameData');
function error(error){
	console.log(error);
	res.status(500).send();
}
router.get('/Members/:GameId', function (req, res) {
	if(req.params.GameId == null || typeof(req.params.GameId) !== "number")
		res.status(400).send();
	Game.GetMembersForGame(gameid, function(results){
		res.send(results);
	}, error);
});
router.get('/Games', function(req,res){
	Game.GetAllGames(function(results){
		res.send(results);
	}, error);
});

router.get('/Games/:userid', function(req, res){

});

module.exports = router;
