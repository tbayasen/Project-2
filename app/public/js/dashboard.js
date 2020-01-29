$('document').ready(function () {
	$('.carousel').carousel();
	$('.modal').modal();
	
	$('#search-input').keypress(function (event) {
		if (event.keyCode === 13) {
			const query = $('#search-input').val().trim();
			console.log(query);
			localStorage.setItem('searchQuery', query);
			const current = window.location.href;
			location.assign('/search');
		}
	});

	// var instance = M.Carousel.getInstance(elem);
});
