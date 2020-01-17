require('dotenv').config();
const keys = require('./app/models/keys.js');
const Goodreads = require('goodreads-api-node');
const gr = new Goodreads(keys.goodreads);

gr.getBooksByAuthor('175417')
	.then(console.log);