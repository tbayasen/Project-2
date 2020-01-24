require('dotenv').config();
<<<<<<< HEAD

var express = require('express');
var grNode = require('goodreads-api-node');

var db = require('./app/models');
=======
const express = require('express');
>>>>>>> f819c704ea7345a0942d7b8ba6dfe8e156f9f34a

var app = express();
var PORT = process.env.PORT || 8080;

var db = require('./app/models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
<<<<<<< HEAD
app.use(express.static(__dirname + '/app/public'));
// app.use(express.static('public'));

// API
const keys = require('./app/config/keys');
const gr = new grNode(keys.goodreads);
=======

app.use(express.static('public'));
>>>>>>> f819c704ea7345a0942d7b8ba6dfe8e156f9f34a

require('./app/routes/apiRoutes')(app);
<<<<<<< HEAD
require('./app/routes/htmlRoutes')(app);
require('./app/routes/userRoutes')(app);

var syncOptions = { force: false };
=======
>>>>>>> f819c704ea7345a0942d7b8ba6dfe8e156f9f34a

db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log('App listening on PORT ' + PORT);
	});
<<<<<<< HEAD
});

module.exports = app;

//gr.getBooksByAuthor('175417').then(console.log);
=======
});
>>>>>>> f819c704ea7345a0942d7b8ba6dfe8e156f9f34a
