import express from 'express';
import hb from 'express-handlebars';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
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
				res.redirect('/ideas');
			})
			.catch((err) => {
				errors.push({ text: 'Could not save idea to data base.\nSchema validation returned an error.' });
			});
	}
});

const port = 5000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
