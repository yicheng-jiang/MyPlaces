/* GET 'home' page */
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

/* GET 'Location info' page */
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

/* GET 'Add review' page */
module.exports.addReview = function(req, res){
res.render('location-review-form', { 
  title: 'Add review',
  header: 'Review',
  name: 'Starcups',
  lblName: 'Name',
  lblRating: 'Rating',
  lblReview: 'Review',
  lblAddButton: 'Add my review'
  });
};
