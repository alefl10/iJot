import bcrypt from 'bcryptjs';
import passport from 'passport';
import User from '../models/UserModel';

const controller = {

	getLogin(req, res) {
		res.render('users/login');
	},

	postLogin(req, res, next) {
		passport.authenticate('local', {
			successRedirect: '/ideas',
			failureRedirect: '/users/login',
			failureFlash: true, // Show flash message if fail auth
		})(req, res, next);
	},

	getLogout(req, res) {
		req.logout();
		req.flash('success_msg', 'You are logged out!');
		res.redirect('/users/login');
	},

	getRegister(req, res) {
		res.render('users/register');
	},

	postRegister(req, res) {
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
			const newUser = new User({
				name,
				email,
				password,
			});

			bcrypt.genSalt(10)
				.then((salt) => {
					bcrypt.hash(newUser.password, salt)
						.then((hashedPassword) => {
							newUser.password = hashedPassword;

							newUser.save()
								.then((user) => {
									console.log(user);
									req.flash('success_msg', 'You are now registered and can log in!');
									res.redirect('/users/login');
								})
								.catch((err) => {
									console.log(err);
									if (err.code === 11000) {
										req.flash('error_msg', 'That email has already been used.\nPlease, choose a different email.');
										res.redirect('/users/login');
									}
								});
						})
						.catch((err) => {
							console.log(err);
							res.send('There was an ERROR hashing the password');
						});
				})
				.catch((err) => {
					console.log(err);
					res.send('There was an ERROR salting the password.');
				});
		}
	},

};

export default controller;
