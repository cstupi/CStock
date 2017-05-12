'use strict';
var express = require('express');
var router = express.Router();

var ordertypes		= require('../../private/Market/OrderType');
var transactiontypes = require('../../private/Market/TransactionType');
var status 			= require('../../private/Market/Status');

var market 			= require('../../private/Market/Market')
var order 			= require('../../private/Database/SQL/OrderData');


function error(error){
	console.log(error);
	res.status(500).send();
}


router.put('/marketorder', function (req, res) {

	if(!req.session.passport.user){
		res.status(401).send();
		return;
	}
	if(!req.body.symbol || !req.body.count || !req.body.gameid || !req.body.transactiontype){
		res.status(403).send();
		return;
	}
	market.PlaceMarketOrder(req.session.passport.user.userid, req.body.gameid,  req.body.symbol, req.body.transactiontype, req.body.count,function(){
			res.status(200).send();
		}, function(error){
			console.log(error);
			res.status(500).send();
		});
});
router.post('/cancelorder/:orderid', function(req, res){
	if(!req.session.passport.user){
		res.status(401).send();
		return;
	}
	if(!req.params.orderid){
		res.status(403).send();
		return;
	}
	order.UpdateStatus(req.params.orderid, req.session.passport.user.userid,status["Canceled"], new Date(), function(){
		res.status(200).send();
	}, function(error){
			console.log(error);
			res.status(500).send();
		});
});
router.put('/limitorder', function(req, res){
	if(!req.session.passport.user){
		res.status(401).send();
		return;
	}
	if(!req.body.symbol || !req.body.count || !req.body.gameid || !req.body.transactiontype || !req.body.gameid || typeof(req.body.price) != number){
		res.status(403).send();
		return;
	}
	
	transType = req.body.transactiontype;
	valueBoolString = transType == "Buy" || transType == "BuyCover" || transType == 1 || transType == 3? "Last<=" + price : "Last>=" + price;
	console.log(req.baseUrl);
	market.PlaceLimitOrder(req.session.passport.user.userid, req.body.gameid, req.body.symbol, transType, 
		req.body.count, valueBoolString, req.body.expiration, req.baseUrl + "/AlertCallback/{AlertIdentifier}/{timestamp}", function(){
			res.status(200).send();
	}, function(error){
			console.log(error);
			res.status(500).send();
		});
});
router.get('/AlertCallback/:alertid/:timestamp', function(req,res){
	market.ExecuteLimitOrder(req.params.alertid, req.params.timestamp);
	res.status(200).send();
});

module.exports = router;
