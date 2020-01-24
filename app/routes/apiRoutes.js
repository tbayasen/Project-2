<<<<<<< HEAD
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
=======
const keys = require('../config/keys');
const Goodreads = require('goodreads-api-node');
const gr = new Goodreads(keys.goodreads);
const db = require('../models');
module.exports = function(app) {
	// Get all examples
	app.get('/api/books', function (req, res) {
		db.Books.findAll({}).then(function (dbBooks) {
			res.json(dbBooks);
		});
	});

	app.get('/api/books/goodreads', function (req, res) {
		axios.get('')
			.then(function(result) {
				res.json(result);
			});
	});
	

	// Create a new example
	app.post('/api/books', function (req, res) {
		var newBook = {title: req.body.title,
			author: req.body.author,
			img: req.body.image};
		db.Books.create(newBook).then(function (dbBooks) {
			res.json(dbBooks);
		});	

	});

	// Delete an example by id
	app.delete('/api/books/:id', function (req, res) {
		db.Books.destroy({ where: { id: req.params.id } }).then(function (dbBooks) {
			res.json(dbBooks);
>>>>>>> f819c704ea7345a0942d7b8ba6dfe8e156f9f34a
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
