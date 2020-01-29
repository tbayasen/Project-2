// var jwt = require('jsonwebtoken');
// const keys = require('../config/keys');


// module.exports = function (app) {
// 	const secret = process.env.JWT_SECRET;
// 	// generate the JWT
// 	function generateToken(req) {
// 		console.log(secret);
// 		return jwt.sign({
// 			auth: 'magic',
// 			agent: req.headers['user-agent'],
// 			exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60 // Note: in seconds!
// 		}, secret);  // secret is defined in the environment variable JWT_SECRET
// 	}

// 	app.get('/api/users/token', function (req, res) {
// 		var token = generateToken(req);
// 		// if(window.localStorage) {
// 		// 	localStorage.setItem('JWT', token);
// 		// }
// 		// else{
// 		// 	console.log('Local Storage is not supported');
// 		// }
// 		res.send(token);
// 	});
    
// 	// validate the token supplied in request header
// 	function validate(req, res) {
// 		var token = req.headers.authorization;
// 		try {
// 			var decoded = jwt.verify(token, secret);
// 		} catch (e) {
// 			return authFail(res);
// 		}
// 		if(!decoded || decoded.auth !== 'magic') {
// 			return authFail(res);
// 		} else {
// 			return privado(res, token);
// 		}
// 	}
// };