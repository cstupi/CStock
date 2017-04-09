var express 	= require('express');
var router 		= express.Router();
var config 		= require('../../private.config');
var passport 	= require('passport');
var PortfolioData 	= require('../../private/Database/MySQL/PortfolioData');

router.get('/', function(req, res){
	if(!req.session.passport.user)
		res.redirect('/login');
	PortfolioData.GetPortfolio(req.session.passport.user.userid, function(data){
		res.send(data);
	}, function(){
		res.send(null);
	});
});
router.put('/', function(req, res){
	if(!req.session.passport.user)
		res.redirect('/login');
	PortfolioData.AddToPortfolio(req.session.passport.user.userid, 
		req.body.asset, req.body.count);
	res.send(true);
});
router.delete('/:portfolioId', function(req, res){
	if(!req.session.passport.user)
		res.redirect('/login');
	PortfolioData.DeleteFromPortfolio(portfolioId);
	res.send(true);
});
router.post('/:portfolioId', function(req, res){
	if(!req.session.passport.user)
		res.redirect('/login');
	PortfolioData.UpdatePortfolio(req.session.passport.user.userid, req.params.portfolioId, req.body.asset,req.body.count, function(){
		res.send(true);
	},function(){
		res.send(false);
	});	
});

module.exports = router;