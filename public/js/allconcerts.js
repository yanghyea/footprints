$(function() {   // Do once original document loaded and ready
  getAllFestivals();
});

function getAllFestivals() {
	try {
		var query = '/events/';
		query += 'Festival';
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