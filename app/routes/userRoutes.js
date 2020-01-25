// var db = require('../models');
const { User } = require('../models');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = function (app) {
	// Get all examples
	app.get('/api/users', function (req, res) {
		User.findAll({}).then(function (dbUser) {
			res.json(dbUser);
			console.log(User);
		});
	});

	app.get('/dashboard', (req, res) => {
		res.json('You have been logged in!');
	});

	//Add user data to database && hash password
	app.post('/api/users', (req, res) => {
		User.findOne({ where: { name: req.body.name } }).then(user => {
			console.log('user data:' + user);
			if (user) {
				let error = 'Username exists in database.';
				return res.status(400).json(error);
			} else {
				const newUser = new User({
					name: req.body.name,
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
								username: user.name
							};
							console.log(payload);
						});
					});
				});
			}
		});
	});

	app.post('/dashboard', (req, res) => {
		const name = req.body.name;
		const password = req.body.password;

		User.findOne({ where: { name } }).then(user => {
			if (!user) {
				var errors = {};
				errors.username = 'No Account Found';
				return res.status(404).json(errors);
			}
			bcrypt.compare(password, user.password).then(isMatch => {
				if (isMatch) {
					console.log('in');
					const payload = {
						id: user.id,
						username: user.name
					};
					res.status(200).json(payload.id);
				} else {
					let errors = {};
					errors.password = 'Password is incorrect';
					res.status(500).json(errors);
				}
			});
		});
	});
};