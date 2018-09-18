var request = require('request');
var apiOptions = {
	server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
	apiOptions.server = "https://getting-mean-myplaces.herokuapp.com";
}

/* GET 'home' page */
/* move Express to Angular
var renderHomepage = function(req, res, responseBody) {
	var message;
	if (!(responseBody instanceof Array)) {
		message = "API lookup error";
		responseBody = [];
	} else {
		if (!responseBody.length) {
			message = "No places found nearby";
		}
	}

	res.render('locations-list', {
		title: 'Myplaces - find a place to work with wifi',
		pageHeader: {
			title: 'MyPlaces',
			strapline: 'Find places to work with wifi near you!'
		},
		sidebar: "Looking for wifi and a seat? MyPlaces helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let MyPlaces help you find the place you're looking for.",
		locations: responseBody,
		message: message
	});
};

module.exports.homelist = function(req, res) {
	var requestOptions, path;
	path = '/api/locations';
	requestOptions ={
		url: apiOptions.server + path,
		method: "GET",
		json: {},
		qs: {
			lng: -89.46509724223631, 
			lat: 43.062918440240985,
			maxDistance: 20
		}
	};
	request(requestOptions, function(err, response, body) {
		var i, data;
		data = body;
		if (response.statusCode === 200 && data.length) {
			for (i=0; i<data.length; i++) {
				data[i].distance = _formatDistance(data[i].distance);
			}
		}		
		renderHomepage(req, res, data);
	});
};
*/
var renderHomepage = function(req, res) {
	res.render('locations-list', {
		title: 'Myplaces - find a place to work with wifi',
		pageHeader: {
			title: 'MyPlaces',
			strapline: 'Find places to work with wifi near you!'
		},
		sidebar: "Looking for wifi and a seat? MyPlaces helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let MyPlaces help you find the place you're looking for."
	});
};

module.exports.homelist = function(req, res) {
	renderHomepage(req, res);
};
var _isNumeric = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
var _formatDistance = function (distance) {
	var numDistance, unit;
	if (distance === "" || parseFloat(distance) === NaN) {
		return "Missing or wrong distance";
	}
	if (distance > 1) {
		numDistance = parseFloat(distance).toFixed(1);
		unit = 'km';
	} else {
		numDistance = parseInt(distance * 1000, 10);
		unit = "m";
	}
	return numDistance + unit;
};

var renderDetailPage = function(req, res, Location) {
	res.render('location-info', {
	  title: Location.name,
	  pageHeader: {title: Location.name},
	  lblOpening: 'Opening hours',
	  lblFac: 'Facilities',
	  lblLoc: 'Location map',
	  lblAddReview: 'Add review',
	  reviewtitle: 'Customer reviews',
	  sidebar: {
		context: 'is on MyPlaces because it has accessible wifi and space to sit down with your laptop and get some work done.', 
		callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
	  },
	  location: Location
	});
}

/* GET 'Location info' page */
module.exports.locationInfo = function(req, res){
	getLocationInfo(req, res, function(req, res, responseData) {
		renderDetailPage(req, res, responseData);
	});
};

_showError = function(req, res, statusCode) {
	var title, content;
	if (statusCode === 404) {
		title = "404, page not found";
		content = "Oh dear. Looks like we can't find this page. Sorry.";
	} else {
		title = statusCode + ", something's gone wrong";
		content = "Something, somewhere, has gone just a little bit wrong.";
	}
	res.status(statusCode);
	res.render('generic-text', {
		title: title,
		text1: content
	});
};

var getLocationInfo = function (req, res, callback) {
	var requestOptions, path;
	path = "/api/locations/" + req.params.locationid;
	requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {}
	};
	request(requestOptions, function(err, response, body){
		var data = body;
		if (response.statusCode === 200) {
			console.log("Get location for " + req.params.locationid);
			data.coords = {
				lng: body.coords[0],
				lat: body.coords[1]
			}
			callback(req, res, data);		
		} else {
			_showError(req, res, response.statusCode);
		}
	});
};

