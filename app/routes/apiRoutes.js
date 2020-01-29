const keys = require('../config/keys');

const db = require('../models');

const axios = require('axios');

const apiKey = process.env.Google_Key;



if (typeof localStorage === 'undefined' || localStorage === null) {

	var LocalStorage = require('node-localstorage').LocalStorage;

	localStorage = new LocalStorage('./scratch');

}

  

let headers = {

	'Content-Type': 'application/json',

	'X-API-Key': apiKey

};



module.exports = function(app) {

	// Get all examples

	// app.get('/api/books', function (req, res) {

	// 	db.Books.findAll({}).then(function (dbBooks) {

	// 		res.json(dbBooks);

	// 	});

	// });



	app.get('/api/books/:searchQuery',  function (req, res) {

		const searchQuery = req.params.searchQuery;

		console.log(searchQuery);



		axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}:keyes&key=` + apiKey).then(function(data){
			var book = [];
			for (var i = 0; i<data.data.items.length; i++) {
				var queryBook = {
					Title: data.data.items[i].volumeInfo.title,
				 Author: data.data.items[i].volumeInfo.authors,
				 Description: data.data.items[i].volumeInfo.description,
				 Image: data.data.items[i].volumeInfo.imageLinks.thumbnail
				};
				book.push(queryBook);
			}
			res.json(book);
		}); 

	});



	// Create a new example

	app.post('/api/books', function (req, res) {

		// var newBook = {title: req.body.title,

		// 	author: req.body.author,

		// 	img: req.body.image};

		// db.Books.create(newBook).then(function (dbBooks) {

		// 	res.json(dbBooks);

		// });



	});



	// Delete an example by id

	app.delete('/api/books/:id', function (req, res) {

		db.Books.destroy({ where: { id: req.params.id } }).then(function (dbBooks) {

			res.json(dbBooks);

		});

	});

};

