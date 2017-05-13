var express 	= require('express');
var router 		= express.Router();
var config 		= require('../../private.config');
var PortfolioData 	= require('../../private/Database/SQL/PortfolioData');

router.get('/', function(req, res){
	if(!req.session || !req.session.passport || !req.session.passport.user){
		res.status(401).send('Not Logged In');
		return;
	}
	PortfolioData.GetAllPortfoliosForUser(req.session.passport.user.userid, function(data){
		res.send(data);
	}, function(){
		res.send(null);
	});
});

router.get('/:gameid', function(req, res){
	if(!req.session || !req.session.passport || !req.session.passport.user){
		res.status(401).send('Not Logged In');
		return;
	}
	PortfolioData.GetAllPortfoliosForUser(req.session.passport.user.userid, function(data){
		res.send(data);
	}, function(){
		res.send(null);
	});
});

module.exports = router;