var events = require('../models/events.js');

exports.index = function(req, res) {
	res.render('index', {title: "footprints"});
}

exports.newevent = function(req, res) {
	res.render('eventform');
}

// PUT (create) route
exports.insert = function(req, res) {
	events.insert(  req.params.eventType,
	                req.query,
	                function(model) {
	                  res.render('table', {title: "Successully added event to the tracker!", obj: model});
	                }
			          );
}

// GET (retrieve) route
exports.find = function(req, res) {
	events.find(  req.params.eventType, 
	              req.query,
	              function(model) {
	              	if (req.params.eventType == 'Concert') {
	              		res.render('concertinfo', {title: req.params.eventType, obj: model});
	              	}
	              	if (req.params.eventType == 'Festival') {
	              		res.render('festivalinfo', {title: req.params.eventType, obj: model});
	              	}
	              }
	            );
}

exports.findall = function(req, res) {
	events.findall( req.params.eventType, 
		              req.query,
		              function(model) {
	              		res.render('table', {title: req.params.eventType, obj: model});
		              }
	            );
}

// POST (update) route
exports.update = function(req, res) {
	events.update(  req.params.eventType, 
									req.params.eventName,
		              req.query,
		              function(model) {
										res.render('success', {title: "Successfully updated event details!"});
		              }
		            );
}

// DELETE (destroy) route
exports.delete = function(req, res) {
	events.delete(  req.params.eventType, 
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