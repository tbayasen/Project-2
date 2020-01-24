var db = require('../models');
var jwt = require('jsonwebtoken');

module.exports = function (app) {
	// // Get all examples
	// app.get('/api/users', function (req, res) {
	// 	db.User.findAll({}).then(function (dbUser) {
	// 		res.json(dbUser);
	// 		console.log(db.User);
	// 	});
	// });

	// //Add user data to database
	// app.post('/api/users', (req, res) => {
	// 	db.User.create({
	// 		name: req.body.name,
	// 		password: req.body.password, 
	// 	}).then((dbUser) => {
	// 		res.json(dbUser);
	// 	});
	// });

	// Delete an example by id
	app.delete('/api/examples/:id', function (req, res) {
		db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
			res.json(dbExample);
		});
	});
	const secret = process.env.JWT_SECRET;
	// generate the JWT
	function generateToken(req) {
		console.log(secret);
		return jwt.sign({
			auth: 'magic',
			agent: req.headers['user-agent'],
			exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60 // Note: in seconds!
		}, secret);  // secret is defined in the environment variable JWT_SECRET
	}

	app.get('/api/users/token', function (req, res) {
		var token = generateToken(req);
		res.send(token);
	});
};
