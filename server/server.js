import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import appMiddleware from './middleware/appMiddleware';
import ideas from './routes/ideasRoute';
import users from './routes/usersRoute';
import strategy from '../config/passport';

// Set up passport strategy
strategy(passport);

const app = express();

appMiddleware(app);

// Static Folder
app.use(express.static(path.join(__dirname, '../', 'public')));

// Connect to mongoose
mongoose.connect('mongodb://localhost/iJot-dev', { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err));

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

// // Use routes
app.use('/ideas', ideas);
app.use('/users', users);

export default app;
