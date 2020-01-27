$('document').ready(function () {
	$('parallax').parallax();
	$('.modal').modal();

	//Sign-up Button
	$('#submit-signup').on('click', function () {
		event.preventDefault();
		const firstname = $('#first_name').val().trim();
		const lastname = $('#last_name').val().trim();
		const email = $('#signup-email').val().trim();
		const password = $('#signup-password').val().trim();

		const createUser = {
			firstname: firstname,
			lastname: lastname,
			email: email,
			password: password
		};

		$.ajax({
			method: 'POST',
			url: '/api/user/signup',
			data: createUser
		});
	});

	$('#submit-login').on('click', function() {
		event.preventDefault();
		const email =  $('#login-email').val().trim();
		const password = $('#login-password').val().trim();

		const loginUser = {
			email: email,
			password: password
		};

		$.ajax({
			method: 'POST',
			url: '/api/user/login',
			data: loginUser
		});

		console.log('You\'re in!');
	});
});