'use strict';
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var config = require('../../CStock.config');



router.get('/', function (req, res) {
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
   


module.exports = router;