var express 	= require('express');
var router 		= express.Router();
var config 		= require('../../private.config');
var passport 	= require('passport');
var watchlist 	= require('../../private/Database/SQL/WatchlistData');

router.get('/', function(req, res){
	if(!req.session.passport.user){
		res.status(401).send();
		return;
	}
	watchlist.GetWatchList(req.session.passport.user.userid, function(data){
		res.send(data);
	}, function(){
		res.send(null);
	});
});
router.put('/', function(req, res){
	if(!req.session.passport.user){
		res.status(401).send();
		return;
	}
	watchlist.AddToWatchList(req.session.passport.user.userid, 
		req.body.asset);
	res.send(true);
});
router.delete('/:watchlistid', function(req, res){
	if(!req.session.passport.user){
		res.status(401).send();
		return;
	}
	watchlist.DeleteFromWatchList(req.params.watchlistid);
	res.send(true);
});
router.post('/:watchlistid', function(req, res){
	if(!req.session.passport.user){
		res.status(401).send();
		return;
	}
	watchlist.UpdateWatchlist(req.session.passport.user.userid, req.params.watchlistid, function(){
		res.send(true);
	},function(){
		res.send(false);
	});	
});

module.exports = router;