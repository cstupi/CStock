var express 	= require('express');
var router 		= express.Router();
var config 		= require('../../private.config');
var passport 	= require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt 		= require('bcrypt');
var UserData 	= require('../../private/Database/MySQL/UserData');


router.get('/', function (req, res) {
    res.send(req.session.passport.user);
});

router.post('/login', passport.authenticate('local'),
  function(req, res) {
  	res.status(200).send(true);
});

router.get('/logout', function(req, res){
  req.logout();
  res.status(200).send(true);
});

router.post('/register', function(req, res){
	/* check if password means min reqs  first */
	bcrypt.hash(req.body.password, 10, function(err, hash) {
  		UserData.CreateUser(req.body.username, hash);
	});
	res.status(200).send();
});



router.get('/watchlist', function(req, res){
	// var watchlist = UserData.getWatchlist();
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