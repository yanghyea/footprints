var util = require("util");
/*
 * This is the connection URL
 * Give the IP Address / Domain Name (else localhost)
 * The typical mongodb port is 27012
 * ConcertTracker is the name of the database
 */

 // default to a 'localhost' configuration:
var connection_string = '127.0.0.1:27017/footprints';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}

var mongoClient = require('mongodb').MongoClient;
var mongoDB; // The connected database
// Use connect method to connect to the Server
mongoClient.connect('mongodb://' + connection_string, function(err, db) {
  if (err) doError(err);
  console.log("Connected correctly to server");
  mongoDB = db;
});

// INSERT
exports.insert = function(collection, query, callback) {
				console.log(query);
        mongoDB.collection(collection).insert(
          query,
          {safe: true},
          function(err, crsr) {
            if (err) doError(err);
            callback(crsr);
          }
        );
}

// FIND
exports.find = function(collection, query, callback) {
				if (query == "") {
					var crsr = mongoDB.collection(collection(collection.find({})));
					crsr.toArray(function(err, docs) {
						if (err) doError(err);
						callback(docs);
					});
				}
				else {
	        var crsr = mongoDB.collection(collection).find(query);
	        crsr.toArray(function(err, docs) {
	          if (err) doError(err);
	          callback(docs);
	        });
				}
 }

// UPDATE
exports.update = function(collection, eventName, query, callback) {
        console.log(query);
        mongoDB.collection(collection).update(
          { 'eventName' : eventName },
          query,
          function(err, crsr) {
          	if (err) doError(err);
           	callback(crsr);
      		}
      	);
}

// DELETE
exports.delete = function(collection, query, callback) {
        mongoDB.collection(collection).remove(
          query,
          function(err, crsr) {
            if (err) doError(err);
          	callback(crsr);
	        }
        );
}

var doError = function(e) {
        util.debug("ERROR: " + e);
        throw new Error(e);
}