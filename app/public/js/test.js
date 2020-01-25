$('document').ready(function () {
	$('parallax').parallax();
	$('.modal').modal();

	//Sign-up Button
	$('#submit-signup').on('click', function () {
		event.preventDefault();
		const username = $('#signup-username').val().trim();
		const password = $('#signup-pass').val().trim();

		createUser({
			name: username,
			password: password
		});

		// localStorage.setItem('username', username);
		// localStorage.setItem('password', password);
	});

	//Create a user
	function createUser(User) {
		$.post('/api/users', User)
			.then(console.log(User));
	}
});