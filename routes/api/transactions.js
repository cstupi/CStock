'use strict';
var express = require('express');
var router = express.Router();

var transaction 	= require('../../private/Database/SQL/TransactionData');


router.get('/transactions/user/all', function(req, res){
	if(!req.session.passport.user)
		res.status(401).send();
	transaction.GetAllTransactionsForUser(req.session.passport.user.userid, function(results){
		res.send(results);
	}, function(error){
	console.log(error);
	res.status(500).send();
});
});
router.get('/transactions/order/:orderid', function(req, res){
	transaction.GetTransactionsForOrder(req.params.orderid, function(results){
		res.send(results);
	}, function(error){
	console.log(error);
	res.status(500).send();
});
});
router.get('/transactions/game/user/:gameid', function(req, res){
	if(!req.session.passport.user)
		res.status(401).send();
	if(typeof(req.params.gameid) != "number")
		res.status(403).send();
	transaction.GetAllTransactionsForUserGame(req.session.passport.user.userid, req.params.gameid, function(results){
		res.send(results);
	}, function(error){
	console.log(error);
	res.status(500).send();
})
});
router.get('/transactions/game/all/:gameid', function(req, res){
	if(typeof(req.params.gameid) != "number")
		res.status(403).send();
	transaction.GetAllTransactionsForGame(req.params.gameid, function(results){
		res.send(results);
	}, function(error){
	console.log(error);
	res.status(500).send();
})
});


module.exports = router;
