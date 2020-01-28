require('dotenv').config();
const nodeLs = require('node-localstorage');

var express = require('express');

var db = require('./app/models');

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/app/public'));
// app.use(express.static('public'));

// API
const keys = require('./app/config/keys');

require('./app/routes/apiRoutes')(app);
require('./app/routes/htmlRoutes')(app);
require('./app/routes/userRoutes')(app);

var syncOptions = { force: false };

db.sequelize.sync().then(function () {
	app.listen(PORT, function () {
		console.log('App listening on PORT ' + PORT);
	});
});

module.exports = app;
