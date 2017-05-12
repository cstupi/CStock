'use strict';
var express = require('express');
var router = express.Router();
var order = require('../../private/Database/SQL/OrderData');

function error(error){
	console.log(error);
	res.status(500).send();
}

router.get('/user/all',function(req,res){
	if(!req.session.passport.user){
		res.status(401).send();
		return;
	}
	order.GetAllOrdersForUser(req.session.passport.user.userid, function(results){
		res.send(results);
	}, function(error){
	console.log(error);
	res.status(500).send();
});
});

router.get('/game/:gameid',function(req,res){
	if(!req.session.passport.user){
		res.status(401).send();
		return;
	}
	if(typeof(req.params.gameid) != "number"){
		res.status(403).send();
		return;
	}
	order.GetAllOrdersForGame(req.params.gameid, function(results){
		res.send(results);
	}, function(error){
	console.log(error);
	res.status(500).send();
});
});
router.get('/user/:gameid',function(req,res){
	if(!req.session.passport.user){
		res.status(401).send();
		return;
	}
	if(typeof(req.params.gameid) != "number"){
		res.status(403).send();
		return;
	}
	order.GetAllOrdersForUserGame(req.session.passport.user.userid, req.params.gameid, function(results){
		res.send(results);
	}, function(error){
	console.log(error);
	res.status(500).send();
});
});


module.exports = router;