var renderReviewForm = function (req, res, locDetail) {
	console.log("renderReviewForm called with " + JSON.stringify(locDetail));
	res.render('location-review-form', {
		title: 'Review ' + locDetail.name + ' on Myplaces',
		pageHeader: {title: 'Review ' + locDetail.name},
		error: req.query.err,
		lblName: 'Name',
		lblRating: 'Rating',
		lblReview: 'Review',
		lblAddButton: 'Add my review',
		url: req.originalUrl
	});
	console.log("after render");
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res){
	console.log("addReview called");
	getLocationInfo(req, res, function(req, res, responseData) {
		renderReviewForm(req, res, responseData);
	});
};

/* Post review page */
module.exports.doAddReview = function(req, res) {
	var requestOptions, path, locationid, postdata;
	locationid = req.params.locationid;
	path = "/api/locations/" + locationid + '/reviews';
	console.log("post to " + path);
	postdata = {
		author: req.body.name,
		rating: parseInt(req.body.rating, 10), 
		reviewText: req.body.review
	};
	requestOptions = {
		url: apiOptions.server + path,
		method: "POST",
		json: postdata
	};
	if (!postdata.author || !postdata.rating || !postdata.reviewText) {
		res.redirect('/location/' + locationid + '/reviews/new?err=val');
	} else {
		request(requestOptions, function(err, response, body) {
			if (response.statusCode === 201) {
				res.redirect('/location/' + locationid);
			} else if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
				res.redirect('/location/' + locationid + '/reviews/new?err=val');
			} else {
				_showError(req, res, response.statusCode);
			}
		});	
	}
};

/* GET 'home' page */
/* hard coded home page
module.exports.homelist = function(req, res){
res.render('locations-list', { 
	title: 'MyPlaces - find a place to work with wifi' ,
	pageHeader: {
		title: 'MyPlaces',
		strapline: 'Find places to work with wifi near you!'
	},
	sidebar: "Looking for wifi and a seat? MyPlaces helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let MyPlaces help you find the place you're looking for.",
	locations: [{
		name: 'Yicheng\'s Home',
		address: '309 Racine Road, Madison, WI 53705',
		rating: 3,
		facilities: ['Hot drinks', 'Food', 'Premium wifi'],
		distance: '10m'
		}, {
		name: 'Memorial Union',
		address: '800 Langdon St, Madison, WI 53703',
		rating: 4,
		facilities: ['Hot drinks', 'Food', 'Premium wifi'],
		distance: '5miles'
		}, {
		name: 'Burger Queen',
		address: '125 High Street, Reading, RG6 1PS',
		rating: 2,
		facilities: ['Food', 'Premium wifi'],
		distance: '250m'
		}]
	});
};
*/


/* GET 'Location info' page */
/* hard code data
module.exports.locationInfo = function(req, res){
res.render('location-info', { 
  title: 'Location info',
  name: 'Yicheng\'s Home',
  address: '309 Racine Road, Madison, WI 53705',
  lblOpening: 'Opening hours',
  openings: ['Monday - Friday : 7:00am - 7:00pm', ' Saturday : 8:00am - 5:00pm', 'Sunday : closed'],
  lblFac: 'Facilities',
  facilities: ['Hot drinks', 'Food', 'Premium wifi'],
  lblLoc: 'Location map',
  lblAddReview: 'Add review',
  reviewtitle: 'Customer reviews',
  reviews: [{
    author: 'Yicheng Jiang',
	date: '07/13/2018',
	rating: 5,
	review: 'What a great place. I can\'t say enough good things about it.'
  }, {
    author: 'Haiyan Wei',
	date: '09/08/2018',
	rating: 5,
	review: 'Wonderful place, especially the male owner. He owns me.'
  }, {
    author: 'Charlie Chaplin',
	date: '06/13/2017',
	rating: 4,
	review: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
  }],
  sidebars: ['Starcups is on MyPlaces because it has accessible wifi and space to sit down with your laptop and get some work done.', 
    'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.']
  });
};
*/

