require('dotenv').config();
const express = require('express');

var app = express();
var PORT = process.env.PORT || 8080;

var db = require('./app/models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

require('./app/routes/apiRoutes')(app);

db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log('App listening on PORT ' + PORT);
	});
});