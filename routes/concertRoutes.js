var concert = require('../models/concerts.js');

exports.index = function(req, res) {
	res.render('index', {title: "Concert Tracker"});
}

exports.newevent = function(req, res) {
	res.render('eventform');
}

// PUT (create) route
exports.insert = function(req, res) {
	concert.insert( req.params.eventType, 
	                req.query,
	                function(model) {
	                  res.render('table', {title: "Successully added event to the tracker!", obj: model});
	                }
			          );
}

// GET (retrieve) route
exports.find = function(req, res) {
	concert.find( req.params.eventType, 
	              req.query,
	              function(model) {
									res.render('table', {title: req.params.eventType, obj: model});
	              }
	            );
}

// POST (update) route
exports.update = function(req, res) {
	concert.update( req.params.eventType, 
									req.params.eventName,
		              req.query,
		              function(model) {
										res.render('success', {title: "Successfully updated event details!"});
		              }
		            );
}

// DELETE (destroy) route
exports.delete = function(req, res) {
	concert.delete( req.params.eventType, 
		              req.query,
		              function(model) {
										res.render('success', {title: 'Successfully deleted event.'});
		              }
		            );
}

// In the case that no route has been matched
exports.errorMessage = function(req, res){
  var message = '<p>Error, did not understand path ' + req.path + "</p>";
	// Set the status to 404 not found, and render a message to the user.
  res.status(404).send(message);
};