var ctrl = require('../app_server/controllers/users');

module.exports = function (app) {
	app.use('/users', ctrl);
};
