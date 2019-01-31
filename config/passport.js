import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../server/models/UserModel';

export default function (passport) {
	passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
		console.log(email);
	}));
}
