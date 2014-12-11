/* javascript for showing the upcoming concerts and festivals
*/

$(function() {    // Do once original document loaded and ready
  getUpcomingConcerts();
  getUpcomingFestivals();
});

function getUpcomingConcerts() {
	try {
		var query = '/events/';
		query += 'Concert';
		$.ajax({
			url: query,
			type: 'GET',
			success: function(result) {
				$('#upcomingconcerts').html(result);
			}
		});
		return false;
	} catch (err) {console.log(err.description);}
}

function getUpcomingFestivals() {
	try {
		var query = '/events/';
		query += 'Festival';
		$.ajax({
			url: query,
			type: 'GET',
			success: function(result) {
				$('#upcomingfestivals').html(result);
			}
		});
		return false;
	} catch (err) {console.log(err.description);}
}