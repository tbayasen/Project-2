$('document').ready(function () {
	// $('#edit-profile-btn').on('click', function() {
	//     //get user info and display on modal

	//     //allow user to change user info and update database

	// });
    

	$('#search-input').keypress(function(event) {
		if (event.keyCode === 13) {
			const query = $('#search-input').val().trim();
			console.log(query);
			localStorage.setItem('searchQuery', query);
			const current = window.location.href;
			location.assign('/temp');
		}
	});
});
