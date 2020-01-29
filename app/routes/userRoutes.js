// var db = require('../models');
const { User } = require('../models');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const withAuth = require('./withAuth');

module.exports = function (app) {
	// Get all examples
	// app.get('/api/users', function (req, res) {
	// 	User.findAll({}).then(function (dbUser) {
	// 		res.json(dbUser);
	// 		console.log(User);
	// 	});
	// });

	app.get('/api/user', (req, res) => {

	});

	// app.get('/dashboard', async function (req, res) {
	// 	// console.log(req);
	// 	await User.findOne({ 
	// 		where: { 
	// 			email: req.params.email 
	// 		}}).then(
	// 		user => {
	// 			console.log(user);
	// 		});
	// 	res.sendFile(path.join(__dirname, '../public/pages/grid.html'));
	// });

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
							res.status(200).json(payload.id);
						});
					});
				});
			}
		});
	});

	app.post('/api/user/login', async (req, res) => {
		const email = req.body.email;
		const password = req.body.password;
		const user = await User.findOne({
			where: { email: req.body.email }
		}).then(user => {
			bcrypt.compare(password, user.password).then(isMatch => {
				if (isMatch) {
					console.log('You\'re in!');
					const payload = {
						id: user.id,
						username: user.email
					};
					req.session.userId = payload.id;
					req.session.username = payload.username;
					// res.status(200).json(payload.id);
					console.log(req.session.userId);
				} else {
					console.log('Password is incorrect!');
				}
			});

			//create our cookie
			const token = jwt.sign({ id: user.id }, process.env.APP_SECRET);

			res.cookie('token', token, {
				httpOnly: true,
				maxAge: 1000 * 60 * 60 * 24 * 14
			});

			res.send(user);
		});
	});

	app.get('/dashboard', async (req, res) => {
		User.findOne({ where: { id: req.session.userId } }).then(user => {
			if (!user) {
				console.log('User not found');
			} else {
				console.log('You\'re in!');
				console.log(req.body.email);
			}
		}).catch(err => {
			console.log(err);
			res.redirect('/');
		});
	});
};