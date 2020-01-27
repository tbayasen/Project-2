// var db = require('../models');
const { User } = require('../models');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = function (app) {
	// Get all examples
	// app.get('/api/users', function (req, res) {
	// 	User.findAll({}).then(function (dbUser) {
	// 		res.json(dbUser);
	// 		console.log(User);
	// 	});
	// });

	app.get('/dashboard', (req, res) => {
		res.json('You have been logged in!');
	});

	//Add user data to database && hash password
	app.post('/api/user/signup', (req, res) => {

		User.findOne({ where: { email: req.body.email } }).then(user => {
			console.log('user data:' + user);
			if (user) {
				let error = 'Username exists in database.';
				return res.status(400).json(error);
			} else {
				const newUser = new User({
					firstname: req.body.firstname,
					lastname: req.body.lastname,
					email: req.body.email,
					password: req.body.password
				});
				bcrypt.genSalt(10, (err, salt) => {
					if (err) throw err;
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err;
						newUser.password = hash;
						newUser.save().then(user => {
							const payload = {
								id: user.id,
								email: user.email
							};
							console.log(payload);
						});
					});
				});
			}
		});
	});

	app.post('/api/user/login', (req, res) => {
		const email = req.body.email;
		const password = req.body.password;

		User.findOne({ where: { email } }).then(user => {
			if (!user) {
				var errors = {};
				errors.email = 'No Account Found';
				return res.status(404).json(errors);
			}
			bcrypt.compare(password, user.password).then(isMatch => {
				if (isMatch) {
					console.log('in');
					const payload = {
						id: user.id,
						email: user.email
					};
					res.status(200).json(payload.id);
				} else {
					let errors = {};
					errors.password = 'Password is incorrect';
					res.status(500).json(errors);
				}
			});

			//create our cookie
			const token = jwt.sign({ id: user.id }, process.env.APP_SECRET);

			res.cookie('token', token, {
				httpOnly: true,
				maxAge: 1000 * 60 * 60 * 24 * 14
			});

			res.json(user);
		});
	});
};