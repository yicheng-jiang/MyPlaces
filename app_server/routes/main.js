var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/main');

/* GET home page. */
//router.get('/', ctl.index);

module.exports = function (app) {
	app.use('/', ctrl.index);
};
