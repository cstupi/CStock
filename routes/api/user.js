var express 	= require('express');
var router 		= express.Router();
var config 		= require('../../private.config');
var passport 	= require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt 		= require('bcrypt');
var mysql 		= require('../../private/Database/MySQL');


router.get('/', function (req, res) {
    res.status(200).send(config.XigniteUserId.toString());
});

router.post('/login',passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' }));

router.post('/register', function(req, res){
	/* check if password means min reqs  first */

	bcrypt.hash(req.body.password, 10, function(err, hash) {
  		mysql.CreateUser(req.body.username, hash);
	});
	res.status(200).send();
});

router.get('/portfolio', function(req, res){
	//var portfolio = mysql.getPortfolio();
	console.log(req.session);
	res.send('YOUR PORTFOLIO');
});

router.get('/watchlist', function(req, res){
	// var watchlist = mysql.getWatchlist();
	res.send('watchlist');
});

router.get('/transactions/all', function(req,res){
	//var transactions = mysql.getAllTransactions();
	res.send('transactions');
});
router.get('/transactions/pending', function(req, res){
	//var transactions = mysql.getOpenTransactions();
	res.send('pending transactions');
});

module.exports = router;