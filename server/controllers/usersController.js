exports.getLogin = (req, res) => {
	res.render('users/login');
};

exports.getRegister = (req, res) => {
	res.render('users/register');
};

exports.postRegister = (req, res) => {
	const errors = [];
	const {
		name,
		email,
		password,
		password2,
	} = req.body;
	if (req.body.password !== req.body.password2) {
		errors.push({ text: 'Password do not match!' });
	}
	if (req.body.password.length < 4) {
		errors.push({ text: 'Password must be at least 4 characters!' });
	}
	if (errors.length > 0) {
		// This will avoid having the user retype the form again
		res.render('users/register', {
			errors,
			name,
			email,
			password,
			password2,
		});
	} else {
		res.send('PASSED');
	}
};
