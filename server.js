// Require Dependencies
require('dotenv').config();
var express = require('express');
var exphbs = require('express-handlebars');
var grNode = require('goodreads-api-node');

var db = require('./app/models');

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// API
const goodReads = {
	id: process.env.GOODREADS_ID,
	secret: process.env.GOODREADS_SECRET
};

// Handlebars
app.engine(
	'handlebars',
	exphbs({
		defaultLayout: 'main'
	})
);
app.set('view engine', 'handlebars');

// Routes
require('./app/routes/apiRoutes')(app);
require('./app/routes/htmlRoutes')(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
	syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
	app.listen(PORT, function() {
		console.log(
			'==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
			PORT,
			PORT
		);
	});
});

const book = 'Harry Potter';
var queryURL = 'https://www.goodreads.com/search/' + book + '/id=' + goodReads;

app.get('queryURL'), function() {
    
};

module.exports = app;