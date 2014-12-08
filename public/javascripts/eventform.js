$(function() {
	// PUT ajax request
	$('#putForm').submit(function(){
		var query = '/concerts/';
		query += $('#ctype').val() + "?" + "eventName=" + $('#cname').val() + "&" + "date=" + $('#cdate').val() 
							+ "&" + "venue=" + $('#cvenue').val();
		console.log(query);
		$.ajax({
			url: query,
			type: 'PUT',
			success: function(result) {
				$('#current').html(result);
			}
		});
		return false;
	});

	// GET ajax request
	$('#getForm').submit(function(){
		var query = '/concerts/';
		query += $('#ctype').val() + "?" + "eventName=" + $('#cname').val() + "&" + "date=" + $('#cdate').val(); 
		$.ajax({
			url: query,
			type: 'GET',
			success: function(result) {
				$('#current').html(result);
			}
		});
		return false;
	});

	// retrieve all concertes (table)
	$('#seeAll').submit(function(){
		var query = '/concerts/';
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

	// POST (update) ajax request
	$('#postForm').submit(function(){
		var query = '/concerts/';
		query += $('#ctype').val() + "/" + $('#cname').val() + "?" + "eventName=" + $('#cname').val() + "&" 
							+ "date=" + $('#cdate').val() + "&" + "venue=" + $('#cvenue').val();
		$.ajax({
			url: query,
			type: 'POST',
			success: function(result) {
				$('#current').html(result);
			}
		});
		return false;
	});

	// DELETE ajax request
	$('#deleteForm').submit(function(){
		var query = '/concerts/';
		query += $('#ctype').val() + "?" + "eventName=" + $('#cname').val() + "&" + "date=" + $('#cdate').val();
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