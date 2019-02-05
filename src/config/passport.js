import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../server/models/UserModel';

export default function (passport) {
	passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
		// Match login entered User (based on provided email)
		User.findOne({ email })
			.then((user) => {
				if (!user) {
					return done(null, false, { message: 'User NOT found' });
				}

				// Match login entered password
				bcrypt.compare(password, user.password)
					.then((match) => {
						if (match) {
							return done(null, user); // If the user is return, it means the password matched
						}
						return done(null, false, { message: 'Password Incorrect!' });
					})
					.catch(err => done(err, false, { message: 'Could not decrypt password' }));
			})
			.catch(err => done(err, false, { message: 'There was an error retrieving User' }));
	}));

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
}
