'use strict';
var express = require('express');
var router = express.Router();

var ordertypes		= require('OrderType');
var transactiontypes = require('TransactionType');
var status 			= require('Status');

var market 			= require('../../private/Market/Market')
var order 			= require('../../private/Database/SQL/OrderData');
var transaction 	= require('../../private/Database/SQL/TransactionData');

function error(error){
	console.log(error);
	res.status(500).send();
}

router.get('/quote/:symbol', function (req, res) {
	if(!req.session.passport.user)
		res.status(401).send();
	if(req.params.symbol == null)
		res.status(400).send();
	market.GetMarketQuote(req.params.symbol, function(data){
		console.log(data);
		res.send(data);
	},error);
});
router.put('/marketorder', function (req, res) {
	if(!req.session.passport.user)
		res.status(401).send();
	if(!req.body.symbol || !req.body.count || !req.body.gameid || !req.body.transactiontype || !req.body.gameid || !req.body)
		res.status(403).send();
	order.AddOrder(req.body.transactiontype, ordertypes["Market"], status["Pending"], null, null, new Date(), req.params.symbol,
		req.body.count, null, req.body.gameid, req.session.passport.user.userid, function(orderid){
			market.GetMarketQuote(req.params.symbol, function(data){
				console.log(data);
				res.send(data);
				data[0].Last;
				data[0].LastSize
				transaction.AddTransaction(req.session.passport.user.userid, req.body.transactiontype, asset,count,data[0].Last,new Date(), 
					status, orderid, req.body.gameid, callback, error);
		},error);
	}, error);
	
});

module.exports = router;
