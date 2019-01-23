exports.getLogin = (req, res) => {
	res.render('users/login');
};

exports.getRegister = (req, res) => {
	res.render('users/register');
};
