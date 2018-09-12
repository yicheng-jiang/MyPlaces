var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var theEarth = (function() {
	var earthRadius = 6371;  //km, miles is 3959

	var getDistanceFromRads = function(rads) {
		return parseFloat(rads * earthRadius);
	};

	var getRadsFromDistance = function(distance) {
		return parseFloat(distance / earthRadius);
	};

	return {
		getDistanceFromRads : getDistanceFromRads,
		getRadsFromDistance: getRadsFromDistance
	};
})();

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
}

module.exports.locationsCreate = function (req, res) {
	Loc.create({
		name: req.body.name,
		address: req.body.address,
		facilities: req.body.facilities.split(","),
		coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
		openingTimes: [{
			days: req.body.days1,
			opening: req.body.opening1,
			closing: req.body.closing1,
			closed: req.body.closed1
		}, {
			days: req.body.days2,
			opening: req.body.opening2,
			closing: req.body.closing2,
			closed: req.body.closed2
		}]
	}, function(err, Location) {
		if (err) {
			sendJsonResponse(res, 400, err);
		} else {
			sendJsonResponse(res, 200, {"status" : "success"});		
		}
	});
};

module.exports.locationsListByDistance = function (req, res) {
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);
	var maxDistance = parseFloat(req.query.maxDistance);
	maxDistance = maxDistance > 0 ? maxDistance : 20;

	var point = {
		type: "Point",
		coordinates: [lng, lat]   // -89.46509724223631, 43.062918440240985
	};
	var geoOptions = {
		spherical: true,
		maxDistance: theEarth.getRadsFromDistance(maxDistance),
		num: 10
	};

	if (!lng || !lat) {
		sendJsonResponse(res, 404, {
			"message": "lng and lat query parameters are required"
		});
		return;
	}
	Loc    //  .geoNear(point, geoOptions, function (err, results, stats)  // removed from mongoose
		.aggregate([{
			$geoNear: {
				near: point,
				maxDistance: geoOptions.maxDistance,
				key: "coords",
				distanceField: "distance",
				spherical: geoOptions.spherical,
				query: 'find()'
			}
		}])
		.limit(geoOptions.num)
		.exec(function (err, results) {
			var locations = [];
			console.log("err: " + err + " results: " + JSON.stringify(results));
			if (err) {
				sendJsonResponse(res, 404, err);
			} else {
				results.forEach(function(doc) {
					locations.push({
						distance: theEarth.getDistanceFromRads(doc.dis),
						name: doc.name,
						address: doc.address,
						rating: doc.rating,
						facilities: doc.facilities,
						_id: doc._id
					});		
				});
				sendJsonResponse(res, 200, locations);
			}
		});
};

module.exports.locationsReadOne = function (req, res) {
	if (req.params && req.params.locationid) {
		Loc.findById(req.params.locationid)
			.exec(function(err, location) {
				if (!location) {
					sendJsonResponse(res, 404, {
						"message": "location not found"
					});
					console.log("location with id, " + req.params.locationid + ", not found");
					return;
				} else if (err) {
					sendJsonResponse(res, 404, err);
					return;
				}
				sendJsonResponse(res, 200, location);
			});	
	} else {
		sendJsonResponse(res, 404, {
			"message": "No locationid in request"
		});
	}
};

module.exports.locationsUpdateOne = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
};

module.exports.locationsDeleteOne = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
};

