require('dotenv').config();

var express = require('express');
var grNode = require('goodreads-api-node');

var db = require('./app/models');

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/app/public'));
// app.use(express.static('public'));

// API
const keys = require('./app/config/keys');
const gr = new grNode(keys.goodreads);

require('./app/routes/apiRoutes')(app);
require('./app/routes/htmlRoutes')(app);
require('./app/routes/userRoutes')(app);
require('./app/routes/JWTRoute')(app);

var syncOptions = { force: false };

db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log('App listening on PORT ' + PORT);
	});
});

module.exports = app;

//gr.getBooksByAuthor('175417').then(console.log);
