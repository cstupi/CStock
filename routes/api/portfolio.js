var express 	= require('express');
var router 		= express.Router();
var config 		= require('../../private.config');
var passport 	= require('passport');
var PortfolioData 	= require('../../private/Database/SQL/PortfolioData');

router.get('/', function(req, res){
	if(!req.session.passport.user)
		res.status(401).send();
	PortfolioData.GetAllPortfoliosForUser(req.session.passport.user.userid, function(data){
		res.send(data);
	}, function(){
		res.send(null);
	});
});
router.put('/', function(req, res){
	if(!req.session.passport.user)
		res.status(401).send();
	if(!req.body.asset || !req.body.count || !req.body.gameid)
		res.status(403).send();
	PortfolioData.AddToPortfolio(req.session.passport.user.userid, 
		req.body.asset, req.body.count, req.body.gameid,req.body.costbasis);
	res.send(true);
});
router.delete('/:portfolioId', function(req, res){
	if(!req.session.passport.user)
		res.status(401).send();
	PortfolioData.DeleteFromPortfolio(req.params.portfolioId);
	res.send(true);
});
router.post('/:portfolioId', function(req, res){
	if(!req.session.passport.user)
		res.status(401).send();
	PortfolioData.UpdatePortfolio(req.session.passport.user.userid, req.params.portfolioId,req.body.count,req.body.costbasis, function(){
		res.send(true);
	},function(){
		res.send(false);
	});	
});

module.exports = router;