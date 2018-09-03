var express = require('express');
var router = express.Router();

var ctrl = require('../controllers/users');

module.exports = function (app) {
	app.use('/users', ctrl.users);
};

/* GET users listing. */
//router.get('/', function(req, res, next) {
//  res.send('respond with a resource');
//});

//module.exports = router;

