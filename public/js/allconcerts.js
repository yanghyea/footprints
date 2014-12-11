$(function() {   // Do once original document loaded and ready
  getAllConcerts();
});

function getAllConcerts() {
	try {
		var query = '/events/';
		query += 'Concert';
		query += '/all';
		$.ajax({
			url: query,
			type: 'GET',
			success: function(result) {
				$('#allconcerts').html(result);
			}
		});
		return false;
	} catch (err) {console.log(err.description);}
}