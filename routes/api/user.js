var express 	= require('express');
var router 		= express.Router();
var config 		= require('../../private.config');
var passport 	= require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt 		= require('bcrypt');
var UserData 	= require('../../private/Database/SQL/UserData');


router.get('/', function (req, res) {
    if(req.session && req.session.passport)
        res.send(req.session.passport.user);
    else
        res.send(null);
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

router.get('/Games/:userid', function(req, res){
	if(req.params.userid == null || typeof(req.params.userid) !== "number"){
		res.status(403).send();
		return;
	}
	Game.GetGamesForUser(req.param.userid, function(results){
		res.send(results);
	}, error);
});


module.exports = router;