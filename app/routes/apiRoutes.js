const keys = require('../config/keys');
const Goodreads = require('goodreads-api-node');
const gr = new Goodreads(keys.goodreads);
const db = require('../models');
var jwt = require('jsonwebtoken');

module.exports = function(app) {
	// Get all examples
	app.get('/api/books', function (req, res) {
		db.Books.findAll({}).then(function (dbBooks) {
			res.json(dbBooks);
		});
	});

	// app.get('/api/books/goodreads', function (req, res) {
	// 	axios.get('')
	// 		.then(function(result) {
	// 			res.json(result);
	// 		});
	// });
	

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
		});
	});
};
