/* javascript for creating a new event on footprints application
*/

/* jQuery Datepicker
** Code from http://jqueryui.com/datepicker/
*/
$(function() {
  $( "#cdate" ).datepicker();
});

/* Timer detects onkeydown and onkeyup event from user
** Based on the time interval, getArtist() is called accordingly
** so the the user is given an updated list of artist that match closely to the input
*/
var timer; 

function ArtistKeyUpHandler() {
	timer = setTimeout("getArtist()", 100);    
};

function ArtistKeyDownHandler() {
	clearTimeout(timer);
};

function VenueKeyUpHandler() {
	timer = setTimeout("getVenue()", 100);    
};

function VenueKeyDownHandler() {
	clearTimeout(timer);
};

/* Got help on how to make correct AJAX call and how to append the data in getArtist()
** from Songkick API discussion group at the following link:
** https://groups.google.com/forum/#!searchin/songkick-api/ajax/songkick-api/vh0b0KNkEC4/lTNfKrzOb8oJ
*/
function getArtist() {
	var key = "wq4aOLmhfzcw4GTk";  // <== Songkick API Key
	$.ajax({ 
	  url: "http://api.songkick.com/api/3.0/search/artists.json?query="+ $('#artistinput').val() + "&apikey=" + key + 
	  			"&jsoncallback=?", 
	  dataType: "jsonp", 
	  success: function(data){
	  	var artistlist = [];
			var size = 5;
			if (data["resultsPage"].totalEntries <= 5) {
				size = data["resultsPage"].totalEntries;
			}
			for (var i = 0; i < size; i++) {
				entry = data["resultsPage"]["results"]["artist"][i];
				artistlist += '<li><a href="' + entry.uri + '">' + entry.displayName +'</a></li>';
			}
			$('#artistspan').html(artistlist);
	  }
	});
}


function getVenue() {
	var key = "wq4aOLmhfzcw4GTk";  // <== Songkick API Key
	$.ajax({ 
	  url: "http://api.songkick.com/api/3.0/search/venues.json?query=" + $('#venueinput').val() + "&apikey=" + key + 
	  			"&jsoncallback=?",
	  dataType: "jsonp", 
	  success: function(data){
			var venuelist = [];
			var size = 5;
			if (data["resultsPage"].totalEntries <= 5) {
				size = data["resultsPage"].totalEntries;
			}
			for (var i = 0; i < size; i++) {
				entry = data["resultsPage"]["results"]["venue"][i];
				venuelist += '<li><a href="' + entry.uri + '">' + entry.displayName +'</a></li>';
			}
			$('#venuespan').html(venuelist);
	  } 
	}); 
}

$(function() {
	// PUT (create) AJAX request
	$('#putForm').submit(function(){
		var query = '/events/';
		query += $('#ctype').val() + "?" + "eventName=" + $('#cname').val() + "&" + "eventDate=" + $('#cdate').val() 
							+ "&" + "venue=" + $('#cvenue').val();
		console.log(query);
		$.ajax({
			url: query,
			type: 'PUT',
			success: function(result) {
				$('#status').html(result);
			}
		});
		return false;
	});

	// GET (retrieve) AJAX request
	$('#getForm').submit(function(){
		var query = '/events/';
		query += $('#ctype').val() + "?" + "eventName=" + $('#cname').val() + "&" + "eventDate=" + $('#cdate').val(); 
		$.ajax({
			url: query,
			type: 'GET',
			success: function(result) {
				$('#current').html(result);
			}
		});
		return false;
	});

	// GET (retrieve) all AJAX request
	$('#seeAll').submit(function(){
		var query = '/events/';
		query += $('#ctype').val();
		$.ajax({
			url: query,
			type: 'GET',
			success: function(result) {
				$('#current').html(result);
			}
		});
		return false;
	});

	// POST (update) AJAX request
	$('#updateEvent').submit(function(){
		var query = '/events/';
		query += $('#ctype').val() + "/" + $('#cname').val() + "?" + "eventName=" + $('#cname').val() + "&" 
							+ "eventDate=" + $('#cdate').val() + "&" + "venue=" + $('#cvenue').val();
		console.log("updated" + query);
		$.ajax({
			url: query,
			type: 'POST',
			success: function(result) {
				$('#current').html(result);
			}
		});
		return false;
	});

	// DELETE AJAX request
	$('#deleteEvent').submit(function(){
		var query = '/events/';
		query += $('#ctype').val() + "?" + "eventName=" + $('#cname').val() + "&" + "eventDate=" + $('#cdate').val();
		console.log("deleted" + query);
		$.ajax({
			url: query,
			type: 'DELETE',
			success: function(result) {
				$('#current').html(result);
			}
		});
		return false;
	});
});