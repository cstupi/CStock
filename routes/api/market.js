'use strict';
var express = require('express');
var router = express.Router();

var config = require('../private.config')

var GameData 	= require('../../private/Market/Market');
router.get('/:alertId/', function (req, res) {
	//var alertExecute = alertId;
    res.send('');
});


module.exports = router;
