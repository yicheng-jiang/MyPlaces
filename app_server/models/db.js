var mongoose = require( 'mongoose' );

var dbURI = 'mongodb://localhost/MyPlaces';
mongoose.connect(dbURI, {useNewUrlParser: true});

mongoose.connection.on('connected', function () {
	console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
	console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
	console.log('Mongoose disconnected');
});

var readLine = require ("readline");
if (process.platform === "win32") {
	var r1 = readLine.createInterface ({
		input: process.stdin,
		output: process.stdout
	});
	r1.on ("SIGINT", function () {
		process.emit ("SIGINT");
	});
	r1.on("SIGUSR2", function () {
		process.emit ("SIGUSR2");
	});
	r1.on("SIGTERM", function () {
		process.emit ("SIGTERM");
	});
};

var gracefulShutdown = function (msg, callback) {
	mongoose.connection.close(function () {
		console.log('Mongoose disconnected through ' + msg);
		callback();
	});
};

process.once("SIGUSR2", function () {
	gracefulShutdown('nodemon restart', function () {
		process.kill(process.pid, 'SIGUSR2');
	});
});

process.on('SIGINT', function () {
	gracefulShutdown('app terminatiion', function () {
		process.exit(0);
	});
});

process.on('SIGTERM', function() {
	gracefulShutdown('Heroku app shutdown', function () {
		process.exit(0);
	});
});

require('./locations');

