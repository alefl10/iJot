import express from 'express';
import hb from 'express-handlebars';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import flash from 'connect-flash';
import session from 'express-session';
import './models/Idea';

const app = express();

// Connect to mongoose
mongoose.connect('mongodb://localhost/iJot-dev', { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err));

// Load Idea Model
const Idea = mongoose.model('ideas');

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

// Flash Middleware
app.use(flash());

// Global variables
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.warning_msg = req.flash('warning_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});

// Index Route
app.get('/', (req, res) => {
	const title = 'Welcome Alejandro';
	res.render('index', {
		title,
	});
});

// About route
app.get('/about', (req, res) => {
	res.render('about');
});

// Idea Index Page
app.get('/ideas', (req, res) => {
	Idea.find({})
		.sort({ date: 'desc' })
		.then((ideas) => {
			res.render('ideas/index', { ideas });
		})
		.catch((err) => {
			res.send(err);
		});
});

// Add Idea form
app.get('/ideas/add', (req, res) => {
	res.render('ideas/add');
});

// Edit idea form
app.get('/ideas/edit/:id', (req, res) => {
	Idea.findOne({
		_id: req.params.id,
	})
		.then((idea) => {
			res.render('ideas/edit', { idea });
		})
		.catch((err) => {
			res.send(err);
			req.flash('error_msg', 'Could not retrieve ideas from Data Base.');
			res.redirect('/ideas');
		});
});

// Process Idea form
app.post('/ideas/', (req, res) => {
	const errors = [];

	if (!req.body.title) {
		errors.push({ text: 'Please add a title' });
	}
	if (!req.body.details) {
		errors.push({ text: 'Please add some details' });
	}
	if (errors.length > 0) {
		res.render('ideas/add', {
			errors,
			title: req.body.title,
			details: req.body.details,
		});
	} else {
		const newIdea = {
			title: req.body.title,
			details: req.body.details,
		};

		new Idea(newIdea)
			.save()
			.then((idea) => {
				console.log(idea);
				req.flash('success_msg', 'Future idea posted!');
				res.redirect('/ideas');
			})
			.catch((err) => {
				console.log(err);
				req.flash('error_msg', 'Could not save idea to data base.\nSchema validation returned an error.');
				res.redirect('/ideas');
			});
	}
});

// Edit Form process
app.put('/ideas/:id', (req, res) => {
	Idea.findOne({ _id: req.params.id })
		.then((idea) => {
			if (idea.title === req.body.title && idea.details === req.body.details) {
				req.flash('warning_msg', 'Nothing needs to be updated!');
				res.redirect('/ideas');
			} else {
				const updateIdea = idea;
				updateIdea.title = req.body.title;
				updateIdea.details = req.body.details;
				updateIdea.save()
					.then((updatedIdea) => {
						console.log(updatedIdea);
						req.flash('success_msg', 'Future idea updated');
						res.redirect('/ideas');
					})
					.catch((err) => {
						console.log(err);
						req.flash('error_msg', 'Could not update idea.\nFailed to save idea to Data Base.');
						res.redirect('/ideas');
					});
			}
		})
		.catch((err) => {
			console.log(err);
			req.flash('error_msg', 'Could not update idea.\nFailed to find idea in Data Base.');
			res.redirect('/ideas');
		});
});

// Delete Idea
app.delete('/ideas/:id', (req, res) => {
	Idea.deleteOne({ _id: req.params.id })
		.then((deleted) => {
			console.log(deleted);
			req.flash('success_msg', 'Future idea deleted');
			res.redirect('/ideas');
		})
		.catch((err) => {
			console.log(err);
			req.flash('error_msg', 'Future idea could not be deleted');
			res.redirect('/ideas');
		});
});

const port = 5000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
