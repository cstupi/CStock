var express 	= require('express');
var router 		= express.Router();
var config 		= require('../../private.config');

router.get('/token', function (req, res) {
    res.status(200).send(config.XigniteUserId.toString());
});
module.exports = router;