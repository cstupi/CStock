var express 	= require('express');
var router 		= express.Router();
var config 		= require('../../private.config');
var crypto = require('crypto');

router.get('/token', function (req, res) {
	var token = encrypt(config.Token, config.Key, config.IV);
    res.send(token);
});

function encrypt(token, key, iv) {
	token += "|" + new Date().toISOString().substr(0, 19);
	var cipher = crypto.createCipheriv('aes-128-cfb8', key, iv);
	cipher.setAutoPadding(false);
	var encrypted = cipher.update(token, 'ascii', 'hex');
	encrypted += cipher.final('hex');
	return encrypted;
}
   
router.get('/userid', function (req, res) {
    res.status(200).send(config.XigniteUserId.toString());
});
module.exports = router;