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

// Add Idea form
app.get('/ideas/add', (req, res) => {
	res.render('ideas/add');
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
		res.send('passed');
	}
});

const port = 5000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
