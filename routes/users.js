'use strict';
var express = require('express');
var router = express.Router();

var config = require('../private.config')

var database = require('../private/Database/MySQL');
/* GET users listing. */
router.get('/', function (req, res) {
	database.Test();
    res.send('respond with a resource');
});




module.exports = router;
