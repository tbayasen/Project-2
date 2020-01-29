const withAuth = (req, res, next) => {
	if (!req.session.userId) {
		// console.log(req.session);
		// res.redirect('/');
	} else {
		next();
	}
};
  
module.exports = withAuth;