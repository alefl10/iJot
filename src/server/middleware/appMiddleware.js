import hb from 'express-handlebars';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import flash from 'connect-flash';
import session from 'express-session';
import passport from 'passport';
import strategy from '../../config/passport';

export default function (app) {
	// Set up passport strategy
	strategy(passport);

	// Handlebars Middleware
	app.engine('handlebars', hb({ defaultLayout: 'main' }));
	app.set('view engine', 'handlebars');

	// Body Parser Middleware + Parse application/json
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	// Mehod override Middleware
	app.use(methodOverride('_method'));

	// Express session Middleware
	app.use(session({
		secret: 'secret', // This could be anything
		resave: true,
		saveUninitialized: true,
	}));

	// Passport middleware
	app.use(passport.initialize());
  	app.use(passport.session());

	// Flash Middleware
	app.use(flash());

	// Global variables
	app.use((req, res, next) => {
		res.locals.success_msg = req.flash('success_msg');
		res.locals.warning_msg = req.flash('warning_msg');
		res.locals.error_msg = req.flash('error_msg');
		res.locals.error = req.flash('error');
		res.locals.user = req.user || null; // Determines whether a user is logged in or not
		next();
	});
}
