require('dotenv').config();

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

var express = require('express');

var db = require('./app/models');

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/app/public'));

app.use(cookieParser());	

// API
const keys = require('./app/config/keys');

app.use((req, res, next) => {
	const token = req.cookies.secret;

	if (token) {
		const { id } = jwt.verify(secret, process.env.APP_SECRET);

		req.user = id;
	}

	next();
});

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