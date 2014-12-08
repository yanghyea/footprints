//navbar buttons

$(function() {
	// GET ajax request
	$('#addnew').submit(function(){
		var query = '/concerts/new';
		console.log(query);
		$.ajax({
			url: query,
			type: 'GET',
			success: function(result) {
				console.log('button worked');
			}
		});
	});
});