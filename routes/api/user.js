var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var config = require('../../private.config');


router.get('/', function (req, res) {
    res.status(200).send(config.UserId.toString());
});

module.exports = router;