import express from 'express';
import hb from 'express-handlebars';
import mongoose from 'mongoose';
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

const port = 5000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
